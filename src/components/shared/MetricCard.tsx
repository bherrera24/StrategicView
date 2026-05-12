import type { DayRecord, MetricTrend } from '@/domain/metrics/types';
import { StatusBadge } from './StatusBadge';
import { TrendSparkline } from '../charts/TrendSparkline';
import { formatNumber, formatDelta } from '@/utils/formatters';

interface MetricCardProps {
  metric: MetricTrend;
  days: DayRecord[];
}

export function MetricCard({ metric, days }: MetricCardProps) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-text-tertiary">{metric.label}</span>
        <StatusBadge trend={metric.trend} />
      </div>
      <span className="text-2xl font-semibold text-text-primary">
        {formatNumber(metric.latestValue, metric.unit)}
      </span>
      {metric.weekOverWeekPercent !== null && (
        <span className="text-xs text-text-tertiary">
          {formatDelta(metric.weekOverWeekPercent)} WoW
        </span>
      )}
      <TrendSparkline days={days} metricKey={metric.key} trend={metric.trend} />
    </div>
  );
}
