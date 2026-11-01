import test from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyText,
  setIn,
  moveItem,
  nextPackageId,
  newPackage,
  countMissingTranslations,
  errorTarget
} from './pricingDoc.js';

test('setIn updates a nested value without mutating the original', () => {
  const doc = { a: { b: [1, 2, 3] }, c: 1 };
  const next = setIn(doc, ['a', 'b', 1], 9);
  assert.deepEqual(next, { a: { b: [1, 9, 3] }, c: 1 });
  assert.deepEqual(doc, { a: { b: [1, 2, 3] }, c: 1 });
  assert.equal(next.c, doc.c);
});

test('moveItem reorders and ignores out-of-range moves', () => {
  assert.deepEqual(moveItem(['a', 'b', 'c'], 0, 1), ['b', 'a', 'c']);
  assert.deepEqual(moveItem(['a', 'b', 'c'], 2, 1), ['a', 'c', 'b']);
  const list = ['a', 'b'];
  assert.equal(moveItem(list, 0, -1), list);
  assert.equal(moveItem(list, 1, 2), list);
});

test('nextPackageId picks an unused id within the card', () => {
  const card = { serviceId: 'bhoomi-puja', packages: [{ id: 'bhoomi-puja-pkg-2' }, { id: 'x' }] };
  assert.equal(nextPackageId(card), 'bhoomi-puja-pkg-3');
});

test('newPackage has every field the database requires', () => {
  const pkg = newPackage({ serviceId: 's', packages: [] });
  assert.deepEqual(Object.keys(pkg).sort(), [
    'badge', 'exclusions', 'id', 'includedSamagriIds', 'inclusions',
    'indicativePrice', 'name', 'priceDisplay', 'priceNote', 'tier'
  ]);
  assert.equal(pkg.id, 's-pkg-1');
  assert.deepEqual(pkg.name, emptyText());
});

test('countMissingTranslations counts empty Hindi and Marathi values', () => {
  const doc = {
    name: { en: 'A', hi: 'अ', mr: '' },
    items: [{ en: 'B', hi: '', mr: '' }, { en: 'C', hi: 'स', mr: 'क' }],
    price: 5
  };
  assert.deepEqual(countMissingTranslations(doc), { hi: 1, mr: 2 });
});

test('errorTarget finds the service or tab named in a database error', () => {
  assert.deepEqual(
    errorTarget('pricing rateCards.bhoomi-puja.packages[0].name.en: English text is required'),
    { tab: 'services', serviceId: 'bhoomi-puja' }
  );
  assert.deepEqual(errorTarget('pricing samagriOptions[2].price: must be a non-negative whole number'), { tab: 'samagri' });
  assert.equal(errorTarget('permission denied'), null);
  assert.equal(errorTarget(undefined), null);
});
