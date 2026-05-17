import { describe, expect, it } from "vitest";
import { getFleetCoverageCenter, getFleetSettingsDraftError, isResolvedFleetRegion, normalizeFleetSettingsDraft, regionIdFromName, toFleetRegionCoverage, toFleetSettingsSavePayload } from "@/lib/fleetSettings";
import type { AdminFleetSettingsUpdatePayload, AdminFleetRegion } from "@/types";

function region(overrides: Partial<AdminFleetRegion> = {}): AdminFleetRegion {
  return {
    id: "klang-valley",
    name: "Klang Valley",
    hubCount: 0,
    zone: "Greater Kuala Lumpur",
    enabled: true,
    latitude: 3.139,
    longitude: 101.6869,
    radiusKm: 40,
    ...overrides,
  };
}

function settings(regions: AdminFleetRegion[]): AdminFleetSettingsUpdatePayload {
  return {
    regions,
    vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true, pricePerKm: 0.9 }],
  };
}

describe("fleet settings region rules", () => {
  it("keeps stable fallback ids for unresolved names", () => {
    expect(regionIdFromName("", "region-1")).toBe("region-1");
    expect(regionIdFromName("Kuala Lumpur", "region-1")).toBe("kuala-lumpur");
  });

  it("requires selected city metadata before a region can be saved", () => {
    expect(isResolvedFleetRegion(region())).toBe(true);
    expect(isResolvedFleetRegion(region({ latitude: null, longitude: null, zone: "" }))).toBe(false);
  });

  it("blocks saving unresolved regions before the proxy/backend validators reject them", () => {
    expect(getFleetSettingsDraftError(settings([region()]))).toBe("");
    expect(getFleetSettingsDraftError(settings([region({ name: "H", latitude: null, longitude: null, zone: "" })]))).toContain("Region 1");
  });

  it("blocks invalid vehicle pricing before the proxy/backend validators reject it", () => {
    expect(getFleetSettingsDraftError({
      ...settings([region()]),
      vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true, pricePerKm: 0 }],
    })).toContain("Vehicle price 1");
  });

  it("blocks invalid region radius before the proxy/backend validators reject it", () => {
    expect(getFleetSettingsDraftError(settings([region({ radiusKm: 300 })]))).toContain("Region 1 radius");
  });

  it("normalizes old fleet settings snapshots with missing vehicle prices", () => {
    const normalized = normalizeFleetSettingsDraft({
      regions: [region()],
      vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true, pricePerKm: undefined as unknown as number }],
    });

    expect(normalized.vehicleClasses).toHaveLength(8);
    expect(normalized.vehicleClasses[0]).toEqual({
      type: "BIKE",
      label: "Bikes",
      description: "Bike routes",
      enabled: true,
      pricePerKm: 0.9,
    });
    expect(normalized.vehicleClasses.every((vehicle) => Number.isFinite(vehicle.pricePerKm))).toBe(true);
  });

  it("maps enabled resolved regions to coverage circles", () => {
    const coverage = toFleetRegionCoverage([
      region({ id: "klang-valley", radiusKm: 40 }),
      region({ id: "disabled", name: "Disabled", enabled: false, radiusKm: 20 }),
      region({ id: "draft", name: "Draft", latitude: null, longitude: null, zone: "" }),
    ]);

    expect(coverage).toEqual([
      {
        id: "klang-valley",
        center: { lat: 3.139, lng: 101.6869 },
        radiusMeters: 40000,
        label: "Klang Valley",
        detail: "40 km radius - Greater Kuala Lumpur",
        zone: "Greater Kuala Lumpur",
      },
    ]);
  });

  it("derives a stable center for multiple coverage regions", () => {
    expect(getFleetCoverageCenter(toFleetRegionCoverage([
      region({ latitude: 2, longitude: 100 }),
      region({ id: "penang", name: "Penang", latitude: 6, longitude: 104 }),
    ]))).toEqual({ lat: 4, lng: 102 });
    expect(getFleetCoverageCenter([])).toBeNull();
  });

  it("removes read-model fields before saving fleet settings", () => {
    const payload = toFleetSettingsSavePayload({
      ...settings([region()]),
      vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true, pricePerKm: 0.9, active: 4 }],
    });

    expect(payload.vehicleClasses[0]).toEqual({
      type: "BIKE",
      label: "Bikes",
      description: "Bike routes",
      enabled: true,
      pricePerKm: 0.9,
    });
    expect("active" in payload.vehicleClasses[0]).toBe(false);
  });
});
