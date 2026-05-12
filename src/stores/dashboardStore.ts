import { create } from 'zustand';
import type { DatasetKey } from '../domain/metrics/types';

export type Period = '7d' | '30d' | '90d' | 'all';

const DEFAULT_DATASET = 'A' as const;
const DEFAULT_PERIOD = '30d' as const;

export const PERIOD_LABELS: Record<Period, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  'all': 'Full year',
};

interface DashboardState {
  selectedDataset: DatasetKey;
  period: Period;
  setDataset: (key: DatasetKey) => void;
  setPeriod: (period: Period) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedDataset: DEFAULT_DATASET,
  period: DEFAULT_PERIOD,
  setDataset: (key) => set({ selectedDataset: key }),
  setPeriod: (period) => set({ period }),
}));
