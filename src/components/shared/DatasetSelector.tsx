import type { DatasetKey } from '@/domain/metrics/types';
import { DATASET_KEYS } from '@/data/loadDataset';
import { useDashboardStore } from '@/stores/dashboardStore';
import clsx from 'clsx';

export function DatasetSelector() {
  const selected = useDashboardStore((s) => s.selectedDataset);
  const setDataset = useDashboardStore((s) => s.setDataset);

  return (
    <div className="flex gap-2">
      {DATASET_KEYS.map((key: DatasetKey) => (
        <button
          key={key}
          onClick={() => setDataset(key)}
          className={clsx(
            'px-4 py-1.5 rounded text-sm font-medium transition-colors',
            selected === key
              ? 'bg-bg-overlay text-text-inverted'
              : 'bg-border-subtle text-text-secondary hover:bg-border-default'
          )}
        >
          Dataset {key}
        </button>
      ))}
    </div>
  );
}
