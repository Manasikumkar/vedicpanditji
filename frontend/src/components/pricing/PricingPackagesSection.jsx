import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  MapPin,
  Package,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  getPujaPricing,
  PRICING_MODELS,
  getOptionalSamagriOptions,
  getCityNote
} from '../../data/pujaPricing';
import { useI18n } from '../../i18n/useI18n';
import { translate } from '../../i18n';

// Serving city options: value is the pricing city; labelKey is translated, name is a location name kept as data.
const CITY_OPTIONS = [
  { value: 'Pune', labelKey: 'pricing.city.pune' },
  { value: 'Mumbai', labelKey: 'pricing.city.mumbai' },
  { value: 'Bangalore', name: 'Bangalore' },
  { value: 'Delhi', name: 'Delhi NCR' },
  { value: 'Hyderabad', name: 'Hyderabad' },
  { value: 'Chennai', name: 'Chennai' },
  { value: 'Nashik', name: 'Nashik / Trimbakeshwar' },
  { value: 'Online E-Puja', labelKey: 'pricing.city.online' }
];

export default function PricingPackagesSection({
  service,
  selectedCityName = 'Pune',
  onCityChange,
  onSelectPackage,
  onEnquireGeneral
}) {
  const { t, lang } = useI18n();
  const [city, setCity] = useState(selectedCityName || 'Pune');
  const [showSamagriDrawer, setShowSamagriDrawer] = useState(false);

  const handleCityChange = (newCity) => {
    setCity(newCity);
    if (onCityChange) onCityChange(newCity);
  };

  const pricing = getPujaPricing(service, city, lang);
  const { model, packages, hasPackages } = pricing;
  const samagriOptions = getOptionalSamagriOptions(lang);

  return (
    <section id="pricing-packages" style={{ marginBottom: '40px' }}>
      <div
        className="service-packages-container"
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid #EAE5D9',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Header with serving city selector */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '1px solid #EAE5D9',
            paddingBottom: '20px'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-saffron, #BD4B23)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={13} />
              <span>
                {model === PRICING_MODELS.MODEL_A_FIXED
                  ? t('pricing.eyebrow.fixed')
                  : (hasPackages
                      ? t('pricing.eyebrow.packages')
                      : t('pricing.eyebrow.custom'))}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '26px',
                fontWeight: 800,
                color: 'var(--text-main, #1A1613)',
                marginBottom: '4px'
              }}
            >
              {service?.name}{t('pricing.title-suffix')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary, #6B6355)', maxWidth: '640px' }}>
              {model === PRICING_MODELS.MODEL_A_FIXED
                ? t('pricing.intro.fixed')
                : (hasPackages
                    ? t('pricing.intro.packages')
                    : t('pricing.intro.custom'))}
            </p>
          </div>

          {/* City Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FBF9F5',
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid #EAE5D9'
            }}
          >
            <MapPin size={16} color="#BD4B23" />
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted, #8C8270)' }}>
                {t('pricing.serving-city')}
              </div>
              <select
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#BD4B23',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {CITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.labelKey ? t(o.labelKey) : o.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* City Availability Notice */}
        <div
          style={{
            fontSize: '12px',
            color: '#BD4B23',
            fontWeight: 600,
            background: '#FBF9F5',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid #EAE5D9',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px'
          }}
        >
          <MapPin size={14} color="#BD4B23" style={{ flexShrink: 0 }} />
          <span>{getCityNote(city)}</span>
        </div>

        {/* ======================================================== */}
        {/* PACKAGES DISPLAY (FOR BOTH MODEL B & MODEL A) */}
        {/* ======================================================== */}
        {hasPackages && packages && packages.length > 0 && !packages[0]?.priceDisplay?.includes('Custom Quote') ? (
          <div>


            <div
              style={{
                display: 'grid',
                gridTemplateColumns: packages.length > 2
                  ? 'repeat(3, 1fr)'
                  : (packages.length === 1 ? 'minmax(320px, 480px)' : 'repeat(2, 1fr)'),
                justifyContent: packages.length === 1 ? 'center' : 'stretch',
                gap: '24px',
                marginBottom: '20px'
              }}
              className="service-packages-grid"
            >
              {packages.map((pkg) => {
                const isPopular = pkg.tier === 'popular';
                const bundledItems = (pkg.includedSamagriIds || []).map((id) => samagriOptions.find((s) => s.id === id)).filter(Boolean);
                return (
                  <div
                    key={pkg.id}
                    className="card-premium service-package-card"
                    style={{
                      borderRadius: '20px',
                      border: isPopular ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                      background: isPopular ? '#FFFAF7' : '#FFFFFF',
                      padding: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: isPopular
                        ? '0 12px 30px rgba(189, 75, 35, 0.12)'
                        : 'var(--shadow-sm)'
                    }}
                  >
                    {/* Tier Badge */}
                    <div style={{ marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: '20px',
                          background: isPopular ? '#BD4B23' : '#F1EFEA',
                          color: isPopular ? '#FFFFFF' : '#57534E',
                          display: 'inline-block'
                        }}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Package Title */}
                    <h3
                      style={{
                        fontSize: '19px',
                        fontWeight: 800,
                        color: 'var(--text-main, #1A1613)',
                        marginBottom: '8px',
                        lineHeight: 1.3
                      }}
                    >
                      {pkg.name}
                    </h3>

                    {/* Price */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '30px', fontWeight: 900, color: '#BD4B23' }}>
                          {pkg.priceDisplay}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted, #8C8270)' }}>
                          {pkg.indicativePrice === null
                            ? '(Quote on Request)'
                            : (model === PRICING_MODELS.MODEL_A_FIXED ? t('pricing.price-note.fixed') : t('pricing.price-note.starting'))}
                        </span>
                      </div>
                      {pkg.priceNote && (
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary, #6B6355)', marginTop: '4px', lineHeight: 1.35 }}>
                          {typeof pkg.priceNote === 'string' ? pkg.priceNote : pkg.priceNote[lang] || pkg.priceNote.en}
                        </div>
                      )}
                    </div>

                    {/* Inclusions Block */}
                    <div
                      style={{
                        borderTop: '1px solid #EAE5D9',
                        paddingTop: '16px',
                        marginBottom: '16px'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#047857',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Check size={14} color="#047857" />
                        <span>{t('pricing.included')}</span>
                      </div>
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          padding: 0,
                          margin: 0
                        }}
                      >
                        {(pkg.inclusions || []).map((inc, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '13px',
                              color: 'var(--text-secondary, #4A4438)',
                              lineHeight: 1.45
                            }}
                          >
                            <Check size={14} color="#047857" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions / Devotee Preparations Block */}
                    {bundledItems.length > 0 && (
                      <div
                        style={{
                          background: '#FFF8F5',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          marginBottom: '16px',
                          border: '1px solid #FED7AA'
                        }}
                      >
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: '#C2410C',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <Package size={13} color="#C2410C" />
                          <span>Included Samagri Items ({bundledItems.length})</span>
                        </div>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          {bundledItems.map((item) => (
                            <li
                              key={item.id}
                              style={{
                                fontSize: '12.5px',
                                color: '#7C2D12',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <span style={{ color: '#EA580C', fontWeight: 'bold' }}>✓</span>
                              <span style={{ fontWeight: 600 }}>{item.name}</span>
                              {item.quantity && item.unit && (
                                <span style={{ fontSize: '11.5px', color: '#9A3412', opacity: 0.9 }}>
                                  ({item.quantity} {item.unit})
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div
                      style={{
                        flex: 1,
                        borderTop: '1px dashed #E5DFD3',
                        paddingTop: '14px',
                        marginBottom: '22px'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'var(--text-muted, #8C8270)',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Info size={13} color="var(--text-muted, #8C8270)" />
                        <span>{t('pricing.devotee-arranges')}</span>
                      </div>
                      <ul
                        style={{
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          padding: 0,
                          margin: 0
                        }}
                      >
                        {(pkg.exclusions || []).map((exc, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '12.5px',
                              color: 'var(--text-muted, #8C8270)',
                              lineHeight: 1.4
                            }}
                          >
                            <span style={{ color: '#BD4B23', flexShrink: 0 }}>&bull;</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectPackage) onSelectPackage(pkg, city);
                      }}
                      className={isPopular ? 'btn-primary' : 'btn-secondary'}
                      style={{
                        width: '100%',
                        padding: '13px',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={15} />
                      <span>{t('pricing.select')}{pkg.name.split('—')[0]?.trim() || t('pricing.package')}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* MODEL C: CUSTOM QUOTE CEREMONY (Fallback) */
          /* ======================================================== */
          <div
            style={{
              background: '#FDFBF7',
              borderRadius: '20px',
              border: '1px solid #EAE5D9',
              padding: '32px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr',
                gap: '32px',
                alignItems: 'center'
              }}
              className="custom-quote-grid"
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'var(--accent-saffron-light, #FFF2EC)',
                    color: '#BD4B23',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '14px'
                  }}
                >
                  <Sparkles size={13} />
                  <span>{t('pricing.custom.badge')}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--text-main, #1A1613)',
                    marginBottom: '10px'
                  }}
                >
                  {t('pricing.custom.title')}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary, #4A4438)',
                    lineHeight: 1.65,
                    marginBottom: '20px'
                  }}
                >
                  {t('pricing.custom.text')}
                </p>

                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #EAE5D9',
                    marginBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#047857',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Check size={14} color="#047857" />
                    <span>{t('pricing.custom.includes-title')}</span>
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: 0,
                      margin: 0,
                      fontSize: '13px',
                      color: 'var(--text-secondary, #4A4438)'
                    }}
                  >
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check size={14} color="#047857" />
                      <span>{t('pricing.custom.include-purohits')}</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check size={14} color="#047857" />
                      <span>{t('pricing.custom.include-muhurat')}</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check size={14} color="#047857" />
                      <span>{t('pricing.custom.include-checklist')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right CTA card */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1.5px solid #BD4B23',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted, #8C8270)', marginBottom: '4px' }}>
                  {t('pricing.custom.structure')}
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#BD4B23', marginBottom: '8px' }}>
                  {t('pricing.custom.quote')}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted, #8C8270)', marginBottom: '20px', lineHeight: 1.5 }}>
                  {t('pricing.custom.honest')}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onEnquireGeneral) onEnquireGeneral(city);
                  }}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '10px'
                  }}
                >
                  <Sparkles size={15} />
                  <span>{t('pricing.custom.enquire')}</span>
                </button>

                <a
                  href={`https://wa.me/919766880979?text=${encodeURIComponent(
                    // Goes to the business, so it stays English whatever the page language
                    translate('en', 'pricing.custom.whatsapp-message', { service: service?.name, city })
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#059669',
                    textDecoration: 'none',
                    padding: '8px'
                  }}
                >
                  <span>{`💬 ${t('pricing.custom.whatsapp')}`}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Conditions Disclaimer */}
        <div
          style={{
            marginTop: '16px',
            fontSize: '11.5px',
            color: 'var(--text-muted, #8C8270)',
            textAlign: 'center',
            lineHeight: 1.55,
            padding: '0 12px'
          }}
        >
          {t('pricing.disclaimer')}
        </div>

        {/* Optional Samagri & Add-ons Collapsible Drawer */}
        <div style={{ marginTop: '24px', borderTop: '1px solid #EAE5D9', paddingTop: '18px' }}>
          <button
            type="button"
            onClick={() => setShowSamagriDrawer(!showSamagriDrawer)}
            style={{
              background: 'none',
              border: 'none',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 0',
              cursor: 'pointer',
              color: 'var(--text-main, #1A1613)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              <Package size={17} color="#BD4B23" />
              <span>{t('pricing.addons.title')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#BD4B23', fontWeight: 600 }}>
              <span>{showSamagriDrawer ? t('pricing.addons.hide') : t('pricing.addons.view')}</span>
              {showSamagriDrawer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {showSamagriDrawer && (
            <div
              style={{
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px'
              }}
            >
              {samagriOptions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FDFBF7',
                    border: '1px solid #EAE5D9',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main, #1A1613)', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary, #6B6355)', lineHeight: 1.45, marginBottom: '10px' }}>
                      {item.description}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed #EAE5D9' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted, #8C8270)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {t('pricing.addons.rate')}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: item.isPriceVerified ? '#BD4B23' : '#6B6355' }}>
                      {item.priceDisplay}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .service-packages-grid {
            grid-template-columns: 1fr !important;
          }
          .custom-quote-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
