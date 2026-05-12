import clsx from 'clsx';
import { useDashboardStore, PERIOD_LABELS, type Period } from '@/stores/dashboardStore';

const PERIODS: Period[] = ['7d', '30d', '90d', 'all'];

export function PeriodSelector() {
  const period = useDashboardStore((s) => s.period);
  const setPeriod = useDashboardStore((s) => s.setPeriod);

  return (
    <div className="flex gap-1 bg-border-subtle rounded-lg p-1">
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => setPeriod(p)}
          className={clsx(
            'px-3 py-1 rounded-md text-xs font-medium transition-colors',
            period === p
              ? 'bg-bg-surface text-text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          {PERIOD_LABELS[p]}
        </button>
      ))}
    </div>
  );
}
