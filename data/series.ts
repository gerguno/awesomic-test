import type { Granularity, MetricPoint } from "./types";

/**
 * Deterministic mock telemetry for the dashboard.
 *
 * Every bucket is seeded from its own timestamp, so a given hour or day always
 * produces the same numbers no matter which period asked for it. That keeps the
 * week, month and custom ranges consistent with each other and keeps the server
 * and client renders identical.
 */

export const HOUR_MS = 60 * 60 * 1000;
export const DAY_MS = 24 * HOUR_MS;

/** The mock account is frozen at this moment so the data never drifts. */
export const REFERENCE_NOW = Date.UTC(2025, 2, 10, 23, 0, 0);

/** Total addressable profiles in the mock account. */
export const AUDIENCE_SIZE = 48_600;

const BASE_DAILY_SENT = 1_780;

/**
 * A volume push that ramps up over the last week: sends climb while open,
 * click and conversion quality all decay. This is the story the Insights and
 * Lera cards narrate.
 */
const SURGE_START = Date.UTC(2025, 2, 4);
const SURGE_RAMP_DAYS = 6;
const SURGE_VOLUME_LIFT = 0.7;

const WEEKDAY_VOLUME = [0.6, 1.15, 1.2, 1.08, 1.18, 1.0, 0.64];
const HOUR_VOLUME = [
  0.05, 0.03, 0.02, 0.02, 0.03, 0.08, 0.25, 0.62, 1.35, 2.1, 2.35, 2.05, 1.7,
  1.55, 1.62, 1.48, 1.25, 0.95, 0.72, 0.55, 0.42, 0.3, 0.18, 0.1,
];

const mean = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

const WEEKDAY_MEAN = mean(WEEKDAY_VOLUME);
const HOUR_MEAN = mean(HOUR_VOLUME);

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const jitter = (random: () => number, spread: number) =>
  1 + (random() * 2 - 1) * spread;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function startOfDay(t: number) {
  return Math.floor(t / DAY_MS) * DAY_MS;
}

export function startOfHour(t: number) {
  return Math.floor(t / HOUR_MS) * HOUR_MS;
}

/** 0 before the push, ramping to 1 once it is fully rolled out. */
function surgeAt(t: number) {
  if (t < SURGE_START) return 0;
  return clamp((t - SURGE_START) / (SURGE_RAMP_DAYS * DAY_MS), 0, 1);
}

/** Roughly one promotional blast every week and a half. */
function promoFactor(dayStart: number) {
  const roll = mulberry32(Math.floor(dayStart / DAY_MS) * 0x9e3779b1)();
  return roll < 0.1 ? 2.8 + roll * 6 : 1;
}

type DayProfile = {
  sent: number;
  bounceRate: number;
  openRate: number;
  clickThroughOpenRate: number;
  unsubscribeRate: number;
  conversionRate: number;
  averageOrderValue: number;
  engagedShare: number;
  unengagedShare: number;
  promo: number;
};

function dayProfile(dayStart: number): DayProfile {
  const random = mulberry32(Math.floor(dayStart / DAY_MS) * 0x2545f491);
  const surge = surgeAt(dayStart);
  const promo = promoFactor(dayStart);
  const weekday =
    WEEKDAY_VOLUME[new Date(dayStart).getUTCDay()] / WEEKDAY_MEAN;

  return {
    sent:
      BASE_DAILY_SENT *
      weekday *
      (1 + SURGE_VOLUME_LIFT * surge) *
      (1 + 0.5 * (promo - 1)) *
      jitter(random, 0.12),
    bounceRate: clamp(0.011 + 0.004 * surge + (random() - 0.5) * 0.003, 0.004, 0.05),
    openRate: clamp(0.29 - 0.045 * surge + (random() - 0.5) * 0.03, 0.08, 0.6),
    clickThroughOpenRate: clamp(
      0.115 - 0.022 * surge + (random() - 0.5) * 0.02,
      0.03,
      0.3,
    ),
    unsubscribeRate: clamp(
      0.0105 + 0.0085 * surge + (random() - 0.5) * 0.004,
      0.001,
      0.05,
    ),
    conversionRate: clamp(
      0.086 - 0.068 * surge + (random() - 0.5) * 0.02,
      0.008,
      0.2,
    ),
    averageOrderValue: 78 * jitter(random, 0.16),
    engagedShare: clamp(0.74 - 0.1 * surge + (random() - 0.5) * 0.02, 0.3, 0.95),
    unengagedShare: clamp(0.075 + 0.05 * surge + (random() - 0.5) * 0.01, 0.02, 0.5),
    promo,
  };
}

function buildPoint(
  t: number,
  profile: DayProfile,
  share: number,
  random: () => number,
): MetricPoint {
  const sent = Math.max(0, Math.round(profile.sent * share));
  const bounced = Math.round(sent * profile.bounceRate * jitter(random, 0.2));
  const delivered = Math.max(0, sent - bounced);
  const opens = Math.round(delivered * profile.openRate * jitter(random, 0.1));
  const clicks = Math.round(
    opens * profile.clickThroughOpenRate * jitter(random, 0.14),
  );
  const unsubscribes = Math.round(
    delivered * profile.unsubscribeRate * jitter(random, 0.25),
  );
  const expectedOrders = Math.max(
    0,
    clicks * profile.conversionRate * jitter(random, 0.2),
  );
  const orders = Math.round(expectedOrders);
  const revenue = Math.round(
    expectedOrders * profile.averageOrderValue * profile.promo * jitter(random, 0.12),
  );

  return {
    t: new Date(t).toISOString(),
    sent,
    delivered,
    bounced,
    opens,
    clicks,
    unsubscribes,
    orders,
    revenue,
    engaged: Math.round(AUDIENCE_SIZE * profile.engagedShare),
    unengaged: Math.round(AUDIENCE_SIZE * profile.unengagedShare),
  };
}

export function pointForDay(dayStart: number): MetricPoint {
  const profile = dayProfile(dayStart);
  const random = mulberry32(Math.floor(dayStart / DAY_MS) * 0x85ebca6b);
  return buildPoint(dayStart, profile, 1, random);
}

export function pointForHour(hourStart: number): MetricPoint {
  const profile = dayProfile(startOfDay(hourStart));
  const random = mulberry32(Math.floor(hourStart / HOUR_MS) * 0xc2b2ae35);
  const hour = new Date(hourStart).getUTCHours();
  const share = (HOUR_VOLUME[hour] / HOUR_MEAN / 24) * jitter(random, 0.18);
  return buildPoint(hourStart, profile, share, random);
}

/** Interpolates `values` onto `count` evenly spaced samples so charts can morph. */
export function resample(values: number[], count: number) {
  if (count <= 0) return [];
  if (values.length === 0) return Array.from({ length: count }, () => 0);
  if (values.length === 1) return Array.from({ length: count }, () => values[0]);

  const last = values.length - 1;
  return Array.from({ length: count }, (_, index) => {
    const t = (index / (count - 1)) * last;
    const left = Math.floor(t);
    const right = Math.min(last, left + 1);
    const mix = t - left;
    return values[left] * (1 - mix) + values[right] * mix;
  });
}

/** Builds `count` consecutive buckets starting at `start`. */
export function buildSeries(
  start: number,
  count: number,
  granularity: Granularity,
): MetricPoint[] {
  const step = granularity === "hour" ? HOUR_MS : DAY_MS;
  const build = granularity === "hour" ? pointForHour : pointForDay;
  return Array.from({ length: count }, (_, index) => build(start + index * step));
}
