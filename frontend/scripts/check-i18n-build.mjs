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
    ok(!fs.existsSync(path.join(dist, code, 'admin')), `${code}: untranslated admin route is not prerendered`);

    const home = read(`${code}/index.html`);
    ok(home.includes(`<html lang="${code}">`), `${code} html lang`);
    ok(home.includes(`href="https://www.vedicpanditji.com/${code}"`) || home.includes(`href="https://www.vedicpanditji.com/${code}/"`), `${code} canonical`);
    ok(home.includes('Noto+Sans+Devanagari'), `${code} font link`);
    ok(home.includes(lang.indexable ? 'content="index' : 'content="noindex'), `${code} robots matches indexable flag`);

    if (lang.indexable) {
      ok(home.includes(`hreflang="${code}"`) && home.includes('hreflang="x-default"'), `${code} hreflang alternates`);
      ok(sitemap.includes(`https://www.vedicpanditji.com/${code}`), `${code} in sitemap`);
      ok(sitemap.includes('xhtml:link'), 'sitemap has alternates');
    } else {
      ok(!sitemap.includes(`https://www.vedicpanditji.com/${code}`), `${code} not indexable: not in sitemap`);
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
