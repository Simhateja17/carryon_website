import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

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
