// Relative time formatting, e.g. "3 min ago" — locale-aware.
const DIVISIONS = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 4.34524, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: Number.POSITIVE_INFINITY, unit: "year" },
];

const formatters = new Map();

function rtfFor(locale) {
  const key = locale || "default";
  if (!formatters.has(key)) {
    formatters.set(key, new Intl.RelativeTimeFormat(locale || undefined, { numeric: "auto" }));
  }
  return formatters.get(key);
}

export function timeAgo(timestamp, locale) {
  const rtf = rtfFor(locale);
  let duration = (timestamp - Date.now()) / 1000;
  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return "";
}
