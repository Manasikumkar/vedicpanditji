import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, BRAND_INFO } from '../data/vedicPanditData';
import { ALL_LOCATIONS, getLocalitiesByParent, getParentLocations } from '../data/locations';
import { PUJA_GUIDES_DATA } from '../data/guides/pujaGuidesData';
import { MULTI_CITY_SEO_PAGES } from '../data/multiCitySeoData';
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const parentHubs = getParentLocations();
  const puneLocalities = getLocalitiesByParent('Pune');
  const pcmcLocalities = getLocalitiesByParent('Pimpri-Chinchwad (PCMC)');

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>Home</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>HTML Directory Sitemap</span>
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
            <span>Complete Architecture &bull; Crawlable Directory</span>
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
            VedicPanditji Website Directory &amp; Sitemap
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Complete directory of authentic Vedic ceremonies, Pune &amp; PCMC locality landing pages, and comprehensive educational puja guides.
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
                1. Pune &amp; PCMC Local SEO Pages ({ALL_LOCATIONS.length} Localities)
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Targeted local landing pages with verified neighborhood insights and doorstep purohit booking
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
                Parent Regional Hubs
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {parentHubs.map(hub => (
                  <li key={hub.slug}>
                    <button
                      type="button"
                      onClick={() => navigateTo('location-detail', { slug: hub.slug })}
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
                        gap: '6px'
                      }}
                      className="hover:text-amber-800"
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{hub.h1}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pune Localities */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#BD4B23', marginBottom: '12px' }}>
                Pune City Localities
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {puneLocalities.map(loc => (
                  <li key={loc.slug}>
                    <button
                      type="button"
                      onClick={() => navigateTo('location-detail', { slug: loc.slug })}
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
                        gap: '6px'
                      }}
                      className="hover:text-amber-800"
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>Pandit in {loc.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* PCMC Localities */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#BD4B23', marginBottom: '12px' }}>
                Pimpri-Chinchwad (PCMC) Localities
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                {pcmcLocalities.map(loc => (
                  <li key={loc.slug}>
                    <button
                      type="button"
                      onClick={() => navigateTo('location-detail', { slug: loc.slug })}
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
                        gap: '6px'
                      }}
                      className="hover:text-amber-800"
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>Pandit in {loc.name}</span>
                    </button>
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
                2. Informative Hindu Puja Guides Hub ({PUJA_GUIDES_DATA.length} Guides)
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Educational articles explaining authentic Vedic vidhi procedures, samagri lists, and Muhurat calculations
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
              <div
                key={guide.slug}
                onClick={() => navigateTo('puja-guide-detail', { slug: guide.slug })}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#FAF8F5',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                className="hover:border-amber-600"
              >
                <ChevronRight size={14} color="var(--accent-gold)" />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35 }}>
                    {guide.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {guide.categoryName} &bull; {guide.readingTime}
                  </div>
                </div>
              </div>
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
                3. Vedic Puja &amp; Ceremony Services ({SERVICES.length} Ceremonies)
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Authentic pujas, havans, jaaps, paths, and sanskars performed by experienced purohits
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
              <button
                key={svc.id}
                type="button"
                onClick={() => navigateTo('service-detail', { serviceId: svc.id })}
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
                  color: 'var(--text-main)'
                }}
                className="hover:border-amber-600 hover:text-amber-800"
              >
                <ChevronRight size={13} color="var(--accent-saffron)" />
                <span>{svc.name}</span>
              </button>
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
                4. Multi-City Landing Pages Across India ({MULTI_CITY_SEO_PAGES.length} Pages)
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                City-specific landing pages for North Indian &amp; Bihari Pandits across Pune, Mumbai, Bangalore, Delhi-NCR, Chennai, Hyderabad, Ahmedabad, Kolkata &amp; Nashik
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
              <button
                key={cityPage.slug}
                type="button"
                onClick={() => navigateTo('seo-landing', { slug: cityPage.slug })}
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
                  gap: '6px'
                }}
                className="hover:border-amber-600 hover:text-amber-800"
              >
                <ChevronRight size={13} color="var(--accent-gold)" />
                <span>{cityPage.title.split('|')[0].trim()}</span>
              </button>
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
                5. Essential Pages &amp; Support
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Direct consultation, company heritage, and terms
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button type="button" onClick={() => navigateTo('home')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>Home</button>
            <button type="button" onClick={() => navigateTo('catalogue')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>Ceremonies Catalogue</button>
            <button type="button" onClick={() => navigateTo('about-us')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>About Us</button>
            <button type="button" onClick={() => navigateTo('how-it-works')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>How It Works</button>
            <button type="button" onClick={() => navigateTo('faqs')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>FAQs</button>
            <button type="button" onClick={() => navigateTo('contact')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>Contact &amp; Shubh Muhurat</button>
            <button type="button" onClick={() => navigateTo('puja-materials')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>Puja Materials</button>
            <button type="button" onClick={() => navigateTo('temple-services')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>Temple Services</button>
            <button type="button" onClick={() => navigateTo('policies')} className="footer-nav-link" style={{ padding: '8px 16px', background: '#FAF8F5', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontSize: '13px', fontWeight: 600 }}>Legal Policies</button>
          </div>
        </div>

      </div>
    </div>
  );
}
