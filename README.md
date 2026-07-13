# 🦭 Walrus Blob Explorer

A tiny, dependency-free web app to look up and preview blobs stored on
[Walrus](https://walrus.xyz) decentralized storage. Paste a **Blob ID**, pick an
aggregator, and instantly preview images, text, JSON, PDFs and video — with a
local history and favorites. The app itself is designed to be deployed as a
**Walrus Site**.

## Features

- 🔎 Look up any Walrus blob by its Blob ID
- 🖼️ Smart preview for images, text, JSON, PDF and video
- 🌐 Switchable aggregators (testnet / mainnet / custom endpoint)
- 🕘 Local lookup history (stored in your browser)
- ⭐ Pin favorite blobs
- 🔗 Shareable deep links (`#/blob/<id>`)
- 🌗 Dark / light theme
- ⚡ Zero dependencies, zero build step — pure HTML/CSS/JS

## Quick start

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploying to Walrus Sites

See [docs/DEPLOY.md](docs/DEPLOY.md) for publishing this app to Walrus with
`site-builder`.

## Author

Built by [@izzetcakmak](https://github.com/izzetcakmak).

Owner Sui wallet (site object ownership & attribution):

```
0xc7db10a90785f797f180611b1646710dbc313de6b6736273823d775f80a3d840
```

## License

MIT © İzzet Çakmak
