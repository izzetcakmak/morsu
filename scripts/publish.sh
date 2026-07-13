#!/usr/bin/env bash
# Publish the app as a new Walrus Site.
# Requires: site-builder, a funded Sui wallet, and WAL for storage.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EPOCHS="${EPOCHS:-5}"

echo "Publishing Morsu to Walrus Sites…"
site-builder \
  --config "$ROOT/walrus/sites-config.yaml" \
  publish "$ROOT" \
  --epochs "$EPOCHS"

echo "Done. Save the printed Site Object ID to update later with scripts/update.sh."
