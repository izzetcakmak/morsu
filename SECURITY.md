# Security Policy

## Scope

Walrus Blob Explorer is a read-only client. It never writes to Walrus, never
handles private keys, and never transmits your data anywhere except read
requests to the aggregator you explicitly select.

## Reporting

If you find a security issue (for example a way to make the app perform an
unexpected write or leak local data), please open a private security advisory on
the GitHub repository rather than a public issue.

## Notes

- All persistence is local (`localStorage`); clearing site data removes it.
- Custom aggregator URLs are used only to build read requests you initiate.
- Blob previews render fetched bytes; treat untrusted blobs with normal caution.
