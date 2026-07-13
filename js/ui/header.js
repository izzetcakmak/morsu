// App header with brand and theme toggle.
import { h } from "../dom.js";
import { icons } from "./icons.js";
import { getTheme, toggleTheme } from "./theme.js";

export function renderHeader() {
  const toggle = h("button", {
    class: "btn btn--icon btn--ghost",
    title: "Toggle theme",
    "aria-label": "Toggle theme",
  });

  function paint() {
    toggle.replaceChildren(getTheme() === "dark" ? icons.sun() : icons.moon());
  }
  paint();
  toggle.addEventListener("click", () => {
    toggleTheme();
    paint();
  });

  return h(
    "header",
    { class: "header" },
    h(
      "div",
      { class: "container header__inner" },
      h(
        "a",
        { class: "brand", href: "#/" },
        h("span", { class: "brand__mark" }, "🦭"),
        h("span", {}, "Walrus Blob Explorer"),
      ),
      h("span", { class: "header__tag" }, "decentralized storage"),
      h("div", { class: "spacer" }),
      toggle,
    ),
  );
}
