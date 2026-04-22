'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

// ── Data ───────────────────────────────────────────────────────────────────────
const stats = [
  {
    label: 'TOTAL ORDERS\n(TODAY)',
    value: '1,284',
    trend: '+12.5%',
    up: true,
    icon: 'orders' as const,
    sparkline: 'M0 26 C8 20, 18 28, 28 18 C38 8, 48 22, 60 14 C72 6, 82 16, 96 6',
  },
  {
    label: 'ACTIVE DELIVERIES',
    value: '432',
    trend: '+4.2%',
    up: true,
    icon: 'deliveries' as const,
    sparkline: 'M0 22 C10 26, 22 16, 34 20 C46 24, 56 12, 68 16 C78 20, 86 8, 96 4',
  },
  {
    label: "TODAY'S REVENUE",
    value: '$42.8k',
    trend: '+18.7%',
    up: true,
    icon: 'revenue' as const,
    sparkline: 'M0 24 C12 18, 22 26, 34 16 C46 6, 58 20, 70 12 C80 4, 88 10, 96 6',
  },
  {
    label: 'CANCELLED\nORDERS',
    value: '12',
    trend: '-2.1%',
    up: false,
    icon: 'cancelled' as const,
    sparkline: 'M0 6 C10 10, 22 4, 34 12 C46 20, 56 14, 68 20 C80 26, 88 18, 96 24',
  },
];

const barData = [
  { h: 58,     color: 'rgba(0,88,190,0.1)', day: 'MON' },
  { h: 87,     color: 'rgba(0,88,190,0.2)', day: 'TUE' },
  { h: 65.25,  color: 'rgba(0,88,190,0.4)', day: 'WED' },
  { h: 116,    color: 'rgba(0,88,190,0.6)', day: 'THU' },
  { h: 137.75, color: '#0058be',            day: 'FRI' },
  { h: 101.5,  color: 'rgba(0,88,190,0.5)', day: 'SAT' },
  { h: 79.75,  color: 'rgba(0,88,190,0.3)', day: 'SUN' },
];

const heatmapGrid = [
  [0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
  [0.3, 0.5, 0.7, 0.9, 0.7, 0.5],
  [0.6, 0.8, 1.0, 0.8, 0.6, 0.4],
  [0.2, 0.4, 0.6, 0.4, 0.2, 0.1],
];

const recentOrders = [
  { id: '#ORD-2841', customer: 'Marcus Thorne',  route: 'Queens → Manhattan',        driver: 'Alex J.',  driverBg: '#2f80ed', status: 'IN TRANSIT', etd: '12 mins', boldEtd: false },
  { id: '#ORD-2840', customer: 'Sarah Jenkins',  route: 'Brooklyn → Jersey City',     driver: 'Elena R.', driverBg: '#0058be', status: 'ASSIGNED',   etd: '22 mins', boldEtd: false },
  { id: '#ORD-2839', customer: 'TechHub Inc.',   route: 'Financial Dist. → Midtown',  driver: 'David K.', driverBg: '#64748b', status: 'DELAYED',    etd: '45 mins', boldEtd: true  },
];

const systemLogs = [
  { title: 'Order #2841 Assigned', desc: 'Driver Alex J. successfully assigned to route • 4 mins ago',  badge: 'SUCCESS', tc: '#2f80ed' },
  { title: 'Payment Failure',      desc: 'Customer #8821 Stripe checkout failed • 12 mins ago',         badge: 'ERROR',   tc: '#2f80ed' },
  { title: 'Driver #092 Offline',  desc: 'Shift ended according to schedule • 18 mins ago',             badge: 'INFO',    tc: '#2f80ed' },
  { title: 'Revenue Target Hit',   desc: 'Daily goal achieved (100.2% of target) • 45 mins ago',        badge: 'SUCCESS', tc: '#0058be' },
];

function StatIcon({ type }: { type: 'orders' | 'deliveries' | 'revenue' | 'cancelled' }) {
  const icons = {
    orders: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="2" width="12" height="14" rx="2" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M6 6h6M6 9h6M6 12h4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    deliveries: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="6" width="11" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M12 9h3l2 3v2h-5V9z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="4.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
        <circle cx="13.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
      </svg>
    ),
    revenue: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M9 5v8" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 7.5c0-.83.67-1.5 2-1.5h.5c1 0 1.5.5 1.5 1.2 0 .8-.7 1.3-2 1.8-1.4.5-2 1-2 1.8C7 11.6 7.7 12.5 9 12.5h.5c1.2 0 1.5-.5 1.5-1" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    cancelled: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <div style={{
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: '#DBEAFE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icons[type]}
    </div>
  );
}

function Sparkline({ path, up, id }: { path: string; up: boolean; id: string }) {
  const gradId = `sg-${id}`;
  const bgColor = up ? '#a6d2f3' : '#2f80ed';
  const lineColor = up ? '#2f80ed' : '#a6d2f3';
  const fillColor = up ? '#2f80ed' : '#a6d2f3';

  return (
    <div style={{
      width: '96px',
      height: '32px',
      borderRadius: '4px',
      background: bgColor,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <svg width="96" height="32" viewBox="0 0 96 32" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d={`${path} L96 32 L0 32 Z`} fill={`url(#${gradId})`} />
        <path d={path} stroke={lineColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

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

function AlertsPanel() {
  const secondaryAlerts = [
    {
      id: 'system-delay',
      label: 'System Delay',
      title: ['System Surge', 'Risk'],
      detail: ['North Sector •', '+15m delay'],
      resolved: false,
    },
    {
      id: 'resolved',
      label: 'Resolved',
      title: ['Bulk Payment', 'Issue'],
      detail: ['Stripe Webhook •', '12m ago'],
      resolved: true,
    },
  ] as const;

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
            Alerts (4)
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
            <div>Driver #9244</div>
            <div>SOS Signal</div>
          </div>
          <div style={{ paddingTop: '2px', opacity: 0.7, fontFamily: inter, fontSize: '10px', fontWeight: 700, lineHeight: '15px', color: '#FFFFFF' }}>
            <div>Downtown • 2m</div>
            <div>ago</div>
          </div>
        </div>
      </div>

      {secondaryAlerts.map((alert) => (
        <div key={alert.id} style={{
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
            <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, lineHeight: '16px', color: '#2F80ED', textDecoration: alert.resolved ? 'line-through' : 'none' }}>
              <div>{alert.title[0]}</div>
              <div>{alert.title[1]}</div>
            </div>
            <div style={{ paddingTop: '4px', fontFamily: inter, fontSize: '10px', fontWeight: alert.resolved ? 400 : 500, lineHeight: '15px', color: '#000000' }}>
              <div>{alert.detail[0]}</div>
              <div>{alert.detail[1]}</div>
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
function DonutChart() {
  const r = 56; const cx = 64; const cy = 64;
  const C = 2 * Math.PI * r;
  const segs = [
    { pct: 0.65, color: '#0058be', label: 'Completed (65%)' },
    { pct: 0.20, color: '#2f80ed', label: 'In Transit (20%)' },
    { pct: 0.05, color: '#a6d2f3', label: 'Cancelled (5%)' },
    { pct: 0.10, color: '#e2e8f0', label: 'Pending (10%)' },
  ];
  let cum = 0;
  const circles = segs.map((s, i) => {
    const len = s.pct * C;
    const off = cum;
    cum += len;
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
        {circles}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {segs.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#191c1e' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CommandCenterPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: '#F6F8FA', boxSizing: 'border-box' }}>

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/blue_map.png" alt="Live map" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '310px' }} />

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
              <div style={{ position: 'absolute', top: '30%', left: '28%', width: '28px', height: '28px', borderRadius: '50%', background: '#0058be', border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <rect x="0.5" y="2" width="8.5" height="6" rx="1" fill="#fff" />
                  <path d="M9 4h3l1.5 2.5H9V4Z" fill="#fff" />
                  <circle cx="3" cy="9.5" r="1.5" fill="#fff" />
                  <circle cx="11" cy="9.5" r="1.5" fill="#fff" />
                </svg>
              </div>
              <div style={{ position: 'absolute', top: '55%', left: '45%', width: '28px', height: '28px', borderRadius: '50%', background: '#006947', border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <rect x="0.5" y="2" width="8.5" height="6" rx="1" fill="#fff" />
                  <path d="M9 4h3l1.5 2.5H9V4Z" fill="#fff" />
                  <circle cx="3" cy="9.5" r="1.5" fill="#fff" />
                  <circle cx="11" cy="9.5" r="1.5" fill="#fff" />
                </svg>
              </div>
              <div style={{ position: 'absolute', top: '40%', left: '62%', width: '28px', height: '28px', borderRadius: '50%', background: '#fbbf24', border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <rect x="0.5" y="2" width="8.5" height="6" rx="1" fill="#fff" />
                  <path d="M9 4h3l1.5 2.5H9V4Z" fill="#fff" />
                  <circle cx="3" cy="9.5" r="1.5" fill="#fff" />
                  <circle cx="11" cy="9.5" r="1.5" fill="#fff" />
                </svg>
              </div>

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
                  { label: 'In Transit', value: '284', dot: '#0058be' },
                  { label: 'Delivering',  value: '128', dot: '#006947' },
                  { label: 'Idle/Break',  value: '42',  dot: '#fbbf24' },
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
              <AlertsPanel />
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
                {barData.map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', background: b.color, borderRadius: '2px 2px 0 0', height: `${(b.h / 137.75) * 130}px` }} />
                  </div>
                ))}
              </div>
              {/* day labels */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                {barData.map((b, i) => (
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
                <DonutChart />
              </div>
            </div>

            {/* Demand Heatmap */}
            <div style={{ flex: 1.5, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxSizing: 'border-box', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#64748b', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Demand Heatmap
              </div>
              {/* 6×4 grid */}
              <div style={{ paddingTop: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {heatmapGrid.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: '4px', flex: 1 }}>
                    {row.map((v, ci) => (
                      <div key={ci} style={{ flex: 1, borderRadius: '4px', background: `rgba(0,88,190,${v})` }} />
                    ))}
                  </div>
                ))}
              </div>
              {/* x-axis labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {['Morning', 'Peak', 'Evening'].map(l => (
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
                {recentOrders.map(o => (
                  <tr key={o.id} style={{ borderTop: '1px solid #f8fafc' }}>
                    <td style={{ padding: '19.5px 8px 21px', fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#000', whiteSpace: 'nowrap' }}>{o.id}</td>
                    <td style={{ padding: '19.5px 8px 21px', fontFamily: inter, fontSize: '14px', fontWeight: 500, color: '#000' }}>{o.customer}</td>
                    <td style={{ padding: '21.5px 8px 23px', fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>{o.route}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: o.driverBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
                    <td style={{ padding: '19.5px 8px 21px', fontFamily: inter, fontSize: '14px', fontWeight: o.boldEtd ? 700 : 500, color: '#000', whiteSpace: 'nowrap' }}>{o.etd}</td>
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
              {systemLogs.map((log, i) => (
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
                    <span style={{ background: '#a6d2f3', color: log.tc, fontFamily: inter, fontSize: '9px', fontWeight: 500, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', flexShrink: 0 }}>
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
