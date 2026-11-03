import test from 'node:test';
import assert from 'node:assert/strict';
import { createTranslator } from './translate.js';

const translate = createTranslator({
  en: { 'a.hello': 'Hello', 'a.greet': 'Hi {name}, you have {count} items', 'a.only-en': 'Only English', 'a.empty': 'Fallback text' },
  hi: { 'a.hello': 'नमस्ते', 'a.greet': 'नमस्ते {name}, आपके {count} आइटम हैं', 'a.empty': '' },
  mr: {}
});

test('returns the text for the language', () => {
  assert.equal(translate('hi', 'a.hello'), 'नमस्ते');
  assert.equal(translate('en', 'a.hello'), 'Hello');
});

test('falls back to English when the key or text is missing', () => {
  assert.equal(translate('hi', 'a.only-en'), 'Only English');
  assert.equal(translate('mr', 'a.hello'), 'Hello');
  assert.equal(translate('hi', 'a.empty'), 'Fallback text');
});

test('returns the key itself when no language has it', () => {
  assert.equal(translate('hi', 'a.unknown'), 'a.unknown');
});

test('fills {placeholders} and leaves unknown ones visible', () => {
  assert.equal(translate('en', 'a.greet', { name: 'Asha', count: 3 }), 'Hi Asha, you have 3 items');
  assert.equal(translate('hi', 'a.greet', { name: 'आशा', count: 3 }), 'नमस्ते आशा, आपके 3 आइटम हैं');
  assert.equal(translate('en', 'a.greet', { name: 'Asha' }), 'Hi Asha, you have {count} items');
});
