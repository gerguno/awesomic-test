import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "@/components/Button";
import textStyles from "@/styles/typography.module.scss";
import RollingNumber from "./index";

const SAMPLES = ["3,793", "22.8%", "2.1%", "$79", "$1.24k", "12,480", "18.4%", "$842"];

const meta = {
  title: "UI Kit/RollingNumber",
  component: RollingNumber,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    className: { control: false },
  },
} satisfies Meta<typeof RollingNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = {
  args: { value: "3,793" },
  decorators: [
    (Story) => (
      <p className={textStyles.monoXl}>
        <Story />
      </p>
    ),
  ],
};

export const Playground: Story = {
  args: { value: SAMPLES[0] },
  render: function PlaygroundStory() {
    const [index, setIndex] = useState(0);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
        <p className={textStyles.monoXl}>
          <RollingNumber value={SAMPLES[index] ?? SAMPLES[0]} />
        </p>
        <Button
          variant="secondary"
          size="m"
          icon="refresh"
          onClick={() => setIndex((current) => (current + 1) % SAMPLES.length)}
        >
          Next value
        </Button>
      </div>
    );
  },
};
