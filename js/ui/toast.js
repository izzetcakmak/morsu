// Minimal toast notifications rendered into a fixed host element.
import { h } from "../dom.js";

let host = null;

function ensureHost() {
  if (host && document.body.contains(host)) return host;
  host = h("div", { class: "toast-host", "aria-live": "polite" });
  document.body.appendChild(host);
  return host;
}

const ICONS = {
  info: "ℹ️",
  success: "✅",
  error: "⚠️",
};

export function toast(message, type = "info", timeout = 2600) {
  const el = h(
    "div",
    { class: `toast toast--${type}`, role: "status" },
    h("span", { class: "toast__icon" }, ICONS[type] || ICONS.info),
    h("span", {}, message),
  );
  ensureHost().appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .2s";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 220);
  }, timeout);
  return el;
}
