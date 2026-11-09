import test from 'node:test';
import assert from 'node:assert/strict';
import { splitLangPrefix, localizePath } from './paths.js';

test('splitLangPrefix detects the language prefix', () => {
  assert.deepEqual(splitLangPrefix('/'), { lang: 'en', path: '/' });
  assert.deepEqual(splitLangPrefix('/services'), { lang: 'en', path: '/services' });
  assert.deepEqual(splitLangPrefix('/hi'), { lang: 'hi', path: '/' });
  assert.deepEqual(splitLangPrefix('/hi/'), { lang: 'hi', path: '/' });
  assert.deepEqual(splitLangPrefix('/hi/services/griha-pravesh'), { lang: 'hi', path: '/services/griha-pravesh' });
  assert.deepEqual(splitLangPrefix('/mr/services'), { lang: 'mr', path: '/services' });
});

test('splitLangPrefix does not match paths that merely start with the letters', () => {
  assert.deepEqual(splitLangPrefix('/history'), { lang: 'en', path: '/history' });
  assert.deepEqual(splitLangPrefix('/hindi-puja'), { lang: 'en', path: '/hindi-puja' });
  assert.deepEqual(splitLangPrefix('/mrs'), { lang: 'en', path: '/mrs' });
});

test('localizePath leaves English paths unchanged', () => {
  assert.equal(localizePath('/services', 'en'), '/services');
  assert.equal(localizePath('/', 'en'), '/');
  assert.equal(localizePath('/services'), '/services');
});

test('localizePath adds the prefix for other languages', () => {
  assert.equal(localizePath('/services', 'hi'), '/hi/services');
  assert.equal(localizePath('/services/griha-pravesh', 'mr'), '/mr/services/griha-pravesh');
  assert.equal(localizePath('/', 'hi'), '/hi');
  assert.equal(localizePath('/services#top', 'hi'), '/hi/services#top');
});

test('localizePath leaves non-site links alone', () => {
  assert.equal(localizePath('#faq', 'hi'), '#faq');
  assert.equal(localizePath('tel:+911234567890', 'hi'), 'tel:+911234567890');
  assert.equal(localizePath('https://example.com/x', 'hi'), 'https://example.com/x');
  assert.equal(localizePath('mailto:a@b.c', 'mr'), 'mailto:a@b.c');
});
