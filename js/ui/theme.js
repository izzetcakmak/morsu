// Theme toggle with persistence and system-preference fallback.
import { STORAGE_KEYS } from "../config.js";

function stored() {
  try {
    return localStorage.getItem(STORAGE_KEYS.theme);
  } catch (_) {
    return null;
  }
}

export function getTheme() {
  const saved = stored();
  if (saved === "light" || saved === "dark") return saved;
  const prefersLight =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function setTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch (_) {
    /* ignore */
  }
  applyTheme(theme);
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());
}
