// Fetch a blob from the active aggregator and return bytes + metadata.
import { blobUrl, getActiveAggregator } from "./aggregator.js";
import { categorizeMime } from "./utils/mime.js";

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

  const blob = await res.blob();
  const contentType = res.headers.get("content-type") || blob.type || "";
  return {
    blob,
    url,
    contentType,
    category: categorizeMime(contentType),
    size: blob.size,
    aggregator,
  };
}
