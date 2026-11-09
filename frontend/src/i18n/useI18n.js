import { useApp } from '../context/AppContext';
import { translate } from './index.js';
import { localizePath } from './paths.js';
import {
  getLocalizedCategoryName,
  getLocalizedCategoryTagline,
  getLocalizedCategoryCount,
  getLocalizedServiceName,
  getLocalizedServiceDesc,
  getLocalizedLocationName,
  getLocalizedLocationContent,
  getLocalizedDuration,
  getLocalizedGuideTitle,
  getLocalizedGuideSummary,
  getLocalizedGuideContent,
  getLocalizedGuideSections,
  getLocalizedGuideFaqs,
  getLocalizedCityPageTitle,
  getLocalizedCityPageH1,
  getLocalizedCityPageTagline,
  getLocalizedCityPageOverview,
  getLocalizedCityPageHighlights,
  getLocalizedCityPageFaqs,
  getLocalizedInsight,
  getLocalizedPromise
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
    locLocationName: (loc) => getLocalizedLocationName(loc, lang),
    locLocationContent: (slug) => getLocalizedLocationContent(slug, lang),
    locDuration: (d) => getLocalizedDuration(d, lang),
    locGuideTitle: (g) => getLocalizedGuideTitle(g, lang),
    locGuideSummary: (g) => getLocalizedGuideSummary(g, lang),
    locGuideContent: (g) => getLocalizedGuideContent(g, lang),
    locGuideSections: (g) => getLocalizedGuideSections(g, lang),
    locGuideFaqs: (g) => getLocalizedGuideFaqs(g, lang),
    locCityTitle: (c) => getLocalizedCityPageTitle(c, lang),
    locCityH1: (c) => getLocalizedCityPageH1(c, lang),
    locCityTagline: (c) => getLocalizedCityPageTagline(c, lang),
    locCityOverview: (c) => getLocalizedCityPageOverview(c, lang),
    locCityHighlights: (c) => getLocalizedCityPageHighlights(c, lang),
    locCityFaqs: (c) => getLocalizedCityPageFaqs(c, lang),
    locInsight: (text) => getLocalizedInsight(text, lang),
    locPromise: (text) => getLocalizedPromise(text, lang)
  };
}

export {
  getLocalizedCategoryName,
  getLocalizedCategoryTagline,
  getLocalizedCategoryCount,
  getLocalizedServiceName,
  getLocalizedServiceDesc,
  getLocalizedLocationName,
  getLocalizedLocationContent,
  getLocalizedDuration,
  getLocalizedGuideTitle,
  getLocalizedGuideSummary,
  getLocalizedGuideContent,
  getLocalizedGuideSections,
  getLocalizedGuideFaqs,
  getLocalizedCityPageTitle,
  getLocalizedCityPageH1,
  getLocalizedCityPageTagline,
  getLocalizedCityPageOverview,
  getLocalizedCityPageHighlights,
  getLocalizedCityPageFaqs,
  getLocalizedInsight,
  getLocalizedPromise
};
