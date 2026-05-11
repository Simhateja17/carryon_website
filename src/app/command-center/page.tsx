'use client';

import { useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import MapSurface from '@/components/MapSurface';
import AdminDataStatus from '@/components/AdminDataStatus';
import { useAdminPolling } from '@/lib/useAdminPolling';
import { getCommandCenterSnapshot, getLiveOverviewMap } from '@/lib/api';
import type { CommandCenterSnapshot, LiveOverviewSnapshot } from '@/types';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

// ── Data ───────────────────────────────────────────────────────────────────────
const statShells = [
  {
    label: 'TOTAL ORDERS\n(TODAY)',
    value: '...',
    trend: 'Loading',
    up: true,
    icon: 'orders' as const,
    sparkline: 'M0 26 C8 20, 18 28, 28 18 C38 8, 48 22, 60 14 C72 6, 82 16, 96 6',
  },
  {
    label: 'ACTIVE DELIVERIES',
    value: '...',
    trend: 'Loading',
    up: true,
    icon: 'deliveries' as const,
    sparkline: 'M0 22 C10 26, 22 16, 34 20 C46 24, 56 12, 68 16 C78 20, 86 8, 96 4',
  },
  {
    label: "TODAY'S REVENUE",
    value: '...',
    trend: 'Loading',
    up: true,
    icon: 'revenue' as const,
    sparkline: 'M0 24 C12 18, 22 26, 34 16 C46 6, 58 20, 70 12 C80 4, 88 10, 96 6',
  },
  {
    label: 'CANCELLED\nORDERS',
    value: '...',
    trend: 'Loading',
    up: false,
    icon: 'cancelled' as const,
    sparkline: 'M0 6 C10 10, 22 4, 34 12 C46 20, 56 14, 68 20 C80 26, 88 18, 96 24',
  },
];

const fallbackRecentOrders = [] as CommandCenterSnapshot['recentOrders'];
const fallbackSystemLogs = [] as CommandCenterSnapshot['systemLogs'];

function TrendBadge({ trend, up }: { trend: string; up: boolean }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: inter,
      fontSize: '12px',
      fontWeight: 700,
      color: '#2f80ed',
    }}>
      {up ? (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4.2L3.5 1.3L5.2 2.8L8.5 0.2" stroke="#2f80ed" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 0.2L8.5 0" stroke="#2f80ed" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M8.5 0.2L7.5 0.2" stroke="#2f80ed" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.8L3.5 4.7L5.2 3.0L8.5 5.8" stroke="#2f80ed" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 5.8L8.5 6" stroke="#2f80ed" strokeWidth="1.35" strokeLinecap="round" />
          <path d="M8.5 5.8L7.5 5.8" stroke="#2f80ed" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      )}
      {trend}
    </span>
  );
}

function FourthCardOverlayIconSvg() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#A6D2F3" />
      <circle cx="18" cy="18" r="8" stroke="#2F80ED" strokeWidth="1.6" />
      <path d="M14.8 14.8L21.2 21.2M21.2 14.8L14.8 21.2" stroke="#2F80ED" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FourthCardGradientSvg() {
  return (
    <svg width="96" height="32" viewBox="0 0 96 32" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <rect width="96" height="32" rx="4" fill="#2F80ED" />
      <path d="M0 8L12 11L24 10L36 15L48 13L60 18L72 16L84 19L96 17V32H0V8Z" fill="#A6D2F3" />
    </svg>
  );
}

function AlertsPanel({ alerts }: { alerts: CommandCenterSnapshot['alerts'] }) {
  const [primaryAlert, ...secondaryAlerts] = alerts.length
    ? alerts
    : [{ severity: 'info', label: 'No Open Alerts', title: 'Operations stable', detail: 'No backend alerts found' }];

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1.8L20 17.2H2L11 1.8Z" stroke="#2F80ED" strokeWidth="2" strokeLinejoin="round" />
            <path d="M11 7.2V11.2" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" />
            <circle cx="11" cy="14" r="1" fill="#2F80ED" />
          </svg>
          <span style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 800, lineHeight: '24px', color: '#191C1E' }}>
            Alerts ({alerts.length})
          </span>
        </div>
        <span style={{
          background: '#2F80ED',
          borderRadius: '9999px',
          padding: '2px 8px',
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '15px',
          color: '#FFFFFF',
          textTransform: 'uppercase',
        }}>
          Live
        </span>
      </div>

      <div style={{
        background: '#2F80ED',
        borderBottom: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '16px 16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: inter, fontSize: '18px', fontWeight: 800, color: '#FFFFFF', lineHeight: '1', letterSpacing: '0.5px' }}>
            SOS
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, lineHeight: '16px', letterSpacing: '0.6px', color: '#FFFFFF', textTransform: 'uppercase' }}>
            <div>CRITICAL</div>
            <div>EMERGENCY</div>
          </div>
          <div style={{ fontFamily: inter, fontSize: '14px', fontWeight: 500, lineHeight: '17.5px', color: '#FFFFFF' }}>
            <div>{primaryAlert.label}</div>
            <div>{primaryAlert.title}</div>
          </div>
          <div style={{ paddingTop: '2px', opacity: 0.7, fontFamily: inter, fontSize: '10px', fontWeight: 700, lineHeight: '15px', color: '#FFFFFF' }}>
            <div>{primaryAlert.detail}</div>
          </div>
        </div>
      </div>

      {secondaryAlerts.map((alert, index) => (
        <div key={`${alert.label}-${index}`} style={{
          background: 'rgba(166,210,243,0.2)',
          border: '1px solid #A6D2F3',
          borderRadius: '12px',
          padding: '17px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: '#A6D2F3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8.5" stroke="#2F80ED" strokeWidth="2" />
              <path d="M10 5.5V10.2L13 13" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, lineHeight: '16px', color: '#2F80ED' }}>
              {alert.label}
            </div>
            <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, lineHeight: '16px', color: '#2F80ED' }}>
              <div>{alert.title}</div>
            </div>
            <div style={{ paddingTop: '4px', fontFamily: inter, fontSize: '10px', fontWeight: 500, lineHeight: '15px', color: '#000000' }}>
              <div>{alert.detail}</div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid #A6D2F3', paddingTop: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          suppressHydrationWarning
          type="button"
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '12px',
            background: '#2F80ED',
            padding: '12px 0',
            fontFamily: inter,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
        >
          OPEN INCIDENT CENTER
        </button>

        <div style={{
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 500,
          lineHeight: '15px',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
          color: '#000000',
          textAlign: 'center',
        }}>
          SECURE PROTOCOL V2.4 ENABLED
        </div>
      </div>
    </div>
  );
}

// ── Donut chart ────────────────────────────────────────────────────────────────
function DonutChart({ breakdown }: { breakdown: CommandCenterSnapshot['breakdown'] }) {
  const r = 56; const cx = 64; const cy = 64;
  const C = 2 * Math.PI * r;
  const colors = ['#0058be', '#2f80ed', '#a6d2f3', '#e2e8f0', '#006947', '#fbbf24'];
  const segs = breakdown.map((item, index) => ({
    pct: Math.max(item.pct, 1) / 100,
    color: colors[index % colors.length],
    label: `${item.status.replaceAll('_', ' ')} (${item.pct}%)`,
  }));
  const circles = segs.map((s, i) => {
    const len = s.pct * C;
    const off = segs.slice(0, i).reduce((sum, item) => sum + item.pct * C, 0);
    return (
      <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="16"
        strokeDasharray={`${len} ${C - len}`}
        strokeDashoffset={-off}
        style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
      />
    );
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <svg width="128" height="128" viewBox="0 0 128 128" style={{ flexShrink: 0 }}>
        {segs.length ? circles : <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="16" />}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {segs.length ? segs.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#191c1e' }}>{s.label}</span>
          </div>
        )) : (
          <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>No order data</span>
        )}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CommandCenterPage() {
  const commandState = useAdminPolling<CommandCenterSnapshot>(
    async () => (await getCommandCenterSnapshot()).data,
    { intervalMs: 45_000 }
  );
  const mapState = useAdminPolling<LiveOverviewSnapshot>(
    async () => (await getLiveOverviewMap()).data,
    { intervalMs: 15_000 }
  );
  const snapshot = commandState.data;
  const mapSnapshot = mapState.data;
  const loading = commandState.loading;

  const stats = useMemo(() => {
    const apiStats = snapshot?.stats || [];
    return statShells.map((fallback, index) => ({ ...fallback, ...(apiStats[index] || {}) }));
  }, [snapshot]);
  const weeklyMax = Math.max(...(snapshot?.weeklyOrders || []).map((item) => item.count), 1);
  const chartBars = snapshot?.weeklyOrders?.length
    ? snapshot.weeklyOrders.map((item, index) => ({
        h: item.count,
        color: index === 6 ? '#0058be' : `rgba(0,88,190,${0.1 + index * 0.1})`,
        day: item.day,
      }))
    : [];
  const heatmapRows = snapshot?.demandHeatmap?.cells || [];
  const heatmapColumns = snapshot?.demandHeatmap?.columns || [];
  const recentOrders = snapshot?.recentOrders || fallbackRecentOrders;
  const systemLogs = snapshot?.systemLogs || fallbackSystemLogs;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: '#F6F8FA', boxSizing: 'border-box' }}>
          <AdminDataStatus error={commandState.error || mapState.error} stale={commandState.stale || mapState.stale} lastUpdated={commandState.lastUpdated || mapState.lastUpdated} />
          {!commandState.error && (commandState.loading || commandState.lastUpdated) && (
            <div style={{ marginBottom: '12px', color: '#64748b', fontFamily: inter, fontSize: '12px' }}>
              {commandState.loading ? 'Loading command center data...' : `Last updated ${commandState.lastUpdated?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </div>
          )}

          {/* ── Row 1: Top KPI Cards (Figma 143:2476) ─────────────────── */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0px 10px 30px 0px rgba(25,28,30,0.04)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'stretch',
            overflow: 'hidden',
          }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                flex: 1,
                height: '152px',
                padding: '24px',
                boxSizing: 'border-box',
                borderRight: i < stats.length - 1 ? '1px solid #F1F5F9' : 'none',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    fontFamily: inter,
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748B',
                    letterSpacing: '0.6px',
                    lineHeight: '16px',
                    textTransform: 'uppercase',
                    whiteSpace: 'pre-line',
                  }}>
                    {s.label}
                  </div>

                  <div style={{
                    fontFamily: manrope,
                    fontSize: '30px',
                    fontWeight: 800,
                    color: '#191C1E',
                    lineHeight: '36px',
                  }}>
                    {s.value}
                  </div>
                </div>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: i === 3 ? 'space-between' : 'flex-start',
                }}>
                  <TrendBadge trend={s.trend} up={s.up} />

                  {i === 3 && (
                    <FourthCardGradientSvg />
                  )}
                </div>

                {i === 3 && (
                  <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
                    <FourthCardOverlayIconSvg />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Row 2: Map + Alerts ───────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>

            {/* Map */}
            <div style={{ flex: 1, minWidth: 0, borderRadius: '12px', overflow: 'hidden', position: 'relative', minHeight: '310px', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              <MapSurface
                minHeight={310}
                markers={(mapSnapshot?.drivers || []).map((driver) => ({
                  id: driver.id,
                  position: driver.position,
                  label: driver.vehicle?.type || 'D',
                  tone: 'driver',
                }))}
                routes={(mapSnapshot?.bookings || []).map((booking) => ({
                  id: booking.bookingId,
                  path: [booking.route.pickup, booking.route.dropoff].filter(Boolean) as Array<{ lat: number; lng: number }>,
                  tone: 'planned',
                }))}
                fallback={(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/blue_map.png" alt="Live map" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '310px' }} />
                )}
              />

              {/* Filter tabs — top center */}
              <div style={{
                position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', background: 'rgba(247,249,251,0.92)', borderRadius: '8px',
                border: '1px solid rgba(226,232,240,0.8)', backdropFilter: 'blur(8px)',
                overflow: 'hidden',
              }}>
                {['ALL VEHICLES', 'BIKES', 'VANS'].map((tab, i) => (
                  <div key={tab} style={{
                    padding: '6px 14px',
                    background: i === 0 ? '#0058be' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: inter, fontSize: '10px', fontWeight: 700,
                    color: i === 0 ? '#fff' : '#64748b',
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    borderRight: i < 2 ? '1px solid rgba(226,232,240,0.6)' : 'none',
                  }}>{tab}</div>
                ))}
              </div>

              {/* Vehicle pins */}
              {!mapSnapshot && (snapshot?.fleet.pins || []).map((pin, index) => (
              <div key={pin.id} style={{ position: 'absolute', top: `${pin.top}%`, left: `${pin.left}%`, width: '28px', height: '28px', borderRadius: '50%', background: ['#0058be', '#006947', '#fbbf24'][index % 3], border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <rect x="0.5" y="2" width="8.5" height="6" rx="1" fill="#fff" />
                  <path d="M9 4h3l1.5 2.5H9V4Z" fill="#fff" />
                  <circle cx="3" cy="9.5" r="1.5" fill="#fff" />
                  <circle cx="11" cy="9.5" r="1.5" fill="#fff" />
                </svg>
              </div>
              ))}

              {/* LIVE FLEET OPERATIONS panel */}
              <div style={{
                position: 'absolute', bottom: '14px', left: '14px',
                background: 'rgba(247,249,251,0.88)', backdropFilter: 'blur(10px)',
                borderRadius: '10px', padding: '12px 16px',
                border: '1px solid rgba(226,232,240,0.7)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                minWidth: '200px',
              }}>
                <div style={{ fontFamily: manrope, fontSize: '12px', fontWeight: 800, color: '#64748b', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Live Fleet Operations
                </div>
                {[
                  { label: 'In Transit', value: String(snapshot?.fleet.inTransit ?? 0), dot: '#0058be' },
                  { label: 'Delivering',  value: String(snapshot?.fleet.delivering ?? 0), dot: '#006947' },
                  { label: 'Idle/Break',  value: String(snapshot?.fleet.idle ?? 0), dot: '#fbbf24' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#374151' }}>{item.label}</span>
                    </div>
                    <span style={{ fontFamily: manrope, fontSize: '13px', fontWeight: 800, color: '#191c1e' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Zoom controls */}
              <div style={{
                position: 'absolute', bottom: '14px', right: '14px',
                display: 'flex', flexDirection: 'column', gap: '4px',
              }}>
                {['+', '−'].map(sym => (
                  <button key={sym} suppressHydrationWarning type="button" style={{
                    width: '32px', height: '32px', border: '1px solid rgba(226,232,240,0.7)', borderRadius: '6px',
                    background: 'rgba(247,249,251,0.88)', backdropFilter: 'blur(8px)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.12)', cursor: 'pointer',
                    fontFamily: inter, fontSize: '16px', fontWeight: 600, color: '#374151',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{sym}</button>
                ))}
                <button suppressHydrationWarning type="button" style={{
                  width: '32px', height: '32px', border: '1px solid rgba(226,232,240,0.7)', borderRadius: '6px',
                  background: 'rgba(247,249,251,0.88)', backdropFilter: 'blur(8px)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.12)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="2.5" stroke="#374151" strokeWidth="1.3" />
                    <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Alerts panel */}
            <div style={{ width: '280px', flexShrink: 0 }}>
              <AlertsPanel alerts={snapshot?.alerts || []} />
            </div>
          </div>

          {/* ── Row 3: Analytics ──────────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>

            {/* Orders Analytics bar chart */}
            <div style={{ flex: 2, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxSizing: 'border-box', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
              {/* heading row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#64748b', letterSpacing: '1.4px', textTransform: 'uppercase', lineHeight: '20px' }}>
                  Orders<br />Analytics
                </div>
                <div style={{ background: '#f8fafc', borderRadius: '4px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', height: '40px', boxSizing: 'border-box' }}>
                  <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#191c1e' }}>Last 7 Days</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#191c1e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              {/* bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '150px' }}>
                {chartBars.length ? chartBars.map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', background: b.color, borderRadius: '2px 2px 0 0', height: `${(b.h / weeklyMax) * 130}px` }} />
                  </div>
                )) : (
                  <div style={{ alignSelf: 'center', width: '100%', textAlign: 'center', fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    {loading ? 'Loading orders' : 'No order data'}
                  </div>
                )}
              </div>
              {/* day labels */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                {chartBars.map((b, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    {b.day}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Breakdown donut */}
            <div style={{ flex: 1.5, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxSizing: 'border-box', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#64748b', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '24px' }}>
                Order Breakdown
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <DonutChart breakdown={snapshot?.breakdown || []} />
              </div>
            </div>

            {/* Demand Heatmap */}
            <div style={{ flex: 1.5, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxSizing: 'border-box', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#64748b', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Demand Heatmap
              </div>
              {/* 6×4 grid */}
              <div style={{ paddingTop: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {heatmapRows.length ? heatmapRows.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '4px', flex: 1 }}>
                    {row.map((cell, ci) => (
                      <div
                        key={ci}
                        title={`${heatmapColumns[ci] || ''}: ${cell.count} orders`}
                        style={{
                          flex: 1,
                          borderRadius: '4px',
                          background: cell.count ? `rgba(0,88,190,${Math.max(0.18, cell.intensity)})` : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
                )) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    {loading ? 'Loading demand' : 'No demand data'}
                  </div>
                )}
              </div>
              {/* x-axis labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {(heatmapColumns.length ? [heatmapColumns[0], heatmapColumns[2], heatmapColumns[5]] : ['00-04', '08-12', '20-24']).map(l => (
                  <span key={l} style={{ fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 4: Recent Active Orders ───────────────────────────────── */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px', overflow: 'hidden', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            {/* header */}
            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#000' }}>Recent Active Orders</span>
              <button suppressHydrationWarning type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0058be' }}>View All Orders</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 2l4 3-4 3" stroke="#0058be" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Order ID', 'Customer', 'Route', 'Driver', 'Status', 'ETD', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '1px 8px 16px', textAlign: 'left', fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#000', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '20px', fontFamily: inter, color: '#64748b' }}>No active orders found.</td></tr>
                ) : recentOrders.map(o => (
                  <tr key={o.id} style={{ borderTop: '1px solid #f8fafc' }}>
                    <td style={{ padding: '19.5px 8px 21px', fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#000', whiteSpace: 'nowrap' }}>{o.id}</td>
                    <td style={{ padding: '19.5px 8px 21px', fontFamily: inter, fontSize: '14px', fontWeight: 500, color: '#000' }}>{o.customer}</td>
                    <td style={{ padding: '21.5px 8px 23px', fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>{o.route}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2f80ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontFamily: inter, fontSize: '9px', fontWeight: 700, color: '#fff' }}>
                            {o.driver.split(' ').map(w => w[0]).join('')}
                          </span>
                        </div>
                        <span style={{ fontFamily: inter, fontSize: '14px', fontWeight: 500, color: '#000' }}>{o.driver}</span>
                      </div>
                    </td>
                    <td style={{ padding: '20.5px 8px' }}>
                      <span style={{ display: 'inline-block', padding: '0 8px', height: '20px', lineHeight: '20px', borderRadius: '4px', background: '#a6d2f3', fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#2f80ed', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: '19.5px 8px 21px', fontFamily: inter, fontSize: '14px', fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>{o.etd}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <button suppressHydrationWarning type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                          <path d="M1 6C1 6 3 1 8 1s7 5 7 5-2 5-7 5-7-5-7-5Z" stroke="#64748b" strokeWidth="1.3" />
                          <circle cx="8" cy="6" r="2" stroke="#64748b" strokeWidth="1.3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Row 5: System Logs ────────────────────────────────────────── */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '33px', boxSizing: 'border-box', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            {/* header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* log icon */}
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <rect x="1" y="1" width="18" height="14" rx="2" stroke="#64748b" strokeWidth="1.3" />
                  <path d="M5 5.5h10M5 8.5h10M5 11.5h6" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#191c1e', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
                  System Logs
                </span>
              </div>
              <button suppressHydrationWarning type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Filter Logs
              </button>
            </div>

            {/* 2-column log grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 48px' }}>
              {systemLogs.length === 0 ? (
                <div style={{ fontFamily: inter, color: '#64748b' }}>No audit logs found.</div>
              ) : systemLogs.map((log, i) => (
                <div key={i} style={{ position: 'relative', paddingLeft: '40px' }}>
                  {/* timeline dot */}
                  <div style={{
                    position: 'absolute', left: 0, top: '4px',
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: '#a6d2f3', border: '4px solid #fff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2f80ed' }} />
                  </div>
                  {/* content */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0, marginRight: '12px' }}>
                      <div style={{ fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#191c1e', marginBottom: '2px' }}>
                        {log.title}
                      </div>
                      <div style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#64748b', lineHeight: '16.5px' }}>
                        {log.desc}
                      </div>
                    </div>
                    <span style={{ background: '#a6d2f3', color: '#2f80ed', fontFamily: inter, fontSize: '9px', fontWeight: 500, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', flexShrink: 0 }}>
                      {log.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
