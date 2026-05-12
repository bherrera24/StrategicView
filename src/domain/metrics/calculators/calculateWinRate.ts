import type { DayRecord } from '../types';

export function calculateWinRate(days: DayRecord[]): number | null {
  const totalWon = days.reduce((sum, d) => sum + (d.metrics.deals_won ?? 0), 0);
  const totalLost = days.reduce((sum, d) => sum + (d.metrics.deals_lost ?? 0), 0);
  const total = totalWon + totalLost;
  return total === 0 ? null : totalWon / total;
}
