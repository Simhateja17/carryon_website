"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Step = "email" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    // Move to OTP step regardless (avoids email enumeration)
    setStep("otp");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      setError("Invalid or expired code. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/command-center");
    router.refresh();
  }

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 400,
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "10px 16px",
    backgroundColor: disabled ? "#a0aec0" : "#2F80ED",
    color: "#fff",
    borderRadius: 8,
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    fontWeight: 500,
    color: "#4a5568",
    marginBottom: 4,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <div style={cardStyle}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
            textAlign: "center",
            color: "#1a202c",
          }}
        >
          CarryOn Admin
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#718096",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          {step === "email"
            ? "Enter your admin email to receive a sign-in code"
            : `We sent a 6-digit code to ${email}`}
        </p>

        {step === "email" ? (
          <form onSubmit={handleRequestOtp}>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                placeholder="admin@carryon.my"
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#e53e3e",
                  fontSize: 13,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} style={btnStyle(loading)}>
              {loading ? "Sending..." : "Send Sign-In Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="otp" style={labelStyle}>
                6-digit code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                style={{ ...inputStyle, letterSpacing: 8, fontSize: 20, textAlign: "center" }}
                placeholder="······"
                autoFocus
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#e53e3e",
                  fontSize: 13,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} style={btnStyle(loading)}>
              {loading ? "Verifying..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() => { setStep("email"); setOtp(""); setError(null); }}
              style={{
                width: "100%",
                marginTop: 12,
                padding: "8px 16px",
                backgroundColor: "transparent",
                color: "#718096",
                border: "none",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              ← Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
