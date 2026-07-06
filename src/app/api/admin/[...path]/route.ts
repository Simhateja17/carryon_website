import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomUUID } from "crypto";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { FleetSettingsSchema, VEHICLE_TYPES } from "@/lib/fleetSettingsContract";
import { NotificationSettingsSchema } from "@/lib/notificationSettingsContract";

// ── Input validation schemas ─────────────────────────────────

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
  vehicleType: z.enum(VEHICLE_TYPES),
  paymentMethod: z.enum(["STRIPE", "CASH", "UPI", "CARD", "WALLET"]).optional(),
  driverIds: z.array(z.string()).optional(),
});

const SendNotificationSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.string().min(1),
  audience: z.enum(["all", "online"]),
});

const DocumentReviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  rejectionReason: z.string().optional(),
});

const DriverVerifySchema = z.object({
  verificationStatus: z.enum(["PENDING", "IN_REVIEW", "APPROVED", "REJECTED"]),
  rejectionReason: z.string().trim().min(3).max(1000).optional(),
}).strict();

const DriverPiiRevealSchema = z.object({
  field: z.enum([
    "mykadNumber",
    "passportNumber",
    "plksNumber",
    "driversLicenseNumber",
    "bankAccountNumber",
    "duitNowId",
    "tngEwalletId",
    "lhdnTaxNumber",
    "sstNumber",
  ]),
  reason: z.string().trim().min(3).max(160),
}).strict();

const DriverBankReviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  rejectionReason: z.string().trim().max(1000).optional(),
}).strict();

const PayoutMarkPaidSchema = z.object({
  reference: z.string().trim().min(3).max(160),
}).strict();

const PayoutFailSchema = z.object({
  reason: z.string().trim().min(3).max(1000),
}).strict();

const PayoutDestinationRevealSchema = z.object({
  reason: z.string().trim().min(3).max(160),
}).strict();

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
  driversLicenseNumber: z.string().trim().max(80).optional(),
  licenseClass: z.string().trim().max(40).optional(),
  licenseExpiry: z.string().trim().max(40).optional(),
  emergencyContactName: z.string().trim().max(160).optional(),
  emergencyContactRelation: z.string().trim().max(80).optional(),
  emergencyContactPhone: z.string().trim().max(40).optional(),
  pdpaConsent: z.boolean().optional(),
  backgroundCheckConsent: z.boolean().optional(),
  noOffencesDeclared: z.boolean().optional(),
  vehicle: z.object({
    type: z.enum(VEHICLE_TYPES),
    make: z.string().trim().max(80).optional(),
    model: z.string().trim().max(80).optional(),
    year: z.number().int().min(1980).max(2100),
    licensePlate: z.string().trim().max(40).optional(),
    color: z.string().trim().max(40).optional(),
    chassisNumber: z.string().trim().max(80).optional(),
    engineNumber: z.string().trim().max(80).optional(),
    ownership: z.string().trim().max(40).optional(),
    ownerName: z.string().trim().max(160).optional(),
    roadTaxExpiry: z.string().trim().max(40).optional(),
    insurerName: z.string().trim().max(160).optional(),
    insurancePolicyNumber: z.string().trim().max(120).optional(),
    insuranceExpiry: z.string().trim().max(40).optional(),
    hasCommercialCover: z.boolean().optional(),
  }).strict().optional(),
  documents: z.array(z.object({
    type: z.enum([
      "DRIVERS_LICENSE",
      "DRIVERS_LICENSE_BACK",
      "GDL",
      "VEHICLE_REGISTRATION",
      "ROAD_TAX",
      "PUSPAKOM",
      "APAD_PERMIT",
      "VEHICLE_PHOTO_FRONT",
      "VEHICLE_PHOTO_BACK",
      "VEHICLE_PHOTO_LEFT",
      "VEHICLE_PHOTO_RIGHT",
      "VEHICLE_PHOTO_INTERIOR",
      "BANK_STATEMENT",
      "POLICE_CLEARANCE",
      "INSURANCE",
      "PROFILE_PHOTO",
      "ID_PROOF",
      "MYKAD_FRONT",
      "MYKAD_BACK",
      "SELFIE",
      "PASSPORT",
      "WORK_PERMIT_PLKS",
    ]),
    imageUrl: z.string().trim().min(1).max(500).refine((value) => !value.startsWith("http"), {
      message: "Use a storage object path, not a public URL",
    }),
    expiryDate: z.string().trim().max(40).optional(),
  }).strict()).max(32).optional(),
}).strict();

const ExtraChargeReviewSchema = z.object({
  decision: z.enum(["APPROVED", "REJECTED"]),
  reason: z.string().optional(),
});

const SupportReplySchema = z.object({
  message: z.string().max(5000).optional(),
  internal: z.boolean().optional(),
  attachments: z.array(z.object({
    fileUrl: z.string().min(1),
    storagePath: z.string().min(1).optional(),
    mimeType: z.string().min(1),
    fileSize: z.number().int().positive().max(5 * 1024 * 1024),
  }).strict()).max(5).optional(),
}).strict();

const SupportStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
}).strict();

const CitySuggestionsSchema = z.object({
  query: z.string().trim().min(2).max(120),
}).strict();

const PricingVehiclesSchema = z.object({
  vehicles: z.array(z.object({
    id: z.string().nullable(),
    type: z.enum(VEHICLE_TYPES),
    name: z.string().trim().min(1).max(80),
    basePrice: z.number().finite().min(0).max(100000),
    pricePerKm: z.number().finite().min(0).max(10000),
    minimumFare: z.number().finite().min(0).max(100000),
    isAvailable: z.boolean(),
  }).strict()).max(20),
}).strict();

const CoordinateSchema = z.object({ lat: z.number(), lng: z.number() });

const RouteDistanceSchema = z.object({
  from: CoordinateSchema,
  to: CoordinateSchema,
});

const AdminSecuritySettingsSchema = z.object({
  twoFactorRequired: z.boolean(),
  loginAlertsEnabled: z.boolean(),
  suspiciousActivityDetectionEnabled: z.boolean(),
  ipRestrictedAccessEnabled: z.boolean(),
}).strict();

// ── Mutation validation map ──────────────────────────────────
// Maps "METHOD path-pattern" → Zod schema.  Path patterns use * for
// dynamic segments (e.g. "PUT drivers/*/verify").

const MUTATION_SCHEMAS: Array<{ method: string; pattern: RegExp; schema: z.ZodTypeAny }> = [
  { method: "POST", pattern: /^notifications\/send$/, schema: SendNotificationSchema },
  { method: "POST", pattern: /^drivers$/, schema: DriverRegistrationSchema },
  { method: "PUT",  pattern: /^drivers\/[^/]+\/documents\/[^/]+\/review$/, schema: DocumentReviewSchema },
  { method: "PUT",  pattern: /^drivers\/[^/]+\/verify$/, schema: DriverVerifySchema },
  { method: "POST", pattern: /^drivers\/[^/]+\/pii\/reveal$/, schema: DriverPiiRevealSchema },
  { method: "PUT",  pattern: /^drivers\/[^/]+\/bank-details\/review$/, schema: DriverBankReviewSchema },
  { method: "POST", pattern: /^payouts\/[^/]+\/mark-paid$/, schema: PayoutMarkPaidSchema },
  { method: "POST", pattern: /^payouts\/[^/]+\/fail$/, schema: PayoutFailSchema },
  { method: "POST", pattern: /^payouts\/[^/]+\/destination\/reveal$/, schema: PayoutDestinationRevealSchema },
  { method: "POST", pattern: /^extra-charges\/[^/]+\/review$/, schema: ExtraChargeReviewSchema },
  { method: "POST", pattern: /^support\/tickets\/[^/]+\/reply$/, schema: SupportReplySchema },
  { method: "POST", pattern: /^support\/tickets\/[^/]+\/status$/, schema: SupportStatusSchema },
  { method: "PUT",  pattern: /^settings\/notifications$/, schema: NotificationSettingsSchema },
  { method: "POST", pattern: /^settings\/city-suggestions$/, schema: CitySuggestionsSchema },
  { method: "PUT",  pattern: /^settings\/fleet$/, schema: FleetSettingsSchema },
  { method: "PUT",  pattern: /^pricing\/vehicles$/, schema: PricingVehiclesSchema },
  { method: "POST", pattern: /^maps\/distance$/, schema: RouteDistanceSchema },
  { method: "PUT",  pattern: /^users\/security$/, schema: AdminSecuritySettingsSchema },
];

const PRODUCTION_URL = "https://api.carryon.my";
const ALLOWED_ADMIN_ROUTES: Record<string, Set<string>> = {
  "command-center": new Set(["GET"]),
  drivers: new Set(["GET", "PUT", "POST"]),
  payouts: new Set(["GET", "POST"]),
  notifications: new Set(["GET", "POST"]),
  "extra-charges": new Set(["GET", "POST"]),
  "safety-fraud": new Set(["GET"]),
  maps: new Set(["GET", "POST"]),
  pricing: new Set(["GET", "PUT"]),
  settings: new Set(["GET", "POST", "PUT"]),
  bookings: new Set(["GET"]),
  customers: new Set(["GET"]),
  revenue: new Set(["GET"]),
  analytics: new Set(["GET"]),
  support: new Set(["GET", "POST"]),
  users: new Set(["GET", "PUT"]),
}

function backendBaseUrl() {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    PRODUCTION_URL
  ).replace(/\/$/, "");
}

function signingSecret() {
  if (process.env.ADMIN_PROXY_SIGNING_SECRET) return process.env.ADMIN_PROXY_SIGNING_SECRET;
  if (process.env.NODE_ENV !== "production") {
    // SECURITY: ADMIN_PROXY_SIGNING_SECRET is not set — falling back to ADMIN_API_KEY.
    // Generate a strong secret with: openssl rand -base64 32
    // Set it as ADMIN_PROXY_SIGNING_SECRET in your .env.local
    console.warn(
      "[admin-proxy] ADMIN_PROXY_SIGNING_SECRET not set — using fallback ADMIN_API_KEY. " +
      "Set a strong secret before deploying to production."
    );
  }
  return process.env.NODE_ENV === "production" ? "" : process.env.ADMIN_API_KEY || "";
}

function signAdminAssertion(input: {
  method: string;
  pathname: string;
  search: string;
  actorId: string;
  actorEmail: string;
  issuedAt: number;
  expiresAt: number;
  nonce: string;
}) {
  const secret = signingSecret();
  if (!secret) return null;
  const payload = [
    input.method.toUpperCase(),
    input.pathname,
    input.search,
    input.actorId,
    input.actorEmail,
    String(input.issuedAt),
    String(input.expiresAt),
    input.nonce,
  ].join("\n");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

async function proxyAdminRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  // Verify Supabase session before proxying any request
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: admin login required" },
      { status: 401 }
    );
  }

  const adminEmail = user.email || "";
  const appMetadata = user.app_metadata as Record<string, unknown>;
  let isAdmin = appMetadata.role === "admin" || appMetadata.admin === true;
  if (!isAdmin && adminEmail) {
    const { data: legacyAdmin, error: legacyAdminError } = await supabase.rpc(
      "is_admin_email",
      { check_email: adminEmail }
    );
    if (!legacyAdminError && legacyAdmin === true) {
      isAdmin = true;
    }
  }

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Forbidden: admin access required" },
      { status: 403 }
    );
  }

  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || !signingSecret()) {
    return NextResponse.json(
      { success: false, message: "Admin access is not configured" },
      { status: 503 }
    );
  }

  const params = await context.params;
  const requestId = request.headers.get("x-request-id") || randomUUID();
  if (params.path.some((segment) => segment === "." || segment === "..")) {
    return NextResponse.json(
      { success: false, message: "Invalid admin path" },
      { status: 400 }
    );
  }

  const routeRoot = params.path[0];
  const allowedMethods = ALLOWED_ADMIN_ROUTES[routeRoot];
  if (!allowedMethods || !allowedMethods.has(request.method)) {
    return NextResponse.json(
      { success: false, message: "Admin route is not allowed" },
      { status: 404 }
    );
  }

  // ── Validate mutation payloads ───────────────────────────────
  const joinedPath = params.path.join("/");
  if (request.method === "POST" && routeRoot === "settings" && joinedPath !== "settings/city-suggestions") {
    return NextResponse.json(
      { success: false, message: "Admin route is not allowed" },
      { status: 404 }
    );
  }

  const matchedSchema = MUTATION_SCHEMAS.find(
    (entry) => entry.method === request.method && entry.pattern.test(joinedPath)
  );

  if (matchedSchema) {
    let body: unknown;
    try {
      body = await request.clone().json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }
    const result = matchedSchema.schema.safeParse(body);
    if (!result.success) {
      const flattened = result.error.flatten();
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: flattened.fieldErrors,
          formErrors: flattened.formErrors,
        },
        { status: 422 }
      );
    }
  }

  const targetUrl = new URL(`/api/admin/${joinedPath}`, backendBaseUrl());
  if (!targetUrl.pathname.startsWith("/api/admin/")) {
    return NextResponse.json(
      { success: false, message: "Invalid admin path" },
      { status: 400 }
    );
  }
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");
  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);

  const issuedAt = Date.now();
  const expiresAt = issuedAt + 60_000;
  const nonce = randomUUID();
  const signature = signAdminAssertion({
    method: request.method,
    pathname: targetUrl.pathname,
    search: targetUrl.search,
    actorId: user.id,
    actorEmail: adminEmail,
    issuedAt,
    expiresAt,
    nonce,
  });
  if (!signature) {
    return NextResponse.json(
      { success: false, message: "Admin access is not configured" },
      { status: 503 }
    );
  }

  headers.set("x-admin-key", adminKey);
  headers.set("x-admin-proxy", "admin-panel");
  headers.set("x-admin-actor-id", user.id);
  headers.set("x-admin-actor-email", adminEmail);
  headers.set("x-admin-issued-at", String(issuedAt));
  headers.set("x-admin-expires-at", String(expiresAt));
  headers.set("x-admin-nonce", nonce);
  headers.set("x-admin-signature", signature);
  headers.set("x-admin-request-id", requestId);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  let response: Response;
  try {
    response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : await request.arrayBuffer(),
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error && err.name === "AbortError"
          ? "Admin backend timed out"
          : "Admin backend unavailable",
      },
      { status:  upstreamStatus(err) }
    );
  } finally {
    clearTimeout(timeout);
  }

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyAdminRequest;
export const POST = proxyAdminRequest;
export const PUT = proxyAdminRequest;

function upstreamStatus(err: unknown) {
  return err instanceof Error && err.name === "AbortError" ? 504 : 502;
}
