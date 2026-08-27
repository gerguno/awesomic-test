import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const CalendarIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M6 0.75V3.75"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 0.75V3.75"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.9 15.9999H11.1C14.6 15.9999 16 14.5999 16 11.0999V6.89991C16 3.39991 14.6 1.99991 11.1 1.99991H6.9C3.4 1.99991 2 3.39991 2 6.89991V11.0999C2 14.5999 3.4 15.9999 6.9 15.9999Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 8.5L7.5 8.5M5.5 11.5H7.5M10.5 8.5L12.5 8.5M10.5 11.5H12.5"
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
