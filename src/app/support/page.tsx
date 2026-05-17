"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  claimSupportTicket,
  getSupportTicket,
  getSupportTickets,
  replyToSupportTicket,
  updateSupportTicketStatus,
  uploadSupportAttachment,
} from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { AdminSupportTicket, SupportRequesterType, SupportTicketStatus } from "@/types";
import type { AdminSupportAttachment } from "@/types";

const statusOptions: Array<"ALL" | SupportTicketStatus> = ["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
const requesterOptions: Array<"ALL" | SupportRequesterType> = ["ALL", "CUSTOMER", "DRIVER"];

export default function SupportPage() {
  const [tickets, setTickets] = useState<AdminSupportTicket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<AdminSupportTicket | null>(null);
  const [status, setStatus] = useState<"ALL" | SupportTicketStatus>("ALL");
  const [requesterType, setRequesterType] = useState<"ALL" | SupportRequesterType>("ALL");
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [attachments, setAttachments] = useState<AdminSupportAttachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [internal, setInternal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Refs to avoid stale closures in the realtime callback
  const selectedIdRef = useRef(selectedId);
  const filtersRef = useRef({ status, requesterType, search });
  useEffect(() => { selectedIdRef.current = selectedId; }, [selectedId]);
  useEffect(() => { filtersRef.current = { status, requesterType, search }; }, [status, requesterType, search]);

  const refreshTickets = useCallback(async () => {
    const { status: s, requesterType: r, search: q } = filtersRef.current;
    const response = await getSupportTickets({ status: s, requesterType: r, search: q });
    setTickets(response.data);
    if (!selectedIdRef.current && response.data[0]) setSelectedId(response.data[0].id);
  }, []);

  const refreshSelected = useCallback(async () => {
    const id = selectedIdRef.current;
    if (!id) return;
    const response = await getSupportTicket(id);
    setSelected(response.data);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    refreshTickets()
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Failed to load support tickets"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [status, requesterType, search, refreshTickets]);

  useEffect(() => {
    if (!selectedId) {
      setSelected(null);
      return;
    }
    getSupportTicket(selectedId)
      .then((r) => setSelected(r.data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load ticket"));
  }, [selectedId]);

  // Single stable realtime subscription — subscribe once, use refs for latest state
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("admin-support-workspace")
      .on("postgres_changes", { event: "*", schema: "public", table: "SupportTicket" }, () => {
        refreshTickets().catch(() => undefined);
        refreshSelected().catch(() => undefined);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "TicketMessage" }, () => {
        refreshTickets().catch(() => undefined);
        refreshSelected().catch(() => undefined);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "DriverSupportTicket" }, () => {
        refreshTickets().catch(() => undefined);
        refreshSelected().catch(() => undefined);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "DriverTicketMessage" }, () => {
        refreshTickets().catch(() => undefined);
        refreshSelected().catch(() => undefined);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshTickets, refreshSelected]);

  const stats = useMemo(() => ({
    open: tickets.filter((t) => t.status === "OPEN").length,
    urgent: tickets.filter((t) => t.priority === "URGENT").length,
    assigned: tickets.filter((t) => t.assignedAdminId).length,
  }), [tickets]);

  async function sendReply() {
    if (!selected || (!reply.trim() && attachments.length === 0)) return;
    const response = await replyToSupportTicket(selected.id, reply.trim(), internal, attachments);
    setReply("");
    setAttachments([]);
    setInternal(false);
    setSelected({
      ...selected,
      messages: [...(selected.messages || []), response.data],
      status: selected.status === "OPEN" ? "IN_PROGRESS" : selected.status,
    });
    await refreshTickets();
  }

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: AdminSupportAttachment[] = [];
      for (const file of Array.from(files).slice(0, 5 - attachments.length)) {
        const response = await uploadSupportAttachment(file);
        uploaded.push(response.data);
      }
      setAttachments((current) => [...current, ...uploaded].slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Attachment upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function claimSelected() {
    if (!selected) return;
    const response = await claimSupportTicket(selected.id);
    setSelected(response.data);
    await refreshTickets();
  }

  async function setSelectedStatus(nextStatus: SupportTicketStatus) {
    if (!selected) return;
    const response = await updateSupportTicketStatus(selected.id, nextStatus);
    setSelected(response.data);
    await refreshTickets();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#F6F8FB", padding: "24px", color: "#111827" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 0 }}>Support Workspace</h1>
          <p style={{ margin: "6px 0 0", color: "#64748B", fontSize: 14 }}>Customer and driver support tickets in one queue.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Stat label="Open" value={stats.open} />
          <Stat label="Urgent" value={stats.urgent} tone="danger" />
          <Stat label="Assigned" value={stats.assigned} />
        </div>
      </header>

      {error && <div style={{ marginBottom: 12, color: "#B91C1C", fontSize: 14 }}>{error}</div>}

      <section style={{ display: "grid", gridTemplateColumns: "380px minmax(0, 1fr)", gap: 16, alignItems: "stretch" }}>
        <aside style={panelStyle}>
          <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search ticket, name, email, order"
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} style={selectStyle}>
                {statusOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select value={requesterType} onChange={(event) => setRequesterType(event.target.value as typeof requesterType)} style={selectStyle}>
                {requesterOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gap: 8, maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
            {loading && <div style={{ color: "#64748B", fontSize: 14 }}>Loading tickets...</div>}
            {!loading && tickets.length === 0 && <div style={{ color: "#64748B", fontSize: 14 }}>No tickets found.</div>}
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedId(ticket.id)}
                style={{
                  textAlign: "left",
                  border: selectedId === ticket.id ? "1px solid #2563EB" : "1px solid #E2E8F0",
                  background: selectedId === ticket.id ? "#EFF6FF" : "#FFFFFF",
                  borderRadius: 8,
                  padding: 12,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <strong style={{ fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ticket.subject}</strong>
                  <Badge text={ticket.priority} tone={ticket.priority === "URGENT" ? "danger" : "neutral"} />
                </div>
                <div style={{ marginTop: 6, color: "#64748B", fontSize: 12 }}>
                  {ticket.requesterType} · {ticket.requester?.name || ticket.requester?.email || "Unknown"} · {ticket.status}
                </div>
                {ticket.lastMessage && (
                  <div style={{ marginTop: 8, color: "#475569", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {ticket.lastMessage.message}
                  </div>
                )}
              </button>
            ))}
          </div>
        </aside>

        <section style={panelStyle}>
          {!selected && <div style={{ color: "#64748B" }}>Select a ticket to view the conversation.</div>}
          {selected && (
            <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "calc(100vh - 124px)", gap: 14 }}>
              <div style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 20 }}>{selected.subject}</h2>
                    <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Badge text={selected.requesterType} />
                      <Badge text={selected.status} />
                      <Badge text={selected.priority} tone={selected.priority === "URGENT" ? "danger" : "neutral"} />
                      {selected.booking && <Badge text={selected.booking.orderCode} />}
                    </div>
                    <div style={{ marginTop: 8, color: "#64748B", fontSize: 13 }}>
                      {selected.requester?.name || "Unknown"} · {selected.requester?.email || "No email"} · Assigned to {selected.assignedAdminEmail || "shared queue"}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <button style={buttonStyle} onClick={claimSelected}>Claim</button>
                    <select value={selected.status} onChange={(event) => setSelectedStatus(event.target.value as SupportTicketStatus)} style={selectStyle}>
                      {statusOptions.filter((item) => item !== "ALL").map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ overflowY: "auto", display: "grid", alignContent: "start", gap: 10, paddingRight: 4 }}>
                {(selected.messages || []).map((message) => (
                  <div
                    key={message.id}
                    style={{
                      justifySelf: message.isStaff ? "start" : "end",
                      maxWidth: "72%",
                      borderRadius: 8,
                      background: message.messageType === "INTERNAL_NOTE" ? "#FEF3C7" : message.isStaff ? "#EAF2FF" : "#F1F5F9",
                      border: "1px solid #E2E8F0",
                      padding: 12,
                    }}
                  >
                    <div style={{ color: "#475569", fontSize: 11, marginBottom: 5 }}>
                      {message.messageType.replace("_", " ")} · {new Date(message.createdAt).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{message.message}</div>
                    {message.attachments.length > 0 && (
                      <div style={{ marginTop: 8, display: "grid", gap: 4 }}>
                        {message.attachments.map((attachment, index) => (
                          <div key={`${attachment.fileUrl}-${index}`} style={{ color: "#2563EB", fontSize: 12 }}>
                            Attachment: {attachment.mimeType} · {Math.round(attachment.fileSize / 1024)} KB
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 12 }}>
                <textarea
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder={internal ? "Add an internal note..." : "Reply to requester..."}
                  style={{ ...inputStyle, minHeight: 76, resize: "vertical" }}
                />
                {attachments.length > 0 && (
                  <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {attachments.map((attachment, index) => (
                      <span key={`${attachment.fileUrl}-${index}`} style={{ color: "#475569", background: "#F1F5F9", borderRadius: 999, padding: "4px 8px", fontSize: 12 }}>
                        {attachment.mimeType} · {Math.round(attachment.fileSize / 1024)} KB
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <label style={{ color: "#475569", fontSize: 13 }}>
                      <input type="checkbox" checked={internal} onChange={(event) => setInternal(event.target.checked)} /> Internal note
                    </label>
                    <label style={{ color: "#2563EB", fontSize: 13, cursor: "pointer" }}>
                      {uploading ? "Uploading..." : "Attach files"}
                      <input type="file" multiple accept="image/*,application/pdf" onChange={(event) => uploadFiles(event.target.files)} style={{ display: "none" }} />
                    </label>
                  </div>
                  <button style={buttonStyle} onClick={sendReply} disabled={!reply.trim() && attachments.length === 0}>Send</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function Stat({ label, value, tone = "neutral" }: { label: string; value: number; tone?: "neutral" | "danger" }) {
  return (
    <div style={{ minWidth: 92, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, padding: "10px 12px" }}>
      <div style={{ color: "#64748B", fontSize: 12 }}>{label}</div>
      <div style={{ color: tone === "danger" ? "#B91C1C" : "#111827", fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Badge({ text, tone = "neutral" }: { text: string; tone?: "neutral" | "danger" }) {
  return (
    <span style={{
      display: "inline-flex",
      borderRadius: 999,
      padding: "3px 8px",
      fontSize: 11,
      fontWeight: 700,
      color: tone === "danger" ? "#991B1B" : "#1E3A8A",
      background: tone === "danger" ? "#FEE2E2" : "#DBEAFE",
    }}>
      {text}
    </span>
  );
}

const panelStyle: CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  padding: 16,
  minHeight: "calc(100vh - 124px)",
  boxSizing: "border-box",
};

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #CBD5E1",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
};

const selectStyle: CSSProperties = {
  border: "1px solid #CBD5E1",
  borderRadius: 8,
  padding: "9px 10px",
  fontSize: 13,
  background: "#FFFFFF",
};

const buttonStyle: CSSProperties = {
  border: "none",
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 13,
  fontWeight: 700,
  color: "#FFFFFF",
  background: "#2563EB",
  cursor: "pointer",
};
