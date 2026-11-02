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
