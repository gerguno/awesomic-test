"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

// How far into the width animation the content hands over. 0.5 puts the crossfade
// across the midpoint so it overlaps the width instead of queueing behind it.
const HANDOFF_RATIO = 0.5;

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
  const rootRef = useRef<HTMLElement>(null);
  const [uncontrolled, setUncontrolled] = useState(false);
  const isCollapsed = collapsed ?? uncontrolled;

  const [contentCollapsed, setContentCollapsed] = useState(isCollapsed);
  const isAnimating = contentCollapsed !== isCollapsed;

  const [layerIndex, setLayerIndex] = useState(0);

  const reduceMotion = useReducedMotion();
  const fadeDuration = reduceMotion ? 0 : 0.16;

  useEffect(() => {
    if (!isAnimating) return;
    const root = rootRef.current;
    const widthMs = root ? parseFloat(getComputedStyle(root).transitionDuration) * 1000 : 0;
    const timer = window.setTimeout(() => {
      setContentCollapsed(isCollapsed);
      setLayerIndex((index) => index + 1);
    }, widthMs * HANDOFF_RATIO);
    return () => window.clearTimeout(timer);
  }, [isAnimating, isCollapsed]);

  const setCollapsed = (next: boolean) => {
    if (collapsed === undefined) setUncontrolled(next);
    onCollapsedChange?.(next);
  };

  return (
    <aside
      ref={rootRef}
      className={cn(styles.root, isCollapsed ? styles.collapsed : styles.expanded, className)}
    >
      <div className={styles.viewport}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={contentCollapsed ? "collapsed" : "expanded"}
            className={styles.layer}
            style={{ zIndex: layerIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0, delay: fadeDuration } }}
            transition={{ duration: fadeDuration, ease: "easeOut" }}
          >
            <div
              className={cn(
                styles.inner,
                contentCollapsed ? styles.contentCollapsed : styles.contentExpanded,
              )}
            >
              <div className={styles.top}>
                <Logo collapsed={contentCollapsed} />
                <nav className={styles.nav}>
                  {NAV.map((item) => (
                    <MenuItem
                      key={item.id}
                      icon={item.icon}
                      active={item.id === activeId}
                      collapsed={contentCollapsed}
                      onClick={() => onNavigate?.(item.id)}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </nav>
              </div>
              <Account collapsed={contentCollapsed} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Button
        variant="secondary"
        size="m"
        icon={isCollapsed ? "expand" : "collapse"}
        className={styles.toggle}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!isCollapsed)}
      />
    </aside>
  );
}
