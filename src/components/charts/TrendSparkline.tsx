import { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import type { DayRecord, MetricKey, TrendDirection } from '@/domain/metrics/types';
import { cssVar } from '@/utils/cssTokens';

const SPARKLINE_CONFIG = {
  HEIGHT: 40,
  STROKE_WIDTH: 1.5,
  TOOLTIP_FONT_SIZE: 11,
} as const;

interface TrendSparklineProps {
  days: DayRecord[];
  metricKey: MetricKey;
  trend: TrendDirection;
}

const trendColor: Record<TrendDirection, string> = {
  improving:     cssVar('--rgb-success'),
  deteriorating: cssVar('--rgb-error'),
  stable:        cssVar('--rgb-neutral-400'),
};

export function TrendSparkline({ days, metricKey, trend }: TrendSparklineProps) {
  const data = useMemo(
    () => days.map((d) => ({ value: d.metrics[metricKey] })),
    [days, metricKey]
  );

  return (
    <ResponsiveContainer width="100%" height={SPARKLINE_CONFIG.HEIGHT}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={trendColor[trend]}
          strokeWidth={SPARKLINE_CONFIG.STROKE_WIDTH}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          contentStyle={{ fontSize: SPARKLINE_CONFIG.TOOLTIP_FONT_SIZE }}
          formatter={(v) => [v ?? '', '']}
          labelFormatter={() => ''}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
