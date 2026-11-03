# Enabling Hindi or Marathi

Both languages are off in production until their translations are reviewed.

1. Review `docs/i18n/review-hi.md` (or `review-mr.md`). Correct the Draft column and mark rows `reviewed`.
2. Apply the corrections to `frontend/src/i18n/hi.json` (or `mr.json`). Keep `{placeholders}` unchanged, and keep leading or trailing spaces where the English has them (the text is joined around other values).
3. Regenerate the sheet to confirm nothing is missing: `cd frontend && npm run i18n:sheets` (expects `0 missing`).
4. Test in the dev server: `npm run dev`, then open `/hi` (or `/mr`), a service page, and the booking flow. Languages work in the dev server whatever the flags say.
5. Soft launch (visible, not indexed): in `frontend/src/i18n/languages.js` set `enabled: true` and leave `indexable: false`. Also add this rewrite to `frontend/vercel.json` (once, for the first language you enable) so links to pages that are not translated yet, such as `/hi/about-us`, open the English page with translated navigation instead of a 404:

   ```json
   { "source": "/:lang(hi|mr)/:path+", "destination": "/:path" }
   ```

   It is deliberately not in `vercel.json` while both languages are off: it would make the draft translations reachable in production by typing the URL.
6. Full launch: set `indexable: true`.
7. After any change run `npm run build && npm run i18n:check-build && npm run i18n:check` and push through a pull request. Check the Vercel preview before merging, including that an untranslated page such as `/hi/about-us` opens (it serves the English page with Hindi navigation and is marked `noindex`).

To switch a language off again, set both flags to `false`. The pages disappear from the next build.

## Known gaps before a full launch

Fix these before setting `indexable: true` (found in the final review):

- Untranslated pages under `/hi` and `/mr` get `noindex` only from JavaScript. The served HTML says `index` and carries the English canonical. Consider a header rule for them once the rewrite is in place, taking care not to hit the real translated pages.
- The JSON-LD `@id` and `url` of translated service and catalogue pages still point at the English URL, with `inLanguage` set to the other language. Localize them in `src/utils/seoMetadata.js` (`withInLanguage`).
- `/hi/hi/services` is served with status 200 and then rendered as not-found by the app (a soft 404).
- The language switcher drops the query string and hash.

- Service descriptions, guides, locations, FAQs, About, How We Work, Legal and Contact are still English under `/hi` and `/mr`. They are translated in later batches.
- Messages returned by `webhookService.js` (for example "Submission Limit Reached") are English strings and still show in English on the enquiry confirmation screen.
- Prices such as "From ₹3,500*" come from the pricing data and show the `hi` and `mr` text only when it has been entered in `/admin`.
- Check the language pages at 375px wide for overflow in the navbar, hero buttons, cards and the booking modal. This was not checked by eye during development.
