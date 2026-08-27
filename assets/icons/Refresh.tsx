import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const RefreshIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M11.1671 3.06472C10.5146 2.86972 9.79457 2.74222 8.99957 2.74222C5.40707 2.74222 2.49707 5.65222 2.49707 9.24472C2.49707 12.8447 5.40707 15.7547 8.99957 15.7547C12.5921 15.7547 15.5021 12.8447 15.5021 9.25222C15.5021 7.91722 15.0971 6.67222 14.4071 5.63722"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0972 3.24467L9.92969 0.754669"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.0978 3.24466L9.57031 5.08966"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
