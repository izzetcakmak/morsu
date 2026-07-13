// Renders a fetched blob: preview body + metadata + action buttons.
import { h, mount } from "../dom.js";
import { icons } from "./icons.js";
import { renderPreview } from "../preview/index.js";
import { formatBytes } from "../utils/format-bytes.js";
import { mimeLabel } from "../utils/mime.js";
import { truncateMiddle } from "../utils/truncate.js";
import { copyToClipboard } from "../utils/copy.js";
import { toast } from "./toast.js";
import { isFavorite, toggleFavorite } from "../storage/favorites.js";

function metaRow(label, value) {
  return [h("dt", {}, label), h("dd", {}, value)];
}

function actions(result, blobId) {
  const favBtn = h("button", { class: "btn btn--icon", title: "Toggle favorite" });
  function paintFav() {
    const on = isFavorite(blobId);
    favBtn.replaceChildren(on ? icons.starFilled({ size: 16 }) : icons.star({ size: 16 }));
    favBtn.classList.toggle("btn--primary", on);
  }
  paintFav();
  favBtn.addEventListener("click", () => {
    const now = toggleFavorite({ blobId, contentType: result.contentType, size: result.size });
    paintFav();
    toast(now ? "Pinned to favorites." : "Removed from favorites.", now ? "success" : "info");
  });

  const copyBtn = h(
    "button",
    {
      class: "btn btn--icon",
      title: "Copy Blob ID",
      onclick: async () => {
        const ok = await copyToClipboard(blobId);
        toast(ok ? "Blob ID copied." : "Copy failed.", ok ? "success" : "error");
      },
    },
    icons.copy({ size: 16 }),
  );

  const rawLink = h(
    "a",
    { class: "btn btn--icon", href: result.url, target: "_blank", rel: "noopener", title: "Open raw" },
    icons.external({ size: 16 }),
  );

  const dlLink = h(
    "a",
    {
      class: "btn btn--icon",
      href: URL.createObjectURL(result.blob),
      download: blobId,
      title: "Download",
    },
    icons.download({ size: 16 }),
  );

  return h("div", { class: "row" }, favBtn, copyBtn, rawLink, dlLink);
}

export async function renderPreviewCard(result, blobId) {
  const body = await renderPreview(result);

  const meta = h(
    "dl",
    { class: "preview__meta" },
    ...metaRow("Blob ID", truncateMiddle(blobId, 12, 10)),
    ...metaRow("Type", mimeLabel(result.contentType) || "unknown"),
    ...metaRow("Size", formatBytes(result.size)),
    ...metaRow("Aggregator", result.aggregator.label),
  );

  return h(
    "div",
    { class: "preview fade-in" },
    h(
      "div",
      { class: "preview__bar" },
      h("span", { class: "preview__title" }, "Preview"),
      h("span", { class: "badge" }, result.category),
      h("div", { class: "spacer" }),
      actions(result, blobId),
    ),
    body,
    meta,
  );
}

// Convenience states for the same slot.
export function renderLoading() {
  return h(
    "div",
    { class: "preview" },
    h(
      "div",
      { class: "preview__body" },
      h("div", { class: "row", style: "gap:12px" }, h("div", { class: "spinner" }), h("span", { class: "search__hint" }, "Fetching blob…")),
    ),
  );
}

export function renderError(message) {
  return h(
    "div",
    { class: "preview" },
    h("div", { class: "preview__body" }, h("p", { class: "empty" }, message)),
  );
}

export { mount };
