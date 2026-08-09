# Deploying to Walrus Sites

Morsu is a fully static app, so it can live on
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

## Live deployment

Morsu is published to **Walrus Sites on mainnet**:

| | |
|---|---|
| Site Object ID | `0x8a3608fc90d544d1da70e0dd7cf4d083eda60f93701fa5d1e5a47159de7d97b9` |
| Base36 subdomain | `3g0ethqgr8t9467u7grqc55vbcj2ed3kexf8gqb89u9mvxy7jt` |
| Published | 2026-08-09, 5 epochs |

The object ID is stored in `walrus/ws-resources.json`, so `scripts/update.sh`
picks it up automatically.

## First publish

```bash
EPOCHS=5 scripts/publish.sh
```

`site-builder` uploads every file, registers a site object on Sui, and prints:

- the **Site Object ID** (save this — you need it to update the site)
- a **Base36 subdomain** you can browse via a Walrus Sites portal

## Updating

```bash
EPOCHS=5 scripts/update.sh
```

## Reaching the site over a portal

Public portals such as `wal.app` resolve **SuiNS names only** — the base36
subdomain works exclusively on a portal you run yourself:

```bash
site-builder --config walrus/sites-config.yaml --context mainnet convert <object-id>
```

To get a public `https://<name>.wal.app` URL, buy a SuiNS name at
[suins.io](https://suins.io) and point it at the site object ID above.

## Site ownership (important for airdrops/attribution)

The Site object is owned by the **Sui wallet that publishes it**. The project's
owner wallet is:

```
0xc7db10a90785f797f180611b1646710dbc313de6b6736273823d775f80a3d840
```

> **Pending:** the live site object was published from
> `0xac2d2fdcf625946575305e99fdefdd486e14a8fa30b8ae156ab490c3318d692d`
> (the CLI's active address), not the owner wallet. Transfer it with the command
> below to restore attribution.

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
- `docs/`, `tests/`, `scripts/`, `.github/`, agent-skill folders and repo
  metadata files are excluded from the published bundle via the `ignore` list in
  `ws-resources.json`. The live site carries 47 resources — app code only.
- `site-builder` needs both `--context mainnet` (Sui side) and
  `--walrus-context mainnet` (Walrus side); omitting the latter makes it read
  the testnet staking object and fail.
