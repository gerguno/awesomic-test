"use client";

import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import TabItem from "@/components/TabItem";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./index.module.scss";

export type TabOption = {
  id: string;
  label: string;
};

export interface TabsProps {
  tabs?: TabOption[];
  value?: string;
  className?: string;
  onChange?: (id: string) => void;
  onAdd?: () => void;
}

const DEFAULT_TABS: TabOption[] = [
  { id: "one", label: "Text" },
  { id: "two", label: "Text" },
];

export default function Tabs({
  tabs = DEFAULT_TABS,
  value,
  className,
  onChange,
  onAdd,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(tabs[0]?.id ?? "");
  const selected = value ?? uncontrolled;

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.list} role="tablist">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            active={tab.id === selected}
            onClick={() => {
              if (value === undefined) setUncontrolled(tab.id);
              onChange?.(tab.id);
            }}
          >
            {tab.label}
          </TabItem>
        ))}
        <button type="button" className={styles.add} aria-label="Add tab" onClick={onAdd}>
          <Icon name="plus" width={16} height={16} />
        </button>
      </div>
      <ThemeToggle />
    </div>
  );
}
