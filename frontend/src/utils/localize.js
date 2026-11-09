const LANGS = ['en', 'hi', 'mr'];

// A translatable text value is an object with exactly the string keys en, hi and mr.
export function isText(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === LANGS.length && LANGS.every((k) => typeof value[k] === 'string');
}

// Replaces every text value in a structure with its string in `lang`, falling back to English.
export function localize(value, lang = 'en') {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (isText(value)) return value[lang] || value.en;
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, lang)]));
  }
  return value;
}
