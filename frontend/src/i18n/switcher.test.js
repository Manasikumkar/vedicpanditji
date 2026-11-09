import test from 'node:test';
import assert from 'node:assert/strict';
import { switcherOptions } from './switcher.js';

const languages = {
  en: { code: 'en', label: 'EN', name: 'English', enabled: true, indexable: true },
  hi: { code: 'hi', label: 'हिन्दी', name: 'Hindi', enabled: true, indexable: false },
  mr: { code: 'mr', label: 'मराठी', name: 'Marathi', enabled: false, indexable: false }
};

test('translated route lists every enabled language with the same page', () => {
  const { options, englishOnly } = switcherOptions({ pathname: '/hi/services/griha-pravesh', route: 'service-detail', languages });
  assert.deepEqual(options.map((o) => [o.code, o.href]), [
    ['en', '/services/griha-pravesh'],
    ['hi', '/hi/services/griha-pravesh']
  ]);
  assert.equal(englishOnly, false);
});

test('homepage links use the bare prefix', () => {
  const { options } = switcherOptions({ pathname: '/', route: 'home', languages });
  assert.deepEqual(options.map((o) => o.href), ['/', '/hi']);
});

test('untranslated route offers English only and flags the note', () => {
  const { options, englishOnly } = switcherOptions({ pathname: '/hi/admin', route: 'admin', languages });
  assert.deepEqual(options.map((o) => [o.code, o.href]), [['en', '/admin']]);
  assert.equal(englishOnly, true);
});

test('no note when no other language is enabled', () => {
  const onlyEnglish = { ...languages, hi: { ...languages.hi, enabled: false } };
  const { options, englishOnly } = switcherOptions({ pathname: '/admin', route: 'admin', languages: onlyEnglish });
  assert.equal(options.length, 1);
  assert.equal(englishOnly, false);
});
