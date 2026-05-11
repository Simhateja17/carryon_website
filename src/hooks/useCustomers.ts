"use client";

import { useCallback } from "react";
import { getAdminCustomers } from "@/lib/api";
import { useAdminPolling } from "@/lib/useAdminPolling";
import type { AdminCustomersPage } from "@/types";

export function useCustomers(page = 1) {
  const loader = useCallback(
    () => getAdminCustomers({ page }),
    [page],
  );
  const state = useAdminPolling<AdminCustomersPage>(loader, { intervalMs: 30_000 });

  return {
    customers: state.data?.customers ?? [],
    total: state.data?.total ?? 0,
    loading: state.loading,
    error: state.error || null,
  };
}
