import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(here, '..');
const read = (name) => JSON.parse(fs.readFileSync(path.join(here, `${name}.json`), 'utf8'));
const en = read('en');
const hi = read('hi');
const mr = read('mr');
const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(jsx?|mjs)$/.test(entry.name) && !entry.name.endsWith('.test.js') ? [full] : [];
  });
}

test('every key used in the code exists in en.json', () => {
  const used = new Set();
  const re = /\b(?:t|translate)\(\s*(?:[a-zA-Z_]+\s*,\s*)?['"]([\w.-]+)['"]/g;
  for (const file of sourceFiles(srcDir)) {
    for (const match of fs.readFileSync(file, 'utf8').matchAll(re)) used.add(match[1]);
  }
  assert.deepEqual([...used].filter((key) => !(key in en)).sort(), []);
});

test('en.json values are non-empty strings', () => {
  const bad = Object.entries(en).filter(([, v]) => typeof v !== 'string' || v.trim() === '');
  assert.deepEqual(bad, []);
});

for (const [name, dict] of [['hi', hi], ['mr', mr]]) {
  test(`${name}.json has no keys that are missing from en.json`, () => {
    assert.deepEqual(Object.keys(dict).filter((key) => !(key in en)), []);
  });

  test(`${name}.json keeps the same {placeholders} as English`, () => {
    const bad = Object.keys(dict).filter((key) => key in en && placeholders(dict[key]) !== placeholders(en[key]));
    assert.deepEqual(bad, []);
  });
}
