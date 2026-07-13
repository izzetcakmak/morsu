// Accessible-ish modal dialog with backdrop + Escape to close.
import { h, clear } from "../dom.js";

export function openModal({ title, body, actions = [] }) {
  const backdrop = h("div", { class: "modal-backdrop" });

  function close() {
    document.removeEventListener("keydown", onKey);
    backdrop.remove();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  const foot = h("div", { class: "modal__foot" });
  for (const action of actions) {
    foot.appendChild(
      h(
        "button",
        {
          class: `btn ${action.variant ? "btn--" + action.variant : ""}`,
          onclick: () => action.onClick?.(close),
        },
        action.label,
      ),
    );
  }

  const dialog = h(
    "div",
    { class: "modal", role: "dialog", "aria-modal": "true" },
    h(
      "div",
      { class: "modal__head" },
      h("div", { class: "modal__title" }, title || ""),
    ),
    h("div", { class: "modal__body" }, body || ""),
    actions.length ? foot : null,
  );

  backdrop.appendChild(dialog);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener("keydown", onKey);
  document.body.appendChild(backdrop);
  return { close, setBody: (node) => clear(dialog.querySelector(".modal__body")).append(node) };
}
