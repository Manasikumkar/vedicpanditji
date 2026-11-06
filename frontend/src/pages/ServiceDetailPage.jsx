import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, getServiceImage } from '../data/vedicPanditData';
import { getPricingDisplay } from '../data/pujaPricing';
import PricingPackagesSection from '../components/pricing/PricingPackagesSection';
import { useI18n } from '../i18n/useI18n';
import {
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Share2,
  Package,
  Check,
  CalendarCheck
} from 'lucide-react';

export default function ServiceDetailPage() {
  const { routeParams, navigateTo, openBookingModal, showToast, selectedCity } = useApp();
  const { t, lp, lang, locServiceName, locServiceDesc } = useI18n();

  // Find service from params or fallback
  const serviceId = routeParams?.serviceId || 'satyanarayan-puja';
  const service = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const [activeTab, setActiveTab] = useState('significance'); // 'significance', 'vidhi', 'samagri', 'timing', 'faqs'
  const [selectedCityName, setSelectedCityName] = useState(
    routeParams?.city || (typeof selectedCity === 'string' ? selectedCity : selectedCity?.name || 'Pune')
  );

  const pricingDisplay = getPricingDisplay(service.id, lang);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(t('toast.ceremony-link-copied'));
    }
  };

  // Contextual timing suggestions based on category & service
  const getTimingContext = () => {
    const sId = service.id || '';
    if (sId.includes('griha-pravesh')) {
      return {
        bestDays: t('service.timing-context.griha-pravesh.best-days'),
        timing: t('service.timing-context.griha-pravesh.time'),
        notes: t('service.timing-context.griha-pravesh.notes')
      };
    }
    if (sId.includes('satyanarayan')) {
      return {
        bestDays: t('service.timing-context.satyanarayan.best-days'),
        timing: t('service.timing-context.satyanarayan.time'),
        notes: t('service.timing-context.satyanarayan.notes')
      };
    }
    if (sId.includes('vastu-shanti')) {
      return {
        bestDays: t('service.timing-context.vastu-shanti.best-days'),
        timing: t('service.timing-context.vastu-shanti.time'),
        notes: t('service.timing-context.vastu-shanti.notes')
      };
    }
    if (sId.includes('rudrabhishek')) {
      return {
        bestDays: t('service.timing-context.rudrabhishek.best-days'),
        timing: t('service.timing-context.rudrabhishek.time'),
        notes: t('service.timing-context.rudrabhishek.notes')
      };
    }
    if (service.category === 'havans') {
      return {
        bestDays: t('service.timing-context.havans.best-days'),
        timing: t('service.timing-context.havans.time'),
        notes: t('service.timing-context.havans.notes')
      };
    }
    if (service.category === 'pitru-pujas') {
      return {
        bestDays: t('service.timing-context.pitru-pujas.best-days'),
        timing: t('service.timing-context.pitru-pujas.time'),
        notes: t('service.timing-context.pitru-pujas.notes')
      };
    }
    return {
      bestDays: t('service.timing-context.default.best-days'),
      timing: t('service.timing-context.default.time'),
      notes: t('service.timing-context.default.notes')
    };
  };

  const timingInfo = getTimingContext();

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label={t('service.breadcrumb.label')} style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <a
            href={lp('/')}
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            style={{ color: 'inherit', textDecoration: 'none' }}
            className="hover:text-amber-800"
          >
            {t('service.breadcrumb.home')}
          </a>
          {' / '}
          <a
            href={lp('/services')}
            onClick={(e) => { e.preventDefault(); navigateTo('catalogue'); }}
            style={{ color: 'inherit', textDecoration: 'none' }}
            className="hover:text-amber-800"
          >
            {t('service.breadcrumb.ceremonies')}
          </a>
          {' / '}
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{locServiceName(service)}</span>
        </nav>

        {/* ======================================================== */}
        {/* 1. TOP SUMMARY GRID (Hero, Title, Inclusions & CTAs) */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '40px',
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
          className="service-detail-top-grid"
        >
          {/* Left Column: Image Banner */}
          <div>
            <div
              className="service-detail-img-box"
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#FAF8F5'
              }}
            >
              <img
                src={service.image || getServiceImage(service)}
                alt={service.name}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleShare}
                title={t('service.share-title')}
              >
                <Share2 size={16} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                  <MapPin size={15} color="var(--accent-gold)" />
                  <span>{t('service.doorstep-across.before')}{selectedCityName}{t('service.doorstep-across.after')}</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div
              style={{
                marginTop: '20px',
                background: 'var(--bg-primary)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #EAE5D9',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                <span>{t('service.guarantee.pandits')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Package size={16} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                <span>{t('service.guarantee.samagri')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Clock size={16} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                <span>{t('service.guarantee.muhurat')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Dakshina, Inclusions & Booking Action */}
          <div>
            <div className="badge-saffron" style={{ marginBottom: '10px' }}>
              <Sparkles size={12} />
              <span>{t('service.badge.authentic-ritual')}{service.category?.toUpperCase() || t('service.badge.ceremony')}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-main)' }}>
              {service.name}
            </h1>

            {/* Dakshina Range / Custom Quote Display */}
            <div
              style={{
                background: 'var(--bg-primary)',
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid #EAE5D9',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                {t('service.dakshina.label')}
              </span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                {pricingDisplay.displayPrice}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {pricingDisplay.hasPackages
                  ? t('service.dakshina.indicative')
                  : t('service.dakshina.custom')}
              </span>
            </div>

            {/* Short Description */}
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {service.shortDescription}
            </p>

            {/* Key Insights & Our Promise */}
            <div className="grid-2" style={{ gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#FDFCF9', padding: '14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-saffron)' }}>
                  {t('service.key-insights')}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', padding: 0, margin: 0 }}>
                  {service.keyInsights?.slice(0, 3).map((ins, i) => (
                    <li key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-saffron)' }}>•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#FDFCF9', padding: '14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-gold)' }}>
                  {t('service.our-promise')}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', padding: 0, margin: 0 }}>
                  {service.ourPromise?.slice(0, 3).map((prom, i) => (
                    <li key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                      <span>{prom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Genuine Booking Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => openBookingModal(service, null, selectedCityName)}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '220px', padding: '14px', fontSize: '15px', cursor: 'pointer' }}
                >
                  <Sparkles size={16} />
                  <span>{t('service.cta.book')}</span>
                </button>

                <a
                  href="#pricing-packages"
                  className="btn-secondary"
                  style={{
                    padding: '14px 22px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <Package size={16} color="#BD4B23" />
                  <span>{t('service.cta.view-pricing')}</span>
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #DDD7C8',
                  color: 'var(--text-secondary)',
                  fontSize: '12.5px'
                }}
              >
                <Sparkles size={14} color="var(--accent-saffron)" />
                <span>{t('service.cta.guidance-included')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. CENTRALIZED PRICING & PACKAGES SECTION */}
        {/* ======================================================== */}
        <PricingPackagesSection
          service={service}
          selectedCityName={selectedCityName}
          onCityChange={(newCity) => setSelectedCityName(newCity)}
          onSelectPackage={(pkg, city) => openBookingModal(service, null, city, pkg)}
          onEnquireGeneral={(city) => openBookingModal(service, null, city)}
        />

        {/* ======================================================== */}
        {/* 3. STRUCTURED CEREMONY CONTENT HIERARCHY TABS */}
        {/* (Significance, When to Perform, Vidhi, Samagri, FAQs) */}
        {/* ======================================================== */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EAE5D9',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
        >
          {/* Tab Navigation Headers */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #EAE5D9',
              background: 'var(--bg-primary)',
              fontSize: '14px',
              fontWeight: 700,
              overflowX: 'auto'
            }}
          >
            {[
              { id: 'significance', label: t('service.tab.significance') },
              { id: 'timing', label: t('service.tab.timing') },
              { id: 'vidhi', label: t('service.tab.vidhi') },
              { id: 'samagri', label: t('service.tab.samagri') },
              { id: 'faqs', label: t('service.tab.faqs', { count: service.faqs?.length || 3 }) }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  borderBottom: activeTab === tab.id ? '3px solid var(--accent-saffron)' : '3px solid transparent',
                  color: activeTab === tab.id ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                  background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  fontWeight: 700
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div style={{ padding: '36px' }}>
            {/* Tab 1: Significance & Benefits */}
            {activeTab === 'significance' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  {t('service.significance.title-before')}{locServiceName(service)}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px', whiteSpace: 'pre-line' }}>
                  {service.longDescription || service.shortDescription}
                </p>

                <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
                  {t('service.significance.benefits-title')}
                </h4>
                <div className="grid-2" style={{ gap: '14px', marginBottom: '24px' }}>
                  {(service.keyInsights || [
                    t('service.significance.benefit-1'),
                    t('service.significance.benefit-2'),
                    t('service.significance.benefit-3'),
                    t('service.significance.benefit-4')
                  ]).map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: '#FDFBF7',
                        border: '1px solid #EAE5D9',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '13.5px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Sparkles size={16} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Consultation callout */}
                <div
                  style={{
                    background: 'var(--accent-saffron-light)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(189, 75, 35, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-saffron)' }}>
                      {t('service.significance.traditions-title')}
                    </h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {t('service.significance.traditions-text')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBookingModal(service.name)}
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '13px', cursor: 'pointer' }}
                  >
                    {t('service.significance.speak-cta')}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: When to Perform */}
            {activeTab === 'timing' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  {t('service.when.title-before')}{locServiceName(service)}{t('service.when.title-after')}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {t('service.when.intro')}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px'
                  }}
                >
                  <div style={{ background: '#FDFBF7', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                      <CalendarCheck size={18} />
                      <span>{t('service.when.recommended-days')}</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {timingInfo.bestDays}
                    </p>
                  </div>

                  <div style={{ background: '#FDFBF7', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-gold)', fontWeight: 700 }}>
                      <Clock size={18} />
                      <span>{t('service.when.time-of-day')}</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {timingInfo.timing}
                    </p>
                  </div>

                  <div style={{ background: '#FDFBF7', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#047857', fontWeight: 700 }}>
                      <Check size={18} />
                      <span>{t('service.when.shastra-guidance')}</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {timingInfo.notes}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: '#FFF8F4',
                    border: '1.5px solid var(--accent-saffron)',
                    borderRadius: '14px',
                    padding: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#BD4B23', marginBottom: '4px' }}>
                      {t('service.when.muhurat-title')}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {t('service.when.muhurat-text')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBookingModal(service.name)}
                    className="btn-primary"
                    style={{ padding: '11px 22px', fontSize: '13.5px', cursor: 'pointer' }}
                  >
                    {t('service.when.muhurat-cta')}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Procedure & Vidhi Sequence */}
            {activeTab === 'vidhi' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  {t('service.vidhi.title')}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {t('service.vidhi.intro')}
                </p>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '28px' }}>
                  {[
                    { step: t('service.vidhi.swasti-vachan.step'), desc: t('service.vidhi.swasti-vachan.desc') },
                    { step: t('service.vidhi.sankalpam.step'), desc: t('service.vidhi.sankalpam.desc') },
                    { step: t('service.vidhi.ganesh-sthapana.step'), desc: t('service.vidhi.ganesh-sthapana.desc') },
                    { step: t('service.vidhi.navagraha.step'), desc: t('service.vidhi.navagraha.desc') },
                    { step: t('service.vidhi.abhishekam.step'), desc: t('service.vidhi.abhishekam.desc') },
                    { step: t('service.vidhi.katha.step'), desc: t('service.vidhi.katha.desc') },
                    { step: t('service.vidhi.hawan.step'), desc: t('service.vidhi.hawan.desc') },
                    { step: t('service.vidhi.aarti.step'), desc: t('service.vidhi.aarti.desc') }
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'var(--bg-primary)',
                        border: '1px solid #EAE5D9',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}
                    >
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'var(--accent-saffron)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                          {s.step}
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Samagri Checklist */}
            {activeTab === 'samagri' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  {t('service.samagri.title')}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {t('service.samagri.intro')}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    marginBottom: '28px'
                  }}
                >
                  {/* Column 1: What Panditji Provides */}
                  <div
                    style={{
                      background: '#FDFBF7',
                      borderRadius: '16px',
                      border: '1px solid #EAE5D9',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#047857' }}>
                      <Package size={20} />
                      <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>
                        {t('service.samagri.provided-title')}
                      </h4>
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {[
                        t('service.samagri.provided-1'),
                        t('service.samagri.provided-2'),
                        t('service.samagri.provided-3'),
                        t('service.samagri.provided-4'),
                        t('service.samagri.provided-5'),
                        t('service.samagri.provided-6'),
                        t('service.samagri.provided-7')
                      ].map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check size={14} color="#047857" style={{ flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: What Devotee Prepares */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #EAE5D9',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#BD4B23' }}>
                      <Check size={20} />
                      <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>
                        {t('service.samagri.arranged-title')}
                      </h4>
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {[
                        t('service.samagri.arranged-1'),
                        t('service.samagri.arranged-2'),
                        t('service.samagri.arranged-3'),
                        t('service.samagri.arranged-4'),
                        t('service.samagri.arranged-5'),
                        t('service.samagri.arranged-6'),
                        t('service.samagri.arranged-7')
                      ].map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#BD4B23', fontWeight: 700, fontSize: '13px' }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {t('service.samagri.footnote')}
                </div>
              </div>
            )}

            {/* Tab 5: FAQs */}
            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                  {t('service.faqs.title-before')}{locServiceName(service)}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(service.faqs || [
                    {
                      q: t('service.faqs.materials-q'),
                      a: t('service.faqs.materials-a')
                    },
                    {
                      q: t('service.faqs.languages-q'),
                      a: t('service.faqs.languages-a')
                    },
                    {
                      q: t('service.faqs.muhurat-q'),
                      a: t('service.faqs.muhurat-a')
                    }
                  ]).map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '18px 20px',
                        borderRadius: '12px',
                        background: 'var(--bg-primary)',
                        border: '1px solid #EAE5D9'
                      }}
                    >
                      <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
                        {faq.question || faq.q}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {faq.answer || faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. VERIFIED PUNE & PCMC DOORSTEP COVERAGE */}
        {/* ======================================================== */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '30px 36px',
            border: '1px solid #EAE5D9',
            marginTop: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <MapPin size={18} color="var(--accent-saffron)" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {t('service.coverage.title-before')}{locServiceName(service)}{t('service.coverage.title-after')}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.6 }}>
            {t('service.coverage.intro')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { name: 'Pune (All Pune Areas)', slug: 'pandit-in-pune' },
              { name: 'Kothrud', slug: 'pandit-in-kothrud' },
              { name: 'Baner', slug: 'pandit-in-baner' },
              { name: 'Hinjawadi', slug: 'pandit-in-hinjawadi' },
              { name: 'Kharadi', slug: 'pandit-in-kharadi' },
              { name: 'Wakad', slug: 'pandit-in-wakad' },
              { name: 'Pimple Saudagar', slug: 'pandit-in-pimple-saudagar' },
              { name: 'Hadapsar', slug: 'pandit-in-hadapsar' },
              { name: 'Aundh', slug: 'pandit-in-aundh' },
              { name: 'Viman Nagar', slug: 'pandit-in-viman-nagar' },
              { name: 'Pimpri-Chinchwad (PCMC)', slug: 'pandit-in-pcmc' },
              { name: 'Ravet', slug: 'pandit-in-ravet' }
            ].map((locItem, idx) => (
              <a
                key={idx}
                href={lp(`/locations/${locItem.slug}`)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('location-detail', { slug: locItem.slug });
                }}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-saffron)';
                  e.currentTarget.style.color = '#BD4B23';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#EAE5D9';
                  e.currentTarget.style.color = 'var(--text-main)';
                }}
              >
                {`📍 ${t('service.coverage.pandit-in')}`}{locItem.name}
              </a>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #F3EFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {t('service.coverage.guides-prompt')}
            </span>
            <a
              href={lp('/puja-guides')}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('puja-guides');
              }}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent-saffron)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {`📖 ${t('service.coverage.guides-link')} →`}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-detail-top-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
