import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PRODUCTION_URL = "https://api.carryon.my";
const ALLOWED_ADMIN_ROUTES: Record<string, Set<string>> = {
  "command-center": new Set(["GET"]),
  drivers: new Set(["GET", "PUT"]),
  notifications: new Set(["GET", "POST"]),
  "extra-charges": new Set(["GET", "POST"]),
  pricing: new Set(["GET", "PUT"]),
  settings: new Set(["GET", "PUT"]),
};

function backendBaseUrl() {
  return (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    PRODUCTION_URL
  ).replace(/\/$/, "");
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

  if (user.user_metadata?.role !== "admin") {
    return NextResponse.json(
      { success: false, message: "Forbidden: admin access required" },
      { status: 403 }
    );
  }

  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
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

  const path = params.path.join("/");
  const targetUrl = new URL(`/api/admin/${path}`, backendBaseUrl());
  if (!targetUrl.pathname.startsWith("/api/admin/")) {
    return NextResponse.json(
      { success: false, message: "Invalid admin path" },
      { status: 400 }
    );
  }
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.set("x-admin-key", adminKey);
  headers.set("x-admin-proxy", "admin-panel");
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("cookie");
  headers.delete("authorization");

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
export const DELETE = proxyAdminRequest;

function upstreamStatus(err: unknown) {
  return err instanceof Error && err.name === "AbortError" ? 504 : 502;
}
