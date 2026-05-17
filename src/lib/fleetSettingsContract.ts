import { z } from "zod";

export const VEHICLE_TYPES = ["BIKE", "CAR", "PICKUP", "VAN_7FT", "VAN_9FT", "LORRY_10FT", "LORRY_14FT", "LORRY_17FT"] as const;

export const FLEET_PRICE_PER_KM_MIN = 0.10;
export const FLEET_PRICE_PER_KM_MAX = 50;
export const REGION_RADIUS_KM_MIN = 1;
export const REGION_RADIUS_KM_MAX = 200;

export const FleetSettingsSchema = z.object({
  regions: z.array(z.object({
    id: z.string().min(1).max(80),
    name: z.string().min(1).max(80),
    hubCount: z.number().int().min(0).max(10000),
    zone: z.string().min(1).max(120),
    enabled: z.boolean(),
    latitude: z.number().min(-90).max(90).nullable(),
    longitude: z.number().min(-180).max(180).nullable(),
    radiusKm: z.number().min(REGION_RADIUS_KM_MIN).max(REGION_RADIUS_KM_MAX).nullable(),
  }).strict()).max(50),
  vehicleClasses: z.array(z.object({
    type: z.enum(VEHICLE_TYPES),
    label: z.string().min(1).max(80),
    description: z.string().min(1).max(180),
    enabled: z.boolean(),
    pricePerKm: z.number().min(FLEET_PRICE_PER_KM_MIN).max(FLEET_PRICE_PER_KM_MAX),
  }).strict()),
}).strict();
