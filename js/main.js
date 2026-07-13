// Bootstrap: load sample blobs (best-effort) then start the app.
import { boot } from "./app.js";

async function loadSamples() {
  try {
    const res = await fetch("./data/samples.json", { cache: "no-cache" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.samples) ? data.samples : [];
  } catch (_) {
    return [];
  }
}

loadSamples().then(boot);
