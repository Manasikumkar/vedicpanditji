# Pricing Management Design (Supabase + Vercel)

Date: 2026-11-01. Supersedes the earlier no-database Node design.

## Goal

Let the owner manage all pricing shown on the VedicPanditji website through a login-protected admin editor inside the site. Price changes appear on the live site immediately, and a background rebuild refreshes the prerendered HTML and schema.org markup.

## Background and constraints

- The site is a static Vite build, prerendered for SEO (`npm run build` runs `vite build && node scripts/prerender.js`).
- Pricing data lives in `frontend/src/data/pujaPricing.js` (about 3,200 lines): 59 rate cards, 4 preserved local packages, optional samagri add-ons, and lookup and calculation functions.
- The site moves from Enhance to Vercel. Supabase provides the database and login. There is no custom server code.
- Hindi and Marathi support is planned. This spec makes the pricing data language-ready. The site-wide multilingual work is a separate later spec.

## Decisions

| Topic | Decision |
|---|---|
| Hosting | Vercel (project root `frontend`) |
| Backend | Supabase only: Postgres, Auth and row-level security. No custom server |
| Storage | One JSONB document in a `pricing` table, with a `pricing_history` table filled by a trigger |
| Admin | Lazy-loaded `/admin` route inside the React site, Supabase Auth login |
| Price delivery | Hybrid: runtime fetch for instant display, plus rebuild on every change |
| Rebuild trigger | Supabase database webhook calls a Vercel deploy hook |
| Validation | Postgres function and trigger, so a bad document cannot be stored |
| Editable scope | Full rate-card editing, including packages, inclusions, exclusions and samagri add-ons |
| Languages | Text fields stored as `{en, hi, mr}`. English required, Hindi and Marathi fall back to English |

## Data model

### Tables

- `pricing`: a single row (`id` fixed to 1) with `data jsonb not null`, `updated_at timestamptz`, `updated_by uuid`.
- `pricing_history`: `id bigserial`, `data jsonb`, `saved_at timestamptz`, `saved_by uuid`. A trigger on `pricing` inserts the old row into it on every update.

### Document shape

`{ "rateCards": { "<serviceId>": {...} }, "samagriOptions": [...] }`, exactly what the legacy `COMPLETE_59_PUJA_RATE_CARDS` and `OPTIONAL_SAMAGRI_OPTIONS` hold today. The `PUBLISH_PROPOSED_PRICES_TO_CUSTOMER` flag stays in code and is not editable.

### Language-ready text

- Every customer-facing text field is `{ "en": "...", "hi": "...", "mr": "..." }`. This covers service name, pricing note, pricing rationale, package name, badge, price note, each inclusion and exclusion, and samagri name and description.
- `en` is required. `hi` and `mr` are optional, and an empty value falls back to `en`.
- Internal fields (`researchBasis`, `missingBusinessInfo`, approval flags) are English-only strings and are never shown to customers.
- Prices and other numbers are shared across languages. IDs and slugs are language-neutral.
- Lookup functions take an optional `lang` argument (default `'en'`). Until the multilingual project ships, callers pass nothing and behave as today.

### Generated display strings

`startingPriceDisplay`, package `priceDisplay` and samagri `priceDisplay` are computed from the numbers:

- Fixed-price services: `₹1,100`.
- Other services: `From ₹3,500*` for the starting price and `₹3,500*` for packages.
- Null price: `Custom Quote` for services and packages, `Price to be confirmed` for samagri.

All 59 legacy cards reproduce their existing strings under this rule.

## Access and security

- Row-level security is on for both tables.
- Anyone can read `pricing` with the public anon key.
- Only the admin user, identified by user ID in the policy, can update `pricing`. Nobody can insert or delete rows through the API.
- `pricing_history` is readable by the admin only.
- Public signups are disabled in Supabase Auth. The admin user is created manually.
- The anon key is public by design, so row-level security is the only protection. Tests must prove an anonymous user cannot write.

## Validation (Postgres)

A function `validate_pricing(data jsonb)` raises an error that names the failing path. A `BEFORE UPDATE` trigger on `pricing` calls it and also recomputes the display strings. It rejects:

- Models outside `fixed-price`, `package-pricing`, `custom-quote`, and statuses outside `approved`, `local-project-data`, `proposed`, `needs-business-confirmation`.
- Prices that are not non-negative numbers (or null where allowed), and `minPrice` greater than `maxPrice`.
- Text fields that are not an object with string values for `en`, `hi` and `mr` only, and an empty `en` on any text field.
- Duplicate samagri IDs, and any `includedSamagriIds` entry that does not exist in `samagriOptions`.
- A rate card whose `serviceId` differs from its key.
- Duplicate package IDs within one rate card. Uniqueness is per rate card, not global, because the legacy data reuses `gy-basic` and `gy-standard` in two services.

## Frontend

- `pujaPricing.js` loads data from `src/data/pricing.json` and keeps its functions. It adds `setPricingData()`, a localize step with English fallback, and the `lang` argument.
- `src/services/pricingService.js` fetches the live document from Supabase on app start and calls `setPricingData()`. If the fetch fails, the bundled copy stays in use. `AppContext` bumps a version so pages re-render.
- `OPTIONAL_SAMAGRI_OPTIONS` becomes `getOptionalSamagriOptions()`. `BookingModal` and `PricingPackagesSection` change accordingly.
- The unused `LOCAL_PROJECT_PACKAGES` and `VERIFIED_PUJA_PACKAGES` exports are dropped.
- A `prebuild` script fetches the latest document from Supabase into `src/data/pricing.json`. If the fetch fails it keeps the committed copy and the build continues. Prerender and `schemaGenerator.js` then bake in those prices.

## Admin editor

- A lazy-loaded `/admin` route, marked `noindex`, excluded from prerender and from the sitemap. Visitors never download it.
- Login form using Supabase Auth.
- Searchable list of the 59 services, plus a samagri tab.
- Each text field shows EN, HI and MR inputs. A global EN, HI, MR or All switch picks which are visible, and a counter shows missing translations. A missing translation never blocks saving.
- Packages and inclusion or exclusion lists can be added, removed and reordered. Services and samagri items cannot be added or removed.
- Buttons: Save, Revert to previous (restores the newest `pricing_history` row), Logout.
- Postgres validation errors are shown against the failing field.
- Built with plain React and no new UI library.

## Deployment

- Vercel project root is `frontend`. A `vercel.json` handles route rewrites to the prerendered pages and the SPA fallback.
- Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- A Vercel deploy hook URL is configured in a Supabase database webhook on `pricing` updates. Several quick saves can queue several builds.
- The Enhance setup, the GitHub Action that publishes the `deploy` branch, and `backend/probe` are retired once Vercel is live. The domain DNS then moves to Vercel.

## Migration

A one-time script reads the 59 rate cards, the 4 preserved local packages and the samagri options out of the legacy `pujaPricing.js`, wraps text fields as `{en, hi:"", mr:""}`, and writes `src/data/pricing.json`. The same JSON seeds the `pricing` row through a SQL migration. An equivalence check confirms that `getPricingDisplay` and `getPackagesForService` return identical output before and after, in English, for every service.

## Testing

- SQL tests for `validate_pricing`, the display-string recompute, the history trigger, and row-level security, including that an anonymous user cannot write.
- A Node test for the localize step and the English fallback.
- The equivalence check above, plus a full build confirming prerender and schema output are unchanged.
- Manual: log in, edit one price, confirm the live site updates at once and the rebuild finishes later.

## Out of scope

Per-user admin accounts beyond one admin, a change-history UI beyond revert, adding or removing services or samagri items, and the site-wide multilingual work: language switcher with English as default, Hindi and Marathi UI strings, translated routes, per-language prerender, `hreflang` tags and translating the rest of the site content.
