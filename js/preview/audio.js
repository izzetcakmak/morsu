// Render an audio blob with native controls.
import { h } from "../dom.js";

export function renderAudio(result) {
  const url = URL.createObjectURL(result.blob);
  const audio = h("audio", { src: url, controls: true, style: "width:100%" });
  return h("div", { class: "preview__body" }, audio);
}
