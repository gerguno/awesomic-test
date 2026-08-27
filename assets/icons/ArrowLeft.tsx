import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 16;
const HEIGHT = 16;

export const ArrowLeftIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M9.5 12L5.5 8L9.5 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
