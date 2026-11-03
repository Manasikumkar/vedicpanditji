// Renders the app to static HTML at fixed URLs and compares it with committed English baselines.
// Usage: node scripts/snapshot-pages.mjs [--update]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { prerender } from 'react-dom/static';
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
  const urls = ['/', '/services', `/services/${SERVICES[0].id}`, '/services/ganapathi-havan', '/hi/services'];
  fs.mkdirSync(snapDir, { recursive: true });

  for (const url of urls) {
    installBrowserStubs(url);
    const { AppProvider } = await vite.ssrLoadModule('./src/context/AppContext.jsx');
    const { default: App } = await vite.ssrLoadModule('./src/App.jsx');
    const tree = () => React.createElement(AppProvider, null, React.createElement(App));
    // prerender waits for the lazy route pages to load; renderToString then inlines them instead of the Suspense fallback.
    await prerender(tree());
    // The footer copyright year comes from new Date(); mask it so the baseline does not break each January.
    const html = renderToString(tree()).replace(/© <!-- -->\d{4}<!-- -->/g, '© <!-- -->YEAR<!-- -->');
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
