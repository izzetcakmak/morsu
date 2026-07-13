// Build a shareable deep link to a specific blob lookup.
export function shareLink(blobId) {
  const { origin, pathname } = location;
  return `${origin}${pathname}#/blob/${blobId}`;
}
