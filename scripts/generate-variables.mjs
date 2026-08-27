import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const colors = JSON.parse(readFileSync(join(root, "scripts/atomic-colors.json"), "utf8"));

function cssName(family, step) {
  return `--color-${family}-${step}`;
}

function atomicBlock(mode) {
  const lines = [];
  for (const [family, scales] of Object.entries(colors)) {
    for (let i = 0; i < scales[mode].length; i += 1) {
      lines.push(`  ${cssName(family, i + 1)}: ${scales[mode][i]};`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

const spaces = [
  ["2xs", "2px"],
  ["xs", "4px"],
  ["s", "8px"],
  ["m", "12px"],
  ["l", "16px"],
  ["xl", "20px"],
  ["2xl", "24px"],
  ["3xl", "28px"],
  ["4xl", "32px"],
  ["5xl", "36px"],
  ["6xl", "40px"],
  ["7xl", "44px"],
  ["8xl", "48px"],
  ["9xl", "52px"],
  ["10xl", "56px"],
  ["11xl", "60px"],
  ["12xl", "64px"],
  ["13xl", "68px"],
  ["14xl", "72px"],
  ["15xl", "76px"],
  ["16xl", "80px"],
  ["17xl", "84px"],
];

const semantic = [
  ["background", "var(--color-white)"],
  ["background-muted", "var(--color-sage-1)"],
  ["sidebar", "var(--color-sage-2)"],
  ["border", "var(--color-sage-6)"],
  ["secondary", "var(--color-sage-10)"],
  ["foreground", "var(--color-black)"],
  ["hover", "#1a211e12"],
  ["red-background", "var(--color-tomato-2)"],
  ["red-muted", "var(--color-tomato-4)"],
  ["red-border", "var(--color-tomato-6)"],
  ["red", "var(--color-tomato-9)"],
  ["red-accent", "var(--color-tomato-11)"],
  ["green-background", "var(--color-grass-2)"],
  ["green-muted", "var(--color-grass-4)"],
  ["green-border", "var(--color-grass-6)"],
  ["green", "var(--color-grass-9)"],
  ["green-accent", "var(--color-grass-11)"],
  ["orange-background", "var(--color-orange-2)"],
  ["orange-muted", "var(--color-orange-4)"],
  ["orange-border", "var(--color-orange-6)"],
  ["orange", "var(--color-orange-9)"],
  ["orange-accent", "var(--color-orange-11)"],
  ["iris-background", "var(--color-iris-2)"],
  ["iris-muted", "var(--color-iris-4)"],
  ["iris-border", "var(--color-iris-6)"],
  ["iris", "var(--color-iris-9)"],
  ["iris-accent", "var(--color-iris-11)"],
  ["brown-background", "var(--color-brown-2)"],
  ["brown-muted", "var(--color-brown-4)"],
  ["brown-border", "var(--color-brown-6)"],
  ["brown", "var(--color-brown-9)"],
  ["brown-accent", "var(--color-brown-11)"],
  ["crimson-background", "var(--color-crimson-2)"],
  ["crimson-muted", "var(--color-crimson-4)"],
  ["crimson-border", "var(--color-crimson-6)"],
  ["crimson", "var(--color-crimson-9)"],
  ["crimson-accent", "var(--color-crimson-11)"],
  ["yellow-background", "var(--color-yellow-2)"],
  ["yellow-muted", "var(--color-yellow-4)"],
  ["yellow-border", "var(--color-yellow-6)"],
  ["yellow", "var(--color-yellow-9)"],
  ["yellow-accent", "var(--color-yellow-11)"],
  ["purple-background", "var(--color-purple-2)"],
  ["purple-muted", "var(--color-purple-4)"],
  ["purple-border", "var(--color-purple-6)"],
  ["purple", "var(--color-purple-9)"],
  ["purple-accent", "var(--color-purple-11)"],
];

const scss = `:root {
  //////////////////////////////
  // ATOMIC
  //////////////////////////////

  // COLORS
${atomicBlock("light")}  --color-black: var(--color-sage-12);
  --color-white: #ffffff;

  // FONTS
  --font-heading: "P22 Mackinac", Georgia, "Times New Roman", serif;
  --font-body: "Circular XX", Helvetica, Arial, sans-serif;
  --font-mono: "Circular XX Mono", ui-monospace, SFMono-Regular, monospace;

  // SPACES
${spaces.map(([name, value]) => `  --space-${name}: ${value};`).join("\n")}

  //////////////////////////////
  // SEMANTIC
  //////////////////////////////

  // COLORS
${semantic.map(([name, value]) => `  --color-${name}: ${value};`).join("\n")}
}

[data-theme="dark"] {
${atomicBlock("dark")}  --color-black: #ffffff;
  --color-white: var(--color-sage-1);
}
`;

writeFileSync(join(root, "styles/_variables.scss"), scss);
console.log("wrote styles/_variables.scss");
