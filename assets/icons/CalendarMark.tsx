import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 32;
const HEIGHT = 32;
const VIEW_BOX = "0 0 32 32";

function Tile({ body, header, cells }: { body: string; header: string; cells?: boolean }) {
  return (
    <>
      <rect width="32" height="32" rx="4" fill={body} />
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V8H0V4Z"
        fill={header}
      />
      {cells
        ? [
            [5, 12.5],
            [14, 12.5],
            [23, 12.5],
            [5, 21.5],
            [14, 21.5],
            [23, 21.5],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="2" fill={header} />
          ))
        : null}
    </>
  );
}

export const CalendarDateIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: VIEW_BOX,
    fill: "none",
    children: (
      <Tile body="var(--color-crimson-border)" header="var(--color-crimson)" />
    ),
  }),
);

export const CalendarGridIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: VIEW_BOX,
    fill: "none",
    children: (
      <Tile body="var(--color-border)" header="var(--color-secondary)" cells />
    ),
  }),
);
