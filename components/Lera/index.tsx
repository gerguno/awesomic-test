"use client";

import cn from "classnames";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

function GhostMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path
        d="M26 0V4H30V28H26V22H22V28H18V22H14V28H10V22H6V28H0V4H6V0H26ZM24 12V8H20V12H14V8H10V12H24Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface LeraProps {
  question?: string;
  className?: string;
  onClose?: () => void;
  onCollapse?: () => void;
}

export default function Lera({
  question = "Why did open rate fall while sends grew?",
  className,
  onClose,
  onCollapse,
}: LeraProps) {
  return (
    <aside className={cn(styles.root, className)}>
      <div className={styles.message}>
        <div className={styles.identity}>
          <span className={styles.ghost}>
            <GhostMark />
          </span>
          <div className={styles.nameWrap}>
            <p className={textStyles.headingMd}>Lera</p>
            <span className={cn(styles.badge, textStyles.monoMd)}>AI</span>
          </div>
        </div>
        <p className={textStyles.bodyLg}>{question}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.action} aria-label="Copy">
            <Icon name="copy" width={18} height={18} />
          </button>
          <button type="button" className={styles.action} aria-label="Regenerate">
            <Icon name="refresh" width={18} height={18} />
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.suggestions}>
          <Button variant="secondary" size="l" className={styles.suggestion}>
            My ESP isn&apos;t connected
          </Button>
          <Button variant="secondary" size="l" className={styles.suggestion}>
            Talk with a Support Analyst
          </Button>
        </div>
        <div className={styles.composer}>
          <div className={styles.field}>
            <div className={styles.fieldMain}>
              <Button variant="secondary" size="m" icon="image" aria-label="Attach image" />
              <input className={cn(styles.prompt, textStyles.bodyXl)} placeholder="How can I help you?" />
            </div>
            <Button variant="primary" size="m" icon="play" aria-label="Send" />
          </div>
        </div>
      </div>
      <div className={styles.chrome}>
        <Button variant="secondary" size="m" icon="minus" aria-label="Minimize" />
        <Button variant="secondary" size="m" icon="close" aria-label="Close" onClick={onClose} />
      </div>
      <button type="button" className={styles.handle} aria-label="Collapse assistant" onClick={onCollapse}>
        <Icon name="collapse" width={16} height={16} />
      </button>
    </aside>
  );
}
