import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";

// Mock API modules before importing hooks
vi.mock("@/lib/api", () => ({
  getAdminBookings: vi.fn(),
  getAdminCustomers: vi.fn(),
  getPricingConfig: vi.fn(),
}));

import { useOrders } from "@/hooks/useOrders";
import { useCustomers } from "@/hooks/useCustomers";
import { usePricing } from "@/hooks/usePricing";
import { getAdminBookings, getAdminCustomers, getPricingConfig } from "@/lib/api";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// Helper: flush microtasks + pending timers so the hook settles
async function flushPolling() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

// ── useOrders ───────────────────────────────────────────────

describe("useOrders", () => {
  beforeEach(() => {
    vi.mocked(getAdminBookings).mockReset();
  });

  it("returns loading=true initially then loads data", async () => {
    vi.mocked(getAdminBookings).mockResolvedValue({
      success: true,
      data: [{ id: "1", orderCode: "ORD-001", status: "PENDING" }],
      total: 1,
      totalPages: 1,
      page: 1,
      limit: 10,
    } as never);

    const { result } = renderHook(() => useOrders(1));
    expect(result.current.loading).toBe(true);

    await flushPolling();
    expect(result.current.loading).toBe(false);
    expect(result.current.orders).toHaveLength(1);
    expect(result.current.total).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it("sets error on failure", async () => {
    vi.mocked(getAdminBookings).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useOrders(1));
    await flushPolling();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Network error");
    expect(result.current.orders).toEqual([]);
  });

  it("exposes perPage constant", async () => {
    vi.mocked(getAdminBookings).mockResolvedValue({
      success: true,
      data: [],
      total: 0,
      totalPages: 0,
      page: 1,
      limit: 10,
    } as never);

    const { result } = renderHook(() => useOrders(1));
    expect(result.current.perPage).toBe(10);
  });

  it("picks up new page on next poll cycle", async () => {
    vi.mocked(getAdminBookings).mockResolvedValue({
      success: true,
      data: [],
      total: 0,
      totalPages: 0,
      page: 1,
      limit: 10,
    } as never);

    const { result, rerender } = renderHook(({ page }) => useOrders(page), {
      initialProps: { page: 1 },
    });

    await flushPolling();
    expect(result.current.loading).toBe(false);
    expect(getAdminBookings).toHaveBeenCalledWith({ page: 1, limit: 10 });

    // Change page — useAdminPolling picks up new loader via ref on next cycle
    rerender({ page: 2 });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });

    expect(getAdminBookings).toHaveBeenCalledWith({ page: 2, limit: 10 });
  });
});

// ── useCustomers ────────────────────────────────────────────

describe("useCustomers", () => {
  beforeEach(() => {
    vi.mocked(getAdminCustomers).mockReset();
  });

  it("loads customers and total", async () => {
    vi.mocked(getAdminCustomers).mockResolvedValue({
      customers: [{ id: "c1", name: "Ali" }],
      total: 1,
      page: 1,
      limit: 20,
    } as never);

    const { result } = renderHook(() => useCustomers(1));
    await flushPolling();

    expect(result.current.loading).toBe(false);
    expect(result.current.customers).toHaveLength(1);
    expect(result.current.total).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it("handles API errors", async () => {
    vi.mocked(getAdminCustomers).mockRejectedValue(new Error("Forbidden"));

    const { result } = renderHook(() => useCustomers(1));
    await flushPolling();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Forbidden");
  });
});

// ── usePricing ──────────────────────────────────────────────

describe("usePricing", () => {
  beforeEach(() => {
    vi.mocked(getPricingConfig).mockReset();
  });

  it("loads vehicles from pricing config", async () => {
    vi.mocked(getPricingConfig).mockResolvedValue({
      success: true,
      data: {
        vehicles: [
          { id: "v1", type: "CAR", name: "Car", basePrice: 10, pricePerKm: 2, minimumFare: 8, isAvailable: true },
          { id: "v2", type: "BIKE", name: "Bike", basePrice: 5, pricePerKm: 1, minimumFare: 4, isAvailable: true },
        ],
        commissionRate: 0.2,
        coupons: [],
        history: [],
      },
    } as never);

    const { result } = renderHook(() => usePricing());
    await flushPolling();

    expect(result.current.loading).toBe(false);
    expect(result.current.vehicles).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it("getVehiclePrice returns matching vehicle", async () => {
    vi.mocked(getPricingConfig).mockResolvedValue({
      success: true,
      data: {
        vehicles: [
          { id: "v1", type: "CAR", name: "Car", basePrice: 10, pricePerKm: 2, minimumFare: 8, isAvailable: true },
        ],
        commissionRate: 0.2,
        coupons: [],
        history: [],
      },
    } as never);

    const { result } = renderHook(() => usePricing());
    await flushPolling();

    expect(result.current.loading).toBe(false);
    expect(result.current.getVehiclePrice("CAR")?.basePrice).toBe(10);
    expect(result.current.getVehiclePrice("BIKE")).toBeNull();
  });

  it("handles API errors", async () => {
    vi.mocked(getPricingConfig).mockRejectedValue(new Error("Server error"));

    const { result } = renderHook(() => usePricing());
    await flushPolling();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Server error");
  });
});
