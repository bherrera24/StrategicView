import type { DatasetKey, MetricKey, MetricMeta, NormalizedDataset, RawDataset } from '../types';

export function adaptDataset(key: DatasetKey, raw: RawDataset): NormalizedDataset {
  const metaByKey = raw.metadata.metrics.reduce<Record<MetricKey, MetricMeta>>(
    (acc, m) => {
      acc[m.key] = m;
      return acc;
    },
    {} as Record<MetricKey, MetricMeta>
  );

  return {
    key,
    metaByKey,
    days: raw.days,
    startDate: raw.metadata.start_date,
    endDate: raw.metadata.end_date,
  };
}
