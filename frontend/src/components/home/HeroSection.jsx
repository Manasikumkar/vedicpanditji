import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/vedicPanditData';
import { animateHeroSection } from '../../utils/gsapAnimations';
import { useI18n } from '../../i18n/useI18n';
import {
  MapPin,
  Sparkles,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Building,
  Flame,
  Award
} from 'lucide-react';

// Keys, translated at render time
const ROTATING_KEYWORDS = [
  'home.hero.keyword-pooja',
  'home.hero.keyword-havan',
  'home.hero.keyword-japa',
  'home.hero.keyword-griha-pravesh',
  'home.hero.keyword-satyanarayan-pooja',
  'home.hero.keyword-vastu-shanti',
  'home.hero.keyword-hindu-wedding'
];

export default function HeroSection() {
  const {
    openBookingModal,
    navigateTo
  } = useApp();
  const { t } = useI18n();

  const [selectedPujaId, setSelectedPujaId] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const heroRef = useRef(null);

  // Rotating Keyword Animation State
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Interval for rotating keyword: ~2.3 seconds
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      // 1. Trigger exit animation (slide up + fade out: 400ms)
      setIsTransitioning(true);

      setTimeout(() => {
        // 2. Change word and trigger entrance animation (slide from below + fade in)
        setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
        setIsTransitioning(false);
      }, 450);
    }, 2400);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    const tl = animateHeroSection(heroRef.current);
    return () => {
      if (tl) tl.kill();
    };
  }, []);

  const handleDiscoverySearch = (e) => {
    e.preventDefault();
    if (selectedPujaId) {
      navigateTo('service-detail', { serviceId: selectedPujaId, city: selectedCity || 'Pune' });
    } else {
      navigateTo('services');
    }
  };

  const currentKeyword = t(ROTATING_KEYWORDS[keywordIndex]);

  return (
    <section
      ref={heroRef}
      className="hero-section-root"
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '105px',
        paddingBottom: '60px',
        backgroundColor: '#FBF7F0',
        overflow: 'hidden'
      }}
    >
      {/* Devotional Background — Clean Authentic Sacred Kalash, Diya & Traditional Puja Altar */}
      <div
        className="hero-image-overlay"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '58%',
          backgroundImage: 'url("/images/aesthetic-pooja.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.95,
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 12%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,1) 85%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 12%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,1) 85%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Smooth warm ivory/cream gradient overlay transitioning into the left text area */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #FBF7F0 0%, #FBF7F0 38%, rgba(251, 247, 240, 0.9) 52%, rgba(251, 247, 240, 0.2) 75%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Gentle Sunbeam Radial Glow & Ambient Warmth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 82% 28%, rgba(245, 185, 66, 0.15) 0%, rgba(251, 247, 240, 0) 65%), radial-gradient(circle at 10% 70%, rgba(217, 79, 30, 0.04) 0%, rgba(251, 247, 240, 0) 50%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Subtle Sacred Motif Watermark in Background */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '-40px',
          width: '320px',
          height: '320px',
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 2,
          backgroundImage: 'radial-gradient(circle, #BD4B23 10%, transparent 70%)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* TOP FLOATING CARD (Top-Right Floating Stat Pill) */}
        <div className="hero-top-float-card">
          <div className="hero-float-icon">
            <Award size={18} color="#0284C7" />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('home.hero.float-authentic-tradition')}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
              {t('home.hero.float-experienced-purohits')}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
          
          {/* Top Trust Badge */}
          <div
            className="hero-trust-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid rgba(217, 79, 30, 0.28)',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--accent-saffron)',
              marginBottom: '18px',
              boxShadow: '0 2px 10px rgba(217, 79, 30, 0.06)'
            }}
          >
            <Sparkles size={14} color="var(--accent-saffron)" />
            <span>{t('home.hero.trust-badge')}</span>
          </div>

          {/* MAIN ANIMATED ROTATING HEADLINE — EXACTLY THREE INTENTIONAL LINES */}
          <h1
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(30px, 4.8vw, 50px)',
              fontWeight: 800,
              lineHeight: 1.16,
              color: 'var(--text-main)',
              letterSpacing: '-0.025em',
              marginBottom: '18px'
            }}
            className="hero-main-title"
          >
            {/* Line 1: Authentic Vedic */}
            <div className="hero-title-line hero-title-line-1">
              {t('home.hero.title-authentic-vedic')}
            </div>
            
            {/* Line 2: [Animated rotating keyword] and */}
            <div className="hero-title-line hero-title-line-2">
              <span className="rotating-keyword-wrapper">
                <span
                  className={`rotating-keyword ${isTransitioning ? 'leaving' : 'entering'}`}
                >
                  {currentKeyword}
                </span>
              </span>
              <span className="hero-heading-and">{t('home.hero.title-and')}</span>
            </div>

            {/* Line 3: Ceremonies Across Major Cities */}
            <div className="hero-title-line hero-title-line-3">
              {`${t('home.hero.title-ceremonies-across')} `}<span style={{ color: 'var(--accent-saffron)', fontStyle: 'normal' }}>{t('home.hero.title-major-cities')}</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-desc"
            style={{
              fontSize: '16.5px',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              marginBottom: '26px',
              maxWidth: '660px'
            }}
          >
            {t('home.hero.subtitle')}
          </p>

          {/* Quick Call & Primary CTA Group */}
          <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => openBookingModal(null, null, selectedCity)}
              className="btn-primary hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '15px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 6px 20px rgba(217, 79, 30, 0.35)',
                cursor: 'pointer'
              }}
            >
              <CalendarCheck size={18} />
              <span>{t('home.hero.book-a-pandit')}</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('catalogue')}
              className="btn-secondary hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                fontSize: '14.5px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                background: '#FFFFFF'
              }}
            >
              <span>{t('home.hero.explore-all-pujas')}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Trust Pillars Checklist */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building size={16} color="var(--accent-saffron)" />
              <span><strong>{t('home.hero.pillar-pune-pcmc')}</strong>{` ${t('home.hero.pillar-doorstep-priest-services')}`}</span>
            </div>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--accent-saffron)" />
              <span><strong>{t('home.hero.pillar-verified')}</strong>{` ${t('home.hero.pillar-north-indian-vedic-pandits')}`}</span>
            </div>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="var(--accent-gold)" />
              <span><strong>{t('home.hero.hindi-sanskrit')}</strong>{` ${t('home.hero.pillar-mantras-vidhi')}`}</span>
            </div>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={16} color="var(--accent-saffron)" />
              <span>{t('home.hero.pillar-samagri-kits')}</span>
            </div>
          </div>
        </div>

        {/* Floating Auspicious Puja Booking & Package Discovery Panel */}
        <div className="hero-search-wrapper" style={{ position: 'relative', maxWidth: '940px' }}>
          
          <div
            className="hero-search-panel"
            style={{
              background: '#FFFFFF',
              borderRadius: '22px',
              padding: '24px 28px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-floating)',
              position: 'relative',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Flame size={17} color="var(--accent-saffron)" />
              <span style={{ fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-main)' }}>
                {t('home.hero.search-heading')}
              </span>
            </div>

            <form
              onSubmit={handleDiscoverySearch}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.6fr 1.3fr 1.1fr auto',
                gap: '14px',
                alignItems: 'center'
              }}
              className="hero-search-form"
            >
              {/* Puja Select */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px', letterSpacing: '0.04em' }}>
                  {t('home.hero.label-pooja')}
                </label>
                <select
                  value={selectedPujaId}
                  onChange={e => setSelectedPujaId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#FAF8F5',
                    color: 'var(--text-main)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">{t('home.hero.select-pooja-placeholder')}</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* City Select */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px', letterSpacing: '0.04em' }}>
                  {t('home.hero.label-city')}
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={15} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--accent-saffron)' }} />
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 34px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '14px',
                      fontWeight: 600,
                      background: '#FAF8F5',
                      color: 'var(--text-main)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">{t('home.hero.select-city-placeholder')}</option>
                    <option value="Bangalore">{t('home.hero.city-bangalore')}</option>
                    <option value="Pune">{t('home.hero.city-pune')}</option>
                    <option value="Mumbai">{t('home.hero.city-mumbai')}</option>
                    <option value="Delhi">{t('home.hero.city-delhi')}</option>
                    <option value="Hyderabad">{t('home.hero.city-hyderabad')}</option>
                    <option value="Chennai">{t('home.hero.city-chennai')}</option>
                    <option value="Nashik">{t('home.hero.city-nashik')}</option>
                    <option value="Online E-Puja">{t('home.hero.city-online-e-puja')}</option>
                  </select>
                </div>
              </div>

              {/* Tradition / Language */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px', letterSpacing: '0.04em' }}>
                  {t('home.hero.label-ritual-languages')}
                </label>
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#FAF8F5',
                    color: 'var(--accent-saffron)'
                  }}
                >
                  {t('home.hero.hindi-sanskrit')}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <label className="hero-search-action-label" style={{ display: 'block', fontSize: '11px', color: 'transparent', marginBottom: '5px' }}>
                  {t('home.hero.label-action')}
                </label>
                <button
                  type="submit"
                  className="btn-primary hero-search-submit-btn"
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <span>{t('home.hero.view-packages')}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* HERO ANIMATION AND RESPONSIVE STYLES */}
      <style>{`
        /* Rotating service keyword animation container — clean borderless saffron text directly in H1 */
        .rotating-keyword-wrapper {
          display: inline-flex;
          align-items: baseline;
          position: relative;
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          border-radius: 0;
          box-shadow: none;
          outline: none;
          color: var(--accent-saffron);
          vertical-align: baseline;
        }

        .rotating-keyword {
          display: inline-block;
          color: var(--accent-saffron);
          font-weight: 800;
          white-space: nowrap;
          transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease;
          will-change: opacity, filter, transform;
        }

        .rotating-keyword.entering {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1);
        }

        .rotating-keyword.leaving {
          opacity: 0;
          filter: blur(4px);
          transform: scale(0.97);
        }

        @media (prefers-reduced-motion: reduce) {
          .rotating-keyword {
            transition: none !important;
            transform: none !important;
          }
        }

        .hero-title-line-1 {
          display: block;
        }

        .hero-title-line-2 {
          display: flex;
          align-items: baseline;
          flex-wrap: nowrap;
          gap: 10px;
          min-height: 1.2em;
          white-space: nowrap;
        }

        .hero-heading-and {
          color: var(--text-main);
          font-weight: 800;
          display: inline-block;
        }

        .hero-title-line-3 {
          display: block;
          white-space: nowrap;
        }

        /* Top Right Float Card */
        .hero-top-float-card {
          position: absolute;
          top: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-subtle);
          padding: 10px 16px;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(36, 35, 33, 0.08);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 12;
          animation: floatSlight 4s ease-in-out infinite alternate;
        }

        .hero-float-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #E0F2FE;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes floatSlight {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .hero-image-overlay {
            width: 50% !important;
            opacity: 0.6 !important;
          }
          .hero-top-float-card {
            display: none !important;
          }
        }

        @media (max-width: 860px) {
          .hero-section-root {
            padding-top: 95px !important;
            min-height: auto !important;
          }
          .hero-image-overlay {
            width: 100% !important;
            opacity: 0.28 !important;
            background-position: center !important;
          }
          .hero-search-form {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 600px) {
          .hero-main-title {
            font-size: clamp(26px, 7vw, 34px) !important;
            line-height: 1.2 !important;
          }
          .hero-title-line-2 {
            flex-wrap: nowrap !important;
            gap: 8px !important;
          }
          .hero-title-line-3 {
            white-space: normal !important;
          }
          .hero-search-form {
            grid-template-columns: 1fr !important;
          }
          .hero-search-action-label {
            display: none !important;
          }
          .hero-search-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-search-panel {
            padding: 18px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
