"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

const MIN_WIDTH = 320;
const MAX_WIDTH = 432;
const DEFAULT_WIDTH = 360;
const WIDTH_STEP = 16;

function clampWidth(value: number) {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(value)));
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
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    if (!dragging) return;

    const { body } = document;
    const cursor = body.style.cursor;
    const userSelect = body.style.userSelect;
    body.style.cursor = "col-resize";
    body.style.userSelect = "none";

    return () => {
      body.style.cursor = cursor;
      body.style.userSelect = userSelect;
    };
  }, [dragging]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startX: event.clientX, startWidth: width };
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const delta = dragRef.current.startX - event.clientX;
    setWidth(clampWidth(dragRef.current.startWidth + delta));
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setWidth((current) => clampWidth(current + WIDTH_STEP));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setWidth((current) => clampWidth(current - WIDTH_STEP));
    } else if (event.key === "Home") {
      event.preventDefault();
      setWidth(MAX_WIDTH);
    } else if (event.key === "End") {
      event.preventDefault();
      setWidth(MIN_WIDTH);
    }
  };

  return (
    <aside className={cn(styles.root, className)} style={{ width }}>
      <div className={styles.message}>
        <div className={styles.identity}>
          <span className={styles.ghost}>
            <Icon name="ghost" width={30} height={30} aria-hidden />
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
        <Button variant="secondary" size="m" icon="minus" aria-label="Minimize" onClick={onCollapse} />
        <Button variant="secondary" size="m" icon="close" aria-label="Close" onClick={onClose} />
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize assistant"
        aria-valuenow={width}
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        tabIndex={0}
        className={cn(styles.handle, dragging && styles.dragging)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={onKeyDown}
      >
        <Icon name="grip" width={16} height={16} aria-hidden />
      </div>
    </aside>
  );
}
