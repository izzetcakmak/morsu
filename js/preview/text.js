// Render a text blob (guards against oversized inline rendering).
import { h } from "../dom.js";
import { MAX_INLINE_PREVIEW_BYTES } from "../config.js";
import { formatBytes } from "../utils/format-bytes.js";
import { t } from "../i18n.js";

export async function renderText(result) {
  if (result.size > MAX_INLINE_PREVIEW_BYTES) {
    return h(
      "div",
      { class: "preview__body" },
      h("p", { class: "empty" }, t("preview.textTooLarge", { size: formatBytes(result.size) })),
    );
  }
  const text = await result.blob.text();
  return h("div", { class: "preview__body" }, h("pre", { class: "preview__text" }, text));
}
