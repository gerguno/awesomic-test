import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import TabItem from "./index";

const meta = {
  title: "UI Kit/TabItem",
  component: TabItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Text",
    onClick: fn(),
  },
} satisfies Meta<typeof TabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};
