import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";

export interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export default function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div className={cn(styles.root, collapsed ? styles.collapsed : styles.expanded, className)}>
      <span className={styles.mark}>
        <Icon name="logoSymbol" width={27} height={28} />
      </span>
      {collapsed ? null : <span className={styles.wordmark}>Micra</span>}
    </div>
  );
}
