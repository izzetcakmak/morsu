#!/usr/bin/env bash
# Publish the app as a new Walrus Site.
# Requires: site-builder, a funded Sui wallet, and WAL for storage.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EPOCHS="${EPOCHS:-5}"
NETWORK="${NETWORK:-mainnet}"

echo "Publishing Morsu to Walrus Sites ($NETWORK)…"
site-builder \
  --config "$ROOT/walrus/sites-config.yaml" \
  --context "$NETWORK" \
  --walrus-context "$NETWORK" \
  publish "$ROOT" \
  --ws-resources "$ROOT/walrus/ws-resources.json" \
  --epochs "$EPOCHS"

echo "Done. The Site Object ID is written back to walrus/ws-resources.json."
