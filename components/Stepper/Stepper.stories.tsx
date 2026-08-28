import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Stepper from "./index";

const meta = {
  title: "UI Kit/Stepper",
  component: Stepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    onPrev: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AtStart: Story = {
  args: { prevDisabled: true },
};
