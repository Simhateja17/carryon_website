import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomUUID } from "crypto";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// ── Input validation schemas ─────────────────────────────────

const VEHICLE_TYPES = ["BIKE", "CAR", "PICKUP", "VAN_7FT", "VAN_9FT", "LORRY_10FT", "LORRY_14FT", "LORRY_17FT"] as const;

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
  paymentMethod: z.enum(["CASH", "UPI", "CARD", "WALLET"]).optional(),
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

const ExtraChargeReviewSchema = z.object({
  decision: z.enum(["APPROVED", "REJECTED"]),
  reason: z.string().optional(),
});

const NotificationSettingsSchema = z.object({
  alerts: z.array(z.object({
    type: z.enum(["delay", "order", "offline", "fuel"]),
    label: z.string(),
    sub: z.string(),
    sms: z.boolean(),
    push: z.boolean(),
    email: z.boolean(),
  }).strict()),
}).strict();

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
    type: z.enum(VEHICLE_TYPES),
    label: z.string().min(1).max(80),
    description: z.string().min(1).max(180),
    enabled: z.boolean(),
  }).strict()),
}).strict();

const PricingVehiclesSchema = z.object({
  vehicles: z.array(z.object({
    id: z.string().nullable(),
    type: z.enum(VEHICLE_TYPES),
    name: z.string().min(1),
    basePrice: z.number().min(0),
    pricePerKm: z.number().min(0),
    minimumFare: z.number().min(0),
    isAvailable: z.boolean(),
  }).strict()),
}).strict();

const CoordinateSchema = z.object({ lat: z.number(), lng: z.number() });

const RouteDistanceSchema = z.object({
  from: CoordinateSchema,
  to: CoordinateSchema,
});

// ── Mutation validation map ──────────────────────────────────
// Maps "METHOD path-pattern" → Zod schema.  Path patterns use * for
// dynamic segments (e.g. "PUT drivers/*/verify").

const MUTATION_SCHEMAS: Array<{ method: string; pattern: RegExp; schema: z.ZodTypeAny }> = [
  { method: "POST", pattern: /^notifications\/send$/, schema: SendNotificationSchema },
  { method: "POST", pattern: /^notifications\/ride-request$/, schema: RideRequestSchema },
  { method: "PUT",  pattern: /^drivers\/[^/]+\/documents\/[^/]+\/review$/, schema: DocumentReviewSchema },
  { method: "PUT",  pattern: /^drivers\/[^/]+\/verify$/, schema: DriverVerifySchema },
  { method: "POST", pattern: /^drivers\/[^/]+\/pii\/reveal$/, schema: DriverPiiRevealSchema },
  { method: "POST", pattern: /^extra-charges\/[^/]+\/review$/, schema: ExtraChargeReviewSchema },
  { method: "PUT",  pattern: /^settings\/notifications$/, schema: NotificationSettingsSchema },
  { method: "PUT",  pattern: /^settings\/fleet$/, schema: FleetSettingsSchema },
  { method: "PUT",  pattern: /^pricing\/vehicles$/, schema: PricingVehiclesSchema },
  { method: "POST", pattern: /^maps\/distance$/, schema: RouteDistanceSchema },
  // maps/optimize/run accepts empty body — no schema needed
];

const PRODUCTION_URL = "https://api.carryon.my";
const ALLOWED_ADMIN_ROUTES: Record<string, Set<string>> = {
  "command-center": new Set(["GET"]),
  drivers: new Set(["GET", "PUT", "POST"]),
  notifications: new Set(["GET", "POST"]),
  "extra-charges": new Set(["GET", "POST"]),
  maps: new Set(["GET", "POST"]),
  pricing: new Set(["GET", "PUT"]),
  settings: new Set(["GET", "PUT"]),
  bookings: new Set(["GET"]),
  customers: new Set(["GET"]),
};

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
  const { data: isAdmin, error: adminLookupError } = await supabase.rpc(
    "is_admin_email",
    { check_email: adminEmail }
  );

  if (adminLookupError || !isAdmin) {
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
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
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
  headers.set("x-admin-request-id", request.headers.get("x-request-id") || randomUUID());

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
