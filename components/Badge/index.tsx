import type { HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export default function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(styles.root, textStyles.monoMd, className)} {...props}>
      {children}
    </span>
  );
}
