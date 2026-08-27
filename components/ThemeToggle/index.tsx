"use client";

import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.root}
      aria-label="Toggle color theme"
      onClick={() => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
          document.documentElement.removeAttribute("data-theme");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
        }
        try {
          localStorage.setItem("theme", isDark ? "light" : "dark");
        } catch {
          // ignore
        }
      }}
    >
      <span className={styles.thumb} />
      <span className={cn(styles.icon, styles.moon)}>
        <Icon name="moon" width={16} height={16} />
      </span>
      <span className={cn(styles.icon, styles.sun)}>
        <Icon name="sun" width={16} height={16} />
      </span>
    </button>
  );
}
