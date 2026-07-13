// Renders the recent-lookups list with per-item open/remove and a clear-all.
import { h, mount } from "../dom.js";
import { icons } from "./icons.js";
import { truncateMiddle } from "../utils/truncate.js";
import { timeAgo } from "../utils/time-ago.js";
import { mimeLabel } from "../utils/mime.js";
import { getHistory, removeHistory, clearHistory } from "../storage/history.js";

export function renderHistoryPanel({ onOpen } = {}) {
  const section = h("section", { class: "section" });

  function paint() {
    const entries = getHistory();
    const header = h(
      "div",
      { class: "row" },
      h("span", { class: "section__title" }, "Recent lookups"),
      h("div", { class: "spacer" }),
      entries.length
        ? h(
            "button",
            {
              class: "btn btn--ghost btn--icon",
              title: "Clear history",
              onclick: () => {
                clearHistory();
                paint();
              },
            },
            icons.trash({ size: 15 }),
          )
        : null,
    );

    const list = entries.length
      ? h(
          "div",
          { class: "list" },
          ...entries.map((e) => item(e, onOpen, paint)),
        )
      : h("div", { class: "empty" }, "No lookups yet — try a sample below.");

    mount(section, header, list);
  }

  paint();
  return { el: section, refresh: paint };
}

function item(entry, onOpen, refresh) {
  return h(
    "div",
    { class: "list-item" },
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
    h("span", { class: "list-item__meta" }, timeAgo(entry.at)),
    h(
      "button",
      {
        class: "btn btn--ghost btn--icon",
        title: "Remove",
        onclick: () => {
          removeHistory(entry.blobId);
          refresh();
        },
      },
      icons.x({ size: 14 }),
    ),
  );
}
