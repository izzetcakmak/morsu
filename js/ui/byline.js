// Prominent builder credit + contact strip shown right under the search box.
import { h } from "../dom.js";
import { OWNER } from "../config.js";
import { t } from "../i18n.js";

export function renderByline() {
  return h(
    "div",
    { class: "byline" },
    h(
      "span",
      { class: "byline__credit" },
      "🛠 ",
      t("byline.p1"),
      h(
        "a",
        {
          class: "byline__link",
          href: `https://github.com/${OWNER.github}`,
          target: "_blank",
          rel: "noopener",
        },
        OWNER.github,
      ),
      t("byline.p2"),
      h(
        "a",
        {
          class: "byline__link",
          href: "https://walrus.xyz",
          target: "_blank",
          rel: "noopener",
        },
        "Walrus",
      ),
      t("byline.p3"),
    ),
    h("span", { class: "byline__sep" }, "·"),
    h(
      "a",
      { class: "byline__link byline__mail", href: `mailto:${OWNER.email}` },
      "✉️ ",
      OWNER.email,
    ),
  );
}
