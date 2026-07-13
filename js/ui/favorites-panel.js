// Renders pinned favorite blobs with open/unpin controls.
import { h, mount } from "../dom.js";
import { icons } from "./icons.js";
import { truncateMiddle } from "../utils/truncate.js";
import { mimeLabel } from "../utils/mime.js";
import { getFavorites, removeFavorite } from "../storage/favorites.js";
import { t } from "../i18n.js";

export function renderFavoritesPanel({ onOpen } = {}) {
  const section = h("section", { class: "section" });

  function paint() {
    const entries = getFavorites();
    if (!entries.length) {
      mount(section); // hide when empty
      section.style.display = "none";
      return;
    }
    section.style.display = "";
    mount(
      section,
      h("span", { class: "section__title" }, t("fav.title")),
      h(
        "div",
        { class: "list" },
        ...entries.map((e) => item(e, onOpen, paint)),
      ),
    );
  }

  paint();
  return { el: section, refresh: paint };
}

function item(entry, onOpen, refresh) {
  return h(
    "div",
    { class: "list-item" },
    icons.starFilled({ size: 15 }),
    h(
      "button",
      {
        class: "list-item__id",
        style: "text-align:left",
        title: entry.blobId,
        onclick: () => onOpen?.(entry.blobId),
      },
      truncateMiddle(entry.blobId, 10, 8),
    ),
    h("span", { class: "list-item__meta" }, mimeLabel(entry.contentType) || "—"),
    h(
      "button",
      {
        class: "btn btn--ghost btn--icon",
        title: t("fav.unpin"),
        onclick: () => {
          removeFavorite(entry.blobId);
          refresh();
        },
      },
      icons.x({ size: 14 }),
    ),
  );
}
