// Fallback for binary / unknown content types — no inline preview.
import { h } from "../dom.js";
import { formatBytes } from "../utils/format-bytes.js";
import { mimeLabel } from "../utils/mime.js";

export function renderFallback(result) {
  return h(
    "div",
    { class: "preview__body" },
    h(
      "div",
      { class: "empty" },
      h("p", {}, `No inline preview for ${mimeLabel(result.contentType) || "this content type"}.`),
      h("p", { style: "margin-top:8px" }, `${formatBytes(result.size)} · use “Download” or “Open raw”.`),
    ),
  );
}
