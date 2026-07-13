// Human-readable byte sizes, e.g. 1536 -> "1.5 KB".
export function formatBytes(bytes, decimals = 1) {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return "—";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, i);
  const rounded = i === 0 ? value : value.toFixed(decimals);
  return `${rounded} ${units[i]}`;
}
