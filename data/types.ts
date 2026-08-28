import type { DateRangeId } from "@/components/DateRangeTabs";

export type { DateRangeId };

/** Raw counters captured for a single bucket of time (an hour or a day). */
export type MetricPoint = {
  /** ISO timestamp for the start of the bucket. */
  t: string;
  sent: number;
  delivered: number;
  bounced: number;
  opens: number;
  clicks: number;
  unsubscribes: number;
  orders: number;
  revenue: number;
  /** Recipients that opened or clicked at least once in the trailing window. */
  engaged: number;
  /** Recipients with no activity in the trailing window. */
  unengaged: number;
};

export type Granularity = "hour" | "day";

/** One side of a comparison — either the selected window or the one before it. */
export type PeriodSeries = {
  start: string;
  end: string;
  points: MetricPoint[];
};

export type PeriodDataset = {
  id: DateRangeId;
  label: string;
  granularity: Granularity;
  /** Buckets the chart axis is split into, e.g. 6 ticks in the Figma design. */
  tickCount: number;
  current: PeriodSeries;
  previous: PeriodSeries;
  journeys: JourneySeries[];
};

/** Per-journey totals for both sides of the comparison. */
export type JourneyTotals = {
  sent: number;
  delivered: number;
  bounced: number;
  opens: number;
  clicks: number;
  orders: number;
  revenue: number;
};

export type JourneySeries = {
  id: string;
  name: string;
  current: JourneyTotals;
  previous: JourneyTotals;
};
