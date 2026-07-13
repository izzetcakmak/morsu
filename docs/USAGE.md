# Usage

## Looking up a blob

1. Paste a Walrus **Blob ID** (43 URL-safe base64 characters) into the search box.
   You can also paste a full aggregator URL — the app extracts the id.
2. Pick an **aggregator** (Testnet, Mainnet, or a Custom endpoint).
3. Press **Look up** (or Enter).

The blob is fetched read-only from the chosen aggregator and previewed inline.

## Supported previews

| Content type         | Preview            |
| -------------------- | ------------------ |
| `image/*`            | inline image       |
| `video/*`            | inline video       |
| `audio/*`            | inline audio        |
| `application/pdf`    | embedded PDF frame |
| `application/json`   | pretty-printed     |
| `text/*`             | monospace text     |
| everything else      | download / open raw |

## History & favorites

- Every successful lookup is saved to **Recent lookups** (kept in your browser).
- Click the ⭐ on a preview to **pin** a blob to Favorites.
- History and favorites never leave your device.

## Sharing

Each lookup updates the URL to `#/blob/<id>`, so you can bookmark or share a
direct link to a specific blob.

## Language

The UI is bilingual. It opens in **English** by default; click the **TR / EN**
button in the header to switch. Your choice is remembered in the browser.

## Custom aggregator

Choose **Custom endpoint…** in the aggregator dropdown to point the app at any
Walrus aggregator base URL (for example a self-hosted one).
