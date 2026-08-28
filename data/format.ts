/**
 * Formatters are pinned to en-US and UTC so server and client output match and
 * the mock never shifts with the viewer's locale.
 */

const count = new Intl.NumberFormat("en-US");
const oneDecimal = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const twoDecimals = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const monthDay = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "2-digit",
});
const monthOnly = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
});
const dayOnly = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  day: "2-digit",
});

export const formatCount = (value: number) => count.format(Math.round(value));

export const formatPercent = (value: number, digits = 1) => {
  if (digits <= 0) return `${formatCount(value)}%`;
  return `${(digits === 1 ? oneDecimal : twoDecimals).format(value)}%`;
};

/** Compact relative change: 34% above ten, 2.2% below. */
export function formatDeltaPercent(value: number) {
  const abs = Math.abs(value);
  return `${abs >= 10 ? formatCount(abs) : oneDecimal.format(abs)}%`;
}

export const formatPoints = (value: number) => `${oneDecimal.format(value)} pts`;

/** Compact money used by the headline cards: $842, $1.9k, $1.24M. */
export function formatCurrencyCompact(value: number) {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${twoDecimals.format(abs / 1_000_000)}M`;
  if (abs >= 1_000) return `${sign}$${twoDecimals.format(abs / 1_000)}k`;
  return `${sign}$${count.format(Math.round(abs))}`;
}

/** Money inside table cells: $24,180. */
export const formatCurrency = (value: number) =>
  `$${count.format(Math.round(value))}`;

/** Axis labels drop the thousands separator, matching the design: $1500. */
export function formatAxisCurrency(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `$${abs / 1_000_000}M`;
  return `$${Math.round(abs)}`;
}

export const formatDate = (iso: string) => monthDay.format(new Date(iso));

/** Two-line axis tick, e.g. ["Mar", "05"]. */
export const formatDateLines = (iso: string): [string, string] => {
  const date = new Date(iso);
  return [monthOnly.format(date), dayOnly.format(date)];
};

export const formatHourLines = (iso: string): [string, string] => {
  const hours = new Date(iso).getUTCHours();
  const suffix = hours < 12 ? "AM" : "PM";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return [`${hour}`, suffix];
};

export const formatScore = (value: number) => oneDecimal.format(value);
