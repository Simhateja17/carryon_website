'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { formatMoney } from '@/lib/format';
import {
  getRevenueStats,
  getRevenueChart,
  getRevenueTransactions,
  getRevenueTransactionDetail,
  getDriverEarnings,
  getRefunds,
  getRevenueIssues,
} from '@/lib/api';
import type {
  RevenueStats,
  RevenueChartPoint,
  RevenueTransaction,
  RevenueTransactionDetail,
  DriverEarningRow,
  RefundRow,
  RevenueIssues,
} from '@/types';

type Tab = 'Transactions' | 'Driver Earnings' | 'Refunds';
type Period = 'weekly' | 'monthly';

/* ── Status badge ────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const upper = status.toUpperCase();
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    COMPLETED: { bg: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC' },
    FAILED:    { bg: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' },
    PENDING:   { bg: '#DBEAFE', color: '#2563EB', border: '1px solid #93C5FD' },
    REFUNDED:  { bg: '#FEF3C7', color: '#D97706', border: '1px solid #FCD34D' },
  };
  const s = styles[upper] || styles.PENDING;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '4px 12px', borderRadius: '999px',
      background: s.bg, color: s.color, border: s.border,
      fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.5px',
    }}>
      {upper}
    </span>
  );
}

/* ── Revenue bar chart ───────────────────────────────────────── */
function RevenueBarChart({ data }: { data: RevenueChartPoint[] }) {
  if (!data.length) return <div style={{ height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8' }}>No data for this period</div>;
  const max = Math.max(...data.map((d) => d.revenue), 1);
  const chartH = 170;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: `${chartH}px`, padding: '0 14px' }}>
      {data.map((d) => {
        const h = Math.max(Math.round((d.revenue / max) * chartH), 4);
        const isToday = d.date === today;
        const dayLabel = new Date(d.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short' }).toUpperCase();
        return (
          <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div title={`${d.date}: ${formatMoney(d.revenue)}`} style={{ width: '100%', maxWidth: '58px', height: `${h}px`, position: 'relative', borderRadius: '2px 2px 0 0', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: isToday ? '#0F5CC0' : '#BFD0E4' }} />
            </div>
            <span style={{
              fontFamily: 'Inter', fontWeight: isToday ? 700 : 500, fontSize: '10px',
              color: isToday ? '#0F5CC0' : '#8EA2BE', letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              {dayLabel}
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

/* ── Loader ──────────────────────────────────────────────────── */
function Loader() {
  return <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8' }}>Loading...</div>;
}

/* ── Transaction Detail Panel ────────────────────────────────── */
function TransactionDetailPanel({ detail }: { detail: RevenueTransactionDetail }) {
  const fb = detail.feeBreakdown;
  const timelineItems = detail.timeline.length > 0
    ? detail.timeline.map((e, i) => ({
        title: (e.toStatus || e.command).replace(/_/g, ' '),
        time: new Date(e.createdAt).toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' }),
        color: i === 0 ? '#16A34A' : i === 1 ? '#2563EB' : '#CBD5E1',
        filled: i < 2,
      }))
    : [{ title: 'Delivered', time: detail.deliveredAt ? new Date(detail.deliveredAt).toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A', color: '#16A34A', filled: true }];

  return (
    <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '28px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
          Transaction Details: {detail.orderCode}
        </h3>
        <StatusBadge status={detail.paymentStatus} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
        {/* Fee Breakdown */}
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Fee Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Gross Amount', value: formatMoney(fb.grossAmount), color: '#0F172A' },
              { label: 'Taxable Subtotal', value: formatMoney(fb.taxableAmount), color: '#0F172A' },
              { label: `Tax Payable (${Math.round((fb.taxRate || 0) * 100)}%)`, value: formatMoney(fb.taxAmount), color: '#D97706' },
              ...(fb.distance > 0 ? [{ label: `Distance (${fb.distance.toFixed(1)} km)`, value: '', color: '#64748B' }] : []),
              ...(fb.waitTimeCharge > 0 ? [{ label: 'Wait Time Charge', value: formatMoney(fb.waitTimeCharge), color: '#0F172A' }] : []),
              ...(fb.discountAmount > 0 ? [{ label: 'Discount', value: `-${formatMoney(fb.discountAmount)}`, color: '#DC2626' }] : []),
              { label: `Platform Comm. (${fb.platformCommissionRate}%)`, value: `-${formatMoney(fb.platformCommission)}`, color: '#DC2626' },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>{row.label}</span>
                {row.value && <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: row.color }}>{row.value}</span>}
              </div>
            ))}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Driver Payout</span>
              <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#2563EB' }}>{formatMoney(fb.driverPayout)}</span>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Order Information</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Payment Method</div>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{detail.paymentMethod}</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Customer</div>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{detail.customer.name}</span>
            </div>
            {detail.driver && (
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Driver</div>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{detail.driver.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Status Timeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '4px', top: '10px', bottom: '10px', width: '1px', background: '#E2E8F0', zIndex: 0 }} />
            {timelineItems.map((item, i) => (
              <div key={`${item.title}-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingBottom: i < timelineItems.length - 1 ? '16px' : '0', position: 'relative', zIndex: 1 }}>
                <TimelineDot color={item.color} filled={item.filled} />
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A', textTransform: 'capitalize' }}>{item.title.toLowerCase()}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function RevenuePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Transactions');
  const [chartPeriod, setChartPeriod] = useState<Period>('weekly');

  // Data state
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [chartData, setChartData] = useState<RevenueChartPoint[]>([]);
  const [transactions, setTransactions] = useState<RevenueTransaction[]>([]);
  const [txTotal, setTxTotal] = useState(0);
  const [txPage, setTxPage] = useState(1);
  const [txTotalPages, setTxTotalPages] = useState(1);
  const [selectedTxDetail, setSelectedTxDetail] = useState<RevenueTransactionDetail | null>(null);
  const [driverEarnings, setDriverEarnings] = useState<DriverEarningRow[]>([]);
  const [deTotal, setDeTotal] = useState(0);
  const [dePage, setDePage] = useState(1);
  const [deTotalPages, setDeTotalPages] = useState(1);
  const [refunds, setRefunds] = useState<RefundRow[]>([]);
  const [rfTotal, setRfTotal] = useState(0);
  const [rfPage, setRfPage] = useState(1);
  const [rfTotalPages, setRfTotalPages] = useState(1);
  const [issues, setIssues] = useState<RevenueIssues | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  // Filters
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMinAmount, setFilterMinAmount] = useState('');
  const [filterMaxAmount, setFilterMaxAmount] = useState('');

  // Fetch stats + chart when period changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          getRevenueStats(chartPeriod),
          getRevenueChart(chartPeriod),
        ]);
        if (cancelled) return;
        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (err) {
        console.error('Failed to fetch stats/chart:', err);
      }
    })();
    return () => { cancelled = true; };
  }, [chartPeriod]);

  // Fetch transactions
  const fetchTransactions = useCallback(async (page: number) => {
    try {
      const res = await getRevenueTransactions({
        page,
        limit: 20,
        paymentMethod: filterMethod !== 'all' ? filterMethod : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        minAmount: filterMinAmount || undefined,
        maxAmount: filterMaxAmount || undefined,
      });
      setTransactions(res.data);
      setTxTotal(res.total);
      setTxPage(res.page);
      setTxTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  }, [filterMethod, filterStatus, filterMinAmount, filterMaxAmount]);

  // Fetch driver earnings
  const fetchDriverEarnings = useCallback(async (page: number) => {
    try {
      const res = await getDriverEarnings({ page, limit: 20 });
      setDriverEarnings(res.data);
      setDeTotal(res.total);
      setDePage(res.page);
      setDeTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch driver earnings:', err);
    }
  }, []);

  // Fetch refunds
  const fetchRefunds = useCallback(async (page: number) => {
    try {
      const res = await getRefunds({ page, limit: 20 });
      setRefunds(res.data);
      setRfTotal(res.total);
      setRfPage(res.page);
      setRfTotalPages(res.totalPages);
    } catch (err) {
      console.error('Failed to fetch refunds:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await Promise.all([
        fetchTransactions(1),
        fetchDriverEarnings(1),
        fetchRefunds(1),
        getRevenueIssues().then((r) => { if (!cancelled) setIssues(r.data); }).catch(console.error),
      ]);
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [fetchTransactions, fetchDriverEarnings, fetchRefunds]);

  // Click on a transaction row
  async function handleTxClick(txId: string) {
    setDetailLoading(true);
    try {
      const res = await getRevenueTransactionDetail(txId);
      setSelectedTxDetail(res.data);
    } catch (err) {
      console.error('Failed to fetch detail:', err);
    } finally {
      setDetailLoading(false);
    }
  }

  function handleApplyFilters() {
    setTxPage(1);
    fetchTransactions(1);
  }

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'TOTAL COMMISSION EARNED', value: stats ? formatMoney(stats.totalCommission) : '—', icon: 'commission' },
              { label: 'TAX TO PAY', value: stats ? formatMoney(stats.taxPayable) : '—', icon: 'tax' },
              { label: 'TAX COLLECTED', value: stats ? formatMoney(stats.taxCollected) : '—', icon: 'tax' },
              { label: 'TOTAL REVENUE', value: stats ? formatMoney(stats.totalRevenue) : '—', icon: 'revenue' },
              { label: 'AVG. COMMISSION/ORDER', value: stats ? formatMoney(stats.avgCommissionPerOrder) : '—', icon: 'avg' },
            ].map((s) => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: '12px', padding: '20px 22px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>{s.label}</div>
                  <span style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>{s.value}</span>
                </div>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon === 'commission' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="#94A3B8" strokeWidth="1.4"/><path d="M9 7v5M7 9.5h4" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  )}
                  {s.icon === 'revenue' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 14c2-2 4-1 6 1s4 1 6-1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/><path d="M2 10c2-2 4-1 6 1s4 1 6-1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/><path d="M2 6c2-2 4-1 6 1s4 1 6-1" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  )}
                  {s.icon === 'tax' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 2.5h8a1.5 1.5 0 0 1 1.5 1.5v11.5l-2-1-2 1-2-1-2 1-2-1V4A1.5 1.5 0 0 1 5 2.5Z" stroke="#94A3B8" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 7h5M7 10h5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  )}
                  {s.icon === 'avg' && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="#94A3B8" strokeWidth="1.4"/><path d="M5 7h2M5 10h4M5 13h6" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Daily Revenue Trends */}
          <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {chartPeriod === 'weekly' ? 'Daily Revenue Trends' : 'Monthly Revenue Trends'}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>
                  {chartPeriod === 'weekly' ? 'Daily platform earnings from the past 7 days' : 'Daily platform earnings for the current month'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['weekly', 'monthly'] as const).map((p) => (
                  <button key={p} onClick={() => setChartPeriod(p)} style={{
                    padding: '6px 14px', borderRadius: '6px', border: 'none',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                    color: chartPeriod === p ? '#0F172A' : '#94A3B8',
                    background: chartPeriod === p ? '#F1F5F9' : 'transparent',
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <RevenueBarChart data={chartData} />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
            {(['Transactions', 'Driver Earnings', 'Refunds'] as Tab[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '12px 20px', background: 'none', border: 'none',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#2563EB' : '#64748B', cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #2563EB' : '2px solid transparent',
                marginBottom: '-1px',
              }}>
                {tab}
              </button>
            ))}
          </div>

          {loading ? <Loader /> : (
            <>
              {/* ── Transactions Tab ─────────────────── */}
              {activeTab === 'Transactions' && (
                <>
                  {/* Filters */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-end', gap: '14px', marginBottom: '0',
                    padding: '14px 20px 12px', background: '#fff',
                    border: '1px solid #E5EAF1', borderBottom: 'none', borderRadius: '12px 12px 0 0', flexWrap: 'nowrap',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>Payment Method</span>
                      <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} style={{ height: '34px', minWidth: '132px', padding: '0 12px', borderRadius: '9px', background: '#fff', border: '1px solid #D6DEE8', fontFamily: 'Inter', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                        <option value="all">All Methods</option>
                        <option value="CASH">Cash</option>
                        <option value="WALLET">Wallet</option>
                        <option value="CARD">Card</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>Status</span>
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ height: '34px', minWidth: '116px', padding: '0 12px', borderRadius: '9px', background: '#fff', border: '1px solid #D6DEE8', fontFamily: 'Inter', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                        <option value="all">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                        <option value="REFUNDED">Refunded</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#64748B' }}>Amount Range</span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input placeholder="Min" value={filterMinAmount} onChange={(e) => setFilterMinAmount(e.target.value)} style={{ width: '66px', height: '34px', padding: '0 12px', borderRadius: '9px', border: '1px solid #D6DEE8', fontFamily: 'Inter', fontSize: '14px', color: '#64748B', outline: 'none' }} />
                        <span style={{ color: '#94A3B8', fontSize: '14px' }}>-</span>
                        <input placeholder="Max" value={filterMaxAmount} onChange={(e) => setFilterMaxAmount(e.target.value)} style={{ width: '66px', height: '34px', padding: '0 12px', borderRadius: '9px', border: '1px solid #D6DEE8', fontFamily: 'Inter', fontSize: '14px', color: '#64748B', outline: 'none' }} />
                      </div>
                    </div>
                    <button onClick={handleApplyFilters} style={{ height: '36px', padding: '0 22px', borderRadius: '9px', background: '#0F5CC0', border: 'none', boxShadow: '0 8px 14px rgba(15,92,192,0.25)', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
                      Apply Filters
                    </button>
                  </div>

                  {/* Transactions Table */}
                  <div style={{ background: '#fff', borderRadius: '0 0 12px 12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 1.1fr 0.8fr 0.7fr', padding: '16px 20px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                      {['ORDER ID', 'PAYMENT METHOD', 'CUSTOMER', 'AMOUNT', 'STATUS'].map((h) => (
                        <span key={h} style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{h}</span>
                      ))}
                    </div>
                    {transactions.length === 0 ? (
                      <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8' }}>No transactions found</div>
                    ) : transactions.map((t, i) => (
                      <div key={t.id} onClick={() => handleTxClick(t.id)} style={{
                        display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 1.1fr 0.8fr 0.7fr',
                        padding: '14px 20px', borderBottom: i < transactions.length - 1 ? '1px solid #F1F5F9' : 'none',
                        alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s',
                      }} onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{t.orderCode}</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>{t.paymentMethod}</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#0F172A' }}>{t.customerName}</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{formatMoney(t.amount)}</span>
                        <div><StatusBadge status={t.paymentStatus} /></div>
                      </div>
                    ))}
                    {/* Pagination */}
                    {txTotalPages > 1 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #F1F5F9' }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                          {txTotal} total &middot; Page {txPage} of {txTotalPages}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button disabled={txPage <= 1} onClick={() => { setTxPage(txPage - 1); fetchTransactions(txPage - 1); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', fontFamily: 'Inter', fontSize: '12px', cursor: txPage <= 1 ? 'default' : 'pointer', opacity: txPage <= 1 ? 0.5 : 1 }}>Previous</button>
                          <button disabled={txPage >= txTotalPages} onClick={() => { setTxPage(txPage + 1); fetchTransactions(txPage + 1); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', fontFamily: 'Inter', fontSize: '12px', cursor: txPage >= txTotalPages ? 'default' : 'pointer', opacity: txPage >= txTotalPages ? 0.5 : 1 }}>Next</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Transaction Detail */}
                  {detailLoading && <Loader />}
                  {selectedTxDetail && !detailLoading && <TransactionDetailPanel detail={selectedTxDetail} />}
                </>
              )}

              {/* ── Driver Earnings Tab ──────────────── */}
              {activeTab === 'Driver Earnings' && (
                <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr', padding: '16px 20px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                    {['DRIVER', 'BOOKING', 'GROSS', 'PLATFORM FEE', 'EARNING', 'DATE'].map((h) => (
                      <span key={h} style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{h}</span>
                    ))}
                  </div>
                  {driverEarnings.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8' }}>No driver earnings found</div>
                  ) : driverEarnings.map((d, i) => (
                    <div key={d.id} style={{
                      display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 0.8fr 0.8fr 0.8fr',
                      padding: '14px 20px', borderBottom: i < driverEarnings.length - 1 ? '1px solid #F1F5F9' : 'none', alignItems: 'center',
                    }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{d.driverName}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>{d.bookingId ? d.bookingId.slice(0, 8) + '...' : '—'}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#0F172A' }}>{formatMoney(d.grossAmount)}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#DC2626' }}>-{formatMoney(d.platformFee)}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#16A34A' }}>{formatMoney(d.driverEarning)}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>{new Date(d.createdAt).toLocaleDateString('en-MY', { dateStyle: 'medium' })}</span>
                    </div>
                  ))}
                  {deTotalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>{deTotal} total &middot; Page {dePage} of {deTotalPages}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button disabled={dePage <= 1} onClick={() => { setDePage(dePage - 1); fetchDriverEarnings(dePage - 1); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', fontFamily: 'Inter', fontSize: '12px', cursor: dePage <= 1 ? 'default' : 'pointer', opacity: dePage <= 1 ? 0.5 : 1 }}>Previous</button>
                        <button disabled={dePage >= deTotalPages} onClick={() => { setDePage(dePage + 1); fetchDriverEarnings(dePage + 1); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', fontFamily: 'Inter', fontSize: '12px', cursor: dePage >= deTotalPages ? 'default' : 'pointer', opacity: dePage >= deTotalPages ? 0.5 : 1 }}>Next</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Refunds Tab ──────────────────────── */}
              {activeTab === 'Refunds' && (
                <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr 0.8fr 1fr', padding: '16px 20px', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                    {['ORDER', 'CUSTOMER', 'REASON', 'AMOUNT', 'DATE'].map((h) => (
                      <span key={h} style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{h}</span>
                    ))}
                  </div>
                  {refunds.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8' }}>No refunds found</div>
                  ) : refunds.map((r, i) => (
                    <div key={r.id} style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr 0.8fr 1fr',
                      padding: '14px 20px', borderBottom: i < refunds.length - 1 ? '1px solid #F1F5F9' : 'none', alignItems: 'center',
                    }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{r.orderCode || r.bookingId?.slice(0, 8) || '—'}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#0F172A' }}>{r.customerName}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>{r.description}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#D97706' }}>{formatMoney(r.amount)}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>{new Date(r.createdAt).toLocaleDateString('en-MY', { dateStyle: 'medium' })}</span>
                    </div>
                  ))}
                  {rfTotalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>{rfTotal} total &middot; Page {rfPage} of {rfTotalPages}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button disabled={rfPage <= 1} onClick={() => { setRfPage(rfPage - 1); fetchRefunds(rfPage - 1); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', fontFamily: 'Inter', fontSize: '12px', cursor: rfPage <= 1 ? 'default' : 'pointer', opacity: rfPage <= 1 ? 0.5 : 1 }}>Previous</button>
                        <button disabled={rfPage >= rfTotalPages} onClick={() => { setRfPage(rfPage + 1); fetchRefunds(rfPage + 1); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#fff', fontFamily: 'Inter', fontSize: '12px', cursor: rfPage >= rfTotalPages ? 'default' : 'pointer', opacity: rfPage >= rfTotalPages ? 0.5 : 1 }}>Next</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Issues */}
              {issues && (
                <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '0', marginBottom: '24px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderBottom: '1px solid #EEF2F7', gap: '14px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#DC2626" strokeWidth="1.4"/><path d="M9 6v3M9 12v.5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Payment Issues</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#667085' }}>Payment health metrics</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                        Success Rate: <strong style={{ color: '#16A34A' }}>{issues.successRate}%</strong>
                      </span>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                        Refund Rate: <strong style={{ color: '#0F172A' }}>{issues.refundRate}%</strong>
                      </span>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                        Failed: <strong style={{ color: '#DC2626' }}>{issues.totalFailed}</strong>
                      </span>
                    </div>
                  </div>

                  {issues.failedByMethod.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(issues.failedByMethod.length, 3)}, 1fr)`, gap: '22px', padding: '24px' }}>
                      {issues.failedByMethod.map((f) => (
                        <div key={f.paymentMethod} style={{ borderRadius: '12px', background: '#FEF2F2', border: '1px solid #FECACA', padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.paymentMethod} Failures</span>
                            <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#DC2626', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{f.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#16A34A' }}>
                      No payment failures detected
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
