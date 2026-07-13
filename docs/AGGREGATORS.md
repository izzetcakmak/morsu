# Aggregators

An **aggregator** is a Walrus node endpoint that serves blob bytes over HTTP:

```
GET {base}/v1/blobs/{blobId}
```

This app ships with two built-in endpoints and supports a custom one.

| Id       | Network | Base URL                                             |
| -------- | ------- | ---------------------------------------------------- |
| testnet  | Testnet | `https://aggregator.walrus-testnet.walrus.space`     |
| mainnet  | Mainnet | `https://aggregator.walrus-mainnet.walrus.space`     |
| custom   | any     | user-provided base URL                               |

## Choosing an aggregator

- Use **Testnet** for experimenting with disposable blobs.
- Use **Mainnet** for persistent, paid-for blobs.
- Use a **Custom endpoint** to target a self-hosted or regional aggregator —
  pick "Custom endpoint…" in the dropdown and paste its base URL (no `/v1`).

## Running your own

See the Walrus operator docs for running an aggregator. Any endpoint exposing
the standard `GET /v1/blobs/{blobId}` route works with this app.
