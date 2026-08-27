import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 16;
const HEIGHT = 16;

export const SunIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M8.00025 10.3531C6.70269 10.3531 5.64746 9.29788 5.64746 8.00031C5.64746 6.70275 6.70269 5.64752 8.00025 5.64752C9.29782 5.64752 10.353 6.70275 10.353 8.00031C10.353 9.29788 9.29782 10.3531 8.00025 10.3531Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M13.0003 8.00034H12.5M3.5 8.00034H3.00098"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M7.99609 3.00564L7.99609 3.50598M7.99609 12.506L7.99609 13.005"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M4.46258 4.47354L4.81638 4.82734M11.1803 11.1913L11.5332 11.5442"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M4.46942 11.5442L4.82321 11.1904M11.1872 4.8264L11.54 4.47354"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </>
    ),
  }),
);
