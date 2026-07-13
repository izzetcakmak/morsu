// Render a video blob with native controls.
import { h } from "../dom.js";

export function renderVideo(result) {
  const url = URL.createObjectURL(result.blob);
  const video = h("video", {
    class: "preview__img",
    src: url,
    controls: true,
    onloadeddata: () => {
      /* keep object URL alive while playing; revoked on re-render */
    },
  });
  return h("div", { class: "preview__body" }, video);
}
