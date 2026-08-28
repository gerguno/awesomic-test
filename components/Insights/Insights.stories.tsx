import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Insights from "./index";

const meta = {
  title: "UI Kit/Insights",
  component: Insights,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    onVariantChange: fn(),
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["one", "two", "three"] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 608 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Insights>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};

export const AppleMail: Story = {
  args: { variant: "one" },
};

export const CampaignMix: Story = {
  args: { variant: "two" },
};

export const Winback: Story = {
  args: { variant: "three" },
};
