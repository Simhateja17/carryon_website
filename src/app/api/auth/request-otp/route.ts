import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const OtpRequestSchema = z.object({
  email: z.string().email("Invalid email address").max(254, "Email too long"),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = OtpRequestSchema.safeParse(body);
  if (!result.success) {
    // Return same response shape as valid requests to prevent email enumeration
    return NextResponse.json({ success: true });
  }

  const { email } = result.data;

  const supabase = await createClient();

  // Check if this email is an admin before sending OTP
  const { data: isAdmin, error: rpcError } = await supabase.rpc(
    "is_admin_email",
    { check_email: email }
  );

  if (rpcError) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Always return the same message to avoid email enumeration
  if (!isAdmin) {
    return NextResponse.json({ success: true });
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
