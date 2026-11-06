import React, { useState } from 'react';
import {
  FileText,
  IndianRupee,
  Package,
  Bookmark,
  Eye,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Flame,
  ArrowRight,
  ArrowLeft,
  Save,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { TextField, TextList, NumberField, PlainField } from './Fields';
import { setIn, moveItem, newPackage } from './pricingDoc';

const MODELS = ['fixed-price', 'package-pricing', 'custom-quote'];
const STATUSES = ['approved', 'local-project-data', 'proposed', 'needs-business-confirmation'];
const TIERS = ['standard', 'popular', 'premium'];

function Select({ label, value, options, onChange }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function ServiceEditor({
  card,
  samagri,
  lang,
  onChange,
  activeSection = 'details',
  onSectionChange,
  onSave,
  isDirty = false,
  isSaving = false
}) {
  const [internalTab, setInternalTab] = useState(activeSection);
  const currentTab = onSectionChange ? activeSection : internalTab;
  const setTab = onSectionChange || setInternalTab;
  const [collapsedPkgs, setCollapsedPkgs] = useState({});
  const togglePkg = (id) => setCollapsedPkgs((prev) => ({ ...prev, [id]: !prev[id] }));

  const set = (path, value) => onChange(setIn(card, path, value));
  const setPkg = (i, key, value) => set(['packages', i, key], value);

  // Auto-propagate base ceremony price changes to Package A, Package B and Maximum Price
  const handleMinPriceChange = (newMinPrice) => {
    let nextCard = setIn(card, ['minPrice'], newMinPrice);

    // Auto-approve and publish when valid price is entered
    if (typeof newMinPrice === 'number' && newMinPrice > 0) {
      nextCard = {
        ...nextCard,
        isBusinessApproved: true,
        approvalStatus: 'approved',
        startingPriceDisplay: `From ₹${newMinPrice.toLocaleString('en-IN')}*`
      };
    }

    if (nextCard.packages && nextCard.packages.length > 0) {
      let maxPriceCalc = newMinPrice;
      const nextPackages = nextCard.packages.map((pkg) => {
        const samagriCost = (pkg.includedSamagriIds || []).reduce((sum, id) => {
          const s = samagri.find((x) => x.id === id);
          return sum + (s && typeof s.price === 'number' ? s.price : 0);
        }, 0);

        const newPackagePrice = (typeof newMinPrice === 'number')
          ? newMinPrice + samagriCost
          : null;

        if (typeof newPackagePrice === 'number' && (maxPriceCalc === null || newPackagePrice > maxPriceCalc)) {
          maxPriceCalc = newPackagePrice;
        }

        return {
          ...pkg,
          indicativePrice: newPackagePrice,
          priceDisplay: newPackagePrice !== null ? `₹${newPackagePrice.toLocaleString('en-IN')}*` : 'Custom Quote'
        };
      });

      nextCard = {
        ...nextCard,
        maxPrice: maxPriceCalc,
        packages: nextPackages
      };
    }

    onChange(nextCard);
  };
  const updatePkg = (i, updates) => {
    const currentPkg = card.packages[i];
    const nextPkg = { ...currentPkg, ...updates };
    const nextPackages = card.packages.map((p, idx) => (idx === i ? nextPkg : p));
    const nextMaxPrice = nextPackages[1]?.indicativePrice ?? card.maxPrice;
    onChange({
      ...card,
      maxPrice: nextMaxPrice,
      packages: nextPackages
    });
  };

  // Derive starting price
  const startingPrice = card.minPrice
    ? `₹${card.minPrice.toLocaleString('en-IN')}`
    : card.packages && card.packages.length > 0 && card.packages[0].indicativePrice
      ? `₹${card.packages[0].indicativePrice.toLocaleString('en-IN')}`
      : 'Custom Quote';

  return (
    <div className="service-workspace">
      {/* Service Header Banner */}
      <div className="workspace-header">
        <div className="header-identity">
          <div className="service-icon-box">
            <Flame size={24} color="#BD4B23" />
          </div>
          <div>
            <h2 className="service-heading">{card.serviceName.en}</h2>
          </div>
        </div>

        <div className="header-actions-right">
          <div className="starting-price-chip">
            <span className="label">Starting From</span>
            <span className="value">{startingPrice}</span>
          </div>
        </div>
      </div>

      {/* Internal Workspace Tabs */}
      <nav className="workspace-tabs-bar">
        <button
          type="button"
          className={`w-tab-btn ${currentTab === 'details' ? 'active' : ''}`}
          onClick={() => setTab('details')}
        >
          <FileText size={15} />
          <span>Service Details</span>
        </button>

        <button
          type="button"
          className={`w-tab-btn ${currentTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setTab('pricing')}
        >
          <IndianRupee size={15} />
          <span>Rates &amp; Range</span>
        </button>

        <button
          type="button"
          className={`w-tab-btn ${currentTab === 'packages' ? 'active' : ''}`}
          onClick={() => setTab('packages')}
        >
          <Package size={15} />
          <span>Packages ({card.packages.length})</span>
        </button>

        <button
          type="button"
          className={`w-tab-btn ${currentTab === 'notes' ? 'active' : ''}`}
          onClick={() => setTab('notes')}
        >
          <Bookmark size={15} />
          <span>Internal Notes</span>
        </button>

        <button
          type="button"
          className={`w-tab-btn preview-tab ${currentTab === 'preview' ? 'active' : ''}`}
          onClick={() => setTab('preview')}
        >
          <Eye size={15} />
          <span>Devotee Preview</span>
        </button>
      </nav>

      {/* Tab 1: Service Details */}
      {currentTab === 'details' && (
        <div className="workspace-tab-content">
          <div className="editor-card">
            <h3 className="section-title">Ceremony Identity &amp; Classification</h3>
            <TextField label="Service Name" value={card.serviceName} lang={lang} onChange={(v) => set(['serviceName'], v)} />

            <div className="grid-2-col">
              <Select
                label="Approval Status"
                value={card.approvalStatus}
                options={STATUSES}
                onChange={(v) => {
                  onChange({
                    ...card,
                    approvalStatus: v,
                    isBusinessApproved: v === 'approved'
                  });
                }}
              />
              <Select label="Pricing Model" value={card.model} options={MODELS} onChange={(v) => set(['model'], v)} />
            </div>

            <div className="approval-toggle-box">
              <label className="check-box-control">
                <input
                  type="checkbox"
                  checked={Boolean(card.isBusinessApproved)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onChange({
                      ...card,
                      isBusinessApproved: checked,
                      approvalStatus: checked ? 'approved' : 'needs-business-confirmation'
                    });
                  }}
                />
                <span className="font-semibold">Publish this ceremony on live website</span>
              </label>
              <p className="field-hint">
                {card.isBusinessApproved
                  ? '✓ Published: Packages and rates are live and visible to devotees across website cards and search.'
                  : '⏳ In Review: Ceremony is marked as in-review and displayed as Custom Quote until published.'}
              </p>
            </div>
          </div>

          <div className="step-navigation-footer dual">
            <span className="step-indicator">Step 1 of 5: Service Identity</span>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {onSave && (
                <button
                  type="button"
                  className={`btn-step-save ${isDirty ? 'dirty' : ''}`}
                  onClick={onSave}
                  disabled={isSaving}
                  title={isDirty ? "Save ceremony changes to live website" : "Ceremony rate card is up to date and live. Click to confirm."}
                >
                  <Save size={15} />
                  <span>{isSaving ? 'Saving…' : isDirty ? 'Save & Confirm' : '✓ Saved & Confirmed'}</span>
                </button>
              )}

              <button
                type="button"
                className="btn-step-next"
                onClick={() => setTab('pricing')}
              >
                <span>Next: Rates &amp; Range</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pricing & Rates */}
      {currentTab === 'pricing' && (
        <div className="workspace-tab-content">
          <div className="editor-card">
            <h3 className="section-title">Base Price Boundaries</h3>
            <p className="section-desc">Defines the indicative price range displayed on service and locality cards</p>

            <div className="grid-2-col">
              <div className="price-boundary-field">
                <NumberField label="Minimum Price (INR) — Package A (Ritual Only)" value={card.minPrice} onChange={handleMinPriceChange} />
                <span className="field-sub-hint">Base dakshina for devotee-arranged samagri</span>
              </div>
              <div className="price-boundary-field">
                <NumberField label="Maximum Price (INR) — Package B (Ritual + Samagri)" value={card.maxPrice} onChange={(v) => set(['maxPrice'], v)} />
                <span className="field-sub-hint">Auto-tied to Package B (Complete Purohit + Samagri Kit)</span>
              </div>
            </div>

            <TextField label="Pricing Note (devotee facing)" multiline value={card.pricingNote} lang={lang} onChange={(v) => set(['pricingNote'], v)} />
            <TextField label="Pricing Rationale (inclusions breakdown)" multiline value={card.pricingRationale} lang={lang} onChange={(v) => set(['pricingRationale'], v)} />

            <div className="approval-toggle-box" style={{ marginTop: '16px' }}>
              <label className="check-box-control">
                <input
                  type="checkbox"
                  checked={Boolean(card.isBusinessApproved)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onChange({
                      ...card,
                      isBusinessApproved: checked,
                      approvalStatus: checked ? 'approved' : 'needs-business-confirmation'
                    });
                  }}
                />
                <span className="font-semibold">Publish this ceremony on live website</span>
              </label>
              <p className="field-hint">
                {card.isBusinessApproved
                  ? '✓ Published: Packages and rates are live and visible to devotees across website cards and search.'
                  : '⏳ In Review: Ceremony is marked as in-review and displayed as Custom Quote until published.'}
              </p>
            </div>
          </div>

          <div className="step-navigation-footer dual">
            <button
              type="button"
              className="btn-step-back"
              onClick={() => setTab('details')}
            >
              <ArrowLeft size={15} />
              <span>Back: Service Details</span>
            </button>

            <span className="step-indicator">Step 2 of 5: Rates &amp; Range</span>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {onSave && (
                <button
                  type="button"
                  className={`btn-step-save ${isDirty ? 'dirty' : ''}`}
                  onClick={onSave}
                  disabled={isSaving}
                  title={isDirty ? "Save ceremony changes to live website" : "Ceremony rate card is up to date and live. Click to confirm."}
                >
                  <Save size={15} />
                  <span>{isSaving ? 'Saving…' : isDirty ? 'Save & Confirm' : '✓ Saved & Confirmed'}</span>
                </button>
              )}

              <button
                type="button"
                className="btn-step-next"
                onClick={() => setTab('packages')}
              >
                <span>Next: Packages ({card.packages.length})</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Packages */}
      {currentTab === 'packages' && (
        <div className="workspace-tab-content">
          <div className="editor-card packages-section">
            <div className="packages-section-header">
              <div>
                <h3 className="section-title">Ceremony Packages</h3>
                <p className="section-desc">Different tiers available for devotees to select ({card.packages.length} packages created)</p>
              </div>
              <button
                type="button"
                className="btn-add-pkg"
                onClick={() => set(['packages'], [...card.packages, newPackage(card)])}
              >
                <Plus size={15} />
                <span>+ Add New Package</span>
              </button>
            </div>

            <div className="packages-list">
              {card.packages.map((pkg, i) => {
                const baseDakshina = typeof card.minPrice === 'number' ? card.minPrice : 0;
                const includedSamagriItems = (pkg.includedSamagriIds || []).map((id) => samagri.find((s) => s.id === id)).filter(Boolean);
                const totalSamagriCost = includedSamagriItems.reduce((sum, s) => sum + (typeof s.price === 'number' ? s.price : 0), 0);
                const calculatedPackageTotal = baseDakshina + totalSamagriCost;
                const unconfirmedSamagriCount = includedSamagriItems.filter((s) => s.price === null || !s.isPriceVerified).length;
                const hasSamagri = includedSamagriItems.length > 0;
                const isInverted = pkg.indicativePrice !== null && card.minPrice !== null && pkg.indicativePrice < card.minPrice;

                const handleToggleSamagri = (samagriItem) => {
                  const isChecked = (pkg.includedSamagriIds || []).includes(samagriItem.id);
                  const nextIds = isChecked
                    ? (pkg.includedSamagriIds || []).filter((id) => id !== samagriItem.id)
                    : [...(pkg.includedSamagriIds || []), samagriItem.id];

                  const newSamagriCost = nextIds.reduce((sum, id) => {
                    const s = samagri.find((x) => x.id === id);
                    return sum + (s && typeof s.price === 'number' ? s.price : 0);
                  }, 0);

                  // Automatically calculate new package price: Base Dakshina + Added Samagri Cost
                  const newPackagePrice = baseDakshina + newSamagriCost;

                  updatePkg(i, {
                    includedSamagriIds: nextIds,
                    indicativePrice: newPackagePrice > 0 ? newPackagePrice : null
                  });
                };

                const isCollapsed = Boolean(collapsedPkgs[pkg.id]);

                return (
                  <div className={`package-card modern ${isInverted ? 'card-has-inversion' : ''} ${isCollapsed ? 'is-collapsed' : ''}`} key={pkg.id}>
                    {/* Modern Interactive Package Header */}
                    <div className="package-card-header" onClick={() => togglePkg(pkg.id)}>
                      <div className="pkg-header-left">
                        <span className="pkg-index-badge">#{i + 1}</span>
                        <span className="pkg-title-text">{pkg.name.en || '(Unnamed Package)'}</span>
                        <code className="pkg-id-tag">{pkg.id}</code>
                        <span className={`tier-badge tier-${pkg.tier}`}>{pkg.tier}</span>
                        {pkg.badge?.en && <span className="pkg-badge-pill">{pkg.badge.en}</span>}
                        <span className={`pkg-price-pill ${pkg.indicativePrice === null ? 'quote' : isInverted ? 'error' : 'live'}`}>
                          {pkg.indicativePrice === null
                            ? 'Custom Quote'
                            : isInverted
                              ? `⚠️ Inverted: ₹${pkg.indicativePrice.toLocaleString('en-IN')}`
                              : `₹${pkg.indicativePrice.toLocaleString('en-IN')}*`}
                        </span>
                        {isInverted && <span className="tier-badge-error">Inverted Price</span>}
                      </div>

                      <div className="pkg-header-right" onClick={(e) => e.stopPropagation()}>
                        <span className="pkg-summary-tag">
                          {pkg.inclusions?.length || 0} Inclusions • {includedSamagriItems.length} Samagri
                        </span>
                        <div className="pkg-reorder-btns">
                          <button
                            type="button"
                            className="btn-icon"
                            disabled={i === 0}
                            onClick={() => set(['packages'], moveItem(card.packages, i, i - 1))}
                            title="Move package up"
                          >
                            <ArrowUp size={13} />
                          </button>
                          <button
                            type="button"
                            className="btn-icon"
                            disabled={i === card.packages.length - 1}
                            onClick={() => set(['packages'], moveItem(card.packages, i, i + 1))}
                            title="Move package down"
                          >
                            <ArrowDown size={13} />
                          </button>
                          <button
                            type="button"
                            className="btn-icon btn-danger"
                            disabled={card.packages.length <= 1}
                            onClick={() => set(['packages'], card.packages.filter((_, j) => j !== i))}
                            title="Delete package"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn-toggle-expand"
                          onClick={() => togglePkg(pkg.id)}
                          title={isCollapsed ? 'Expand package details' : 'Collapse package'}
                        >
                          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Body */}
                    {!isCollapsed && (
                      <div className="package-card-body">
                        {/* Inversion Alert if applicable */}
                        {isInverted && (
                          <div className="pkg-inversion-alert">
                            <div className="alert-header">
                              <AlertTriangle size={15} color="#DC2626" />
                              <strong>Pricing Inversion Warning:</strong>
                            </div>
                            <p className="alert-text">
                              Package price (<strong>₹{pkg.indicativePrice.toLocaleString('en-IN')}</strong>) is lower than ceremony base dakshina (<strong>₹{card.minPrice.toLocaleString('en-IN')}</strong>).
                            </p>
                            <div className="alert-actions">
                              <button
                                type="button"
                                className="btn-alert-action"
                                onClick={() => setPkg(i, 'indicativePrice', calculatedPackageTotal)}
                              >
                                Set to Calculated Total (₹{calculatedPackageTotal.toLocaleString('en-IN')})
                              </button>
                              <button
                                type="button"
                                className="btn-alert-action outline"
                                onClick={() => setPkg(i, 'indicativePrice', card.minPrice)}
                              >
                                Align with Base Rate (₹{card.minPrice.toLocaleString('en-IN')})
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Row 1: Identity (Package Name, Tier, Badge Text) in 1 sleek compact row */}
                        <div className="pkg-grid-identity">
                          <div className="pkg-col-name">
                            <TextField label="Package Name" value={pkg.name} lang={lang} onChange={(v) => setPkg(i, 'name', v)} />
                          </div>
                          <div className="pkg-col-tier">
                            <Select label="Tier" value={pkg.tier} options={TIERS} onChange={(v) => setPkg(i, 'tier', v)} />
                          </div>
                          <div className="pkg-col-badge">
                            <TextField label="Badge Text (e.g. Most Popular)" value={pkg.badge} lang={lang} onChange={(v) => setPkg(i, 'badge', v)} />
                          </div>
                        </div>

                        {/* Row 2: Price, Note, & Integrated Compact Calculator */}
                        <div className="pkg-grid-pricing">
                          <div className="pkg-col-price">
                            <NumberField
                              label="Package Price (INR)"
                              value={pkg.indicativePrice}
                              onChange={(v) => setPkg(i, 'indicativePrice', v)}
                            />
                          </div>
                          <div className="pkg-col-note">
                            <TextField label="Price Note" value={pkg.priceNote} lang={lang} onChange={(v) => setPkg(i, 'priceNote', v)} />
                          </div>
                          <div className="pkg-col-calc">
                            <div className="pkg-mini-calc-card">
                              <div className="mini-calc-row">
                                <span className="calc-label">Customer Display:</span>
                                <strong className="calc-val-live">
                                  {pkg.indicativePrice === null ? 'Custom Quote' : `₹${pkg.indicativePrice.toLocaleString('en-IN')}*`}
                                </strong>
                              </div>
                              <div className="mini-calc-row sub">
                                <span>Base ₹{baseDakshina.toLocaleString('en-IN')} + Samagri ({includedSamagriItems.length}): +₹{totalSamagriCost.toLocaleString('en-IN')} = <strong>₹{calculatedPackageTotal.toLocaleString('en-IN')}</strong></span>
                              </div>
                              {pkg.indicativePrice !== calculatedPackageTotal && (
                                <button
                                  type="button"
                                  className="btn-apply-calc-mini"
                                  onClick={() => setPkg(i, 'indicativePrice', calculatedPackageTotal)}
                                  title="Click to apply the exact calculated sum of Base Dakshina + Bundled Samagri"
                                >
                                  ⚡ Apply Calculated (₹{calculatedPackageTotal.toLocaleString('en-IN')})
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Inclusions & Exclusions */}
                        <div className="pkg-lists-grid compact">
                          <TextList label="Inclusions" items={pkg.inclusions} lang={lang} onChange={(v) => setPkg(i, 'inclusions', v)} />
                          <TextList label="Exclusions" items={pkg.exclusions} lang={lang} onChange={(v) => setPkg(i, 'exclusions', v)} />
                        </div>

                        {/* Row 4: Included Samagri Items */}
                        <div className="field samagri-selector-field compact">
                          <div className="samagri-selector-header">
                            <label className="field-label">Included Samagri Items in this Tier (Selecting increases package price automatically)</label>
                            <span className="samagri-total-badge">
                              Bundled: {includedSamagriItems.length} items (+₹{totalSamagriCost.toLocaleString('en-IN')})
                            </span>
                          </div>
                          <div className="samagri-chip-grid compact">
                            {samagri.map((s) => {
                              const isChecked = (pkg.includedSamagriIds || []).includes(s.id);
                              return (
                                <label className={`samagri-chip ${isChecked ? 'selected' : ''}`} key={s.id}>
                                  <div className="chip-main">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleSamagri(s)}
                                    />
                                    <span className="chip-name">{s.name.en}</span>
                                  </div>
                                  <span className="chip-price-badge">
                                    {s.price ? `+₹${s.price.toLocaleString('en-IN')}` : '(₹0 / not set)'}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
            })}
          </div>
          </div>

          <div className="step-navigation-footer dual">
            <button
              type="button"
              className="btn-step-back"
              onClick={() => setTab('pricing')}
            >
              <ArrowLeft size={15} />
              <span>Back: Rates &amp; Range</span>
            </button>

            <span className="step-indicator">Step 3 of 5: Packages</span>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {onSave && (
                <button
                  type="button"
                  className={`btn-step-save ${isDirty ? 'dirty' : ''}`}
                  onClick={onSave}
                  disabled={isSaving}
                  title={isDirty ? "Save ceremony packages to live website" : "Packages are up to date and live. Click to confirm."}
                >
                  <Save size={15} />
                  <span>{isSaving ? 'Saving…' : isDirty ? 'Save & Confirm' : '✓ Saved & Confirmed'}</span>
                </button>
              )}

              <button
                type="button"
                className="btn-step-next"
                onClick={() => setTab('preview')}
                title="Preview packages as devotees see them"
              >
                <span>View Preview</span>
                <Eye size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Internal Notes */}
      {currentTab === 'notes' && (
        <div className="workspace-tab-content">
          <div className="editor-card internal-notes-card">
            <h3 className="section-title">Internal Panditji Research &amp; Operations</h3>
            <p className="section-desc">These notes are visible to the internal editorial team only and are never exposed to devotees.</p>

            <PlainField label="Research Basis (Scriptural context, muhurat traditions, regional variations)" multiline value={card.researchBasis} onChange={(v) => set(['researchBasis'], v)} />
            <PlainField label="Missing Business Info (Pending confirmations, samagri sourcing details)" multiline value={card.missingBusinessInfo} onChange={(v) => set(['missingBusinessInfo'], v)} />
          </div>

          <div className="step-navigation-footer dual">
            <button
              type="button"
              className="btn-step-back"
              onClick={() => setTab('packages')}
            >
              <ArrowLeft size={15} />
              <span>Back: Packages</span>
            </button>

            <span className="step-indicator">Step 4 of 5: Internal Notes</span>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {onSave && (
                <button
                  type="button"
                  className={`btn-step-save ${isDirty ? 'dirty' : ''}`}
                  onClick={onSave}
                  disabled={isSaving}
                  title={isDirty ? "Save ceremony changes to live website" : "Ceremony rate card is up to date and live. Click to confirm."}
                >
                  <Save size={15} />
                  <span>{isSaving ? 'Saving…' : isDirty ? 'Save & Confirm' : '✓ Saved & Confirmed'}</span>
                </button>
              )}

              <button
                type="button"
                className="btn-step-next"
                onClick={() => setTab('preview')}
              >
                <span>Next: Devotee Preview</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Live Devotee Preview */}
      {currentTab === 'preview' && (
        <div className="workspace-tab-content">
          <div className="preview-container">
            <div className="preview-card-frame">
              <div className="preview-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="live-pill">
                    <span className="live-dot" />
                    Devotee Website View
                  </span>
                  <span className="preview-note">Language: {lang.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  className="btn-close-preview"
                  onClick={() => setTab('packages')}
                  title="Close preview and return to packages editor"
                >
                  <X size={14} />
                  <span>Close Preview</span>
                </button>
              </div>

              <div className="preview-mock-card">
                <div className="mock-top">
                  <div className="mock-icon-title">
                    <Flame size={20} color="#BD4B23" />
                    <h4>{card.serviceName[lang === 'all' ? 'en' : lang] || card.serviceName.en}</h4>
                  </div>
                  <span className="mock-price-badge">{startingPrice}</span>
                </div>

                <p className="mock-desc">
                  {card.pricingNote[lang === 'all' ? 'en' : lang] || card.pricingNote.en || 'Authentic Vedic rituals performed by experienced North Indian purohits.'}
                </p>

                <div className="mock-packages-preview">
                  <h5>Available Ceremony Packages:</h5>
                  <div className="mock-pkg-grid">
                    {card.packages.map((pkg) => (
                      <div className="mock-pkg-card" key={pkg.id}>
                        <div className="mock-pkg-head">
                          <strong>{pkg.name[lang === 'all' ? 'en' : lang] || pkg.name.en}</strong>
                          <span className="mock-pkg-price">
                            {pkg.indicativePrice ? `₹${pkg.indicativePrice.toLocaleString('en-IN')}` : 'Custom Quote'}
                          </span>
                        </div>
                        {pkg.badge && pkg.badge.en && (
                          <span className="mock-badge">{pkg.badge[lang === 'all' ? 'en' : lang] || pkg.badge.en}</span>
                        )}
                        <ul className="mock-inclusions">
                          {(pkg.inclusions || []).slice(0, 3).map((inc, idx) => (
                            <li key={idx}>✓ {inc[lang === 'all' ? 'en' : lang] || inc.en}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mock-btn-row">
                  <button type="button" className="mock-cta-btn">Book Ceremony &rarr;</button>
                </div>
              </div>
            </div>
          </div>

          <div className="step-navigation-footer dual">
            <button
              type="button"
              className="btn-step-back"
              onClick={() => setTab('packages')}
            >
              <ArrowLeft size={15} />
              <span>Back to Packages</span>
            </button>

            <span className="step-indicator">Step 5 of 5: Verified &amp; Ready</span>

            {onSave && (
              <button
                type="button"
                className={`btn-step-save ${isDirty ? 'dirty' : ''}`}
                onClick={onSave}
                disabled={isSaving}
                title={isDirty ? "Save changes to live website" : "All ceremony packages are confirmed and live. Click to re-save."}
              >
                <Save size={15} />
                <span>{isSaving ? 'Saving…' : isDirty ? 'Save & Confirm' : '✓ Saved & Confirmed'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
