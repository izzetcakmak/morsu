// Map a Content-Type header to a coarse category used to pick a preview renderer.
export function categorizeMime(contentType) {
  const type = (contentType || "").toLowerCase().split(";")[0].trim();

  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type === "application/pdf") return "pdf";
  if (type === "application/json" || type.endsWith("+json")) return "json";
  if (
    type.startsWith("text/") ||
    type === "application/xml" ||
    type === "application/javascript" ||
    type === "application/x-yaml"
  ) {
    return "text";
  }
  return "binary";
}

// A friendly label for the UI.
export function mimeLabel(contentType) {
  if (!contentType) return "unknown";
  return contentType.split(";")[0].trim();
}
