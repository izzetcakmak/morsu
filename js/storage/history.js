// Persist recent blob lookups in localStorage (most-recent-first, de-duplicated).
import { STORAGE_KEYS, HISTORY_LIMIT } from "../config.js";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.history);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function write(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(entries));
  } catch (_) {
    /* storage full or blocked — ignore */
  }
}

export function getHistory() {
  return read();
}

export function addHistory(entry) {
  const now = Date.now();
  const rest = read().filter((e) => e.blobId !== entry.blobId);
  const next = [{ ...entry, at: now }, ...rest].slice(0, HISTORY_LIMIT);
  write(next);
  return next;
}

export function removeHistory(blobId) {
  const next = read().filter((e) => e.blobId !== blobId);
  write(next);
  return next;
}

export function clearHistory() {
  write([]);
  return [];
}
