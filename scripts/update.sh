#!/usr/bin/env bash
# Update the already-published Walrus Site in place.
# The site object id is read from walrus/ws-resources.json; override with
# SITE_OBJECT=0x... if you need to target a different site.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EPOCHS="${EPOCHS:-5}"
NETWORK="${NETWORK:-mainnet}"
RESOURCES="$ROOT/walrus/ws-resources.json"

if [[ -z "${SITE_OBJECT:-}" ]]; then
  SITE_OBJECT="$(node -p "require('$RESOURCES').object_id || ''")"
fi

if [[ -z "$SITE_OBJECT" ]]; then
  echo "No object_id in $RESOURCES. Run scripts/publish.sh first, or set SITE_OBJECT." >&2
  exit 1
fi

site-builder \
  --config "$ROOT/walrus/sites-config.yaml" \
  --context "$NETWORK" \
  --walrus-context "$NETWORK" \
  update "$ROOT" "$SITE_OBJECT" \
  --ws-resources "$RESOURCES" \
  --epochs "$EPOCHS"

echo "Site $SITE_OBJECT updated."
