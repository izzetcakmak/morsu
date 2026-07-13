# Contributing

Thanks for your interest! This project favours small, focused changes.

## Development

There is no build step. Serve the folder over HTTP (ES modules require it):

```bash
npm run serve      # or: scripts/serve.sh
```

Then open http://localhost:4790.

## Tests

Pure helpers under `js/utils/` are covered by Node's built-in test runner:

```bash
npm test
```

## Conventions

- Keep each module single-purpose; prefer a new small file over growing one.
- Use the `h()` helper in `js/dom.js` instead of raw string HTML.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `docs:` …).
- No runtime dependencies — keep it vanilla.

## Adding a preview renderer

1. Add `js/preview/<type>.js` exporting a `render<Type>(result)` function.
2. Register it in `js/preview/index.js` under the right MIME category.
3. Make sure `js/utils/mime.js` maps the content type to that category.
