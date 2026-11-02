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
