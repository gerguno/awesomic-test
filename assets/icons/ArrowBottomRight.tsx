import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 8;
const HEIGHT = 8;

export const ArrowBottomRightIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M2.41992 6.5L6.65993 6.5L6.65993 2.25"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66 6.5L1 0.839996"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
