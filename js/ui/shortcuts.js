// Global keyboard shortcuts. Ignores keystrokes while typing in a field.
import { goHome } from "../router.js";

function isTyping(target) {
  const tag = target && target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || (target && target.isContentEditable);
}

export function initShortcuts({ focusSearch } = {}) {
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    // "/" focuses the search box.
    if (e.key === "/" && !isTyping(e.target)) {
      e.preventDefault();
      focusSearch?.();
      return;
    }

    // Escape from anywhere but a field returns home.
    if (e.key === "Escape" && !isTyping(e.target)) {
      goHome();
    }
  });
}
