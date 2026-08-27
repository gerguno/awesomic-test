import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "./index";

const meta = {
  title: "UI Kit/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "12" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
