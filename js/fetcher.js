// Fetch a blob from the active aggregator and return bytes + metadata.
import { blobUrl, getActiveAggregator } from "./aggregator.js";
import { categorizeMime } from "./utils/mime.js";

export class BlobFetchError extends Error {
  constructor(message, { status } = {}) {
    super(message);
    this.name = "BlobFetchError";
    this.status = status ?? null;
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
    throw new BlobFetchError(
      `Network error reaching ${aggregator.label} aggregator.`,
    );
  }

  if (res.status === 404) {
    throw new BlobFetchError("Blob not found on this aggregator.", { status: 404 });
  }
  if (!res.ok) {
    throw new BlobFetchError(`Aggregator returned HTTP ${res.status}.`, {
      status: res.status,
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
