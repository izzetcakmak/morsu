// Walrus blob IDs are URL-safe base64 (43 chars, no padding) encoding 32 bytes.
// This is a best-effort client-side check — the aggregator is the source of truth.
const BLOB_ID_RE = /^[A-Za-z0-9_-]{43}$/;

export function isValidBlobId(raw) {
  if (typeof raw !== "string") return false;
  return BLOB_ID_RE.test(raw.trim());
}

// Extract a blob id from pasted text that may be a full aggregator URL.
export function normalizeBlobInput(raw) {
  if (typeof raw !== "string") return "";
  let value = raw.trim();
  // If the user pasted a URL like .../v1/blobs/<id>, take the last path segment.
  const match = value.match(/blobs\/([A-Za-z0-9_-]{43})/);
  if (match) return match[1];
  return value;
}
