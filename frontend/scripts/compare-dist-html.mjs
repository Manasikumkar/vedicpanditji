// Compares the HTML (and sitemap) of two dist folders, ignoring hashed asset file names.
// Usage: node scripts/compare-dist-html.mjs <before> <after>
import fs from 'node:fs';
import path from 'node:path';

const [before, after] = process.argv.slice(2);
const norm = (s) => s.replace(/assets\/[A-Za-z0-9_.-]+/g, 'assets/X');
const files = (dir) => fs.readdirSync(dir, { recursive: true }).filter((f) => /(\.html|sitemap\.xml)$/.test(f)).map(String).sort();

const a = files(before);
const b = files(after).filter((f) => !/^(hi|mr)[\\/]/.test(f));
let diffs = 0;
for (const f of a) {
  if (!b.includes(f)) { console.log(`MISSING in after: ${f}`); diffs += 1; continue; }
  const x = norm(fs.readFileSync(path.join(before, f), 'utf8'));
  const y = norm(fs.readFileSync(path.join(after, f), 'utf8'));
  if (x !== y) { console.log(`DIFF: ${f}`); diffs += 1; }
}
for (const f of b) if (!a.includes(f)) { console.log(`EXTRA in after: ${f}`); diffs += 1; }
console.log(diffs === 0 ? `OK: ${a.length} files identical` : `${diffs} differences`);
process.exit(diffs === 0 ? 0 : 1);
