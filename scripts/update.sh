#!/usr/bin/env bash
# Update an already-published Walrus Site in place.
# Usage: SITE_OBJECT=0x... scripts/update.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EPOCHS="${EPOCHS:-5}"

if [[ -z "${SITE_OBJECT:-}" ]]; then
  echo "Set SITE_OBJECT to the site object id from the initial publish." >&2
  exit 1
fi

site-builder \
  --config "$ROOT/walrus/sites-config.yaml" \
  update "$ROOT" "$SITE_OBJECT" \
  --epochs "$EPOCHS"

echo "Site $SITE_OBJECT updated."
