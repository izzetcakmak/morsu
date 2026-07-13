// Renders a fetched blob: preview body + metadata + action buttons.
import { h, mount } from "../dom.js";
import { icons } from "./icons.js";
import { renderPreview } from "../preview/index.js";
import { formatBytes } from "../utils/format-bytes.js";
import { mimeLabel } from "../utils/mime.js";
import { truncateMiddle } from "../utils/truncate.js";
import { copyToClipboard } from "../utils/copy.js";
import { shareLink } from "../utils/share.js";
import { toast } from "./toast.js";
import { isFavorite, toggleFavorite } from "../storage/favorites.js";
import { t } from "../i18n.js";

function metaRow(label, value) {
  return [h("dt", {}, label), h("dd", {}, value)];
}

function actions(result, blobId) {
  const favBtn = h("button", { class: "btn btn--icon", title: t("preview.favTitle") });
  function paintFav() {
    const on = isFavorite(blobId);
    favBtn.replaceChildren(on ? icons.starFilled({ size: 16 }) : icons.star({ size: 16 }));
    favBtn.classList.toggle("btn--primary", on);
  }
  paintFav();
  favBtn.addEventListener("click", () => {
    const now = toggleFavorite({ blobId, contentType: result.contentType, size: result.size });
    paintFav();
    toast(now ? t("preview.pinned") : t("preview.unpinned"), now ? "success" : "info");
  });

  const copyBtn = h(
    "button",
    {
      class: "btn btn--icon",
      title: t("preview.copyId"),
      onclick: async () => {
        const ok = await copyToClipboard(blobId);
        toast(ok ? t("preview.idCopied") : t("preview.copyFailed"), ok ? "success" : "error");
      },
    },
    icons.copy({ size: 16 }),
  );

  const shareBtn = h(
    "button",
    {
      class: "btn btn--icon",
      title: t("preview.copyLink"),
      onclick: async () => {
        const ok = await copyToClipboard(shareLink(blobId));
        toast(ok ? t("preview.linkCopied") : t("preview.copyFailed"), ok ? "success" : "error");
      },
    },
    icons.link({ size: 16 }),
  );

  const rawLink = h(
    "a",
    {
      class: "btn btn--icon",
      href: result.url,
      target: "_blank",
      rel: "noopener",
      title: t("preview.openRaw"),
    },
    icons.external({ size: 16 }),
  );

  const dlLink = h(
    "a",
    {
      class: "btn btn--icon",
      href: URL.createObjectURL(result.blob),
      download: blobId,
      title: t("preview.download"),
    },
    icons.download({ size: 16 }),
  );

  return h("div", { class: "row" }, favBtn, copyBtn, shareBtn, rawLink, dlLink);
}

export async function renderPreviewCard(result, blobId) {
  const body = await renderPreview(result);

  const meta = h(
    "dl",
    { class: "preview__meta" },
    ...metaRow(t("preview.blobId"), truncateMiddle(blobId, 12, 10)),
    ...metaRow(t("preview.type"), mimeLabel(result.contentType) || "unknown"),
    ...metaRow(t("preview.size"), formatBytes(result.size)),
    ...metaRow(t("preview.aggregator"), result.aggregator.label),
  );

  return h(
    "div",
    { class: "preview fade-in" },
    h(
      "div",
      { class: "preview__bar" },
      h("span", { class: "preview__title" }, t("preview.title")),
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
      h("div", { class: "row", style: "gap:12px" }, h("div", { class: "spinner" }), h("span", { class: "search__hint" }, t("preview.loading"))),
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
