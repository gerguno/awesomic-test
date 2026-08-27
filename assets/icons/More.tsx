import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const MoreIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M3.33333 7.66675C2.6 7.66675 2 8.26675 2 9.00008C2 9.73341 2.6 10.3334 3.33333 10.3334C4.06667 10.3334 4.66667 9.73341 4.66667 9.00008C4.66667 8.26675 4.06667 7.66675 3.33333 7.66675Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M14.6673 7.66675C13.934 7.66675 13.334 8.26675 13.334 9.00008C13.334 9.73341 13.934 10.3334 14.6673 10.3334C15.4007 10.3334 16.0007 9.73341 16.0007 9.00008C16.0007 8.26675 15.4007 7.66675 14.6673 7.66675Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M8.99935 7.66669C8.26602 7.66669 7.66602 8.26669 7.66602 9.00002C7.66602 9.73335 8.26602 10.3334 8.99935 10.3334C9.73268 10.3334 10.3327 9.73335 10.3327 9.00002C10.3327 8.26669 9.73268 7.66669 8.99935 7.66669Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </>
    ),
  }),
);
