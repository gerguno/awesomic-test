import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Toggle from "./index";

const meta = {
  title: "UI Kit/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    "aria-label": "Toggle",
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = {
  args: { defaultChecked: true },
};

export const DisabledOff: Story = {
  args: { disabled: true },
};

export const DisabledOn: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Toggle aria-label="Off" />
      <Toggle aria-label="On" defaultChecked />
      <Toggle aria-label="Off disabled" disabled />
      <Toggle aria-label="On disabled" defaultChecked disabled />
    </div>
  ),
};
