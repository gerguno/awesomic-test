import cn from "classnames";
import Button from "@/components/Button";
import styles from "./index.module.scss";

export interface StepperProps {
  prevLabel?: string;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Stepper({
  prevLabel = "Previous",
  nextLabel = "Next",
  prevDisabled,
  nextDisabled,
  className,
  onPrev,
  onNext,
}: StepperProps) {
  return (
    <div className={cn(styles.root, className)}>
      <Button
        variant="secondary"
        size="m"
        icon="arrowLeft"
        className={styles.step}
        aria-label={prevLabel}
        disabled={prevDisabled}
        onClick={onPrev}
      />
      <Button
        variant="secondary"
        size="m"
        icon="arrowRight"
        className={styles.step}
        aria-label={nextLabel}
        disabled={nextDisabled}
        onClick={onNext}
      />
    </div>
  );
}
