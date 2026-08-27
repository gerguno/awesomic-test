import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 22;
const HEIGHT = 22;

export const InsightIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    fill: "none",
    children: (
      <>
        <rect x="0.5" y="0.5" width="21" height="21" rx="5.5" fill="var(--color-iris-background)" />
        <rect x="0.5" y="0.5" width="21" height="21" rx="5.5" stroke="var(--color-iris-border)" />
        <path
          d="M16.5056 9.12927H11.8542V4.18881C11.8541 4.14926 11.8411 4.11072 11.8168 4.07862C11.7926 4.04652 11.7585 4.02247 11.7192 4.00986C11.6799 3.99725 11.6374 3.99672 11.5978 4.00834C11.5581 4.01996 11.5233 4.04314 11.4982 4.07462L5.10122 12.1156C4.85468 12.4257 5.08655 12.8707 5.49442 12.8707H10.1458V17.8112C10.1459 17.8507 10.1589 17.8893 10.1832 17.9214C10.2074 17.9535 10.2415 17.9775 10.2808 17.9901C10.3201 18.0027 10.3626 18.0033 10.4022 17.9917C10.4419 17.98 10.4767 17.9569 10.5018 17.9254L16.8988 9.88475C17.1453 9.57469 16.9134 9.12927 16.5056 9.12927Z"
          stroke="var(--color-iris)"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }),
);
