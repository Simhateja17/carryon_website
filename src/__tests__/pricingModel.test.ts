import { describe, expect, it } from "vitest";
import {
  calculatePricingPreview,
  platformCommissionPercent,
  selectPreviewVehicle,
  toEditablePricingVehicles,
  toPricingVehiclePayload,
} from "@/lib/pricingModel";
import type { AdminPricingSnapshot, AdminPricingVehicle } from "@/types";

const vehicles: AdminPricingVehicle[] = [
  { id: "bike", type: "BIKE", name: "Bike", basePrice: 2.7, pricePerKm: 0.9, minimumFare: 4.5, isAvailable: true },
  { id: "truck", type: "LORRY_10FT", name: "Lorry 10ft", basePrice: 24.69, pricePerKm: 8.23, minimumFare: 41.15, isAvailable: true },
];

const snapshot: AdminPricingSnapshot = {
  vehicles,
  commissionRate: 0.88,
  coupons: [],
  history: [],
};

describe("pricingModel", () => {
  it("keeps editable fare fields as strings until save", () => {
    expect(toEditablePricingVehicles(vehicles)[0]).toMatchObject({
      basePrice: "2.7",
      pricePerKm: "0.9",
      minimumFare: "4.5",
    });
  });

  it("parses and rounds editable vehicles for the update payload", () => {
    const editable = toEditablePricingVehicles(vehicles);
    editable[0].basePrice = "2.736";

    expect(toPricingVehiclePayload(editable)[0].basePrice).toBe(2.74);
  });

  it("rejects empty or negative fare fields before calling the API", () => {
    const editable = toEditablePricingVehicles(vehicles);
    editable[0].pricePerKm = "";

    expect(() => toPricingVehiclePayload(editable)).toThrow("per km rate is required");

    editable[0].pricePerKm = "-1";
    expect(() => toPricingVehiclePayload(editable)).toThrow("per km rate must be a non-negative number");
  });

  it("selects the requested vehicle and falls back to the first available vehicle", () => {
    expect(selectPreviewVehicle(vehicles, "LORRY_10FT")?.id).toBe("truck");
    expect(selectPreviewVehicle(vehicles, "UNKNOWN")?.id).toBe("bike");
  });

  it("calculates fare preview from live vehicle pricing and commission", () => {
    const preview = calculatePricingPreview(snapshot, "BIKE", 2);

    expect(preview).toMatchObject({
      baseFare: 2.7,
      distanceFare: 1.8,
      minimumFareAdjustment: 0,
      total: 4.5,
      driverPayout: 3.96,
      platformCommission: 0.54,
    });
  });

  it("clamps invalid commission rates for display", () => {
    expect(platformCommissionPercent(0.88)).toBe(12);
    expect(platformCommissionPercent(2)).toBe(0);
    expect(platformCommissionPercent(-1)).toBe(100);
  });
});
