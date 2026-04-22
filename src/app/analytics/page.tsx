'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

// ── Data ───────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'TOTAL ORDERS', value: '12,482', trend: '+12.5%', trendLabel: 'vs last week', trendUp: true },
  { label: 'TOTAL REVENUE', value: '$84.2k', trend: '+8.2%', trendLabel: 'vs last week', trendUp: true },
  { label: 'ACTIVE DRIVERS', value: '1,204', trend: '-2.1%', trendLabel: 'vs prev. period', trendUp: false },
  { label: 'AVG DELIVERY', value: '24m', trend: '-4s', trendLabel: 'vs prev. week', trendUp: true },
  { label: 'CANCEL RATE', value: '1.8%', trend: 'Optimal', trendLabel: 'vs 2.4% avg', trendUp: true, isOptimal: true },
  { label: 'AVG RATING', value: '4.8', trend: '+0.1', trendLabel: 'vs last month', trendUp: true },
];

const trendData = [
  { day: '01 May', orders: 35, revenue: 28 },
  { day: '05 May', orders: 55, revenue: 42 },
  { day: '10 May', orders: 48, revenue: 38 },
  { day: '15 May', orders: 85, revenue: 72 },
  { day: '20 May', orders: 42, revenue: 35 },
  { day: '25 May', orders: 58, revenue: 48 },
  { day: '30 May', orders: 38, revenue: 30 },
];

const insights = [
  {
    icon: 'alert',
    title: 'Critical: Cancellation Spike',
    desc: 'Zone A cancellations up 15% due to roadwork. Dynamic rerouting active.',
    iconColor: '#EF4444',
    bgColor: '#FEF2F2',
  },
  {
    icon: 'info',
    title: 'Peak Demand Forecast',
    desc: 'Demand expected to hit 2.5x normal at 7 PM. 40 additional drivers recommended.',
    iconColor: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  {
    icon: 'check',
    title: 'Efficiency Milestone',
    desc: 'Jersey City drivers reached 98% on-time delivery rate this morning.',
    iconColor: '#10B981',
    bgColor: '#ECFDF5',
  },
];

const supplyDemandData = [0.7, 0.3, 0.8, 0.4, 0.9, 0.6];

const zoneData = [
  { name: 'DOWNTOWN', value: '4,829', status: 'High', statusColor: '#10B981' },
  { name: 'WEST SIDE', value: '2,105', status: 'Normal', statusColor: '#64748B' },
  { name: 'EAST RIVER', value: '1,942', status: 'Normal', statusColor: '#64748B' },
  { name: 'UPTOWN', value: '3,211', status: 'Hot', statusColor: '#3B82F6' },
];

const drivers = [
  { name: 'Alex Thompson', id: '#DR-90210', avatar: '/driver-avatar.png', fleet: 'Pickup Truck', acceptance: '98.2%', cancel: '0.5%', cancelUp: false, ontime: '99.1%', rating: '4.9', status: 'ACTIVE', statusBg: '#D1FAE5', statusColor: '#059669' },
  { name: 'Sarah Jenkins', id: '#DR-90455', avatar: '/driver-sarah.png', fleet: 'Delivery Bike', acceptance: '94.5%', cancel: '1.2%', cancelUp: false, ontime: '95.8%', rating: '4.8', status: 'ACTIVE', statusBg: '#D1FAE5', statusColor: '#059669' },
  { name: 'Michael Ross', id: '#DR-88123', avatar: '/driver-michael.png', fleet: 'Heavy Truck', acceptance: '82.1%', cancel: '8.4%', cancelUp: true, ontime: '84.2%', rating: '4.2', status: 'ON BREAK', statusBg: '#FEF3C7', statusColor: '#D97706' },
];

const operationalLog = [
  { date: 'May 24, 2024', volume: '1,402', grossRev: '$12,490', resources: '842 Units', avgTat: '22m 14s' },
  { date: 'May 23, 2024', volume: '1,291', grossRev: '$11,842', resources: '790 Units', avgTat: '24m 05s' },
  { date: 'May 22, 2024', volume: '1,510', grossRev: '$14,102', resources: '866 Units', avgTat: '21m 58s' },
];

// ── Components ─────────────────────────────────────────────────────────────────

function FilterBar() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '16px 20px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Time tabs */}
        <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '2px' }}>
          {['Today', 'Weekly', 'Monthly'].map((tab, i) => (
            <button key={tab} suppressHydrationWarning type="button" style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: i === 0 ? '#FFFFFF' : 'transparent',
              fontFamily: inter,
              fontSize: '12px',
              fontWeight: i === 0 ? 700 : 500,
              color: i === 0 ? '#2563EB' : '#64748B',
              cursor: 'pointer',
              boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}>{tab}</button>
          ))}
          <button suppressHydrationWarning type="button" style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            background: 'transparent',
            fontFamily: inter,
            fontSize: '12px',
            fontWeight: 500,
            color: '#64748B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            Custom
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" stroke="#94A3B8" strokeWidth="1.2"/><path d="M1 5h10M4 1v2M8 1v2" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Dropdowns */}
        {[
          { label: 'All Cities', icon: true },
          { label: 'Driver Type: All', icon: true },
          { label: 'Payment: All', icon: true },
          { label: 'Status: All', icon: true },
        ].map((dd) => (
          <button key={dd.label} suppressHydrationWarning type="button" style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
            background: '#FFFFFF',
            fontFamily: inter,
            fontSize: '12px',
            fontWeight: 500,
            color: '#374151',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            {dd.label}
            {dd.icon && <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
        ))}
      </div>

      <button suppressHydrationWarning type="button" style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        background: '#FFFFFF',
        fontFamily: inter,
        fontSize: '11px',
        fontWeight: 700,
        color: '#374151',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 1h12M3 5h8M5 9h4" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
        More Filters
      </button>
    </div>
  );
}

function StatsCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '16px' }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            fontFamily: inter,
            fontSize: '10px',
            fontWeight: 700,
            color: '#94A3B8',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>{s.label}</div>
          <div style={{
            fontFamily: manrope,
            fontSize: '24px',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: '28px',
            marginBottom: '8px',
          }}>{s.value}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {s.isOptimal ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#10B981" strokeWidth="1.5"/><path d="M4 6l1.5 1.5L8 5" stroke="#10B981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#10B981' }}>{s.trend}</span>
              </>
            ) : (
              <span style={{
                fontFamily: inter,
                fontSize: '11px',
                fontWeight: 700,
                color: s.trendUp ? '#10B981' : '#EF4444',
              }}>{s.trendUp ? '↗' : '↘'} {s.trend}</span>
            )}
            <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 500, color: '#94A3B8' }}>{s.trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendChart() {
  const maxVal = 100;
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      flex: 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Orders & Revenue Trend</div>
          <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#94A3B8' }}>Daily performance comparison with hover insights</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
            <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#64748B' }}>Orders</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E2E8F0' }} />
            <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#94A3B8' }}>Revenue</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', paddingBottom: '30px' }}>
        {trendData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%', justifyContent: 'center' }}>
              {/* Orders bar - blue */}
              <div style={{
                width: '14px',
                height: `${(d.orders / maxVal) * 160}px`,
                background: '#3B82F6',
                borderRadius: '3px 3px 0 0',
                transition: 'height 0.3s ease',
              }} />
              {/* Revenue bar - light gray */}
              <div style={{
                width: '14px',
                height: `${(d.revenue / maxVal) * 160}px`,
                background: '#F1F5F9',
                borderRadius: '3px 3px 0 0',
                transition: 'height 0.3s ease',
              }} />
            </div>
            <span style={{
              fontFamily: inter,
              fontSize: '10px',
              fontWeight: 600,
              color: '#94A3B8',
              whiteSpace: 'nowrap',
            }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AISmartInsights() {
  return (
    <div style={{
      width: '320px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1l2.5 6.5L19 8l-5 4.5L15.5 19 10 15.5 4.5 19 6 12.5 1 8l6.5-.5L10 1Z" fill="#3B82F6" />
          </svg>
          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#3B82F6' }}>AI Smart Insights</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {insights.map((insight, i) => (
            <div key={i} style={{
              padding: '12px',
              borderRadius: '10px',
              background: insight.bgColor,
              border: `1px solid ${insight.bgColor}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: insight.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {insight.icon === 'alert' && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v3M6 8.5v.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/><circle cx="6" cy="6" r="5" stroke="#FFFFFF" strokeWidth="1.2"/></svg>
                  )}
                  {insight.icon === 'info' && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#FFFFFF" strokeWidth="1.2"/><path d="M6 5.5v3M6 3.5v1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  )}
                  {insight.icon === 'check' && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </div>
                <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{insight.title}</span>
              </div>
              <p style={{
                fontFamily: inter,
                fontSize: '11px',
                fontWeight: 500,
                color: '#64748B',
                lineHeight: '16px',
                margin: 0,
                paddingLeft: '28px',
              }}>{insight.desc}</p>
            </div>
          ))}
        </div>

        <button suppressHydrationWarning type="button" style={{
          marginTop: '16px',
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          background: 'transparent',
          fontFamily: inter,
          fontSize: '12px',
          fontWeight: 700,
          color: '#3B82F6',
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
        }}>
          View Analytics Laboratory
        </button>
      </div>

      {/* Supply vs Demand */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontFamily: manrope, fontSize: '11px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>Supply vs Demand</span>
          <span style={{
            background: '#DBEAFE',
            borderRadius: '4px',
            padding: '2px 8px',
            fontFamily: inter,
            fontSize: '9px',
            fontWeight: 800,
            color: '#3B82F6',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
          {supplyDemandData.map((v, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${v * 40}px`,
              background: '#3B82F6',
              borderRadius: '2px 2px 0 0',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderStatusMatrix() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        fontFamily: manrope,
        fontSize: '14px',
        fontWeight: 800,
        color: '#0F172A',
        marginBottom: '4px',
        alignSelf: 'flex-start',
      }}>Order Status Matrix</div>

      {/* Circular progress */}
      <div style={{ position: 'relative', width: '160px', height: '160px', margin: '16px 0' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle cx="80" cy="80" r="60" fill="none" stroke="#F1F5F9" strokeWidth="12" />
          {/* Delivered - blue */}
          <circle cx="80" cy="80" r="60" fill="none" stroke="#3B82F6" strokeWidth="12"
            strokeDasharray={`${0.824 * 377} ${377}`}
            strokeDashoffset={-0.05 * 377}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
          />
          {/* Pending - green */}
          <circle cx="80" cy="80" r="60" fill="none" stroke="#10B981" strokeWidth="12"
            strokeDasharray={`${0.138 * 377} ${377}`}
            strokeDashoffset={-(0.824 + 0.05) * 377}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
          />
          {/* Cancelled - red */}
          <circle cx="80" cy="80" r="60" fill="none" stroke="#EF4444" strokeWidth="12"
            strokeDasharray={`${0.038 * 377} ${377}`}
            strokeDashoffset={-(0.824 + 0.138 + 0.05) * 377}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>TOTAL</div>
          <div style={{ fontFamily: manrope, fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>12.4k</div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', alignSelf: 'stretch', justifyContent: 'center' }}>
        {[
          { label: 'DELIVERED', pct: '82.4%', color: '#3B82F6' },
          { label: 'PENDING', pct: '13.8%', color: '#10B981' },
          { label: 'CANCELLED', pct: '3.8%', color: '#EF4444' },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 800, color: item.color }}>{item.pct}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZoneOrderDensity() {
  return (
    <div style={{
      flex: 1.5,
      background: '#0F172A',
      borderRadius: '12px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gradient background effect */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '30%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: manrope,
          fontSize: '14px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '2px',
        }}>Zone Order Density</div>
        <div style={{
          fontFamily: inter,
          fontSize: '11px',
          fontWeight: 500,
          color: '#64748B',
          marginBottom: '16px',
        }}>Real-time heatmap visualization</div>

        {/* Map legend */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>MAP LEGEND</div>
          {[
            { label: 'Critical Demand', color: '#3B82F6' },
            { label: 'Active Market', color: '#93C5FD' },
            { label: 'Stable Activity', color: '#E2E8F0' },
          ].map((l) => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
              <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 500, color: '#CBD5E1' }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Zone cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginTop: '80px',
        }}>
          {zoneData.map((zone) => (
            <div key={zone.name} style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '10px',
              padding: '12px',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>{zone.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#3B82F6' }}>{zone.value}</span>
                <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: zone.statusColor }}>{zone.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DriverPerformanceMatrix() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <div>
          <div style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Driver Performance matrix</div>
          <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#94A3B8' }}>Real-time status and efficiency tracking</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Top Performers', 'Attention Required'].map((tab, i) => (
            <button key={tab} suppressHydrationWarning type="button" style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: i === 0 ? 'none' : '1px solid #E2E8F0',
              background: i === 0 ? '#F1F5F9' : '#FFFFFF',
              fontFamily: inter,
              fontSize: '11px',
              fontWeight: i === 0 ? 700 : 500,
              color: i === 0 ? '#0F172A' : '#64748B',
              cursor: 'pointer',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr',
        padding: '12px 0',
        borderBottom: '1px solid #F1F5F9',
        marginTop: '16px',
      }}>
        {['DRIVER IDENTITY', 'FLEET CLASS', 'ACCEPTANCE', 'CANCEL RATE', 'ON-TIME %', 'RATING', 'STATUS'].map((h) => (
          <span key={h} style={{
            fontFamily: inter,
            fontSize: '9px',
            fontWeight: 800,
            color: '#94A3B8',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}>{h}</span>
        ))}
      </div>

      {/* Driver rows */}
      {drivers.map((d, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: i < drivers.length - 1 ? '1px solid #F8FAFC' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: '#E2E8F0' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{d.name}</div>
              <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 500, color: '#94A3B8' }}>{d.id}</div>
            </div>
          </div>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#374151' }}>{d.fleet}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{d.acceptance}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: d.cancelUp ? '#EF4444' : '#10B981' }}>{d.cancel}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{d.ontime}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>★ {d.rating}</span>
          <span style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: d.statusBg,
            fontFamily: inter,
            fontSize: '10px',
            fontWeight: 800,
            color: d.statusColor,
            letterSpacing: '0.5px',
            textAlign: 'center',
          }}>{d.status}</span>
        </div>
      ))}
    </div>
  );
}

function ProfitabilityAudit() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        fontFamily: manrope,
        fontSize: '14px',
        fontWeight: 800,
        color: '#0F172A',
        marginBottom: '20px',
      }}>Profitability Audit</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { label: 'Avg. Commission', value: '$12.45', trend: '+3%', trendUp: true },
          { label: 'Discount Impact', value: '-$2.1k', trend: '+12%', trendUp: false, isNegative: true },
          { label: 'Refund Ratio', value: '0.82%', trend: '-0.1%', trendUp: true },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B' }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: manrope,
                fontSize: '16px',
                fontWeight: 800,
                color: item.isNegative ? '#EF4444' : '#0F172A',
              }}>{item.value}</span>
              <span style={{
                fontFamily: inter,
                fontSize: '10px',
                fontWeight: 700,
                color: item.trendUp ? '#10B981' : '#EF4444',
              }}>{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #F1F5F9',
      }}>
        <div style={{
          fontFamily: manrope,
          fontSize: '24px',
          fontWeight: 800,
          color: '#3B82F6',
          marginBottom: '4px',
        }}>24.5%</div>
        <div style={{
          fontFamily: inter,
          fontSize: '11px',
          fontWeight: 500,
          color: '#94A3B8',
        }}>Net Profit Margin</div>
        <div style={{
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 500,
          color: '#10B981',
        }}>High Performance Zone</div>
      </div>
    </div>
  );
}

function OperationalLog() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      flex: 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Operational Log</div>
          <div style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>Past 72 Hours Performance</div>
        </div>
        <button suppressHydrationWarning type="button" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: inter,
          fontSize: '11px',
          fontWeight: 700,
          color: '#3B82F6',
        }}>
          Detailed PDF Audit
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
        padding: '8px 0',
        borderBottom: '1px solid #F1F5F9',
        marginBottom: '8px',
      }}>
        {['DATE INDEX', 'VOLUME', 'GROSS REV', 'RESOURCES', 'AVG TAT'].map((h) => (
          <span key={h} style={{
            fontFamily: inter,
            fontSize: '9px',
            fontWeight: 800,
            color: '#94A3B8',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {operationalLog.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: i < operationalLog.length - 1 ? '1px solid #F8FAFC' : 'none',
        }}>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#374151' }}>{row.date}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{row.volume}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{row.grossRev}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B' }}>{row.resources}</span>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#3B82F6' }}>{row.avgTat}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ReportsAnalyticsPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: '#F6F8FA', boxSizing: 'border-box' }}>

          {/* Filter Bar */}
          <FilterBar />

          {/* Stats Cards */}
          <StatsCards />

          {/* Orders & Revenue Trend + AI Smart Insights */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <TrendChart />
            <AISmartInsights />
          </div>

          {/* Order Status Matrix + Zone Order Density */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <OrderStatusMatrix />
            <ZoneOrderDensity />
          </div>

          {/* Driver Performance Matrix */}
          <DriverPerformanceMatrix />

          {/* Profitability Audit + Operational Log */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <ProfitabilityAudit />
            <OperationalLog />
          </div>

        </main>
      </div>
    </div>
  );
}
