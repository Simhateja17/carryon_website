import { describe, it, expect } from "vitest";
import { z } from "zod";
import { FleetSettingsSchema, VEHICLE_TYPES } from "@/lib/fleetSettingsContract";
import { NotificationSettingsSchema } from "@/lib/notificationSettingsContract";

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

const DriverRegistrationSchema = z.object({
  name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(3).max(40),
  dateOfBirth: z.string().trim().max(40).optional(),
  governmentId: z.string().trim().max(80).optional(),
  addressLine1: z.string().trim().max(320).optional(),
  addressLine2: z.string().trim().max(320).optional(),
  city: z.string().trim().max(80).optional(),
  postcode: z.string().trim().max(20).optional(),
  state: z.string().trim().max(80).optional(),
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
    const rest: Partial<typeof validLocation> = { ...validLocation };
    delete rest.latitude;
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
    const rest: Partial<typeof validRequest> = { ...validRequest };
    delete rest.from;
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
    for (const vehicleType of VEHICLE_TYPES) {
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

describe("DriverRegistrationSchema", () => {
  const validDriver = {
    name: "Nur Aisyah",
    email: "driver@example.com",
    phone: "+60123456789",
    dateOfBirth: "1990-01-01",
    governmentId: "900101-01-1234",
    addressLine1: "12 Jalan Ampang",
  };

  it("accepts a valid admin driver registration", () => {
    expect(DriverRegistrationSchema.safeParse(validDriver).success).toBe(true);
  });

  it("rejects invalid email and missing phone before proxy signing", () => {
    expect(DriverRegistrationSchema.safeParse({ ...validDriver, email: "bad" }).success).toBe(false);
    expect(DriverRegistrationSchema.safeParse({ ...validDriver, phone: "" }).success).toBe(false);
  });

  it("rejects extra fields before proxy signing", () => {
    expect(DriverRegistrationSchema.safeParse({ ...validDriver, isVerified: true }).success).toBe(false);
  });
});

describe("FleetSettingsSchema", () => {
  const validFleetSettings = {
    regions: [{ id: "klang-valley", name: "Klang Valley", hubCount: 42, zone: "Greater KL", enabled: true, latitude: 3.139, longitude: 101.6869, radiusKm: 40 }],
    vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true, pricePerKm: 0.9 }],
  };

  it("accepts a valid fleet settings payload", () => {
    expect(FleetSettingsSchema.safeParse(validFleetSettings).success).toBe(true);
  });

  it("rejects extra fields before proxy signing", () => {
    expect(FleetSettingsSchema.safeParse({ ...validFleetSettings, admin: true }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      regions: [{ ...validFleetSettings.regions[0], displayColor: "blue" }],
    }).success).toBe(false);
  });

  it("rejects invalid vehicle types", () => {
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      vehicleClasses: [{ type: "HELICOPTER", label: "Bad", description: "Bad", enabled: true, pricePerKm: 0.9 }],
    }).success).toBe(false);
  });

  it("rejects invalid or missing vehicle price before proxy signing", () => {
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      vehicleClasses: [{ ...validFleetSettings.vehicleClasses[0], pricePerKm: 0 }],
    }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      vehicleClasses: [{ ...validFleetSettings.vehicleClasses[0], pricePerKm: 51 }],
    }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      vehicleClasses: [{ type: "BIKE", label: "Bikes", description: "Bike routes", enabled: true }],
    }).success).toBe(false);
  });

  it("rejects unsafe fleet region geometry before proxy signing", () => {
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      regions: [{ ...validFleetSettings.regions[0], latitude: 91 }],
    }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      regions: [{ ...validFleetSettings.regions[0], longitude: 181 }],
    }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      regions: [{ ...validFleetSettings.regions[0], radiusKm: 201 }],
    }).success).toBe(false);
    expect(FleetSettingsSchema.safeParse({
      ...validFleetSettings,
      regions: [{ ...validFleetSettings.regions[0], radiusMeters: 40000 }],
    }).success).toBe(false);
  });
});

describe("NotificationSettingsSchema", () => {
  const validSettings = {
    alerts: [{
      type: "delay",
      label: "Critical Delays",
      sub: "Shipment is behind schedule",
      sms: true,
      push: true,
      email: false,
    }],
  };

  it("accepts valid notification settings", () => {
    expect(NotificationSettingsSchema.safeParse(validSettings).success).toBe(true);
  });

  it("rejects extra fields before proxy signing", () => {
    expect(NotificationSettingsSchema.safeParse({ ...validSettings, admin: true }).success).toBe(false);
    expect(NotificationSettingsSchema.safeParse({
      alerts: [{ ...validSettings.alerts[0], webhookUrl: "https://example.com" }],
    }).success).toBe(false);
  });

  it("rejects invalid alert content before proxy signing", () => {
    expect(NotificationSettingsSchema.safeParse({
      alerts: [{ ...validSettings.alerts[0], type: "billing-token" }],
    }).success).toBe(false);
    expect(NotificationSettingsSchema.safeParse({
      alerts: [{ ...validSettings.alerts[0], label: "" }],
    }).success).toBe(false);
    expect(NotificationSettingsSchema.safeParse({
      alerts: Array.from({ length: 21 }, () => validSettings.alerts[0]),
    }).success).toBe(false);
  });
});
