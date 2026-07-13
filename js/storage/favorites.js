// Pin favorite blobs so they survive across sessions.
import { STORAGE_KEYS } from "../config.js";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function write(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(entries));
  } catch (_) {
    /* ignore */
  }
}

export function getFavorites() {
  return read();
}

export function isFavorite(blobId) {
  return read().some((e) => e.blobId === blobId);
}

export function toggleFavorite(entry) {
  const existing = read();
  const found = existing.some((e) => e.blobId === entry.blobId);
  const next = found
    ? existing.filter((e) => e.blobId !== entry.blobId)
    : [{ ...entry, at: Date.now() }, ...existing];
  write(next);
  return !found; // returns new favorited state
}

export function removeFavorite(blobId) {
  const next = read().filter((e) => e.blobId !== blobId);
  write(next);
  return next;
}
