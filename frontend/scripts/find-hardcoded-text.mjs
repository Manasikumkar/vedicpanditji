// Lists user-visible hard-coded text in the given files. Usage: node scripts/find-hardcoded-text.mjs <files...>
import fs from 'node:fs';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';

const JSXParser = Parser.extend(jsx());
const TEXT_ATTRS = new Set(['placeholder', 'title', 'aria-label', 'alt', 'label']);
const TEXT_KEYS = new Set(['label', 'title', 'subtitle', 'description', 'text', 'heading', 'question', 'answer', 'badge', 'caption', 'message', 'cta']);
// Exact strings that stay untranslated on purpose. Add a comment for each entry.
const ALLOWED = new Set([
  'VedicPanditji', // brand name
  'Vedic', 'Panditji' // brand name split across spans
]);
const HAS_LETTERS = /[A-Za-zऀ-ॿ]/;

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: node scripts/find-hardcoded-text.mjs <files...>');
  process.exit(2);
}

let count = 0;
const report = (file, node, kind, text) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!HAS_LETTERS.test(clean) || ALLOWED.has(clean)) return;
  count += 1;
  console.log(`${file}:${node.loc.start.line}  ${kind}  "${clean}"`);
};

function walk(node, file) {
  if (!node || typeof node.type !== 'string') return;
  if (node.type === 'JSXText') report(file, node, 'text', node.value);
  if (node.type === 'JSXAttribute' && TEXT_ATTRS.has(node.name.name) && node.value?.type === 'Literal' && typeof node.value.value === 'string') {
    report(file, node, `attr:${node.name.name}`, node.value.value);
  }
  if (node.type === 'CallExpression' && node.callee.name === 'showToast' && node.arguments[0]?.type === 'Literal' && typeof node.arguments[0].value === 'string') {
    report(file, node, 'toast', node.arguments[0].value);
  }
  if (node.type === 'CallExpression' && node.callee.name === 'showToast' && node.arguments[0]?.type === 'TemplateLiteral') {
    report(file, node, 'toast', node.arguments[0].quasis.map((q) => q.value.cooked).join('{}'));
  }
  if (node.type === 'Property' && !node.computed && TEXT_KEYS.has(node.key.name || node.key.value) && node.value.type === 'Literal' && typeof node.value.value === 'string') {
    report(file, node, `key:${node.key.name || node.key.value}`, node.value.value);
  }
  for (const key of Object.keys(node)) {
    const child = node[key];
    if (Array.isArray(child)) child.forEach((c) => walk(c, file));
    else if (child && typeof child.type === 'string') walk(child, file);
  }
}

for (const file of files) {
  const ast = JSXParser.parse(fs.readFileSync(file, 'utf8'), { ecmaVersion: 'latest', sourceType: 'module', locations: true });
  walk(ast, file);
}
process.exit(count === 0 ? 0 : 1);
