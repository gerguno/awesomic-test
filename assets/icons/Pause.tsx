import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

function Frame() {
  return (
    <path
      d="M6.9 16H11.1C14.6 16 16 14.6 16 11.1V6.9C16 3.4 14.6 2 11.1 2H6.9C3.4 2 2 3.4 2 6.9V11.1C2 14.6 3.4 16 6.9 16Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export const PauseIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <Frame />
        <path
          d="M8 7V11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 7V11"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);

export const PlaySquareIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <Frame />
        <g transform="translate(6.97 5.103)">
          <path
            d="M3.88328 2.80228C4.62993 3.34111 4.62993 4.45286 3.88328 4.99169L2.14021 6.24961C1.24736 6.89395 0.000195324 6.25597 0.000195324 5.1549V2.63906C0.000195324 1.538 1.24736 0.900026 2.14021 1.54436L3.88328 2.80228Z"
            fill="currentColor"
          />
        </g>
      </>
    ),
  }),
);
