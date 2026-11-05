import React from 'react';
import { Plus, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { emptyText, moveItem } from './pricingDoc';

const LANGS = ['en', 'hi', 'mr'];

// One translatable text value: an input per visible language.
export function TextField({ label, value = emptyText(), onChange, lang = 'en', multiline }) {
  const safeValue = value && typeof value === 'object' ? value : emptyText();
  const Tag = multiline ? 'textarea' : 'input';

  // 1. Clean English-First View (Default, no cluttered [EN] badges)
  if (lang === 'en') {
    return (
      <div className="field">
        {label && <label className="field-label">{label}</label>}
        <div className="clean-input-row">
          <Tag
            className="adm-input"
            value={safeValue.en || ''}
            rows={multiline ? 2 : undefined}
            placeholder={label ? `Enter ${label.toLowerCase()}...` : 'Enter text...'}
            onChange={(e) => onChange({ ...safeValue, en: e.target.value })}
          />
        </div>
      </div>
    );
  }

  // 2. Focused Hindi or Marathi View (Shows clear badge + original English prompt for easy translation)
  if (lang === 'hi' || lang === 'mr') {
    const langCode = lang.toUpperCase();
    const langNative = lang === 'hi' ? 'हिन्दी' : 'मराठी';
    const originalEn = safeValue.en || '';
    const hasVal = Boolean(safeValue[lang]?.trim());

    return (
      <div className="field">
        {label && (
          <div className="field-label-row">
            <label className="field-label">{label}</label>
            {originalEn && (
              <span className="field-source-preview" title="English source sentence for reference">
                EN: &ldquo;{originalEn.length > 55 ? originalEn.slice(0, 55) + '…' : originalEn}&rdquo;
              </span>
            )}
          </div>
        )}
        <div className="lang-row">
          <span className={`lang-tag ${hasVal ? 'filled' : 'missing'}`} title={hasVal ? `${langNative} translated` : `Missing ${langNative} translation (falls back to EN)`}>
            {langCode}
          </span>
          <Tag
            className="adm-input"
            value={safeValue[lang] || ''}
            rows={multiline ? 2 : undefined}
            placeholder={originalEn ? `Original EN: "${originalEn}" → Enter ${langNative} translation...` : `Enter ${langNative} translation...`}
            onChange={(e) => onChange({ ...safeValue, [lang]: e.target.value })}
          />
        </div>
      </div>
    );
  }

  // 3. 'all' Mode: Show all 3 languages stacked
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <div className="field-inputs-stack">
        {LANGS.map((l) => {
          const isFilled = Boolean(safeValue[l]?.trim());
          const tagLabel = l === 'en' ? 'EN' : l === 'hi' ? 'HI' : 'MR';
          return (
            <div className="lang-row" key={l}>
              <span className={`lang-tag ${l === 'en' ? 'filled' : isFilled ? 'filled' : 'missing'}`}>
                {tagLabel}
              </span>
              <Tag
                className="adm-input"
                value={safeValue[l] || ''}
                rows={multiline ? 2 : undefined}
                placeholder={`${label || 'Text'} in ${tagLabel}${l !== 'en' && !isFilled ? ' (optional, falls back to EN)' : ''}`}
                onChange={(e) => onChange({ ...safeValue, [l]: e.target.value })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// An ordered list of translatable text values (inclusions, exclusions).
export function TextList({ label, items, onChange, lang }) {
  return (
    <div className="field text-list-field">
      <div className="text-list-header">
        <label className="field-label">{label}</label>
        <span className="item-count">{items.length} items</span>
      </div>
      <div className="text-list-items">
        {items.map((item, i) => (
          <div className="list-item" key={i}>
            <div className="list-item-content">
              <TextField value={item} lang={lang} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
            </div>
            <div className="row-actions">
              <button
                type="button"
                className="btn-icon"
                disabled={i === 0}
                onClick={() => onChange(moveItem(items, i, i - 1))}
                title="Move item up"
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                className="btn-icon"
                disabled={i === items.length - 1}
                onClick={() => onChange(moveItem(items, i, i + 1))}
                title="Move item down"
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                className="btn-icon btn-danger"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                title="Delete item"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn-add-item" onClick={() => onChange([...items, emptyText()])}>
        <Plus size={13} />
        <span>Add {label ? label.slice(0, -1) : 'Item'}</span>
      </button>
    </div>
  );
}

export function NumberField({ label, value, onChange }) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <div className="number-input-wrapper">
        <span className="currency-symbol">₹</span>
        <input
          type="number"
          min="0"
          step="1"
          value={value ?? ''}
          placeholder="Custom Quote (if empty)"
          onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export function PlainField({ label, value, onChange, multiline }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <Tag
        value={value || ''}
        rows={multiline ? 2 : undefined}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
