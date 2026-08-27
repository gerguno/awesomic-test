import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets/icons");
mkdirSync(outDir, { recursive: true });

const ATTR_MAP = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "clip-path": "clipPath",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
};

const COLOR_MAP = {
  black: "currentColor",
  "#1A211E": "currentColor",
  "#1a211e": "currentColor",
  "#FFF7ED": "var(--color-orange-background)",
  "#FFC182": "var(--color-orange-border)",
  "#F76B15": "var(--color-orange)",
  "#F8F8FF": "var(--color-iris-background)",
  "#CBCDFF": "var(--color-iris-border)",
  "#5B5BD6": "var(--color-iris)",
};

function toPascal(name) {
  return name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function svgInnerToJsx(svg) {
  const inner = svg
    .replace(/<\?xml[^>]*>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim();

  return inner
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let jsx = line;
      for (const [from, to] of Object.entries(COLOR_MAP)) {
        jsx = jsx.replaceAll(`"${from}"`, `"${to}"`);
      }
      for (const [from, to] of Object.entries(ATTR_MAP)) {
        jsx = jsx.replaceAll(`${from}=`, `${to}=`);
      }
      jsx = jsx.replace(/(\s)([a-z-]+)=/g, (match, space, attr) => {
        if (attr.includes("-") && ATTR_MAP[attr]) return match;
        if (attr.includes("-")) {
          const camel = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          return `${space}${camel}=`;
        }
        return match;
      });
      return `        ${jsx}`;
    })
    .join("\n");
}

const icons = [
  {
    name: "plus",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00488 3L8.00488 13" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.00488 8L13.0049 8" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "minus",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.00488 8L13.0049 8" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "arrows",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 10.0001L8.00002 13.0001L11 10.0001" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 6L7.99998 3L5 6" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "arrowTopRight",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.41992 5.5H10.6599V9.75" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.66 5.5L5 11.16" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "arrowBottomRight",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.41992 10.5L10.6599 10.5L10.6599 6.25" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.66 10.5L5 4.84" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "info",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.1V8" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 5.89996H8.00563" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "sun",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00025 10.3531C6.70269 10.3531 5.64746 9.29788 5.64746 8.00031C5.64746 6.70275 6.70269 5.64752 8.00025 5.64752C9.29782 5.64752 10.353 6.70275 10.353 8.00031C10.353 9.29788 9.29782 10.3531 8.00025 10.3531Z" stroke="#1A211E" stroke-width="1.2"/>
<path d="M13.0003 8.00034H12.5M3.5 8.00034H3.00098" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round"/>
<path d="M7.99609 3.00564L7.99609 3.50598M7.99609 12.506L7.99609 13.005" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round"/>
<path d="M4.46258 4.47354L4.81638 4.82734M11.1803 11.1913L11.5332 11.5442" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round"/>
<path d="M4.46942 11.5442L4.82321 11.1904M11.1872 4.8264L11.54 4.47354" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round"/>
</svg>`,
  },
  {
    name: "moon",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.66825 12.05C7.02155 12.0501 6.38486 11.8815 5.81475 11.5592C5.24465 11.2369 4.7588 10.771 4.40039 10.2027C5.10732 10.1685 5.79832 9.96958 6.42386 9.62028C7.04941 9.27098 7.59401 8.77994 8.01864 8.18233C8.44327 7.58473 8.73742 6.89538 8.87999 6.16367C9.02256 5.43196 9.01004 4.67601 8.84331 3.95001C9.74002 4.24516 10.5067 4.86992 11.0043 5.71089C11.5019 6.55185 11.6973 7.55327 11.5551 8.53337C11.413 9.51346 10.9426 10.4072 10.2294 11.0525C9.51623 11.6977 8.60753 12.0517 7.66825 12.05Z" stroke="#1A211E" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "close",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5391 4.46802L4.46799 11.5391" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.46777 4.46802L11.5388 11.5391" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "arrowRight",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 12L10.5 8L6.5 4" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "arrowLeft",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 12L5.5 8L9.5 4" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "expand",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 12L2 8L6 4" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 12L14 8L10 4" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "collapse",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4L6 8L2 12" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 12L10 8L14 4" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "placeholder",
    w: 16,
    h: 16,
    svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="5" fill="#1A211E"/>
</svg>`,
  },
  {
    name: "dashboard",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.875 7H14.125C15.375 7 16 6.375 16 5.125V3.875C16 2.625 15.375 2 14.125 2H12.875C11.625 2 11 2.625 11 3.875V5.125C11 6.375 11.625 7 12.875 7Z" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.875 16H5.125C6.375 16 7 15.375 7 14.125V12.875C7 11.625 6.375 11 5.125 11H3.875C2.625 11 2 11.625 2 12.875V14.125C2 15.375 2.625 16 3.875 16Z" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 7C5.88071 7 7 5.88071 7 4.5C7 3.11929 5.88071 2 4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88071 3.11929 7 4.5 7Z" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.5 16C14.8807 16 16 14.8807 16 13.5C16 12.1193 14.8807 11 13.5 11C12.1193 11 11 12.1193 11 13.5C11 14.8807 12.1193 16 13.5 16Z" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "calendar",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 0.75V3.75" stroke="#1A211E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 0.75V3.75" stroke="#1A211E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.9 15.9999H11.1C14.6 15.9999 16 14.5999 16 11.0999V6.89991C16 3.39991 14.6 1.99991 11.1 1.99991H6.9C3.4 1.99991 2 3.39991 2 6.89991V11.0999C2 14.5999 3.4 15.9999 6.9 15.9999Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 8.5L7.5 8.5M5.5 11.5H7.5M10.5 8.5L12.5 8.5M10.5 11.5H12.5" stroke="#1A211E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "copy",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.675V12.825C12 15.45 10.95 16.5 8.325 16.5H5.175C2.55 16.5 1.5 15.45 1.5 12.825V9.675C1.5 7.05 2.55 6 5.175 6H8.325C10.95 6 12 7.05 12 9.675Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 5.175V8.325C16.5 10.95 15.45 12 12.825 12H12V9.675C12 7.05 10.95 6 8.325 6H6V5.175C6 2.55 7.05 1.5 9.675 1.5H12.825C15.45 1.5 16.5 2.55 16.5 5.175Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "refresh",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1671 3.06472C10.5146 2.86972 9.79457 2.74222 8.99957 2.74222C5.40707 2.74222 2.49707 5.65222 2.49707 9.24472C2.49707 12.8447 5.40707 15.7547 8.99957 15.7547C12.5921 15.7547 15.5021 12.8447 15.5021 9.25222C15.5021 7.91722 15.0971 6.67222 14.4071 5.63722" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.0972 3.24467L9.92969 0.754669" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.0978 3.24466L9.57031 5.08966" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "play",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.97754 16.5C13.1197 16.5 16.4775 13.1421 16.4775 9C16.4775 4.85786 13.1197 1.5 8.97754 1.5C4.8354 1.5 1.47754 4.85786 1.47754 9C1.47754 13.1421 4.8354 16.5 8.97754 16.5Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.55469 9.1725V7.92C6.55469 6.36 7.65719 5.7225 9.00719 6.5025L10.0947 7.1325L11.1822 7.7625C12.5322 8.5425 12.5322 9.8175 11.1822 10.5975L10.0947 11.2275L9.00719 11.8575C7.65719 12.6375 6.55469 12 6.55469 10.44V9.1725Z" stroke="#1A211E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "image",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99967 15.6667H10.9997C14.333 15.6667 15.6663 14.3333 15.6663 11V7.00001C15.6663 3.66668 14.333 2.33334 10.9997 2.33334H6.99967C3.66634 2.33334 2.33301 3.66668 2.33301 7.00001V11C2.33301 14.3333 3.66634 15.6667 6.99967 15.6667Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.00033 7.66667C7.73671 7.66667 8.33366 7.06971 8.33366 6.33333C8.33366 5.59695 7.73671 5 7.00033 5C6.26395 5 5.66699 5.59695 5.66699 6.33333C5.66699 7.06971 6.26395 7.66667 7.00033 7.66667Z" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.78027 13.6333L6.06694 11.4267C6.59361 11.0733 7.35361 11.1133 7.82694 11.52L8.04694 11.7133C8.56694 12.16 9.40694 12.16 9.92694 11.7133L12.7003 9.33332C13.2203 8.88665 14.0603 8.88665 14.5803 9.33332L15.6669 10.2667" stroke="#1A211E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "drag",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 4L9 2L11 4M9 2V6M4 11L2 9L4 7M2 9H6M11 14L9 16L7 14M9 16V12M14 7L16 9L14 11M16 9H12" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "more",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33333 7.66675C2.6 7.66675 2 8.26675 2 9.00008C2 9.73341 2.6 10.3334 3.33333 10.3334C4.06667 10.3334 4.66667 9.73341 4.66667 9.00008C4.66667 8.26675 4.06667 7.66675 3.33333 7.66675Z" stroke="black" stroke-width="1.2"/>
<path d="M14.6673 7.66675C13.934 7.66675 13.334 8.26675 13.334 9.00008C13.334 9.73341 13.934 10.3334 14.6673 10.3334C15.4007 10.3334 16.0007 9.73341 16.0007 9.00008C16.0007 8.26675 15.4007 7.66675 14.6673 7.66675Z" stroke="black" stroke-width="1.2"/>
<path d="M8.99935 7.66669C8.26602 7.66669 7.66602 8.26669 7.66602 9.00002C7.66602 9.73335 8.26602 10.3334 8.99935 10.3334C9.73268 10.3334 10.3327 9.73335 10.3327 9.00002C10.3327 8.26669 9.73268 7.66669 8.99935 7.66669Z" stroke="black" stroke-width="1.2"/>
</svg>`,
  },
  {
    name: "report",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.9 16.0002H11.1C14.6 16.0002 16 14.6002 16 11.1002V6.90015C16 3.40015 14.6 2.00015 11.1 2.00015H6.9C3.4 2.00015 2 3.40015 2 6.90015V11.1002C2 14.6002 3.4 16.0002 6.9 16.0002Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.7031 4.45953V5.95953C10.7031 6.78453 11.3781 7.45953 12.2031 7.45953H13.7031" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 9.29736H8.05688" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 12.2974H12" stroke="black" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "lineChart",
    w: 18,
    h: 18,
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.66699 8.16V10.2933" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 7V11.4533" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.333 8.16V10.2933" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.9 15.9999H11.1C14.6 15.9999 16 14.5999 16 11.0999V6.89991C16 3.39991 14.6 1.99991 11.1 1.99991H6.9C3.4 1.99991 2 3.39991 2 6.89991V11.0999C2 14.5999 3.4 15.9999 6.9 15.9999Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "chart",
    w: 22,
    h: 22,
    svg: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="21" height="21" rx="5.5" fill="#FFF7ED"/>
<rect x="0.5" y="0.5" width="21" height="21" rx="5.5" stroke="#FFC182"/>
<path d="M6 17L6 13" stroke="#F76B15" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 17L11 13" stroke="#F76B15" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 17L16 5" stroke="#F76B15" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "insight",
    w: 22,
    h: 22,
    svg: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="21" height="21" rx="5.5" fill="#F8F8FF"/>
<rect x="0.5" y="0.5" width="21" height="21" rx="5.5" stroke="#CBCDFF"/>
<path d="M16.5056 9.12927H11.8542V4.18881C11.8541 4.14926 11.8411 4.11072 11.8168 4.07862C11.7926 4.04652 11.7585 4.02247 11.7192 4.00986C11.6799 3.99725 11.6374 3.99672 11.5978 4.00834C11.5581 4.01996 11.5233 4.04314 11.4982 4.07462L5.10122 12.1156C4.85468 12.4257 5.08655 12.8707 5.49442 12.8707H10.1458V17.8112C10.1459 17.8507 10.1589 17.8893 10.1832 17.9214C10.2074 17.9535 10.2415 17.9775 10.2808 17.9901C10.3201 18.0027 10.3626 18.0033 10.4022 17.9917C10.4419 17.98 10.4767 17.9569 10.5018 17.9254L16.8988 9.88475C17.1453 9.57469 16.9134 9.12927 16.5056 9.12927Z" stroke="#5B5BD6" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    name: "logoSymbol",
    w: 28,
    h: 28,
    svg: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.625 2.625H6.125V25.375H2.625V2.625Z" fill="#1A211E"/>
<path d="M7 7.875H10.5V19.25H7V7.875Z" fill="#1A211E"/>
<path d="M12.2051 14H15.7051V25.375H12.2051V14Z" fill="#1A211E"/>
<path d="M16.625 7.875H20.125V19.25H16.625V7.875Z" fill="#1A211E"/>
<path d="M20.9551 2.625H24.4551V25.375H20.9551V2.625Z" fill="#1A211E"/>
</svg>`,
  },
  {
    name: "logoWordmark",
    w: 68,
    h: 14,
    svg: `<svg width="68" height="14" viewBox="0 0 68 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M64.1516 9.828H58.7516L57.5636 13.032H55.2776L60.2456 0.27H62.7476L67.7156 13.032H65.3576L64.1516 9.828ZM59.5076 7.83H63.3956L61.4516 2.61L59.5076 7.83Z" fill="#1A211E"/>
<path d="M46.9406 7.992H45.3566V13.032H43.1786V0.27H48.0746C50.5406 0.27 52.0706 1.98 52.0706 4.14C52.0706 5.958 50.9906 7.344 49.1906 7.776L52.0706 13.032H49.6226L46.9406 7.992ZM47.6786 6.084C49.0286 6.084 49.8746 5.31 49.8746 4.14C49.8746 2.934 49.0286 2.178 47.6786 2.178H45.3566V6.084H47.6786Z" fill="#1A211E"/>
<path d="M32.9551 13.302C29.5171 13.302 26.5111 10.836 26.5111 6.66C26.5111 2.502 29.6251 0 32.9371 0C36.1771 0 38.1031 1.908 38.6791 4.14L36.6451 4.824C36.2491 3.276 35.0791 2.034 32.9371 2.034C30.8311 2.034 28.7251 3.564 28.7251 6.66C28.7251 9.63 30.7771 11.232 32.9551 11.232C35.0971 11.232 36.3211 9.864 36.7531 8.424L38.7331 9.072C38.1571 11.232 36.2131 13.302 32.9551 13.302Z" fill="#1A211E"/>
<path d="M19.5846 13.032V0.27H21.7806V13.032H19.5846Z" fill="#1A211E"/>
<path d="M11.8984 13.032V3.636L7.92044 13.032H6.04844L2.10644 3.672V13.032H0.00043869V0.27H2.88044L7.02044 10.008L11.1064 0.27H14.0404V13.032H11.8984Z" fill="#1A211E"/>
</svg>`,
  },
];

const exports = [];

for (const icon of icons) {
  const component = `${toPascal(icon.name)}Icon`;
  const fileBase = toPascal(icon.name);
  const jsx = svgInnerToJsx(icon.svg);
  const source = `import { createIcon, type IconRenderProps } from "@/utils/createIcon";

const WIDTH = ${icon.w};
const HEIGHT = ${icon.h};

export const ${component} = createIcon(
  ({ width = WIDTH, height = HEIGHT, ...props }: IconRenderProps) => ({
    ...props,
    width,
    height,
    viewBox: \`0 0 \${WIDTH} \${HEIGHT}\`,
    fill: "none",
    children: (
      <>
${jsx}
      </>
    ),
  }),
);
`;
  writeFileSync(join(outDir, `${fileBase}.tsx`), source);
  exports.push({ key: icon.name, component, file: fileBase });
}

const index = `import type { ComponentType } from "react";
import type { IconRenderProps } from "@/utils/createIcon";

${exports.map((item) => `import { ${item.component} } from "./${item.file}";`).join("\n")}

export const iconRegistry: Record<string, ComponentType<IconRenderProps>> = {
${exports.map((item) => `  ${item.key}: ${item.component},`).join("\n")}
};

export type IconRegistryName = keyof typeof iconRegistry;
`;

writeFileSync(join(outDir, "index.ts"), index);
console.log(`wrote ${exports.length} icons`);
