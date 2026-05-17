import type { AdminPricingSnapshot, AdminPricingVehicle } from "@/types";

export type EditablePricingVehicle = Omit<AdminPricingVehicle, "basePrice" | "pricePerKm" | "minimumFare"> & {
  basePrice: string;
  pricePerKm: string;
  minimumFare: string;
};

export interface PricingPreview {
  vehicle: AdminPricingVehicle;
  distanceKm: number;
  baseFare: number;
  distanceFare: number;
  subtotal: number;
  minimumFareAdjustment: number;
  total: number;
  platformCommission: number;
  driverPayout: number;
}

export function toEditablePricingVehicles(vehicles: AdminPricingVehicle[]): EditablePricingVehicle[] {
  return vehicles.map((vehicle) => ({
    ...vehicle,
    basePrice: formatEditableNumber(vehicle.basePrice),
    pricePerKm: formatEditableNumber(vehicle.pricePerKm),
    minimumFare: formatEditableNumber(vehicle.minimumFare),
  }));
}

export function toPricingVehiclePayload(vehicles: EditablePricingVehicle[]): AdminPricingVehicle[] {
  return vehicles.map((vehicle) => ({
    ...vehicle,
    basePrice: parseFareField(vehicle.basePrice, "base fare"),
    pricePerKm: parseFareField(vehicle.pricePerKm, "per km rate"),
    minimumFare: parseFareField(vehicle.minimumFare, "minimum fare"),
  }));
}

export function selectPreviewVehicle(
  vehicles: AdminPricingVehicle[],
  selectedType: string | null
) {
  return vehicles.find((vehicle) => vehicle.type === selectedType)
    || vehicles.find((vehicle) => vehicle.isAvailable)
    || vehicles[0]
    || null;
}

export function calculatePricingPreview(
  snapshot: AdminPricingSnapshot,
  selectedType: string | null,
  distanceKm = 12.5
): PricingPreview | null {
  const vehicle = selectPreviewVehicle(snapshot.vehicles, selectedType);
  if (!vehicle) return null;

  const baseFare = roundMoney(vehicle.basePrice);
  const distanceFare = roundMoney(distanceKm * vehicle.pricePerKm);
  const subtotal = roundMoney(baseFare + distanceFare);
  const minimumFareAdjustment = roundMoney(Math.max(0, vehicle.minimumFare - subtotal));
  const total = roundMoney(subtotal + minimumFareAdjustment);
  const driverCommissionRate = clampRate(snapshot.commissionRate);
  const driverPayout = roundMoney(total * driverCommissionRate);

  return {
    vehicle,
    distanceKm,
    baseFare,
    distanceFare,
    subtotal,
    minimumFareAdjustment,
    total,
    driverPayout,
    platformCommission: roundMoney(total - driverPayout),
  };
}

export function platformCommissionPercent(commissionRate: number) {
  return Math.round((1 - clampRate(commissionRate)) * 100);
}

function parseFareField(value: string, label: string) {
  if (value.trim() === "") throw new Error(`${label} is required`);
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative number`);
  }
  return roundMoney(parsed);
}

function formatEditableNumber(value: number) {
  return Number.isFinite(value) ? String(value) : "";
}

function clampRate(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function roundMoney(value: number) {
  return Math.round((Number.isFinite(value) ? value : 0) * 100) / 100;
}
