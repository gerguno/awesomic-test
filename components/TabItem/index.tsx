import {
  Children,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import cn from "classnames";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children?: ReactNode;
}

function isIconOnly(children: ReactNode) {
  const nodes = Children.toArray(children);
  return nodes.length > 0 && nodes.every((child) => isValidElement(child));
}

export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ active = false, className, children, type = "button", ...props }, ref) => {
    const iconOnly = isIconOnly(children);

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          styles.root,
          textStyles.bodyLg,
          active && styles.active,
          iconOnly && styles.iconOnly,
          className,
        )}
        {...props}
      >
        {iconOnly ? <span className={styles.icon}>{children}</span> : children}
      </button>
    );
  },
);

TabItem.displayName = "TabItem";

export default TabItem;
