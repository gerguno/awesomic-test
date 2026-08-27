import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import { type IconRegistryName } from "@/assets/icons";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "l" | "m";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconRegistryName;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "l", icon, className, children, type = "button", ...props }, ref) => {
    const iconName = icon ?? (size === "m" ? "placeholder" : undefined);

    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.root, styles[variant], styles[size], size === "l" && textStyles.bodyLg, className)}
        {...props}
      >
        {iconName ? (
          <span className={styles.icon}>
            <Icon name={iconName} width={18} height={18} />
          </span>
        ) : null}
        {size === "l" ? children : null}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
