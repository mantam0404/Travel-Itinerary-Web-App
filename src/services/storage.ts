import localforage from 'localforage';
import { defaultTripData, type TripData } from '../data/tripData';

const TRIP_STORE_KEY = 'trip-data';
const SYNC_META_KEY = 'sync-meta';

export interface SyncMeta {
  lastSyncedAt: string | null;
  lastLocalUpdate: string;
  pendingSync: boolean;
}

const tripStore = localforage.createInstance({
  name: 'spain-travel-app',
  storeName: 'trip',
});

const metaStore = localforage.createInstance({
  name: 'spain-travel-app',
  storeName: 'meta',
});

export async function loadTripData(): Promise<TripData> {
  const cached = await tripStore.getItem<TripData>(TRIP_STORE_KEY);
  if (cached) return cached;

  await tripStore.setItem(TRIP_STORE_KEY, defaultTripData);
  await metaStore.setItem(SYNC_META_KEY, {
    lastSyncedAt: null,
    lastLocalUpdate: new Date().toISOString(),
    pendingSync: false,
  } satisfies SyncMeta);

  return defaultTripData;
}

export async function saveTripData(data: TripData): Promise<void> {
  const updated = { ...data, lastUpdated: new Date().toISOString() };
  await tripStore.setItem(TRIP_STORE_KEY, updated);

  const meta = (await metaStore.getItem<SyncMeta>(SYNC_META_KEY)) ?? {
    lastSyncedAt: null,
    lastLocalUpdate: new Date().toISOString(),
    pendingSync: false,
  };

  await metaStore.setItem(SYNC_META_KEY, {
    ...meta,
    lastLocalUpdate: updated.lastUpdated,
    pendingSync: navigator.onLine,
  });
}

export async function getSyncMeta(): Promise<SyncMeta> {
  return (
    (await metaStore.getItem<SyncMeta>(SYNC_META_KEY)) ?? {
      lastSyncedAt: null,
      lastLocalUpdate: new Date().toISOString(),
      pendingSync: false,
    }
  );
}

export async function markSynced(): Promise<void> {
  const meta = await getSyncMeta();
  await metaStore.setItem(SYNC_META_KEY, {
    ...meta,
    lastSyncedAt: new Date().toISOString(),
    pendingSync: false,
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

export async function syncTripData(): Promise<{ data: TripData; synced: boolean }> {
  const local = await loadTripData();

  if (!navigator.onLine) {
    return { data: local, synced: false };
  }

  const remote = await fetchRemoteTripData();

  if (remote && new Date(remote.lastUpdated) > new Date(local.lastUpdated)) {
    await tripStore.setItem(TRIP_STORE_KEY, remote);
    await markSynced();
    return { data: remote, synced: true };
  }

  await markSynced();
  return { data: local, synced: true };
}
