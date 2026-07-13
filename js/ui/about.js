// "About" dialog explaining what the app is and its privacy stance.
import { h } from "../dom.js";
import { openModal } from "./modal.js";
import { OWNER } from "../config.js";
import { truncateMiddle } from "../utils/truncate.js";
import { copyToClipboard } from "../utils/copy.js";
import { toast } from "./toast.js";

export function openAbout() {
  openModal({
    title: "About Walrus Blob Explorer",
    body: h(
      "div",
      { class: "stack" },
      h(
        "p",
        {},
        "A tiny, dependency-free client for reading blobs from ",
        h("a", { class: "footer__link", href: "https://walrus.xyz", target: "_blank", rel: "noopener" }, "Walrus"),
        " decentralized storage.",
      ),
      h("p", { class: "search__hint" }, "Paste a Blob ID, pick an aggregator, and preview the content."),
      h(
        "ul",
        { class: "stack", style: "font-size:.88rem;color:var(--c-text-dim)" },
        h("li", {}, "🔒 Read-only — never writes to Walrus."),
        h("li", {}, "🧳 History & favorites stay in your browser."),
        h("li", {}, "⌨️  Press “/” to focus search, “Esc” to go home."),
      ),
      h(
        "p",
        { class: "search__hint" },
        "Built by ",
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
        " · Sui: ",
        h(
          "button",
          {
            class: "footer__link",
            style: "font-family:var(--font-mono);padding:0",
            title: `${OWNER.suiAddress} (click to copy)`,
            onclick: async () => {
              const ok = await copyToClipboard(OWNER.suiAddress);
              toast(ok ? "Sui address copied." : "Copy failed.", ok ? "success" : "error");
            },
          },
          truncateMiddle(OWNER.suiAddress, 8, 6),
        ),
      ),
    ),
    actions: [{ label: "Close", variant: "primary", onClick: (close) => close() }],
  });
}
