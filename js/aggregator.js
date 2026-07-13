// Resolve the active aggregator (built-in or user-supplied custom endpoint) and
// build blob read URLs from it.
import { AGGREGATORS, DEFAULT_AGGREGATOR_ID, STORAGE_KEYS } from "./config.js";

function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

export function getCustomAggregator() {
  const base = readStored(STORAGE_KEYS.customAggregator);
  if (!base) return null;
  return { id: "custom", label: "Custom", base, network: "custom" };
}

export function listAggregators() {
  const custom = getCustomAggregator();
  return custom ? [...AGGREGATORS, custom] : [...AGGREGATORS];
}

export function getActiveAggregatorId() {
  return readStored(STORAGE_KEYS.aggregator) || DEFAULT_AGGREGATOR_ID;
}

export function getActiveAggregator() {
  const id = getActiveAggregatorId();
  return listAggregators().find((a) => a.id === id) || AGGREGATORS[0];
}

export function setActiveAggregatorId(id) {
  try {
    localStorage.setItem(STORAGE_KEYS.aggregator, id);
  } catch (_) {
    /* ignore */
  }
}

export function setCustomAggregator(base) {
  try {
    if (base) localStorage.setItem(STORAGE_KEYS.customAggregator, base.replace(/\/+$/, ""));
    else localStorage.removeItem(STORAGE_KEYS.customAggregator);
  } catch (_) {
    /* ignore */
  }
}

// Build the canonical read URL for a blob on a given aggregator.
export function blobUrl(blobId, aggregator = getActiveAggregator()) {
  return `${aggregator.base}/v1/blobs/${blobId}`;
}
