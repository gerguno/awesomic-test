import type { ReactNode } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import QuickActions, { type QuickAction } from "@/components/QuickActions";
import { type IconRegistryName } from "@/assets/icons";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface CardHeaderProps {
  title: string;
  icon?: IconRegistryName;
  actions?: QuickAction[];
  className?: string;
  /** Control groups sitting next to the quick actions panel, e.g. a Stepper. */
  children?: ReactNode;
}

export default function CardHeader({
  title,
  icon,
  actions,
  className,
  children,
}: CardHeaderProps) {
  return (
    <header className={cn(styles.root, className)}>
      <div className={styles.title}>
        {icon ? (
          <span className={styles.icon}>
            <Icon name={icon} width={22} height={22} />
          </span>
        ) : null}
        <p className={cn(styles.label, textStyles.bodyXl)}>{title}</p>
      </div>
      <div className={styles.tools}>
        {children}
        {actions && actions.length > 0 ? <QuickActions actions={actions} /> : null}
      </div>
    </header>
  );
}
