// "About" dialog explaining what the app is and its privacy stance.
import { h } from "../dom.js";
import { openModal } from "./modal.js";
import { OWNER } from "../config.js";
import { truncateMiddle } from "../utils/truncate.js";
import { copyToClipboard } from "../utils/copy.js";
import { toast } from "./toast.js";
import { t } from "../i18n.js";

export function openAbout() {
  openModal({
    title: t("about.title"),
    body: h(
      "div",
      { class: "stack" },
      h(
        "p",
        {},
        t("about.desc1"),
        h(
          "a",
          { class: "footer__link", href: "https://walrus.xyz", target: "_blank", rel: "noopener" },
          "Walrus",
        ),
        t("about.desc2"),
      ),
      h("p", { class: "search__hint" }, t("about.hint")),
      h(
        "ul",
        { class: "stack", style: "font-size:.88rem;color:var(--c-text-dim)" },
        h("li", {}, t("about.li1")),
        h("li", {}, t("about.li2")),
        h("li", {}, t("about.li3")),
      ),
      h(
        "p",
        { class: "search__hint" },
        `${t("about.builtBy")} `,
        h(
          "a",
          {
            class: "footer__link",
            href: `https://github.com/${OWNER.github}`,
            target: "_blank",
            rel: "noopener",
          },
          `@${OWNER.github}`,
        ),
        " · ",
        h("a", { class: "footer__link", href: `mailto:${OWNER.email}` }, OWNER.email),
        " · Sui: ",
        h(
          "button",
          {
            class: "footer__link",
            style: "font-family:var(--font-mono);padding:0",
            title: `${OWNER.suiAddress} ${t("about.copyHint")}`,
            onclick: async () => {
              const ok = await copyToClipboard(OWNER.suiAddress);
              toast(ok ? t("about.suiCopied") : t("preview.copyFailed"), ok ? "success" : "error");
            },
          },
          truncateMiddle(OWNER.suiAddress, 8, 6),
        ),
      ),
    ),
    actions: [{ label: t("about.close"), variant: "primary", onClick: (close) => close() }],
  });
}
