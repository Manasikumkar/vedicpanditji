import { useApp } from '../context/AppContext';
import { translate } from './index.js';
import { localizePath } from './paths.js';
import {
  getLocalizedCategoryName,
  getLocalizedCategoryTagline,
  getLocalizedCategoryCount,
  getLocalizedServiceName,
  getLocalizedServiceDesc,
  getLocalizedLocationName
} from './contentTranslations.js';

// t(key, vars): translated text for the current language. lp(path): link path with the language prefix.
export function useI18n() {
  const { lang } = useApp();
  return {
    lang,
    t: (key, vars) => translate(lang, key, vars),
    lp: (path) => localizePath(path, lang),
    locCatName: (cat) => getLocalizedCategoryName(cat, lang),
    locCatTagline: (cat) => getLocalizedCategoryTagline(cat, lang),
    locCatCount: (cat) => getLocalizedCategoryCount(cat, lang),
    locServiceName: (svc) => getLocalizedServiceName(svc, lang),
    locServiceDesc: (svc) => getLocalizedServiceDesc(svc, lang),
    locLocationName: (loc) => getLocalizedLocationName(loc, lang)
  };
}

export {
  getLocalizedCategoryName,
  getLocalizedCategoryTagline,
  getLocalizedCategoryCount,
  getLocalizedServiceName,
  getLocalizedServiceDesc,
  getLocalizedLocationName
};
