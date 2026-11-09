// Writes docs/i18n/review-hi.md and review-mr.md from the dictionaries.
import fs from 'node:fs';

const dir = new URL('../src/i18n/', import.meta.url);
const read = (name) => JSON.parse(fs.readFileSync(new URL(`${name}.json`, dir), 'utf8'));
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const en = read('en');
const names = { hi: 'Hindi', mr: 'Marathi' };

fs.mkdirSync(new URL('../../docs/i18n/', import.meta.url), { recursive: true });
for (const lang of ['hi', 'mr']) {
  const dict = read(lang);
  const rows = Object.keys(en).map((key) => {
    const status = dict[key] ? 'needs review' : 'MISSING';
    return `| \`${key}\` | ${cell(en[key])} | ${cell(dict[key])} | ${status} |`;
  });
  const out = [
    `# ${names[lang]} translation review`,
    '',
    'Correct the "Draft" column in place. Keep `{placeholders}` exactly as written. Brand names stay as they are.',
    'Set the status to `reviewed` for rows you have checked.',
    '',
    '| Key | English | Draft | Status |',
    '| --- | --- | --- | --- |',
    ...rows,
    ''
  ].join('\n');
  fs.writeFileSync(new URL(`../../docs/i18n/review-${lang}.md`, import.meta.url), out);
  console.log(`review-${lang}.md: ${rows.length} rows, ${rows.filter((r) => r.endsWith('MISSING |')).length} missing`);
}
