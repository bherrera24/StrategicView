import type { DatasetKey, DayRecord, DashboardViewModel, NormalizedDataset } from '../types';
import { buildExecutiveSummary } from '../analyzers/buildExecutiveSummary';

export function selectDashboardViewModel(
  datasetKey: DatasetKey,
  dataset: NormalizedDataset,
  days?: DayRecord[]
): DashboardViewModel {
  const activeDays = days ?? dataset.days;

  const summary = buildExecutiveSummary(dataset, activeDays, dataset.days);
  const latestDay = activeDays.at(-1) ?? { date: '', metrics: {} as DayRecord['metrics'] };

  return {
    datasetKey,
    summary,
    latestDay,
    trends: summary.metricTrends,
    days: activeDays,
  };
}
