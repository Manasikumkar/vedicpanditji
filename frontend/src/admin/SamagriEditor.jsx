import React from 'react';
import { TextField, NumberField, PlainField } from './Fields';
import { setIn } from './pricingDoc';

const TIERS = ['standard', 'popular', 'premium'];

export default function SamagriEditor({ items, lang, onChange }) {
  const set = (i, key, value) => onChange(items.map((item, j) => (j === i ? setIn(item, [key], value) : item)));

  return (
    <div>
      <h2>Samagri add-ons</h2>
      {items.map((item, i) => (
        <fieldset className="package" key={item.id}>
          <legend>{item.name.en || '(unnamed)'} <code>{item.id}</code></legend>
          <TextField label="Name" value={item.name} lang={lang} onChange={(v) => set(i, 'name', v)} />
          <TextField label="Description" multiline value={item.description} lang={lang} onChange={(v) => set(i, 'description', v)} />
          <NumberField label="Price (₹)" value={item.price} onChange={(v) => set(i, 'price', v)} />
          <PlainField label="Category" value={item.category} onChange={(v) => set(i, 'category', v)} />
          <label className="check">
            <input type="checkbox" checked={item.isPriceVerified} onChange={(e) => set(i, 'isPriceVerified', e.target.checked)} />
            Price verified
          </label>
          <div className="field">
            <label>Included in tiers</label>
            {TIERS.map((tier) => (
              <label className="check" key={tier}>
                <input
                  type="checkbox"
                  checked={item.includedInTiers.includes(tier)}
                  onChange={(e) => set(i, 'includedInTiers', e.target.checked
                    ? [...item.includedInTiers, tier]
                    : item.includedInTiers.filter((x) => x !== tier))}
                />
                {tier}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
