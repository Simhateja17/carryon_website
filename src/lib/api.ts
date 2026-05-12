// ── API Client ──────────────────────────────────────────────
// Proxied admin requests go through /api/admin/[...path] which
// injects the x-admin-key header server-side.

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  const res = await fetch(path, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

// ── API Functions ───────────────────────────────────────────

export async function getStats() {
  return apiFetch<{ success: boolean; data: import("@/types").Stats }>(
    "/api/admin/notifications/stats"
  );
}

export async function getDrivers() {
  return apiFetch<{ success: boolean; data: import("@/types").Driver[] }>(
    "/api/admin/notifications/drivers"
  );
}

export async function getNotifications(page = 1) {
  return apiFetch<{
    success: boolean;
    data: import("@/types").Notification[];
    total: number;
    page: number;
    limit: number;
  }>(`/api/admin/notifications?page=${page}`);
}

export async function sendNotification(payload: import("@/types").SendNotificationPayload) {
  return apiFetch<{
    success: boolean;
    data: import("@/types").SendNotificationResult;
  }>("/api/admin/notifications/send", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createRideRequest(payload: import("@/types").CreateRideRequestPayload) {
  return apiFetch<{
    success: boolean;
    data: import("@/types").CreateRideRequestResult;
  }>("/api/admin/notifications/ride-request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getRecipientOtps(
  status: "all" | "active" | "verified" = "all",
  limit = 100
) {
  return apiFetch<{
    success: boolean;
    data: import("@/types").AdminRecipientOtpRecord[];
  }>(`/api/admin/notifications/recipient-otps?status=${status}&limit=${limit}`);
}

// ── Admin Bookings / Orders ──────────────────────────────────

export async function getAdminBookings(params: import("@/types").AdminOrdersParams = {}) {
  const query = new URLSearchParams();
  if (params.page != null) query.set("page", String(params.page));
  if (params.limit != null) query.set("limit", String(params.limit));
  if (params.status && params.status !== "all") query.set("status", params.status);
  if (params.vehicleType && params.vehicleType !== "all") query.set("vehicleType", params.vehicleType);
  if (params.search) query.set("search", params.search);
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", params.dateTo);
  const qs = query.toString();
  return apiFetch<import("@/types").AdminOrdersResponse>(`/api/admin/bookings${qs ? `?${qs}` : ""}`);
}

// ── Customers ───────────────────────────────────────────────
// GET /api/admin/customers?page=N
// Requires "customers" in ALLOWED_ADMIN_ROUTES (added to proxy).

export async function getAdminCustomers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<import("@/types").AdminCustomersPage> {
  const q = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 20),
    ...(params?.search ? { search: params.search } : {}),
  });
  const res = await apiFetch<{ success: boolean; data: import("@/types").AdminCustomersPage }>(
    `/api/admin/customers?${q}`
  );
  return res.data;
}

export async function getAdminCustomerStats(): Promise<import("@/types").AdminCustomerStats> {
  const res = await apiFetch<{ success: boolean; data: import("@/types").AdminCustomerStats }>(
    "/api/admin/customers/stats"
  );
  return res.data;
}

// ── Admin Driver Management ────────────────────────────────

export async function getAdminDrivers() {
  return apiFetch<{ success: boolean; data: import("@/types").DriverListItem[] }>(
    "/api/admin/drivers"
  );
}

export async function getDriverOnboardingQueue() {
  return apiFetch<{ success: boolean; data: import("@/types").DriverListItem[] }>(
    "/api/admin/drivers/onboarding-queue"
  );
}

export async function getDriverDetail(id: string) {
  return apiFetch<{ success: boolean; data: import("@/types").DriverDetail }>(
    `/api/admin/drivers/${id}`
  );
}

export async function revealDriverSensitiveField(
  driverId: string,
  field: import("@/types").DriverSensitiveField,
  reason: string
) {
  return apiFetch<{
    success: boolean;
    data: { field: import("@/types").DriverSensitiveField; value: string; expiresAt: string };
  }>(`/api/admin/drivers/${driverId}/pii/reveal`, {
    method: "POST",
    body: JSON.stringify({ field, reason }),
  });
}

export async function reviewDocument(
  driverId: string,
  docId: string,
  status: "APPROVED" | "REJECTED",
  rejectionReason?: string
) {
  return apiFetch<{ success: boolean; data: import("@/types").DriverDocument }>(
    `/api/admin/drivers/${driverId}/documents/${docId}/review`,
    {
      method: "PUT",
      body: JSON.stringify({ status, rejectionReason }),
    }
  );
}

export async function updateDriverVerification(
  driverId: string,
  verificationStatus: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED",
  rejectionReason?: string
) {
  return apiFetch<{ success: boolean; data: import("@/types").DriverDetail }>(
    `/api/admin/drivers/${driverId}/verify`,
    {
      method: "PUT",
      body: JSON.stringify({ verificationStatus, rejectionReason }),
    }
  );
}

// ── Admin Extra Charge Review ──────────────────────────────

export async function getExtraCharges(
  status: "PENDING" | "APPROVED" | "REJECTED" | "ALL" = "PENDING"
) {
  return apiFetch<{ success: boolean; data: import("@/types").BookingExtraChargeRecord[] }>(
    `/api/admin/extra-charges?status=${status}`
  );
}

export async function reviewExtraCharge(
  id: string,
  decision: "APPROVED" | "REJECTED",
  reason?: string
) {
  return apiFetch<{ success: boolean; data: import("@/types").BookingExtraChargeRecord }>(
    `/api/admin/extra-charges/${id}/review`,
    {
      method: "POST",
      body: JSON.stringify({ decision, reason }),
    }
  );
}

// ── Admin Read Models ────────────────────────────────────────

export async function getCommandCenterSnapshot() {
  return apiFetch<{ success: boolean; data: import("@/types").CommandCenterSnapshot }>(
    "/api/admin/command-center"
  );
}

export async function getNotificationSettings() {
  return apiFetch<{ success: boolean; data: import("@/types").NotificationSettingsSnapshot }>(
    "/api/admin/settings/notifications"
  );
}

export async function updateNotificationSettings(alerts: import("@/types").NotificationAlertSetting[]) {
  return apiFetch<{ success: boolean; data: { alerts: import("@/types").NotificationAlertSetting[] } }>(
    "/api/admin/settings/notifications",
    {
      method: "PUT",
      body: JSON.stringify({ alerts }),
    }
  );
}

export async function getFleetSettings() {
  return apiFetch<{ success: boolean; data: import("@/types").AdminFleetSettingsSnapshot }>(
    "/api/admin/settings/fleet"
  );
}

export async function updateFleetSettings(payload: import("@/types").AdminFleetSettingsUpdatePayload) {
  return apiFetch<{ success: boolean; data: import("@/types").AdminFleetSettingsUpdatePayload }>(
    "/api/admin/settings/fleet",
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

export async function geocodeCity(query: string) {
  return apiFetch<{
    success: boolean;
    data: {
      latitude: number;
      longitude: number;
      formattedAddress: string;
      city: string;
      region: string;
      country: string;
    };
  }>("/api/admin/settings/geocode-city", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
}

export async function getPricingConfig() {
  return apiFetch<{ success: boolean; data: import("@/types").AdminPricingSnapshot }>(
    "/api/admin/pricing"
  );
}

export async function updatePricingVehicles(vehicles: import("@/types").AdminPricingVehicle[]) {
  return apiFetch<{ success: boolean; data: import("@/types").AdminPricingVehicle[] }>(
    "/api/admin/pricing/vehicles",
    {
      method: "PUT",
      body: JSON.stringify({ vehicles }),
    }
  );
}

export async function getLiveOverviewMap() {
  return apiFetch<{ success: boolean; data: import("@/types").LiveOverviewSnapshot }>(
    "/api/admin/maps/live-overview"
  );
}

export async function getLiveMapDashboard() {
  return apiFetch<{ success: boolean; data: import("@/types").LiveMapDashboardSnapshot }>(
    "/api/admin/maps/live-dashboard"
  );
}

export async function getIncidentMap() {
  return apiFetch<{ success: boolean; data: import("@/types").IncidentMapSnapshot }>(
    "/api/admin/maps/incidents"
  );
}


// ── Route Distance ───────────────────────────────────────────
// POST /api/admin/maps/distance
// Calculates road distance between two coordinates.

export async function getRouteDistance(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
) {
  return apiFetch<{ success: boolean; data: import("@/types").RouteDistanceResult }>(
    "/api/admin/maps/distance",
    {
      method: "POST",
      body: JSON.stringify({ from, to }),
    }
  );
}

// ── Revenue / Payments & Earnings ──────────────────────────

export async function getRevenueStats(period: "weekly" | "monthly" = "weekly") {
  return apiFetch<{ success: boolean; data: import("@/types").RevenueStats }>(
    `/api/admin/revenue/stats?period=${period}`
  );
}

export async function getRevenueChart(period: "weekly" | "monthly" = "weekly") {
  return apiFetch<{ success: boolean; data: import("@/types").RevenueChartPoint[] }>(
    `/api/admin/revenue/chart?period=${period}`
  );
}

export async function getRevenueTransactions(params: {
  page?: number;
  limit?: number;
  status?: string;
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: string;
  maxAmount?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.page != null) query.set("page", String(params.page));
  if (params.limit != null) query.set("limit", String(params.limit));
  if (params.status && params.status !== "all") query.set("status", params.status);
  if (params.paymentMethod && params.paymentMethod !== "all") query.set("paymentMethod", params.paymentMethod);
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", params.dateTo);
  if (params.minAmount) query.set("minAmount", params.minAmount);
  if (params.maxAmount) query.set("maxAmount", params.maxAmount);
  const qs = query.toString();
  return apiFetch<{
    success: boolean;
    data: import("@/types").RevenueTransaction[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>(`/api/admin/revenue/transactions${qs ? `?${qs}` : ""}`);
}

export async function getRevenueTransactionDetail(id: string) {
  return apiFetch<{ success: boolean; data: import("@/types").RevenueTransactionDetail }>(
    `/api/admin/revenue/transactions/${encodeURIComponent(id)}`
  );
}

export async function getDriverEarnings(params: {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.page != null) query.set("page", String(params.page));
  if (params.limit != null) query.set("limit", String(params.limit));
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", params.dateTo);
  const qs = query.toString();
  return apiFetch<{
    success: boolean;
    data: import("@/types").DriverEarningRow[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>(`/api/admin/revenue/driver-earnings${qs ? `?${qs}` : ""}`);
}

export async function getRefunds(params: {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.page != null) query.set("page", String(params.page));
  if (params.limit != null) query.set("limit", String(params.limit));
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", params.dateTo);
  const qs = query.toString();
  return apiFetch<{
    success: boolean;
    data: import("@/types").RefundRow[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>(`/api/admin/revenue/refunds${qs ? `?${qs}` : ""}`);
}

export async function getRevenueIssues() {
  return apiFetch<{ success: boolean; data: import("@/types").RevenueIssues }>(
    "/api/admin/revenue/issues"
  );
}
