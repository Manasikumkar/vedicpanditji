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
  OPTIONAL_SAMAGRI_OPTIONS,
  getCityNote
} from '../../data/pujaPricing';

export default function PricingPackagesSection({
  service,
  selectedCityName = 'Pune',
  onCityChange,
  onSelectPackage,
  onEnquireGeneral
}) {
  const [city, setCity] = useState(selectedCityName || 'Pune');
  const [showSamagriDrawer, setShowSamagriDrawer] = useState(false);

  const handleCityChange = (newCity) => {
    setCity(newCity);
    if (onCityChange) onCityChange(newCity);
  };

  const pricing = getPujaPricing(service, city);
  const { model, packages, hasPackages } = pricing;

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
                  ? 'Standard Fixed Dakshina'
                  : (hasPackages
                      ? 'Transparent Ceremony Packages'
                      : 'Shastra Vidhi Pricing & Dakshina')}
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
              {service?.name} Pricing &amp; Packages
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary, #6B6355)', maxWidth: '640px' }}>
              {model === PRICING_MODELS.MODEL_A_FIXED
                ? 'Standard fixed dakshina with no hidden costs. Performed at your doorstep or location by verified North Indian and Bihari Vedic priests.'
                : (hasPackages
                    ? 'Compare our clear ritual options. All ceremonies are performed by experienced North Indian and Bihari Vedic priests in sacred Hindi and Sanskrit.'
                    : 'Ceremonies are tailored to your family Gotra, Panchang Muhurat, and ritual duration with zero hidden charges.')}
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
                Serving City
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
                <option value="Pune">Pune &amp; PCMC (HQ)</option>
                <option value="Mumbai">Mumbai &amp; Thane (MMR)</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Nashik">Nashik / Trimbakeshwar</option>
                <option value="Online E-Puja">Online E-Puja (Pan-India &amp; Global)</option>
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
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '18px' }}>
                      <span style={{ fontSize: '30px', fontWeight: 900, color: '#BD4B23' }}>
                        {pkg.priceDisplay}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted, #8C8270)' }}>
                        {model === PRICING_MODELS.MODEL_A_FIXED ? '(Fixed Dakshina)*' : '(Starting Dakshina)*'}
                      </span>
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
                        <span>What Is Included:</span>
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
                        <span>Devotee (Yajaman) Arranges:</span>
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
                      <span>Select {pkg.name.split('—')[0]?.trim() || 'Package'}</span>
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
                  <span>Custom Quote Ceremony</span>
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
                  Bespoke Shastra Vidhi Quotation
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary, #4A4438)',
                    lineHeight: 1.65,
                    marginBottom: '20px'
                  }}
                >
                  Because this ceremony varies according to Shastra traditions, family gotra, duration, and required purohit count, our senior Acharyas provide a personalized quotation after reviewing your family requirements and preferred date.
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
                    <span>Every Quote Always Includes:</span>
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
                      <span>Experienced North Indian / Bihari Vedic Purohit(s)</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check size={14} color="#047857" />
                      <span>Complimentary Shubh Muhurat calculation tailored to Janma Kundali</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check size={14} color="#047857" />
                      <span>Itemized Samagri checklist and guidance</span>
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
                  Dakshina Structure
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#BD4B23', marginBottom: '8px' }}>
                  Custom Quote
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted, #8C8270)', marginBottom: '20px', lineHeight: 1.5 }}>
                  Zero fabricated rates. Honest pricing determined directly with senior Acharyas based on your vidhi.
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
                  <span>Enquire for Custom Quote</span>
                </button>

                <a
                  href={`https://wa.me/919766880979?text=${encodeURIComponent(
                    `Namaste Panditji, I would like to inquire about a custom quote for ${service?.name} in ${city}.`
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
                  <span>💬 Instant WhatsApp Enquiry</span>
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
          *Indicative dakshina is subject to Shubh Muhurat review, samagri preferences, and travel arrangements. The final quote and priest allocation are confirmed directly with our Vedic coordination team with zero hidden charges.
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
              <span>Optional Samagri &amp; Sacred Add-ons (Transparent Pricing)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#BD4B23', fontWeight: 600 }}>
              <span>{showSamagriDrawer ? 'Hide Add-ons' : 'View Add-ons'}</span>
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
              {OPTIONAL_SAMAGRI_OPTIONS.map((item) => (
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
                      Rate:
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
