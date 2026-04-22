'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

type Tab = 'Transactions' | 'Driver Earnings' | 'Refunds';

/* ── Bar chart data (MON–SUN) ────────────────────────────────── */
const barData = [
  { day: 'MON', value: 115 },
  { day: 'TUE', value: 158 },
  { day: 'WED', value: 138 },
  { day: 'THU', value: 216 },
  { day: 'FRI', value: 175 },
  { day: 'SAT', value: 129 },
  { day: 'SUN', value: 105 },
];

/* ── Transactions data ───────────────────────────────────────── */
const transactions = [
  { id: 'TXN-884291', orderId: '#CO-9921', customer: 'Eleanor Pena', amount: '$128.50', status: 'SUCCESS' as const },
  { id: 'TXN-884292', orderId: '#CO-9925', customer: 'Bessie Cooper', amount: '$42.00', status: 'FAILED' as const },
  { id: 'TXN-884293', orderId: '#CO-9928', customer: 'Floyd Miles', amount: '$75.20', status: 'PENDING' as const },
  { id: 'TXN-884294', orderId: '#CO-9930', customer: 'Jane Cooper', amount: '$210.00', status: 'SUCCESS' as const },
];

/* ── Status badge ────────────────────────────────────────────── */
function StatusBadge({ status }: { status: 'SUCCESS' | 'FAILED' | 'PENDING' }) {
  const styles = {
    SUCCESS: { bg: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' },
    FAILED:  { bg: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' },
    PENDING: { bg: '#DBEAFE', color: '#2563EB', border: '1px solid #93C5FD' },
  };
  const s = styles[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '4px 12px', borderRadius: '999px',
      background: s.bg, color: s.color, border: s.border,
      fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.5px',
    }}>
      {status}
    </span>
  );
}

/* ── Revenue bar chart ───────────────────────────────────────── */
function RevenueBarChart() {
  const max = Math.max(...barData.map((d) => d.value));
  const chartH = 280;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: `${chartH}px`, padding: '0' }}>
      {barData.map((d) => {
        const h = Math.round((d.value / max) * chartH);
        const isThu = d.day === 'THU';
        return (
          <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '100%', height: `${h}px`, position: 'relative', borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: isThu ? '#2563EB' : '#DBEAFE' }} />
            </div>
            <span style={{
              fontFamily: 'Inter', fontWeight: isThu ? 700 : 500, fontSize: '10px',
              color: isThu ? '#2563EB' : '#94A3B8', letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              {d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Timeline dot ────────────────────────────────────────────── */
function TimelineDot({ color, filled }: { color: string; filled?: boolean }) {
  return (
    <div style={{
      width: '10px', height: '10px', borderRadius: '50%',
      background: filled ? color : 'transparent',
      border: `2px solid ${color}`,
      flexShrink: 0,
    }} />
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Transactions');
  const [chartPeriod, setChartPeriod] = useState<'WEEKLY' | 'MONTHLY'>('WEEKLY');

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '28px 32px 40px', overflowY: 'auto' }}>
          {/* Page title */}
          <h1 style={{ margin: '0 0 4px', fontFamily: 'Inter', fontSize: '26px', fontWeight: 700, color: '#0F172A' }}>
            Payments & Earnings
          </h1>
          <p style={{ margin: '0 0 24px', fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
            Global financial overview and payout management.
          </p>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'TOTAL COMMISSION EARNED', value: '$42,180.00', icon: 'commission' },
              { label: 'TOTAL REVENUE', value: '$482,950.00', trend: '+12.4%', icon: 'revenue' },
              { label: 'AVG. COMMISSION/ORDER', value: '$12.45', icon: 'avg' },
            ].map((s) => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: '12px', padding: '20px 22px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                    color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}>
                    {s.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: 'Inter', fontSize: '24px', fontWeight: 700, color: '#0F172A',
                    }}>
                      {s.value}
                    </span>
                    {s.trend && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '2px',
                        fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#16A34A',
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 9L5 6L8 8L11 4" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {s.trend}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {s.icon === 'commission' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="4" width="14" height="10" rx="2" stroke="#94A3B8" strokeWidth="1.4"/>
                      <path d="M9 7v5M7 9.5h4" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  )}
                  {s.icon === 'revenue' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M2 14c2-2 4-1 6 1s4 1 6-1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M2 10c2-2 4-1 6 1s4 1 6-1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M2 6c2-2 4-1 6 1s4 1 6-1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  )}
                  {s.icon === 'avg' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="2" width="14" height="14" rx="2" stroke="#94A3B8" strokeWidth="1.4"/>
                      <path d="M5 7h2M5 10h4M5 13h6" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Daily Revenue Trends */}
          <div style={{
            background: '#fff', borderRadius: '12px',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
            padding: '24px', marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  Daily Revenue Trends
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>
                  Daily platform earnings from the past 7 days
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['WEEKLY', 'MONTHLY'] as const).map((p) => (
                  <button
                    key={p}
                    suppressHydrationWarning
                    onClick={() => setChartPeriod(p)}
                    style={{
                      padding: '6px 14px', borderRadius: '6px', border: 'none',
                      fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                      color: chartPeriod === p ? '#0F172A' : '#94A3B8',
                      background: chartPeriod === p ? '#F1F5F9' : 'transparent',
                      cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <RevenueBarChart />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
            {(['Transactions', 'Driver Earnings', 'Refunds'] as Tab[]).map((tab) => (
              <button
                key={tab}
                suppressHydrationWarning
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 20px', background: 'none', border: 'none',
                  fontFamily: 'Inter', fontSize: '13px', fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? '#2563EB' : '#64748B',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '2px solid #2563EB' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '20px', flexWrap: 'wrap',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '8px', background: '#fff',
              border: '1px solid #E2E8F0', fontFamily: 'Inter', fontSize: '12px', color: '#64748B',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="1.2"/>
                <path d="M1 5h12M4 1v3M10 1v3" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Oct 12 - Oct 19, 2023
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '8px', background: '#fff',
              border: '1px solid #E2E8F0', fontFamily: 'Inter', fontSize: '12px', color: '#64748B', cursor: 'pointer',
            }}>
              All Methods
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 3.5L5 6L7.5 3.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '8px', background: '#fff',
              border: '1px solid #E2E8F0', fontFamily: 'Inter', fontSize: '12px', color: '#64748B', cursor: 'pointer',
            }}>
              All Status
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 3.5L5 6L7.5 3.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input placeholder="Min" style={{
                width: '70px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0',
                fontFamily: 'Inter', fontSize: '12px', color: '#64748B', outline: 'none',
              }} />
              <span style={{ color: '#94A3B8', fontSize: '12px' }}>-</span>
              <input placeholder="Max" style={{
                width: '70px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0',
                fontFamily: 'Inter', fontSize: '12px', color: '#64748B', outline: 'none',
              }} />
            </div>
            <button suppressHydrationWarning style={{
              padding: '8px 20px', borderRadius: '8px', background: '#2563EB', border: 'none',
              fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer',
            }}>
              Apply Filters
            </button>
          </div>

          {/* Transactions Table */}
          <div style={{
            background: '#fff', borderRadius: '12px',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
            overflow: 'hidden', marginBottom: '24px',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1fr 0.8fr',
              padding: '14px 24px', background: '#F8FAFC',
              borderBottom: '1px solid #F1F5F9',
            }}>
              {['TRANSACTION ID', 'ORDER ID', 'CUSTOMER', 'AMOUNT', 'STATUS', 'ACTIONS'].map((h) => (
                <span key={h} style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase',
                }}>
                  {h}
                </span>
              ))}
            </div>
            {/* Rows */}
            {transactions.map((t, i) => (
              <div key={t.id} style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr 1fr 1fr 0.8fr',
                padding: '16px 24px',
                borderBottom: i < transactions.length - 1 ? '1px solid #F1F5F9' : 'none',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{t.id}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>{t.orderId}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#0F172A' }}>{t.customer}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{t.amount}</span>
                <div><StatusBadge status={t.status} /></div>
                <button suppressHydrationWarning style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB',
                  padding: 0, textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  {t.status === 'FAILED' ? 'RETRY' : 'VIEW'}
                </button>
              </div>
            ))}
          </div>

          {/* Transaction Details */}
          <div style={{
            background: '#fff', borderRadius: '12px',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
            padding: '28px', marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Transaction Details: TXN-884291
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#16A34A" strokeWidth="1.5"/>
                  <path d="M5 8l2 2 3-4" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Settled on Oct 19, 14:22
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
              {/* Fee Breakdown */}
              <div>
                <div style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Fee Breakdown
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Base Fare', value: '$85.00', color: '#0F172A' },
                    { label: 'Distance (12km)', value: '$24.00', color: '#0F172A' },
                    { label: 'Surge Pricing', value: '$19.50', color: '#0F172A' },
                    { label: 'Platform Comm. (15%)', value: '-$19.28', color: '#DC2626' },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>{row.label}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Payout Amount</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>$109.22</span>
                  </div>
                </div>
              </div>

              {/* Gateway Information */}
              <div>
                <div style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Gateway Information
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Processor</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v14M1 8h14" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Razorpay</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Payment Method</div>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>UPI / PhonePe</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Reference ID</div>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#0F172A', fontFamilyMono: 'monospace' }}>rzp_live_k9JIL2p0</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <div style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Status Timeline
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                  {/* Vertical line */}
                  <div style={{
                    position: 'absolute', left: '4px', top: '10px', bottom: '10px',
                    width: '1px', background: '#E2E8F0', zIndex: 0,
                  }} />
                  {[
                    { title: 'Funds Released to Driver', time: 'Oct 19, 2023 · 14:22 PM', color: '#16A34A', filled: true },
                    { title: 'Payment Captured', time: 'Oct 19, 2023 · 14:15 PM', color: '#2563EB', filled: true },
                    { title: 'Order Initiated', time: 'Oct 19, 2023 · 13:45 PM', color: '#CBD5E1', filled: false },
                  ].map((item, i) => (
                    <div key={item.title} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      paddingBottom: i < 2 ? '16px' : '0',
                      position: 'relative', zIndex: 1,
                    }}>
                      <TimelineDot color={item.color} filled={item.filled} />
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{item.title}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Issues */}
          <div style={{
            background: '#fff', borderRadius: '12px',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
            padding: '28px', marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#DC2626" strokeWidth="1.4"/>
                  <path d="M9 6v3M9 12v.5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                    Payment Issues
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>
                    Pending alerts requiring manual action
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                  Success Rate: <strong style={{ color: '#16A34A' }}>98.2%</strong>
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                  Refund Rate: <strong style={{ color: '#0F172A' }}>1.4%</strong>
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                  Chargebacks: <strong style={{ color: '#DC2626' }}>0.05%</strong>
                </span>
                <button suppressHydrationWarning style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '8px',
                  background: '#fff', border: '1px solid #E2E8F0',
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A',
                  cursor: 'pointer',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M4 4l3-3 3 3" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 10h12" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Export Financial Report
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {/* Gateway Timeout */}
              <div style={{
                borderRadius: '12px', background: '#FEF2F2', border: '1px solid #FECACA',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                    color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    Gateway Timeout
                  </span>
                  <span style={{
                    padding: '2px 8px', borderRadius: '4px', background: '#DC2626',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#fff',
                  }}>
                    12
                  </span>
                </div>
                <p style={{
                  fontFamily: 'Inter', fontSize: '12px', color: '#991B1B', lineHeight: '1.5',
                  margin: '0 0 16px',
                }}>
                  Multiple transactions failing during handshake with Stripe.
                </p>
                <button suppressHydrationWarning style={{
                  width: '100%', padding: '10px 0', borderRadius: '8px',
                  background: '#DC2626', border: 'none',
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff',
                  cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  Review Failed
                </button>
              </div>

              {/* Card Verification Failed */}
              <div style={{
                borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A',
                  }}>
                    Card Verification Failed
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A',
                  }}>
                    08
                  </span>
                </div>
                <div style={{
                  width: '100%', height: '6px', borderRadius: '999px',
                  background: '#E2E8F0', overflow: 'hidden', marginBottom: '8px',
                }}>
                  <div style={{ width: '65%', height: '100%', background: '#475569', borderRadius: '999px' }} />
                </div>
                <span style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  Action Required
                </span>
              </div>

              {/* Incorrect Bank Details */}
              <div style={{
                borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A',
                  }}>
                    Incorrect Bank Details
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A',
                  }}>
                    03
                  </span>
                </div>
                <div style={{
                  width: '100%', height: '6px', borderRadius: '999px',
                  background: '#E2E8F0', overflow: 'hidden', marginBottom: '8px',
                }}>
                  <div style={{ width: '25%', height: '100%', background: '#2563EB', borderRadius: '999px' }} />
                </div>
                <span style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  Pending Resubmission
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
