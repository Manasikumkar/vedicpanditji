import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SEO_LANDING_PAGES, SERVICES, BRAND_INFO } from '../data/vedicPanditData';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'HTML Sitemap & Complete Directory | VedicPanditji';
  }, []);

  // Group SEO landing pages by city
  const bangalorePages = SEO_LANDING_PAGES.filter(p => p.city === 'Bangalore');
  const punePages = SEO_LANDING_PAGES.filter(p => p.city === 'Pune');
  const mumbaiPages = SEO_LANDING_PAGES.filter(p => p.city === 'Mumbai');
  const delhiPages = SEO_LANDING_PAGES.filter(p => p.city === 'Delhi');
  const chennaiPages = SEO_LANDING_PAGES.filter(p => p.city === 'Chennai');
  const hyderabadPages = SEO_LANDING_PAGES.filter(p => p.city === 'Hyderabad');
  const nashikPages = SEO_LANDING_PAGES.filter(p => p.city === 'Nashik');
  const onlinePages = SEO_LANDING_PAGES.filter(p => p.city === 'Online' || p.city === 'Online / Global');

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Home size={13} />
            <span>Home</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>HTML Sitemap</span>
        </div>

        {/* Page Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              border: '1px solid rgba(189, 75, 35, 0.25)',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#BD4B23',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={13} color="#BD4B23" />
            <span>Complete Architecture &amp; Page Directory</span>
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '38px',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}
          >
            VedicPanditji Website Sitemap
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Comprehensive directory of all authentic Vedic puja services, city-specific SEO landing pages (Bangalore, Pune, Mumbai, Hyderabad, Nashik), and devotee consultation guides.
          </p>
        </div>

        {/* Section 1: Multi-City SEO Landing Pages (Main Motive) */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EAE5D9',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #EAE5D9', paddingBottom: '14px' }}>
            <MapPin size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>
                1. Multi-City SEO Landing Pages ({SEO_LANDING_PAGES.length})
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Targeted city and service combinations for high organic search intent
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px'
            }}
            className="sitemap-grid"
          >
            {/* Bangalore Cluster */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D97706' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#BD4B23' }}>
                  Bangalore (Bengaluru)
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {bangalorePages.map(page => (
                  <li key={page.slug}>
                    <button
                      onClick={() => navigateTo('seo-landing', { slug: page.slug })}
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
                        gap: '4px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#BD4B23'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{page.h1}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pune Cluster */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#15803D' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#BD4B23' }}>
                  Pune &amp; PCMC (HQ)
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {punePages.map(page => (
                  <li key={page.slug}>
                    <button
                      onClick={() => navigateTo('seo-landing', { slug: page.slug })}
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
                        gap: '4px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#BD4B23'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{page.h1}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mumbai & Regional Clusters */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#15803D' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#BD4B23' }}>
                  Mumbai, Thane &amp; Navi Mumbai
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {mumbaiPages.map(page => (
                  <li key={page.slug}>
                    <button
                      onClick={() => navigateTo('seo-landing', { slug: page.slug })}
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
                        gap: '4px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#BD4B23'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{page.h1}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Delhi-NCR, Chennai, Hyderabad, Nashik & Online */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1D4ED8' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#BD4B23' }}>
                  Delhi-NCR, Chennai, Hyderabad &amp; All-India
                </h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[...delhiPages, ...chennaiPages, ...hyderabadPages, ...nashikPages, ...onlinePages].map(page => (
                  <li key={page.slug}>
                    <button
                      onClick={() => navigateTo('seo-landing', { slug: page.slug })}
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
                        gap: '4px'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#BD4B23'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                    >
                      <ChevronRight size={13} color="var(--accent-gold)" />
                      <span>{page.h1}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Pooja Catalogue & Ceremony Detail Pages */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EAE5D9',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #EAE5D9', paddingBottom: '14px' }}>
            <Flame size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>
                2. Vedic Pooja Catalogue ({SERVICES.length} Core Ceremonies)
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Detailed service descriptions, Shubh Muhurat vidhi, and samagri requirements
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px'
            }}
            className="sitemap-grid"
          >
            {SERVICES.map(service => (
              <div
                key={service.id}
                onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid #EAE5D9',
                  background: '#FDFCF9',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-saffron)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#EAE5D9';
                  e.currentTarget.style.background = '#FDFCF9';
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {service.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--accent-saffron)', marginTop: '2px' }}>
                    {service.duration} • {service.category}
                  </div>
                </div>
                <ArrowRight size={14} color="#BD4B23" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Core Navigation & Customer Pages */}
        <div
          className="sitemap-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EAE5D9',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #EAE5D9', paddingBottom: '14px' }}>
            <Globe size={22} color="var(--accent-saffron)" />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>
                3. Core Website &amp; Customer Support Pages
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                General website navigation, devotee authentication, and legal guidelines
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}
            className="sitemap-grid"
          >
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#BD4B23' }}>
                Main Navigation
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Home</button></li>
                <li><button onClick={() => navigateTo('catalogue')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Pooja Services</button></li>
                <li><button onClick={() => navigateTo('about')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>About Us</button></li>
                <li><button onClick={() => navigateTo('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Contact &amp; Muhurat</button></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#BD4B23' }}>
                Booking &amp; Account
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><button onClick={() => navigateTo('account')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>My Account &amp; Enquiries</button></li>
                <li><button onClick={() => navigateTo('auth')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Devotee Login / Register</button></li>
                <li><button onClick={() => navigateTo('puja-materials')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Puja Materials</button></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#BD4B23' }}>
                Knowledge &amp; Support
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><button onClick={() => navigateTo('faqs')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Customer FAQs</button></li>
                <li><button onClick={() => navigateTo('how-it-works')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>How We Work</button></li>
                <li><button onClick={() => navigateTo('temple-services')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Temple Services</button></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: '#BD4B23' }}>
                Legal &amp; Policy
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><button onClick={() => navigateTo('policies')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('policies')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Terms of Service</button></li>
                <li><button onClick={() => navigateTo('policies')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Refund Policy</button></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .sitemap-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .sitemap-card {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
