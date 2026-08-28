"use client";

import { useId, useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import cn from "classnames";
import MorphArea from "@/components/MorphArea";
import { resample, type MetricAccent } from "@/data";
import styles from "./index.module.scss";

const SAMPLES = 48;

export interface SparklineProps {
  series: number[];
  accent: MetricAccent;
  className?: string;
}

type Point = { i: number; v: number };

export default function Sparkline({ series, accent, className }: SparklineProps) {
  const gradientId = useId().replace(/:/g, "");
  const { points, lo, hi } = useMemo(() => {
    const sampled = resample(series.length > 0 ? series : [0], SAMPLES);
    const min = Math.min(...sampled);
    const max = Math.max(...sampled);
    const span = Math.max(max - min, Math.abs(max) * 0.08, 0.001);

    return {
      points: sampled.map((v, i) => ({ i, v }) satisfies Point),
      lo: min - span * 0.08,
      hi: max + span * 0.35,
    };
  }, [series]);

  return (
    <div className={cn(styles.root, className)} data-accent={accent} aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={points}
          margin={{ top: 6, right: 0, left: 0, bottom: 0 }}
          accessibilityLayer={false}
          tabIndex={-1}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--spark)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--spark)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={[lo, hi]} />
          <Area
            type="linear"
            dataKey="v"
            stroke="var(--spark)"
            strokeWidth={1.2}
            fill={`url(#${gradientId})`}
            baseValue={lo}
            dot={false}
            activeDot={false}
            shape={MorphArea}
            isAnimationActive
            animationDuration={600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
