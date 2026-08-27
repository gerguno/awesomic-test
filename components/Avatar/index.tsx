import type { HTMLAttributes } from "react";
import cn from "classnames";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  initials: string;
  size?: "sm" | "md";
}

export default function Avatar({ initials, size = "md", className, ...props }: AvatarProps) {
  return (
    <span className={cn(styles.root, styles[size], className)} {...props}>
      <span className={cn(styles.initials, size === "sm" ? textStyles.bodyMd : textStyles.bodyXl)}>
        {initials}
      </span>
    </span>
  );
}
