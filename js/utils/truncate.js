// Middle-truncate a long id: "abcd…wxyz".
export function truncateMiddle(str, head = 8, tail = 6) {
  if (typeof str !== "string") return "";
  if (str.length <= head + tail + 1) return str;
  return `${str.slice(0, head)}…${str.slice(-tail)}`;
}
