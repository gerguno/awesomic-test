import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 22;
const HEIGHT = 22;

export const ChartIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <rect
          x="0.5"
          y="0.5"
          width="21"
          height="21"
          rx="5.5"
          fill="var(--color-orange-background)"
        />
        <rect x="0.5" y="0.5" width="21" height="21" rx="5.5" stroke="var(--color-orange-border)" />
        <path
          d="M6 17L6 13"
          stroke="var(--color-orange)"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 17L11 13"
          stroke="var(--color-orange)"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17L16 5"
          stroke="var(--color-orange)"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
