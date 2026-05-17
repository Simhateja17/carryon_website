'use client';

import { useCallback, useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { getAdminAnalyticsSnapshot } from '@/lib/api';
import { useAdminPolling } from '@/lib/useAdminPolling';
import {
  analyticsPeriods,
  emptyAnalyticsSnapshot,
  formatCurrency,
  formatMetricValue,
  formatNumber,
  formatTrend,
} from '@/lib/adminAnalytics';
import type { AdminAnalyticsSnapshot, AnalyticsPeriod } from '@/types';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";
const colors = {
  text: '#0F172A',
  muted: '#64748B',
  faint: '#94A3B8',
  border: '#E2E8F0',
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  amber: '#F59E0B',
};

const metricLabels: Array<{ key: keyof AdminAnalyticsSnapshot['metrics']; label: string }> = [
  { key: 'totalOrders', label: 'TOTAL ORDERS' },
  { key: 'totalRevenue', label: 'TOTAL REVENUE' },
  { key: 'activeDrivers', label: 'ACTIVE DRIVERS' },
  { key: 'avgDeliveryMinutes', label: 'AVG DELIVERY' },
  { key: 'cancelRatePct', label: 'CANCEL RATE' },
  { key: 'avgRating', label: 'AVG RATING' },
];

const breakdownColors: Record<string, string> = {
  DELIVERED: colors.blue,
  PENDING: colors.green,
  CANCELLED: colors.red,
};

function cardStyle(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: '#FFFFFF',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0px 1px 2px rgba(15,23,42,0.06)',
    border: '1px solid #F1F5F9',
    ...extra,
  };
}

function FilterBar({ period, setPeriod, lastUpdated, stale, loading, refresh }: {
  period: AnalyticsPeriod;
  setPeriod: (period: AnalyticsPeriod) => void;
  lastUpdated: Date | null;
  stale: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}) {
  return (
    <div style={cardStyle({ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', padding: '16px 20px' })}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 3 }}>
          {analyticsPeriods.map((item) => (
            <button key={item} type="button" onClick={() => setPeriod(item)} style={{
              padding: '7px 16px',
              borderRadius: 8,
              border: 'none',
              background: period === item ? '#FFFFFF' : 'transparent',
              fontFamily: inter,
              fontSize: 12,
              fontWeight: 800,
              color: period === item ? '#2563EB' : colors.muted,
              cursor: 'pointer',
              textTransform: 'capitalize',
              boxShadow: period === item ? '0 1px 2px rgba(15,23,42,0.08)' : 'none',
            }}>{item}</button>
          ))}
        </div>
        <span style={{ fontFamily: inter, fontSize: 12, fontWeight: 600, color: stale ? colors.amber : colors.faint }}>
          {loading ? 'Loading live analytics...' : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Live analytics'}
        </span>
      </div>
      <button type="button" onClick={() => void refresh()} style={{
        padding: '9px 16px',
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        background: '#FFFFFF',
        fontFamily: inter,
        fontSize: 11,
        fontWeight: 800,
        color: '#374151',
        cursor: 'pointer',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      }}>Refresh data</button>
    </div>
  );
}

function StatsCards({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 16 }}>
      {metricLabels.map(({ key, label }) => {
        const metric = snapshot.metrics[key];
        const trend = formatTrend(metric);
        return (
          <div key={key} style={cardStyle({ padding: 16 })}>
            <div style={{ fontFamily: inter, fontSize: 10, fontWeight: 800, color: colors.faint, letterSpacing: 0.8, marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: manrope, fontSize: 26, fontWeight: 900, color: colors.text, lineHeight: '30px', marginBottom: 8 }}>
              {formatMetricValue(key, metric.value)}
            </div>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <span style={{ fontFamily: inter, fontSize: 11, fontWeight: 800, color: trend.favorable ? colors.green : colors.red }}>{trend.text}</span>
              <span style={{ fontFamily: inter, fontSize: 10, fontWeight: 600, color: colors.faint }}>{trend.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrendChart({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  const maxOrders = Math.max(...snapshot.trend.map((point) => point.orders), 1);
  const maxRevenue = Math.max(...snapshot.trend.map((point) => point.revenue), 1);
  return (
    <div style={cardStyle({ flex: 1, minHeight: 360 })}>
      <SectionTitle title="Orders & Revenue Trend" subtitle="Real bookings and non-cancelled gross revenue by operations day" />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 240, padding: '24px 8px 4px' }}>
        {snapshot.trend.map((point) => (
          <div key={point.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 180 }} title={`${point.orders} orders, ${formatCurrency(point.revenue)}`}>
              <div style={{ width: 15, minHeight: 2, height: `${(point.orders / maxOrders) * 170}px`, background: colors.blue, borderRadius: '4px 4px 0 0' }} />
              <div style={{ width: 15, minHeight: 2, height: `${(point.revenue / maxRevenue) * 170}px`, background: '#E2E8F0', borderRadius: '4px 4px 0 0' }} />
            </div>
            <span style={{ fontFamily: inter, fontSize: 10, fontWeight: 700, color: colors.faint, whiteSpace: 'nowrap' }}>{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsPanel({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  const styleBySeverity = {
    critical: { bg: '#FEF2F2', color: colors.red },
    warning: { bg: '#FFFBEB', color: colors.amber },
    info: { bg: '#EFF6FF', color: colors.blue },
    success: { bg: '#ECFDF5', color: colors.green },
  } as const;
  return (
    <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={cardStyle()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontFamily: manrope, fontSize: 14, fontWeight: 900, color: colors.blue }}>AI Smart Insights</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {snapshot.insights.map((insight) => {
            const tone = styleBySeverity[insight.severity];
            return (
              <div key={insight.title} style={{ padding: 14, borderRadius: 12, background: tone.bg }}>
                <div style={{ fontFamily: inter, fontSize: 12, fontWeight: 900, color: colors.text, marginBottom: 6 }}>{insight.title}</div>
                <p style={{ margin: 0, fontFamily: inter, fontSize: 11, fontWeight: 600, color: colors.muted, lineHeight: '17px' }}>{insight.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div style={cardStyle({ padding: '16px 20px' })}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: manrope, fontSize: 11, fontWeight: 900, color: colors.faint, letterSpacing: 1, textTransform: 'uppercase' }}>Supply vs Demand</span>
          <span style={{ background: '#DBEAFE', borderRadius: 5, padding: '2px 8px', fontFamily: inter, fontSize: 9, fontWeight: 900, color: colors.blue }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 46 }}>
          {snapshot.supplyDemand.map((point) => (
            <div key={point.label} title={`${point.demand} orders / ${point.supply} drivers`} style={{ flex: 1, height: `${Math.max(4, point.ratio * 44)}px`, background: colors.blue, borderRadius: '3px 3px 0 0' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: manrope, fontSize: 16, fontWeight: 900, color: colors.text }}>{title}</div>
      {subtitle && <div style={{ fontFamily: inter, fontSize: 12, fontWeight: 600, color: colors.faint, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

function OrderStatusMatrix({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  const total = snapshot.orderBreakdown.reduce((sum, item) => sum + item.count, 0);
  const circumference = 2 * Math.PI * 58;
  const segments = snapshot.orderBreakdown.reduce<Array<{ label: string; pct: number; dash: string; offset: number }>>((acc, item) => {
    const priorLength = acc.reduce((sum, segment) => sum + (segment.pct / 100) * circumference, 0);
    const length = (item.pct / 100) * circumference;
    return [...acc, { label: item.label, pct: item.pct, dash: `${length} ${circumference}`, offset: -priorLength }];
  }, []);
  return (
    <div style={cardStyle({ flex: 1 })}>
      <SectionTitle title="Order Status Matrix" subtitle="Distribution from real booking states" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: 170, height: 170 }}>
          <svg width="170" height="170" viewBox="0 0 170 170">
            <circle cx="85" cy="85" r="58" fill="none" stroke="#F1F5F9" strokeWidth="14" />
            {segments.map((segment) => (
              <circle key={segment.label} cx="85" cy="85" r="58" fill="none" stroke={breakdownColors[segment.label] || colors.faint} strokeWidth="14" strokeDasharray={segment.dash} strokeDashoffset={segment.offset} strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '85px 85px' }} />
            ))}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
            <div><div style={{ fontFamily: inter, fontSize: 10, fontWeight: 800, color: colors.faint }}>TOTAL</div><div style={{ fontFamily: manrope, fontSize: 24, fontWeight: 900, color: colors.text }}>{formatNumber(total)}</div></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {snapshot.orderBreakdown.map((item) => (
            <div key={item.label} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ width: 12, height: 12, borderRadius: 999, background: breakdownColors[item.label] || colors.faint }} />
              <span style={{ fontFamily: inter, fontSize: 13, fontWeight: 800, color: colors.text }}>{item.label} ({item.pct.toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ZoneDensity({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  return (
    <div style={cardStyle({ flex: 1.5, background: '#0F172A', position: 'relative', overflow: 'hidden', border: 'none' })}>
      <div style={{ position: 'absolute', inset: '-60px 20% auto', height: 210, background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: manrope, fontSize: 16, fontWeight: 900, color: '#FFFFFF' }}>Zone Order Density</div>
        <div style={{ fontFamily: inter, fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 54 }}>Top delivery address clusters in the selected window</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
          {(snapshot.zones.length ? snapshot.zones : [{ name: 'NO ACTIVITY', value: 0, status: 'Stable', intensity: 0 }]).map((zone) => (
            <div key={zone.name} style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: 14 }}>
              <div style={{ fontFamily: inter, fontSize: 9, fontWeight: 900, color: colors.muted, letterSpacing: 0.5, marginBottom: 5 }}>{zone.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                <span style={{ fontFamily: manrope, fontSize: 20, fontWeight: 900, color: colors.blue }}>{formatNumber(zone.value)}</span>
                <span style={{ fontFamily: inter, fontSize: 10, fontWeight: 800, color: zone.status === 'Hot' ? colors.blue : colors.green }}>{zone.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DriverPerformance({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  return (
    <div style={cardStyle({ marginBottom: 16 })}>
      <SectionTitle title="Driver Performance Matrix" subtitle="Top drivers, calculated from current bookings plus live driver profile state" />
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 820 }}>
          <TableRow header cells={['DRIVER IDENTITY', 'FLEET CLASS', 'ACCEPTANCE', 'CANCEL RATE', 'ON-TIME %', 'RATING', 'STATUS']} />
          {snapshot.driverPerformance.map((driver) => (
            <TableRow key={driver.id} cells={[
              driver.name,
              driver.fleet,
              `${driver.acceptancePct.toFixed(1)}%`,
              `${driver.cancelRatePct.toFixed(1)}%`,
              `${driver.onTimePct.toFixed(1)}%`,
              driver.rating ? driver.rating.toFixed(1) : '0.0',
              driver.status,
            ]} />
          ))}
          {!snapshot.driverPerformance.length && <div style={{ padding: 16, fontFamily: inter, fontSize: 13, color: colors.muted }}>No driver activity in this window.</div>}
        </div>
      </div>
    </div>
  );
}

function TableRow({ cells, header = false }: { cells: string[]; header?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr', gap: 12, alignItems: 'center', padding: header ? '10px 0' : '13px 0', borderBottom: '1px solid #F1F5F9' }}>
      {cells.map((cell, index) => (
        <span key={`${cell}-${index}`} style={{ fontFamily: inter, fontSize: header ? 9 : 12, fontWeight: header ? 900 : 750, color: header ? colors.faint : colors.text, letterSpacing: header ? 0.8 : 0, textTransform: header ? 'uppercase' : 'none' }}>{cell}</span>
      ))}
    </div>
  );
}

function ProfitabilityAudit({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  const rows = [
    { label: 'Avg. Commission', value: formatCurrency(snapshot.profitability.avgCommission) },
    { label: 'Discount Impact', value: `-${formatCurrency(snapshot.profitability.discountImpact)}` },
    { label: 'Refund Ratio', value: `${snapshot.profitability.refundRatioPct.toFixed(2)}%` },
  ];
  return (
    <div style={cardStyle({ flex: 0.7 })}>
      <SectionTitle title="Profitability Audit" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontFamily: inter, fontSize: 12, fontWeight: 700, color: colors.muted }}>{row.label}</span>
            <span style={{ fontFamily: manrope, fontSize: 16, fontWeight: 900, color: row.label === 'Discount Impact' ? colors.red : colors.text }}>{row.value}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid #F1F5F9' }}>
        <div style={{ fontFamily: manrope, fontSize: 28, fontWeight: 900, color: colors.blue }}>{snapshot.profitability.netProfitMarginPct.toFixed(1)}%</div>
        <div style={{ fontFamily: inter, fontSize: 11, fontWeight: 700, color: colors.faint }}>Net Profit Margin</div>
      </div>
    </div>
  );
}

function OperationalLog({ snapshot }: { snapshot: AdminAnalyticsSnapshot }) {
  return (
    <div style={cardStyle({ flex: 1 })}>
      <SectionTitle title="Operational Log" subtitle="Past 72 hours from real bookings" />
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 620 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1fr', gap: 12, padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
            {['DATE INDEX', 'VOLUME', 'GROSS REV', 'RESOURCES', 'AVG TAT'].map((head) => <span key={head} style={{ fontFamily: inter, fontSize: 9, fontWeight: 900, color: colors.faint, letterSpacing: 1 }}>{head}</span>)}
          </div>
          {snapshot.operationalLog.map((row) => (
            <div key={row.date} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1fr', gap: 12, padding: '13px 0', borderBottom: '1px solid #F8FAFC' }}>
              <span style={cellStyle()}>{row.date}</span>
              <span style={cellStyle(true)}>{formatNumber(row.volume)}</span>
              <span style={cellStyle(true)}>{formatCurrency(row.grossRevenue)}</span>
              <span style={cellStyle()}>{formatNumber(row.resources)} drivers</span>
              <span style={cellStyle(true, colors.blue)}>{Math.round(row.avgTatMinutes)}m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cellStyle(bold = false, color = colors.text): React.CSSProperties {
  return { fontFamily: inter, fontSize: 12, fontWeight: bold ? 850 : 650, color };
}

export default function ReportsAnalyticsPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('today');
  const loader = useCallback(() => getAdminAnalyticsSnapshot(period), [period]);
  const state = useAdminPolling<AdminAnalyticsSnapshot>(loader, { intervalMs: 30_000 });
  const snapshot = useMemo(() => state.data ?? emptyAnalyticsSnapshot(period), [state.data, period]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', background: '#F6F8FA', boxSizing: 'border-box' }}>
          {state.error && <div style={{ ...cardStyle({ marginBottom: 16, borderColor: '#FCA5A5', color: colors.red, fontFamily: inter, fontWeight: 800 }) }}>{state.error}</div>}
          <FilterBar period={period} setPeriod={setPeriod} lastUpdated={state.lastUpdated} stale={state.stale} loading={state.loading} refresh={state.refresh} />
          <StatsCards snapshot={snapshot} />
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'stretch', flexWrap: 'wrap' }}>
            <TrendChart snapshot={snapshot} />
            <InsightsPanel snapshot={snapshot} />
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            <OrderStatusMatrix snapshot={snapshot} />
            <ZoneDensity snapshot={snapshot} />
          </div>
          <DriverPerformance snapshot={snapshot} />
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <ProfitabilityAudit snapshot={snapshot} />
            <OperationalLog snapshot={snapshot} />
          </div>
        </main>
      </div>
    </div>
  );
}
