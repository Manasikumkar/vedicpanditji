# Multilingual Site Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the site in English (default), Hindi (`/hi/...`) and Marathi (`/mr/...`) with a language switcher, translated chrome, homepage, catalogue and service-detail templates, and booking flow. Hindi and Marathi stay switched off in production until their translations are reviewed.

**Architecture:** The language comes from the URL prefix and lives in `AppContext` as `lang`. UI text moves into flat JSON dictionaries read through `useI18n()` in React and `translate()` in the prerender script, with English fallback. The prerender script runs its existing page builder once per enabled language and adds `hreflang`, canonical and sitemap alternates. Per-language flags (`enabled`, `indexable`) control what ships.

**Tech Stack:** React 19, Vite, Node built-in test runner, `acorn` + `acorn-jsx` (dev only, for the hard-coded-text finder), Google Fonts (Noto Sans Devanagari).

**Spec:** `docs/superpowers/specs/2026-11-02-multilingual-site-design.md`

**Conventions**
- Work in a dedicated worktree on branch `feature/multilingual` created from `main` (`git worktree add .worktrees/multilingual -b feature/multilingual`, then `npm install` in `frontend/`). `REPO` below means that worktree root. Do not edit the main checkout.
- Run frontend commands from `frontend/`. Commit commands run from `REPO`.
- Every commit ends with `-m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"`.
- Do not stage `frontend/package-lock.json` except in Task 3 (it adds dev dependencies).
- Run `git checkout frontend/public/sitemap.xml` after any `npm run build` (the build rewrites it).
- Node 22 or later is required (the test script uses a glob).
- **Execution order:** Tasks 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, then 5, then 15 to 21. Task 5 sweeps the links the component tasks did not cover, so it runs after them.

## File structure

| Path | Responsibility |
|---|---|
| `frontend/src/i18n/languages.js` | Language list with `enabled` and `indexable` flags, translated route types |
| `frontend/src/i18n/paths.js` | `splitLangPrefix`, `localizePath` (pure) |
| `frontend/src/i18n/switcher.js` | `switcherOptions` (pure) |
| `frontend/src/i18n/translate.js` | `createTranslator` (pure, no JSON import) |
| `frontend/src/i18n/index.js` | `translate` bound to the real dictionaries, re-exports |
| `frontend/src/i18n/useI18n.js` | React hook returning `{ t, lp, lang }` |
| `frontend/src/i18n/en.json`, `hi.json`, `mr.json` | Flat key to text dictionaries |
| `frontend/src/components/common/LanguageSwitcher.jsx` | Switcher UI |
| `frontend/scripts/snapshot-pages.mjs` + `scripts/__snapshots__/en/` | English render regression check |
| `frontend/scripts/find-hardcoded-text.mjs` | Finds untranslated text in in-scope files |
| `frontend/scripts/check-i18n.mjs` | SEO metadata checks per language |
| `frontend/scripts/compare-dist-html.mjs` | Compares two `dist` HTML trees |
| `frontend/scripts/check-i18n-build.mjs` | Checks the language files a build produced |
| `frontend/scripts/make-review-sheets.mjs` | Writes `docs/i18n/review-hi.md` and `review-mr.md` |

---

## Appendix A: Extraction procedure (used by Tasks 8 to 15)

Apply this to every file named in a task.

1. **List the hard-coded text:** `node scripts/find-hardcoded-text.mjs <files>` prints `file:line  kind  "text"` for each JSX text node, each string in the attributes `placeholder`, `title`, `aria-label`, `alt` and `label`, each first argument of `showToast(`, and each string value under object keys such as `label`, `title`, `subtitle`, `description`, `text`, `heading`, `question`, `answer`, `badge`, `caption`, `message`. That list is the work list.
2. **Key names:** `<area>.<slug>`, lowercase, dot between area and slug, hyphens inside the slug, at most five words, for example `nav.book-a-pandit`, `hero.title`, `booking.step.city`, `footer.contact-us`. Areas: `nav`, `footer`, `toast`, `switcher`, `home`, `catalogue`, `service`, `booking`, `enquiry`, `pricing`, `meta`, `ssr`. Two different texts that would get the same key get a numeric suffix (`-2`).
3. **Add to `en.json`:** the exact original text, character for character, including punctuation, emoji and non-breaking spaces. Keep keys sorted alphabetically.
4. **Replace in the component:** JSX text becomes `{t('area.slug')}`; attributes become `aria-label={t('area.slug')}`; toasts become `showToast(t('toast.slug'), 'success')`. Add `const { t, lp } = useI18n();` at the top of every component function that uses them (import from `../../i18n/useI18n`, adjust the relative path). Components defined at module level need their own hook call.
5. **Dynamic values:** text such as `Hello {name}, welcome` becomes the key `"Hello {name}, welcome"` and the call `t('x.greeting', { name })`. Text split by inline elements (for example `Book <strong>now</strong> today`) is split into separate keys around the element, never built with `dangerouslySetInnerHTML`.
6. **Module-level text:** arrays or objects at module level that hold display text move into the component body (so `t` is available), or hold keys that are translated at render time with `t(item.labelKey)`.
7. **Internal links:** every `href="/..."` becomes `href={lp('/...')}`. Links to `tel:`, `mailto:`, `https:` and `#` are untouched. `navigateTo(...)` needs no change (Task 5 makes it language-aware).
8. **Do not translate:** brand names (`VedicPanditji`), phone numbers, emoji, and data that comes from the data files (service names and descriptions, prices from the pricing functions, location names). If the finder flags something that must stay as is, add the exact string to `ALLOWED` in `scripts/find-hardcoded-text.mjs` with a one-line comment saying why.
9. **Verify:** `node scripts/find-hardcoded-text.mjs <files>` prints nothing; `npm test` passes; `node scripts/snapshot-pages.mjs` prints `OK` for every page (English output unchanged); `npm run lint` shows no new errors.
10. **Commit** the component files and `en.json` together.

A worked example, from the navbar (line numbers are approximate):

```jsx
// before
<span>Home</span>
<button aria-label="Open Navigation Menu">
<a href="/about-us"><span>About Us</span></a>

// after
const { t, lp } = useI18n();
<span>{t('nav.home')}</span>
<button aria-label={t('nav.open-menu')}>
<a href={lp('/about-us')}><span>{t('nav.about-us')}</span></a>
```

```json
{
  "nav.about-us": "About Us",
  "nav.home": "Home",
  "nav.open-menu": "Open Navigation Menu"
}
```

---

### Task 1: Language config and path helpers (TDD)

**Files:**
- Create: `frontend/src/i18n/languages.js`, `frontend/src/i18n/paths.js`, `frontend/src/i18n/switcher.js`
- Test: `frontend/src/i18n/paths.test.js`, `frontend/src/i18n/switcher.test.js`

- [ ] **Step 1: Write the failing tests**

`frontend/src/i18n/paths.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { splitLangPrefix, localizePath } from './paths.js';

test('splitLangPrefix detects the language prefix', () => {
  assert.deepEqual(splitLangPrefix('/'), { lang: 'en', path: '/' });
  assert.deepEqual(splitLangPrefix('/services'), { lang: 'en', path: '/services' });
  assert.deepEqual(splitLangPrefix('/hi'), { lang: 'hi', path: '/' });
  assert.deepEqual(splitLangPrefix('/hi/'), { lang: 'hi', path: '/' });
  assert.deepEqual(splitLangPrefix('/hi/services/griha-pravesh'), { lang: 'hi', path: '/services/griha-pravesh' });
  assert.deepEqual(splitLangPrefix('/mr/services'), { lang: 'mr', path: '/services' });
});

test('splitLangPrefix does not match paths that merely start with the letters', () => {
  assert.deepEqual(splitLangPrefix('/history'), { lang: 'en', path: '/history' });
  assert.deepEqual(splitLangPrefix('/hindi-puja'), { lang: 'en', path: '/hindi-puja' });
  assert.deepEqual(splitLangPrefix('/mrs'), { lang: 'en', path: '/mrs' });
});

test('localizePath leaves English paths unchanged', () => {
  assert.equal(localizePath('/services', 'en'), '/services');
  assert.equal(localizePath('/', 'en'), '/');
  assert.equal(localizePath('/services'), '/services');
});

test('localizePath adds the prefix for other languages', () => {
  assert.equal(localizePath('/services', 'hi'), '/hi/services');
  assert.equal(localizePath('/services/griha-pravesh', 'mr'), '/mr/services/griha-pravesh');
  assert.equal(localizePath('/', 'hi'), '/hi');
  assert.equal(localizePath('/services#top', 'hi'), '/hi/services#top');
});

test('localizePath leaves non-site links alone', () => {
  assert.equal(localizePath('#faq', 'hi'), '#faq');
  assert.equal(localizePath('tel:+911234567890', 'hi'), 'tel:+911234567890');
  assert.equal(localizePath('https://example.com/x', 'hi'), 'https://example.com/x');
  assert.equal(localizePath('mailto:a@b.c', 'mr'), 'mailto:a@b.c');
});
```

`frontend/src/i18n/switcher.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { switcherOptions } from './switcher.js';

const languages = {
  en: { code: 'en', label: 'EN', name: 'English', enabled: true, indexable: true },
  hi: { code: 'hi', label: 'हिन्दी', name: 'Hindi', enabled: true, indexable: false },
  mr: { code: 'mr', label: 'मराठी', name: 'Marathi', enabled: false, indexable: false }
};

test('translated route lists every enabled language with the same page', () => {
  const { options, englishOnly } = switcherOptions({ pathname: '/hi/services/griha-pravesh', route: 'service-detail', languages });
  assert.deepEqual(options.map((o) => [o.code, o.href]), [
    ['en', '/services/griha-pravesh'],
    ['hi', '/hi/services/griha-pravesh']
  ]);
  assert.equal(englishOnly, false);
});

test('homepage links use the bare prefix', () => {
  const { options } = switcherOptions({ pathname: '/', route: 'home', languages });
  assert.deepEqual(options.map((o) => o.href), ['/', '/hi']);
});

test('untranslated route offers English only and flags the note', () => {
  const { options, englishOnly } = switcherOptions({ pathname: '/hi/about-us', route: 'about-us', languages });
  assert.deepEqual(options.map((o) => [o.code, o.href]), [['en', '/about-us']]);
  assert.equal(englishOnly, true);
});

test('no note when no other language is enabled', () => {
  const onlyEnglish = { ...languages, hi: { ...languages.hi, enabled: false } };
  const { options, englishOnly } = switcherOptions({ pathname: '/about-us', route: 'about-us', languages: onlyEnglish });
  assert.equal(options.length, 1);
  assert.equal(englishOnly, false);
});
```

- [ ] **Step 2: Run and confirm failure**

```bash
cd frontend && npm test
```

Expected: FAIL with `Cannot find module './paths.js'` (and `./switcher.js`).

- [ ] **Step 3: Implement**

`frontend/src/i18n/languages.js`:

```js
export const DEFAULT_LANG = 'en';

// enabled: shown in the switcher and prerendered into dist.
// indexable: indexed by search engines, listed in hreflang and the sitemap.
// Hindi and Marathi stay off in production until their translations are reviewed.
export const LANGUAGES = {
  en: { code: 'en', label: 'EN', name: 'English', enabled: true, indexable: true },
  hi: { code: 'hi', label: 'हिन्दी', name: 'Hindi', enabled: false, indexable: false },
  mr: { code: 'mr', label: 'मराठी', name: 'Marathi', enabled: false, indexable: false }
};

export const LANG_CODES = Object.keys(LANGUAGES);
export const NON_DEFAULT_LANGS = LANG_CODES.filter((code) => code !== DEFAULT_LANG);

// Route types whose chrome and template text are translated in this phase.
export const TRANSLATED_ROUTES = ['home', 'catalogue', 'services', 'service-detail'];
export const isTranslatedRoute = (route) => TRANSLATED_ROUTES.includes(route);
```

`frontend/src/i18n/paths.js`:

```js
import { DEFAULT_LANG, NON_DEFAULT_LANGS } from './languages.js';

const PREFIX_RE = new RegExp(`^/(${NON_DEFAULT_LANGS.join('|')})(?=/|$)`);

// '/hi/services/x' -> { lang: 'hi', path: '/services/x' }; '/hi' -> { lang: 'hi', path: '/' }
export function splitLangPrefix(pathname) {
  const match = pathname.match(PREFIX_RE);
  if (!match) return { lang: DEFAULT_LANG, path: pathname || '/' };
  return { lang: match[1], path: pathname.slice(match[0].length) || '/' };
}

// '/services' + 'hi' -> '/hi/services'; '/' + 'hi' -> '/hi'; English and non-site links unchanged.
export function localizePath(path, lang = DEFAULT_LANG) {
  if (lang === DEFAULT_LANG || !path.startsWith('/')) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}
```

`frontend/src/i18n/switcher.js`:

```js
import { LANGUAGES, DEFAULT_LANG, isTranslatedRoute } from './languages.js';
import { localizePath, splitLangPrefix } from './paths.js';

// Switcher entries for the current page. Other languages appear only on translated route types;
// englishOnly asks the UI to show the "English only for now" note.
export function switcherOptions({ pathname, route, languages = LANGUAGES }) {
  const { path } = splitLangPrefix(pathname);
  const translated = isTranslatedRoute(route);
  const all = Object.values(languages);
  const options = all
    .filter((l) => l.enabled && (l.code === DEFAULT_LANG || translated))
    .map((l) => ({ code: l.code, label: l.label, name: l.name, href: localizePath(path, l.code) }));
  const englishOnly = !translated && all.some((l) => l.enabled && l.code !== DEFAULT_LANG);
  return { options, englishOnly };
}
```

- [ ] **Step 4: Run and commit**

```bash
npm test
```

Expected: all tests pass (localize 5, pricingDoc 6, paths 5, switcher 4 = 20).

```bash
cd .. && git add frontend/src/i18n && git commit -m "feat(i18n): language config, path and switcher helpers" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Translator, dictionaries, `useI18n` and the key guard (TDD)

**Files:**
- Create: `frontend/src/i18n/translate.js`, `frontend/src/i18n/index.js`, `frontend/src/i18n/useI18n.js`
- Create: `frontend/src/i18n/en.json`, `hi.json`, `mr.json`
- Test: `frontend/src/i18n/translate.test.js`, `frontend/src/i18n/dictionaries.test.js`

- [ ] **Step 1: Write the failing tests**

`frontend/src/i18n/translate.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createTranslator } from './translate.js';

const translate = createTranslator({
  en: { 'a.hello': 'Hello', 'a.greet': 'Hi {name}, you have {count} items', 'a.only-en': 'Only English', 'a.empty': 'Fallback text' },
  hi: { 'a.hello': 'नमस्ते', 'a.greet': 'नमस्ते {name}, आपके {count} आइटम हैं', 'a.empty': '' },
  mr: {}
});

test('returns the text for the language', () => {
  assert.equal(translate('hi', 'a.hello'), 'नमस्ते');
  assert.equal(translate('en', 'a.hello'), 'Hello');
});

test('falls back to English when the key or text is missing', () => {
  assert.equal(translate('hi', 'a.only-en'), 'Only English');
  assert.equal(translate('mr', 'a.hello'), 'Hello');
  assert.equal(translate('hi', 'a.empty'), 'Fallback text');
});

test('returns the key itself when no language has it', () => {
  assert.equal(translate('hi', 'a.unknown'), 'a.unknown');
});

test('fills {placeholders} and leaves unknown ones visible', () => {
  assert.equal(translate('en', 'a.greet', { name: 'Asha', count: 3 }), 'Hi Asha, you have 3 items');
  assert.equal(translate('hi', 'a.greet', { name: 'आशा', count: 3 }), 'नमस्ते आशा, आपके 3 आइटम हैं');
  assert.equal(translate('en', 'a.greet', { name: 'Asha' }), 'Hi Asha, you have {count} items');
});
```

`frontend/src/i18n/dictionaries.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(here, '..');
const read = (name) => JSON.parse(fs.readFileSync(path.join(here, `${name}.json`), 'utf8'));
const en = read('en');
const hi = read('hi');
const mr = read('mr');
const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(jsx?|mjs)$/.test(entry.name) && !entry.name.endsWith('.test.js') ? [full] : [];
  });
}

test('every key used in the code exists in en.json', () => {
  const used = new Set();
  const re = /\b(?:t|translate)\(\s*(?:[a-zA-Z_]+\s*,\s*)?['"]([\w.-]+)['"]/g;
  for (const file of sourceFiles(srcDir)) {
    for (const match of fs.readFileSync(file, 'utf8').matchAll(re)) used.add(match[1]);
  }
  assert.deepEqual([...used].filter((key) => !(key in en)).sort(), []);
});

test('en.json values are non-empty strings', () => {
  const bad = Object.entries(en).filter(([, v]) => typeof v !== 'string' || v.trim() === '');
  assert.deepEqual(bad, []);
});

for (const [name, dict] of [['hi', hi], ['mr', mr]]) {
  test(`${name}.json has no keys that are missing from en.json`, () => {
    assert.deepEqual(Object.keys(dict).filter((key) => !(key in en)), []);
  });

  test(`${name}.json keeps the same {placeholders} as English`, () => {
    const bad = Object.keys(dict).filter((key) => key in en && placeholders(dict[key]) !== placeholders(en[key]));
    assert.deepEqual(bad, []);
  });
}
```

- [ ] **Step 2: Run and confirm failure**

```bash
cd frontend && npm test
```

Expected: FAIL (`Cannot find module './translate.js'`, and the JSON files are missing).

- [ ] **Step 3: Implement**

`frontend/src/i18n/translate.js`:

```js
// Pure translator factory. dicts = { en: {...}, hi: {...}, mr: {...} } of flat key -> text.
// A missing or empty text falls back to the default language, then to the key itself.
export function createTranslator(dicts, defaultLang = 'en') {
  return function translate(lang, key, vars) {
    const text = dicts[lang]?.[key] || dicts[defaultLang]?.[key];
    if (text === undefined) return key;
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
  };
}
```

`frontend/src/i18n/en.json`:

```json
{
  "switcher.english-only": "This page is English only for now",
  "switcher.label": "Language"
}
```

`frontend/src/i18n/hi.json` and `frontend/src/i18n/mr.json` both start as:

```json
{}
```

`frontend/src/i18n/index.js`:

```js
import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';
import { createTranslator } from './translate.js';

export const translate = createTranslator({ en, hi, mr });
export { LANGUAGES, DEFAULT_LANG, TRANSLATED_ROUTES, isTranslatedRoute } from './languages.js';
export { localizePath, splitLangPrefix } from './paths.js';
```

`frontend/src/i18n/useI18n.js`:

```js
import { useApp } from '../context/AppContext';
import { translate } from './index.js';
import { localizePath } from './paths.js';

// t(key, vars): translated text for the current language. lp(path): link path with the language prefix.
export function useI18n() {
  const { lang } = useApp();
  return {
    lang,
    t: (key, vars) => translate(lang, key, vars),
    lp: (path) => localizePath(path, lang)
  };
}
```

- [ ] **Step 4: Run and commit**

```bash
npm test
```

Expected: all tests pass.

```bash
cd .. && git add frontend/src/i18n && git commit -m "feat(i18n): translator, dictionaries and key guard" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: English render snapshot and hard-coded-text finder

**Files:**
- Modify: `frontend/package.json` (dev dependencies and scripts)
- Create: `frontend/scripts/snapshot-pages.mjs`, `frontend/scripts/stubs/gsap.js`, `frontend/scripts/stubs/ScrollTrigger.js`
- Create: `frontend/scripts/find-hardcoded-text.mjs`
- Create: `frontend/scripts/__snapshots__/en/*.html` (generated baseline)

Both scripts are the safety net for the later refactor. Create the snapshot baseline before any component is changed.

- [ ] **Step 1: Add the dev dependencies and scripts**

```bash
cd frontend && npm install --save-dev acorn acorn-jsx
```

In `frontend/package.json` `scripts`, add:

```json
    "i18n:find": "node scripts/find-hardcoded-text.mjs",
    "i18n:snapshot": "node scripts/snapshot-pages.mjs",
```

- [ ] **Step 2: Write the gsap stubs**

`frontend/scripts/stubs/gsap.js`:

```js
// No-op gsap for server-side rendering checks: animations do not change the markup.
const chain = () => {
  const api = new Proxy(function () {}, { get: (_t, prop) => (prop === 'then' ? undefined : api), apply: () => api });
  return api;
};
const gsap = new Proxy({}, { get: (_t, prop) => (prop === 'then' ? undefined : chain()) });
export default gsap;
export { gsap };
```

`frontend/scripts/stubs/ScrollTrigger.js`:

```js
const ScrollTrigger = new Proxy({}, { get: () => () => {} });
export { ScrollTrigger };
export default ScrollTrigger;
```

- [ ] **Step 3: Write the snapshot script**

`frontend/scripts/snapshot-pages.mjs`:

```js
// Renders the app to static HTML at fixed URLs and compares it with committed English baselines.
// Usage: node scripts/snapshot-pages.mjs [--update]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapDir = path.join(root, 'scripts', '__snapshots__', 'en');
const update = process.argv.includes('--update');

function installBrowserStubs(pathname) {
  const noop = () => {};
  const mql = () => ({ matches: false, addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop });
  const storage = { getItem: () => null, setItem: noop, removeItem: noop };
  globalThis.window = {
    location: { pathname, href: `http://localhost${pathname}`, search: '', hash: '', origin: 'http://localhost' },
    addEventListener: noop, removeEventListener: noop, scrollTo: noop, matchMedia: mql,
    innerWidth: 1280, innerHeight: 800, localStorage: storage, sessionStorage: storage,
    history: { pushState: noop, replaceState: noop }, dataLayer: [], requestAnimationFrame: noop
  };
  globalThis.document = {
    documentElement: { lang: 'en' }, body: {}, head: { appendChild: noop }, title: '',
    querySelector: () => null, querySelectorAll: () => [], getElementById: () => null,
    createElement: () => ({ style: {}, setAttribute: noop }), addEventListener: noop, removeEventListener: noop
  };
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  resolve: {
    alias: [
      { find: 'gsap/ScrollTrigger', replacement: path.join(root, 'scripts/stubs/ScrollTrigger.js') },
      { find: /^gsap$/, replacement: path.join(root, 'scripts/stubs/gsap.js') }
    ]
  },
  ssr: { noExternal: ['gsap'] }
});

let failed = false;
try {
  const { SERVICES } = await vite.ssrLoadModule('./src/data/vedicPanditData.js');
  const urls = ['/', '/services', `/services/${SERVICES[0].id}`, '/services/griha-pravesh'];
  fs.mkdirSync(snapDir, { recursive: true });

  for (const url of urls) {
    installBrowserStubs(url);
    const { AppProvider } = await vite.ssrLoadModule('./src/context/AppContext.jsx');
    const { default: App } = await vite.ssrLoadModule('./src/App.jsx');
    const html = renderToString(React.createElement(AppProvider, null, React.createElement(App)));
    const file = path.join(snapDir, `${url === '/' ? 'home' : url.slice(1).replace(/\//g, '__')}.html`);

    if (update || !fs.existsSync(file)) {
      fs.writeFileSync(file, html);
      console.log(`wrote ${path.relative(root, file)} (${html.length} bytes)`);
    } else {
      const expected = fs.readFileSync(file, 'utf8');
      if (expected === html) {
        console.log(`OK   ${url}`);
      } else {
        failed = true;
        let i = 0;
        while (i < html.length && html[i] === expected[i]) i += 1;
        console.log(`DIFF ${url} at char ${i}\n  expected: ...${expected.slice(Math.max(0, i - 60), i + 120)}\n  actual:   ...${html.slice(Math.max(0, i - 60), i + 120)}`);
      }
    }
  }
} finally {
  await vite.close();
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 4: Create the baseline (before any component change)**

```bash
node scripts/snapshot-pages.mjs --update
node scripts/snapshot-pages.mjs
```

Expected: four `wrote ...` lines, then four `OK` lines. If rendering throws because a component touches a browser API the stubs lack, extend `installBrowserStubs` with a no-op for that API and rerun. If `/services/griha-pravesh` is not a real service id, replace it with another id from `SERVICES`. Check that the baseline is real content, not an error shell: `grep -c "Griha Pravesh\|Book a Pandit" scripts/__snapshots__/en/home.html` must be above 0. The snapshot must be byte-stable: run the second command twice and get the same result. If it is not stable (random ids, dates), strip the unstable pieces in the script before comparing and say what you stripped.

- [ ] **Step 5: Write the finder**

`frontend/scripts/find-hardcoded-text.mjs`:

```js
// Lists user-visible hard-coded text in the given files. Usage: node scripts/find-hardcoded-text.mjs <files...>
import fs from 'node:fs';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';

const JSXParser = Parser.extend(jsx());
const TEXT_ATTRS = new Set(['placeholder', 'title', 'aria-label', 'alt', 'label']);
const TEXT_KEYS = new Set(['label', 'title', 'subtitle', 'description', 'text', 'heading', 'question', 'answer', 'badge', 'caption', 'message', 'cta']);
// Exact strings that stay untranslated on purpose. Add a comment for each entry.
const ALLOWED = new Set([
  'VedicPanditji', // brand name
  'Vedic', 'Panditji' // brand name split across spans
]);
const HAS_LETTERS = /[A-Za-zऀ-ॿ]/;

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: node scripts/find-hardcoded-text.mjs <files...>');
  process.exit(2);
}

let count = 0;
const report = (file, node, kind, text) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!HAS_LETTERS.test(clean) || ALLOWED.has(clean)) return;
  count += 1;
  console.log(`${file}:${node.loc.start.line}  ${kind}  "${clean}"`);
};

function walk(node, file) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'JSXText') report(file, node, 'text', node.value);
  if (node.type === 'JSXAttribute' && TEXT_ATTRS.has(node.name.name) && node.value?.type === 'Literal' && typeof node.value.value === 'string') {
    report(file, node, `attr:${node.name.name}`, node.value.value);
  }
  if (node.type === 'CallExpression' && node.callee.name === 'showToast' && node.arguments[0]?.type === 'Literal' && typeof node.arguments[0].value === 'string') {
    report(file, node, 'toast', node.arguments[0].value);
  }
  if (node.type === 'CallExpression' && node.callee.name === 'showToast' && node.arguments[0]?.type === 'TemplateLiteral') {
    report(file, node, 'toast', node.arguments[0].quasis.map((q) => q.value.cooked).join('{}'));
  }
  if (node.type === 'Property' && !node.computed && TEXT_KEYS.has(node.key.name || node.key.value) && node.value.type === 'Literal' && typeof node.value.value === 'string') {
    report(file, node, `key:${node.key.name || node.key.value}`, node.value.value);
  }
  for (const key of Object.keys(node)) {
    const child = node[key];
    if (Array.isArray(child)) child.forEach((c) => walk(c, file));
    else if (child && typeof child.type === 'string') walk(child, file);
  }
}

for (const file of files) {
  const ast = JSXParser.parse(fs.readFileSync(file, 'utf8'), { ecmaVersion: 'latest', sourceType: 'module', locations: true });
  walk(ast, file);
}
process.exit(count === 0 ? 0 : 1);
```

- [ ] **Step 6: Try the finder**

```bash
node scripts/find-hardcoded-text.mjs src/components/common/Navbar.jsx | head -12
echo "exit: $?"
```

Expected: lines such as `src/components/common/Navbar.jsx:112  text  "Home"` and `...  attr:aria-label  "Open Navigation Menu"`. If it throws a parse error on a file, report the file and message instead of changing the parser silently.

- [ ] **Step 7: Commit**

```bash
cd .. && git add frontend/package.json frontend/package-lock.json frontend/scripts && git commit -m "test(i18n): English render snapshot and hard-coded text finder" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Language-aware routing in `AppContext`

**Files:**
- Modify: `frontend/src/context/AppContext.jsx`

- [ ] **Step 1: Add the import**

After `import { loadLivePricing } from '../services/pricingService';` add:

```js
import { splitLangPrefix, localizePath } from '../i18n/paths';
import { DEFAULT_LANG } from '../i18n/languages';
```

- [ ] **Step 2: Strip the prefix before matching routes**

In `parseRouteFromLocation`, replace

```js
    const path = window.location.pathname.replace(/\/$/, '') || '/';
```

with

```js
    const path = splitLangPrefix(window.location.pathname).path.replace(/\/$/, '') || '/';
```

- [ ] **Step 3: Add the language state**

Directly after the `const initialRoute = parseRouteFromLocation();` line add:

```js
  const parseLang = () => (typeof window === 'undefined' ? DEFAULT_LANG : splitLangPrefix(window.location.pathname).lang);
```

Directly after `const [routeParams, setRouteParams] = useState(initialRoute.params);` add:

```js
  const [lang, setLang] = useState(parseLang);
```

In the popstate handler, after `setRouteParams(parsed.params);` add:

```js
      setLang(parseLang());
```

After the popstate effect add:

```js
  // Keep <html lang> in step with the URL language
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
```

- [ ] **Step 4: Keep the language when navigating**

In `navigateTo`, replace

```js
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ route, params }, '', targetPath);
      }
```

with

```js
      const localizedPath = localizePath(targetPath, lang);
      if (window.location.pathname !== localizedPath) {
        window.history.pushState({ route, params }, '', localizedPath);
      }
```

- [ ] **Step 5: Pass the language to SEO and expose it**

Replace

```js
    const meta = getSeoMetadata(currentRoute, routeParams);
    applySeoMetadataToDom(meta);
    if (currentRoute !== 'admin') Analytics.trackPageView(meta.title, window.location.pathname);
  }, [currentRoute, routeParams]);
```

with

```js
    const meta = getSeoMetadata(currentRoute, routeParams, lang);
    applySeoMetadataToDom(meta);
    if (currentRoute !== 'admin') Analytics.trackPageView(meta.title, window.location.pathname);
  }, [currentRoute, routeParams, lang]);
```

In the context `value={{` object add `lang,` after `pricingVersion,`.

(`getSeoMetadata` ignores the third argument until Task 16, so this is safe now.)

- [ ] **Step 6: Verify**

```bash
cd frontend && node scripts/snapshot-pages.mjs
npm test
npm run lint 2>&1 | grep -c " error"
```

Expected: `OK` for all four pages (English output unchanged), tests pass, 0 lint errors. Then verify a prefixed URL: add `'/hi/services'` to the `urls` array in `scripts/snapshot-pages.mjs`, run `node scripts/snapshot-pages.mjs --update`, and check that the new `hi__services.html` renders the catalogue like English (`diff scripts/__snapshots__/en/services.html scripts/__snapshots__/en/hi__services.html && echo same` prints `same`, because the links are not localized yet and the text is still English). Keep `'/hi/services'` in the list as a routing regression check. Later tasks that change links (Task 5) will legitimately change that one snapshot: when they do, refresh it with `--update` and review the diff, which must contain only `/hi` link prefixes.

- [ ] **Step 7: Commit**

```bash
cd .. && git add frontend/src/context/AppContext.jsx frontend/scripts && git commit -m "feat(i18n): language state and prefix-aware routing" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Localize every internal link outside the in-scope files

**Files:**
- Modify: every file under `frontend/src` that still has `href="/..."` or `` href={`/...`} `` internal links. Run this task after Tasks 7 to 14, which already localize the links in their own files; it sweeps the rest.

Language must survive navigation: a visitor on `/hi/services` who clicks a link in any page, including English-only pages, stays under `/hi`.

- [ ] **Step 1: List the links**

```bash
cd frontend && grep -rnE "href=\"/[^\"]*\"|href=\{\`/|href=\{'/" src --include=*.jsx | grep -v "href=\"/images\|href=\"/favicon"
```

- [ ] **Step 2: Replace them**

For each match, add `const { lp } = useI18n();` (import from the correct relative path of `i18n/useI18n`) in the component function and change `href="/x"` to `href={lp('/x')}`, and `` href={`/x/${id}`} `` to `` href={lp(`/x/${id}`)} ``. Links in module-level data files (not components) are left alone; report them.

- [ ] **Step 3: Verify**

```bash
grep -rnE "href=\"/[^\"]*\"" src --include=*.jsx | grep -v "href=\"/images\|href=\"/favicon"
```

Expected: no output. Then:

```bash
node scripts/snapshot-pages.mjs && npm test && npm run lint 2>&1 | grep -c " error"
```

Expected: `OK` for all pages, tests pass, 0 lint errors.

- [ ] **Step 4: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): localize internal links" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Language switcher component and navbar placement

**Files:**
- Create: `frontend/src/components/common/LanguageSwitcher.jsx`
- Modify: `frontend/src/components/common/Navbar.jsx`

- [ ] **Step 1: Write the component**

`frontend/src/components/common/LanguageSwitcher.jsx`:

```jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n/useI18n';
import { switcherOptions } from '../../i18n/switcher';

export default function LanguageSwitcher() {
  const { lang, currentRoute } = useApp();
  const { t } = useI18n();
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const { options, englishOnly } = switcherOptions({ pathname, route: currentRoute });

  // Nothing to switch between and nothing to explain
  if (options.length < 2 && !englishOnly) return null;

  return (
    <div
      className="vp-lang-switcher"
      role="navigation"
      aria-label={t('switcher.label')}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}
    >
      {options.map((o) => (
        <a
          key={o.code}
          href={o.href}
          hrefLang={o.code}
          lang={o.code}
          aria-current={o.code === lang ? 'true' : undefined}
          style={{
            textDecoration: 'none',
            color: o.code === lang ? '#BD4B23' : '#1A1613',
            fontWeight: o.code === lang ? 700 : 500
          }}
        >
          {o.label}
        </a>
      ))}
      {englishOnly && <span style={{ color: '#6B6558', fontSize: '12px' }}>{t('switcher.english-only')}</span>}
    </div>
  );
}
```

- [ ] **Step 2: Place it in the navbar**

In `frontend/src/components/common/Navbar.jsx`, import `LanguageSwitcher from './LanguageSwitcher'` and render `<LanguageSwitcher />` in the right-hand area of the desktop bar directly before the "Book a Pandit" button, and once at the top of the mobile navigation drawer body. Keep the existing styles and layout; the switcher is one compact inline group.

- [ ] **Step 3: Verify**

With both languages disabled the switcher renders nothing, so English output must not change:

```bash
node scripts/snapshot-pages.mjs
npm test
npm run lint 2>&1 | grep -c " error"
```

Expected: `OK` for every page, tests pass, 0 lint errors. Then temporarily set `hi.enabled = true` in `src/i18n/languages.js`, run `npm run dev`, open `http://localhost:5173/services` and `http://localhost:5173/about-us`, and check by eye: on `/services` the switcher shows `EN | हिन्दी` and the Hindi link goes to `/hi/services`; on `/about-us` it shows `EN` and the note. Set `hi.enabled` back to `false` before committing.

- [ ] **Step 4: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): language switcher" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Extract text: Navbar, Toast and context toasts

**Files:**
- Modify: `frontend/src/components/common/Navbar.jsx`, `frontend/src/components/common/Toast.jsx`, `frontend/src/context/AppContext.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to the three source files, areas `nav` and `toast`. For `AppContext.jsx` only the user-visible toast and message strings change; the provider is not a component that can call `useI18n`, so use `translate(lang, key)` imported from `../i18n` there, with the provider's own `lang` state. `Toast.jsx` itself shows `toast.message`, which is already translated by the caller, so it normally has no text of its own.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands on these three files.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract navbar and toast text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Extract text: Footer

**Files:**
- Modify: `frontend/src/components/common/Footer.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to `Footer.jsx`, area `footer`.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract footer text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Extract text: Hero section

**Files:**
- Modify: `frontend/src/components/home/HeroSection.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to `HeroSection.jsx`, area `home`, key prefix `home.hero.` (for example `home.hero.title`, `home.hero.search-placeholder`). The file is 611 lines with several module-level arrays of display text; Appendix A step 6 applies.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract hero section text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Extract text: other homepage sections

**Files:**
- Modify: `frontend/src/components/home/CounterSection.jsx`, `FeaturedPujas.jsx`, `HowItWorksSection.jsx`, `MediaCoverage.jsx`, `MultiCitySection.jsx`, `ReviewsSection.jsx`, `ServiceCategories.jsx`, `TempleServicesSection.jsx`, `TrustCredentials.jsx`, `frontend/src/pages/HomePage.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to each file, area `home`, key prefix per file (`home.counter.`, `home.featured.`, `home.how.`, `home.media.`, `home.cities.`, `home.reviews.`, `home.categories.`, `home.temple.`, `home.trust.`). Customer review texts and city names that come from data arrays stay as data (Appendix A step 8) unless they are UI labels. If a review quote lives inside the component as a literal, treat it as content: leave it English and add the exact string to `ALLOWED` with the comment `review quote, content batch`.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands on all files.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract homepage section text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Extract text: Catalogue page

**Files:**
- Modify: `frontend/src/pages/CataloguePage.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to `CataloguePage.jsx`, area `catalogue`. Service names, categories coming from data, and prices stay data. Pass the language to the pricing helpers: change `getPricingDisplay(a.id)` and `getPricingDisplay(service.id)` calls to `getPricingDisplay(a.id, lang)` and `getPricingDisplay(service.id, lang)`, with `lang` from `useI18n()`.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract catalogue page text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Extract text: Service detail page and pricing section

**Files:**
- Modify: `frontend/src/pages/ServiceDetailPage.jsx`, `frontend/src/components/pricing/PricingPackagesSection.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to both files, areas `service` and `pricing`. Template labels, headings and buttons are in scope; the service description and long-form sections that come from the data files are not (Appendix A step 8). Pass the language to the pricing functions: `getPricingDisplay(service.id, lang)`, `getPujaPricing(service, city, lang)`, and `getOptionalSamagriOptions(lang)`, with `lang` from `useI18n()`.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract service detail and pricing section text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Extract text: Booking modal

**Files:**
- Modify: `frontend/src/components/common/BookingModal.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to `BookingModal.jsx`, area `booking`. The modal only renders when open, so the snapshot does not cover it; rely on the finder and the manual walk in Step 2. Pass the language to the pricing calls: `getPackagesForService(activeService, city, lang)` (in both places it is called) and `getOptionalSamagriOptions(lang)`. The text of the booking record sent to the webhook (selected extras names, notes) stays in English so downstream automation is unchanged: keep `calculateBookingTotal` and the saved package names English by resolving them with `lang` `'en'`.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands, then run `npm run dev`, open a service page, click the booking button, and step through every screen of the modal. The text must read exactly as before.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract booking modal text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Extract text: Enquiry confirmation view

**Files:**
- Modify: `frontend/src/components/common/EnquiryConfirmationView.jsx`, `frontend/src/i18n/en.json`

- [ ] **Step 1: Apply Appendix A** to `EnquiryConfirmationView.jsx`, area `enquiry`. Text that is sent out through WhatsApp or the webhook (message bodies) stays English.
- [ ] **Step 2: Verify** with the Appendix A step 9 commands, and by completing a test booking in `npm run dev` to reach the confirmation screen.
- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): extract enquiry confirmation text" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 15: Whole in-scope finder gate

**Files:**
- Create: `frontend/scripts/i18n-scope.json`
- Modify: `frontend/package.json`

- [ ] **Step 1: List the in-scope files in one place**

`frontend/scripts/i18n-scope.json`:

```json
[
  "src/components/common/Navbar.jsx",
  "src/components/common/Footer.jsx",
  "src/components/common/Toast.jsx",
  "src/components/common/LanguageSwitcher.jsx",
  "src/components/common/BookingModal.jsx",
  "src/components/common/EnquiryConfirmationView.jsx",
  "src/components/home/CounterSection.jsx",
  "src/components/home/FeaturedPujas.jsx",
  "src/components/home/HeroSection.jsx",
  "src/components/home/HowItWorksSection.jsx",
  "src/components/home/MediaCoverage.jsx",
  "src/components/home/MultiCitySection.jsx",
  "src/components/home/ReviewsSection.jsx",
  "src/components/home/ServiceCategories.jsx",
  "src/components/home/TempleServicesSection.jsx",
  "src/components/home/TrustCredentials.jsx",
  "src/components/pricing/PricingPackagesSection.jsx",
  "src/pages/HomePage.jsx",
  "src/pages/CataloguePage.jsx",
  "src/pages/ServiceDetailPage.jsx"
]
```

In `frontend/package.json` `scripts` replace `"i18n:find": ...` with:

```json
    "i18n:find": "node scripts/find-hardcoded-text.mjs $(node -p \"require('./scripts/i18n-scope.json').join(' ')\")",
```

- [ ] **Step 2: Run the gate**

```bash
cd frontend && npm run i18n:find; echo "exit: $?"; npm test; node scripts/snapshot-pages.mjs; npm run lint 2>&1 | grep -c " error"
```

Expected: `i18n:find` prints nothing and exits 0, tests pass, every snapshot is `OK`, and 0 lint errors. Fix anything the finder still reports by applying Appendix A to the named file.

- [ ] **Step 3: Commit**

```bash
cd .. && git add frontend/scripts frontend/package.json frontend/src && git commit -m "test(i18n): gate for hard-coded text in in-scope files" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 16: SEO metadata per language (checked with an SSR script)

**Files:**
- Modify: `frontend/src/utils/seoMetadata.js`, `frontend/src/i18n/en.json`
- Create: `frontend/scripts/check-i18n.mjs`
- Modify: `frontend/package.json`

- [ ] **Step 1: Write the check first**

`frontend/scripts/check-i18n.mjs`:

```js
// Checks language-aware SEO metadata. Usage: node scripts/check-i18n.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });

try {
  const { getSeoMetadata } = await vite.ssrLoadModule('./src/utils/seoMetadata.js');
  const { SERVICES } = await vite.ssrLoadModule('./src/data/vedicPanditData.js');
  const { LANGUAGES } = await vite.ssrLoadModule('./src/i18n/languages.js');
  const serviceId = SERVICES[0].id;
  let checks = 0;
  const ok = (cond, msg) => { assert.ok(cond, msg); checks += 1; };

  // English is unchanged
  const en = getSeoMetadata('home', {});
  ok(en.canonical === 'https://vedicpanditji.com/', 'english home canonical');
  ok(en.robots === 'index, follow', 'english home robots');
  ok(JSON.stringify(getSeoMetadata('home', {}, 'en')) === JSON.stringify(en), 'explicit en equals default');

  for (const lang of ['hi', 'mr']) {
    const prefix = `https://vedicpanditji.com/${lang}`;
    const home = getSeoMetadata('home', {}, lang);
    ok(home.canonical === prefix, `${lang} home canonical is ${prefix}, got ${home.canonical}`);
    ok(getSeoMetadata('catalogue', {}, lang).canonical === `${prefix}/services`, `${lang} catalogue canonical`);
    ok(getSeoMetadata('service-detail', { serviceId }, lang).canonical === `${prefix}/services/${serviceId}`, `${lang} service canonical`);

    // Indexing follows the language flag
    const expectedRobots = LANGUAGES[lang].indexable ? 'index, follow' : 'noindex, follow';
    ok(home.robots === expectedRobots, `${lang} home robots ${home.robots} vs ${expectedRobots}`);

    // JSON-LD gets inLanguage
    const graph = home.schema?.['@graph'] || [];
    ok(graph.some((n) => n.inLanguage === `${lang}-IN`), `${lang} schema has inLanguage`);

    // An untranslated route keeps the English canonical and is never indexed
    const about = getSeoMetadata('about-us', {}, lang);
    ok(about.canonical === getSeoMetadata('about-us', {}).canonical, `${lang} about canonical stays English`);
    ok(about.robots.startsWith('noindex'), `${lang} about is noindex`);

    // Missing dictionary entries fall back to English text
    ok(home.title.length > 0 && home.description.length > 0, `${lang} home has title and description`);
  }
  console.log(`OK: ${checks} checks passed`);
} finally {
  await vite.close();
}
```

In `frontend/package.json` `scripts` add `"i18n:check": "node scripts/check-i18n.mjs",`.

- [ ] **Step 2: Run it and confirm it fails**

```bash
cd frontend && npm run i18n:check
```

Expected: FAIL on `hi home canonical` (the function ignores `lang` so the canonical is still the English URL).

- [ ] **Step 3: Implement the wrapper**

In `frontend/src/utils/seoMetadata.js`:

1. Add imports near the other imports:

```js
import { translate } from '../i18n/index.js';
import { LANGUAGES, DEFAULT_LANG, isTranslatedRoute } from '../i18n/languages.js';
import { localizePath } from '../i18n/paths.js';
```

2. Rename the existing exported function `getSeoMetadata(route, params = {})` to `function getEnglishSeoMetadata(route, params = {})` (no longer exported).

3. Add below it:

```js
const IN_LANGUAGE = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };

function withInLanguage(schema, lang) {
  if (!schema?.['@graph']) return schema;
  return {
    ...schema,
    '@graph': schema['@graph'].map((node) =>
      ['WebPage', 'WebSite', 'Service', 'CollectionPage'].includes(node['@type']) ? { ...node, inLanguage: IN_LANGUAGE[lang] } : node
    )
  };
}

// Metadata for a route in a language. English is unchanged; translated route types get text from the
// dictionaries and a language-prefixed canonical; every other route keeps its English canonical and is noindex.
export function getSeoMetadata(route, params = {}, lang = DEFAULT_LANG) {
  const meta = getEnglishSeoMetadata(route, params);
  if (lang === DEFAULT_LANG) return meta;
  if (!isTranslatedRoute(route)) return { ...meta, robots: 'noindex, follow' };

  const key = route === 'home' ? 'home' : route === 'service-detail' ? 'service' : 'catalogue';
  const vars = { name: params.serviceId ? serviceNameFor(params.serviceId) : '' };
  const title = translate(lang, `meta.${key}.title`, vars);
  const description = translate(lang, `meta.${key}.description`, vars);
  // translate() returns the key itself when no dictionary has it; use the English page text then
  const finalTitle = title !== `meta.${key}.title` ? title : meta.title;
  const finalDescription = description !== `meta.${key}.description` ? description : meta.description;

  return {
    ...meta,
    title: finalTitle,
    description: finalDescription,
    ogTitle: finalTitle,
    ogDescription: finalDescription,
    canonical: `${DOMAIN}${localizePath(new URL(meta.canonical).pathname, lang)}`,
    robots: LANGUAGES[lang].indexable ? meta.robots : 'noindex, follow',
    schema: withInLanguage(meta.schema, lang)
  };
}
```

4. Add `serviceNameFor(serviceId)` using the same service lookup the English `service-detail` branch uses (read that branch, import `SERVICES` the same way it does, and return `SERVICES.find((s) => s.id === serviceId)?.name || ''`). Remove the unused `english` constant if lint flags it.

- [ ] **Step 4: Add the metadata keys to `en.json`**

Add these keys with the exact English text currently used by the home and catalogue branches (copy the title and description strings from `getEnglishSeoMetadata`), and a service entry built from the English service-detail pattern with `{name}`:

- `meta.home.title`, `meta.home.description`
- `meta.catalogue.title`, `meta.catalogue.description`
- `meta.service.title` (the English title pattern with `{name}` in place of the service name), `meta.service.description` (same)

- [ ] **Step 5: Run and commit**

```bash
npm run i18n:check && npm test && node scripts/snapshot-pages.mjs
```

Expected: `OK: 17 checks passed` (or the real count printed by the script), tests pass, snapshots `OK`.

```bash
cd .. && git add frontend/src frontend/scripts frontend/package.json && git commit -m "feat(i18n): language-aware SEO metadata" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 17: Draft Hindi and Marathi and generate review sheets

**Files:**
- Modify: `frontend/src/i18n/hi.json`, `frontend/src/i18n/mr.json`
- Create: `frontend/scripts/make-review-sheets.mjs`
- Create: `docs/i18n/review-hi.md`, `docs/i18n/review-mr.md` (generated)
- Modify: `frontend/package.json`

- [ ] **Step 1: Write the review sheet generator**

`frontend/scripts/make-review-sheets.mjs`:

```js
// Writes docs/i18n/review-hi.md and review-mr.md from the dictionaries.
import fs from 'node:fs';

const dir = new URL('../src/i18n/', import.meta.url);
const read = (name) => JSON.parse(fs.readFileSync(new URL(`${name}.json`, dir), 'utf8'));
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const en = read('en');
const names = { hi: 'Hindi', mr: 'Marathi' };

fs.mkdirSync(new URL('../../docs/i18n/', import.meta.url), { recursive: true });
for (const lang of ['hi', 'mr']) {
  const dict = read(lang);
  const rows = Object.keys(en).map((key) => {
    const status = dict[key] ? 'needs review' : 'MISSING';
    return `| \`${key}\` | ${cell(en[key])} | ${cell(dict[key])} | ${status} |`;
  });
  const out = [
    `# ${names[lang]} translation review`,
    '',
    'Correct the "Draft" column in place. Keep `{placeholders}` exactly as written. Brand names stay as they are.',
    'Set the status to `reviewed` for rows you have checked.',
    '',
    '| Key | English | Draft | Status |',
    '| --- | --- | --- | --- |',
    ...rows,
    ''
  ].join('\n');
  fs.writeFileSync(new URL(`../../docs/i18n/review-${lang}.md`, import.meta.url), out);
  console.log(`review-${lang}.md: ${rows.length} rows, ${rows.filter((r) => r.endsWith('MISSING |')).length} missing`);
}
```

In `frontend/package.json` `scripts` add `"i18n:sheets": "node scripts/make-review-sheets.mjs",`.

- [ ] **Step 2: Draft the translations**

For every key in `en.json`, write natural Hindi in `hi.json` and natural Marathi in `mr.json` (Devanagari script, not transliterated English). Rules: keep every `{placeholder}` exactly; keep brand names (`VedicPanditji`) and numbers; keep the same level of formality as the English; use standard words for religious and ritual terms (puja, havan, muhurat, pandit, samagri, dakshina, griha pravesh are written in Devanagari as commonly used); keep button and label text short; do not translate strings that are only a brand or a symbol. Every key in `en.json` must get an entry.

- [ ] **Step 3: Verify and generate the sheets**

```bash
cd frontend && npm test && npm run i18n:sheets
```

Expected: tests pass (the guard confirms no stray keys and matching placeholders), and the script prints `review-hi.md: N rows, 0 missing` and the same for Marathi.

- [ ] **Step 4: Commit**

```bash
cd .. && git add frontend/src/i18n frontend/scripts frontend/package.json docs/i18n && git commit -m "feat(i18n): draft Hindi and Marathi and review sheets" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 18: Prerender per language

**Files:**
- Modify: `frontend/scripts/prerender.js`, `frontend/src/i18n/en.json`, `hi.json`, `mr.json`
- Create: `frontend/scripts/compare-dist-html.mjs`

The prerender builds each page's HTML as template strings. English output must stay byte-identical (apart from hashed asset names) when no other language is enabled.

- [ ] **Step 1: Take an English baseline of the build output**

```bash
cd frontend && npm run build && git checkout public/sitemap.xml && rm -rf /tmp/vp-dist-before && cp -R dist /tmp/vp-dist-before && ls /tmp/vp-dist-before | head -3
```

- [ ] **Step 2: Write the comparison script**

`frontend/scripts/compare-dist-html.mjs`:

```js
// Compares the HTML (and sitemap) of two dist folders, ignoring hashed asset file names.
// Usage: node scripts/compare-dist-html.mjs <before> <after>
import fs from 'node:fs';
import path from 'node:path';

const [before, after] = process.argv.slice(2);
const norm = (s) => s.replace(/assets\/[A-Za-z0-9_.-]+/g, 'assets/X');
const files = (dir) => fs.readdirSync(dir, { recursive: true }).filter((f) => /(\.html|sitemap\.xml)$/.test(f)).map(String).sort();

const a = files(before);
const b = files(after).filter((f) => !/^(hi|mr)[\\/]/.test(f));
let diffs = 0;
for (const f of a) {
  if (!b.includes(f)) { console.log(`MISSING in after: ${f}`); diffs += 1; continue; }
  const x = norm(fs.readFileSync(path.join(before, f), 'utf8'));
  const y = norm(fs.readFileSync(path.join(after, f), 'utf8'));
  if (x !== y) { console.log(`DIFF: ${f}`); diffs += 1; }
}
for (const f of b) if (!a.includes(f)) { console.log(`EXTRA in after: ${f}`); diffs += 1; }
console.log(diffs === 0 ? `OK: ${a.length} files identical` : `${diffs} differences`);
process.exit(diffs === 0 ? 0 : 1);
```

- [ ] **Step 3: Make the body builder language-aware**

In `frontend/scripts/prerender.js`:

1. In `run()`, next to the other `ssrLoadModule` lines, load the i18n module:

```js
  const { translate, LANGUAGES, localizePath, isTranslatedRoute } = await vite.ssrLoadModule('./src/i18n/index.js');
```

   and add `translate, localizePath` to `sharedData`.

2. Change the signature `function buildSemanticBody(route, params, data, meta)` to `function buildSemanticBody(route, params, data, meta, lang = 'en')` and, at the top of the function, add:

```js
  const t = (key, vars) => data.translate(lang, key, vars);
  const lp = (p) => data.localizePath(p, lang);
```

3. In the header, footer, homepage (`route === 'home'`), catalogue (`route === 'catalogue' || 'services'`) and service-detail (`route === 'service-detail'`) parts of the function only, apply Appendix A to the template strings: visible text becomes `${escapeHtml(t('ssr.some-key'))}` with the exact original English added to `en.json`; every `href="/x"` becomes `href="${lp('/x')}"`. Reuse existing component keys (for example `nav.home`) where the text is identical. Do not touch the other route types.

4. Run the build and compare:

```bash
npm run build && git checkout public/sitemap.xml && node scripts/compare-dist-html.mjs /tmp/vp-dist-before dist
```

Expected: `OK: <N> files identical`. If any file differs, the extraction changed English output; fix it.

- [ ] **Step 4: Run the page builder once per enabled language**

In the `for (const page of pages)` loop, wrap the loop body in an outer `for (const lang of renderLangs)`, where

```js
  const renderLangs = Object.values(LANGUAGES).filter((l) => l.enabled).map((l) => l.code);
  const indexableLangs = Object.values(LANGUAGES).filter((l) => l.indexable).map((l) => l.code);
```

and, inside, skip pages that are not translated for non-English languages:

```js
      if (lang !== 'en' && !isTranslatedRoute(page.route)) continue;
```

Then change these parts of the loop body:

- `const meta = getSeoMetadata(page.route, page.params, lang);`
- `const bodyHtml = buildSemanticBody(page.route, page.params, sharedData, meta, lang);`
- Replace `<html lang="en">` in the template with the language: after `let html = baseTemplate;` add `html = html.replace('<html lang="en">', `<html lang="${lang}">`);`
- Output path: for `lang !== 'en'` write under `dist/<lang>/...`: homepage `dist/<lang>/index.html`, others `dist/<lang>/<page.path>/index.html`.
- `hreflang` alternates, only when at least one non-English language is indexable and the page route is translated. Build them before the head string and add to `metaTags`:

```js
    const alternates = indexableLangs.length > 1 && isTranslatedRoute(page.route)
      ? [
          ...indexableLangs.map((l) => ({ hreflang: l, href: `${DOMAIN}${localizePath(`/${page.path}`.replace(/\/$/, '') || '/', l)}` })),
          { hreflang: 'x-default', href: `${DOMAIN}${`/${page.path}`.replace(/\/$/, '') || '/'}` }
        ]
      : [];
    const alternateTags = alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n    ');
```

  and append `${alternateTags}` after the canonical line in `metaTags`.
- For `lang !== 'en'` add the Devanagari font link before `</head>`:

```js
    const fontLink = lang !== 'en'
      ? '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap" rel="stylesheet" />'
      : '';
```

  and inject `${fontLink}` with the other head tags.
- Sitemap: keep adding an entry per (language, page) when `meta.robots` contains `index`, and add the alternates to the entry (`alternates`). In the XML writer add `xmlns:xhtml="http://www.w3.org/1999/xhtml"` to `<urlset>` and, inside each `<url>`, `u.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')` when present. With no indexable non-English language the output must equal today's.

- [ ] **Step 5: Verify English is unchanged with all languages off**

```bash
npm run build && git checkout public/sitemap.xml && node scripts/compare-dist-html.mjs /tmp/vp-dist-before dist && ls dist | grep -E "^(hi|mr)$" | wc -l
```

Expected: `OK: <N> files identical`, then `0` (no language folders because both are disabled).

- [ ] **Step 6: Commit**

```bash
cd .. && git add frontend/scripts frontend/src/i18n && git commit -m "feat(i18n): prerender per language with hreflang and sitemap alternates" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 19: Devanagari font and layout on language pages

**Files:**
- Modify: `frontend/src/index.css`, `frontend/src/context/AppContext.jsx`

- [ ] **Step 1: Add the CSS**

At the end of `frontend/src/index.css` add:

```css
/* Hindi and Marathi: Poppins has no Devanagari glyphs, so list Noto Sans Devanagari after it.
   !important is needed because many components set fontFamily inline. */
:lang(hi) *, :lang(mr) * {
  font-family: 'Poppins', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}
:lang(hi) body, :lang(mr) body {
  line-height: 1.75;
}
```

- [ ] **Step 2: Load the font in the browser on language pages**

In `AppContext.jsx` extend the `<html lang>` effect:

```js
  // Keep <html lang> in step with the URL language and load Devanagari glyphs for hi and mr
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang !== DEFAULT_LANG && !document.getElementById('vp-devanagari-font')) {
      const link = document.createElement('link');
      link.id = 'vp-devanagari-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, [lang]);
```

- [ ] **Step 3: Verify**

```bash
cd frontend && node scripts/snapshot-pages.mjs && npm test && npm run lint 2>&1 | grep -c " error"
```

Expected: snapshots `OK`, tests pass, 0 lint errors. Then temporarily set `hi.enabled` to `true`, run `npm run dev`, open `http://localhost:5173/hi` and the homepage in a 375px wide viewport. Check by eye: Hindi text renders in a Devanagari font, line height is comfortable, and the navbar, hero buttons, cards and the booking modal do not overflow or clip. Set `hi.enabled` back to `false`.

- [ ] **Step 4: Commit**

```bash
cd .. && git add frontend/src && git commit -m "feat(i18n): Devanagari font and spacing on language pages" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 20: Build check for the language output

**Files:**
- Create: `frontend/scripts/check-i18n-build.mjs`
- Modify: `frontend/package.json`, `frontend/src/i18n/languages.js` (temporarily)

- [ ] **Step 1: Write the check**

`frontend/scripts/check-i18n-build.mjs`:

```js
// Checks the language output of the last build in dist/. Usage: node scripts/check-i18n-build.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks += 1; };

try {
  const { LANGUAGES } = await vite.ssrLoadModule('./src/i18n/languages.js');
  const { SERVICES } = await vite.ssrLoadModule('./src/data/vedicPanditData.js');
  const read = (rel) => fs.readFileSync(path.join(dist, rel), 'utf8');
  const sitemap = read('sitemap.xml');

  for (const code of ['hi', 'mr']) {
    const lang = LANGUAGES[code];
    const dir = path.join(dist, code);
    if (!lang.enabled) {
      ok(!fs.existsSync(dir), `${code} disabled: no ${code}/ folder`);
      ok(!sitemap.includes(`/${code}/`) && !sitemap.includes(`/${code}<`), `${code} disabled: not in sitemap`);
      continue;
    }
    const pages = [`${code}/index.html`, `${code}/services/index.html`, ...SERVICES.map((s) => `${code}/services/${s.id}/index.html`)];
    for (const rel of pages) ok(fs.existsSync(path.join(dist, rel)), `exists: ${rel}`);
    ok(!fs.existsSync(path.join(dist, code, 'about-us')), `${code}: untranslated routes are not prerendered`);

    const home = read(`${code}/index.html`);
    ok(home.includes(`<html lang="${code}">`), `${code} html lang`);
    ok(home.includes(`href="https://vedicpanditji.com/${code}"`) || home.includes(`href="https://vedicpanditji.com/${code}/"`), `${code} canonical`);
    ok(home.includes('Noto+Sans+Devanagari'), `${code} font link`);
    ok(home.includes(lang.indexable ? 'content="index' : 'content="noindex'), `${code} robots matches indexable flag`);

    if (lang.indexable) {
      ok(home.includes(`hreflang="${code}"`) && home.includes('hreflang="x-default"'), `${code} hreflang alternates`);
      ok(sitemap.includes(`https://vedicpanditji.com/${code}`), `${code} in sitemap`);
      ok(sitemap.includes('xhtml:link'), 'sitemap has alternates');
    } else {
      ok(!sitemap.includes(`https://vedicpanditji.com/${code}`), `${code} not indexable: not in sitemap`);
    }
  }

  // English pages never carry hreflang unless another language is indexable
  const anyIndexable = ['hi', 'mr'].some((c) => LANGUAGES[c].indexable);
  const enHome = read('index.html');
  ok(anyIndexable ? enHome.includes('hreflang="x-default"') : !enHome.includes('hreflang='), 'english hreflang matches flags');

  console.log(`OK: ${checks} checks passed`);
} finally {
  await vite.close();
}
```

In `frontend/package.json` `scripts` add `"i18n:check-build": "node scripts/check-i18n-build.mjs",`.

- [ ] **Step 2: Check with all languages off (the shipped state)**

```bash
cd frontend && npm run build && git checkout public/sitemap.xml && npm run i18n:check-build
```

Expected: `OK: <N> checks passed`.

- [ ] **Step 3: Check with both languages on (a trial, then revert)**

Temporarily edit `src/i18n/languages.js`: set `enabled: true, indexable: true` for `hi` and `mr`. Then:

```bash
npm run build && git checkout public/sitemap.xml && npm run i18n:check-build && npm run i18n:check && ls dist/hi/services | wc -l
```

Expected: `OK: <N> checks passed` for the build check, `OK: ... checks passed` for the SEO check, and `60` entries in `dist/hi/services` (the catalogue `index.html` plus 59 service folders). Then, with `hi` enabled and `indexable: false` and `mr` off, rebuild and rerun `npm run i18n:check-build` to cover the soft-launch state (`noindex`, not in sitemap). Finally restore both languages to `enabled: false, indexable: false` and confirm with `git diff src/i18n/languages.js` (no diff) and a rebuild plus `npm run i18n:check-build`.

- [ ] **Step 4: Commit**

```bash
cd .. && git add frontend/scripts frontend/package.json && git commit -m "test(i18n): build check for language output" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 21: Switch-on guide, final review and pull request

**Files:**
- Create: `docs/i18n/enabling-a-language.md`

- [ ] **Step 1: Write the switch-on guide**

`docs/i18n/enabling-a-language.md`:

```markdown
# Enabling Hindi or Marathi

Both languages are off in production until their translations are reviewed.

1. Review `docs/i18n/review-hi.md` (or `review-mr.md`). Correct the Draft column and mark rows `reviewed`.
2. Apply the corrections to `frontend/src/i18n/hi.json` (or `mr.json`). Keep `{placeholders}` unchanged.
3. Regenerate the sheet to confirm nothing is missing: `cd frontend && npm run i18n:sheets` (expects `0 missing`).
4. Test in the dev server: `npm run dev`, then open `/hi` (or `/mr`), a service page, and the booking flow. Languages work in the dev server whatever the flags say.
5. Soft launch (visible, not indexed): in `frontend/src/i18n/languages.js` set `enabled: true` and leave `indexable: false`.
6. Full launch: set `indexable: true`.
7. After any change run `npm run build && npm run i18n:check-build && npm run i18n:check` and push through a pull request. Check the Vercel preview before merging.

To switch a language off again, set both flags to `false`. The pages disappear from the next build.
```

- [ ] **Step 2: Run the whole verification**

```bash
cd frontend && npm test && npm run i18n:find && npm run i18n:check && node scripts/snapshot-pages.mjs && npm run build && git checkout public/sitemap.xml && npm run i18n:check-build && node scripts/compare-dist-html.mjs /tmp/vp-dist-before dist && npm run lint 2>&1 | grep -c " error"
```

Expected: tests pass, the finder prints nothing, the SEO check and the build check print `OK`, every snapshot is `OK`, `compare-dist-html` prints `OK: <N> files identical`, and 0 lint errors.

- [ ] **Step 3: Final review and pull request**

Dispatch a read-only reviewer for the whole branch against the spec (security, correctness, spec compliance), fix Critical and Important findings, then push the branch and open a pull request against `main`. In the pull request description state clearly that Hindi and Marathi are off in production and the translations are machine drafts awaiting review.

- [ ] **Step 4: Commit the guide**

```bash
cd .. && git add docs/i18n/enabling-a-language.md && git commit -m "docs: guide for enabling a language" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

## Self-review against the spec

- **URLs, routing, language state, `<html lang>`, back/forward, router ignores flags:** Tasks 1 and 4.
- **Link localization everywhere, including English-only pages:** Task 5 and Appendix A step 7.
- **Dictionaries, `t()`, `translate()`, fallback, placeholders, key guard:** Task 2.
- **Extraction of chrome, homepage, catalogue, service templates, booking and enquiry flow with unchanged English output:** Tasks 3, 7 to 15 (snapshot, finder gate).
- **Pricing text follows `lang`:** Tasks 11, 12, 13 (pass `lang` to the pricing functions).
- **Language flags `enabled` and `indexable`:** Tasks 1, 18, 20.
- **Per-language prerender for the three route types, no files for untranslated routes, `hreflang`, canonical, sitemap alternates, `inLanguage`:** Tasks 16, 18, 20.
- **Untranslated routes under `/hi` and `/mr` show English with translated chrome, `noindex`, English canonical, switcher note:** Tasks 6, 16 (client side); the router handles the URL in Task 4.
- **Switcher:** Task 6. **Fonts and spacing:** Task 19.
- **Translation workflow, review sheets, enabling guide:** Tasks 17 and 21.
- **Tests:** unit tests (Tasks 1, 2), snapshot and finder (Task 3), SEO check (Task 16), build check (Task 20), manual dev checks (Tasks 6, 13, 14, 19).

Names used across tasks match: `splitLangPrefix`, `localizePath`, `switcherOptions`, `createTranslator`, `translate`, `useI18n`, `isTranslatedRoute`, `LANGUAGES`, `DEFAULT_LANG`, `getSeoMetadata(route, params, lang)`, `getPricingDisplay(id, lang)`, `getPujaPricing(service, city, lang)`, `getPackagesForService(id, city, lang)`, `getOptionalSamagriOptions(lang)`.
