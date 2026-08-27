import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const ImageIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M6.99967 15.6667H10.9997C14.333 15.6667 15.6663 14.3333 15.6663 11V7.00001C15.6663 3.66668 14.333 2.33334 10.9997 2.33334H6.99967C3.66634 2.33334 2.33301 3.66668 2.33301 7.00001V11C2.33301 14.3333 3.66634 15.6667 6.99967 15.6667Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.00033 7.66667C7.73671 7.66667 8.33366 7.06971 8.33366 6.33333C8.33366 5.59695 7.73671 5 7.00033 5C6.26395 5 5.66699 5.59695 5.66699 6.33333C5.66699 7.06971 6.26395 7.66667 7.00033 7.66667Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.78027 13.6333L6.06694 11.4267C6.59361 11.0733 7.35361 11.1133 7.82694 11.52L8.04694 11.7133C8.56694 12.16 9.40694 12.16 9.92694 11.7133L12.7003 9.33332C13.2203 8.88665 14.0603 8.88665 14.5803 9.33332L15.6669 10.2667"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
