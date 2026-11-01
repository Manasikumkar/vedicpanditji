import React from 'react';
import { emptyText, moveItem } from './pricingDoc';

const LANGS = ['en', 'hi', 'mr'];

// One translatable text value: an input per visible language. Empty hi/mr are highlighted.
export function TextField({ label, value, onChange, lang, multiline }) {
  const visible = lang === 'all' ? LANGS : [lang];
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {visible.map((l) => (
        <div className="lang-row" key={l}>
          <span className={`lang-tag${l !== 'en' && !value[l] ? ' missing' : ''}`}>{l.toUpperCase()}</span>
          <Tag value={value[l]} rows={multiline ? 2 : undefined} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
        </div>
      ))}
    </div>
  );
}

// An ordered list of translatable text values (inclusions, exclusions).
export function TextList({ label, items, onChange, lang }) {
  return (
    <div className="field">
      <label>{label}</label>
      {items.map((item, i) => (
        <div className="list-item" key={i}>
          <TextField value={item} lang={lang} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
          <div className="row-actions">
            <button type="button" disabled={i === 0} onClick={() => onChange(moveItem(items, i, i - 1))}>↑</button>
            <button type="button" disabled={i === items.length - 1} onClick={() => onChange(moveItem(items, i, i + 1))}>↓</button>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, emptyText()])}>+ Add</button>
    </div>
  );
}

export function NumberField({ label, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        min="0"
        step="1"
        value={value ?? ''}
        placeholder="empty = custom quote"
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
      />
    </div>
  );
}

export function PlainField({ label, value, onChange, multiline }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="field">
      <label>{label}</label>
      <Tag value={value} rows={multiline ? 2 : undefined} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
