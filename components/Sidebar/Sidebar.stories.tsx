import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Sidebar from "./index";

const meta = {
  title: "UI Kit/Sidebar",
  component: Sidebar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    activeId: "dashboard",
    onNavigate: fn(),
    onCollapsedChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ height: 640, position: "relative" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};

export const Expanded: Story = {
  args: { collapsed: false },
};

export const Collapsed: Story = {
  args: { collapsed: true },
};
