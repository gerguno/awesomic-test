import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import { type IconRegistryName } from "@/assets/icons";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface DateRangeTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: IconRegistryName;
  children?: ReactNode;
}

export const DateRangeTab = forwardRef<HTMLButtonElement, DateRangeTabProps>(
  ({ active = false, icon, className, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.root, textStyles.bodyLg, active && styles.active, className)}
        {...props}
      >
        {icon ? (
          <span className={styles.icon}>
            <Icon name={icon} width={18} height={18} />
          </span>
        ) : null}
        {children}
      </button>
    );
  },
);

DateRangeTab.displayName = "DateRangeTab";

export default DateRangeTab;
