import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const ReportIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M6.9 16.0002H11.1C14.6 16.0002 16 14.6002 16 11.1002V6.90015C16 3.40015 14.6 2.00015 11.1 2.00015H6.9C3.4 2.00015 2 3.40015 2 6.90015V11.1002C2 14.6002 3.4 16.0002 6.9 16.0002Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.7031 4.45953V5.95953C10.7031 6.78453 11.3781 7.45953 12.2031 7.45953H13.7031"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 9.29736H8.05688"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 12.2974H12"
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
