// App footer with attribution and links.
import { h } from "../dom.js";

export function renderFooter() {
  return h(
    "footer",
    { class: "footer" },
    h(
      "div",
      { class: "container footer__inner" },
      h("span", {}, "🦭 Walrus Blob Explorer"),
      h("span", { class: "footer__dot" }, "·"),
      h("span", { class: "footer__muted" }, "read-only client for Walrus storage"),
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
          href: "https://github.com/izzetcakmak/walrus-blob-explorer",
          target: "_blank",
          rel: "noopener",
        },
        "source",
      ),
    ),
  );
}
