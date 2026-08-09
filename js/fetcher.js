// Fetch a blob from the active aggregator and return bytes + metadata.
import { blobUrl, getActiveAggregator } from "./aggregator.js";
import {
  categorizeMime,
  isOpaqueMime,
  sniffBinaryMime,
  sniffTextMime,
} from "./utils/mime.js";

// How much of a blob to decode when testing whether it is UTF-8 text.
const TEXT_SNIFF_LIMIT = 256 * 1024;

export class BlobFetchError extends Error {
  // `code` maps to an i18n key (error.<code>); `params` feeds its placeholders.
  constructor(message, { status, code, params } = {}) {
    super(message);
    this.name = "BlobFetchError";
    this.status = status ?? null;
    this.code = code || "unexpected";
    this.params = params || {};
  }
}

// Returns { blob, url, contentType, category, size, aggregator }.
export async function fetchBlob(blobId, { signal } = {}) {
  const aggregator = getActiveAggregator();
  const url = blobUrl(blobId, aggregator);

  let res;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if (err && err.name === "AbortError") throw err;
    throw new BlobFetchError(`Network error reaching ${aggregator.label} aggregator.`, {
      code: "network",
      params: { label: aggregator.label },
    });
  }

  if (res.status === 404) {
    throw new BlobFetchError("Blob not found on this aggregator.", {
      status: 404,
      code: "notFound",
    });
  }
  if (!res.ok) {
    throw new BlobFetchError(`Aggregator returned HTTP ${res.status}.`, {
      status: res.status,
      code: "http",
      params: { status: res.status },
    });
  }

  let blob = await res.blob();
  const headerType = res.headers.get("content-type") || blob.type || "";

  let contentType = headerType;
  let sniffed = false;
  if (isOpaqueMime(headerType)) {
    const detected = await detectMime(blob);
    if (detected) {
      contentType = detected;
      sniffed = true;
      // Re-tag the blob so object URLs work in <img>, <video> and <iframe>.
      blob = blob.slice(0, blob.size, detected);
    }
  }

  return {
    blob,
    url,
    contentType,
    sniffed,
    category: categorizeMime(contentType),
    size: blob.size,
    aggregator,
  };
}

// Recover a MIME type from a blob's own bytes. Returns "" when undetectable.
async function detectMime(blob) {
  const header = new Uint8Array(await blob.slice(0, 64).arrayBuffer());
  const binaryType = sniffBinaryMime(header);
  if (binaryType) return binaryType;

  const sample = new Uint8Array(
    await blob.slice(0, Math.min(blob.size, TEXT_SNIFF_LIMIT)).arrayBuffer(),
  );
  // A truncated sample can split a multi-byte character, so only trust a text
  // verdict when the whole blob was small enough to decode.
  if (blob.size > TEXT_SNIFF_LIMIT) {
    return sniffTextMime(sample.slice(0, TEXT_SNIFF_LIMIT - 4)) ? "text/plain" : "";
  }
  return sniffTextMime(sample);
}
