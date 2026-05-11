'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import MapSurface from '@/components/MapSurface';
import AdminDataStatus from '@/components/AdminDataStatus';
import { useAdminPolling } from '@/lib/useAdminPolling';
import {
  latestCoordinate,
  toIncidentOperationsView,
  type IncidentLogItem,
  type IncidentOperationsView,
  type IncidentQueueItem,
} from '@/lib/adminOperations';
import { getIncidentMap } from '@/lib/api';
import type { IncidentMapSnapshot } from '@/types';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

// ── Incident Card ──────────────────────────────────────────────────────────────
function IncidentCard({ incident, active, onClick }: { incident: IncidentQueueItem; active: boolean; onClick: () => void }) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        background: '#FFFFFF',
        border: active ? '1px solid #2563EB' : '1px solid #E2E8F0',
        borderLeft: active ? '4px solid #2563EB' : '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: active ? '16px 16px 16px 13px' : '16px',
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: active ? '0 4px 12px rgba(37, 99, 235, 0.12)' : 'none',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* Type badge + time */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          fontFamily: inter,
          fontSize: '9px',
          fontWeight: 800,
          letterSpacing: '0.8px',
          color: '#FFFFFF',
          background: active ? '#2563EB' : incident.typeColor,
          padding: '3px 8px',
          borderRadius: '4px',
          textTransform: 'uppercase',
        }}>
          {incident.type}
        </span>
        <span style={{
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 500,
          color: '#94A3B8',
        }}>
          {incident.time}
        </span>
      </div>

      {/* Vehicle */}
      <div style={{
        fontFamily: manrope,
        fontSize: '16px',
        fontWeight: 800,
        color: '#0F172A',
        marginBottom: '4px',
      }}>
        {incident.vehicle}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: inter,
        fontSize: '12px',
        fontWeight: 500,
        color: '#64748B',
        marginBottom: '12px',
        lineHeight: '16px',
      }}>
        {incident.description}
      </div>

      {/* Driver */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: incident.driverBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <span style={{ fontFamily: inter, fontSize: '9px', fontWeight: 700, color: '#FFFFFF' }}>
            {incident.driverInitials}
          </span>
        </div>
        <span style={{
          fontFamily: inter,
          fontSize: '13px',
          fontWeight: 500,
          color: '#2563EB',
        }}>
          {incident.driver}
        </span>
      </div>
    </button>
  );
}

// ── Map Info Bar ───────────────────────────────────────────────────────────────
function MapInfoBar({ activeIncident }: { activeIncident: IncidentMapSnapshot['incidents'][number] | null }) {
  const latest = activeIncident
    ? latestCoordinate(activeIncident.actualPath, activeIncident.booking.driver?.position)
    : null;
  const coordinates = latest
    ? `${latest.lat.toFixed(4)}°, ${latest.lng.toFixed(4)}°`
    : '--';
  const isActive = !!activeIncident;
  return (
    <div style={{
      position: 'absolute',
      top: '12px',
      left: '12px',
      right: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      borderRadius: '10px',
      padding: '10px 16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid rgba(226, 232, 240, 0.6)',
      zIndex: 5,
    }}>
      {/* Left: Coordinates */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1C4.24 1 2 3.24 2 6c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5Z" stroke="#64748B" strokeWidth="1.3" />
            <circle cx="7" cy="6" r="1.5" fill="#64748B" />
          </svg>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#64748B' }}>
            COORDINATES:
          </span>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#0F172A' }}>
            {coordinates}
          </span>
        </div>
      </div>

      {/* Center: Speed + Fuel */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#64748B' }}>SPEED:</span>
          <span style={{ fontFamily: manrope, fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>--</span>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#64748B' }}>MPH</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#64748B' }}>FUEL:</span>
          <span style={{ fontFamily: manrope, fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>--</span>
        </div>
      </div>

      {/* Right: Live SOS Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          fontFamily: inter,
          fontSize: '9px',
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          textAlign: 'right',
        }}>
          LIVE SOS SIGNAL
        </span>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: isActive ? '#DC2626' : '#94A3B8',
        }} />
        <span style={{
          fontFamily: inter,
          fontSize: '9px',
          fontWeight: 800,
          color: isActive ? '#DC2626' : '#64748B',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {isActive ? 'ACTIVE' : 'CLEAR'}
        </span>
      </div>
    </div>
  );
}

// ── Map Component ──────────────────────────────────────────────────────────────
function IncidentMap({ snapshot, activeIncidentId }: { snapshot: IncidentMapSnapshot | null; activeIncidentId: string | null }) {
  const activeIncident = snapshot?.incidents.find((incident) => incident.id === activeIncidentId) || snapshot?.incidents[0] || null;
  return (
    <div style={{
      flex: 1,
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      minHeight: '420px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    }}>
      <MapSurface
        minHeight={420}
        markers={(snapshot?.incidents || []).flatMap((incident) => [
          { id: `${incident.id}-driver`, position: incident.booking.driver?.position || null, label: incident.type, tone: 'incident' as const },
          { id: `${incident.id}-pickup`, position: incident.booking.route.pickup, label: 'Pickup', tone: 'pickup' as const },
          { id: `${incident.id}-dropoff`, position: incident.booking.route.dropoff, label: 'Drop', tone: 'dropoff' as const },
        ])}
        routes={activeIncident ? [
          { id: `${activeIncident.id}-planned`, path: activeIncident.plannedRoute.geometry, tone: 'planned' },
          { id: `${activeIncident.id}-actual`, path: activeIncident.actualPath.map((point) => point.position), tone: 'actual' },
        ] : []}
        fallback={(
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/blue_map.png"
            alt="Incident map"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '420px' }}
          />
        )}
      />

      {/* Info bar */}
      <MapInfoBar activeIncident={activeIncident} />

      {/* Zoom controls */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 5,
      }}>
        {['+', '−'].map((sym) => (
          <button
            key={sym}
            suppressHydrationWarning
            type="button"
            style={{
              width: '32px',
              height: '32px',
              border: '1px solid rgba(226, 232, 240, 0.7)',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              fontFamily: inter,
              fontSize: '16px',
              fontWeight: 600,
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Map attribution */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        fontFamily: inter,
        fontSize: '9px',
        color: '#94A3B8',
        zIndex: 5,
      }}>
        Map data ©2026 Google
      </div>
    </div>
  );
}

// ── Live Incident Log ──────────────────────────────────────────────────────────
function LiveIncidentLog({ entries }: { entries: IncidentLogItem[] }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      padding: '20px 24px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    }}>
      {/* Header */}
      <div style={{
        fontFamily: manrope,
        fontSize: '14px',
        fontWeight: 800,
        color: '#64748B',
        letterSpacing: '1.4px',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        Live Incident Log
      </div>

      {/* Log entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {entries.length === 0 ? (
          <div style={{ fontFamily: inter, fontSize: '12px', color: '#64748B' }}>No live incident events found.</div>
        ) : entries.map((entry, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {/* Time */}
            <span style={{
              fontFamily: inter,
              fontSize: '11px',
              fontWeight: 600,
              color: '#94A3B8',
              whiteSpace: 'nowrap',
              minWidth: '56px',
              paddingTop: '2px',
            }}>
              {entry.time}
            </span>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: inter,
                fontSize: '13px',
                fontWeight: 700,
                color: entry.highlight ? '#2563EB' : '#0F172A',
                marginBottom: '2px',
              }}>
                {entry.title}
              </div>
              <div style={{
                fontFamily: inter,
                fontSize: '11px',
                fontWeight: 500,
                color: '#64748B',
                lineHeight: '15px',
              }}>
                {entry.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Critical Actions ───────────────────────────────────────────────────────────
function CriticalActions({ disabled }: { disabled: boolean }) {
  const disabledStyle = disabled ? { opacity: 0.45, cursor: 'not-allowed' } : {};
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      padding: '20px 24px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Header */}
      <div style={{
        fontFamily: manrope,
        fontSize: '14px',
        fontWeight: 800,
        color: '#64748B',
        letterSpacing: '1.4px',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        Critical Actions
      </div>

      {/* Call Driver */}
      <button
        suppressHydrationWarning
        type="button"
        disabled={disabled}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: '#0F172A',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
          ...disabledStyle,
        }}
      >
        <span style={{
          fontFamily: inter,
          fontSize: '12px',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '0.5px',
        }}>
          CALL DRIVER
        </span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2.5 3.5C2.5 2.67 3.17 2 4 2h2.5c.7 0 1.3.47 1.47 1.15l.7 2.8c.13.52-.03 1.07-.42 1.44L6.75 8.8c.8 1.55 2.1 2.85 3.65 3.65l1.4-1.4c.37-.39.92-.55 1.44-.42l2.8.7C16.53 11.5 17 12.1 17 12.8V15.3c0 .83-.67 1.5-1.5 1.5C8.15 16.8 1.2 9.85 1.2 2.5c0-.83.67-1.5 1.5-1.5Z" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Notify Authorities */}
      <button
        suppressHydrationWarning
        type="button"
        disabled={disabled}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: '#2563EB',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          ...disabledStyle,
        }}
      >
        <span style={{
          fontFamily: inter,
          fontSize: '12px',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '0.5px',
        }}>
          NOTIFY AUTHORITIES
        </span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2C5.13 2 2 5.13 2 9c0 3.87 3.13 7 7 7 1.5 0 2.88-.47 4-1.27L16 17l-2.27-3C14.53 11.88 15 10.5 15 9c0-3.87-3.13-7-7-7Z" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 5.5V9l2.5 2.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dispatch Backup */}
      <button
        suppressHydrationWarning
        type="button"
        disabled={disabled}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: '#FFFFFF',
          border: '1.5px solid #2563EB',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          ...disabledStyle,
        }}
      >
        <span style={{
          fontFamily: inter,
          fontSize: '12px',
          fontWeight: 700,
          color: '#2563EB',
          letterSpacing: '0.5px',
        }}>
          DISPATCH BACKUP
        </span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="5" width="11" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.4" />
          <path d="M12 8h3l2 3v1h-5V8z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="4.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
          <circle cx="13.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function IncidentCenterPage() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const incidentState = useAdminPolling<IncidentOperationsView>(
    async () => { const res = await getIncidentMap(); return toIncidentOperationsView(res.data); },
    { intervalMs: 15_000 },
  );
  const view = incidentState.data;
  const queue = view?.queue || [];
  const activeIncidentId = selectedIncident && queue.some((incident) => incident.id === selectedIncident)
    ? selectedIncident
    : view?.activeIncidentId || null;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: '#F6F8FA', boxSizing: 'border-box' }}>
          <AdminDataStatus error={incidentState.error} stale={incidentState.stale} lastUpdated={incidentState.lastUpdated} />

          {/* ── Top Row: Incident Queue + Map ─────────────────────────── */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>

            {/* Active Incident Queue */}
            <div style={{
              width: '300px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {/* Queue header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px',
              }}>
                <span style={{
                  fontFamily: manrope,
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#64748B',
                  letterSpacing: '1.4px',
                  textTransform: 'uppercase',
                }}>
                  Active Incident Queue
                </span>
                <span style={{
                  background: '#2563EB',
                  borderRadius: '9999px',
                  padding: '2px 10px',
                  fontFamily: inter,
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.5px',
                }}>
                  {view?.urgentCount || 0} URGENT
                </span>
              </div>

              {/* Incident cards */}
              {queue.length === 0 ? (
                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', fontFamily: inter, fontSize: '12px', color: '#64748B' }}>
                  {incidentState.loading ? 'Loading incidents...' : 'No active incidents found.'}
                </div>
              ) : queue.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  active={activeIncidentId === incident.id}
                  onClick={() => setSelectedIncident(incident.id)}
                />
              ))}
            </div>

            {/* Map */}
            <IncidentMap snapshot={view?.snapshot || null} activeIncidentId={activeIncidentId} />
          </div>

          {/* ── Bottom Row: Live Incident Log + Critical Actions ─────── */}
          <div style={{ display: 'flex', gap: '16px' }}>

            {/* Live Incident Log */}
            <div style={{ flex: 1.5, minWidth: 0 }}>
              <LiveIncidentLog entries={view?.log || []} />
            </div>

            {/* Critical Actions */}
            <div style={{ width: '280px', flexShrink: 0 }}>
              <CriticalActions disabled={!view || incidentState.stale} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
