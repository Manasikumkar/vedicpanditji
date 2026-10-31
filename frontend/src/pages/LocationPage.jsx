import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getLocationBySlug, getNearbyLocations } from '../data/locations';
import { getRelatedGuidesForService } from '../utils/internalLinks';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  PhoneCall,
  MessageCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Home
} from 'lucide-react';

export default function LocationPage({ slug: propSlug }) {
  const { routeParams, navigateTo, openBookingModal, openWhatsAppEnquiry, callHelpline, BRAND_INFO } = useApp();
  
  const activeSlug = propSlug || routeParams?.slug || 'pandit-in-pune';
  const location = getLocationBySlug(activeSlug) || getLocationBySlug('pandit-in-pune');

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSlug]);

  if (!location) {
    return (
      <div style={{ paddingTop: '120px', paddingBottom: '90px', textAlign: 'center' }}>
        <h2>Locality Information Not Found</h2>
        <button onClick={() => navigateTo('home')} className="btn-primary" style={{ marginTop: '20px' }}>
          Return to Homepage
        </button>
      </div>
    );
  }

  const nearbyLocations = getNearbyLocations(location);
  const relatedGuides = getRelatedGuidesForService('griha-pravesh');

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* ======================================================== */}
        {/* 1. BREADCRUMBS */}
        {/* ======================================================== */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>Home</span>
          </span>
          <span>/</span>
          <span onClick={() => navigateTo('location-detail', { slug: 'pandit-in-pune' })} style={{ cursor: 'pointer' }} className="hover:text-amber-800">
            Locations
          </span>
          {!location.isParentHub && location.parentCity && (
            <>
              <span>/</span>
              <span
                onClick={() => navigateTo('location-detail', { slug: location.parentSlug || 'pandit-in-pune' })}
                style={{ cursor: 'pointer' }}
                className="hover:text-amber-800"
              >
                {location.parentCity}
              </span>
            </>
          )}
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{location.name}</span>
        </nav>

        {/* ======================================================== */}
        {/* 2. HERO HEADER */}
        {/* ======================================================== */}
        <header
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FDFBF7 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: '40px 36px',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'var(--accent-saffron-light)', color: 'var(--accent-saffron)', fontSize: '12px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <Sparkles size={14} />
              <span>{location.badge || 'Verified Doorstep Vedic Priests'}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25, marginBottom: '16px' }}>
              {location.h1}
            </h1>

            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px', fontWeight: 500 }}>
              {location.tagline}
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => openBookingModal(null, location.name, location.parentCity)}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <CalendarCheck size={18} />
                <span>Book Pandit in {location.name}</span>
              </button>

              <button
                type="button"
                onClick={() => openWhatsAppEnquiry(`Namaste Panditji, I would like to enquire about booking a puja in ${location.name}.`)}
                style={{
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <MessageCircle size={17} />
                <span>WhatsApp Panditji</span>
              </button>

              <button
                type="button"
                onClick={callHelpline}
                style={{
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <PhoneCall size={16} color="var(--accent-saffron)" />
                <span>{BRAND_INFO.phone}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* 3. DISTINCT LOCAL INTRODUCTION & PILLARS */}
        {/* ======================================================== */}
        <section style={{ marginBottom: '48px' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <MapPin size={22} color="var(--accent-saffron)" />
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>
                Vedic Pandit Services in {location.name}
              </h2>
            </div>

            <div style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-line', marginBottom: '30px' }}>
              {location.intro}
            </div>

            {/* Service Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent-saffron)' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>Native Hindi &amp; Sanskrit</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Authentic mantra recitations with full Hindi Katha narration.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent-gold)' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>Strict Muhurat Adherence</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Calculated from Hindu Panchang and family Janma Nakshatra.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(21, 150, 107, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#15966B' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>100% Pure Samagri</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Pure Desi cow ghee, dry mango wood, and herbal havan herbs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. AVAILABLE PUJA CEREMONIES IN THIS LOCALITY */}
        {/* ======================================================== */}
        <section style={{ marginBottom: '52px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
              Sacred Rituals
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
              Popular Vedic Pujas Performed in {location.name}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}
          >
            {(location.topServices || []).map((svc) => (
              <div
                key={svc.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Flame size={18} color="var(--accent-saffron)" />
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {svc.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                    {svc.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #F5EFE6' }}>
                  <button
                    type="button"
                    onClick={() => openBookingModal(svc.name, location.name, location.parentCity)}
                    className="btn-primary"
                    style={{
                      padding: '8px 16px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      flex: 1,
                      cursor: 'pointer'
                    }}
                  >
                    Enquire for {location.name}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('service-detail', { serviceId: svc.id })}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: '#FAF8F5',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                    title="View ceremony details"
                  >
                    View Vidhi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. STEP-BY-STEP ARRANGEMENT PROCEDURE */}
        {/* ======================================================== */}
        <section
          style={{
            background: 'linear-gradient(135deg, #FBF7F0 0%, #F5F0E6 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '36px',
            marginBottom: '52px'
          }}
        >
          <div style={{ maxWidth: '700px', marginBottom: '28px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
              Simple 4-Step Process
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
              How to Arrange a Vedic Pandit in {location.name}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}
          >
            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>01</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Enquiry &amp; Gotra Details</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Share your ceremony requirement, preferred dates, family Gotra, and apartment locality in {location.name}.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>02</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Shubh Muhurat Calculation</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Senior Vedic Acharyas calculate the auspicious Lagna and Tithi matching your family birth stars.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>03</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Samagri Alignment</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Panditji coordinates all dry herbs, havan wood, and pure cow ghee. You only keep basic fresh flowers and fruits ready.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>04</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>Auspicious Conduction</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Panditji arrives punctually at your residence to conduct the ritual with authentic Sanskrit chanting and Hindi Katha.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. VERIFIED LOCAL FAQS */}
        {/* ======================================================== */}
        {location.localFaqs && location.localFaqs.length > 0 && (
          <section style={{ marginBottom: '52px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
                Devotee Questions
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                Frequently Asked Questions for {location.name}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {location.localFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1px solid var(--border-subtle)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--text-main)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} color="var(--accent-saffron)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 24px 20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, borderTop: '1px solid #FAF7F0', paddingTop: '14px' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 7. RELATED EDUCATIONAL GUIDES */}
        {/* ======================================================== */}
        <section style={{ marginBottom: '52px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
                Educational Resources
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                Vedic Puja Guides for Devotees
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('puja-guides')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-saffron)',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <span>View All Guides</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {relatedGuides.map((guide) => (
              <div
                key={guide.slug}
                onClick={() => navigateTo('puja-guide-detail', { slug: guide.slug })}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)', letterSpacing: '0.04em' }}>
                    {guide.categoryName}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginTop: '6px', marginBottom: '10px', lineHeight: 1.4 }}>
                    {guide.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {guide.summary}
                  </p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-saffron)', fontSize: '12.5px', fontWeight: 700 }}>
                  <span>Read Guide</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. NEARBY CONNECTED LOCALITIES (INTERNAL LINKING) */}
        {/* ======================================================== */}
        {nearbyLocations && nearbyLocations.length > 0 && (
          <section
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
                Explore Nearby Localities in {location.parentCity || 'Pune & PCMC'}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Doorstep North Indian Vedic pandit services available across neighboring areas:
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {nearbyLocations.map((nearLoc) => (
                <button
                  key={nearLoc.slug}
                  type="button"
                  onClick={() => navigateTo('location-detail', { slug: nearLoc.slug })}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    background: '#FAF7F0',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                  className="hover:border-amber-600 hover:text-amber-800"
                >
                  <MapPin size={13} color="var(--accent-saffron)" />
                  <span>Pandit in {nearLoc.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
