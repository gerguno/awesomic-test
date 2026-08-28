import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Icon from "@/components/Icon";
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

export const IconOnly: Story = {
  args: {
    "aria-label": "Add tab",
    children: <Icon name="plus" width={16} height={16} />,
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      <TabItem active>Text</TabItem>
      <TabItem>Text</TabItem>
      <TabItem aria-label="Add tab">
        <Icon name="plus" width={16} height={16} />
      </TabItem>
    </div>
  ),
};
