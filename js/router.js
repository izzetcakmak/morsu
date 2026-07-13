// Minimal hash router so blob lookups are shareable/bookmarkable:
//   #/                 -> home
//   #/blob/<blobId>    -> auto-load that blob
import { isValidBlobId } from "./utils/validate-blob-id.js";

export function parseHash(hash = location.hash) {
  const clean = hash.replace(/^#\/?/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "blob" && isValidBlobId(parts[1] || "")) {
    return { route: "blob", blobId: parts[1] };
  }
  return { route: "home" };
}

export function goToBlob(blobId) {
  const target = `#/blob/${blobId}`;
  if (location.hash !== target) location.hash = target;
}

export function goHome() {
  if (location.hash && location.hash !== "#/") location.hash = "#/";
}

export function onRouteChange(handler) {
  window.addEventListener("hashchange", () => handler(parseHash()));
}
