import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import textStyles from "@/styles/typography.module.scss";

const TYPE_STYLES = [
  { name: "headingXl", sample: "The quick brown fox" },
  { name: "headingLg", sample: "The quick brown fox" },
  { name: "headingMd", sample: "The quick brown fox" },
  { name: "bodyXl", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "bodyLg", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "bodyMd", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "monoXl", sample: "0123456789" },
  { name: "monoLg", sample: "0123456789" },
  { name: "monoMd", sample: "0123456789" },
] as const;

const SEMANTIC_COLORS = [
  "background",
  "background-muted",
  "sidebar",
  "border",
  "secondary",
  "foreground",
  "hover-dark",
  "hover-light",
  "red-background",
  "red-muted",
  "red-border",
  "red",
  "red-accent",
  "green-background",
  "green-muted",
  "green-border",
  "green",
  "green-accent",
  "orange-background",
  "orange-muted",
  "orange-border",
  "orange",
  "orange-accent",
  "iris-background",
  "iris-muted",
  "iris-border",
  "iris",
  "iris-accent",
  "brown-background",
  "brown-muted",
  "brown-border",
  "brown",
  "brown-accent",
  "crimson-background",
  "crimson-muted",
  "crimson-border",
  "crimson",
  "crimson-accent",
  "yellow-background",
  "yellow-muted",
  "yellow-border",
  "yellow",
  "yellow-accent",
  "purple-background",
  "purple-muted",
  "purple-border",
  "purple",
  "purple-accent",
] as const;

const meta = {
  title: "Foundations",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 720,
        color: "var(--color-foreground)",
      }}
    >
      {TYPE_STYLES.map((item) => (
        <div key={item.name}>
          <p
            style={{
              marginBottom: 8,
              fontFamily: "CXXM, ui-monospace, monospace",
              fontSize: 12,
              color: "var(--color-secondary)",
            }}
          >
            {item.name}
          </p>
          <p className={textStyles[item.name]}>{item.sample}</p>
        </div>
      ))}
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 12,
      }}
    >
      {SEMANTIC_COLORS.map((name) => (
        <div
          key={name}
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            overflow: "hidden",
            background: "var(--color-background-muted)",
          }}
        >
          <div style={{ height: 72, background: `var(--color-${name})` }} />
          <p
            style={{
              margin: 0,
              padding: 8,
              fontFamily: "CXXM, ui-monospace, monospace",
              fontSize: 12,
              color: "var(--color-foreground)",
            }}
          >
            {name}
          </p>
        </div>
      ))}
    </div>
  ),
};
