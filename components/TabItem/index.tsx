import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import cn from "classnames";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children?: ReactNode;
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ active = false, className, children, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.root, textStyles.bodyLg, active && styles.active, className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TabItem.displayName = "TabItem";

export default TabItem;
