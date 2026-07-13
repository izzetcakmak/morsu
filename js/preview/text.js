// Render a text blob (guards against oversized inline rendering).
import { h } from "../dom.js";
import { MAX_INLINE_PREVIEW_BYTES } from "../config.js";
import { formatBytes } from "../utils/format-bytes.js";

export async function renderText(result) {
  if (result.size > MAX_INLINE_PREVIEW_BYTES) {
    return h(
      "div",
      { class: "preview__body" },
      h(
        "p",
        { class: "empty" },
        `Text is too large to preview inline (${formatBytes(result.size)}). Use “Open raw”.`,
      ),
    );
  }
  const text = await result.blob.text();
  return h("div", { class: "preview__body" }, h("pre", { class: "preview__text" }, text));
}
