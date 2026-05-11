import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  apiFetch,
  getStats,
  getAdminBookings,
  getAdminCustomers,
  getAdminCustomerStats,
  getNotifications,
  getFleetSettings,
  updateFleetSettings,
  sendNotification,
  getRouteDistance,
} from "@/lib/api";

// ── apiFetch ────────────────────────────────────────────────

describe("apiFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed JSON on success", async () => {
    const data = { success: true, data: [1, 2, 3] };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(data), { status: 200 })
    );

    const result = await apiFetch("/api/test");
    expect(result).toEqual(data);
  });

  it("sends Content-Type: application/json by default", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await apiFetch("/api/test");
    const call = vi.mocked(fetch).mock.calls[0];
    const headers = call[1]?.headers as Record<string, string>;
    expect(headers["Content-Type"]).toBe("application/json");
  });

  it("throws with API error message on non-OK response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Not found" }), { status: 404 })
    );

    await expect(apiFetch("/api/missing")).rejects.toThrow("Not found");
  });

  it("throws with status text when error body is not JSON", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("plain text", {
        status: 500,
        statusText: "Internal Server Error",
      })
    );

    await expect(apiFetch("/api/broken")).rejects.toThrow(
      "Internal Server Error"
    );
  });

  it("merges custom headers with defaults", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await apiFetch("/api/test", {
      headers: { Authorization: "Bearer tok" },
    });

    const call = vi.mocked(fetch).mock.calls[0];
    const headers = call[1]?.headers as Record<string, string>;
    expect(headers["Content-Type"]).toBe("application/json");
    expect(headers["Authorization"]).toBe("Bearer tok");
  });

  it("passes method and body through", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await apiFetch("/api/test", {
      method: "POST",
      body: JSON.stringify({ x: 1 }),
    });

    const call = vi.mocked(fetch).mock.calls[0];
    expect(call[1]?.method).toBe("POST");
    expect(call[1]?.body).toBe(JSON.stringify({ x: 1 }));
  });
});

// ── API functions ────────────────────────────────────────────

describe("getStats", () => {
  it("fetches /api/admin/notifications/stats", async () => {
    const payload = { success: true, data: { totalDrivers: 5 } };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(payload), { status: 200 })
    );

    const res = await getStats();
    expect(res).toEqual(payload);
    expect(fetch).toHaveBeenCalledWith(
      "/api/admin/notifications/stats",
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });
});

describe("getNotifications", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("defaults to page 1", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: [] }), { status: 200 })
    );

    await getNotifications();
    expect(fetch).toHaveBeenCalledWith(
      "/api/admin/notifications?page=1",
      expect.any(Object)
    );
  });

  it("passes custom page number", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: [] }), { status: 200 })
    );

    await getNotifications(3);
    expect(fetch).toHaveBeenCalledWith(
      "/api/admin/notifications?page=3",
      expect.any(Object)
    );
  });
});

describe("sendNotification", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("POSTs payload to /api/admin/notifications/send", async () => {
    const payload = {
      title: "Hello",
      message: "Test",
      type: "info",
      audience: "all" as const,
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: { sent: 1 } }), {
        status: 200,
      })
    );

    await sendNotification(payload);
    const call = vi.mocked(fetch).mock.calls[0];
    expect(call[0]).toBe("/api/admin/notifications/send");
    expect(call[1]?.method).toBe("POST");
    expect(JSON.parse(call[1]?.body as string)).toEqual(payload);
  });
});

describe("fleet settings API", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("fetches fleet settings", async () => {
    const payload = { success: true, data: { settings: {}, currency: "MYR", distanceUnit: "km", auditItems: [] } };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(payload), { status: 200 })
    );

    await getFleetSettings();
    expect(fetch).toHaveBeenCalledWith(
      "/api/admin/settings/fleet",
      expect.objectContaining({ headers: expect.any(Object) })
    );
  });

  it("PUTs fleet settings payload", async () => {
    const payload = {
      payout: { baseRatePerKm: 1.45, peakMultiplier: 1.5 },
      maintenance: {
        mileageThresholdEnabled: true,
        mileageThresholdKm: 5000,
        emissionCheckEnabled: true,
        telematicsFaultsEnabled: false,
        criticalNotification: "Fleet Sync Pending",
      },
      regions: [{ id: "klang-valley", name: "Klang Valley", hubCount: 42, zone: "Greater KL", enabled: true }],
      vehicleClasses: [{ type: "BIKE" as const, label: "Bikes", description: "Bike routes", enabled: true }],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: payload }), { status: 200 })
    );

    await updateFleetSettings(payload);
    const call = vi.mocked(fetch).mock.calls[0];
    expect(call[0]).toBe("/api/admin/settings/fleet");
    expect(call[1]?.method).toBe("PUT");
    expect(JSON.parse(call[1]?.body as string)).toEqual(payload);
  });
});

describe("getAdminBookings", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("builds query string from params", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ success: true, data: [], total: 0 }),
        { status: 200 }
      )
    );

    await getAdminBookings({
      page: 2,
      limit: 5,
      status: "DELIVERED",
      vehicleType: "CAR",
      search: "test",
    });

    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain("/api/admin/bookings?");
    expect(url).toContain("page=2");
    expect(url).toContain("limit=5");
    expect(url).toContain("status=DELIVERED");
    expect(url).toContain("vehicleType=CAR");
    expect(url).toContain("search=test");
  });

  it("omits 'all' status and vehicleType", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ success: true, data: [], total: 0 }),
        { status: 200 }
      )
    );

    await getAdminBookings({ status: "all", vehicleType: "all" });

    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).not.toContain("status=");
    expect(url).not.toContain("vehicleType=");
  });

  it("calls clean URL with no params", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ success: true, data: [], total: 0 }),
        { status: 200 }
      )
    );

    await getAdminBookings();
    expect(fetch).toHaveBeenCalledWith(
      "/api/admin/bookings",
      expect.any(Object)
    );
  });
});

describe("getAdminCustomers", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns unwrapped data", async () => {
    const page = { customers: [], total: 0, page: 1, limit: 20 };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: page }), {
        status: 200,
      })
    );

    const result = await getAdminCustomers();
    expect(result).toEqual(page);
  });

  it("passes search param", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: { customers: [], total: 0, page: 1, limit: 20 },
        }),
        { status: 200 }
      )
    );

    await getAdminCustomers({ search: "john" });
    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain("search=john");
  });
});

describe("getAdminCustomerStats", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns unwrapped stats data", async () => {
    const stats = { totalUsers: 100, verifiedUsers: 80, activeUsers: 50, totalRevenue: 5000 };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: stats }), {
        status: 200,
      })
    );

    const result = await getAdminCustomerStats();
    expect(result).toEqual(stats);
  });
});

describe("getRouteDistance", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("POSTs coordinates to distance endpoint", async () => {
    const from = { lat: 3.1, lng: 101.7 };
    const to = { lat: 3.2, lng: 101.8 };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: { distanceMeters: 1000, durationSeconds: 60, distanceKm: 1, durationMinutes: 1 },
        }),
        { status: 200 }
      )
    );

    await getRouteDistance(from, to);
    const call = vi.mocked(fetch).mock.calls[0];
    expect(call[0]).toBe("/api/admin/maps/distance");
    expect(call[1]?.method).toBe("POST");
    expect(JSON.parse(call[1]?.body as string)).toEqual({ from, to });
  });
});
