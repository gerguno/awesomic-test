import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Icon from "./index";
import { iconRegistry, type IconRegistryName } from "@/assets/icons";

const names = Object.keys(iconRegistry) as IconRegistryName[];

const meta = {
  title: "UI Kit/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    name: "dashboard",
  },
  argTypes: {
    name: { control: "select", options: names },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 16,
        width: 720,
      }}
    >
      {names.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            minHeight: 88,
            padding: 16,
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            background: "var(--color-background-muted)",
            color: "var(--color-foreground)",
          }}
        >
          <Icon name={name} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
