import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import { type IconRegistryName } from "@/assets/icons";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconRegistryName;
  active?: boolean;
  collapsed?: boolean;
  children?: ReactNode;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    { icon = "dashboard", active = false, collapsed = false, className, children, type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          styles.root,
          collapsed ? styles.collapsed : styles.expanded,
          active && styles.active,
          className,
        )}
        {...props}
      >
        <span className={styles.icon}>
          <Icon name={icon} width={18} height={18} />
        </span>
        {collapsed ? null : <span className={cn(styles.label, textStyles.bodyLg)}>{children}</span>}
      </button>
    );
  },
);

MenuItem.displayName = "MenuItem";

export default MenuItem;
