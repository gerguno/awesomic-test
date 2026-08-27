import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 18;
const HEIGHT = 18;

export const DashboardIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M12.875 7H14.125C15.375 7 16 6.375 16 5.125V3.875C16 2.625 15.375 2 14.125 2H12.875C11.625 2 11 2.625 11 3.875V5.125C11 6.375 11.625 7 12.875 7Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.875 16H5.125C6.375 16 7 15.375 7 14.125V12.875C7 11.625 6.375 11 5.125 11H3.875C2.625 11 2 11.625 2 12.875V14.125C2 15.375 2.625 16 3.875 16Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7C5.88071 7 7 5.88071 7 4.5C7 3.11929 5.88071 2 4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88071 3.11929 7 4.5 7Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 16C14.8807 16 16 14.8807 16 13.5C16 12.1193 14.8807 11 13.5 11C12.1193 11 11 12.1193 11 13.5C11 14.8807 12.1193 16 13.5 16Z"
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
