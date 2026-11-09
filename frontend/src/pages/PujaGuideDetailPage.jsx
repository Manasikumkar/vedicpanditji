import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/useI18n';
import { getGuideBySlug } from '../data/guides/pujaGuidesData';
import { getRelatedGuidesForGuide, getRelatedServiceForGuide, getTopLocationsForService } from '../utils/internalLinks';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarCheck,
  Home,
  Share2,
  CheckCircle2,
  Flame
} from 'lucide-react';

export default function PujaGuideDetailPage({ slug: propSlug }) {
  const { routeParams, navigateTo, openBookingModal, showToast } = useApp();
  const {
    lang,
    t,
    lp,
    locGuideTitle,
    locGuideSummary,
    locGuideSections,
    locGuideFaqs,
    locServiceName,
    locServiceDesc,
    locLocationName
  } = useI18n();

  const activeSlug = propSlug || routeParams?.slug || 'griha-pravesh-puja-vidhi-guide';
  const guide = getGuideBySlug(activeSlug) || getGuideBySlug('griha-pravesh-puja-vidhi-guide');

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSlug]);

  if (!guide) {
    return (
      <div style={{ paddingTop: '120px', paddingBottom: '90px', textAlign: 'center' }}>
        <h2>{lang === 'mr' ? 'मार्गदर्शिका आढळली नाही' : lang === 'hi' ? 'मार्गदर्शिका नहीं मिली' : 'Guide Not Found'}</h2>
        <button onClick={() => navigateTo('puja-guides')} className="btn-primary" style={{ marginTop: '20px' }}>
          {lang === 'mr' ? 'सर्व पूजा मार्गदर्शिका पहा' : lang === 'hi' ? 'सभी पूजा मार्गदर्शिकाएँ देखें' : 'Browse All Puja Guides'}
        </button>
      </div>
    );
  }

  const sections = locGuideSections(guide);
  const faqs = locGuideFaqs(guide);
  const displayTitle = locGuideTitle(guide) || guide.h1 || guide.title;
  const displaySummary = locGuideSummary(guide) || guide.summary;

  const relatedGuides = getRelatedGuidesForGuide(guide.slug);
  const relatedService = getRelatedServiceForGuide(guide);
  const topLocations = getTopLocationsForService();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Guide link copied to clipboard!');
    }
  };

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* ======================================================== */}
        {/* 1. BREADCRUMBS */}
        {/* ======================================================== */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>{lang === 'mr' ? 'मुख्यपृष्ठ' : lang === 'hi' ? 'होम' : 'Home'}</span>
          </span>
          <span>/</span>
          <span onClick={() => navigateTo('puja-guides')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">
            {lang === 'mr' ? 'पूजा मार्गदर्शिका' : lang === 'hi' ? 'पूजा मार्गदर्शिकाएँ' : 'Puja Guides'}
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{displayTitle}</span>
        </nav>

        {/* ======================================================== */}
        {/* 2. ARTICLE HEADER */}
        {/* ======================================================== */}
        <header
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '36px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-saffron)', background: 'var(--accent-saffron-light)', padding: '4px 12px', borderRadius: '9999px' }}>
              {guide.categoryName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <Clock size={13} />
              <span>{guide.readingTime}</span>
            </div>
            <span style={{ color: 'var(--border-medium)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              <Calendar size={13} />
              <span>{lang === 'mr' ? 'अद्यतन: ऑक्टोबर २०२६' : lang === 'hi' ? 'अद्यतित: अक्टूबर २०२६' : 'Updated October 2026'}</span>
            </div>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.28, marginBottom: '16px' }}>
            {displayTitle}
          </h1>

          <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '22px' }}>
            {displaySummary}
          </p>

          {/* Author & Editorial Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #FAF7F0', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                <User size={14} />
              </div>
              <span>{lang === 'mr' ? 'वैदिकपंडितजी संपादकीय कक्ष' : lang === 'hi' ? 'वैदिकपंडितजी संपादकीय मंडल' : 'Published by VedicPanditji Editorial Desk'}</span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FAF7F0',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <Share2 size={13} />
              <span>{lang === 'mr' ? 'मार्गदर्शिका शेअर करा' : lang === 'hi' ? 'शेयर करें' : 'Share Guide'}</span>
            </button>
          </div>
        </header>

        {/* ======================================================== */}
        {/* 3. MAIN ARTICLE LAYOUT (CONTENT + SIDEBAR) */}
        {/* ======================================================== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(280px, 1fr)', gap: '32px', marginBottom: '60px' }} className="article-layout-grid">
          
          {/* Main Content Column */}
          <main style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid var(--border-subtle)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Table of Contents */}
            {sections && sections.length > 0 && (
              <div
                style={{
                  background: '#FDFBF7',
                  border: '1px solid #EAE5D9',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  marginBottom: '36px'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-saffron)', marginBottom: '10px' }}>
                  {lang === 'mr' ? 'अनुक्रमणिका' : lang === 'hi' ? 'विषय सूची' : 'Table of Contents'}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sections.map((sec, idx) => (
                    <li key={sec.id || idx}>
                      <a
                        href={`#${sec.id}`}
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        className="hover:text-amber-800"
                      >
                        <span style={{ color: 'var(--accent-gold)', fontSize: '12px' }}>{idx + 1}.</span>
                        <span>{sec.title}</span>
                      </a>
                    </li>
                  ))}
                  {faqs && faqs.length > 0 && (
                    <li>
                      <a
                        href="#faqs-section"
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        className="hover:text-amber-800"
                      >
                        <span style={{ color: 'var(--accent-gold)', fontSize: '12px' }}>•</span>
                        <span>{lang === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न' : lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Sections */}
            {(sections || []).map((sec, idx) => (
              <section key={sec.id || idx} id={sec.id} style={{ marginBottom: '36px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.35, paddingTop: '10px' }}>
                  {sec.title}
                </h2>
                <div style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {sec.content}
                </div>
              </section>
            ))}

            {/* In-Article Booking Box */}
            {relatedService && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #FBF7F0 0%, #F5EFE6 100%)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '28px',
                  marginTop: '40px',
                  marginBottom: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={18} color="var(--accent-saffron)" />
                  <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-saffron)' }}>
                    {lang === 'mr' ? 'अनुभवी वैदिक पुरोहितांसह विधी' : lang === 'hi' ? 'अनुभवी वैदिक आचार्यों द्वारा अनुष्ठान' : 'Book Ceremony with Experienced Pandits'}
                  </span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>
                  {lang === 'mr' ? `${locServiceName(relatedService)} विधीचे आयोजन करा` : lang === 'hi' ? `${locServiceName(relatedService)} हेतु वैदिक पुरोहित बुक करें` : `Arrange a Vedic ${relatedService.name} with VedicPanditji`}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {lang === 'mr' ? 'आमचे प्रमाणित उत्तर भारतीय व वैदिक पुरोहित संपूर्ण शुद्ध साहित्यासह तुमच्या घरी येतात आणि अस्सल संस्कृत मंत्रोच्चार व सुबोध कथेसह विधी संपन्न करतात.' : lang === 'hi' ? 'हमारे अनुभवी उत्तर भारतीय एवं वैदिक पुरोहित १००% शुद्ध सामग्री किट के साथ आपके घर पधारकर शुद्ध संस्कृत मंत्रोच्चार एवं सरल हिंदी कथा के साथ अनुष्ठान कराते हैं।' : 'Our experienced North Indian purohits arrive punctually with pure Vedic samagri to conduct your ceremony with authentic Sanskrit mantras and fluent Hindi narration.'}
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => openBookingModal(relatedService.name)}
                    className="btn-primary"
                    style={{
                      padding: '11px 24px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <CalendarCheck size={16} />
                    <span>{lang === 'mr' ? `${locServiceName(relatedService)} साठी चौकशी करा` : lang === 'hi' ? `${locServiceName(relatedService)} हेतु पूछताछ करें` : `Enquire for ${relatedService.name}`}</span>
                  </button>
                </div>
              </div>
            )}

            {/* FAQs Accordion */}
            {faqs && faqs.length > 0 && (
              <section id="faqs-section" style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #FAF7F0' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '18px' }}>
                  {lang === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न' : lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        style={{
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '12px',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            background: '#FAF8F5',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '14.5px',
                            fontWeight: 700,
                            color: 'var(--text-main)'
                          }}
                        >
                          <span>{faq.q || faq.question}</span>
                          {isOpen ? <ChevronUp size={16} color="var(--accent-saffron)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                        </button>

                        {isOpen && (
                          <div style={{ padding: '16px 20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, background: '#FFFFFF' }}>
                            {faq.a || faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

          </main>

          {/* Sticky Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Ceremony Booking Card */}
            {relatedService && (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-saffron)', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  {lang === 'mr' ? 'संबंधित वैदिक पूजा' : lang === 'hi' ? 'संबंधित वैदिक अनुष्ठान' : 'Associated Ceremony'}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {locServiceName(relatedService)}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {locServiceDesc(relatedService) || relatedService.shortDescription || 'Authentic Vedic ceremony with complete pure samagri.'}
                </p>
                <button
                  type="button"
                  onClick={() => openBookingModal(relatedService.name)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '11px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <CalendarCheck size={15} />
                  <span>{lang === 'mr' ? 'मुहूर्त तपासा व बुक करा' : lang === 'hi' ? 'मुहूर्त देखें एवं बुक करें' : 'Check Muhurat & Book'}</span>
                </button>
              </div>
            )}

            {/* Related Guides Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
                {lang === 'mr' ? 'इतर वैदिक पूजा मार्गदर्शिका' : lang === 'hi' ? 'अन्य वैदिक पूजा मार्गदर्शिकाएँ' : 'Related Puja Guides'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map((relGuide) => (
                  <div
                    key={relGuide.slug}
                    onClick={() => navigateTo('puja-guide-detail', { slug: relGuide.slug })}
                    style={{
                      cursor: 'pointer',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #FAF7F0'
                    }}
                  >
                    <span style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                      {relGuide.categoryName}
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px', lineHeight: 1.4 }} className="hover:text-amber-800">
                      {locGuideTitle(relGuide) || relGuide.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Localities Service Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                {lang === 'mr' ? 'पुणे व पिंपरी-चिंचवडमध्ये पंडित बुक करा' : lang === 'hi' ? 'पुणे एवं पिंपरी-चिंचवड में पंडित बुक करें' : 'Book Pandit in Pune & PCMC'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {lang === 'mr' ? 'प्रमुख परिसरांमध्ये घरपोच वैदिक पुरोहित सेवा:' : lang === 'hi' ? 'प्रमुख क्षेत्रों में घरपोच वैदिक पंडित सेवा उपलब्ध:' : 'Verified doorstep service across prominent localities:'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {topLocations.map((loc) => (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => navigateTo('location-detail', { slug: loc.slug })}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      background: '#FAF7F0',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {locLocationName(loc, lang)}
                  </button>
                ))}
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  );
}
