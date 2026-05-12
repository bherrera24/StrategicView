import type { ExecutiveSummary as ExecutiveSummaryType } from '@/domain/metrics/types';
import { formatDate, formatPercent } from '@/utils/formatters';

interface ExecutiveSummaryProps {
  summary: ExecutiveSummaryType;
  periodLabel: string;
  dayCount: number;
}

export function ExecutiveSummary({ summary, periodLabel, dayCount }: ExecutiveSummaryProps) {
  const dateLabel = summary.date ? `through ${formatDate(summary.date)}` : '';
  const dayCountLabel = dayCount > 0 ? `${dateLabel ? ' · ' : ''}${dayCount}d` : '';

  return (
    <div className="bg-bg-overlay text-text-inverted rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold leading-snug">{summary.headline}</h2>
        <div className="text-right shrink-0">
          <div className="text-sm font-medium text-text-inverted">{periodLabel}</div>
          <div className="text-xs text-text-inverted/50">{dateLabel}{dayCountLabel}</div>
        </div>
      </div>

      <div className="flex gap-6 border-t border-text-inverted/20 pt-4">
        <KPI label="Win Rate" value={formatPercent(summary.winRate)} />
        <KPI label="Lead → Qualified" value={formatPercent(summary.leadToQualifiedRate)} />
        <KPI label="Qualified → Deal" value={formatPercent(summary.qualifiedToDealRate)} />
      </div>

      {summary.alerts.length > 0 && (
        <ul className="flex flex-col gap-1 border-t border-text-inverted/20 pt-4">
          {summary.alerts.map((alert, i) => (
            <li key={i} className="text-sm text-status-error flex items-center gap-2">
              <span>⚠</span> {alert}
            </li>
          ))}
        </ul>
      )}

      {summary.highlights.length > 0 && (
        <ul className="flex flex-col gap-1">
          {summary.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-status-success flex items-center gap-2">
              <span>✓</span> {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-text-inverted/50">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}
