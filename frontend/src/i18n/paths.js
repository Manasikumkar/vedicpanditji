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
