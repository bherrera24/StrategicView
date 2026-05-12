import clsx from 'clsx';
import type { FunnelStage } from '@/domain/metrics/types';
import { formatNumber, formatPercent } from '@/utils/formatters';

const STAGE_LABEL_TRAFFIC = 'Traffic';
const STAGE_LABEL_WON = 'Won';

interface FunnelChartProps {
  stages: FunnelStage[];
  periodLabel: string;
  overallConversionRate: number | null;
}

export function FunnelChart({ stages, periodLabel, overallConversionRate }: FunnelChartProps) {
  if (stages.length === 0) return null;

  const traffic = stages.find((s) => s.label === STAGE_LABEL_TRAFFIC);
  const won = stages.find((s) => s.label === STAGE_LABEL_WON);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-tertiary">Sales Funnel</h3>
        <span className="text-xs text-text-tertiary">{periodLabel}</span>
      </div>

      <div className="flex gap-6 mb-4 pb-4 border-b border-border-subtle">
        {traffic && (
          <Total label="Total visits" value={formatNumber(traffic.value)} />
        )}
        {won && (
          <Total label="Deals won" value={formatNumber(won.value)} highlight />
        )}
        {overallConversionRate !== null && (
          <Total label="Visitor → Close" value={formatPercent(overallConversionRate)} />
        )}
      </div>

      <div className="flex flex-col gap-3">
        {stages.map((stage, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span className="text-text-tertiary">{stage.label}</span>
              <span className="flex items-center gap-3">
                <span className="font-semibold text-text-primary">{formatNumber(stage.value)}</span>
                {stage.conversionRate !== null && (
                  <span className="text-text-tertiary w-24 text-right">
                    {formatPercent(stage.conversionRate)} from prev
                  </span>
                )}
              </span>
            </div>
            <div className="h-2 bg-border-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-action-secondary rounded-full transition-all duration-300"
                style={{ width: `${stage.barWidthPercent * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Total({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-text-tertiary">{label}</span>
      <span className={clsx('text-lg font-semibold', highlight ? 'text-text-primary' : 'text-text-secondary')}>
        {value}
      </span>
    </div>
  );
}
