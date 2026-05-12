import type { DayRecord, ExecutiveSummary, MetricKey, MetricTrend, NormalizedDataset, TrendDirection } from '../types';
import { calculateConversionRate } from '../calculators/calculateConversionRate';
import { calculateFunnel } from '../calculators/calculateFunnel';
import { calculateWinRate } from '../calculators/calculateWinRate';
import { analyzeMetricTrend } from './analyzeMetricTrend';

const TREND_DETERIORATING: TrendDirection = 'deteriorating';
const TREND_IMPROVING: TrendDirection = 'improving';
const METRIC_TRAFFIC: MetricKey = 'traffic';
const METRIC_LEADS_CREATED: MetricKey = 'leads_created';
const METRIC_LEADS_QUALIFIED: MetricKey = 'leads_qualified';
const METRIC_DEALS_CREATED: MetricKey = 'deals_created';
const METRIC_DEALS_WON: MetricKey = 'deals_won';

export function buildExecutiveSummary(
  dataset: NormalizedDataset,
  days: DayRecord[],
  trendDays?: DayRecord[]
): ExecutiveSummary {
  if (days.length === 0) {
    return {
      date: '',
      headline: 'No data for the selected period.',
      highlights: [],
      alerts: [],
      winRate: null,
      leadToQualifiedRate: null,
      qualifiedToDealRate: null,
      overallConversionRate: null,
      funnelStages: [],
      metricTrends: [],
    };
  }

  const latestDay = days.at(-1)!;
  const metricKeys = Object.keys(dataset.metaByKey) as Array<keyof typeof dataset.metaByKey>;
  const activeTrendDays = trendDays ?? days;

  const trends: MetricTrend[] = metricKeys.map((key) => {
    const meta = dataset.metaByKey[key];
    return analyzeMetricTrend(activeTrendDays, key, meta.label, meta.unit, meta.direction);
  });

  const alerts = trends
    .filter((t) => t.trend === TREND_DETERIORATING)
    .map((t) => `${t.label} is deteriorating — review needed`);

  const highlights = trends
    .filter((t) => t.trend === TREND_IMPROVING)
    .map((t) => `${t.label} improving week-over-week`);

  return {
    date: latestDay.date,
    headline: buildHeadline(alerts.length),
    highlights,
    alerts,
    winRate: calculateWinRate(days),
    leadToQualifiedRate: calculateConversionRate(days, METRIC_LEADS_CREATED, METRIC_LEADS_QUALIFIED),
    qualifiedToDealRate: calculateConversionRate(days, METRIC_LEADS_QUALIFIED, METRIC_DEALS_CREATED),
    overallConversionRate: calculateConversionRate(days, METRIC_TRAFFIC, METRIC_DEALS_WON),
    funnelStages: calculateFunnel(days),
    metricTrends: trends,
  };
}

function buildHeadline(alertCount: number): string {
  if (alertCount === 0) return 'All key metrics are stable or improving.';
  const subject = alertCount === 1 ? 'metric requires' : 'metrics require';
  return `${alertCount} ${subject} attention today.`;
}
