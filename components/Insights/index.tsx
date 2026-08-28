"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import cn from "classnames";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import CardHeader from "@/components/CardHeader";
import Pager from "@/components/Pager";
import Stepper from "@/components/Stepper";
import { type QuickAction } from "@/components/QuickActions";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export type InsightsVariant = "one" | "two" | "three";

type Bar = {
  mark: "apple" | "gmail" | "ac" | "wd" | "date" | "grid";
  value: string;
  width: string;
  muted?: boolean;
};

type InsightCopy = {
  headline: string;
  body: string;
  summary: string;
  metric: string;
  left: Bar["mark"];
  right: Bar["mark"];
  bars: [Bar, Bar];
};

const VARIANTS: Record<InsightsVariant, InsightCopy> = {
  one: {
    headline: "Half of your opens come from a robot",
    body: "Apple Mail loads images before anyone reads. Those opens are counted, the clicks are not, and that is your whole open rate story this month.",
    summary: "Apple opens your emails before your customers do",
    metric: "Clicks per 100 opens",
    left: "apple",
    right: "gmail",
    bars: [
      { mark: "apple", value: "12", width: "17.7%" },
      { mark: "gmail", value: "30", width: "100%", muted: true },
    ],
  },
  two: {
    headline: "You are sending more of the wrong email",
    body: "Weekly Digest now takes two thirds of your volume and brings a tenth of the money. That single shift is what pulled the open rate down.",
    summary: "2/3 of your sends earn 1/10 of your revenue",
    metric: "Share of revenue, %",
    left: "ac",
    right: "wd",
    bars: [
      { mark: "ac", value: "63", width: "100%" },
      { mark: "wd", value: "11", width: "5%", muted: true },
    ],
  },
  three: {
    headline: "One send is holding up the whole month",
    body: "A single Winback blast ran far above everything around it. Take it out and growth looks ordinary, so plan on the smaller number.",
    summary: "One blast produced almost two days of revenue",
    metric: "Revenue, $",
    left: "date",
    right: "grid",
    bars: [
      { mark: "date", value: "2k", width: "100%" },
      { mark: "grid", value: "971", width: "21%", muted: true },
    ],
  },
};

const ORDER: InsightsVariant[] = ["one", "two", "three"];
const AUTO_MS = 5000;
const FILL_DURATION = 0.8;
const FILL_EASE: [number, number, number, number] = [0.16, 0, 0.24, 1];

const HEADER_ACTIONS: QuickAction[] = [
  { id: "move", icon: "drag", label: "Move card" },
  { id: "more", icon: "more", label: "More" },
];

function Mark({ name, size }: { name: Bar["mark"]; size: "lg" | "sm" }) {
  const box = cn(styles.mark, size === "lg" ? styles.markLg : styles.markSm);
  const typeClass = size === "sm" ? textStyles.monoMd : textStyles.monoLg;
  const px = size === "lg" ? 32 : 16;

  if (name === "apple") {
    return (
      <span className={box}>
        <img
          className={styles.markImg}
          src="/images/apple-mail.png"
          alt=""
          width={px}
          height={px}
        />
      </span>
    );
  }

  if (name === "gmail") {
    return (
      <span className={box}>
        <Icon
          name="gmail"
          className={styles.markLogo}
          width={size === "lg" ? 29 : 14}
          height={size === "lg" ? 22 : 11}
          aria-hidden
        />
      </span>
    );
  }

  if (name === "ac" || name === "wd") {
    return (
      <span className={box}>
        <Icon
          name={name === "ac" ? "campaignAc" : "campaignWd"}
          className={styles.markImg}
          width={px}
          height={px}
          aria-hidden
        />
        <span
          className={cn(
            styles.markLabel,
            typeClass,
            name === "ac" ? styles.acLabel : styles.wdLabel,
          )}
        >
          {name === "ac" ? "AC" : "WD"}
        </span>
      </span>
    );
  }

  if (name === "date" || name === "grid") {
    return (
      <span className={box}>
        <Icon
          name={name === "date" ? "calendarDate" : "calendarGrid"}
          className={styles.markImg}
          width={px}
          height={px}
          aria-hidden
        />
        {name === "date" ? (
          <span className={cn(styles.markLabel, typeClass, styles.dateLabel)}>18</span>
        ) : null}
      </span>
    );
  }

  return null;
}

function barCap(width: string) {
  return Number.parseFloat(width) / 100;
}

function InsightBars({
  bars,
  reduceMotion,
  delay,
}: {
  bars: [Bar, Bar];
  reduceMotion: boolean;
  delay: number;
}) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }

    progress.set(0);
    const controls = animate(progress, 1, {
      duration: FILL_DURATION,
      delay,
      ease: FILL_EASE,
    });
    return () => controls.stop();
  }, [delay, progress, reduceMotion]);

  return (
    <div className={styles.bars}>
      {bars.map((bar) => (
        <BarRow key={bar.mark} bar={bar} progress={progress} />
      ))}
    </div>
  );
}

function BarRow({ bar, progress }: { bar: Bar; progress: MotionValue<number> }) {
  const width = useTransform(progress, (value) => `${Math.min(value, barCap(bar.width)) * 100}%`);

  return (
    <div className={styles.row}>
      <Mark name={bar.mark} size="sm" />
      <div className={styles.track}>
        <motion.div className={styles.fill} data-muted={bar.muted} style={{ width }} />
      </div>
      <span className={cn(styles.value, textStyles.monoLg)} data-muted={bar.muted}>
        {bar.value}
      </span>
    </div>
  );
}

export interface InsightsProps {
  variant?: InsightsVariant;
  className?: string;
  onVariantChange?: (variant: InsightsVariant) => void;
}

export default function Insights({ variant, className, onVariantChange }: InsightsProps) {
  const [uncontrolled, setUncontrolled] = useState<InsightsVariant>("one");
  const [playing, setPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const current = variant ?? uncontrolled;
  const data = VARIANTS[current];
  const page = ORDER.indexOf(current);
  const fadeMs = reduceMotion ? 0 : 0.3;

  const go = useCallback(
    (nextIndex: number) => {
      const next = ORDER[(nextIndex + ORDER.length) % ORDER.length];
      if (variant === undefined) setUncontrolled(next);
      onVariantChange?.(next);
    },
    [onVariantChange, variant],
  );

  const autoplay = playing && variant === undefined;

  return (
    <article className={cn(styles.root, className)}>
      <div className={styles.body}>
        <CardHeader icon="insight" title="Insights" actions={HEADER_ACTIONS}>
          <Stepper
            prevLabel="Previous insight"
            nextLabel="Next insight"
            onPrev={() => go(page - 1)}
            onNext={() => go(page + 1)}
          />
        </CardHeader>

        <div className={styles.group}>
          <div className={cn(styles.columns, styles.labels, textStyles.monoMd)}>
            <p>Change</p>
            <p>Reason of change</p>
          </div>

          <div className={styles.stage}>
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={current}
                className={cn(styles.columns, styles.content, styles.stageItem)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeMs, ease: "easeInOut" }}
              >
                <div className={styles.copy}>
                  <div className={styles.copyInner}>
                    <p className={cn(styles.headline, textStyles.bodyXl)}>{data.headline}</p>
                    <p className={cn(styles.bodyText, textStyles.bodyLg)}>{data.body}</p>
                  </div>
                  <Button variant="secondary" size="l" className={styles.explain}>
                    Explain with
                    <span className={styles.lera}>
                      <span className={styles.leraGhost}>
                        <Icon name="ghost" width={11} height={12} aria-hidden />
                      </span>
                      <span className={styles.leraName}>Lera</span>
                    </span>
                  </Button>
                </div>

                <div className={styles.card}>
                  <div className={styles.pair}>
                    <Mark name={data.left} size="lg" />
                    <span className={styles.slash}>/</span>
                    <Mark name={data.right} size="lg" />
                  </div>
                  <p className={cn(styles.summary, textStyles.bodyXl)}>{data.summary}</p>
                  <div className={styles.metric}>
                    <p className={cn(styles.metricLabel, textStyles.bodyMd)}>{data.metric}</p>
                    <InsightBars bars={data.bars} reduceMotion={!!reduceMotion} delay={fadeMs} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.pager}>
          <Pager
            count={ORDER.length}
            index={page}
            duration={variant === undefined ? AUTO_MS : undefined}
            playing={autoplay}
            onChange={go}
            onComplete={() => go(page + 1)}
          />
        </div>

        <button
          type="button"
          className={styles.playback}
          aria-label={playing ? "Pause insights" : "Play insights"}
          aria-pressed={playing}
          onClick={() => setPlaying((prev) => !prev)}
        >
          <Icon name={playing ? "pause" : "playSquare"} width={18} height={18} />
        </button>
      </div>
    </article>
  );
}
