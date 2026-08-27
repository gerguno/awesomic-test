import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const PlayIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M8.97754 16.5C13.1197 16.5 16.4775 13.1421 16.4775 9C16.4775 4.85786 13.1197 1.5 8.97754 1.5C4.8354 1.5 1.47754 4.85786 1.47754 9C1.47754 13.1421 4.8354 16.5 8.97754 16.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.55469 9.1725V7.92C6.55469 6.36 7.65719 5.7225 9.00719 6.5025L10.0947 7.1325L11.1822 7.7625C12.5322 8.5425 12.5322 9.8175 11.1822 10.5975L10.0947 11.2275L9.00719 11.8575C7.65719 12.6375 6.55469 12 6.55469 10.44V9.1725Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
