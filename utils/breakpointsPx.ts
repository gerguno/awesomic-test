/**
 * JS-side breakpoints. Single source of truth: `styles/breakpoints.module.scss`
 * (bridged via CSS Modules `:export`).
 */
import bp from "@/styles/breakpoints.module.scss";

const toPx = (value: string) => parseInt(value, 10);

export const BREAKPOINTS = {
  xs: toPx(bp.bpXs),
  s: toPx(bp.bpS),
  m: toPx(bp.bpM),
  l: toPx(bp.bpL),
  xl: toPx(bp.bpXl),
};
