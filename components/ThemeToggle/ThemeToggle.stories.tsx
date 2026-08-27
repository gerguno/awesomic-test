import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ThemeToggle from "./index";

const meta = {
  title: "UI Kit/ThemeToggle",
  component: ThemeToggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
