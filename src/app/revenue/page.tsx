'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

/* ── Types ───────────────────────────────────────────────────── */
type Period = 'Last 30 Days' | 'Quarterly' | 'Yearly';

/* ── Bar chart data (MON–SUN) ────────────────────────────────── */
const barData = [
  { day: 'MON', height: 115.19000244140625 },
  { day: 'TUE', height: 158.38999938964844 },
  { day: 'WED', height: 138.22999572753906 },
  { day: 'THU', height: 216 },
  { day: 'FRI', height: 259.19000244140625 },
  { day: 'SAT', height: 172.8000030517578 },
  { day: 'SUN', height: 129.58999633789062 },
];

/* ── Revenue share ───────────────────────────────────────────── */
const shareItems = [
  { label: 'Heavy Trucks', pct: 62, color: '#B7DAF5' },
  { label: 'Light Vans',   pct: 24, color: '#2563EB' },
  { label: 'Motorcycles',  pct: 14, color: '#545F73' },
];

/* ── Regional distribution ───────────────────────────────────── */
const regions = [
<<<<<<< HEAD
  { name: 'North America',  amount: '$842,300', pct: 100, fillWidth: 761.5970458984375 },
=======
  { name: 'North America',  amount: '$642,300', pct: 84 },
>>>>>>> 12a9d909b643e60ec4f8b117897a11772916cd40
  { name: 'European Union', amount: '$412,900', pct: 49  },
  { name: 'Asia Pacific',   amount: '$298,400', pct: 35  },
  { name: 'Latin America',  amount: '$75,350',  pct: 9   },
];

/* ── Donut chart ─────────────────────────────────────────────── */
function DonutChart() {
  const r = 72;
  const cx = 94;
  const cy = 94;
  const circ = 2 * Math.PI * r;

  // Build segments from shareItems
  const segmentLengths = shareItems.map((item) => circ * (item.pct / 100));
  const segmentOffsets = segmentLengths.map((_, idx) =>
    segmentLengths.slice(0, idx).reduce((sum, len) => sum + len, 0)
  );
  const overlayItems = [shareItems[2], shareItems[1]];
  const overlayLengths = overlayItems.map((item) => circ * (item.pct / 100));
  const overlayOffsets = overlayLengths.map((_, idx) =>
    overlayLengths.slice(0, idx).reduce((sum, len) => sum + len, 0)
  );
  const overlaySegments = overlayItems.map((item, idx) => ({
    ...item,
    len: overlayLengths[idx],
    offset: circ / 2 - overlayOffsets[idx],
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '234.66px', paddingTop: '32px', boxSizing: 'border-box' }}>
      <div style={{ position: 'relative', width: '192px', height: '192px', borderRadius: '9999px' }}>
        <svg width="192" height="192" viewBox="0 0 192 192">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#B7DAF5" strokeWidth="24" />
          {/* Overlay segments */}
          {overlaySegments.map((s) => (
            <circle
              key={s.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="24"
              strokeDasharray={`${s.len} ${circ}`}
              strokeDashoffset={s.offset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          ))}
        </svg>
        {/* Centre text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>100%</span>
          <span style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 600, color: '#64748B', letterSpacing: '0.7px', marginTop: '4px' }}>FLEET TOTAL</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '234.66px', paddingBottom: '32px', boxSizing: 'border-box' }}>
        {shareItems.map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151' }}>{item.label}</span>
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Revenue bar chart ───────────────────────────────────────── */
function RevenueBarChart() {
<<<<<<< HEAD
  const maxHeight = Math.max(...barData.map((d) => d.height));
  const barWidth = 73.9047622680664;
  const chartHeight = 324;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', width: '565.333px', height: `${chartHeight}px`, padding: '0', boxSizing: 'border-box' }}>
=======
  const maxVal = Math.max(...barData.map((d) => d.gross));
  const chartH = 288;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', height: `${chartH + 24}px` }}>
>>>>>>> 12a9d909b643e60ec4f8b117897a11772916cd40
      {barData.map((d) => {
        const barH = Math.round((d.height / maxHeight) * chartHeight);
        return (
<<<<<<< HEAD
          <div key={d.day} style={{ width: `${barWidth}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '100%', height: `${barH}px`, position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#B7DAF5', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: '#2563EB', borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }} />
            </div>
            <div style={{ width: '100%', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: '24.520000457763672px', lineHeight: '15px', textAlign: 'center', fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', color: '#0F172A', letterSpacing: '0px' }}>{d.day}</span>
            </div>
=======
          <div key={d.day} style={{ width: '73.9048px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* Stacked bar: gross (light) with net (dark) at the base */}
            <div style={{ width: '73.9048px', height: `${grossH}px`, borderTopLeftRadius: '2px', borderTopRightRadius: '2px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#B7DAF5' }}>
              {/* Net (dark blue) — bottom segment */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${netH}px`, background: '#3364D8', borderRadius: '0' }} />
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: '16px', color: '#111827', fontWeight: 700, letterSpacing: '0.2px', lineHeight: 1 }}>{d.day}</span>
>>>>>>> 12a9d909b643e60ec4f8b117897a11772916cd40
          </div>
        );
      })}
    </div>
  );
}

/* ── Stat card icon (top-right decorative) ───────────────────── */
function CardIcon({ index }: { index: number }) {
  const icons = [
    // Dollar / revenue
    <svg key={0} width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="5" width="18" height="12" rx="2.5" stroke="#CBD5E1" strokeWidth="1.4" />
      <path d="M11 8v6M9 9.5c0-.828.672-1.5 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 0 0 3h1c.828 0 1.5-.672 1.5-1.5" stroke="#CBD5E1" strokeWidth="1.3" strokeLinecap="round" />
    </svg>,
    // Percent / margin
    <svg key={1} width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="7" cy="7" r="2.5" stroke="#CBD5E1" strokeWidth="1.4" />
      <circle cx="15" cy="15" r="2.5" stroke="#CBD5E1" strokeWidth="1.4" />
      <path d="M6 16L16 6" stroke="#CBD5E1" strokeWidth="1.4" strokeLinecap="round" />
    </svg>,
    // Truck / delivery
    <svg key={2} width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="1.5" y="7" width="11" height="8" rx="1.5" stroke="#CBD5E1" strokeWidth="1.4" />
      <path d="M12.5 9h4l3 5H12.5V9Z" stroke="#CBD5E1" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="5.5" cy="16.5" r="1.5" fill="#CBD5E1" />
      <circle cx="15.5" cy="16.5" r="1.5" fill="#CBD5E1" />
    </svg>,
  ];
  return (
    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icons[index] ?? icons[0]}
    </div>
  );
}

/* ── Trend badge ─────────────────────────────────────────────── */
function TrendBadge({ value, up, color, icon }: { value: string; up: boolean; color?: string; icon?: React.ReactNode }) {
  const badgeColor = color ?? (up ? '#059669' : '#DC2626');
  const badgeBg = color ? (color === '#2F80ED' ? '#B7DAF5' : '#DEF0FF') : (up ? '#D1FAE5' : '#FEE2E2');
  const defaultIcon = up ? (
    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6L4 3L7 5L10 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 2V6H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <span>▼</span>
  );

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '3px',
      padding: '2px 8px', borderRadius: '999px',
      background: badgeBg,
      fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
      color: badgeColor,
    }}>
      {icon ?? defaultIcon}{value}
    </span>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function RevenuePage() {
  const [period, setPeriod] = useState<Period>('Last 30 Days');

  const stats = [
    {
      label: 'Total Revenue',
      value: '$1,428,950.00',
      trendVal: '12.5%', trendUp: true,
      trendColor: '#2F80ED',
      trendIcon: '↗',
      sub: 'vs. previous period',
    },
    {
      label: 'Profit Margin',
      value: '32.4%',
      trendVal: '2.1%', trendUp: true,
      trendColor: '#2F80ED',
      trendIcon: '↗',
      sub: 'efficiency up',
      subColor: '#0F172A',
    },
    {
      label: 'Cost per Delivery',
      value: '$14.82',
      trendVal: '4.3%', trendUp: false,
      trendColor: '#2F80ED',
      trendIcon: '↘',
      sub: 'fuel optimization',
    },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '28px 32px 32px', overflowY: 'auto', boxSizing: 'border-box' }}>

          {/* Breadcrumb */}
          <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>
            Carry On <span style={{ margin: '0 4px' }}>›</span>
            <span style={{ color: '#2563EB', fontWeight: 700 }}>Revenue Analytics</span>
          </div>

          {/* Page title + period tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <h1 style={{ margin: 0, fontFamily: 'Inter', fontSize: '28px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>
              Financial Command
            </h1>

            {/* Period tab group */}
            <div style={{ display: 'flex', background: '#B7DAF5', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
              {(['Last 30 Days', 'Quarterly', 'Yearly'] as Period[]).map((p) => (
                <button
                  key={p}
                  suppressHydrationWarning
                  onClick={() => setPeriod(p)}
                  style={{
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                    minWidth: '86px', height: '32px',
                    borderRadius: '8px',
                    background: period === p ? '#FFFFFF' : 'transparent',
                    color: period === p ? '#2F80ED' : '#020617',
                    marginRight: p !== 'Yearly' ? '4px' : '0',
                    transition: 'background 0.15s, color 0.15s',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 16px',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ background: '#fff', borderRadius: '12px', padding: '20px 22px', border: '1px solid #E2E8F0' }}>
                {/* Top row: label + icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB', letterSpacing: '0.1px' }}>
                    {s.label}
                  </span>
                  <CardIcon index={i} />
                </div>
                {/* Value */}
                <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '10px', lineHeight: 1.1 }}>
                  {s.value}
                </div>
                {/* Trend + sub */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendBadge value={s.trendVal} up={s.trendUp} color={(s as any).trendColor} icon={(s as any).trendIcon} />
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#0F172A' }}>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart row */}
          <div style={{ display: 'grid', gridTemplateColumns: '629.333px 298.667px', gap: '32px', marginBottom: '20px', alignItems: 'stretch' }}>

            {/* Revenue Performance Trend */}
<<<<<<< HEAD
            <div style={{ width: '629.333px', height: '432px', background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)', padding: '32px 32px 52px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
=======
            <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 1px 2px 0px #0000000D', padding: '32px 32px 52px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
>>>>>>> 12a9d909b643e60ec4f8b117897a11772916cd40
                <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                  Revenue Performance Trend
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3364D8' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>Gross</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#B7DAF5' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>Net</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RevenueBarChart />
              </div>
            </div>

            {/* Revenue Share */}
            <div style={{ width: '298.667px', height: '432px', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '32px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '16px', display: 'block' }}>
                Revenue Share
              </span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <DonutChart />
              </div>
            </div>

          </div>

          {/* Regional Revenue Distribution */}
          <div style={{ width: '960px', height: '356px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)', padding: '32px', marginBottom: '20px', boxSizing: 'border-box' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                Regional Revenue Distribution
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Filter icon */}
                <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#64748B' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {/* Menu icon */}
                <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#64748B' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="3" cy="8" r="1.2" fill="currentColor" />
                    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
                    <circle cx="13" cy="8" r="1.2" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '896px' }}>
              {regions.map((r) => (
<<<<<<< HEAD
                <div key={r.name} style={{ height: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', lineHeight: '20px', letterSpacing: '0px', color: '#0F172A' }}>{r.name}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>{r.amount}</span>
                  </div>
                  <div style={{ width: '896px', height: '12px', background: '#B7DAF5', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: r.fillWidth ? `${r.fillWidth}px` : `${(r.pct / 100) * 896}px`,
                      background: 'linear-gradient(90deg, #1E40AF 0%, #2563EB 50%, #60A5FA 100%)',
=======
                <div key={r.name} style={{ minHeight: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: '#374151' }}>{r.name}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>{r.amount}</span>
                  </div>
                  <div style={{ height: '12px', background: '#B7DAF5', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${r.pct}%`,
                      background: '#2F80ED',
>>>>>>> 12a9d909b643e60ec4f8b117897a11772916cd40
                      borderRadius: '9999px',
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {/* Generate CSV Report */}
            <button suppressHydrationWarning style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              width: '236.66000366210938px', height: '48px', padding: '12px 24px', borderRadius: '12px',
              background: '#E6E8EA', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, lineHeight: '24px', color: '#191C1E',
              whiteSpace: 'nowrap',
            }}>
              <div style={{ width: '16px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#191C1E', borderRadius: '6px', overflow: 'hidden' }}>
                <svg width="12" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" fill="#FFFFFF" fillRule="evenodd" />
                </svg>
              </div>
              <div style={{ width: '164.66000366210938px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Generate CSV Report
              </div>
            </button>

            {/* Export Executive PDF */}
            <button suppressHydrationWarning style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              width: '241.57000732421875px', height: '48px', padding: '12px 24px', borderRadius: '12px',
              background: '#0058BE', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, lineHeight: '24px', color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}>
              <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', borderRadius: '6px' }}>
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="12" height="10" rx="2" fill="#0058BE" />
                  <path d="M4 4.5H10" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M4 7.5H10" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ width: '165.5800018310547px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Export Executive PDF
              </div>
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
