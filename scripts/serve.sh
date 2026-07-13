#!/usr/bin/env bash
# Serve the app locally (ES modules require http, not file://).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-4790}"
echo "Serving $ROOT on http://localhost:$PORT"
npx -y http-server "$ROOT" -p "$PORT" -c-1
