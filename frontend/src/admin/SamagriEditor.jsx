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
      <div className="service-editor-header" style={{ marginBottom: '22px' }}>
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
            <div className="samagri-item-card" key={item.id}>
              {/* Structured Standard Header */}
              <div className="samagri-header-bar">
                <div className="samagri-header-left">
                  <span className="samagri-idx">#{i + 1}</span>
                  <span className="samagri-title-text" title={item.name?.en || item.id}>
                    {item.name?.en || '(Unnamed Item)'}
                  </span>
                  <code className="samagri-id-code">{item.id}</code>
                </div>
                <div className="samagri-header-right">
                  {isVerified ? (
                    <span className="samagri-status-pill verified" title="Purohit Price Verified">
                      ✓ Verified
                    </span>
                  ) : (
                    <span className="samagri-status-pill pending" title="Pending Verification">
                      ⏳ Pending
                    </span>
                  )}

                  {isActive ? (
                    <span className="samagri-status-pill active" title="Active in Devotee Catalog">
                      ● Live
                    </span>
                  ) : (
                    <span className="samagri-status-pill inactive" title="Hidden from Catalog">
                      ○ Inactive
                    </span>
                  )}

                  <span className="samagri-live-price" title="Current catalog price">
                    ₹{item.price ? Number(item.price).toLocaleString('en-IN') : '0'}
                  </span>
                </div>
              </div>

              {/* Standard Card Body */}
              <div className="samagri-card-body">
                <TextField label="Item Name" value={item.name} lang={lang} onChange={(v) => set(i, 'name', v)} />
                <TextField label="Description" multiline value={item.description} lang={lang} onChange={(v) => set(i, 'description', v)} />

                {/* Specifications Box */}
                <div className="samagri-specs-box">
                  <div className="samagri-box-label">
                    <span>Pricing &amp; Unit Metrics</span>
                  </div>
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
                        placeholder="e.g. kg, g, box"
                        onChange={(e) => set(i, 'unit', e.target.value)}
                      />
                      <datalist id={`units-list-${item.id}`}>
                        {UNIT_OPTIONS.map((u) => (
                          <option key={u} value={u} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Standard Status Toggles */}
                <div className="samagri-toggles-grid">
                  <div
                    className={`samagri-toggle-card ${isVerified ? 'is-active verified' : ''}`}
                    onClick={() => set(i, 'isPriceVerified', !isVerified)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        set(i, 'isPriceVerified', !isVerified);
                      }
                    }}
                  >
                    <div className="samagri-toggle-switch">
                      {isVerified ? '✓' : ''}
                    </div>
                    <div className="samagri-toggle-texts">
                      <span className="samagri-toggle-title">Purohit Price Verified</span>
                      <span className="samagri-toggle-desc">Confirmed by VedicPanditji purohit team</span>
                    </div>
                  </div>

                  <div
                    className={`samagri-toggle-card ${isActive ? 'is-active active' : ''}`}
                    onClick={() => set(i, 'isActive', !isActive)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        set(i, 'isActive', !isActive);
                      }
                    }}
                  >
                    <div className="samagri-toggle-switch">
                      {isActive ? '✓' : ''}
                    </div>
                    <div className="samagri-toggle-texts">
                      <span className="samagri-toggle-title">Active in Catalog</span>
                      <span className="samagri-toggle-desc">Available for devotee selection &amp; packages</span>
                    </div>
                  </div>
                </div>

                {/* Included in Tiers */}
                <div className="samagri-tiers-box">
                  <div className="samagri-box-label">
                    <span>Included in Ceremony Packages</span>
                  </div>
                  <div className="samagri-tier-chips">
                    {TIERS.map((tier) => {
                      const isSelected = item.includedInTiers?.includes(tier);
                      const toggleTier = () => {
                        const current = item.includedInTiers || [];
                        const updated = isSelected ? current.filter((x) => x !== tier) : [...current, tier];
                        set(i, 'includedInTiers', updated);
                      };

                      return (
                        <div
                          key={tier}
                          className={`samagri-tier-chip ${isSelected ? `is-selected ${tier}` : ''}`}
                          onClick={toggleTier}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleTier();
                            }
                          }}
                        >
                          <span className="samagri-tier-chip-icon">{isSelected ? '✓' : '+'}</span>
                          <span className="capitalize">{tier}</span>
                        </div>
                      );
                    })}
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
