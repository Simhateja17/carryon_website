'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ── Sidebar nav items ───────────────────────────────────────── */
const sideNav = [
  { label: 'Command Center', href: '/command-center', icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="1" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor"/><rect x="9.5" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor"/><rect x="1" y="9.5" width="6.5" height="6.5" rx="1.5" fill="currentColor"/><rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1.5" fill="currentColor"/></svg>) },
  { label: 'Live Map',       href: '/',              icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M8.5 1C6.015 1 4 3.015 4 5.5c0 4.167 4.5 10.5 4.5 10.5S13 9.667 13 5.5C13 3.015 10.985 1 8.5 1Z" stroke="currentColor" strokeWidth="1.4"/><circle cx="8.5" cy="5.5" r="1.8" fill="currentColor"/></svg>) },
  { label: 'Orders',         href: '/orders',        icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="2" y="2" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5 6.5h7M5 9h7M5 11.5h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>) },
  { label: 'Drivers',        href: '/drivers',       icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="8.5" cy="5.5" r="2.8" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 15c0-3.038 2.686-5.5 6-5.5s6 2.462 6 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>) },
  { label: 'Customers',      href: '/customers',     icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="6" cy="5.5" r="2.3" stroke="currentColor" strokeWidth="1.4"/><path d="M1 14c0-2.761 2.239-5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="11.5" cy="5.5" r="2.3" stroke="currentColor" strokeWidth="1.4"/><path d="M16 14c0-2.761-2.239-5-5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>) },
  { label: 'Revenue',        href: '/revenue',       icon: (<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><polyline points="2,13 5.5,7.5 9,10.5 15,3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>) },
];

/* ── Sidebar ─────────────────────────────────────────────────── */
function Sidebar() {
  const router = useRouter();
  return (
    <aside style={{ width: '210px', flexShrink: 0, height: '100vh', background: '#fff', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="7.5" height="7.5" rx="1.5" fill="white"/>
            <rect x="11.5" y="1" width="7.5" height="7.5" rx="1.5" fill="white"/>
            <rect x="1" y="11.5" width="7.5" height="7.5" rx="1.5" fill="white"/>
            <rect x="11.5" y="11.5" width="7.5" height="7.5" rx="1.5" fill="white"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 800, color: '#0F172A', lineHeight: '16px', letterSpacing: '-0.2px' }}>FLEET ENGINE</div>
          <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 500, color: '#94A3B8', letterSpacing: '0.4px' }}>Operational HQ</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 10px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {sideNav.map((item) => {
          const isActive = item.label === 'Command Center';
          return (
            <button key={item.label} suppressHydrationWarning onClick={() => router.push(item.href)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', width: '100%', textAlign: 'left', background: isActive ? '#EFF6FF' : 'transparent', border: 'none', borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent', borderRadius: isActive ? '0 8px 8px 0' : '8px', cursor: 'pointer' }}>
              <span style={{ display: 'flex', flexShrink: 0, color: isActive ? '#2563EB' : '#64748B' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: isActive ? 700 : 400, color: isActive ? '#2563EB' : '#374151' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 12px 18px', borderTop: '1px solid #F1F5F9' }}>
        <button suppressHydrationWarning style={{ width: '100%', height: '38px', borderRadius: '8px', background: '#2563EB', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
          + New Dispatch
        </button>
      </div>
    </aside>
  );
}

/* ── Mini sparkline bar chart ────────────────────────────────── */
function Sparkline({ bars }: { bars: number[] }) {
  const max = Math.max(...bars);
  return (
    <svg width="80" height="28" viewBox="0 0 80 28">
      {bars.map((v, i) => {
        const h = Math.round((v / max) * 22);
        const x = i * (80 / bars.length) + 2;
        const isLast = i === bars.length - 1;
        return (
          <rect key={i} x={x} y={28 - h} width={8} height={h} rx="2"
            fill={isLast ? '#2563EB' : '#BFDBFE'} />
        );
      })}
    </svg>
  );
}

/* ── Orders & Revenue line chart ─────────────────────────────── */
function TrendChart() {
  // Chart area: viewBox 540 × 190, drawing area x:50–520, y:10–160
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const ordersData  = [42, 55, 48, 67, 76, 70]; // × 1000
  const revenueData = [28, 34, 30, 45, 62, 58]; // × 1000
  const maxV = 100;
  const cW = 470; const cH = 150; const xOff = 48; const yOff = 10;

  const xPos = (i: number) => xOff + (i / (months.length - 1)) * cW;
  const yPos = (v: number) => yOff + cH - (v / maxV) * cH;

  const toPath = (data: number[]) => data.map((v, i) => `${i === 0 ? 'M' : 'L'}${xPos(i)},${yPos(v)}`).join(' ');
  const toArea = (data: number[]) => `${toPath(data)} L${xPos(data.length - 1)},${yOff + cH} L${xPos(0)},${yOff + cH} Z`;

  const gridLines = [0, 25, 50, 75, 100];

  return (
    <svg viewBox="0 0 540 185" width="100%" style={{ overflow: 'visible' }}>
      {/* Grid lines */}
      {gridLines.map((g) => (
        <g key={g}>
          <line x1={xOff} y1={yPos(g)} x2={xOff + cW} y2={yPos(g)} stroke="#F1F5F9" strokeWidth="1" />
          <text x={xOff - 6} y={yPos(g) + 4} textAnchor="end" fontFamily="Inter" fontSize="9" fill="#94A3B8">{g > 0 ? `${g}k` : '0'}</text>
        </g>
      ))}
      {/* Month labels */}
      {months.map((m, i) => (
        <text key={m} x={xPos(i)} y={yOff + cH + 18} textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#94A3B8">{m}</text>
      ))}
      {/* Revenue area fill */}
      <path d={toArea(revenueData)} fill="#EFF6FF" opacity="0.7" />
      {/* Orders area fill */}
      <path d={toArea(ordersData)} fill="#BFDBFE" opacity="0.5" />
      {/* Revenue line */}
      <path d={toPath(revenueData)} fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Orders line */}
      <path d={toPath(ordersData)} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots on orders line */}
      {ordersData.map((v, i) => (
        <circle key={i} cx={xPos(i)} cy={yPos(v)} r="3.5" fill="#2563EB" />
      ))}
    </svg>
  );
}

/* ── Order Status donut ──────────────────────────────────────── */
function OrderStatusDonut() {
  const r = 54; const cx = 80; const cy = 80;
  const circ = 2 * Math.PI * r;
  // segments: In Transit 65%, Completed 25%, Delayed 10%
  const segments = [
    { pct: 65, color: '#60A5FA', label: 'In Transit' },
    { pct: 25, color: '#2563EB', label: 'Completed' },
    { pct: 10, color: '#1E3A8A', label: 'Delayed'   },
  ];
  let acc = 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EFF6FF" strokeWidth="20" />
          {segments.map((s) => {
            const len    = circ * (s.pct / 100);
            const offset = circ / 4 - acc;
            acc += len;
            return (
              <circle key={s.label} cx={cx} cy={cy} r={r} fill="none"
                stroke={s.color} strokeWidth="20"
                strokeDasharray={`${len} ${circ}`}
                strokeDashoffset={offset} />
            );
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '26px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>88%</span>
          <span style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#64748B', letterSpacing: '0.6px', marginTop: '3px' }}>ON TIME</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', width: '100%' }}>
        {segments.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151' }}>{s.label}</span>
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────────── */
const orders = [
  { id: '#ORD-78229', initials: 'JD', initBg: '#DBEAFE', initColor: '#1D4ED8', customer: 'John Dorsey',   vehicle: 'Truck A-22 (Heavy)',    route: 'Brooklyn → Manhattan', amount: '$1,240.00', status: 'IN TRANSIT', statusBg: '#2563EB', statusColor: '#fff' },
  { id: '#ORD-78230', initials: 'SM', initBg: '#D1FAE5', initColor: '#065F46', customer: 'Sarah Miller',  vehicle: 'Van V-102 (Express)',   route: 'Queens → Bronx',       amount: '$450.00',   status: 'COMPLETED',  statusBg: '#10B981', statusColor: '#fff' },
  { id: '#ORD-78231', initials: 'BK', initBg: '#FEF3C7', initColor: '#92400E', customer: 'Brian King',    vehicle: 'Moto M-09 (Fast)',      route: 'Staten Is. → Jersey',  amount: '$89.00',    status: 'PENDING',    statusBg: '#E2E8F0', statusColor: '#64748B' },
];

const topDrivers = [
  { initials: 'MV', initBg: '#DBEAFE', initColor: '#1D4ED8', name: 'Marco V.', badge: 'ELITE RUNNER', badgeBg: '#EFF6FF', badgeColor: '#2563EB', amount: '$12.4k', rating: '98%' },
  { initials: 'LT', initBg: '#D1FAE5', initColor: '#065F46', name: 'Lana T.',  badge: 'GOLD STAR',   badgeBg: '#ECFDF5', badgeColor: '#059669', amount: '$10.2k', rating: '89%' },
  { initials: 'SR', initBg: '#EDE9FE', initColor: '#5B21B6', name: 'Sam R.',   badge: 'PRO ROUTE',   badgeBg: '#F5F3FF', badgeColor: '#7C3AED', amount: '$9.8k',  rating: '95%' },
];

const stats = [
  { label: 'TOTAL ORDERS',   value: '42,891',  trend: '+12%', up: true,  bars: [35,42,38,50,46,42,58] },
  { label: 'REVENUE',        value: '$842.2k', trend: '+8.4%',up: true,  bars: [28,34,30,40,38,36,52] },
  { label: 'ACTIVE DRIVERS', value: '1,024',   trend: '-2%',  up: false, bars: [56,52,54,50,48,50,44] },
  { label: 'AVG TIME',       value: '28.4m',   trend: '+5%',  up: true,  bars: [22,26,24,28,27,25,32] },
];

/* ── Page ────────────────────────────────────────────────────── */
export default function CommandCenterPage() {
  const [period, setPeriod] = useState<'Today' | 'Weekly' | 'Monthly'>('Today');

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── Navbar ── */}
        <header style={{ height: '56px', flexShrink: 0, background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxSizing: 'border-box' }}>
          {/* Brand */}
          <div style={{ lineHeight: '1.1' }}>
            <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.3px' }}>Logistics</div>
            <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.3px' }}>Command</div>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '36px', padding: '0 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', width: '280px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94A3B8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#CBD5E1' }}>Search orders, vehicles or drivers...</span>
          </div>

          {/* Icons + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Bell */}
            <button suppressHydrationWarning style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} />
            </button>
            {/* Help */}
            <button suppressHydrationWarning style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="1.5"/><path d="M12 17v-2M12 9a2 2 0 1 1 0 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            {/* Settings */}
            <button suppressHydrationWarning style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#64748B" strokeWidth="1.5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            {/* Alex Rivera */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Alex Rivera</div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#64748B' }}>Senior Dispatcher</div>
              </div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#BFDBFE', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#2563EB"/><path d="M3 21c0-4.971 4.029-9 9-9s9 4.029 9 9" fill="#2563EB"/></svg>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main style={{ flex: 1, padding: '22px 24px', overflowY: 'auto', boxSizing: 'border-box' }}>

          {/* Fleet Overview header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h1 style={{ margin: 0, fontFamily: 'Inter', fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>Fleet Overview</h1>
              <p style={{ margin: '4px 0 0', fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>Real-time performance metrics for 1,248 active units.</p>
            </div>
            {/* Period tabs */}
            <div style={{ display: 'flex', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
              {(['Today', 'Weekly', 'Monthly'] as const).map((p) => (
                <button key={p} suppressHydrationWarning onClick={() => setPeriod(p)} style={{ padding: '6px 14px', border: 'none', borderRight: p !== 'Monthly' ? '1px solid #E2E8F0' : 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, background: period === p ? '#2563EB' : 'transparent', color: period === p ? '#fff' : '#64748B', transition: 'background 0.15s', whiteSpace: 'nowrap' }}>{p}</button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px' }}>{s.label}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: s.up ? '#10B981' : '#EF4444' }}>
                    {s.up ? '▲' : '▼'}{s.trend}
                  </span>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, marginBottom: '10px' }}>{s.value}</div>
                <Sparkline bars={s.bars} />
              </div>
            ))}
          </div>

          {/* Middle row: Trend chart + Order Status */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'stretch' }}>

            {/* Orders & Revenue Trend */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 22px', minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>Orders &amp; Revenue Trend</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>Monthly overview of performance</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#374151' }}>Orders</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#93C5FD' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#374151' }}>Revenue</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', cursor: 'pointer' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#374151', fontWeight: 500 }}>Last 6 Months</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <TrendChart />
            </div>

            {/* Order Status */}
            <div style={{ width: '200px', flexShrink: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 18px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Order Status</div>
              <OrderStatusDonut />
            </div>

          </div>

          {/* Bottom row: Recent Orders + Top Drivers */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>

            {/* Recent Orders */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', minWidth: 0 }}>
              <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>Recent Orders</span>
                <button suppressHydrationWarning style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                    {['ORDER ID', 'CUSTOMER', 'VEHICLE', 'ROUTE', 'AMOUNT', 'STATUS'].map((h) => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={o.id} style={{ borderBottom: i < orders.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>{o.id}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: o.initBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 800, color: o.initColor }}>{o.initials}</span>
                          </div>
                          <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#0F172A', whiteSpace: 'nowrap' }}>{o.customer}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Inter', fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap' }}>{o.vehicle}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Inter', fontSize: '11px', color: '#374151', whiteSpace: 'nowrap' }}>{o.route}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB', whiteSpace: 'nowrap' }}>{o.amount}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: o.statusBg, fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: o.statusColor, whiteSpace: 'nowrap' }}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Drivers */}
            <div style={{ width: '210px', flexShrink: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Top Drivers</span>
                <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="2.5" r="1.2" fill="currentColor"/><circle cx="7" cy="7" r="1.2" fill="currentColor"/><circle cx="7" cy="11.5" r="1.2" fill="currentColor"/></svg>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
                {topDrivers.map((d) => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: d.initBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 800, color: d.initColor }}>{d.initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{d.name}</div>
                      <span style={{ display: 'inline-block', padding: '1px 6px', borderRadius: '4px', background: d.badgeBg, fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: d.badgeColor, letterSpacing: '0.3px' }}>{d.badge}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 800, color: '#2563EB' }}>{d.amount}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8' }}>{d.rating} Rating</div>
                    </div>
                  </div>
                ))}
              </div>

              <button suppressHydrationWarning style={{ width: '100%', height: '34px', borderRadius: '8px', background: '#EFF6FF', border: '1px solid #BFDBFE', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>
                Performance Reports
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
