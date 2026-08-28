import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { buildStatMetrics, getDataset } from "@/data";
import StatCards from "./index";

const meta = {
  title: "UI Kit/StatCards",
  component: StatCards,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    metrics: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof StatCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Week: Story = {
  args: {
    metrics: buildStatMetrics(getDataset("week")),
  },
};

export const Today: Story = {
  args: {
    metrics: buildStatMetrics(getDataset("today")),
  },
};

export const Month: Story = {
  args: {
    metrics: buildStatMetrics(getDataset("month")),
  },
};
