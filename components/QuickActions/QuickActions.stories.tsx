import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import QuickActions from "./index";

const meta = {
  title: "UI Kit/QuickActions",
  component: QuickActions,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    actions: [
      { id: "move", icon: "drag", label: "Move card", onClick: fn() },
      { id: "report", icon: "report", label: "Report", onClick: fn() },
      { id: "more", icon: "more", label: "More", onClick: fn() },
    ],
  },
} satisfies Meta<typeof QuickActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoActions: Story = {
  args: {
    actions: [
      { id: "move", icon: "drag", label: "Move card", onClick: fn() },
      { id: "more", icon: "more", label: "More", onClick: fn() },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    actions: [
      { id: "move", icon: "drag", label: "Move card", onClick: fn() },
      { id: "report", icon: "report", label: "Report", disabled: true },
      { id: "more", icon: "more", label: "More", onClick: fn() },
    ],
  },
};
