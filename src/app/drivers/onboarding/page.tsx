"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getDriverOnboardingQueue } from "@/lib/api";
import type { DriverListItem } from "@/types";

function driverCode(id: string) {
  return `DRV-${id.slice(0, 4).toUpperCase()}`;
}

function statusLabel(status: DriverListItem["verificationStatus"]) {
  return status.replace("_", " ");
}

function reviewSourceLabel(source?: DriverListItem["reviewSource"]) {
  return source === "SUBMITTED_ONBOARDING" ? "Submitted" : "Unverified";
}

export default function DriverOnboardingQueuePage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<DriverListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pendingDocs = useMemo(
    () => drivers.reduce((sum, driver) => sum + (driver.documentsPending ?? 0), 0),
    [drivers]
  );

  useEffect(() => {
    let alive = true;
    async function loadQueue() {
      setLoading(true);
      setError("");
      try {
        const res = await getDriverOnboardingQueue();
        if (alive) setDrivers(res.data);
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : "Failed to load onboarding queue");
      } finally {
        if (alive) setLoading(false);
      }
    }
    loadQueue();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main style={{ flex: 1, padding: "32px", overflowY: "auto", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "24px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: "Inter", fontSize: "26px", fontWeight: 800, color: "#0F172A" }}>
            Onboarding Review
          </h1>
          <p style={{ margin: "4px 0 0", fontFamily: "Inter", fontSize: "13px", color: "#2563EB", fontWeight: 500 }}>
            Review unverified drivers before fleet activation.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Metric label="Requests" value={String(drivers.length)} />
          <Metric label="Pending Docs" value={String(pendingDocs)} />
        </div>
      </div>

      <section style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9" }}>
          <h2 style={{ margin: 0, fontFamily: "Inter", fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>
            Pending Onboarding Queue
          </h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Inter, sans-serif" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
              {["Driver", "Vehicle", "Documents", "Review Source", "Status", "Action"].map((heading) => (
                <th key={heading} style={{ padding: "12px 18px", textAlign: "left", fontSize: "10px", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "28px", color: "#64748B" }}>Loading onboarding requests...</td></tr>
            ) : error ? (
              <tr><td colSpan={6} style={{ padding: "28px", color: "#DC2626" }}>{error}</td></tr>
            ) : drivers.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "28px", color: "#64748B" }}>No unverified drivers are waiting for review.</td></tr>
            ) : drivers.map((driver) => (
              <tr key={driver.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "16px 18px" }}>
                  <button
                    type="button"
                    onClick={() => router.push(`/drivers/${driver.id}`)}
                    style={{ display: "block", padding: 0, border: "none", background: "transparent", color: "#2F80ED", fontSize: "13px", fontWeight: 800, cursor: "pointer", textAlign: "left" }}
                  >
                    #{driverCode(driver.id)}
                  </button>
                  <div style={{ marginTop: "4px", color: "#0F172A", fontSize: "14px", fontWeight: 700 }}>{driver.name || "Unnamed Driver"}</div>
                  <div style={{ color: "#64748B", fontSize: "12px" }}>{driver.email}</div>
                </td>
                <td style={{ padding: "16px 18px", color: "#2563EB", fontSize: "13px", fontWeight: 700 }}>
                  {driver.vehicleSummary || "No vehicle submitted"}
                </td>
                <td style={{ padding: "16px 18px", color: "#0F172A", fontSize: "13px", fontWeight: 700 }}>
                  {driver.documentsApproved}/{driver.documentsCount} approved
                  <div style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>{driver.documentsPending ?? 0} pending</div>
                </td>
                <td style={{ padding: "16px 18px", color: "#64748B", fontSize: "12px" }}>
                  <span style={{ color: "#0F172A", fontSize: "12px", fontWeight: 700 }}>
                    {reviewSourceLabel(driver.reviewSource)}
                  </span>
                  <div style={{ marginTop: "3px", color: "#94A3B8", fontSize: "11px", fontWeight: 600 }}>
                    {driver.onboardingSubmittedAt ? new Date(driver.onboardingSubmittedAt).toLocaleString() : `Joined ${new Date(driver.createdAt).toLocaleDateString()}`}
                  </div>
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <span style={{ display: "inline-flex", padding: "5px 12px", borderRadius: "999px", background: "#DBEAFE", color: "#1D4ED8", fontSize: "11px", fontWeight: 800 }}>
                    {statusLabel(driver.verificationStatus)}
                  </span>
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <button
                    type="button"
                    onClick={() => router.push(`/drivers/${driver.id}`)}
                    style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #BFDBFE", background: "#EFF6FF", color: "#1D4ED8", fontSize: "12px", fontWeight: 800, cursor: "pointer" }}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ minWidth: "116px", padding: "10px 14px", borderRadius: "8px", background: "#fff", border: "1px solid #E2E8F0" }}>
      <div style={{ color: "#94A3B8", fontFamily: "Inter", fontSize: "10px", fontWeight: 800, letterSpacing: "0.5px", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ marginTop: "2px", color: "#0F172A", fontFamily: "Inter", fontSize: "20px", fontWeight: 800 }}>
        {value}
      </div>
    </div>
  );
}
