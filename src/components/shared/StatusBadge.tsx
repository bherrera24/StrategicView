import type { TrendDirection } from '@/domain/metrics/types';
import clsx from 'clsx';

const TREND_DISPLAY = {
  improving:    { label: '↑ Improving',    className: 'bg-status-success/15 text-status-success' },
  deteriorating:{ label: '↓ Deteriorating',className: 'bg-status-error/15 text-status-error'   },
  stable:       { label: '→ Stable',       className: 'bg-border-subtle text-text-tertiary'      },
} as const;

interface StatusBadgeProps {
  trend: TrendDirection;
}

export function StatusBadge({ trend }: StatusBadgeProps) {
  const { label, className } = TREND_DISPLAY[trend];
  return (
    <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', className)}>
      {label}
    </span>
  );
}
