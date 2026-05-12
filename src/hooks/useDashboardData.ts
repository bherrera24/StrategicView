import { useMemo } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';
import { selectDashboardViewModel } from '../domain/metrics/selectors/selectViewModels';
import { loadDataset } from '../data/loadDataset';
import { adaptDataset } from '../domain/metrics/adapters/datasetAdapter';
import type { DashboardViewModel } from '../domain/metrics/types';

const PERIOD_DAYS: Record<string, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  'all': Infinity,
};

export function useDashboardData(): DashboardViewModel {
  const selectedDataset = useDashboardStore((s) => s.selectedDataset);
  const period = useDashboardStore((s) => s.period);

  return useMemo(() => {
    const raw = loadDataset(selectedDataset);
    const dataset = adaptDataset(selectedDataset, raw);
    const n = PERIOD_DAYS[period];
    const days = isFinite(n) ? dataset.days.slice(-n) : dataset.days;
    return selectDashboardViewModel(selectedDataset, dataset, days);
  }, [selectedDataset, period]);
}
