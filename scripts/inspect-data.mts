import { DASHBOARD_DATA, PERIOD_IDS } from "../data/index.js";
import {
  buildComparisonSeries,
  buildStatMetrics,
  computeTotals,
  journeyRates,
} from "../data/metrics.js";
import { formatCurrency, formatDate } from "../data/format.js";

for (const id of PERIOD_IDS) {
  const dataset = DASHBOARD_DATA[id];
  const current = computeTotals(dataset.current.points);
  const previous = computeTotals(dataset.previous.points);
  const comparison = buildComparisonSeries(dataset);

  console.log(`\n=== ${dataset.label} (${dataset.granularity}) ===`);
  console.log(
    `current ${formatDate(dataset.current.start)} → ${formatDate(dataset.current.end)} | previous ${formatDate(dataset.previous.start)} → ${formatDate(dataset.previous.end)}`,
  );
  for (const metric of buildStatMetrics(dataset)) {
    console.log(
      `  ${metric.label.padEnd(20)} ${metric.value.padEnd(10)} ${metric.delta.direction} ${metric.delta.formatted} (${metric.delta.tone}) ${metric.comparisonLabel}`,
    );
  }
  console.log(
    `  engagement score ${current.engagementScore.toFixed(1)} | engaged ${(current.engagedShare * 100).toFixed(0)}% unengaged ${(current.unengagedShare * 100).toFixed(0)}%`,
  );
  console.log(
    `  axis max ${comparison.axisMax} ticks ${comparison.axisTicks.join(", ")} | outlier @${comparison.outlierIndex} ${comparison.outlierDelta.direction} ${comparison.outlierDelta.formatted}`,
  );
  console.log(
    `  prev revenue ${formatCurrency(previous.revenue)} → current ${formatCurrency(current.revenue)}`,
  );
}

const week = DASHBOARD_DATA.week;
console.log("\n=== Journeys (week) ===");
let sent = 0;
let revenue = 0;
for (const journey of week.journeys) {
  const rates = journeyRates(journey.current);
  sent += journey.current.sent;
  revenue += journey.current.revenue;
  console.log(
    `  ${journey.name.padEnd(18)} sent ${String(journey.current.sent).padStart(8)} open ${(rates.openRate * 100).toFixed(1)}% click ${(rates.clickRate * 100).toFixed(1)}% rev ${formatCurrency(journey.current.revenue).padStart(9)} per1k ${formatCurrency(rates.revenuePerThousand)}`,
  );
}
const weekTotals = computeTotals(week.current.points);
console.log(
  `  sum sent ${sent} vs total ${weekTotals.sent} | sum revenue ${revenue} vs total ${weekTotals.revenue}`,
);
