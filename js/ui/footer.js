// App footer with attribution and links.
import { h } from "../dom.js";
import { t } from "../i18n.js";

export function renderFooter() {
  return h(
    "footer",
    { class: "footer" },
    h(
      "div",
      { class: "container footer__inner" },
      h("span", {}, "🦭 Morsu"),
      h("span", { class: "footer__dot" }, "·"),
      h("span", { class: "footer__muted" }, t("footer.tagline")),
      h("div", { class: "spacer" }),
      h(
        "a",
        { class: "footer__link", href: "https://walrus.xyz", target: "_blank", rel: "noopener" },
        "walrus.xyz",
      ),
      h(
        "a",
        {
          class: "footer__link",
          href: "https://github.com/izzetcakmak/morsu",
          target: "_blank",
          rel: "noopener",
        },
        t("footer.source"),
      ),
    ),
  );
}
