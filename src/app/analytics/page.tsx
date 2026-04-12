'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

/* ── Chart data ───────────────────────────────────────────────── */
const weekData = [
  { orders: 62, deliveries: 48 },
  { orders: 75, deliveries: 60 },
  { orders: 70, deliveries: 55 },
  { orders: 80, deliveries: 63 },
  { orders: 95, deliveries: 75 },
  { orders: 88, deliveries: 68 },
  { orders: 72, deliveries: 56 },
];
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const weeks = ['WEEK 28', 'WEEK 29', 'WEEK 30', 'WEEK 31', 'WEEK 32', 'WEEK 33', 'WEEK 34', 'WEEK 35'];

/* ── Donut Chart ─────────────────────────────────────────────── */
function DonutChart() {
  const cx = 80, cy = 80, r = 60, sw = 22;
  const segments = [
    { pct: 78.2, color: '#1E3A8A' },
    { pct: 15.5, color: '#60A5FA' },
    { pct: 4.1,  color: '#BFDBFE' },
    { pct: 2.2,  color: '#1F2937' },
  ];
  let cumAngle = -90;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcs = segments.map((s) => {
    const startAngle = cumAngle;
    const sweep = (s.pct / 100) * 360;
    cumAngle += sweep;
    const endAngle = cumAngle;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = sweep > 180 ? 1 : 0;
    return { ...s, d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}` };
  });

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      {arcs.map((a, i) => (
        <path key={i} d={a.d} fill="none" stroke={a.color} strokeWidth={sw} strokeLinecap="butt"/>
      ))}
      <text x="80" y="74" textAnchor="middle" fontFamily="Inter" fontSize="20" fontWeight="800" fill="#0F172A">100%</text>
      <text x="80" y="91" textAnchor="middle" fontFamily="Inter" fontSize="9" fontWeight="600" fill="#94A3B8" letterSpacing="0.5">FLEET TOTAL</text>
    </svg>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function AnalyticsPage() {
  const [dateRange] = useState('Q3 2023: Jul 01 – Sep 30');

  const statCards = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="4" width="18" height="14" rx="2" stroke="#2563EB" strokeWidth="1.5"/><path d="M6 8h10M6 12h6" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      badge: '+12.4%', badgeUp: true,
      label: 'TOTAL SHIPMENTS', value: '124,892',
      sub: 'vs. 111,104 in Q2',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke="#F59E0B" strokeWidth="1.5"/><path d="M11 6.5v4.5l3 2" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      badge: '-2.1%', badgeUp: false,
      label: 'AVG. DELIVERY TIME', value: '18.4 hrs',
      sub: 'Improved by 24 mins avg.',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke="#22C55E" strokeWidth="1.5"/><path d="M7 11.5l2.5 2.5 5.5-5" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      badge: '+0.8%', badgeUp: true,
      label: 'ON-TIME DELIVERY %', value: '98.2%',
      sub: 'Target: 97.5%',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke="#64748B" strokeWidth="1.5"/><path d="M11 7v1.5M11 13.5V15M8.5 10a2.5 2.5 0 0 1 5 0c0 1.5-2.5 1.5-2.5 3" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      badge: '+4.5%', badgeUp: true,
      label: 'COST PER MILE', value: '$2.42',
      sub: 'fuel surcharge impact: high',
    },
  ];

  const regions = [
    { name: 'North America', pct: 94.8 },
    { name: 'Europe (EU)', pct: 88.2 },
    { name: 'Asia Pacific', pct: 72.4 },
    { name: 'South America', pct: 64.1 },
    { name: 'Africa', pct: 58.9 },
  ];

  const drivers = [
    { initials: 'MS', bg: '#DBEAFE', color: '#1D4ED8', name: 'Marcus Sterling', sub: 'Heavy Transport', rating: 4.95, trips: '1,204', onTime: '99.2%', onTimeBg: '#DCFCE7', onTimeColor: '#16A34A', fuel: 'A+' },
    { initials: 'ER', bg: '#FCE7F3', color: '#9D174D', name: 'Elena Rodriguez', sub: 'Last Mile Delivery', rating: 4.92, trips: '985', onTime: '88.8%', onTimeBg: '#DBEAFE', onTimeColor: '#1D4ED8', fuel: 'A' },
    { initials: 'JW', bg: '#E0E7FF', color: '#3730A3', name: 'James Whitaker', sub: 'Regional Haul', rating: 4.88, trips: '1,540', onTime: '87.4%', onTimeBg: '#DBEAFE', onTimeColor: '#1D4ED8', fuel: 'A-' },
  ];

  const donutLegend = [
    { label: 'Completed', pct: '78.2%', color: '#1E3A8A' },
    { label: 'In Transit', pct: '15.5%', color: '#60A5FA' },
    { label: 'Delayed',    pct: '4.1%',  color: '#BFDBFE' },
    { label: 'Cancelled',  pct: '2.2%',  color: '#1F2937' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* ── Header ── */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '20px 28px 18px', flexShrink: 0 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            {['CARRY ON', 'INTELLIGENCE', 'PERFORMANCE ANALYTICS'].map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && <span style={{ color: '#94A3B8', fontSize: '11px' }}>›</span>}
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: i === 2 ? 600 : 400, color: i === 2 ? '#2563EB' : '#94A3B8', letterSpacing: '0.3px' }}>{crumb}</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontFamily: 'Inter', fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: '1.1' }}>Historical Insights</h1>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>Deep dive into fleet performance and operational metrics.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Date range */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px', background: '#fff', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2" width="11" height="10.5" rx="1.5" stroke="#64748B" strokeWidth="1.3"/><path d="M1.5 5.5h11M4.5 1v2M9.5 1v2" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#374151' }}>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.4px', marginRight: '4px' }}>DATE RANGE</span>
                  {dateRange}
                </span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {/* Export button */}
              <button style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', background: '#2563EB', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 6l3 3 3-3M1.5 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>EXPORT DATA</span>
              </button>
            </div>
          </div>
        </div>

        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 0' }}>

          {/* ── 4 Stat Cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '18px' }}>
            {statCards.map((card, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{card.icon}</div>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: card.badgeUp ? '#16A34A' : '#DC2626', background: card.badgeUp ? '#DCFCE7' : '#FEE2E2', padding: '2px 7px', borderRadius: '999px' }}>{card.badge}</span>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.7px', marginBottom: '4px' }}>{card.label}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '22px', fontWeight: 800, color: '#0F172A', lineHeight: '1.1', marginBottom: '4px' }}>{card.value}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Volume Trend + Status Distribution ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '14px', marginBottom: '18px' }}>

            {/* Volume Trend */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Volume Trend</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>Daily order volume vs. completed deliveries</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB', display: 'inline-block' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#374151', fontWeight: 500 }}>ORDERS</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#BFDBFE', display: 'inline-block' }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>DELIVERIES</span>
                  </div>
                </div>
              </div>
              {/* Bar chart */}
              <div style={{ marginTop: '10px' }}>
                <svg width="100%" viewBox="0 0 490 180" preserveAspectRatio="xMidYMid meet">
                  {weekData.map((d, i) => {
                    const maxVal = 100;
                    const chartH = 130;
                    const barW = 18;
                    const groupW = 54;
                    const x = 10 + i * groupW;
                    const oh = (d.orders / maxVal) * chartH;
                    const dh = (d.deliveries / maxVal) * chartH;
                    return (
                      <g key={i}>
                        <rect x={x} y={chartH - oh} width={barW} height={oh} rx="3" fill="#2563EB" opacity="0.85"/>
                        <rect x={x + barW + 2} y={chartH - dh} width={barW} height={dh} rx="3" fill="#BFDBFE"/>
                        <text x={x + barW + 1} y={148} textAnchor="middle" fontFamily="Inter" fontSize="9" fill="#94A3B8">{days[i]}</text>
                      </g>
                    );
                  })}
                  {weeks.slice(0, 7).map((w, i) => (
                    <text key={i} x={10 + i * 54 + 19} y={165} textAnchor="middle" fontFamily="Inter" fontSize="7.5" fill="#CBD5E1">{w}</text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Status Distribution */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Status Distribution</div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '16px' }}>Performance breakdown by status</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DonutChart />
                <div style={{ width: '100%', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {donutLegend.map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color, display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151' }}>{l.label}</span>
                      </div>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{l.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Regional Performance + Top Performers ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '14px', marginBottom: '0' }}>

            {/* Regional Performance */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Regional Performance</div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#2563EB', fontWeight: 500, marginBottom: '18px' }}>Efficiency by geographic sector</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {regions.map((r, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151', fontWeight: 500 }}>{r.name}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>{r.pct}%</span>
                    </div>
                    <div style={{ height: '7px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${r.pct}%`, background: 'linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Top Performers</div>
                <button style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>VIEW ALL DRIVERS</button>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '14px' }}>Driver efficiency & rating leaderboard</div>

              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr', padding: '0 0 8px', borderBottom: '1px solid #F1F5F9' }}>
                {['DRIVER', 'RATING', 'TRIPS', 'ON-TIME', 'FUEL EFF.'].map((h) => (
                  <span key={h} style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px' }}>{h}</span>
                ))}
              </div>

              {/* Driver rows */}
              {drivers.map((d, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr', alignItems: 'center', padding: '10px 0', borderBottom: i < drivers.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                  {/* Driver */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: d.color }}>{d.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>{d.name}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8' }}>{d.sub}</div>
                    </div>
                  </div>
                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ color: '#F59E0B', fontSize: '12px' }}>★</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#374151' }}>{d.rating}</span>
                  </div>
                  {/* Trips */}
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#374151' }}>{d.trips}</span>
                  {/* On-time */}
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: d.onTimeColor, background: d.onTimeBg, padding: '2px 7px', borderRadius: '999px', display: 'inline-block' }}>{d.onTime}</span>
                  {/* Fuel */}
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#374151' }}>{d.fuel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer ── */}
          <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '20px', padding: '14px 0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.3px' }}>© 2023 CARRY ON GLOBAL LOGISTICS</span>
              {['PRIVACY POLICY', 'DATA SECURITY'].map((link) => (
                <button key={link} style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600, letterSpacing: '0.3px' }}>{link}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.3px' }}>SERVER STATUS:</span>
              <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#16A34A', letterSpacing: '0.5px' }}>OPERATIONAL</span>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
