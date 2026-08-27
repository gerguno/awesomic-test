import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./index";

const meta = {
  title: "UI Kit/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Button",
    icon: "placeholder",
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary"] },
    size: { control: "inline-radio", options: ["l", "m"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", size: "l" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "l" },
};

export const PrimaryIcon: Story = {
  args: { variant: "primary", size: "m" },
};

export const SecondaryIcon: Story = {
  args: { variant: "secondary", size: "m" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Button variant="primary" icon="placeholder">
          Button
        </Button>
        <Button variant="primary" icon="placeholder" disabled>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Button variant="secondary" icon="placeholder">
          Button
        </Button>
        <Button variant="secondary" icon="placeholder" disabled>
          Button
        </Button>
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Button variant="primary" size="m" />
        <Button variant="primary" size="m" disabled />
        <Button variant="secondary" size="m" />
        <Button variant="secondary" size="m" disabled />
      </div>
    </div>
  ),
};
