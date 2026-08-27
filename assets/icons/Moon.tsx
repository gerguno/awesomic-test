import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 16;
const HEIGHT = 16;

export const MoonIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <path
          d="M7.66825 12.05C7.02155 12.0501 6.38486 11.8815 5.81475 11.5592C5.24465 11.2369 4.7588 10.771 4.40039 10.2027C5.10732 10.1685 5.79832 9.96958 6.42386 9.62028C7.04941 9.27098 7.59401 8.77994 8.01864 8.18233C8.44327 7.58473 8.73742 6.89538 8.87999 6.16367C9.02256 5.43196 9.01004 4.67601 8.84331 3.95001C9.74002 4.24516 10.5067 4.86992 11.0043 5.71089C11.5019 6.55185 11.6973 7.55327 11.5551 8.53337C11.413 9.51346 10.9426 10.4072 10.2294 11.0525C9.51623 11.6977 8.60753 12.0517 7.66825 12.05Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
