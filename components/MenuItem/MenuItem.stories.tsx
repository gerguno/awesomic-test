import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import MenuItem from "./index";

const meta = {
  title: "UI Kit/MenuItem",
  component: MenuItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Dashboard",
    icon: "dashboard",
    onClick: fn(),
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const Collapsed: Story = {
  args: { collapsed: true, "aria-label": "Dashboard" },
};

export const CollapsedActive: Story = {
  args: { collapsed: true, active: true, "aria-label": "Dashboard" },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 208 }}>
        <MenuItem icon="dashboard">Dashboard</MenuItem>
        <MenuItem icon="dashboard" active>
          Dashboard
        </MenuItem>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <MenuItem icon="dashboard" collapsed aria-label="Dashboard" />
        <MenuItem icon="dashboard" collapsed active aria-label="Dashboard" />
      </div>
    </div>
  ),
};
