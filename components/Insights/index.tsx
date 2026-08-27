"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Pager from "@/components/Pager";
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

function GhostMark() {
  return (
    <svg width="11" height="12" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path
        d="M26 0V4H30V28H26V22H22V28H18V22H14V28H10V22H6V28H0V4H6V0H26ZM24 12V8H20V12H14V8H10V12H24Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Mark({ name, size }: { name: Bar["mark"]; size: "lg" | "sm" }) {
  const box = cn(styles.mark, size === "lg" ? styles.markLg : styles.markSm);
  const typeClass = size === "sm" ? textStyles.monoMd : textStyles.monoLg;

  if (name === "apple") {
    return (
      <span className={box}>
        <img className={styles.markImg} src="/images/apple-mail.png" alt="" width={size === "lg" ? 32 : 16} height={size === "lg" ? 32 : 16} />
      </span>
    );
  }

  if (name === "gmail") {
    return (
      <span className={box}>
        <img className={styles.markImg} src="/images/gmail.svg" alt="" width={size === "lg" ? 29 : 14} height={size === "lg" ? 22 : 11} />
      </span>
    );
  }

  if (name === "ac" || name === "wd") {
    return (
      <span className={box}>
        <img
          className={styles.markImg}
          src={name === "ac" ? "/images/campaign-ac.svg" : "/images/campaign-wd.svg"}
          alt=""
        />
        <span className={cn(styles.markLabel, typeClass, name === "ac" ? styles.acLabel : styles.wdLabel)}>
          {name === "ac" ? "AC" : "WD"}
        </span>
      </span>
    );
  }

  if (name === "date") {
    return (
      <span className={cn(box, styles.dateMark)}>
        <span className={cn(styles.markLabel, typeClass)}>18</span>
      </span>
    );
  }

  return (
    <span className={cn(box, styles.gridMark)}>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className={styles.gridCell} />
      ))}
    </span>
  );
}

export interface InsightsProps {
  variant?: InsightsVariant;
  className?: string;
  onVariantChange?: (variant: InsightsVariant) => void;
}

export default function Insights({ variant, className, onVariantChange }: InsightsProps) {
  const [uncontrolled, setUncontrolled] = useState<InsightsVariant>("one");
  const current = variant ?? uncontrolled;
  const data = VARIANTS[current];
  const page = ORDER.indexOf(current);

  const go = (nextIndex: number) => {
    const next = ORDER[(nextIndex + ORDER.length) % ORDER.length];
    if (variant === undefined) setUncontrolled(next);
    onVariantChange?.(next);
  };

  return (
    <article className={cn(styles.root, className)}>
      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.title}>
            <span className={styles.titleIcon}>
              <Icon name="insight" width={22} height={22} />
            </span>
            <p className={textStyles.bodyXl}>Insights</p>
          </div>
          <div className={styles.tools}>
            <div className={styles.stepper}>
              <button type="button" className={styles.step} aria-label="Previous insight" onClick={() => go(page - 1)}>
                <Icon name="arrowLeft" width={16} height={16} />
              </button>
              <button type="button" className={styles.step} aria-label="Next insight" onClick={() => go(page + 1)}>
                <Icon name="arrowRight" width={16} height={16} />
              </button>
            </div>
            <Button variant="secondary" size="m" icon="expand" className={styles.toolBtn} aria-label="Expand" />
            <Button variant="secondary" size="m" icon="more" className={styles.toolBtn} aria-label="More" />
          </div>
        </header>

        <div className={cn(styles.columns, styles.labels, textStyles.monoMd)}>
          <p>Change</p>
          <p>Reason of change</p>
        </div>

        <div className={cn(styles.columns, styles.content)}>
          <div className={styles.copy}>
            <p className={cn(styles.headline, textStyles.bodyXl)}>{data.headline}</p>
            <p className={cn(styles.bodyText, textStyles.bodyLg)}>{data.body}</p>
            <Button variant="secondary" size="l" className={styles.explain}>
              Explain with
              <span className={styles.lera}>
                <span className={styles.leraGhost}>
                  <GhostMark />
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
              <div className={styles.bars}>
                {data.bars.map((bar) => (
                  <div key={bar.mark} className={styles.row}>
                    <Mark name={bar.mark} size="sm" />
                    <div className={styles.track}>
                      <div className={styles.fill} data-muted={bar.muted} style={{ width: bar.width }} />
                    </div>
                    <span className={cn(styles.value, textStyles.monoLg)} data-muted={bar.muted}>
                      {bar.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pager}>
        <Pager count={3} index={page} onChange={go} />
      </div>
    </article>
  );
}
