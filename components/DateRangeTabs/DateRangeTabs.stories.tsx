import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import DateRangeTabs from "./index";

const meta = {
  title: "UI Kit/DateRangeTabs",
  component: DateRangeTabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DateRangeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
