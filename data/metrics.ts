import { AUDIENCE_SIZE } from "./series";
import type { JourneyTotals, MetricPoint, PeriodDataset } from "./types";
import {
  formatCount,
  formatCurrency,
  formatCurrencyCompact,
  formatDate,
  formatDeltaPercent,
  formatPercent,
  formatPoints,
  formatScore,
} from "./format";

export type Totals = {
  sent: number;
  delivered: number;
  bounced: number;
  opens: number;
  clicks: number;
  unsubscribes: number;
  orders: number;
  revenue: number;
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
  unsubscribeRate: number;
  bounceRate: number;
  conversionRate: number;
  averageOrderValue: number;
  revenuePerThousand: number;
  engagedShare: number;
  unengagedShare: number;
  engagementScore: number;
};

export type DeltaDirection = "up" | "down" | "flat";
export type DeltaTone = "positive" | "negative" | "neutral";

export type Delta = {
  /** Relative change in percent, or the absolute change in points for rates. */
  value: number;
  formatted: string;
  direction: DeltaDirection;
  tone: DeltaTone;
};

export type MetricAccent = "crimson" | "iris" | "orange" | "yellow";

export type StatMetric = {
  id: string;
  label: string;
  value: string;
  delta: Delta;
  /** e.g. "from Mar 03" — the day the comparison window closed. */
  comparisonLabel: string;
  accent: MetricAccent;
  series: number[];
};

const rate = (numerator: number, denominator: number) =>
  denominator === 0 ? 0 : numerator / denominator;

const total = (points: MetricPoint[], key: keyof MetricPoint) =>
  points.reduce((acc, point) => acc + (point[key] as number), 0);

const average = (points: MetricPoint[], key: keyof MetricPoint) =>
  points.length === 0 ? 0 : total(points, key) / points.length;

/**
 * Blends audience health with how hard the list is actually engaging. Open and
 * click rates are scored against best-in-class benchmarks rather than raw.
 */
function engagementScore(
  engagedShare: number,
  openRate: number,
  clickRate: number,
) {
  const openIndex = Math.min(1, openRate / 0.55);
  const clickIndex = Math.min(1, clickRate / 0.08);
  return 10 * (0.35 * engagedShare + 0.4 * openIndex + 0.25 * clickIndex);
}

export function computeTotals(points: MetricPoint[]): Totals {
  const sent = total(points, "sent");
  const delivered = total(points, "delivered");
  const bounced = total(points, "bounced");
  const opens = total(points, "opens");
  const clicks = total(points, "clicks");
  const unsubscribes = total(points, "unsubscribes");
  const orders = total(points, "orders");
  const revenue = total(points, "revenue");

  const openRate = rate(opens, delivered);
  const clickRate = rate(clicks, delivered);
  const engagedShare = rate(average(points, "engaged"), AUDIENCE_SIZE);

  return {
    sent,
    delivered,
    bounced,
    opens,
    clicks,
    unsubscribes,
    orders,
    revenue,
    openRate,
    clickRate,
    clickToOpenRate: rate(clicks, opens),
    unsubscribeRate: rate(unsubscribes, delivered),
    bounceRate: rate(bounced, sent),
    conversionRate: rate(orders, clicks),
    averageOrderValue: rate(revenue, orders),
    revenuePerThousand: rate(revenue, delivered) * 1000,
    engagedShare,
    unengagedShare: rate(average(points, "unengaged"), AUDIENCE_SIZE),
    engagementScore: engagementScore(engagedShare, openRate, clickRate),
  };
}

export function journeyRates(totals: JourneyTotals) {
  return {
    openRate: rate(totals.opens, totals.delivered),
    clickRate: rate(totals.clicks, totals.delivered),
    conversionRate: rate(totals.orders, totals.clicks),
    bounceRate: rate(totals.bounced, totals.sent),
    revenuePerThousand: rate(totals.revenue, totals.delivered) * 1000,
    averageOrderValue: rate(totals.revenue, totals.orders),
  };
}

function toneFor(
  direction: DeltaDirection,
  inverted: boolean,
): DeltaTone {
  if (direction === "flat") return "neutral";
  const good = inverted ? direction === "down" : direction === "up";
  return good ? "positive" : "negative";
}

/** Relative change, used for counts and money. */
export function relativeDelta(
  current: number,
  previous: number,
  inverted = false,
): Delta {
  if (previous === 0) {
    if (current === 0) {
      return {
        value: 0,
        formatted: formatDeltaPercent(0),
        direction: "flat",
        tone: "neutral",
      };
    }
    return {
      value: 100,
      formatted: formatDeltaPercent(100),
      direction: "up",
      tone: inverted ? "negative" : "positive",
    };
  }

  const change = ((current - previous) / previous) * 100;
  const direction =
    Math.abs(change) < 0.05 ? "flat" : change > 0 ? "up" : "down";

  return {
    value: change,
    formatted: formatDeltaPercent(change),
    direction,
    tone: toneFor(direction, inverted),
  };
}

/** Absolute change in percentage points, used for rates. */
export function pointsDelta(
  current: number,
  previous: number,
  inverted = false,
): Delta {
  const change = (current - previous) * 100;
  const direction =
    Math.abs(change) < 0.05 ? "flat" : change > 0 ? "up" : "down";

  return {
    value: change,
    formatted: formatPoints(Math.abs(change)),
    direction,
    tone: toneFor(direction, inverted),
  };
}

export function buildStatMetrics(dataset: PeriodDataset): StatMetric[] {
  const current = computeTotals(dataset.current.points);
  const previous = computeTotals(dataset.previous.points);
  const comparisonLabel = `from ${formatDate(dataset.previous.end)}`;
  const series = (key: keyof MetricPoint) =>
    dataset.current.points.map((point) => point[key] as number);
  const rateSeries = (
    numerator: keyof MetricPoint,
    denominator: keyof MetricPoint,
  ) =>
    dataset.current.points.map(
      (point) =>
        rate(point[numerator] as number, point[denominator] as number) * 100,
    );

  return [
    {
      id: "emails-sent",
      label: "Emails sent",
      value: formatCount(current.sent),
      delta: relativeDelta(current.sent, previous.sent),
      comparisonLabel,
      accent: "crimson",
      series: series("sent"),
    },
    {
      id: "open-rate",
      label: "Open rate",
      value: formatPercent(current.openRate * 100),
      delta: pointsDelta(current.openRate, previous.openRate),
      comparisonLabel,
      accent: "iris",
      series: rateSeries("opens", "delivered"),
    },
    {
      id: "unsubscribe-rate",
      label: "Unsubscribe rate",
      value: formatPercent(current.unsubscribeRate * 100),
      delta: pointsDelta(current.unsubscribeRate, previous.unsubscribeRate, true),
      comparisonLabel,
      accent: "orange",
      series: rateSeries("unsubscribes", "delivered"),
    },
    {
      id: "revenue-attributed",
      label: "Revenue attributed",
      value: formatCurrencyCompact(current.revenue),
      delta: relativeDelta(current.revenue, previous.revenue),
      comparisonLabel,
      accent: "yellow",
      series: series("revenue"),
    },
  ];
}

export type EngagementMetric = {
  score: string;
  delta: Delta;
  comparisonLabel: string;
  engaged: number;
  unengaged: number;
  engagedLabel: string;
  unengagedLabel: string;
};

export function buildEngagement(dataset: PeriodDataset): EngagementMetric {
  const current = computeTotals(dataset.current.points);
  const previous = computeTotals(dataset.previous.points);

  return {
    score: formatScore(current.engagementScore),
    delta: relativeDelta(current.engagementScore, previous.engagementScore),
    comparisonLabel: `from ${formatDate(dataset.previous.end)}`,
    engaged: current.engagedShare,
    unengaged: current.unengagedShare,
    engagedLabel: formatPercent(current.engagedShare * 100, 0),
    unengagedLabel: formatPercent(current.unengagedShare * 100, 0),
  };
}

export type JourneyColumnId =
  | "name"
  | "sent"
  | "openRate"
  | "clickRate"
  | "revenue"
  | "perThousand"
  | "change"
  | "bounceRate"
  | "conversionRate"
  | "averageOrder";

export type JourneyRow = {
  id: string;
  name: string;
  sent: number;
  sentLabel: string;
  openRate: number;
  openRateLabel: string;
  clickRate: number;
  clickRateLabel: string;
  revenue: number;
  revenueLabel: string;
  perThousand: number;
  perThousandLabel: string;
  change: Delta;
  changeLabel: string;
  bounceRate: number;
  bounceRateLabel: string;
  conversionRate: number;
  conversionRateLabel: string;
  averageOrder: number;
  averageOrderLabel: string;
};

export function buildJourneyRows(dataset: PeriodDataset): JourneyRow[] {
  return dataset.journeys.map((journey) => {
    const rates = journeyRates(journey.current);
    const change = relativeDelta(
      journey.current.revenue,
      journey.previous.revenue,
    );
    const sign =
      change.direction === "down" ? "−" : change.direction === "up" ? "+" : "";

    return {
      id: journey.id,
      name: journey.name,
      sent: journey.current.sent,
      sentLabel: formatCount(journey.current.sent),
      openRate: rates.openRate,
      openRateLabel: formatPercent(rates.openRate * 100),
      clickRate: rates.clickRate,
      clickRateLabel: formatPercent(rates.clickRate * 100),
      revenue: journey.current.revenue,
      revenueLabel: formatCurrency(journey.current.revenue),
      perThousand: rates.revenuePerThousand,
      perThousandLabel: formatCurrency(rates.revenuePerThousand),
      change,
      changeLabel: `${sign}${change.formatted}`,
      bounceRate: rates.bounceRate,
      bounceRateLabel: formatPercent(rates.bounceRate * 100),
      conversionRate: rates.conversionRate,
      conversionRateLabel: formatPercent(rates.conversionRate * 100),
      averageOrder: rates.averageOrderValue,
      averageOrderLabel: formatCurrency(rates.averageOrderValue),
    };
  });
}

/** Evenly spaced axis labels, used by the comparison chart. */
export function pickTickValues(timestamps: string[], count: number) {
  if (timestamps.length === 0) return [];
  if (timestamps.length <= count) return timestamps;
  const last = timestamps.length - 1;
  const ticks: string[] = [];
  for (let index = 0; index < count; index += 1) {
    const value = timestamps[Math.round((index * last) / (count - 1))];
    if (value && ticks[ticks.length - 1] !== value) ticks.push(value);
  }
  return ticks;
}

export type ComparisonPoint = {
  t: string;
  current: number;
  previous: number;
};

export type ComparisonSeries = {
  points: ComparisonPoint[];
  /** Index of the bucket where the two periods diverge the most. */
  outlierIndex: number;
  outlierDelta: Delta;
  axisMax: number;
  axisTicks: number[];
};

const NICE_STEPS = [1, 2, 2.5, 5, 10];

/** Rounds an axis up so the ticks land on readable values (0 / 500 / 1000 …). */
export function niceAxis(max: number, tickCount = 4) {
  const intervals = Math.max(1, tickCount - 1);
  const rough = Math.max(max, 1) / intervals;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const normalized = rough / magnitude;
  const step =
    (NICE_STEPS.find((candidate) => candidate >= normalized) ?? 10) * magnitude;
  const axisMax = step * intervals;

  return {
    axisMax,
    axisTicks: Array.from({ length: tickCount }, (_, index) => index * step),
  };
}

export function buildComparisonSeries(
  dataset: PeriodDataset,
  key: keyof MetricPoint = "revenue",
): ComparisonSeries {
  const points: ComparisonPoint[] = dataset.current.points.map(
    (point, index) => ({
      t: point.t,
      current: point[key] as number,
      previous: (dataset.previous.points[index]?.[key] as number) ?? 0,
    }),
  );

  const peak = points.reduce(
    (max, point) => Math.max(max, point.current, point.previous),
    0,
  );
  const floor = peak * 0.05;

  let outlierIndex = 0;
  let widestGap = -1;
  points.forEach((point, index) => {
    if (point.previous < floor) return;
    const gap = Math.abs(point.current - point.previous) / point.previous;
    if (gap > widestGap) {
      widestGap = gap;
      outlierIndex = index;
    }
  });

  const outlier = points[outlierIndex];

  return {
    points,
    outlierIndex,
    outlierDelta: relativeDelta(outlier?.current ?? 0, outlier?.previous ?? 0),
    ...niceAxis(peak),
  };
}
