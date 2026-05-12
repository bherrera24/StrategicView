import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore, PERIOD_LABELS } from '@/stores/dashboardStore';
import { DatasetSelector } from '../shared/DatasetSelector';
import { PeriodSelector } from '../shared/PeriodSelector';
import { ExecutiveSummary } from '../summary/ExecutiveSummary';
import { FunnelChart } from '../charts/FunnelChart';
import { MetricCard } from '../shared/MetricCard';

export function Dashboard() {
  const { summary, trends, days } = useDashboardData();
  const period = useDashboardStore((s) => s.period);
  const periodLabel = PERIOD_LABELS[period];

  return (
    <div className="min-h-screen bg-bg-app p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-text-primary">StrategicView</h1>
          <PeriodSelector />
          <DatasetSelector />
        </header>

        <ExecutiveSummary summary={summary} periodLabel={periodLabel} dayCount={days.length} />

        {days.length === 0 ? (
          <div className="text-center text-text-tertiary py-16 text-sm">
            No data for the selected period.
          </div>
        ) : (
          <>
            <FunnelChart stages={summary.funnelStages} periodLabel={periodLabel} overallConversionRate={summary.overallConversionRate} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {trends.map((metric) => (
                <MetricCard key={metric.key} metric={metric} days={days} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
