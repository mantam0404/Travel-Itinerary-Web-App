# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service, frontend-only PWA: React 19 + TypeScript + Vite 7 + Tailwind CSS 4, deployed to GitHub Pages. There is no backend, database, or auth — everything runs client-side with data from `src/data/tripData.ts` and offline storage via LocalForage (IndexedDB).

Standard commands live in `package.json` (`dev`, `build`, `preview`) and the README. Use `npm` (the repo has `package-lock.json`); Node 22 matches CI (`.github/workflows/deploy.yml`).

Non-obvious caveats:
- The Vite `base` is `/Travel-Itinerary-Web-App/` (see `vite.config.ts`). The dev server serves the app at `http://localhost:5173/Travel-Itinerary-Web-App/`; the root path `/` returns a 302 redirect, not the app. Use the full base path when curling or opening the app.
- There is no lint or test script. The only typecheck runs as part of `npm run build` (`tsc -b && vite build`).
- The map tab (Leaflet) and Google Fonts load remote assets (OpenStreetMap tiles, unpkg, fonts.googleapis.com); they require network access on first load and are cached by the service worker for offline use.
