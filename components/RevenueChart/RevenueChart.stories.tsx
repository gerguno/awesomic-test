import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { buildComparisonSeries, getDataset } from "@/data";
import RevenueChart from "./index";

const meta = {
  title: "UI Kit/RevenueChart",
  component: RevenueChart,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    series: { control: false },
    granularity: { control: false },
    tickCount: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 0, maxWidth: 760 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RevenueChart>;

export default meta;
type Story = StoryObj<typeof meta>;

function argsFor(id: "today" | "week" | "month") {
  const dataset = getDataset(id);
  return {
    series: buildComparisonSeries(dataset),
    granularity: dataset.granularity,
    tickCount: dataset.tickCount,
  };
}

export const Week: Story = { args: argsFor("week") };
export const Today: Story = { args: argsFor("today") };
export const Month: Story = { args: argsFor("month") };
