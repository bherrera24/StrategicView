import type { DayRecord, MetricKey } from '../types';

const WOW_WEEK_LENGTH = 7;
const WOW_MIN_DAYS_REQUIRED = WOW_WEEK_LENGTH * 2;

export interface WeekOverWeekResult {
  current: number;
  previous: number;
  delta: number;
  percent: number;
}

export function calculateWeekOverWeek(
  days: DayRecord[],
  key: MetricKey
): WeekOverWeekResult | null {
  if (days.length < WOW_MIN_DAYS_REQUIRED) return null;

  const last7 = days.slice(-WOW_WEEK_LENGTH);
  const prev7 = days.slice(-WOW_MIN_DAYS_REQUIRED, -WOW_WEEK_LENGTH);

  const current = avg(last7, key);
  const previous = avg(prev7, key);

  if (current === null || previous === null) return null;

  const delta = current - previous;
  const percent = previous === 0 ? 0 : delta / previous;

  return { current, previous, delta, percent };
}

function avg(days: DayRecord[], key: MetricKey): number | null {
  const values = days.map((d) => d.metrics[key]).filter((v): v is number => v !== null);
  return values.length === 0 ? null : values.reduce((a, b) => a + b, 0) / values.length;
}
