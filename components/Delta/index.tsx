import cn from "classnames";
import Icon from "@/components/Icon";
import { type Delta as DeltaValue } from "@/data";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface DeltaProps {
  delta: DeltaValue;
  caption?: string;
  className?: string;
}

export default function Delta({ delta, caption, className }: DeltaProps) {
  const icon =
    delta.direction === "down"
      ? "arrowBottomRight"
      : delta.direction === "up"
        ? "arrowTopRight"
        : null;

  return (
    <span className={cn(styles.root, className)}>
      {icon ? (
        <span className={styles.icon} data-tone={delta.tone}>
          <Icon name={icon} width={8} height={8} aria-hidden />
        </span>
      ) : null}
      <span className={cn(styles.value, textStyles.monoMd)} data-tone={delta.tone}>
        {delta.formatted}
      </span>
      {caption ? (
        <span className={cn(styles.caption, textStyles.monoMd)}>{caption}</span>
      ) : null}
    </span>
  );
}
