import type { AdminAnalyticsSnapshot, AnalyticsMetric } from '@/types';

export const analyticsPeriods = ['today', 'weekly', 'monthly'] as const;

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatCurrency(value: number) {
  if (Math.abs(value) >= 1000) return `RM ${(value / 1000).toFixed(1)}k`;
  return `RM ${value.toFixed(2)}`;
}

export function formatMetricValue(key: keyof AdminAnalyticsSnapshot['metrics'], value: number) {
  if (key === 'totalRevenue') return formatCurrency(value);
  if (key === 'avgDeliveryMinutes') return `${Math.round(value)}m`;
  if (key === 'cancelRatePct') return `${value.toFixed(1)}%`;
  if (key === 'avgRating') return value ? value.toFixed(1) : '0.0';
  return formatNumber(value);
}

export function formatTrend(metric: AnalyticsMetric) {
  if (metric.changePct == null) return { text: 'Live', label: 'current', favorable: metric.favorable };
  const sign = metric.changePct > 0 ? '+' : '';
  return {
    text: `${sign}${metric.changePct.toFixed(1)}%`,
    label: 'vs previous period',
    favorable: metric.favorable,
  };
}

export function emptyAnalyticsSnapshot(period: AdminAnalyticsSnapshot['period'] = 'today'): AdminAnalyticsSnapshot {
  const metric = (direction: 'higher' | 'lower' = 'higher') => ({ value: 0, previous: 0, changePct: 0, direction, favorable: true });
  return {
    generatedAt: new Date(0).toISOString(),
    timezone: 'Asia/Kuala_Lumpur',
    period,
    window: { start: new Date(0).toISOString(), end: new Date(0).toISOString() },
    metrics: {
      totalOrders: metric(),
      totalRevenue: metric(),
      activeDrivers: { value: 0, previous: null, changePct: null, direction: 'higher', favorable: true },
      avgDeliveryMinutes: metric('lower'),
      cancelRatePct: metric('lower'),
      avgRating: metric(),
    },
    trend: [],
    orderAnalytics: [],
    orderBreakdown: [],
    zones: [],
    driverPerformance: [],
    profitability: { avgCommission: 0, discountImpact: 0, refundRatioPct: 0, netProfitMarginPct: 0 },
    operationalLog: [],
    supplyDemand: [],
    insights: [],
  };
}
