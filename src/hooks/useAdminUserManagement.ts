"use client";

import { useCallback } from "react";
import { getAdminUserManagement } from "@/lib/api";
import { useAdminPolling } from "@/lib/useAdminPolling";
import type { AdminUserManagementSnapshot } from "@/types";

const emptySnapshot: AdminUserManagementSnapshot = {
  users: [],
  roleStats: [],
  auditLogs: [],
  auditSummary: {
    ordersAdjusted: 0,
    permissionsChanged: 0,
    securityEvents: 0,
    credentialsReset: 0,
  },
  securitySettings: {
    twoFactorRequired: true,
    loginAlertsEnabled: true,
    suspiciousActivityDetectionEnabled: false,
    ipRestrictedAccessEnabled: false,
  },
};

export function useAdminUserManagement() {
  const loader = useCallback(() => getAdminUserManagement(), []);
  const state = useAdminPolling<AdminUserManagementSnapshot>(loader, { intervalMs: 30_000 });

  return {
    snapshot: state.data ?? emptySnapshot,
    loading: state.loading,
    error: state.error || null,
    stale: state.stale,
    lastUpdated: state.lastUpdated,
    refresh: state.refresh,
  };
}
