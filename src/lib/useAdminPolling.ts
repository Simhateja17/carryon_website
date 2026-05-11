'use client';

import { useEffect, useRef, useState } from 'react';

export interface AdminPollingState<T> {
  data: T | null;
  error: string;
  loading: boolean;
  stale: boolean;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useAdminPolling<T>(
  loader: () => Promise<T>,
  options: { intervalMs: number; enabled?: boolean }
): AdminPollingState<T> {
  const enabled = options.enabled ?? true;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [stale, setStale] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const loaderRef = useRef(loader);
  const hasDataRef = useRef(false);

  useEffect(() => {
    loaderRef.current = loader;
  }, [loader]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let retryDelay = options.intervalMs;

    async function poll() {
      try {
        const nextData = await loaderRef.current();
        if (!alive) return;
        hasDataRef.current = true;
        setData(nextData);
        setError('');
        setStale(false);
        setLastUpdated(new Date());
        retryDelay = options.intervalMs;
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : 'Failed to load admin data');
        setStale(true);
        retryDelay = Math.min(retryDelay * 2, 60_000);
      } finally {
        if (!alive) return;
        setLoading(false);
        timer = setTimeout(poll, retryDelay);
      }
    }

    setLoading(!hasDataRef.current);
    poll();

    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [enabled, options.intervalMs, refreshTick]);

  return {
    data,
    error,
    loading,
    stale,
    lastUpdated,
    refresh: async () => setRefreshTick((value) => value + 1),
  };
}
