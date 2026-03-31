'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

/* ── Types ───────────────────────────────────────────────────── */
type Period = 'Last 30 Days' | 'Quarterly' | 'Yearly';

/* ── Bar chart data (MON–SUN) ────────────────────────────────── */
const barData = [
  { day: 'MON', gross: 52, net: 32 },
  { day: 'TUE', gross: 68, net: 42 },
  { day: 'WED', gross: 60, net: 36 },
  { day: 'THU', gross: 78, net: 50 },
  { day: 'FRI', gross: 95, net: 62 },
  { day: 'SAT', gross: 70, net: 44 },
  { day: 'SUN', gross: 56, net: 34 },
];

/* ── Revenue share ───────────────────────────────────────────── */
const shareItems = [
  { label: 'Heavy Trucks', pct: 62, color: '#1E3A8A' },
  { label: 'Light Vans',   pct: 24, color: '#60A5FA' },
  { label: 'Motorcycles',  pct: 14, color: '#93C5FD' },
];

/* ── Regional distribution ───────────────────────────────────── */
const regions = [
  { name: 'North America',  amount: '$642,300', pct: 84 },
  { name: 'European Union', amount: '$412,900', pct: 49  },
  { name: 'Asia Pacific',   amount: '$298,400', pct: 35  },
  { name: 'Latin America',  amount: '$75,350',  pct: 9   },
];

/* ── Donut chart ─────────────────────────────────────────────── */
function DonutChart() {
  const r = 58;
  const cx = 80;
  const cy = 80;
  const circ = 2 * Math.PI * r;     // ≈ 364.4

  // Build segments from shareItems
  const segmentLengths = shareItems.map((item) => circ * (item.pct / 100));
  const segmentOffsets = segmentLengths.map((_, idx) =>
    segmentLengths.slice(0, idx).reduce((sum, len) => sum + len, 0)
  );
  const segments = shareItems.map((item, idx) => ({
    ...item,
    len: segmentLengths[idx],
    offset: circ / 4 - segmentOffsets[idx],
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E2E8F0" strokeWidth="22" />
          {/* Segments */}
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="22"
              strokeDasharray={`${s.len} ${circ}`}
              strokeDashoffset={s.offset}
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          ))}
        </svg>
        {/* Centre text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '22px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>100%</span>
          <span style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: 600, color: '#64748B', letterSpacing: '0.6px', marginTop: '3px' }}>FLEET TOTAL</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
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
  const maxVal = Math.max(...barData.map((d) => d.gross));
  const chartH = 288;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', height: `${chartH + 24}px` }}>
      {barData.map((d) => {
        const grossH = Math.round((d.gross / maxVal) * chartH);
        const netH   = Math.round((d.net   / maxVal) * chartH);
        return (
          <div key={d.day} style={{ width: '73.9048px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* Stacked bar: gross (light) with net (dark) at the base */}
            <div style={{ width: '73.9048px', height: `${grossH}px`, borderTopLeftRadius: '2px', borderTopRightRadius: '2px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#B7DAF5' }}>
              {/* Net (dark blue) — bottom segment */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${netH}px`, background: '#3364D8', borderRadius: '0' }} />
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: '16px', color: '#111827', fontWeight: 700, letterSpacing: '0.2px', lineHeight: 1 }}>{d.day}</span>
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
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'stretch' }}>

            {/* Revenue Performance Trend */}
            <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 1px 2px 0px #0000000D', padding: '32px 32px 52px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <RevenueBarChart />
            </div>

            {/* Revenue Share */}
            <div style={{ width: '220px', flexShrink: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 20px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '20px', display: 'block' }}>
                Revenue Share
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DonutChart />
              </div>
            </div>

          </div>

          {/* Regional Revenue Distribution */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px', marginBottom: '20px' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {regions.map((r) => (
                <div key={r.name} style={{ minHeight: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: '#374151' }}>{r.name}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>{r.amount}</span>
                  </div>
                  <div style={{ height: '12px', background: '#B7DAF5', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${r.pct}%`,
                      background: '#2F80ED',
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
              height: '40px', padding: '0 20px', borderRadius: '8px',
              background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151',
            }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="2" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 5.5h5M5 8h5M5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Generate CSV Report
            </button>

            {/* Export Executive PDF */}
            <button suppressHydrationWarning style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              height: '40px', padding: '0 20px', borderRadius: '8px',
              background: '#2563EB', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff',
            }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 1.5v8M5 7l2.5 2.5L10 7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 11v1.5A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Export Executive PDF
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
