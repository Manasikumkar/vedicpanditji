# Pricing Backend Design

Date: 2026-11-01

## Goal

Add a small backend, with no database, that lets the owner manage all pricing shown on the VedicPanditji website through a password-protected admin page. Price changes appear on the live site immediately and are baked into the prerendered HTML and schema.org markup by a background rebuild.

## Background and constraints

- The site is a static Vite build, prerendered for SEO (`npm run build` runs `vite build && node scripts/prerender.js`), deployed to Enhance hosting from a `deploy` branch that a GitHub Action fills with `frontend/dist`.
- Pricing data lives in `frontend/src/data/pujaPricing.js` (about 3,200 lines): 59 rate cards, 4 preserved local packages, and optional samagri add-ons, plus lookup and calculation functions.
- Hosting check done: Enhance can run a Node worker (Node 26.13 verified) and the app directory is writable. The probe at `backend/probe/server.js` has served its purpose and is deleted as part of this work.
- No database. Storage is a JSON file on the server disk.

## Decisions

| Topic | Decision |
|---|---|
| Runtime | Node (LTS), separate Enhance site (for example `api.vedicpanditji.com`) with its own Git deploy |
| Price delivery | Hybrid: runtime fetch for instant display, plus background rebuild to refresh prerendered HTML and schema |
| Editing | Password-protected admin page served by the backend |
| Editable scope | Full rate-card editing: prices, status, notes, package names, inclusions, exclusions, badges, samagri add-ons |
| Backend deploy | Action publishes `backend/` and a seed file to a `deploy-api` branch |
| Languages | Pricing data is language-ready: English, Hindi and Marathi text per field. The site-wide multilingual work (switcher, routing, prerender per language, `hreflang`) is a separate later spec |

## Language-ready data model

- Every customer-facing text field is stored as an object `{ "en": "...", "hi": "...", "mr": "..." }`. This covers service name, package name, badge, price note, pricing note, pricing rationale, each inclusion and exclusion, and samagri add-on names and descriptions.
- `en` is required. `hi` and `mr` are optional. A missing or empty translation falls back to `en`, so the site never shows a blank.
- Internal fields (`researchBasis`, `missingBusinessInfo`, approval flags) are English-only plain strings and are never shown to customers.
- Numbers (prices, min and max, quantities) are shared across languages. Display strings such as `₹3,500*` are generated from the numbers using `en-IN` formatting. Per-language numerals and wording are decided in the multilingual spec.
- Lookup functions in `pujaPricing.js` take an optional `lang` argument (default `'en'`) and resolve each text field with the fallback. Until the multilingual project ships, every caller passes nothing and behaves exactly as today.
- IDs and slugs stay language-neutral.

## Architecture

### Source of truth

`data/pricing.json` on the server disk, outside the git-deployed code folder (`DATA_DIR` environment variable) so a deploy never overwrites it. If the file is missing on first start, the backend copies the shipped `pricing.seed.json` into place.

### Backend routes

- `GET /api/pricing`: public, read-only, returns the pricing JSON.
- `GET /admin`: static admin page (login plus editor).
- `POST /api/admin/login`, `POST /api/admin/logout`.
- `PUT /api/admin/pricing`: validate and save.
- `POST /api/admin/revert`: restore the previous backup.
- `POST /api/admin/retry-publish`: retry the GitHub commit.

### Save flow

1. Validate the submitted JSON. Reject with the exact failing field on any error.
2. Back up the current file to `data/backups/` with a timestamp, keeping the last 20.
3. Write the new file atomically (temp file plus rename).
4. Commit the same JSON to `frontend/src/data/pricing.json` through the GitHub API. The push triggers the existing Action, which rebuilds and prerenders the site.
5. Report the rebuild status in the admin UI. If the commit fails, the live API still serves the new prices, and the UI shows "not yet in site build" with a retry button.

The server file is canonical. Hand edits to `pricing.json` in the repo are overwritten by the next admin save.

### Frontend changes

- `pujaPricing.js` keeps its functions (`getPricingDisplay`, `getPackagesForService`, `calculateBookingTotal`, and the rest) but loads data from `pricing.json`.
- Prerender and `schemaGenerator.js` use the baked-in `pricing.json` at build time.
- In the browser, the app fetches `/api/pricing` once and replaces the baked-in data with the live data. If the fetch fails, it keeps the baked-in copy.

## Admin page

- A single static HTML page with plain JS. No build step, no framework.
- Left: searchable list of the 59 services. Right: form for the selected service, with add, remove and reorder lists for packages, inclusions and exclusions. A separate tab edits samagri add-ons.
- Money fields accept numbers. Display strings such as `₹3,500*` are generated from them.
- Each text field has EN, HI and MR tabs. A badge on the service list and on each tab shows which translations are still empty, so missing Hindi or Marathi is visible but never blocks saving.
- Buttons: Save, Revert to previous.

## Auth and safety

- One admin password in the `ADMIN_PASSWORD` environment variable.
- Login sets an HttpOnly, Secure, SameSite=Strict session cookie scoped to the API host. Sessions are held in memory, so a restart logs the admin out.
- Failed logins are rate-limited per IP. Every write endpoint requires a valid session.
- `GET /api/pricing` is the only public route. The backend sends CORS headers allowing only `https://vedicpanditji.com`.
- The save endpoint rejects: duplicate IDs, prices that are not non-negative numbers, missing required fields, and payloads over a size limit.
- `GITHUB_TOKEN` is a fine-grained token limited to this repository's contents.
- Known limitation: one shared password and no audit trail of who changed what.

## Deployment

- Extend `.github/workflows` so a push to `main` also publishes `backend/` plus `pricing.seed.json` to a `deploy-api` branch.
- In Enhance: add a second site for the API, connect it to `deploy-api`, run the worker as Node LTS with `node server.js`, and set `ADMIN_PASSWORD`, `GITHUB_TOKEN` and `DATA_DIR`.
- The separate site means the browser fetches from the API host, so the CORS rule above applies.

## Migration

A one-time script reads the 59 rate cards, the 4 preserved local packages and the samagri options out of `pujaPricing.js` and writes `pricing.json` (also used as `pricing.seed.json`). Existing text becomes the `en` value of each text field, with `hi` and `mr` left empty. `pujaPricing.js` is then trimmed to load that JSON and keep its functions. The script verifies that `getPricingDisplay` and `getPackagesForService` return identical output before and after for every service.

## Testing

- Backend: Node's built-in test runner covers auth, validation (including the per-language text shape), atomic write and backup, seed on first start, and revert.
- Language fallback: a test confirms that an empty `hi` or `mr` value resolves to `en`. The GitHub call is mocked.
- Frontend: the before/after equivalence check, plus a full build to confirm prerender and schema output are unchanged.
- Manual: log in, edit one price, confirm the live site updates at once and the rebuild finishes later.

## Out of scope

Per-user accounts, change-history UI, and any content beyond pricing (enquiries, guides, locations).

The site-wide multilingual work is a separate spec and build, to follow this one: language switcher with English as default, Hindi and Marathi UI strings, translated routes, per-language prerender, `hreflang` tags and sitemap entries, and translating the rest of the site content.
