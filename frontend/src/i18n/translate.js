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
