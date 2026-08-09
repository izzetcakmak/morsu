# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Published to **Walrus Sites on mainnet** — site object
  `0x8a3608fc90d544d1da70e0dd7cf4d083eda60f93701fa5d1e5a47159de7d97b9`,
  53 epochs (~2 years), 47 resources.

### Changed

- Project renamed to **Morsu** (morsu.xyz) — from "Walrus Blob Explorer".
- HTTPS enforced on morsu.xyz after reissuing the GitHub Pages certificate.
- `scripts/publish.sh` / `scripts/update.sh` now pass the Sui and Walrus
  contexts explicitly and read the site object id from `ws-resources.json`.

### Added

- Blob lookup by Blob ID against a selectable Walrus aggregator.
- Smart previews for images, text, JSON, PDF, video and audio.
- Testnet / Mainnet / custom aggregator switching.
- Local lookup history and pinned favorites (localStorage).
- Shareable deep links (`#/blob/<id>`).
- Dark / light theme with system-preference fallback.
- Bilingual UI (English default, Turkish) with persisted language toggle.
- Walrus Sites deploy configuration and scripts.
- Unit tests for utility helpers.

## [0.1.0] - 2026-07-13

- Initial project scaffold.
