# FAQ

**What is a Blob ID?**
A Walrus Blob ID is the content identifier of data stored on Walrus — 32 bytes
encoded as 43 URL-safe base64 characters. It is what an aggregator uses to serve
the bytes back.

**Why did my sample return a 400 / 404?**
The bundled samples are illustrative and Walrus **testnet** blobs can expire when
the testnet is reset. Store your own with `walrus store <file>` and paste the
returned Blob ID.

**Is anything uploaded or tracked?**
No. The app only performs read requests to the aggregator you select. History and
favorites are stored in your browser's `localStorage`.

**Can I use it with mainnet?**
Yes — switch the aggregator to **Mainnet** in the dropdown.

**Why no framework / build step?**
So the whole thing is a handful of static files that deploy cleanly to Walrus
Sites and load instantly.

**A large text/JSON blob won't preview inline — why?**
Inline rendering is capped (2 MB by default) to keep the UI responsive. Use
"Open raw" or "Download" for bigger blobs.
