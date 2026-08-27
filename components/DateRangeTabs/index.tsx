"use client";

import { useState } from "react";
import cn from "classnames";
import DateRangeTab from "@/components/DateRangeTab";
import styles from "./index.module.scss";

export type DateRangeId = "today" | "yesterday" | "week" | "month" | "custom";

const OPTIONS: { id: DateRangeId; label: string; icon?: "calendar" }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "custom", label: "Custom", icon: "calendar" },
];

export interface DateRangeTabsProps {
  value?: DateRangeId;
  className?: string;
  onChange?: (id: DateRangeId) => void;
}

export default function DateRangeTabs({
  value,
  className,
  onChange,
}: DateRangeTabsProps) {
  const [uncontrolled, setUncontrolled] = useState<DateRangeId>("week");
  const selected = value ?? uncontrolled;

  return (
    <div className={cn(styles.root, className)} role="tablist">
      {OPTIONS.map((option) => (
        <DateRangeTab
          key={option.id}
          active={option.id === selected}
          icon={option.icon}
          onClick={() => {
            if (value === undefined) setUncontrolled(option.id);
            onChange?.(option.id);
          }}
        >
          {option.label}
        </DateRangeTab>
      ))}
    </div>
  );
}
