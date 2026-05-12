export type DatasetKey = 'A' | 'B' | 'C' | 'D';

export type MetricDirection = 'higher_is_better' | 'lower_is_better';

export type MetricKey =
  | 'traffic'
  | 'leads_created'
  | 'leads_qualified'
  | 'deals_created'
  | 'deals_won'
  | 'deals_lost'
  | 'avg_response_time_min'
  | 'avg_deal_cycle_days'
  | 'stale_deals'
  | 'support_tickets_opened'
  | 'support_avg_resolution_hours';

export interface MetricMeta {
  key: MetricKey;
  label: string;
  unit: string;
  direction: MetricDirection;
  description: string;
}

export interface DayRecord {
  date: string;
  metrics: Record<MetricKey, number | null>;
}

export interface RawDataset {
  metadata: {
    start_date: string;
    end_date: string;
    days: number;
    metrics: MetricMeta[];
  };
  days: DayRecord[];
}

export interface NormalizedDataset {
  key: DatasetKey;
  metaByKey: Record<MetricKey, MetricMeta>;
  days: DayRecord[];
  startDate: string;
  endDate: string;
}

export type TrendDirection = 'improving' | 'deteriorating' | 'stable';

export interface MetricTrend {
  key: MetricKey;
  label: string;
  unit: string;
  direction: MetricDirection;
  trend: TrendDirection;
  latestValue: number | null;
  previousValue: number | null;
  weekOverWeekDelta: number | null;
  weekOverWeekPercent: number | null;
}

export interface FunnelStage {
  label: string;
  value: number;
  conversionRate: number | null;
  barWidthPercent: number;
}

export interface ExecutiveSummary {
  date: string;
  headline: string;
  highlights: string[];
  alerts: string[];
  winRate: number | null;
  leadToQualifiedRate: number | null;
  qualifiedToDealRate: number | null;
  overallConversionRate: number | null;
  funnelStages: FunnelStage[];
  metricTrends: MetricTrend[];
}

export interface DashboardViewModel {
  datasetKey: DatasetKey;
  summary: ExecutiveSummary;
  latestDay: DayRecord;
  trends: MetricTrend[];
  days: DayRecord[];
}
