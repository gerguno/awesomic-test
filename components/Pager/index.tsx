"use client";

import { useEffect, useEffectEvent } from "react";
import cn from "classnames";
import styles from "./index.module.scss";

export interface PagerProps {
  count?: number;
  index?: number;
  duration?: number;
  playing?: boolean;
  className?: string;
  onChange?: (index: number) => void;
  onComplete?: () => void;
}

export default function Pager({
  count = 5,
  index = 1,
  duration,
  playing = true,
  className,
  onChange,
  onComplete,
}: PagerProps) {
  const timed = duration != null && duration > 0;
  const onCompleteEvent = useEffectEvent(() => {
    onComplete?.();
  });

  useEffect(() => {
    if (!timed || !playing) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => onCompleteEvent(), duration);
    return () => window.clearTimeout(id);
  }, [timed, playing, duration, index]);

  return (
    <div
      className={cn(styles.root, className)}
      role="tablist"
      aria-label="Pages"
      style={
        timed
          ? {
              ["--pager-duration" as string]: `${duration}ms`,
              ["--pager-play" as string]: playing ? "running" : "paused",
            }
          : undefined
      }
    >
      {Array.from({ length: count }, (_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Page ${i + 1}`}
            aria-selected={active}
            data-active={active}
            data-timed={timed || undefined}
            className={styles.dot}
            onClick={() => onChange?.(i)}
          >
            <span
              className={styles.fill}
              onAnimationEnd={
                active && timed
                  ? (event) => {
                      if (event.target !== event.currentTarget) return;
                      if (!playing) return;
                      onComplete?.();
                    }
                  : undefined
              }
            />
          </button>
        );
      })}
    </div>
  );
}
