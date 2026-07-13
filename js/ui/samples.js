// Renders a set of sample blob IDs users can click to try the app instantly.
import { h } from "../dom.js";
import { t, getLang } from "../i18n.js";

export function renderSamples(samples, { onOpen } = {}) {
  if (!samples || !samples.length) return h("div", {});
  const lang = getLang();
  return h(
    "section",
    { class: "section" },
    h("span", { class: "section__title" }, t("samples.title")),
    h(
      "div",
      { class: "row", style: "flex-wrap:wrap;gap:8px" },
      ...samples.map((s) => {
        const label = (lang === "tr" && s.label_tr) || s.label;
        return h(
          "button",
          {
            class: "btn",
            title: s.blobId,
            onclick: () => onOpen?.(s.blobId),
          },
          `${s.emoji || "📦"} ${label}`,
        );
      }),
    ),
  );
}
