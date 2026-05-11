export const ADMIN_CURRENCY = 'MYR';
export const ADMIN_DISTANCE_UNIT = 'km';

const moneyFormatter = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: ADMIN_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(value: number) {
  return moneyFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatDistanceKm(value: number, fractionDigits = 1) {
  const safe = Number.isFinite(value) ? value : 0;
  return `${safe.toFixed(fractionDigits)} ${ADMIN_DISTANCE_UNIT}`;
}

export function formatMetersAsKm(value: number | null | undefined, fractionDigits = 1) {
  if (value == null || !Number.isFinite(value)) return `0 ${ADMIN_DISTANCE_UNIT}`;
  return formatDistanceKm(value / 1000, fractionDigits);
}
