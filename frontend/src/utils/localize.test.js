import test from 'node:test';
import assert from 'node:assert/strict';
import { isText, localize } from './localize.js';

const text = (en, hi = '', mr = '') => ({ en, hi, mr });

test('isText accepts only objects with exactly en, hi and mr strings', () => {
  assert.equal(isText(text('a')), true);
  assert.equal(isText({ en: 'a', hi: '' }), false);
  assert.equal(isText({ en: 'a', hi: '', mr: '', fr: '' }), false);
  assert.equal(isText({ en: 1, hi: '', mr: '' }), false);
  assert.equal(isText(null), false);
  assert.equal(isText(['a']), false);
  assert.equal(isText('a'), false);
});

test('localize returns the requested language', () => {
  assert.equal(localize(text('Puja', 'पूजा', 'पूजा-मr'), 'hi'), 'पूजा');
  assert.equal(localize(text('Puja', 'पूजा', 'पूजा-मr'), 'mr'), 'पूजा-मr');
});

test('localize falls back to English when the translation is empty', () => {
  assert.equal(localize(text('Puja', '', 'मराठी'), 'hi'), 'Puja');
  assert.equal(localize(text('Puja'), 'mr'), 'Puja');
});

test('localize defaults to English', () => {
  assert.equal(localize(text('Puja', 'पूजा')), 'Puja');
});

test('localize walks nested objects and arrays and keeps other values', () => {
  const input = {
    id: 'x',
    price: 3500,
    approved: false,
    missing: null,
    name: text('Name', 'नाम'),
    items: [text('One', 'एक'), text('Two')],
    nested: { badge: text('Badge', 'बैज') }
  };
  assert.deepEqual(localize(input, 'hi'), {
    id: 'x',
    price: 3500,
    approved: false,
    missing: null,
    name: 'नाम',
    items: ['एक', 'Two'],
    nested: { badge: 'बैज' }
  });
});
