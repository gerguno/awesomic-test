import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Account from "./index";

const meta = {
  title: "UI Kit/Account",
  component: Account,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    name: "Viggo Mortensen",
    initials: "VM",
    badge: 12,
  },
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: { collapsed: false },
};

export const Collapsed: Story = {
  args: { collapsed: true },
};
