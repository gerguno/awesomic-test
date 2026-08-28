import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DateRangeTabs, { type DateRangeId } from "@/components/DateRangeTabs";
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

export const Interactive: Story = {
  args: {
    metrics: buildStatMetrics(getDataset("week")),
  },
  render: function InteractiveStory() {
    const [range, setRange] = useState<DateRangeId>("week");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DateRangeTabs value={range} onChange={setRange} />
        <StatCards metrics={buildStatMetrics(getDataset(range))} />
      </div>
    );
  },
};
