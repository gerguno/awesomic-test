"use client";

import cn from "classnames";
import styles from "./index.module.scss";

export interface PagerProps {
  count?: number;
  index?: number;
  className?: string;
  onChange?: (index: number) => void;
}

export default function Pager({ count = 5, index = 1, className, onChange }: PagerProps) {
  return (
    <div className={cn(styles.root, className)} role="tablist" aria-label="Pages">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          data-active={i === index}
          className={styles.dot}
          onClick={() => onChange?.(i)}
        />
      ))}
    </div>
  );
}
