import type { DatasetKey, RawDataset } from '../domain/metrics/types';
import rawData from './metrics.json';

const data = rawData as Record<DatasetKey, RawDataset>;

export function loadDataset(key: DatasetKey): RawDataset {
  return data[key];
}

export const DATASET_KEYS: DatasetKey[] = ['A', 'B', 'C', 'D'];
