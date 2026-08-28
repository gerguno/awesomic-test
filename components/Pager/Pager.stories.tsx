import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Pager from "./index";

const meta = {
  title: "UI Kit/Pager",
  component: Pager,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    count: 5,
    index: 1,
    onChange: fn(),
    onComplete: fn(),
  },
} satisfies Meta<typeof Pager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Timed: Story = {
  args: {
    duration: 5000,
    playing: true,
    index: 2,
  },
};
