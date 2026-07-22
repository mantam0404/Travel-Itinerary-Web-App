import localforage from 'localforage';
import { defaultTripData, type TripData } from '../data/tripData';
import { syncFlightPrices, type FlightQuoteSyncResult } from './flightPriceSync';

const TRIP_STORE_KEY = 'trip-data';
const SYNC_META_KEY = 'sync-meta';

export interface SyncMeta {
  lastSyncedAt: string | null;
  lastLocalUpdate: string;
  pendingSync: boolean;
  lastFlightQuoteAt: string | null;
  lastFlightQuoteHkd: number | null;
}

const tripStore = localforage.createInstance({
  name: 'spain-travel-app',
  storeName: 'trip',
});

const metaStore = localforage.createInstance({
  name: 'spain-travel-app',
  storeName: 'meta',
});

const defaultSyncMeta = (): SyncMeta => ({
  lastSyncedAt: null,
  lastLocalUpdate: new Date().toISOString(),
  pendingSync: false,
  lastFlightQuoteAt: null,
  lastFlightQuoteHkd: null,
});

/** Patch stale cached routes (e.g. 廣州南 → 廣州東). */
function migrateTripData(cached: TripData): TripData {
  let changed = false;
  const next = structuredClone(cached);

  for (const flight of next.flights) {
    if (flight.route.includes('廣州南')) {
      flight.route = flight.route.replaceAll('廣州南', '廣州東');
      changed = true;
    }
    if (flight.arrivalAirport.includes('廣州南')) {
      flight.arrivalAirport = flight.arrivalAirport.replaceAll('廣州南', '廣州東');
      changed = true;
    }
    if (flight.destCode === 'GZN') {
      flight.destCode = 'GGZ';
      changed = true;
    }
  }

  for (const day of next.itinerary) {
    for (const act of day.activities) {
      if (act.location.includes('廣州南')) {
        act.location = act.location.replaceAll('廣州南', '廣州東');
        changed = true;
      }
    }
  }

  if (!changed) return cached;

  return {
    ...next,
    version: defaultTripData.version,
    lastUpdated: new Date().toISOString(),
  };
}

export async function loadTripData(): Promise<TripData> {
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
