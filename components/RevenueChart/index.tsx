"use client";

import { useId, useMemo } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceDot,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import cn from "classnames";
import CardHeader from "@/components/CardHeader";
import Delta from "@/components/Delta";
import MorphArea from "@/components/MorphArea";
import {
  formatAxisCurrency,
  formatDateLines,
  formatHourLines,
  pickTickValues,
  resample,
  type ComparisonSeries,
  type Granularity,
} from "@/data";
import { type QuickAction } from "@/components/QuickActions";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

const ACTIONS: QuickAction[] = [
  { id: "move", icon: "drag", label: "Move card" },
  { id: "report", icon: "report", label: "Report" },
  { id: "more", icon: "more", label: "More" },
];

const ANIMATION = 600;
const SAMPLES = 48;

type ChartPoint = {
  i: number;
  t: string;
  current: number;
  previous: number;
};

export interface RevenueChartProps {
  series: ComparisonSeries;
  granularity: Granularity;
  tickCount: number;
  className?: string;
}

export default function RevenueChart({
  series,
  granularity,
  tickCount,
  className,
}: RevenueChartProps) {
  const uid = useId().replace(/:/g, "");
  const currentFill = `${uid}-current`;
  const previousFill = `${uid}-previous`;

  const { points, ticks, outlier, outlierX, axisMax, axisTicks } = useMemo(() => {
    const source = series.points;
    const lastSource = Math.max(source.length - 1, 1);
    const toSample = (index: number) =>
      Math.round((index / lastSource) * (SAMPLES - 1));

    const currents = resample(
      source.map((point) => point.current),
      SAMPLES,
    );
    const previous = resample(
      source.map((point) => point.previous),
      SAMPLES,
    );
    const mapped: ChartPoint[] = currents.map((current, index) => {
      const sourceIndex = Math.round((index / (SAMPLES - 1)) * lastSource);
      return {
        i: index,
        t: source[sourceIndex]?.t ?? "",
        current,
        previous: previous[index] ?? 0,
      };
    });

    const stamps = source.map((point) => point.t);
    const tickStamps = pickTickValues(stamps, tickCount);
    const tickIndex = new Map(stamps.map((stamp, index) => [stamp, index]));

    return {
      points: mapped,
      ticks: tickStamps
        .map((stamp) => tickIndex.get(stamp))
        .filter((index): index is number => index !== undefined)
        .map(toSample),
      outlier: mapped[toSample(series.outlierIndex)],
      outlierX: toSample(series.outlierIndex),
      axisMax: series.axisMax,
      axisTicks: [...series.axisTicks].reverse(),
    };
  }, [series, tickCount]);

  const last = Math.max(points.length - 1, 1);
  const xPct = outlier ? (outlierX / last) * 100 : 0;
  const yPct = outlier && axisMax > 0 ? (1 - outlier.current / axisMax) * 100 : 0;
  const calloutAlign = xPct < 18 ? "start" : xPct > 72 ? "end" : "center";
  const calloutSide = yPct < 28 ? "below" : "above";
  const outlierCaption =
    series.outlierDelta.direction === "down"
      ? "lower than previous"
      : series.outlierDelta.direction === "up"
        ? "higher than previous"
        : "vs previous";

  return (
    <article className={cn(styles.root, className)}>
      <CardHeader icon="chart" title="Attributed revenue" actions={ACTIONS} />
      <div className={styles.stage}>
        <div className={styles.plot}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={points} margin={{ top: 36, right: 8, left: 8, bottom: 4 }}>
              <defs>
                <linearGradient id={previousFill} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id={currentFill} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-purple)" stopOpacity={0.16} />
                  <stop offset="100%" stopColor="var(--color-purple)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="var(--color-border)"
                strokeDasharray="4 4"
                horizontalValues={series.axisTicks}
              />
              <CartesianGrid
                horizontal={false}
                stroke="var(--color-border)"
                verticalValues={ticks}
              />
              <XAxis
                type="number"
                dataKey="i"
                domain={[0, last]}
                ticks={ticks}
                tick={false}
                tickLine={false}
                axisLine={false}
                interval={0}
                height={1}
              />
              <YAxis hide domain={[0, axisMax]} ticks={series.axisTicks} type="number" />
              <Area
                id={`${uid}-previous`}
                type="monotone"
                dataKey="previous"
                stroke="var(--color-secondary)"
                strokeWidth={1.2}
                strokeDasharray="2.4 2.4"
                fill={`url(#${previousFill})`}
                baseValue={0}
                dot={false}
                activeDot={false}
                shape={MorphArea}
                isAnimationActive
                animationDuration={ANIMATION}
                animationEasing="ease-out"
              />
              <Area
                id={`${uid}-current`}
                type="monotone"
                dataKey="current"
                stroke="var(--color-purple)"
                strokeWidth={1.2}
                fill={`url(#${currentFill})`}
                baseValue={0}
                dot={false}
                activeDot={false}
                shape={MorphArea}
                isAnimationActive
                animationDuration={ANIMATION}
                animationEasing="ease-out"
              />
              {outlier ? (
                <ReferenceDot
                  x={outlierX}
                  y={outlier.current}
                  r={6}
                  fill="var(--color-background)"
                  stroke="var(--color-yellow-accent)"
                  strokeWidth={2}
                />
              ) : null}
            </ComposedChart>
          </ResponsiveContainer>
          <div className={styles.fade} />
          <div className={styles.yAxis} aria-hidden>
            {axisTicks.map((tick) => (
              <span key={tick} className={textStyles.monoMd}>
                {formatAxisCurrency(tick)}
              </span>
            ))}
          </div>
          {outlier ? (
            <div className={styles.overlay}>
              <div
                className={styles.callout}
                data-align={calloutAlign}
                data-side={calloutSide}
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
              >
                <Delta delta={series.outlierDelta} caption={outlierCaption} />
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.xAxis} aria-hidden>
          {ticks.map((index, order) => {
            const stamp = points[index]?.t;
            if (!stamp) return null;
            const [top, bottom] =
              granularity === "hour" ? formatHourLines(stamp) : formatDateLines(stamp);
            const align =
              order === 0 ? "start" : order === ticks.length - 1 ? "end" : "center";

            return (
              <span
                key={`${stamp}-${index}`}
                className={styles.xTick}
                data-align={align}
                style={{ left: `${(index / last) * 100}%` }}
              >
                <span>{top}</span>
                <span>{bottom}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={cn(styles.swatch, styles.current)} />
          <span className={textStyles.bodyMd}>This period</span>
        </div>
        <div className={styles.legendItem}>
          <span className={cn(styles.swatch, styles.previous)} />
          <span className={textStyles.bodyMd}>Previous period</span>
        </div>
        <div className={styles.legendItem}>
          <span className={cn(styles.swatch, styles.outlier)} />
          <span className={textStyles.bodyMd}>Outlier</span>
        </div>
      </div>
    </article>
  );
}
