import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, BRAND_INFO } from '../data/vedicPanditData';
import { ALL_LOCATIONS, getLocalitiesByParent, getParentLocations } from '../data/locations';
import { PUJA_GUIDES_DATA } from '../data/guides/pujaGuidesData';
import { MULTI_CITY_SEO_PAGES } from '../data/multiCitySeoData';
import { useI18n } from '../i18n/useI18n';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  FileText,
  ChevronRight,
  Globe,
  Flame,
  Home
} from 'lucide-react';

export default function SitemapPage() {
  const { navigateTo } = useApp();
  const { lang, t, lp, locServiceName, locLocationName, locLocationContent, locGuideTitle, locCityTitle } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const parentHubs = getParentLocations();
  const puneLocalities = getLocalitiesByParent('Pune');
  const pcmcLocalities = getLocalitiesByParent('Pimpri-Chinchwad (PCMC)');

  const sitemapLabels = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbSitemap: 'वेबसाईट निर्देशिका आणि साइटमॅप',
      badge: 'संपूर्ण रचना • सर्व पृष्ठांची सूची',
      h1: 'वैदिकपंडितजी वेबसाईट निर्देशिका आणि साइटमॅप',
      tagline: 'अस्सल वैदिक विधी, पुणे व पिंपरी-चिंचवड स्थानिक परिसर पृष्ठे आणि सर्वसमावेशक पूजा मार्गदर्शकांची संपूर्ण सूची.',
      sec1Title: `१. पुणे व पिंपरी-चिंचवड स्थानिक पृष्ठे (${ALL_LOCATIONS.length} परिसर)`,
      sec1Desc: 'स्थानिक परिसर माहिती आणि घरपोच पुरोहित बुकिंगसह समर्पित पृष्ठे',
      parentHubs: 'प्रमुख विभागीय केंद्र',
      puneCity: 'पुणे शहर परिसर',
      pcmcCity: 'पिंपरी-चिंचवड (PCMC) परिसर',
      panditIn: (loc) => `${locLocationName(loc, 'mr')} मध्ये पंडित`,
      sec2Title: `२. माहितीपूर्ण पूजा मार्गदर्शिका संग्रह (${PUJA_GUIDES_DATA.length} मार्गदर्शिका)`,
      sec2Desc: 'अस्सल वैदिक विधी पद्धती, पूजा साहित्य यादी आणि शुभ मुहूर्त स्पष्ट करणारे शैक्षणिक लेख',
      sec3Title: `३. वैदिक पूजा व विधी सेवा (${SERVICES.length} विधी)`,
      sec3Desc: 'अनुभवी आचार्यांद्वारे संपन्न होणाऱ्या अस्सल पूजा, हवन, जप, पाठ आणि संस्कार',
      sec4Title: `४. देशभरातील प्रमुख शहरांची पृष्ठे (${MULTI_CITY_SEO_PAGES.length} पृष्ठे)`,
      sec4Desc: 'पुणे, मुंबई, बंगळुरू, दिल्ली-एनसीआर, चेन्नई, हैदराबाद, अहमदाबाद, कोलकाता आणि नाशिकसाठी शहर पृष्ठे',
      sec5Title: '५. मुख्य संस्थात्मक व कायदेशीर पृष्ठे',
      sec5Desc: 'थेट सल्लामसलत, वारसा माहिती आणि नियम व अटी',
      corePages: {
        home: 'मुख्यपृष्ठ',
        services: 'विधी सूची',
        about: 'आमच्याविषयी',
        howItWorks: 'कार्यपद्धती',
        faqs: 'वारंवार विचारले जाणारे प्रश्न',
        contact: 'संपर्क व शुभ मुहूर्त',
        materials: 'पूजा साहित्य',
        temple: 'तीर्थक्षेत्र पूजा सेवा',
        legal: 'कायदेशीर नियम'
      }
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbSitemap: 'वेबसाइट निर्देशिका एवं साइटमैप',
      badge: 'संपूर्ण संरचना • सभी पृष्ठों की सूची',
      h1: 'वैदिकपंडितजी वेबसाइट निर्देशिका एवं साइटमैप',
      tagline: 'प्रामाणिक वैदिक अनुष्ठानों, पुणे एवं पिंपरी-चिंचवड स्थानीय क्षेत्र पृष्ठों और संपूर्ण पूजा मार्गदर्शिकाओं की विस्तृत निर्देशिका।',
      sec1Title: `1. पुणे एवं पिंपरी-चिंचवड स्थानीय पृष्ठ (${ALL_LOCATIONS.length} क्षेत्र)`,
      sec1Desc: 'सत्यापित स्थानीय क्षेत्र जानकारी एवं घर पर पुरोहित बुकिंग हेतु समर्पित पृष्ठ',
      parentHubs: 'प्रमुख क्षेत्रीय केंद्र',
      puneCity: 'पुणे शहर क्षेत्र',
      pcmcCity: 'पिंपरी-चिंचवड (PCMC) क्षेत्र',
      panditIn: (loc) => `${locLocationName(loc, 'hi')} में पंडित`,
      sec2Title: `2. विस्तृत पूजा मार्गदर्शिका संग्रह (${PUJA_GUIDES_DATA.length} मार्गदर्शिकाएँ)`,
      sec2Desc: 'प्रामाणिक वैदिक विधि विधान, आवश्यक सामग्री सूची एवं शुभ मुहूर्त की विस्तृत जानकारी',
      sec3Title: `3. वैदिक पूजा एवं अनुष्ठान सेवाएँ (${SERVICES.length} पूजाएँ)`,
      sec3Desc: 'अनुभवी आचार्यों द्वारा संपन्न होने वाली प्रामाणिक पूजा, हवन, जप, पाठ एवं समस्त संस्कार',
      sec4Title: `4. भारत भर के प्रमुख नगरों हेतु पृष्ठ (${MULTI_CITY_SEO_PAGES.length} पृष्ठ)`,
      sec4Desc: 'पुणे, मुंबई, बैंगलोर, दिल्ली-एनसीआर, चेन्नई, हैदराबाद, अहमदाबाद, कोलकाता एवं नासिक हेतु विशेष पृष्ठ',
      sec5Title: '5. मुख्य संस्थागत एवं कानूनी पृष्ठ',
      sec5Desc: 'परामर्श, संस्थागत परिचय एवं सेवा शर्तें',
      corePages: {
        home: 'होम',
        services: 'अनुष्ठान सूची',
        about: 'हमारे बारे में',
        howItWorks: 'कार्यप्रणाली',
        faqs: 'सामान्य प्रश्न (FAQ)',
        contact: 'संपर्क एवं शुभ मुहूर्त',
        materials: 'पूजा सामग्री',
        temple: 'तीर्थ पूजा सेवाएँ',
        legal: 'कानूनी नीतियाँ'
      }
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbSitemap: 'HTML Directory Sitemap',
      badge: 'Complete Architecture • Crawlable Directory',
      h1: 'VedicPanditji Website Directory & Sitemap',
      tagline: 'Complete directory of authentic Vedic ceremonies, Pune & PCMC locality landing pages, and comprehensive educational puja guides.',
      sec1Title: `1. Pune & PCMC Local SEO Pages (${ALL_LOCATIONS.length} Localities)`,
      sec1Desc: 'Targeted local landing pages with verified neighborhood insights and doorstep purohit booking',
      parentHubs: 'Parent Regional Hubs',
      puneCity: 'Pune City Localities',
      pcmcCity: 'Pimpri-Chinchwad (PCMC) Localities',
      panditIn: (loc) => `Pandit in ${loc.name}`,
      sec2Title: `2. Informative Hindu Puja Guides Hub (${PUJA_GUIDES_DATA.length} Guides)`,
      sec2Desc: 'Educational articles explaining authentic Vedic vidhi procedures, samagri lists, and Muhurat calculations',
      sec3Title: `3. Vedic Puja & Ceremony Services (${SERVICES.length} Ceremonies)`,
      sec3Desc: 'Authentic pujas, havans, jaaps, paths, and sanskars performed by experienced purohits',
      sec4Title: `4. Multi-City Landing Pages Across India (${MULTI_CITY_SEO_PAGES.length} Pages)`,
      sec4Desc: 'City-specific landing pages for North Indian & Bihari Pandits across Pune, Mumbai, Bangalore, Delhi-NCR, Chennai, Hyderabad, Ahmedabad, Kolkata & Nashik',
      sec5Title: '5. Essential Pages & Support',
      sec5Desc: 'Direct consultation, company heritage, and terms',
      corePages: {
        home: 'Home',
        services: 'Ceremonies Catalogue',
        about: 'About Us',
        howItWorks: 'How It Works',
        faqs: 'FAQs',
        contact: 'Contact & Shubh Muhurat',
        materials: 'Puja Materials',
        temple: 'Temple Services',
        legal: 'Legal Policies'
      }
    }
  };

  const L = sitemapLabels[lang] || sitemapLabels.en;

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>{L.breadcrumbHome}</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbSitemap}</span>
        </nav>

        {/* Page Header */}
        <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--accent-saffron)',
              marginBottom: '14px'
            }}
          >
            <Globe size={13} />
            <span>{L.badge}</span>
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}
          >
            {L.h1}
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {L.tagline}
          </p>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: PUNE & PCMC LOCALITY DIRECTORY */}
        {/* ======================================================== */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #FAF7F0', paddingBottom: '14px' }}>
            <MapPin size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                {L.sec1Title}
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {L.sec1Desc}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}
          >
            {/* Regional Hubs */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#BD4B23', marginBottom: '12px' }}>
                {L.parentHubs}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {parentHubs.map(hub => {
                  const hubLocalized = locLocationContent(hub.slug);
                  const hubTitle = hubLocalized?.h1 || hub.h1;
                  return (
                    <li key={hub.slug}>
                      <a
                        href={lp('/locations/' + hub.slug)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('location-detail', { slug: hub.slug });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-main)',
                          fontSize: '13px',
                          cursor: 'pointer',
                          padding: 0,
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          textDecoration: 'none'
                        }}
                        className="hover:text-amber-800"
                      >
                        <ChevronRight size={13} color="var(--accent-gold)" />
                        <span>{hubTitle}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Pune Localities */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#BD4B23', marginBottom: '12px' }}>
                {L.puneCity}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {puneLocalities.map(loc => (
                  <li key={loc.slug}>
                    <a
                      href={lp('/locations/' + loc.slug)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('location-detail', { slug: loc.slug });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-main)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      className="hover:text-amber-800"
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{L.panditIn(loc)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* PCMC Localities */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#BD4B23', marginBottom: '12px' }}>
                {L.pcmcCity}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {pcmcLocalities.map(loc => (
                  <li key={loc.slug}>
                    <a
                      href={lp('/locations/' + loc.slug)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('location-detail', { slug: loc.slug });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-main)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'none'
                      }}
                      className="hover:text-amber-800"
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{L.panditIn(loc)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: EDUCATIONAL PUJA GUIDES */}
        {/* ======================================================== */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #FAF7F0', paddingBottom: '14px' }}>
            <BookOpen size={22} color="var(--accent-gold)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                {L.sec2Title}
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {L.sec2Desc}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '12px'
            }}
          >
            {PUJA_GUIDES_DATA.map(guide => (
              <a
                key={guide.slug}
                href={lp('/puja-guides/' + guide.slug)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('puja-guide-detail', { slug: guide.slug });
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#FAF8F5',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                className="hover:border-amber-600"
              >
                <ChevronRight size={14} color="var(--accent-gold)" />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35 }}>
                    {locGuideTitle(guide) || guide.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {guide.categoryName} &bull; {guide.readingTime}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: CORE SERVICES CATALOGUE */}
        {/* ======================================================== */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #FAF7F0', paddingBottom: '14px' }}>
            <Flame size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                {L.sec3Title}
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {L.sec3Desc}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '10px'
            }}
          >
            {SERVICES.map(svc => (
              <a
                key={svc.id}
                href={lp('/services/' + svc.id)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('service-detail', { serviceId: svc.id });
                }}
                style={{
                  background: '#FAF8F5',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none'
                }}
                className="hover:border-amber-600 hover:text-amber-800"
              >
                <ChevronRight size={13} color="var(--accent-saffron)" />
                <span>{locServiceName(svc)}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 4: MULTI-CITY LANDING PAGES (ALL-INDIA) */}
        {/* ======================================================== */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #FAF7F0', paddingBottom: '14px' }}>
            <Globe size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                {L.sec4Title}
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {L.sec4Desc}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '10px'
            }}
          >
            {MULTI_CITY_SEO_PAGES.map(cityPage => (
              <a
                key={cityPage.slug}
                href={lp('/services/' + cityPage.slug)}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('seo-landing', { slug: cityPage.slug });
                }}
                style={{
                  background: '#FAF8F5',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
                className="hover:border-amber-600 hover:text-amber-800"
              >
                <ChevronRight size={13} color="var(--accent-gold)" />
                <span>{locCityTitle(cityPage) || cityPage.title.split('|')[0].trim()}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 5: CORE STATIC PAGES */}
        {/* ======================================================== */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #FAF7F0', paddingBottom: '14px' }}>
            <FileText size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
                {L.sec5Title}
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {L.sec5Desc}
              </span>
            </div>
          </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a href={lp('/')} onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.home}</a>
            <a href={lp('/services')} onClick={(e) => { e.preventDefault(); navigateTo('catalogue'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.services}</a>
            <a href={lp('/about-us')} onClick={(e) => { e.preventDefault(); navigateTo('about-us'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.about}</a>
            <a href={lp('/how-it-works')} onClick={(e) => { e.preventDefault(); navigateTo('how-it-works'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.howItWorks}</a>
            <a href={lp('/faqs')} onClick={(e) => { e.preventDefault(); navigateTo('faqs'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.faqs}</a>
            <a href={lp('/contact')} onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.contact}</a>
            <a href={lp('/puja-materials')} onClick={(e) => { e.preventDefault(); navigateTo('puja-materials'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.materials}</a>
            <a href={lp('/temple-services')} onClick={(e) => { e.preventDefault(); navigateTo('temple-services'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.temple}</a>
            <a href={lp('/policies')} onClick={(e) => { e.preventDefault(); navigateTo('policies'); }} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>{L.corePages.legal}</a>
          </div>
        </div>

      </div>
    </div>
  );
}
