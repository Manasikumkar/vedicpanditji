import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/useI18n';
import { SEO_LANDING_PAGES, CITIES, SERVICES } from '../data/vedicPanditData';
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Globe,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function SeoLandingPage({ slug: propSlug }) {
  const { routeParams, navigateTo, openBookingModal } = useApp();
  const {
    lang,
    t,
    lp,
    locServiceName,
    locServiceDesc,
    locCityH1,
    locCityTagline,
    locCityOverview,
    locCityHighlights,
    locCityFaqs,
    locLocationName,
    locDuration
  } = useI18n();
  const activeSlug = propSlug || routeParams?.slug || 'north-indian-pandit-in-pune';

  // Find matching page specification
  const pageData = SEO_LANDING_PAGES.find(p =>
    p.slug === activeSlug ||
    p.slug.replace('-in-', '-') === activeSlug.replace('-in-', '-') ||
    (activeSlug.includes('wedding') && p.slug.includes('wedding') && p.city === (activeSlug.includes('bangalore') ? 'Bangalore' : activeSlug.includes('mumbai') ? 'Mumbai' : 'Pune'))
  ) || SEO_LANDING_PAGES[0];

  // Match specific ceremony if page is for a dedicated ritual (e.g. Griha Pravesh Puja in Mumbai)
  const ceremonyService = SERVICES.find(s => 
    pageData.service && (
      s.name.toLowerCase() === pageData.service.toLowerCase() ||
      s.name.toLowerCase().includes(pageData.service.toLowerCase()) ||
      pageData.service.toLowerCase().includes(s.name.toLowerCase())
    )
  ) || null;

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pageData]);

  // Verification Badge Configuration
  const getVerificationDetails = () => {
    const locCity = locLocationName(pageData.city);
    switch (pageData.verificationStatus) {
      case 'in-person-confirmed':
        return {
          badgeClass: 'badge-confirmed',
          icon: <ShieldCheck size={14} color="#15803D" />,
          title: lang === 'mr' ? `पडताळणी केलेले प्रत्यक्ष घरपोच पुरोहित: ${locCity}` : lang === 'hi' ? `सत्यापित प्रत्यक्ष वैदिक पुरोहित: ${locCity}` : `Verified In-Person Service in ${pageData.city}`,
          note: lang === 'mr' ? `वैदिकपंडितजी ${locCity} मध्ये संपूर्ण शुद्ध सामग्री किटसह पडताळणी केलेले घरपोच वैदिक पुरोहित उपलब्ध करतात.` : lang === 'hi' ? `वैदिकपंडितजी ${locCity} में संपूर्ण शुद्ध सामग्री किट के साथ सत्यापित वैदिक पुरोहित उपलब्ध कराते हैं।` : `VedicPanditji provides verified doorstep Vedic purohits in ${pageData.city} with complete pure Samagri kits.`,
          isFullyInPerson: true
        };
      case 'hybrid-online-travelling':
        return {
          badgeClass: 'badge-hybrid',
          icon: <Globe size={14} color="#B45309" />,
          title: lang === 'mr' ? `थेट ई-पूजा आणि प्रवास करणारे वरिष्ठ आचार्य: ${locCity}` : lang === 'hi' ? `सत्यापित लाइव ई-पूजा एवं आगंतुक आचार्य: ${locCity}` : `Verified Live E-Puja & Visiting Acharyas for ${pageData.city}`,
          note: lang === 'mr' ? `कौटुंबिक पूजा परस्पर थेट दोन-मार्गी HD व्हिडिओद्वारे वैयक्तिक गोत्र संकल्पासह संपन्न केल्या जातात. पूर्वनियोजित विवाहासाठी वरिष्ठ आचार्य प्रवास करतात.` : lang === 'hi' ? `पारिवारिक पूजाएं द्विपक्षीय लाइव HD वीडियो द्वारा व्यक्तिगत गोत्र संकल्प के साथ संपन्न कराई जाती हैं। पूर्व-नियोजित विवाह आयोजनों हेतु वरिष्ठ आचार्य यात्रा करते हैं।` : `Household pujas are performed via interactive two-way live HD video with personal Gotra Sankalp. Senior Acharyas travel for major scheduled weddings and ceremonies.`,
          isFullyInPerson: false
        };
      case 'pilgrimage-confirmed':
        return {
          badgeClass: 'badge-pilgrimage',
          icon: <Flame size={14} color="#7C2D12" />,
          title: lang === 'mr' ? `पडताळणी केलेले स्थानिक तीर्थ पुरोहित: ${locCity}` : lang === 'hi' ? `सत्यापित स्थानीय तीर्थ पुरोहित: ${locCity}` : `Verified Tirtha Purohits in ${pageData.city}`,
          note: lang === 'mr' ? `पवित्र तीर्थक्षेत्रात अधिकृत स्थानिक वंशपरंपरेने चालत आलेल्या पुरोहितांद्वारे विधी संपन्न केले जातात.` : lang === 'hi' ? `पवित्र तीर्थ क्षेत्र में अधिकृत स्थानीय वंशानुगत पुरोहितों द्वारा अनुष्ठान संपन्न कराए जाते हैं।` : `Rituals are conducted directly at sacred Tirtha Kshetra with authorized local hereditary Purohits.`,
          isFullyInPerson: true
        };
      default:
        return {
          badgeClass: 'badge-online',
          icon: <Globe size={14} color="#1D4ED8" />,
          title: lang === 'mr' ? '१००% पडताळणी केलेली थेट परस्परसंवादी ई-पूजा' : lang === 'hi' ? '100% सत्यापित लाइव इंटरैक्टिव ई-पूजा' : '100% Verified Live Interactive E-Puja',
          note: lang === 'mr' ? 'वैयक्तिक गोत्र संकल्प, थेट मंत्रोच्चार आणि अभिमंत्रित प्रसाद कुरिअर सुविधेसह थेट दोन-मार्गी HD Zoom सत्र.' : lang === 'hi' ? 'व्यक्तिगत गोत्र संकल्प, लाइव मंत्रोच्चार और अभिमंत्रित प्रसाद कूरियर सुविधा सहित लाइव द्विपक्षीय HD Zoom सत्र।' : `Live two-way HD Zoom sessions with personalized Gotra Sankalp, live chanting, and consecrated Prasad courier.`,
          isFullyInPerson: false
        };
    }
  };

  const verification = getVerificationDetails();

  // Summary explanation extracted from section 0 or tagline
  const summaryExplanation = locCityOverview(pageData) || (pageData.sections && pageData.sections[0]
    ? pageData.sections[0].content.split('\n\n')[0]
    : pageData.tagline);

  // Curate 6 top ceremonies relevant for this city
  const topServices = SERVICES.slice(0, 6);

  // Highlights and FAQs
  const cityHighlights = locCityHighlights(pageData) || pageData.highlights || [];
  const essentialFaqs = locCityFaqs(pageData) || (pageData.faqs ? pageData.faqs.slice(0, 4) : []);

  // Contextual links to other individual puja services within the same city
  const relatedCityPages = SEO_LANDING_PAGES.filter(
    p => p.city === pageData.city && p.slug !== pageData.slug
  );

  return (
    <div className="seo-page-root">
      {/* 1. BREADCRUMBS */}
      <div className="seo-breadcrumb-bar">
        <div className="container">
          <nav aria-label="Breadcrumb" className="seo-breadcrumb-nav">
            <span onClick={() => navigateTo('home')} className="crumb-link">{lang === 'mr' ? 'मुख्यपृष्ठ' : lang === 'hi' ? 'होम' : 'Home'}</span>
            <span className="crumb-sep">/</span>
            <span onClick={() => navigateTo('catalogue')} className="crumb-link">{lang === 'mr' ? 'विधी सूची' : lang === 'hi' ? 'अनुष्ठान सूची' : 'Services'}</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{locLocationName(pageData.city)} • {locServiceName(ceremonyService) || pageData.primaryService || pageData.service}</span>
          </nav>
        </div>
      </div>

      {/* 2. FOCUSED HERO BANNER */}
      <header className="seo-hero-banner">
        <div className="container">
          <div className="seo-hero-content">
            
            {/* Status & Location Badges */}
            <div className="seo-hero-badge-row">
              <span className={`seo-status-pill ${verification.badgeClass}`}>
                {verification.icon}
                <span>{verification.title}</span>
              </span>
              <span className="seo-location-pill">
                <MapPin size={13} color="var(--accent-gold)" />
                <span>{locLocationName(pageData.city)}, {locLocationName(pageData.state)}</span>
              </span>
            </div>

            {/* Target Keyword H1 */}
            <h1 className="seo-hero-title">
              {locCityH1(pageData) || pageData.h1}
            </h1>

            {/* Essential Related Summary Explanation */}
            <p className="seo-hero-tagline">
              {locCityTagline(pageData) || pageData.tagline || `Authentic Vedic rituals performed by experienced North Indian & Bihari Pandits with complete scriptural fidelity.`}
            </p>

            {/* Primary Action Buttons */}
            <div className="seo-hero-ctas">
              <button
                type="button"
                onClick={() => openBookingModal(ceremonyService, null, pageData.city)}
                className="btn-primary seo-cta-primary"
              >
                <CalendarCheck size={18} />
                <span>{lang === 'mr' ? `${locLocationName(pageData.city)} साठी पंडित बुक करा` : lang === 'hi' ? `${locLocationName(pageData.city)} हेतु पंडित बुक करें` : `Book a Pandit for ${pageData.city}`}</span>
              </button>

              <a
                href="#pricing-packages"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('pricing-packages');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary seo-cta-call"
                style={{ textDecoration: 'none' }}
              >
                <Sparkles size={16} color="#BD4B23" />
                <span>{lang === 'mr' ? 'पूजा पॅकेजेस पहा' : lang === 'hi' ? 'पूजा पैकेज देखें' : 'View Puja Packages'}</span>
              </a>
            </div>

            {/* Concise Trust Badges */}
            <div className="seo-trust-row">
              <div className="trust-col">
                <span className="trust-number">{lang === 'mr' ? 'हिंदी व संस्कृत' : lang === 'hi' ? 'हिंदी एवं संस्कृत' : 'Hindi & Sanskrit'}</span>
                <span className="trust-label">{lang === 'mr' ? 'विधीच्या भाषा' : lang === 'hi' ? 'अनुष्ठान की भाषाएँ' : 'Ritual Languages'}</span>
              </div>
              <div className="trust-col">
                <span className="trust-number">{lang === 'mr' ? 'पंचांग' : lang === 'hi' ? 'पंचांग' : 'Panchang'}</span>
                <span className="trust-label">{lang === 'mr' ? 'शुभ मुहूर्त' : lang === 'hi' ? 'शुभ मुहूर्त' : 'Shubh Muhurat'}</span>
              </div>
              <div className="trust-col">
                <span className="trust-number">{lang === 'mr' ? 'हिंदी व संस्कृत' : lang === 'hi' ? 'हिंदी एवं संस्कृत' : 'Hindi & Sanskrit'}</span>
                <span className="trust-label">{lang === 'mr' ? 'अस्सल विधी' : lang === 'hi' ? 'प्रामाणिक विधि' : 'Authentic Vidhi'}</span>
              </div>
              <div className="trust-col">
                <span className="trust-number">{lang === 'mr' ? '१००% शुद्ध' : lang === 'hi' ? '100% शुद्ध' : '100% Pure'}</span>
                <span className="trust-label">{lang === 'mr' ? 'हवन साहित्य किट' : lang === 'hi' ? 'हवन सामग्री किट' : 'Hawan Samagri Kits'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MULTI-CITY EXPLORATION TABS */}
      <section className="seo-city-switcher-section">
        <div className="container">
          <div className="city-switcher-container">
            <span className="city-switcher-label">
              <MapPin size={14} color="var(--accent-saffron)" />
              <span>{lang === 'mr' ? 'सेवा शहर निवडा:' : lang === 'hi' ? 'सेवा शहर चुनें:' : 'Select Service City:'}</span>
            </span>
            <div className="city-tabs-scroll">
              {CITIES.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => {
                    const firstCityPage = SEO_LANDING_PAGES.find(p => p.city === c.id);
                    if (firstCityPage) {
                      navigateTo('seo-landing', { slug: firstCityPage.slug });
                    }
                  }}
                  className={`city-tab-btn ${pageData.city === c.id ? 'active' : ''}`}
                >
                  <span>{locLocationName(c.name)}</span>
                  {c.verificationStatus === 'in-person-confirmed' ? (
                    <span className="tab-dot dot-green" title="In-Person Confirmed" />
                  ) : (
                    <span className="tab-dot dot-amber" title="Live E-Puja & Visiting" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN ESSENTIAL CONTENT (CLEAN & PROPERLY ARRANGED) */}
      <main className="seo-main-body">
        <div className="container" style={{ maxWidth: '1040px' }}>
          
          {/* Card 1: Related Summary & Service Overview */}
          <section className="seo-summary-card">
            <div className="summary-header">
              <div className="summary-icon-pill">
                <Sparkles size={18} color="var(--accent-saffron)" />
              </div>
              <div>
                <h2 className="summary-title">
                  {lang === 'mr'
                    ? `${locLocationName(pageData.city)} मध्ये वैदिक पंडित सेवा — विहंगावलोकन आणि सारांश`
                    : lang === 'hi'
                      ? `${locLocationName(pageData.city)} में वैदिक पंडित सेवाएँ — विवरण एवं सारांश`
                      : `Vedic Pandit Services in ${pageData.city} — Overview & Summary`}
                </h2>
                <p className="summary-subtitle">
                  {lang === 'mr'
                    ? 'उत्तर भारतीय व बिहारी कुटुंबांसाठी हिंदी व संस्कृतमध्ये अस्सल शास्त्रोक्त विधी'
                    : lang === 'hi'
                      ? 'उत्तर भारतीय एवं बिहारी परिवारों हेतु हिंदी व संस्कृत में प्रामाणिक शास्त्रसम्मत अनुष्ठान'
                      : 'Authentic ritual conduction in Hindi and Sanskrit for North Indian & Bihari families'}
                </p>
              </div>
            </div>

            <p className="summary-text">
              {summaryExplanation}
            </p>

            {/* Essential Highlights */}
            {cityHighlights && cityHighlights.length > 0 && (
              <div className="essential-highlights-grid">
                {cityHighlights.slice(0, 4).map((hl, idx) => (
                  <div key={idx} className="highlight-pill-item">
                    <CheckCircle2 size={16} color="#15803D" style={{ flexShrink: 0 }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Service Fulfillment Transparency Note */}
            <div className="verification-notice-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {verification.icon}
                <strong style={{ color: 'var(--text-main)', fontSize: '13px' }}>
                  {verification.title}
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {verification.note}
              </p>
            </div>
          </section>

          {/* Card 2: Popular Ceremonies Available in This City */}
          <section id="pricing-packages" className="popular-ceremonies-section">
            <div className="section-header" style={{ marginBottom: '32px' }}>
              <span className="section-tag">
                {lang === 'mr'
                  ? `${locLocationName(pageData.city)} मध्ये सर्वाधिक मागणी असलेले विधी`
                  : lang === 'hi'
                    ? `${locLocationName(pageData.city)} में सर्वाधिक अनुष्ठित पूजाएँ`
                    : `Most Requested in ${pageData.city}`}
              </span>
              <h2 className="section-title" style={{ fontSize: '28px' }}>
                {lang === 'mr' ? 'लोकप्रिय वैदिक पूजा आणि हवन' : lang === 'hi' ? 'लोकप्रिय वैदिक पूजा एवं हवन' : 'Popular Vedic Pujas & Havans'}
              </h2>
              <p className="section-desc">
                {lang === 'mr'
                  ? `पॅकेज पाहण्यासाठी आणि ${locLocationName(pageData.city)} मध्ये पडताळणी केलेले पंडित बुक करण्यासाठी खालीलपैकी कोणताही विधी निवडा.`
                  : lang === 'hi'
                    ? `पैकेज देखने और ${locLocationName(pageData.city)} में सत्यापित पंडित बुक करने हेतु नीचे दिए गए किसी भी अनुष्ठान का चयन करें।`
                    : `Select any ceremony below to check packages and book a verified pandit in ${pageData.city}.`}
              </p>
            </div>

            <div className="grid-3" style={{ gap: '22px' }}>
              {topServices.map((svc) => (
                <div key={svc.id} className="card-premium puja-quick-card">
                  <div
                    className="puja-quick-img"
                    style={{
                      height: '140px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#FAF8F5'
                    }}
                  >
                    <img
                      src={svc.image || '/images/hero-puja.jpg'}
                      alt={svc.name}
                      loading="lazy"
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
                  </div>

                  <div className="puja-quick-body">
                    <h3 className="puja-quick-name">{locServiceName(svc)}</h3>
                    <p className="puja-quick-desc">{locServiceDesc(svc)}</p>

                    <div className="puja-quick-footer">
                      <span className="puja-quick-dur">{locDuration(svc.duration)}</span>
                      <button
                        type="button"
                        onClick={() => openBookingModal(svc, null, pageData.city)}
                        className="btn-primary puja-quick-btn"
                      >
                        <span>
                          {lang === 'mr'
                            ? `${locLocationName(pageData.city)} मध्ये बुक करा`
                            : lang === 'hi'
                              ? `${locLocationName(pageData.city)} में बुक करें`
                              : `Book in ${pageData.city}`}
                        </span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Card 2b: Dedicated / Specific Puja Pages in Target City */}
          {relatedCityPages.length > 0 && (
            <section className="seo-city-pujas-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Sparkles size={18} color="var(--accent-saffron)" />
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {lang === 'mr'
                    ? `${locLocationName(pageData.city)} मधील विशिष्ट पूजा विधी`
                    : lang === 'hi'
                      ? `${locLocationName(pageData.city)} में विशिष्ट पूजा अनुष्ठान`
                      : `Specific Puja Ceremonies & Vidhis in ${pageData.city}`}
                </h2>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.6 }}>
                {lang === 'mr'
                  ? `${locLocationName(pageData.city)} मधील विधींसाठी पूजा मार्गदर्शन, साहित्य व्यवस्था आणि पडताळणी केलेल्या उत्तर भारतीय पुरोहितांचे बुकिंग:`
                  : lang === 'hi'
                    ? `${locLocationName(pageData.city)} में अनुष्ठानों हेतु पूजा मार्गदर्शन, सामग्री व्यवस्था एवं सत्यापित उत्तर भारतीय पुरोहित बुकिंग:`
                    : `Explore dedicated ceremony guidelines, samagri arrangements, and verified North Indian purohit booking for specific rituals in ${pageData.city}:`}
              </p>
              <div className="city-pujas-grid">
                {relatedCityPages.map((cp) => (
                  <a
                    key={cp.slug}
                    href={lp(`/services/${cp.slug}`)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('seo-landing', { slug: cp.slug });
                    }}
                    className="city-puja-link-card"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                      <span className="city-puja-name">
                        {locServiceName(cp.primaryService || cp.service)} {lang === 'mr' ? `— ${locLocationName(pageData.city)}` : lang === 'hi' ? `— ${locLocationName(pageData.city)}` : `in ${pageData.city}`}
                      </span>
                      <ArrowRight size={14} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    </div>
                    <p className="city-puja-desc">
                      {locCityTagline(cp) || cp.tagline || (cp.sections && cp.sections[0] ? cp.sections[0].heading : cp.metaDescription)}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Card 3: Key Localities in Target City */}
          {pageData.keyLocalities && pageData.keyLocalities.length > 0 && (
            <section className="seo-localities-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <MapPin size={17} color="var(--accent-saffron)" />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {lang === 'mr'
                    ? `${locLocationName(pageData.city)} मधील प्रमुख निवासी भाग`
                    : lang === 'hi'
                      ? `${locLocationName(pageData.city)} के प्रमुख आवासीय क्षेत्र`
                      : `Key Residential Areas Served Across ${pageData.city}`}
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {lang === 'mr'
                  ? 'आमचे पुरोहित खालील भागांमधील गृहसंकुले व स्वतंत्र घरांमध्ये वेळेवर घरपोच सेवा देतात:'
                  : lang === 'hi'
                    ? 'हमारे पुरोहित निम्नलिखित क्षेत्रों के अपार्टमेंट और स्वतंत्र घरों में समय पर पहुँचकर सेवा प्रदान करते हैं:'
                    : 'Our Purohits provide punctual doorstep transit to apartments, gated societies, and independent homes across:'}
              </p>
              <div className="localities-tag-row">
                {pageData.keyLocalities.map((loc, idx) => (
                  <span key={idx} className="locality-pill">
                    📍 {locLocationName(loc)}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Card 4: Essential FAQs (Only 3-4 Concise Questions) */}
          {essentialFaqs.length > 0 && (
            <section className="seo-faq-card">
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
                {lang === 'mr'
                  ? `वारंवार विचारले जाणारे प्रश्न (${locLocationName(pageData.city)})`
                  : lang === 'hi'
                    ? `अक्सर पूछे जाने वाले प्रश्न (${locLocationName(pageData.city)})`
                    : `Frequently Asked Questions (${pageData.city})`}
              </h3>
              <div className="faq-accordion-clean">
                {essentialFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className={`faq-row-clean ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="faq-btn-clean"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-icon-indicator">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className="faq-ans-clean">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}



        </div>
      </main>

      {/* SCOPED COMPACT STYLING */}
      <style>{`
        .seo-page-root {
          background-color: var(--bg-primary);
          min-height: 100vh;
          padding-bottom: 80px;
          color: var(--text-main);
        }

        .seo-breadcrumb-bar {
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          padding: 12px 0;
          margin-top: var(--header-height, 84px);
        }

        .seo-breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .crumb-link {
          cursor: pointer;
          transition: color 0.2s;
        }

        .crumb-link:hover {
          color: var(--accent-saffron);
        }

        .crumb-sep {
          color: #CCC;
        }

        .crumb-current {
          color: var(--text-main);
          font-weight: 600;
        }

        /* Hero Banner */
        .seo-hero-banner {
          background: linear-gradient(135deg, #1C1E1B 0%, #2A241F 50%, #191B18 100%);
          color: #FFFFFF;
          padding: 50px 0 44px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
        }

        .seo-hero-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(197, 154, 63, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .seo-hero-content {
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .seo-hero-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .seo-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
        }

        .badge-confirmed {
          background: rgba(34, 197, 94, 0.15);
          color: #86EFAC;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .badge-hybrid {
          background: rgba(245, 158, 11, 0.15);
          color: #FCD34D;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .badge-pilgrimage {
          background: rgba(189, 75, 35, 0.2);
          color: #FCA5A5;
          border: 1px solid rgba(189, 75, 35, 0.4);
        }

        .badge-online {
          background: rgba(59, 130, 246, 0.15);
          color: #93C5FD;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .seo-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          color: #F3F4F6;
        }

        .seo-hero-title {
          font-family: var(--font-display);
          font-size: 38px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.22;
          margin-bottom: 14px;
          letter-spacing: -0.015em;
        }

        .seo-hero-tagline {
          font-size: 16px;
          color: #D1D5DB;
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .seo-hero-ctas {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .seo-cta-primary {
          padding: 13px 26px;
          font-size: 15px;
          gap: 8px;
          box-shadow: 0 6px 20px rgba(189, 75, 35, 0.35);
        }

        .seo-cta-call {
          padding: 13px 24px;
          font-size: 14px;
          font-weight: 700;
          background: #FFFFFF !important;
          color: #BD4B23 !important;
          border: 1px solid rgba(255, 255, 255, 0.95) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .seo-cta-call:hover {
          background: #FFF7ED !important;
          color: #9A3412 !important;
          border-color: #FED7AA !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .seo-trust-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .trust-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .trust-number {
          font-size: 15px;
          font-weight: 800;
          color: var(--accent-gold);
        }

        .trust-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
        }

        /* City Switcher Section */
        .seo-city-switcher-section {
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-subtle);
          padding: 12px 0;
        }

        .city-switcher-container {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .city-switcher-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-main);
          white-space: nowrap;
        }

        .city-tabs-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .city-tabs-scroll::-webkit-scrollbar {
          display: none;
        }

        .city-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .city-tab-btn:hover {
          border-color: var(--accent-saffron);
          color: var(--accent-saffron);
        }

        .city-tab-btn.active {
          background: var(--accent-saffron);
          color: #FFFFFF;
          border-color: var(--accent-saffron);
        }

        .tab-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .dot-green { background: #22C55E; }
        .dot-amber { background: #F59E0B; }

        /* Main Body Layout */
        .seo-main-body {
          padding: 40px 0 60px;
        }

        /* Summary Card */
        .seo-summary-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 32px 36px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 40px;
        }

        .summary-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
        }

        .summary-icon-pill {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--accent-saffron-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .summary-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .summary-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0;
        }

        .summary-text {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .essential-highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .highlight-pill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }

        .verification-notice-box {
          background: #FFFDF8;
          border: 1px solid rgba(197, 154, 63, 0.35);
          border-radius: 12px;
          padding: 14px 18px;
        }

        /* Popular Ceremonies */
        .popular-ceremonies-section {
          margin-bottom: 44px;
        }

        .puja-quick-card {
          border-radius: 16px;
          overflow: hidden;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .puja-quick-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .puja-rating-chip {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.95);
          padding: 3px 8px;
          border-radius: 14px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-main);
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .puja-quick-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .puja-quick-name {
          font-size: 17px;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 6px;
        }

        .puja-quick-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .puja-quick-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .puja-quick-dur {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .puja-quick-btn {
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 700;
          gap: 5px;
          border-radius: var(--radius-sm);
        }

        /* Localities Card */
        .seo-city-pujas-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 24px 28px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 40px;
        }

        .city-pujas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .city-puja-link-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .city-puja-link-card:hover {
          border-color: var(--accent-gold);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        }

        .city-puja-name {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--accent-saffron);
        }

        .city-puja-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .seo-localities-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 24px 28px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 40px;
        }

        .localities-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .locality-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* FAQ Card Clean */
        .seo-faq-card {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 28px 32px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 40px;
        }

        .faq-accordion-clean {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq-row-clean {
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .faq-row-clean.open {
          border-color: var(--accent-saffron);
          background: #FFFFFF;
        }

        .faq-btn-clean {
          width: 100%;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-main);
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }

        .faq-icon-indicator {
          font-size: 18px;
          font-weight: 800;
          color: var(--accent-saffron);
          margin-left: 10px;
        }

        .faq-ans-clean {
          padding: 0 18px 16px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }



        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .seo-hero-title {
            font-size: 28px;
          }
          .seo-trust-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .essential-highlights-grid {
            grid-template-columns: 1fr;
          }
          .seo-summary-card,
          .seo-faq-card {
            padding: 22px 20px;
          }
        }
      `}</style>
    </div>
  );
}
