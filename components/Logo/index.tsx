import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";

export interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export default function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div
      className={cn(styles.root, collapsed ? styles.collapsed : styles.expanded, className)}
      role="img"
      aria-label="Micra"
    >
      <span className={styles.mark} aria-hidden="true">
        <Icon name="logoSymbol" width={27} height={28} />
      </span>
      <span className={styles.wordmark} aria-hidden="true">
        <Icon name="logoWordmark" width={68} height={14} />
      </span>
    </div>
  );
}
