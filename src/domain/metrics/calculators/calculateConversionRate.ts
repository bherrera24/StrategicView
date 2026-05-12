import type { DayRecord } from '../types';

export function calculateConversionRate(
  days: DayRecord[],
  fromKey: keyof DayRecord['metrics'],
  toKey: keyof DayRecord['metrics']
): number | null {
  const from = days.reduce((sum, d) => sum + (d.metrics[fromKey] ?? 0), 0);
  const to = days.reduce((sum, d) => sum + (d.metrics[toKey] ?? 0), 0);
  return from === 0 ? null : to / from;
}
