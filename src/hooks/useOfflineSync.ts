import { useCallback, useEffect, useState } from 'react';
import type { TripData } from '../data/tripData';
import { loadTripData, saveTripData, syncTripData, getSyncMeta, type SyncMeta } from '../services/storage';

export type ConnectionStatus = 'online' | 'offline' | 'syncing';

export function useOfflineSync() {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>(
    navigator.onLine ? 'online' : 'offline',
  );
  const [syncMeta, setSyncMeta] = useState<SyncMeta | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await loadTripData();
    const meta = await getSyncMeta();
    setTripData(data);
    setSyncMeta(meta);
    setLoading(false);
  }, []);

  const performSync = useCallback(async () => {
    if (!navigator.onLine) {
      setStatus('offline');
      return;
    }

    setStatus('syncing');
    const { data } = await syncTripData();
    const meta = await getSyncMeta();
    setTripData(data);
    setSyncMeta(meta);
    setStatus('online');
  }, []);

  const updateTripData = useCallback(async (data: TripData) => {
    await saveTripData(data);
    const meta = await getSyncMeta();
    setTripData(data);
    setSyncMeta(meta);
  }, []);

  useEffect(() => {
    refresh().then(() => {
      if (navigator.onLine) performSync();
    });
  }, [refresh, performSync]);

  useEffect(() => {
    const handleOnline = () => {
      setStatus('online');
      performSync();
    };
    const handleOffline = () => setStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [performSync]);

  return { tripData, status, syncMeta, loading, updateTripData, performSync };
}
