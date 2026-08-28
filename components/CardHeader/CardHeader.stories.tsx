import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Stepper from "@/components/Stepper";
import CardHeader from "./index";

const CARD_ACTIONS = [
  { id: "move", icon: "drag", label: "Move card", onClick: fn() },
  { id: "report", icon: "report", label: "Report", onClick: fn() },
  { id: "more", icon: "more", label: "More", onClick: fn() },
];

const meta = {
  title: "UI Kit/CardHeader",
  component: CardHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    title: "Attributed revenue",
    icon: "chart",
    actions: CARD_ACTIONS,
  },
  argTypes: {
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 608,
          border: "1px solid var(--color-border)",
          borderRadius: "var(--space-l)",
          background: "var(--color-background)",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: { title: "Journeys", icon: undefined },
};

export const WithStepper: Story = {
  args: {
    title: "Insights",
    icon: "insight",
    actions: [
      { id: "move", icon: "drag", label: "Move card", onClick: fn() },
      { id: "more", icon: "more", label: "More", onClick: fn() },
    ],
    children: <Stepper prevLabel="Previous insight" nextLabel="Next insight" />,
  },
};
