// Renders a set of sample blob IDs users can click to try the app instantly.
import { h } from "../dom.js";

export function renderSamples(samples, { onOpen } = {}) {
  if (!samples || !samples.length) return h("div", {});
  return h(
    "section",
    { class: "section" },
    h("span", { class: "section__title" }, "Try a sample blob"),
    h(
      "div",
      { class: "row", style: "flex-wrap:wrap;gap:8px" },
      ...samples.map((s) =>
        h(
          "button",
          {
            class: "btn",
            title: s.blobId,
            onclick: () => onOpen?.(s.blobId),
          },
          `${s.emoji || "📦"} ${s.label}`,
        ),
      ),
    ),
  );
}
