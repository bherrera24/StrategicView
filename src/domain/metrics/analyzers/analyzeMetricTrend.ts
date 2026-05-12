import type { DayRecord, MetricDirection, MetricKey, MetricTrend, TrendDirection } from '../types';
import { calculateWeekOverWeek } from '../calculators/calculateWeekOverWeek';

const TREND_CHANGE_THRESHOLD = 0.05;
const TREND_STABLE: TrendDirection = 'stable';
const TREND_IMPROVING: TrendDirection = 'improving';
const TREND_DETERIORATING: TrendDirection = 'deteriorating';
const DIRECTION_HIGHER_IS_BETTER: MetricDirection = 'higher_is_better';

export function analyzeMetricTrend(
  days: DayRecord[],
  key: MetricKey,
  label: string,
  unit: string,
  direction: MetricDirection
): MetricTrend {
  const wow = calculateWeekOverWeek(days, key);
  const latestValue = days.at(-1)?.metrics[key] ?? null;
  const previousValue = days.at(-2)?.metrics[key] ?? null;

  let trend: TrendDirection = TREND_STABLE;

  if (wow !== null && Math.abs(wow.percent) > TREND_CHANGE_THRESHOLD) {
    const isIncreasing = wow.delta > 0;
    const isImprovement = direction === DIRECTION_HIGHER_IS_BETTER ? isIncreasing : !isIncreasing;
    trend = isImprovement ? TREND_IMPROVING : TREND_DETERIORATING;
  }

  return {
    key,
    label,
    unit,
    direction,
    trend,
    latestValue,
    previousValue,
    weekOverWeekDelta: wow?.delta ?? null,
    weekOverWeekPercent: wow?.percent ?? null,
  };
}
