const LOCALE = 'en-US';
const DECIMALS = 1;
const DATE_FORMAT: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

export function formatNumber(value: number | null, unit?: string): string {
  if (value === null) return '—';
  const formatted = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: DECIMALS }).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatPercent(value: number | null): string {
  if (value === null) return '—';
  return `${(value * 100).toFixed(DECIMALS)}%`;
}

export function formatDelta(value: number | null): string {
  if (value === null) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(DECIMALS)}%`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(LOCALE, DATE_FORMAT);
}
