import { buildJourneys } from "./journeys";
import {
  DAY_MS,
  HOUR_MS,
  REFERENCE_NOW,
  buildSeries,
  startOfDay,
} from "./series";
import type {
  DateRangeId,
  Granularity,
  PeriodDataset,
  PeriodSeries,
} from "./types";

type PeriodDefinition = {
  label: string;
  granularity: Granularity;
  /** Buckets in the window. */
  length: number;
  /** Whole days to step back from today before the window ends. */
  offsetDays: number;
  tickCount: number;
};

const DEFINITIONS: Record<DateRangeId, PeriodDefinition> = {
  today: { label: "Today", granularity: "hour", length: 24, offsetDays: 0, tickCount: 6 },
  yesterday: { label: "Yesterday", granularity: "hour", length: 24, offsetDays: 1, tickCount: 6 },
  week: { label: "Week", granularity: "day", length: 7, offsetDays: 0, tickCount: 7 },
  month: { label: "Month", granularity: "day", length: 30, offsetDays: 0, tickCount: 6 },
  custom: { label: "Custom", granularity: "day", length: 60, offsetDays: 0, tickCount: 6 },
};

export const PERIOD_IDS = Object.keys(DEFINITIONS) as DateRangeId[];

function toSeries(
  start: number,
  length: number,
  granularity: Granularity,
): PeriodSeries {
  const step = granularity === "hour" ? HOUR_MS : DAY_MS;
  return {
    start: new Date(start).toISOString(),
    end: new Date(start + (length - 1) * step).toISOString(),
    points: buildSeries(start, length, granularity),
  };
}

function buildDataset(id: DateRangeId): PeriodDataset {
  const definition = DEFINITIONS[id];
  const step = definition.granularity === "hour" ? HOUR_MS : DAY_MS;
  const window = definition.length * step;
  const anchor = startOfDay(REFERENCE_NOW) - definition.offsetDays * DAY_MS;
  // Hourly ranges cover the anchor day itself; daily ranges end on it.
  const currentStart =
    definition.granularity === "hour"
      ? anchor
      : anchor - (definition.length - 1) * DAY_MS;

  const current = toSeries(currentStart, definition.length, definition.granularity);
  const previous = toSeries(currentStart - window, definition.length, definition.granularity);

  return {
    id,
    label: definition.label,
    granularity: definition.granularity,
    tickCount: definition.tickCount,
    current,
    previous,
    journeys: buildJourneys(current.points, previous.points),
  };
}

/**
 * Every range is generated up front. The seeded generator makes this cheap and
 * lets the UI switch periods without a loading state.
 */
export const DASHBOARD_DATA: Record<DateRangeId, PeriodDataset> = {
  today: buildDataset("today"),
  yesterday: buildDataset("yesterday"),
  week: buildDataset("week"),
  month: buildDataset("month"),
  custom: buildDataset("custom"),
};

export const getDataset = (id: DateRangeId) => DASHBOARD_DATA[id];

export * from "./format";
export * from "./metrics";
export * from "./types";
export { AUDIENCE_SIZE, REFERENCE_NOW, resample } from "./series";
