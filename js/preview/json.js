// Render a JSON blob, pretty-printed when it parses.
import { h } from "../dom.js";
import { MAX_INLINE_PREVIEW_BYTES } from "../config.js";
import { formatBytes } from "../utils/format-bytes.js";
import { t } from "../i18n.js";

export async function renderJson(result) {
  if (result.size > MAX_INLINE_PREVIEW_BYTES) {
    return h(
      "div",
      { class: "preview__body" },
      h("p", { class: "empty" }, t("preview.jsonTooLarge", { size: formatBytes(result.size) })),
    );
  }
  const raw = await result.blob.text();
  let pretty = raw;
  try {
    pretty = JSON.stringify(JSON.parse(raw), null, 2);
  } catch (_) {
    // Not valid JSON despite the content type — show it verbatim.
  }
  return h("div", { class: "preview__body" }, h("pre", { class: "preview__text" }, pretty));
}
