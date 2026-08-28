"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Tabs from "@/components/Tabs";
import DateRangeTabs, { type DateRangeId } from "@/components/DateRangeTabs";
import Button from "@/components/Button";
import StatCards from "@/components/StatCards";
import RevenueChart from "@/components/RevenueChart";
import Insights from "@/components/Insights";
import Journeys from "@/components/Journeys";
import Engagement from "@/components/Engagement";
import Lera from "@/components/Lera";
import {
  buildComparisonSeries,
  buildEngagement,
  buildJourneyRows,
  buildStatMetrics,
  getDataset,
} from "@/data";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "performance-pipeline", label: "Performance pipeline" },
];

export default function Dashboard() {
  const [range, setRange] = useState<DateRangeId>("week");
  const [leraOpen, setLeraOpen] = useState(true);

  const dataset = getDataset(range);
  const stats = useMemo(() => buildStatMetrics(dataset), [dataset]);
  const revenue = useMemo(() => buildComparisonSeries(dataset), [dataset]);
  const journeys = useMemo(() => buildJourneyRows(dataset), [dataset]);
  const engagement = useMemo(() => buildEngagement(dataset), [dataset]);

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.stage}>
        <div className={styles.column}>
          <Tabs tabs={TABS} value="dashboard" />
          <div className={styles.canvas}>
            <div className={styles.content}>
              <div className={styles.hero}>
                <header className={styles.header}>
                  <h1 className={textStyles.headingXl}>Dashboard</h1>
                  <div className={styles.controls}>
                    <DateRangeTabs value={range} onChange={setRange} />
                    <Button variant="primary" size="l" icon="dashboard">
                      Add widget
                    </Button>
                  </div>
                </header>
                <StatCards metrics={stats} />
              </div>
              <div className={styles.mid}>
                <RevenueChart
                  series={revenue}
                  granularity={dataset.granularity}
                  tickCount={dataset.tickCount}
                />
                <Insights className={styles.insights} />
              </div>
              <div className={styles.bottom}>
                <Journeys rows={journeys} />
                <Engagement metric={engagement} className={styles.engagement} />
              </div>
            </div>
          </div>
        </div>
        {leraOpen ? (
          <Lera className={styles.lera} onCollapse={() => setLeraOpen(false)} />
        ) : null}
      </div>
    </div>
  );
}
