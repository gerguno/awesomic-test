"use client";

import cn from "classnames";
import Icon from "@/components/Icon";
import Delta from "@/components/Delta";
import RollingNumber from "@/components/RollingNumber";
import Sparkline from "@/components/Sparkline";
import { type StatMetric } from "@/data";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface StatCardsProps {
  metrics: StatMetric[];
  className?: string;
}

export default function StatCards({ metrics, className }: StatCardsProps) {
  return (
    <section className={cn(styles.root, className)} aria-label="Headline metrics">
      {metrics.map((metric) => (
        <article key={metric.id} className={styles.card}>
          <div className={styles.copy}>
            <p className={cn(styles.label, textStyles.bodyXl)}>{metric.label}</p>
            <div className={styles.figures}>
              <p className={cn(styles.value, textStyles.monoXl)}>
                <RollingNumber value={metric.value} />
              </p>
              <Delta delta={metric.delta} caption={metric.comparisonLabel} />
            </div>
          </div>
          <div className={styles.chart}>
            <Sparkline series={metric.series} accent={metric.accent} />
          </div>
        </article>
      ))}
      <button type="button" className={styles.move} aria-label="Move cards">
        <Icon name="drag" width={18} height={18} />
      </button>
    </section>
  );
}
