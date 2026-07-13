// Render an image blob.
import { h } from "../dom.js";

export function renderImage(result) {
  const url = URL.createObjectURL(result.blob);
  const img = h("img", {
    class: "preview__img",
    src: url,
    alt: "Blob image preview",
    onload: () => URL.revokeObjectURL(url),
  });
  return h("div", { class: "preview__body" }, img);
}
