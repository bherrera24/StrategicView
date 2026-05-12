import type { DayRecord, FunnelStage, MetricKey } from '../types';

const METRIC_TRAFFIC: MetricKey = 'traffic';
const METRIC_LEADS_CREATED: MetricKey = 'leads_created';
const METRIC_LEADS_QUALIFIED: MetricKey = 'leads_qualified';
const METRIC_DEALS_CREATED: MetricKey = 'deals_created';
const METRIC_DEALS_WON: MetricKey = 'deals_won';

const STAGE_LABEL_TRAFFIC = 'Traffic';
const STAGE_LABEL_LEADS = 'Leads';
const STAGE_LABEL_QUALIFIED = 'Qualified';
const STAGE_LABEL_DEALS = 'Deals';
const STAGE_LABEL_WON = 'Won';

export function calculateFunnel(days: DayRecord[]): FunnelStage[] {
  const sum = (key: keyof DayRecord['metrics']) =>
    days.reduce((acc, d) => acc + (d.metrics[key] ?? 0), 0);

  const traffic = sum(METRIC_TRAFFIC);
  const leads = sum(METRIC_LEADS_CREATED);
  const qualified = sum(METRIC_LEADS_QUALIFIED);
  const deals = sum(METRIC_DEALS_CREATED);
  const won = sum(METRIC_DEALS_WON);

  const rate = (numerator: number, denominator: number) =>
    denominator === 0 ? null : numerator / denominator;

  const stages = [
    { label: STAGE_LABEL_TRAFFIC, value: traffic, conversionRate: null },
    { label: STAGE_LABEL_LEADS, value: leads, conversionRate: rate(leads, traffic) },
    { label: STAGE_LABEL_QUALIFIED, value: qualified, conversionRate: rate(qualified, leads) },
    { label: STAGE_LABEL_DEALS, value: deals, conversionRate: rate(deals, qualified) },
    { label: STAGE_LABEL_WON, value: won, conversionRate: rate(won, deals) },
  ];

  const maxValue = Math.max(...stages.map((s) => s.value));
  return stages.map((s) => ({
    ...s,
    barWidthPercent: maxValue > 0 ? s.value / maxValue : 0,
  }));
}
