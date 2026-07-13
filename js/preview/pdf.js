// Render a PDF blob in an iframe.
import { h } from "../dom.js";

export function renderPdf(result) {
  const url = URL.createObjectURL(result.blob);
  const frame = h("iframe", {
    class: "preview__frame",
    src: url,
    title: "PDF preview",
  });
  // Revoke shortly after the frame has had a chance to load.
  frame.addEventListener("load", () => setTimeout(() => URL.revokeObjectURL(url), 1000));
  return h("div", { class: "preview__body", style: "padding:0" }, frame);
}
