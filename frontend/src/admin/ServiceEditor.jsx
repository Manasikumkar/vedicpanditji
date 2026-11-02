import React from 'react';
import { TextField, TextList, NumberField, PlainField } from './Fields';
import { setIn, moveItem, newPackage } from './pricingDoc';

const MODELS = ['fixed-price', 'package-pricing', 'custom-quote'];
const STATUSES = ['approved', 'local-project-data', 'proposed', 'needs-business-confirmation'];
const TIERS = ['standard', 'popular', 'premium'];

function Select({ label, value, options, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function ServiceEditor({ card, samagri, lang, onChange }) {
  const set = (path, value) => onChange(setIn(card, path, value));
  const setPkg = (i, key, value) => set(['packages', i, key], value);

  return (
    <div>
      <h2>{card.serviceName.en}</h2>
      <p className="muted">{card.serviceId}</p>

      <TextField label="Service name" value={card.serviceName} lang={lang} onChange={(v) => set(['serviceName'], v)} />
      <Select label="Pricing model" value={card.model} options={MODELS} onChange={(v) => set(['model'], v)} />
      <Select label="Approval status" value={card.approvalStatus} options={STATUSES} onChange={(v) => set(['approvalStatus'], v)} />
      <label className="check">
        <input type="checkbox" checked={card.isBusinessApproved} onChange={(e) => set(['isBusinessApproved'], e.target.checked)} />
        Business approved
      </label>
      <NumberField label="Minimum price (₹)" value={card.minPrice} onChange={(v) => set(['minPrice'], v)} />
      <NumberField label="Maximum price (₹)" value={card.maxPrice} onChange={(v) => set(['maxPrice'], v)} />
      <TextField label="Pricing note" multiline value={card.pricingNote} lang={lang} onChange={(v) => set(['pricingNote'], v)} />
      <TextField label="Pricing rationale" multiline value={card.pricingRationale} lang={lang} onChange={(v) => set(['pricingRationale'], v)} />
      <PlainField label="Research basis (internal, English only)" multiline value={card.researchBasis} onChange={(v) => set(['researchBasis'], v)} />
      <PlainField label="Missing business info (internal, English only)" multiline value={card.missingBusinessInfo} onChange={(v) => set(['missingBusinessInfo'], v)} />

      <h3>Packages</h3>
      {card.packages.map((pkg, i) => (
        <fieldset className="package" key={pkg.id}>
          <legend>{pkg.name.en || '(unnamed package)'} <code>{pkg.id}</code></legend>
          <TextField label="Package name" value={pkg.name} lang={lang} onChange={(v) => setPkg(i, 'name', v)} />
          <Select label="Tier" value={pkg.tier} options={TIERS} onChange={(v) => setPkg(i, 'tier', v)} />
          <TextField label="Badge" value={pkg.badge} lang={lang} onChange={(v) => setPkg(i, 'badge', v)} />
          <NumberField label="Price (₹)" value={pkg.indicativePrice} onChange={(v) => setPkg(i, 'indicativePrice', v)} />
          <TextField label="Price note" value={pkg.priceNote} lang={lang} onChange={(v) => setPkg(i, 'priceNote', v)} />
          <TextList label="Inclusions" items={pkg.inclusions} lang={lang} onChange={(v) => setPkg(i, 'inclusions', v)} />
          <TextList label="Exclusions" items={pkg.exclusions} lang={lang} onChange={(v) => setPkg(i, 'exclusions', v)} />
          <div className="field">
            <label>Samagri included in this package</label>
            {samagri.map((s) => (
              <label className="check" key={s.id}>
                <input
                  type="checkbox"
                  checked={pkg.includedSamagriIds.includes(s.id)}
                  onChange={(e) => setPkg(i, 'includedSamagriIds', e.target.checked
                    ? [...pkg.includedSamagriIds, s.id]
                    : pkg.includedSamagriIds.filter((x) => x !== s.id))}
                />
                {s.name.en}
              </label>
            ))}
          </div>
          <div className="row-actions">
            <button type="button" disabled={i === 0} onClick={() => set(['packages'], moveItem(card.packages, i, i - 1))}>Move up</button>
            <button type="button" disabled={i === card.packages.length - 1} onClick={() => set(['packages'], moveItem(card.packages, i, i + 1))}>Move down</button>
            <button type="button" onClick={() => set(['packages'], card.packages.filter((_, j) => j !== i))}>Remove package</button>
          </div>
        </fieldset>
      ))}
      <button type="button" onClick={() => set(['packages'], [...card.packages, newPackage(card)])}>+ Add package</button>
    </div>
  );
}
