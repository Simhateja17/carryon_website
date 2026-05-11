"use client";

import { useCallback } from "react";
import { getAdminBookings } from "@/lib/api";
import { useAdminPolling } from "@/lib/useAdminPolling";
import type { AdminOrdersResponse } from "@/types";

const PER_PAGE = 10;

export function useOrders(page: number) {
  const loader = useCallback(
    () => getAdminBookings({ page, limit: PER_PAGE }),
    [page],
  );
  const state = useAdminPolling<AdminOrdersResponse>(loader, { intervalMs: 30_000 });

  return {
    orders: state.data?.data ?? [],
    total: state.data?.total ?? 0,
    loading: state.loading,
    error: state.error || null,
    perPage: PER_PAGE,
  };
}
