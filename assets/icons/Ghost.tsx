import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 30;
const HEIGHT = 30;

export const GhostIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <path
        d="M26 0V4H30V28H26V22H22V28H18V22H14V28H10V22H6V28H0V4H6V0H26ZM24 12V8H20V12H14V8H10V12H24Z"
        fill="currentColor"
      />
    ),
  }),
);
