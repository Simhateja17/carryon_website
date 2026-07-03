"use client";

import { useEffect, useState } from "react";
import { failPayout, getAdminPayouts, markPayoutPaid, revealPayoutDestination } from "@/lib/api";
import type { AdminPayoutsPage, DriverPayoutItem } from "@/types";

const STATUS_OPTIONS = ["PENDING", "COMPLETED", "FAILED"] as const;

export default function PayoutQueuePage() {
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("PENDING");
  const [page, setPage] = useState<AdminPayoutsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Record<string, DriverPayoutItem["bankDestination"]>>({});

  async function load() {
    try {
      setLoading(true);
      const res = await getAdminPayouts({ status, page: 1, limit: 50 });
      setPage(res.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load payouts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function handleMarkPaid(payoutId: string) {
    const reference = window.prompt("Bank transfer reference number")?.trim();
    if (!reference) return;
    setActionId(payoutId);
    try {
      await markPayoutPaid(payoutId, reference);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark payout paid");
    } finally {
      setActionId(null);
    }
  }

  async function handleFail(payoutId: string) {
    const reason = window.prompt("Reason for failing or rejecting this payout")?.trim();
    if (!reason) return;
    setActionId(payoutId);
    try {
      await failPayout(payoutId, reason);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fail payout");
    } finally {
      setActionId(null);
    }
  }

  async function handleReveal(payoutId: string) {
    const reason = window.prompt("Reason for revealing full payout destination")?.trim();
    if (!reason) return;
    setActionId(payoutId);
    try {
      const res = await revealPayoutDestination(payoutId, reason);
      setRevealed((current) => ({ ...current, [payoutId]: res.data.bankDestination }));
      const ttl = Math.max(0, new Date(res.data.expiresAt).getTime() - Date.now());
      window.setTimeout(() => {
        setRevealed((current) => {
          const next = { ...current };
          delete next[payoutId];
          return next;
        });
      }, ttl || 60_000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reveal payout destination");
    } finally {
      setActionId(null);
    }
  }

  const items = page?.items || [];

  return (
    <main className="flex-1 overflow-y-auto p-8 box-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Payout Queue</h1>
          <p className="text-sm text-gray-500">Manual bank withdrawal requests from driver wallets.</p>
        </div>
        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={`px-3 py-2 text-sm font-semibold rounded-md ${status === option ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={() => setError(null)} className="text-sm font-semibold text-red-700">Dismiss</button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{status} payouts</h2>
          {page && <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">{page.total} total</span>}
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading payouts...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-400">No payouts in this queue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="py-2 pr-4 font-semibold">Date</th>
                  <th className="py-2 pr-4 font-semibold">Driver</th>
                  <th className="py-2 pr-4 font-semibold">Requested</th>
                  <th className="py-2 pr-4 font-semibold">Fee</th>
                  <th className="py-2 pr-4 font-semibold">Payout</th>
                  <th className="py-2 pr-4 font-semibold">Destination</th>
                  <th className="py-2 pr-4 font-semibold">Reference</th>
                  <th className="py-2 pr-4 font-semibold">Status</th>
                  <th className="py-2 pr-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((payout) => {
                  const destination = revealed[payout.id] || payout.bankDestination || {};
                  return (
                    <tr key={payout.id} className="align-top">
                      <td className="py-3 pr-4 whitespace-nowrap text-gray-700">{formatDateTime(payout.createdAt)}</td>
                      <td className="py-3 pr-4">
                        <div className="font-semibold text-gray-900">{payout.driver?.name || payout.driverId}</div>
                        <div className="text-xs text-gray-500">{payout.driver?.phone || payout.driver?.email || ""}</div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-gray-900">{formatCurrency(payout.requestedAmount, payout.currency)}</td>
                      <td className="py-3 pr-4 text-gray-700">{formatCurrency(payout.feeAmount, payout.currency)}</td>
                      <td className="py-3 pr-4 font-semibold text-gray-900">{formatCurrency(payout.transferAmount, payout.currency)}</td>
                      <td className="py-3 pr-4 min-w-56">
                        <div className="text-gray-900">{destination.bankName || "-"}</div>
                        <div className="text-xs text-gray-600">{destination.bankAccountHolder || ""}</div>
                        <div className="font-mono text-xs text-gray-700">{destination.bankAccountNumber || "-"}</div>
                        {destination.duitNowId && <div className="font-mono text-xs text-gray-500">DuitNow {destination.duitNowId}</div>}
                        <button
                          type="button"
                          onClick={() => handleReveal(payout.id)}
                          disabled={actionId === payout.id}
                          className="mt-1 text-xs font-semibold text-blue-700 hover:text-blue-900 disabled:opacity-50"
                        >
                          Reveal full details
                        </button>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-gray-700">{payout.manualReference || "-"}</td>
                      <td className="py-3 pr-4"><StatusBadge status={payout.status} /></td>
                      <td className="py-3 pr-4">
                        {payout.status === "PENDING" ? (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleMarkPaid(payout.id)}
                              disabled={actionId === payout.id}
                              className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50"
                            >
                              Mark paid
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFail(payout.id)}
                              disabled={actionId === payout.id}
                              className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                            >
                              Fail
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                        {payout.failureMessage && <div className="mt-2 max-w-xs text-xs text-red-600">{payout.failureMessage}</div>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: DriverPayoutItem["status"] }) {
  const className = {
    PENDING: "bg-yellow-50 text-yellow-800 border-yellow-200",
    TRANSFERRED: "bg-blue-50 text-blue-800 border-blue-200",
    COMPLETED: "bg-green-50 text-green-800 border-green-200",
    FAILED: "bg-red-50 text-red-800 border-red-200",
  }[status] || "bg-gray-50 text-gray-700 border-gray-200";

  return <span className={`inline-flex px-2 py-1 rounded-full border text-xs font-semibold ${className}`}>{status}</span>;
}

function formatCurrency(value: number, currency = "myr") {
  return `${currency.toUpperCase()} ${Number(value || 0).toFixed(2)}`;
}

function formatDateTime(value: string) {
  return value ? new Date(value).toLocaleString() : "-";
}
