import type { JourneySeries, JourneyTotals, MetricPoint } from "./types";

/**
 * Journeys are derived from the same totals the top cards use, so every row
 * adds back up to the headline numbers. Each journey carries multipliers that
 * describe how it performs relative to the account average.
 */

type JourneyProfile = {
  id: string;
  name: string;
  /** Share of sends before the volume push is taken into account. */
  weight: number;
  /** How much of the push lands on this journey. Shares are re-normalised. */
  surgeWeight: number;
  open: number;
  click: number;
  conversion: number;
  order: number;
  bounce: number;
};

const PROFILES: JourneyProfile[] = [
  {
    id: "abandoned-cart",
    name: "Abandoned Cart",
    weight: 0.13,
    surgeWeight: 0.02,
    open: 1.9,
    click: 2.6,
    conversion: 3.1,
    order: 1.12,
    bounce: 0.5,
  },
  {
    id: "welcome-series",
    name: "Welcome Series",
    weight: 0.155,
    surgeWeight: 0.04,
    open: 1.68,
    click: 1.24,
    conversion: 0.86,
    order: 0.74,
    bounce: 0.45,
  },
  {
    id: "winback-flow",
    name: "Winback Flow",
    weight: 0.065,
    surgeWeight: 0.03,
    open: 0.94,
    click: 0.54,
    conversion: 2.35,
    order: 0.9,
    bounce: 1.6,
  },
  {
    id: "post-purchase",
    name: "Post-Purchase",
    weight: 0.1,
    surgeWeight: 0.03,
    open: 1.58,
    click: 1.72,
    conversion: 2.05,
    order: 1.28,
    bounce: 0.4,
  },
  {
    id: "browse-abandon",
    name: "Browse Abandon",
    weight: 0.088,
    surgeWeight: 0.03,
    open: 1.18,
    click: 0.94,
    conversion: 1.72,
    order: 0.96,
    bounce: 0.7,
  },
  {
    id: "weekly-digest",
    name: "Weekly Digest",
    weight: 0.32,
    surgeWeight: 0.74,
    open: 0.7,
    click: 0.25,
    conversion: 0.2,
    order: 0.58,
    bounce: 1.35,
  },
  {
    id: "re-engagement",
    name: "Re-engagement",
    weight: 0.054,
    surgeWeight: 0.05,
    open: 0.74,
    click: 0.42,
    conversion: 0.62,
    order: 0.64,
    bounce: 2.1,
  },
  {
    id: "birthday-club",
    name: "Birthday Club",
    weight: 0.045,
    surgeWeight: 0.02,
    open: 1.82,
    click: 1.96,
    conversion: 2.4,
    order: 1.34,
    bounce: 0.35,
  },
  {
    id: "back-in-stock",
    name: "Back in Stock",
    weight: 0.043,
    surgeWeight: 0.04,
    open: 1.44,
    click: 2.1,
    conversion: 2.2,
    order: 1.05,
    bounce: 0.6,
  },
];

const BASE_WEIGHT_SUM = PROFILES.reduce((sum, p) => sum + p.weight, 0);
const SURGE_WEIGHT_SUM = PROFILES.reduce((sum, p) => sum + p.surgeWeight, 0);

function sum(points: MetricPoint[], key: keyof MetricPoint) {
  return points.reduce((total, point) => total + (point[key] as number), 0);
}

/**
 * How much of the period sits inside the volume push. Drives how much of the
 * extra send volume is attributed to the low-intent Weekly Digest.
 */
function surgeIntensity(points: MetricPoint[]) {
  const sent = sum(points, "sent");
  if (sent === 0) return 0;
  const opens = sum(points, "opens");
  const delivered = sum(points, "delivered");
  const openRate = delivered === 0 ? 0 : opens / delivered;
  return Math.min(1, Math.max(0, (0.29 - openRate) / 0.045));
}

function splitTotals(points: MetricPoint[]): JourneyTotals[] {
  const totals = {
    sent: sum(points, "sent"),
    bounced: sum(points, "bounced"),
    opens: sum(points, "opens"),
    clicks: sum(points, "clicks"),
    orders: sum(points, "orders"),
    revenue: sum(points, "revenue"),
  };

  const surge = surgeIntensity(points);
  const shares = PROFILES.map(
    (profile) =>
      (1 - surge) * (profile.weight / BASE_WEIGHT_SUM) +
      surge * (profile.surgeWeight / SURGE_WEIGHT_SUM),
  );

  const weightedTotal = (modifier: (p: JourneyProfile) => number) =>
    PROFILES.reduce(
      (total, profile, index) => total + shares[index] * modifier(profile),
      0,
    );

  const openScale = weightedTotal((p) => p.open);
  const clickScale = weightedTotal((p) => p.open * p.click);
  const conversionScale = weightedTotal((p) => p.open * p.click * p.conversion);
  const revenueScale = weightedTotal(
    (p) => p.open * p.click * p.conversion * p.order,
  );
  const bounceScale = weightedTotal((p) => p.bounce);

  return PROFILES.map((profile, index) => {
    const share = shares[index];
    const sent = Math.round(totals.sent * share);
    const bounced = Math.round(
      (totals.bounced * share * profile.bounce) / (bounceScale || 1),
    );
    const opens = Math.round(
      (totals.opens * share * profile.open) / (openScale || 1),
    );
    const clicks = Math.round(
      (totals.clicks * share * profile.open * profile.click) / (clickScale || 1),
    );
    const orders = Math.round(
      (totals.orders * share * profile.open * profile.click * profile.conversion) /
        (conversionScale || 1),
    );
    const revenue = Math.round(
      (totals.revenue *
        share *
        profile.open *
        profile.click *
        profile.conversion *
        profile.order) /
        (revenueScale || 1),
    );

    return {
      sent,
      delivered: Math.max(0, sent - bounced),
      bounced,
      opens: Math.min(opens, Math.max(0, sent - bounced)),
      clicks,
      orders,
      revenue,
    };
  });
}

export function buildJourneys(
  current: MetricPoint[],
  previous: MetricPoint[],
): JourneySeries[] {
  const currentTotals = splitTotals(current);
  const previousTotals = splitTotals(previous);

  return PROFILES.map((profile, index) => ({
    id: profile.id,
    name: profile.name,
    current: currentTotals[index],
    previous: previousTotals[index],
  }));
}
