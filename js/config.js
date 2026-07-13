// Central configuration for the Walrus Blob Explorer.
// Public aggregator endpoints expose GET /v1/blobs/<blobId> to read blob bytes.

export const AGGREGATORS = [
  {
    id: "testnet",
    label: "Testnet",
    base: "https://aggregator.walrus-testnet.walrus.space",
    network: "testnet",
  },
  {
    id: "mainnet",
    label: "Mainnet",
    base: "https://aggregator.walrus-mainnet.walrus.space",
    network: "mainnet",
  },
];

export const DEFAULT_AGGREGATOR_ID = "testnet";

// Cap how much of a text/JSON blob we will render inline (bytes).
export const MAX_INLINE_PREVIEW_BYTES = 2 * 1024 * 1024; // 2 MB

// LocalStorage keys.
export const STORAGE_KEYS = {
  history: "wbe.history.v1",
  favorites: "wbe.favorites.v1",
  theme: "wbe.theme.v1",
  aggregator: "wbe.aggregator.v1",
  customAggregator: "wbe.aggregator.custom.v1",
};

export const HISTORY_LIMIT = 25;
