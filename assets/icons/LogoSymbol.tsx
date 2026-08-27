import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 28;
const HEIGHT = 28;

export const LogoSymbolIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path d="M2.625 2.625H6.125V25.375H2.625V2.625Z" fill="currentColor" />
        <path d="M7 7.875H10.5V19.25H7V7.875Z" fill="currentColor" />
        <path d="M12.2051 14H15.7051V25.375H12.2051V14Z" fill="currentColor" />
        <path d="M16.625 7.875H20.125V19.25H16.625V7.875Z" fill="currentColor" />
        <path d="M20.9551 2.625H24.4551V25.375H20.9551V2.625Z" fill="currentColor" />
      </>
    ),
  }),
);
