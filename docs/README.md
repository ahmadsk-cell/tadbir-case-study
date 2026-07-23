# Regenerating screenshots (maintainers only)

Screenshots in `docs/screenshots/` were captured from the **private** Tadbir app.

```bash
# Private app must be running, e.g. http://localhost:3001
npm install playwright
npx playwright install chromium
set TADBIR_URL=http://localhost:3001
npm run capture
```

Do not commit `node_modules`. This folder must never contain Tadbir application source.
