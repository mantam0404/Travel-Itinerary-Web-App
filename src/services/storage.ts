import localforage from 'localforage';
import { defaultTripData, type TripData } from '../data/tripData';
import { syncFlightPrices, type FlightQuoteSyncResult } from './flightPriceSync';

const TRIP_STORE_KEY = 'trip-data-portugal-10d9n';
const SYNC_META_KEY = 'sync-meta';

export interface SyncMeta {
  lastSyncedAt: string | null;
  lastLocalUpdate: string;
  pendingSync: boolean;
  lastFlightQuoteAt: string | null;
  lastFlightQuoteHkd: number | null;
}

/** Isolated from Guangzhou / Spain branches — same gh-pages URL shares origin. */
const tripStore = localforage.createInstance({
  name: 'portugal-travel-app',
  storeName: 'trip',
});

const metaStore = localforage.createInstance({
  name: 'portugal-travel-app',
  storeName: 'meta',
});

const defaultSyncMeta = (): SyncMeta => ({
  lastSyncedAt: null,
  lastLocalUpdate: new Date().toISOString(),
  pendingSync: false,
  lastFlightQuoteAt: null,
  lastFlightQuoteHkd: null,
});

function isPortugalTrip(data: TripData): boolean {
  if (data.destination !== '葡萄牙' || data.baseCurrency !== 'EUR') return false;
  if (data.itinerary.length !== 10) return false;
  if (data.itinerary[0]?.date !== '2026-10-15') return false;
  if (data.itinerary.at(-1)?.date !== '2026-10-24') return false;

  const guangzhouText = /廣州|广州|永慶坊|大佛寺|珠江|點都德|西九龍|高鐵/;
  const hasGuangzhouItinerary = data.itinerary.some(
    (day) =>
      guangzhouText.test(day.city) ||
      day.activities.some((a) => guangzhouText.test(a.location) || guangzhouText.test(a.title)),
  );
  if (hasGuangzhouItinerary) return false;

  const hasGuangzhouAttractions = data.attractions.some(
    (a) => guangzhouText.test(a.name) || guangzhouText.test(a.id),
  );
  if (hasGuangzhouAttractions) return false;

  const requiredIds = ['lisbon-airport', 'belem-tower', 'porto-ribeira', 'sintra-pena'];
  return requiredIds.every((id) => data.attractions.some((a) => a.id === id));
}

export function isValidPortugalTripData(data: TripData): boolean {
  return isPortugalTrip(data);
}

/** Wipe legacy Guangzhou / Spain IndexedDB — same gh-pages origin shares storage. */
async function purgeLegacyTripStores(): Promise<void> {
  for (const name of ['spain-travel-app', 'guangzhou-travel-app']) {
    try {
      await localforage.createInstance({ name, storeName: 'trip' }).clear();
      await localforage.createInstance({ name, storeName: 'meta' }).clear();
    } catch {
      /* ignore */
    }
  }
}

function migrateTripData(cached: TripData): TripData {
  if (!isPortugalTrip(cached)) {
    return defaultTripData;
  }
  return cached;
}

export async function loadTripData(): Promise<TripData> {
  await purgeLegacyTripStores();

  const cached = await tripStore.getItem<TripData>(TRIP_STORE_KEY);
  if (cached) {
    if (cached.version < defaultTripData.version) {
      await tripStore.setItem(TRIP_STORE_KEY, defaultTripData);
      return defaultTripData;
    }
    const migrated = migrateTripData(cached);
    if (migrated !== cached) {
      await tripStore.setItem(TRIP_STORE_KEY, migrated);
      return migrated;
    }
    return cached;
  }

  await tripStore.setItem(TRIP_STORE_KEY, defaultTripData);
  await metaStore.setItem(SYNC_META_KEY, defaultSyncMeta());

  return defaultTripData;
}

export async function saveTripData(data: TripData): Promise<void> {
  const updated = { ...data, lastUpdated: new Date().toISOString() };
  await tripStore.setItem(TRIP_STORE_KEY, updated);

  const meta = (await metaStore.getItem<SyncMeta>(SYNC_META_KEY)) ?? defaultSyncMeta();

  await metaStore.setItem(SYNC_META_KEY, {
    ...meta,
    lastLocalUpdate: updated.lastUpdated,
    pendingSync: navigator.onLine,
  });
}

export async function getSyncMeta(): Promise<SyncMeta> {
  const meta = await metaStore.getItem<SyncMeta>(SYNC_META_KEY);
  if (!meta) return defaultSyncMeta();
  return {
    ...defaultSyncMeta(),
    ...meta,
  };
}

export async function markSynced(flightQuote?: FlightQuoteSyncResult): Promise<void> {
  const meta = await getSyncMeta();
  await metaStore.setItem(SYNC_META_KEY, {
    ...meta,
    lastSyncedAt: new Date().toISOString(),
    pendingSync: false,
    lastFlightQuoteAt: flightQuote?.quote.quotedAt ?? meta.lastFlightQuoteAt,
    lastFlightQuoteHkd: flightQuote?.quote.roundTripHkd ?? meta.lastFlightQuoteHkd,
  });
}

export async function fetchRemoteTripData(): Promise<TripData | null> {
  if (!navigator.onLine) return null;

  try {
    const response = await fetch('/api/trip-sync', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      return (await response.json()) as TripData;
    }
  } catch {
    // Expected when offline or no backend — use cached data
  }

  return null;
}

export interface SyncTripResult {
  data: TripData;
  synced: boolean;
  flightQuote?: FlightQuoteSyncResult;
}

export async function syncTripData(): Promise<SyncTripResult> {
  let data = await loadTripData();

  if (!navigator.onLine) {
    return { data, synced: false };
  }

  const remote = await fetchRemoteTripData();
  if (remote && new Date(remote.lastUpdated) > new Date(data.lastUpdated)) {
    data = remote;
  }

  const { data: withFlights, result: flightQuote } = await syncFlightPrices(data);
  const stamped = { ...withFlights, lastUpdated: new Date().toISOString() };

  await tripStore.setItem(TRIP_STORE_KEY, stamped);
  await markSynced(flightQuote);

  return { data: stamped, synced: true, flightQuote };
}
