# Deploying to Walrus Sites

The Walrus Blob Explorer is a fully static app, so it can live on
[Walrus Sites](https://docs.walrus.site) — served directly from decentralized
storage.

## Prerequisites

- [`site-builder`](https://docs.walrus.site/walrus-sites/tutorial-install.html)
- A Sui wallet with some testnet (or mainnet) SUI for gas
- Some WAL tokens to pay for blob storage

Check your setup:

```bash
site-builder --version
sui client active-address
walrus info
```

## First publish

```bash
EPOCHS=5 scripts/publish.sh
```

`site-builder` uploads every file, registers a site object on Sui, and prints:

- the **Site Object ID** (save this — you need it to update the site)
- a **Base36 subdomain** you can browse via a Walrus Sites portal

## Updating

```bash
SITE_OBJECT=0x<your-site-object-id> EPOCHS=5 scripts/update.sh
```

## Optional: SuiNS name

Point a SuiNS name at the site object so it is reachable at
`https://<name>.wal.app` instead of the base36 subdomain. See the Walrus Sites
docs for `site-builder` SuiNS linking.

## Site ownership (important for airdrops/attribution)

The Site object is owned by the **Sui wallet that publishes it**. The project's
owner wallet is:

```
0xc7db10a90785f797f180611b1646710dbc313de6b6736273823d775f80a3d840
```

If your local `sui client active-address` is a different address, either:

1. Import the owner wallet into the Sui CLI before publishing
   (`sui keytool import ...` then `sui client switch --address ...`), or
2. Publish with any wallet, then transfer the Site object to the owner wallet:

```bash
sui client transfer --object-id <SITE_OBJECT> \
  --to 0xc7db10a90785f797f180611b1646710dbc313de6b6736273823d775f80a3d840
```

## Notes

- `walrus/ws-resources.json` sets content-type headers and a catch-all route to
  `index.html` so deep links resolve.
- `docs/`, `tests/` and `.github/` are excluded from the published bundle via the
  `ignore` list in `ws-resources.json`.
