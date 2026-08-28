import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = 32;
const HEIGHT = 32;
const VIEW_BOX = "0 0 31.8405 32.0578";

function Paper({ body, fold }: { body: string; fold: string }) {
  return (
    <>
      <path
        d="M22.3109 9.47287e-05C22.3109 -0.00522301 22.5183 0.214678 22.5183 0.324477V6.40332C22.5184 7.90697 23.7374 9.12601 25.241 9.12601H31.3199C31.4979 9.126 31.6718 9.10812 31.8404 9.07549V28.0577C31.8404 30.2669 30.0495 32.0578 27.8404 32.0578H4.00002C1.79088 32.0578 1.69277e-05 30.2669 1.69277e-05 28.0578L1.69277e-05 4.00009C1.69277e-05 1.79096 1.79088 9.47287e-05 4.00002 9.47287e-05L22.3109 9.47287e-05Z"
        fill={body}
      />
      <path
        d="M31.8405 9.08415C31.6873 9.11091 31.53 9.12601 31.3692 9.12603H24.3111C23.2065 9.12603 22.3111 8.2306 22.3111 7.12603V0.324578C22.3111 0.21478 22.3107 -0.00516969 22.3105 0.00014801L31.8405 9.08415Z"
        fill={fold}
      />
    </>
  );
}

export const CampaignAcIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: VIEW_BOX,
    fill: "none",
    children: <Paper body="var(--color-iris-border)" fold="var(--color-iris-muted)" />,
  }),
);

export const CampaignWdIcon = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: VIEW_BOX,
    fill: "none",
    children: <Paper body="var(--color-orange-border)" fold="var(--color-orange-muted)" />,
  }),
);
