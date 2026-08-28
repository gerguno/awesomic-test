"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import cn from "classnames";
import CardHeader from "@/components/CardHeader";
import Delta from "@/components/Delta";
import RollingNumber from "@/components/RollingNumber";
import { type EngagementMetric } from "@/data";
import { type QuickAction } from "@/components/QuickActions";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

const ACTIONS: QuickAction[] = [
  { id: "move", icon: "drag", label: "Move card" },
  { id: "report", icon: "report", label: "Report" },
  { id: "more", icon: "more", label: "More" },
];

/** Geometry from Figma node 34:1769 (viewBox 127.45 × 127.976). */
const VB_W = 127.45;
const VB_H = 127.976;
const CX = 63.4617;
const CY = 63.9879;
const INNER = 42.2578;
const OUTER = 63.3867;

export interface EngagementProps {
  metric: EngagementMetric;
  className?: string;
}

function polar(radius: number, angle: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

function donutSlice(start: number, end: number) {
  const sweep = Math.min(359.999, Math.max(0.001, end - start));
  const mid = start + sweep / 2;
  const finish = start + sweep;
  const [sOut, sOutY] = polar(OUTER, start);
  const [mOut, mOutY] = polar(OUTER, mid);
  const [eOut, eOutY] = polar(OUTER, finish);
  const [eIn, eInY] = polar(INNER, finish);
  const [mIn, mInY] = polar(INNER, mid);
  const [sIn, sInY] = polar(INNER, start);

  return [
    `M ${sOut} ${sOutY}`,
    `A ${OUTER} ${OUTER} 0 0 1 ${mOut} ${mOutY}`,
    `A ${OUTER} ${OUTER} 0 0 1 ${eOut} ${eOutY}`,
    `L ${eIn} ${eInY}`,
    `A ${INNER} ${INNER} 0 0 0 ${mIn} ${mInY}`,
    `A ${INNER} ${INNER} 0 0 0 ${sIn} ${sInY}`,
    "Z",
  ].join(" ");
}

export default function Engagement({ metric, className }: EngagementProps) {
  const uid = useId().replace(/:/g, "");
  const engagedFill = `${uid}-engaged`;
  const unengagedFill = `${uid}-unengaged`;
  const reduceMotion = useReducedMotion();

  const { engagedPath, unengagedPath } = useMemo(() => {
    const total = metric.engaged + metric.unengaged;
    const unengagedShare = total === 0 ? 0 : metric.unengaged / total;
    const unengagedSweep = unengagedShare * 360;
    // Figma places the crimson wedge on the right, centered on 3 o'clock.
    const unengagedStart = 90 - unengagedSweep / 2;
    const unengagedEnd = unengagedStart + unengagedSweep;

    return {
      engagedPath: donutSlice(unengagedEnd, unengagedStart + 360),
      unengagedPath: donutSlice(unengagedStart, unengagedEnd),
    };
  }, [metric.engaged, metric.unengaged]);

  const duration = reduceMotion ? 0 : 0.6;

  return (
    <article className={cn(styles.root, className)}>
      <CardHeader icon="chart" title="Engagement" actions={ACTIONS} />
      <div className={styles.body}>
        <div className={styles.dial}>
          <svg
            className={styles.ring}
            width={VB_W}
            height={VB_H}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            fill="none"
            overflow="visible"
            aria-hidden
          >
            <defs>
              <linearGradient
                id={engagedFill}
                x1="0.85"
                y1="58.1724"
                x2="104.85"
                y2="58.1724"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--color-brown)" stopOpacity={0.32} />
                <stop offset="1" stopColor="var(--color-brown)" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id={unengagedFill}
                x1="126.85"
                y1="58.9521"
                x2="84.8502"
                y2="58.9521"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--color-crimson)" stopOpacity={0.32} />
                <stop offset="1" stopColor="var(--color-crimson)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <motion.path
              d={engagedPath}
              fill={`url(#${engagedFill})`}
              stroke="var(--color-brown)"
              strokeWidth={1.2}
              strokeLinecap="butt"
              strokeLinejoin="round"
              initial={false}
              animate={{ d: engagedPath }}
              transition={{ duration, ease: "easeOut" }}
            />
            <motion.path
              d={unengagedPath}
              fill={`url(#${unengagedFill})`}
              stroke="var(--color-crimson)"
              strokeWidth={1.2}
              strokeLinecap="butt"
              strokeLinejoin="round"
              initial={false}
              animate={{ d: unengagedPath }}
              transition={{ duration, ease: "easeOut" }}
            />
          </svg>
          <p className={cn(styles.score, textStyles.monoXl)}>
            <RollingNumber value={metric.score} />
          </p>
        </div>
        <Delta delta={metric.delta} caption={metric.comparisonLabel} />
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.legendHead}>
              <span className={cn(styles.swatch, styles.engaged)} />
              <span className={textStyles.bodyMd}>Engaged</span>
            </span>
            <p className={textStyles.monoLg}>{metric.engagedLabel}</p>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendHead}>
              <span className={cn(styles.swatch, styles.unengaged)} />
              <span className={textStyles.bodyMd}>Unengaged</span>
            </span>
            <p className={textStyles.monoLg}>{metric.unengagedLabel}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
