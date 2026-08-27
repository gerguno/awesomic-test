"use client";

import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./index.module.scss";

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    { checked, defaultChecked = false, onCheckedChange, className, disabled, ...props },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const isChecked = checked ?? uncontrolled;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        className={cn(styles.root, className)}
        onClick={() => {
          if (disabled) return;
          const next = !isChecked;
          if (checked === undefined) setUncontrolled(next);
          onCheckedChange?.(next);
        }}
        {...props}
      >
        <span className={styles.thumb} />
      </button>
    );
  },
);

Toggle.displayName = "Toggle";

export default Toggle;
