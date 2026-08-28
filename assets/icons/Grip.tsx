import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 16;
const HEIGHT = 16;

export const GripIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <path
        d="M8.00501 3L8.005 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  }),
);
