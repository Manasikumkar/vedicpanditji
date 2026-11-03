# Multilingual Site Infrastructure Design (English, Hindi, Marathi)

Date: 2026-11-02

## Goal

Make the VedicPanditji website available in English (default), Hindi and Marathi, with a language switcher. This first sub-project builds the infrastructure and translates the site chrome, the homepage, the catalogue and service-detail templates, and the booking and enquiry flow. The long-form content is translated in later sub-projects.

## Background

- The site is a React 19 and Vite single-page app with a custom router in `AppContext.jsx` (`parseRouteFromLocation`, `navigateTo`). It has no router library and no i18n library.
- `scripts/prerender.js` builds each page's HTML by hand (head tags plus a semantic body) and the React app replaces it when it mounts. It does not run React on the server. It currently writes 152 pages.
- UI text is written inline in the components. Content lives in data files: 59 services, 20 guides, 37 locations and the city SEO pages, about 7,000 lines in total.
- Pricing text is already stored as `{en, hi, mr}` in Supabase, and the pricing functions take a `lang` argument with English fallback. See `2026-11-01-pricing-backend-design.md`.
- The font is Poppins, which has no Devanagari glyphs.

## Decisions

| Topic | Decision |
|---|---|
| Sequencing | Infrastructure first, content translated in later batches, each its own spec |
| URLs | Path prefix: English at current URLs, Hindi at `/hi/...`, Marathi at `/mr/...` |
| UI text storage | JSON dictionaries (`en.json`, `hi.json`, `mr.json`) with a small `t()` hook, no new dependency |
| Translation | Claude drafts Hindi and Marathi, a review sheet is produced, a native speaker or the owner corrects it |
| Scope of this sub-project | Chrome, homepage, booking and enquiry flow, catalogue and service-detail templates |
| Language choice | No automatic detection and no redirects. `/` is always English |

## URLs, routing and language state

- English URLs do not change. Hindi pages live under `/hi/...` and Marathi pages under `/mr/...`, for example `/hi/services/griha-pravesh-puja`. Slugs stay English. `/admin` stays English-only at `/admin`.
- `AppContext` gains `lang` (`'en' | 'hi' | 'mr'`), derived only from the URL. `parseRouteFromLocation` strips a leading `/hi` or `/mr` before matching routes, so every existing route, page component and route parameter works unchanged.
- `navigateTo` adds the prefix when `lang` is not English. A helper `localizePath(path, lang)` builds every internal link. Hard-coded internal `href="/..."` links in the components are replaced with it.
- `<html lang>` is set to the current language and updated on navigation. The browser back and forward buttons keep `lang` in step with the URL.
- The router handles `/hi/...` and `/mr/...` regardless of the language flags below, so every language can be tested in the dev server and in previews before it is enabled.
- Vercel serves the prerendered folders `dist/hi/...` and `dist/mr/...` natively. An unknown path such as `/hi/zzz` shows the not-found page with a 404 status.

## Dictionaries and `t()`

- `src/i18n/en.json`, `hi.json` and `mr.json` hold flat keys grouped by area, for example `nav.home`, `footer.contact`, `home.hero.title`, `booking.step.city`, `toast.enquirySent`. `en.json` is the source of truth. A key missing from `hi.json` or `mr.json` resolves to the English text.
- The hook `useT()` returns `t(key, vars)`, which reads the dictionary for the current `lang`. It supports `{name}` placeholders. Wording avoids plurals, so no plural logic is needed.
- The same lookup exists as a plain function `translate(lang, key, vars)` for the prerender script and `seoMetadata.js`. It needs no build step.
- The English strings of the in-scope components are moved into `en.json` and the components call `t()`. The rendered English output must stay identical to today's, which an automated check verifies.
- Service names, descriptions, FAQs and guides are not in the dictionaries and stay English in this sub-project. Pricing text already follows `lang` through the pricing functions, so the components pass the current language to them.
- A test fails if a key used in the code is missing from `en.json`, or if `hi.json` or `mr.json` contains a key that does not exist in `en.json`.

## Language configuration

`src/i18n/languages.js` lists the languages with two flags each, plus the display name and `lang` code:

- `enabled`: the language shows in the switcher and its pages are prerendered into `dist`.
- `indexable`: the language's pages are indexed, carry `hreflang` alternates and appear in the sitemap. When `indexable` is false, its prerendered pages carry `noindex`.

English is always `enabled` and `indexable`. Hindi and Marathi start with both false and are turned on per language after review. The router ignores these flags.

## Prerender, SEO and sitemap

- `scripts/prerender.js` keeps its design and runs the same page builder once per enabled language.
- Hindi and Marathi pages are generated only for route types translated in this sub-project: the homepage, the catalogue and the service-detail pages. For these pages the head tags, `<html lang>`, header, navigation, footer and translated headings come from `translate()`. Service descriptions inside them stay English.
- Other routes (About, FAQs, How We Work, Legal, Contact, guides, locations, city pages) are not prerendered under `/hi` or `/mr`. A visitor who reaches one in the browser sees the English page with the translated chrome, and the page sets `noindex` and a canonical pointing to the English URL. The language switcher hides Hindi and Marathi on these routes and shows a short note that the page is English only for now.
- Each translated page lists `en`, `hi`, `mr` and `x-default` (English) alternates. Its canonical is its own language URL. English pages carry the same alternates for the languages that are `indexable`.
- `seoMetadata.js` takes `lang` and reads titles and descriptions for translated route types from the dictionaries. The schema.org JSON-LD gets `inLanguage`, and the service price in it stays numeric.
- `sitemap.xml` lists each indexable translated URL with `xhtml:link` alternates. `noindex` and untranslated routes stay out of it.
- The build adds about 122 files: 2 languages times 61 pages (homepage, catalogue and 59 services).
- Risk: Hindi and Marathi pages still show English service descriptions until the content sub-projects ship, and Google may rate such pages as thin. The `indexable` flag lets the owner switch indexing off per language.

## Language switcher and fonts

- A `LanguageSwitcher` in the navbar and the mobile menu shows `EN | हिन्दी | मराठी` for the enabled languages. Each option links to the same page under its prefix through `localizePath`, with the correct `hreflang` and `lang` attributes. On routes without translations it hides the Hindi and Marathi options and shows the English-only note.
- Noto Sans Devanagari (weights 400, 500 and 600) loads from Google Fonts after Poppins in the font stack, and only on Hindi and Marathi pages, so English visitors do not download it.
- Line height is raised on language pages, and the navbar, buttons, cards and booking modal are checked for overflow at phone width.

## Translation workflow

1. English strings are extracted into `en.json`.
2. Claude drafts `hi.json` and `mr.json` and generates review sheets `docs/i18n/review-hi.md` and `docs/i18n/review-mr.md`. Each lists the key, the English text, the draft and a `needs review` status.
3. The owner or a native speaker corrects a sheet and the corrections are applied to the dictionary.
4. After review, the owner sets `enabled` and `indexable` for that language. Until then it stays off in production.

## Admin

`/admin` stays English-only. Hindi and Marathi pricing text is already editable there.

## Testing

- Unit tests for `localizePath`, URL parsing with and without a prefix, `translate()` and its English fallback, and the missing-key and extra-key guard.
- An automated check that the English output of the refactored components is identical to today's.
- A build check that the expected language files, `hreflang` tags and sitemap entries exist for enabled and indexable languages, that disabled languages produce no files, and that untranslated routes are `noindex`.
- Manual: switch language on the homepage, a service page and the booking flow, at phone width.

## Out of scope

Translating service descriptions, guides, locations, city pages, FAQs, About, How We Work, Legal and Contact, any automatic language detection or redirect, and translating `/admin`. Each content area becomes its own later sub-project with its own spec and plan.
