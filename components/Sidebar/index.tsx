"use client";

import { useState } from "react";
import cn from "classnames";
import Logo from "@/components/Logo";
import MenuItem from "@/components/MenuItem";
import Account from "@/components/Account";
import Button from "@/components/Button";
import { type IconRegistryName } from "@/assets/icons";
import styles from "./index.module.scss";

const NAV: { id: string; label: string; icon: IconRegistryName }[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "reports", label: "Reports", icon: "report" },
  { id: "crm", label: "CRM", icon: "lineChart" },
];

export interface SidebarProps {
  collapsed?: boolean;
  activeId?: string;
  className?: string;
  onCollapsedChange?: (collapsed: boolean) => void;
  onNavigate?: (id: string) => void;
}

export default function Sidebar({
  collapsed,
  activeId = "dashboard",
  className,
  onCollapsedChange,
  onNavigate,
}: SidebarProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const isCollapsed = collapsed ?? uncontrolled;

  const setCollapsed = (next: boolean) => {
    if (collapsed === undefined) setUncontrolled(next);
    onCollapsedChange?.(next);
  };

  return (
    <aside className={cn(styles.root, isCollapsed ? styles.collapsed : styles.expanded, className)}>
      <div className={styles.top}>
        <Logo collapsed={isCollapsed} />
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              active={item.id === activeId}
              collapsed={isCollapsed}
              onClick={() => onNavigate?.(item.id)}
            >
              {item.label}
            </MenuItem>
          ))}
        </nav>
      </div>
      <Account collapsed={isCollapsed} />
      <Button
        variant="secondary"
        size="m"
        icon={isCollapsed ? "arrowRight" : "arrowLeft"}
        className={styles.toggle}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
