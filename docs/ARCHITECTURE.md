# Architecture

The app is intentionally dependency-free and build-free: plain ES modules,
loaded directly by the browser. This keeps it trivially deployable to Walrus
Sites (no bundler output to reason about).

## Layers

```
index.html
  └─ js/main.js            bootstrap: load samples → boot()
       └─ js/app.js        orchestrator: shell + routing + lookup flow
            ├─ dom.js      tiny h()/mount() helpers
            ├─ config.js   aggregator endpoints + storage keys
            ├─ router.js   hash routing (#/blob/<id>)
            ├─ aggregator.js   active endpoint resolution
            ├─ fetcher.js  fetch bytes + metadata (typed errors)
            ├─ storage/    history + favorites (localStorage)
            ├─ preview/    one renderer per content category
            └─ ui/         header, search, preview card, panels, toast, modal
```

## Data flow for a lookup

1. User submits a Blob ID (or clicks a sample / history item).
2. `router.goToBlob()` updates the hash → `hashchange` fires.
3. `app.handleRoute()` parses the hash and calls `loadBlob()`.
4. `fetcher.fetchBlob()` reads `GET /v1/blobs/<id>` from the active aggregator.
5. `preview/index.js` dispatches to a renderer by MIME category.
6. On success the lookup is written to history; panels refresh.

## Design principles

- **No global mutable state** beyond a single in-flight `AbortController`.
- **Every module does one thing** and is independently testable.
- **Graceful failure**: network/404/HTTP errors surface as friendly messages.
- **Progressive**: unknown content types fall back to download/open-raw.
