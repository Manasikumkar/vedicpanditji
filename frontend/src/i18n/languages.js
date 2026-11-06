export const DEFAULT_LANG = 'en';

// enabled: shown in the switcher and prerendered into dist.
// indexable: indexed by search engines, listed in hreflang and the sitemap.
export const LANGUAGES = {
  en: { code: 'en', label: 'EN', name: 'English', enabled: true, indexable: true },
  hi: { code: 'hi', label: 'हिन्दी', name: 'Hindi', enabled: true, indexable: true },
  mr: { code: 'mr', label: 'मराठी', name: 'Marathi', enabled: true, indexable: true }
};

export const LANG_CODES = Object.keys(LANGUAGES);
export const NON_DEFAULT_LANGS = LANG_CODES.filter((code) => code !== DEFAULT_LANG);

// Route types whose chrome and template text are translated in this phase.
export const TRANSLATED_ROUTES = ['home', 'catalogue', 'services', 'service-detail'];
export const isTranslatedRoute = (route) => TRANSLATED_ROUTES.includes(route);
