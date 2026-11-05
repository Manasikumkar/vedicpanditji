import React from 'react';
import { Save } from 'lucide-react';
import { TextField, NumberField, PlainField } from './Fields';
import { setIn } from './pricingDoc';

const TIERS = ['standard', 'popular', 'premium'];
const UNIT_OPTIONS = ['kg', 'g', 'box', 'set', 'types', 'pcs', 'liter', 'ml'];

export default function SamagriEditor({ items, lang, onChange, onSave, isDirty = false, isSaving = false }) {
  const set = (i, key, value) => onChange(items.map((item, j) => (j === i ? setIn(item, [key], value) : item)));

  return (
    <div className="samagri-editor">
      <div className="service-editor-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2>Samagri Add-on Options</h2>
          <p className="section-desc">Manage standard, premium, and custom samagri procurement packages ({items.length} items)</p>
        </div>
      </div>

      <div className="samagri-grid">
        {items.map((item, i) => {
          const isVerified = Boolean(item.isPriceVerified);
          const isActive = item.isActive !== false;

          return (
            <div className="package-card samagri-item-card" key={item.id}>
              {/* Card Header Bar */}
              <div className="package-card-header">
                <div className="pkg-header-left">
                  <span className="pkg-index-badge">#{i + 1}</span>
                  <span className="pkg-title-text">{item.name?.en || '(Unnamed Item)'}</span>
                  <code className="pkg-id-tag">{item.id}</code>
                  {isVerified ? (
                    <span className="tier-badge tier-popular">Price Verified</span>
                  ) : (
                    <span className="tier-badge tier-standard" style={{ background: '#FEF3C7', color: '#92400E' }}>
                      Pending Approval
                    </span>
                  )}
                  {isActive ? (
                    <span className="tier-badge tier-popular" style={{ background: '#DCFCE7', color: '#166534' }}>
                      Active
                    </span>
                  ) : (
                    <span className="tier-badge" style={{ background: '#F3F4F6', color: '#6B7280' }}>
                      Inactive
                    </span>
                  )}
                </div>
                <div className="pkg-header-right">
                  <span className="pkg-price-pill live">
                    ₹{item.price ? Number(item.price).toLocaleString('en-IN') : '0'}
                  </span>
                </div>
              </div>

              {/* Card Body with proper spacing & padding */}
              <div className="package-card-body">
                <TextField label="Item Name" value={item.name} lang={lang} onChange={(v) => set(i, 'name', v)} />
                <TextField label="Description" multiline value={item.description} lang={lang} onChange={(v) => set(i, 'description', v)} />

                <div className="samagri-card-specs-grid">
                  <NumberField label="Price (₹)" value={item.price} onChange={(v) => set(i, 'price', v)} />
                  <PlainField label="Category" value={item.category} onChange={(v) => set(i, 'category', v)} />

                  <div className="field">
                    <label className="field-label">Quantity</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      className="adm-input"
                      value={item.quantity ?? ''}
                      placeholder="e.g. 1.5, 500, 1"
                      onChange={(e) => set(i, 'quantity', e.target.value === '' ? null : Number(e.target.value))}
                    />
                  </div>

                  <div className="field">
                    <label className="field-label">Unit</label>
                    <input
                      type="text"
                      className="adm-input"
                      list={`units-list-${item.id}`}
                      value={item.unit || ''}
                      placeholder="e.g. kg, g, box, set, pcs"
                      onChange={(e) => set(i, 'unit', e.target.value)}
                    />
                    <datalist id={`units-list-${item.id}`}>
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u} value={u} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label className="check-box-control">
                    <input
                      type="checkbox"
                      checked={isVerified}
                      onChange={(e) => set(i, 'isPriceVerified', e.target.checked)}
                    />
                    <span>Price verified by VedicPanditji purohit team</span>
                  </label>

                  <label className="check-box-control">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => set(i, 'isActive', e.target.checked)}
                    />
                    <span>Active item (available for customer selection and package bundling)</span>
                  </label>
                </div>

                <div className="field">
                  <label className="field-label">Included in Tiers</label>
                  <div className="tier-checkboxes-row">
                    {TIERS.map((tier) => (
                      <label className="check-box-control" key={tier}>
                        <input
                          type="checkbox"
                          checked={item.includedInTiers?.includes(tier)}
                          onChange={(e) => set(i, 'includedInTiers', e.target.checked
                            ? [...(item.includedInTiers || []), tier]
                            : (item.includedInTiers || []).filter((x) => x !== tier))}
                        />
                        <span className="capitalize">{tier}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {onSave && (
        <div className="step-navigation-footer" style={{ marginTop: '28px' }}>
          <span className="step-indicator">
            {items.length} Samagri catalog items • All synchronized with package calculations
          </span>
          <button
            type="button"
            className={`btn-step-save ${isDirty ? 'dirty' : ''}`}
            onClick={onSave}
            disabled={isSaving}
            title={isDirty ? "Save samagri add-ons to live website" : "Samagri catalog is up to date and live. Click to confirm."}
          >
            <Save size={15} />
            <span>{isSaving ? 'Saving…' : isDirty ? 'Save & Confirm' : '✓ Saved & Confirmed'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
