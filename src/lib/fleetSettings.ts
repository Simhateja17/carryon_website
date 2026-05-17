import type { AdminFleetSettingsUpdatePayload, AdminFleetRegion, MapCoordinate } from "@/types";
import { FLEET_PRICE_PER_KM_MAX, FLEET_PRICE_PER_KM_MIN, REGION_RADIUS_KM_MAX, REGION_RADIUS_KM_MIN } from "@/lib/fleetSettingsContract";

export interface FleetRegionCoverage {
  id: string;
  center: MapCoordinate;
  radiusMeters: number;
  label: string;
  detail: string;
  zone: string;
}

const DEFAULT_VEHICLE_CLASSES: AdminFleetSettingsUpdatePayload["vehicleClasses"] = [
  { type: "BIKE", label: "Bikes", description: "Bike routes. Max payload 25kg.", enabled: true, pricePerKm: 0.90 },
  { type: "CAR", label: "Cars", description: "Car routes. Max payload 400kg.", enabled: true, pricePerKm: 1.17 },
  { type: "PICKUP", label: "Pickups", description: "Pickup routes. Max payload 800kg.", enabled: true, pricePerKm: 3.40 },
  { type: "VAN_7FT", label: "7ft Vans", description: "Van 7ft routes. Max payload 1,200kg.", enabled: true, pricePerKm: 5.40 },
  { type: "VAN_9FT", label: "9ft Vans", description: "Van 9ft routes. Max payload 1,600kg.", enabled: true, pricePerKm: 6.40 },
  { type: "LORRY_10FT", label: "10ft Lorries", description: "Lorry 10ft routes. Max payload 3,000kg.", enabled: true, pricePerKm: 8.23 },
  { type: "LORRY_14FT", label: "14ft Lorries", description: "Lorry 14ft routes. Max payload 5,000kg.", enabled: true, pricePerKm: 11.60 },
  { type: "LORRY_17FT", label: "17ft Lorries", description: "Lorry 17ft routes. Max payload 8,000kg.", enabled: true, pricePerKm: 15.60 },
];

function validPricePerKm(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= FLEET_PRICE_PER_KM_MIN && value <= FLEET_PRICE_PER_KM_MAX;
}

export function regionIdFromName(name: string, fallback: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || fallback;
}

export function isResolvedFleetRegion(region: AdminFleetRegion) {
  return (
    region.name.trim().length > 0 &&
    region.zone.trim().length > 0 &&
    region.latitude != null &&
    region.longitude != null &&
    region.radiusKm != null
  );
}

export function toFleetRegionCoverage(regions: AdminFleetRegion[]): FleetRegionCoverage[] {
  return regions
    .filter((region) => region.enabled && isResolvedFleetRegion(region))
    .map((region) => ({
      id: region.id,
      center: { lat: region.latitude!, lng: region.longitude! },
      radiusMeters: Math.round((region.radiusKm ?? 0) * 1000),
      label: region.name,
      detail: `${region.radiusKm} km radius${region.zone ? ` - ${region.zone}` : ""}`,
      zone: region.zone,
    }));
}

export function getFleetCoverageCenter(coverages: FleetRegionCoverage[]): MapCoordinate | null {
  if (coverages.length === 0) return null;
  const totals = coverages.reduce(
    (acc, coverage) => ({
      lat: acc.lat + coverage.center.lat,
      lng: acc.lng + coverage.center.lng,
    }),
    { lat: 0, lng: 0 }
  );
  return {
    lat: totals.lat / coverages.length,
    lng: totals.lng / coverages.length,
  };
}

export function getFleetSettingsDraftError(settings: AdminFleetSettingsUpdatePayload) {
  const unresolvedIndex = settings.regions.findIndex((region) => !isResolvedFleetRegion(region));
  if (unresolvedIndex >= 0) {
    return `Region ${unresolvedIndex + 1} is not ready. Search and select a city from suggestions before saving.`;
  }
  const invalidRadiusIndex = settings.regions.findIndex((region) => {
    if (region.radiusKm == null) return false;
    return !Number.isFinite(region.radiusKm) || region.radiusKm < REGION_RADIUS_KM_MIN || region.radiusKm > REGION_RADIUS_KM_MAX;
  });
  if (invalidRadiusIndex >= 0) {
    return `Region ${invalidRadiusIndex + 1} radius must be between ${REGION_RADIUS_KM_MIN} and ${REGION_RADIUS_KM_MAX} km.`;
  }
  const invalidPriceIndex = settings.vehicleClasses.findIndex((vehicle) => !validPricePerKm(vehicle.pricePerKm));
  if (invalidPriceIndex >= 0) {
    return `Vehicle price ${invalidPriceIndex + 1} must be between RM ${FLEET_PRICE_PER_KM_MIN.toFixed(2)} and RM ${FLEET_PRICE_PER_KM_MAX.toFixed(2)} per km.`;
  }
  return "";
}

export function normalizeFleetSettingsDraft(settings: AdminFleetSettingsUpdatePayload): AdminFleetSettingsUpdatePayload {
  const classesByType = new Map(settings.vehicleClasses.map((entry) => [entry.type, entry]));

  return {
    regions: settings.regions.map((region) => ({ ...region })),
    vehicleClasses: DEFAULT_VEHICLE_CLASSES.map((fallback) => {
      const existing = classesByType.get(fallback.type);
      const pricePerKm = validPricePerKm(existing?.pricePerKm) ? existing.pricePerKm : fallback.pricePerKm;
      return {
        ...fallback,
        ...existing,
        label: existing?.label?.trim() || fallback.label,
        description: existing?.description?.trim() || fallback.description,
        enabled: existing?.enabled !== false,
        pricePerKm: Number(pricePerKm.toFixed(2)),
      };
    }),
  };
}

export function toFleetSettingsSavePayload(settings: AdminFleetSettingsUpdatePayload): AdminFleetSettingsUpdatePayload {
  const normalized = normalizeFleetSettingsDraft(settings);
  return {
    regions: normalized.regions.map((region) => ({ ...region })),
    vehicleClasses: normalized.vehicleClasses.map(({ type, label, description, enabled, pricePerKm }) => ({
      type,
      label,
      description,
      enabled,
      pricePerKm,
    })),
  };
}
