// App header with brand, language toggle, About and theme toggle.
import { h } from "../dom.js";
import { icons } from "./icons.js";
import { getTheme, toggleTheme } from "./theme.js";
import { openAbout } from "./about.js";
import { t, toggleLang } from "../i18n.js";

export function renderHeader() {
  const themeBtn = h("button", {
    class: "btn btn--icon btn--ghost",
    title: t("header.theme"),
    "aria-label": t("header.theme"),
  });

  function paintTheme() {
    themeBtn.replaceChildren(getTheme() === "dark" ? icons.sun() : icons.moon());
  }
  paintTheme();
  themeBtn.addEventListener("click", () => {
    toggleTheme();
    paintTheme();
  });

  // Language toggle shows the language you will switch TO; a full reload
  // re-renders every localized string and keeps state (hash + localStorage).
  const langBtn = h(
    "button",
    {
      class: "btn btn--ghost",
      style: "font-weight:800;font-size:.78rem;letter-spacing:.06em;padding:6px 10px",
      title: t("header.langTitle"),
      "aria-label": t("header.langTitle"),
      onclick: () => {
        toggleLang();
        location.reload();
      },
    },
    t("header.langLabel"),
  );

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
      h("span", { class: "header__tag" }, t("header.tag")),
      h("div", { class: "spacer" }),
      langBtn,
      h(
        "button",
        {
          class: "btn btn--icon btn--ghost",
          title: t("header.about"),
          "aria-label": t("header.about"),
          onclick: openAbout,
        },
        icons.info(),
      ),
      themeBtn,
    ),
  );
}
