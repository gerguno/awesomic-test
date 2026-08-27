import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Lera from "./index";

const meta = {
  title: "UI Kit/Lera",
  component: Lera,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    question: "Why did open rate fall while sends grew?",
    onClose: fn(),
    onCollapse: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ height: 720, paddingLeft: 8, maxWidth: 432 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Lera>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
