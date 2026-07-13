// Dispatch a fetch result to the right preview renderer based on its category.
import { renderImage } from "./image.js";
import { renderText } from "./text.js";
import { renderJson } from "./json.js";
import { renderPdf } from "./pdf.js";
import { renderVideo } from "./video.js";
import { renderAudio } from "./audio.js";
import { renderFallback } from "./fallback.js";

const RENDERERS = {
  image: renderImage,
  text: renderText,
  json: renderJson,
  pdf: renderPdf,
  video: renderVideo,
  audio: renderAudio,
  binary: renderFallback,
};

// Returns a DOM node (renderers may be async).
export async function renderPreview(result) {
  const renderer = RENDERERS[result.category] || renderFallback;
  return renderer(result);
}
