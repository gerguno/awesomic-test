import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import DateRangeTab from "./index";

const meta = {
  title: "UI Kit/DateRangeTab",
  component: DateRangeTab,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Date range",
    icon: "calendar",
    onClick: fn(),
  },
} satisfies Meta<typeof DateRangeTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};
