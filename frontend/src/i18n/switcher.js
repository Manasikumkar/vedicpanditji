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
