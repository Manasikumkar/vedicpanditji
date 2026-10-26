import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_INFO, SERVICES } from '../../data/vedicPanditData';
import { animateHeroSection } from '../../utils/gsapAnimations';
import {
  MapPin,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  CalendarCheck,
  Star,
  ArrowRight
} from 'lucide-react';

export default function HeroSection() {
  const {
    openBookingModal,
    navigateTo
  } = useApp();

  const [selectedPujaId, setSelectedPujaId] = useState(SERVICES[0].id);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = animateHeroSection(heroRef.current);
    return () => {
      if (tl) tl.kill();
    };
  }, []);

  const handleDiscoverySearch = (e) => {
    e.preventDefault();
    // Route directly to relevant pricing and packages page for selected puja & city
    navigateTo('service-detail', { serviceId: selectedPujaId, city: selectedCity });
  };

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '105px',
        paddingBottom: '60px',
        backgroundColor: '#FBF9F5',
        overflow: 'hidden'
      }}
    >
      {/* Soft Transparent Devotional Background */}
      <div
        className="hero-image-overlay"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '65%',
          backgroundImage: 'url("/images/aesthetic-pooja.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.72,
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 12%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 12%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,1) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Gentle Sunbeam Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 85% 25%, rgba(245, 185, 66, 0.14) 0%, rgba(251, 249, 245, 0) 60%), radial-gradient(circle at 10% 70%, rgba(189, 75, 35, 0.05) 0%, rgba(251, 249, 245, 0) 50%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
          
          {/* Trust Badge */}
          <div
            className="hero-trust-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid rgba(189, 75, 35, 0.22)',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#BD4B23',
              marginBottom: '18px',
              boxShadow: '0 2px 10px rgba(189, 75, 35, 0.08)'
            }}
          >
            <Sparkles size={14} color="#BD4B23" />
            <span>North Indian &amp; Bihari Vedic Purohits in Pune, Mumbai, Bangalore, Delhi, Chennai &amp; All-India</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5.5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '18px'
            }}
            className="hero-main-title"
          >
            Authentic Vedic Poojas, Havans &amp; Ceremonies Across{' '}
            <span style={{ color: '#BD4B23', fontStyle: 'italic' }}>Major Cities</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-desc"
            style={{
              fontSize: '18px',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              marginBottom: '26px',
              maxWidth: '680px'
            }}
          >
            Powered by an established network of 75+ certified Gurukul Vedic Priests. Dedicated North Indian and Bihari Pandits for Griha Pravesh, Satyanarayan Puja, Vastu Shanti, Havans &amp; Hindu Weddings across India with authentic Hindi &amp; Sanskrit rituals.
          </p>

          {/* Quick Call & WhatsApp CTA Group */}
          <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => openBookingModal(null, null, selectedCity)}
              className="btn-primary hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 26px',
                fontSize: '15px',
                boxShadow: '0 6px 20px rgba(189, 75, 35, 0.35)',
                cursor: 'pointer'
              }}
            >
              <CalendarCheck size={18} />
              <span>Book a Pandit</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('catalogue')}
              className="btn-secondary hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 22px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <span>Explore All Pujas</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Trust Pillars Checklist */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#BD4B23" />
              <span><strong>Pune &amp; PCMC</strong> Resident Doorstep Priests</span>
            </div>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#BD4B23" />
              <span><strong>Verified</strong> North Indian Vedic Pandits</span>
            </div>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#EAB308' }}>
                <Star size={14} fill="#EAB308" />
              </div>
              <span><strong>4.9/5</strong> (260+ Devotee Reviews)</span>
            </div>
            <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#BD4B23" />
              <span>Pure Vedic Samagri Kits Available</span>
            </div>
          </div>
        </div>

        {/* Quick Auspicious Puja Booking & Discovery Panel */}
        <div
          className="hero-search-panel"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px 28px',
            border: '1px solid #EAE5D9',
            boxShadow: '0 12px 36px rgba(44, 39, 36, 0.08)',
            maxWidth: '920px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <CalendarCheck size={18} color="#BD4B23" />
            <span style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-main)' }}>
              Select Puja &amp; City to View Verified Packages
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
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                SELECT POOJA OR HAVAN
              </label>
              <select
                value={selectedPujaId}
                onChange={e => setSelectedPujaId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D8D2C4',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: '#FDFCF9',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              >
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* City Select (Replaces restricted Pune locality) */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                SELECT CITY
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '14px', color: '#BD4B23' }} />
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 32px',
                    borderRadius: '10px',
                    border: '1px solid #D8D2C4',
                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#FDFCF9',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                >
                  <option value="Pune">Pune &amp; PCMC (Resident Gurukul Pandits • HQ)</option>
                  <option value="Mumbai">Mumbai &amp; MMR (Subject to Priest Availability)</option>
                  <option value="Bangalore">Bangalore (Visiting Pandit &amp; Live E-Puja)</option>
                  <option value="Delhi">Delhi &amp; NCR (Visiting Pandit &amp; Live E-Puja)</option>
                  <option value="Hyderabad">Hyderabad (Visiting Pandit &amp; Live E-Puja)</option>
                  <option value="Chennai">Chennai (Visiting Pandit &amp; Live E-Puja)</option>
                  <option value="Nashik">Nashik / Trimbakeshwar (Tirtha Kshetra)</option>
                  <option value="Online E-Puja">Online E-Puja (Pan-India &amp; Global)</option>
                </select>
              </div>
            </div>

            {/* Tradition / Language */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                RITUAL LANGUAGES
              </label>
              <div
                style={{
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D8D2C4',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: '#FDFCF9',
                  color: '#BD4B23'
                }}
              >
                Hindi &amp; Sanskrit
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <label className="hero-search-action-label" style={{ display: 'block', fontSize: '11px', color: 'transparent', marginBottom: '4px' }}>
                ACTION
              </label>
              <button
                type="submit"
                className="btn-primary hero-search-submit-btn"
                style={{
                  padding: '11px 22px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <span>View Packages</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
