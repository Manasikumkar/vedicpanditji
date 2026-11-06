import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';
import { createTranslator } from './translate.js';

export const translate = createTranslator({ en, hi, mr });
export { LANGUAGES, DEFAULT_LANG, TRANSLATED_ROUTES, isTranslatedRoute } from './languages.js';
export { localizePath, splitLangPrefix } from './paths.js';
export * from './contentTranslations.js';
