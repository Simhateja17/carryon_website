import { describe, it, expect } from "vitest";
import { z } from "zod";

// We re-declare the schemas here because they're module-scoped in route files.
// This tests the schema logic itself, not the route handler wiring.

const RideLocationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  latitude: z.number(),
  longitude: z.number(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
  landmark: z.string().optional(),
});

const RideRequestSchema = z.object({
  from: RideLocationSchema,
  to: RideLocationSchema,
  price: z.number().min(0, "Price must be non-negative"),
  vehicleType: z.enum([
    "BIKE", "CAR", "PICKUP", "VAN_7FT", "VAN_9FT",
    "LORRY_10FT", "LORRY_14FT", "LORRY_17FT",
  ]),
  paymentMethod: z.enum(["CASH", "UPI", "CARD", "WALLET"]).optional(),
  driverIds: z.array(z.string()).optional(),
});

const OtpRequestSchema = z.object({
  email: z.string().email("Invalid email address").max(254, "Email too long"),
});

const FleetSettingsSchema = z.object({
  payout: z.object({
    baseRatePerKm: z.number().min(0).max(10000),
    peakMultiplier: z.number().min(1).max(10),
  }).strict(),
  maintenance: z.object({
    mileageThresholdEnabled: z.boolean(),
    mileageThresholdKm: z.number().int().min(100).max(1000000),
    emissionCheckEnabled: z.boolean(),
    telematicsFaultsEnabled: z.boolean(),
    criticalNotification: z.string().min(1).max(120),
  }).strict(),
  regions: z.array(z.object({
    id: z.string().min(1).max(80),
    name: z.string().min(1).max(80),
    hubCount: z.number().int().min(0).max(10000),
    zone: z.string().min(1).max(120),
    enabled: z.boolean(),
  }).strict()).max(50),
  vehicleClasses: z.array(z.object({
    type: z.enum([
      "BIKE", "CAR", "PICKUP", "VAN_7FT", "VAN_9FT",
      "LORRY_10FT", "LORRY_14FT", "LORRY_17FT",
    ]),
    label: z.string().min(1).max(80),
    description: z.string().min(1).max(180),
    enabled: z.boolean(),
  }).strict()),
}).strict();

// ── RideLocationSchema ──────────────────────────────────────

describe("RideLocationSchema", () => {
  const validLocation = {
    address: "123 Main St",
    latitude: 3.139,
    longitude: 101.687,
  };

  it("accepts a valid minimal location", () => {
    expect(RideLocationSchema.safeParse(validLocation).success).toBe(true);
  });

  it("accepts full location with optional fields", () => {
    const full = {
      ...validLocation,
      contactName: "Ali",
      contactPhone: "+60123456789",
      contactEmail: "ali@example.com",
      landmark: "Near the mall",
    };
    expect(RideLocationSchema.safeParse(full).success).toBe(true);
  });

  it("rejects empty address", () => {
    const result = RideLocationSchema.safeParse({ ...validLocation, address: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing latitude", () => {
    const { latitude: _, ...rest } = validLocation;
    expect(RideLocationSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects non-numeric longitude", () => {
    expect(
      RideLocationSchema.safeParse({ ...validLocation, longitude: "abc" }).success
    ).toBe(false);
  });

  it("rejects invalid contactEmail", () => {
    const result = RideLocationSchema.safeParse({
      ...validLocation,
      contactEmail: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});

// ── RideRequestSchema ───────────────────────────────────────

describe("RideRequestSchema", () => {
  const validRequest = {
    from: { address: "A", latitude: 3.1, longitude: 101.6 },
    to: { address: "B", latitude: 3.2, longitude: 101.7 },
    price: 25,
    vehicleType: "CAR",
  };

  it("accepts a valid minimal request", () => {
    expect(RideRequestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("accepts request with all optional fields", () => {
    const full = {
      ...validRequest,
      paymentMethod: "CASH",
      driverIds: ["driver-1", "driver-2"],
    };
    expect(RideRequestSchema.safeParse(full).success).toBe(true);
  });

  it("rejects negative price", () => {
    const result = RideRequestSchema.safeParse({ ...validRequest, price: -1 });
    expect(result.success).toBe(false);
  });

  it("rejects invalid vehicleType", () => {
    const result = RideRequestSchema.safeParse({
      ...validRequest,
      vehicleType: "HELICOPTER",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid paymentMethod", () => {
    const result = RideRequestSchema.safeParse({
      ...validRequest,
      paymentMethod: "CRYPTO",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when from location is missing", () => {
    const { from: _, ...rest } = validRequest;
    expect(RideRequestSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects when to location has empty address", () => {
    const result = RideRequestSchema.safeParse({
      ...validRequest,
      to: { address: "", latitude: 3.2, longitude: 101.7 },
    });
    expect(result.success).toBe(false);
  });

  it("accepts zero price", () => {
    expect(
      RideRequestSchema.safeParse({ ...validRequest, price: 0 }).success
    ).toBe(true);
  });

  it("accepts all vehicle types", () => {
    const types = [
      "BIKE", "CAR", "PICKUP", "VAN_7FT", "VAN_9FT",
      "LORRY_10FT", "LORRY_14FT", "LORRY_17FT",
    ];
    for (const vehicleType of types) {
      expect(
        RideRequestSchema.safeParse({ ...validRequest, vehicleType }).success
      ).toBe(true);
    }
  });
});

// ── OtpRequestSchema ────────────────────────────────────────

describe("OtpRequestSchema", () => {
  it("accepts a valid email", () => {
    expect(OtpRequestSchema.safeParse({ email: "admin@carryon.my" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(OtpRequestSchema.safeParse({ email: "not-email" }).success).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(OtpRequestSchema.safeParse({ email: "" }).success).toBe(false);
  });

  it("rejects email exceeding 254 chars", () => {
    const long = "a".repeat(250) + "@test.com"; // 259 chars, exceeds 254
    expect(OtpRequestSchema.safeParse({ email: long }).success).toBe(false);
  });

  it("rejects missing email field", () => {
    expect(OtpRequestSchema.safeParse({}).success).toBe(false);
  });
});

describe("FleetSettingsSchema", () => {
  const validFleetSettings = {
    payout: { baseRatePerKm: 1.45, peakMultiplier: 1.5 },
    maintenance: {
      mileageThresholdEnabled: true,
      mileageThresholdKm: 5000,
      emissionCheckEnabled: true,
      telematicsFaultsEnabled: false,
      criticalNotification: "Fleet Sync Pending",
    },
    regions: [{ id: "klang-valley", name: "Klang Valley", hubCount: 42, zone: "Greater KL", enabled: true }],
    vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true }],
  };

  it("accepts a valid fleet settings payload", () => {
    expect(FleetSettingsSchema.safeParse(validFleetSettings).success).toBe(true);
  });

  it("rejects extra fields before proxy signing", () => {
    expect(FleetSettingsSchema.safeParse({ ...validFleetSettings, admin: true }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      payout: { ...validFleetSettings.payout, currency: "USD" },
    }).success).toBe(false);
  });

  it("rejects invalid units and vehicle types", () => {
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      maintenance: { ...validFleetSettings.maintenance, mileageThresholdKm: 10 },
    }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      vehicleClasses: [{ type: "HELICOPTER", label: "Bad", description: "Bad", enabled: true }],
    }).success).toBe(false);
  });
});
