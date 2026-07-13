// Fallback for binary / unknown content types — no inline preview.
import { h } from "../dom.js";
import { formatBytes } from "../utils/format-bytes.js";
import { mimeLabel } from "../utils/mime.js";
import { t } from "../i18n.js";

export function renderFallback(result) {
  return h(
    "div",
    { class: "preview__body" },
    h(
      "div",
      { class: "empty" },
      h("p", {}, t("preview.noInline", { type: mimeLabel(result.contentType) || "binary" })),
      h(
        "p",
        { style: "margin-top:8px" },
        t("preview.useDownload", { size: formatBytes(result.size) }),
      ),
    ),
  );
}
