import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_INFO } from '../../data/vedicPanditData';
import {
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Footer() {
  const { navigateTo, openBookingModal, openWhatsAppEnquiry } = useApp();

  // Accordion state for mobile view (default Pooja services expanded)
  const [openSections, setOpenSections] = useState({
    poojas: true,
    cities: false,
    booking: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <footer
      style={{
        background: '#181A17',
        color: '#E0DDD5',
        paddingTop: '60px',
        borderTop: '1px solid #2D302C',
        fontSize: '14px'
      }}
      className="vp-footer-root"
    >
      <div className="container">
        {/* Main Section */}
        <div className="footer-main-grid">
          
          {/* Col 1: Brand & Contact Overview */}
          <div className="footer-brand-col">
            {/* Elegant Logo Container */}
            <div
              onClick={() => navigateTo('home')}
              className="footer-logo-box"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '16px',
                cursor: 'pointer',
                background: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(197, 154, 63, 0.4)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.3)'
              }}
              title="VedicPanditji - Authentic Vedic Pujas"
            >
              <img
                src="/images/vedicpanditji-logo.png"
                alt="VedicPanditji logo"
                style={{
                  height: '38px',
                  width: 'auto',
                  maxWidth: '165px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            <p style={{ color: '#A09D94', fontSize: '13px', lineHeight: 1.65, marginBottom: '14px', maxWidth: '380px' }}>
              VedicPanditji is a dedicated platform for authentic Hindu puja services, Vedic rituals, and havans led by Pandit Jitendra Chaubey with 75+ Gurukul-certified North Indian &amp; Bihari priests.
            </p>

            {/* Languages Badge */}
            <div style={{ marginBottom: '16px', padding: '5px 12px', background: 'rgba(197, 154, 63, 0.1)', border: '1px solid rgba(197, 154, 63, 0.28)', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={12} color="#D4AF37" />
              <span style={{ fontSize: '11px', color: '#E5C06E', fontWeight: 700, letterSpacing: '0.02em' }}>
                Languages: Hindi &amp; Sanskrit
              </span>
            </div>

            {/* Mobile Quick Action Buttons (Shown on mobile for instant conversion) */}
            <div className="footer-mobile-cta-row">
              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="footer-mobile-call-btn"
              >
                <PhoneCall size={14} color="var(--accent-gold)" />
                <span>Call Helpline</span>
              </a>

              <button
                type="button"
                onClick={() => openWhatsAppEnquiry()}
                className="footer-mobile-wa-btn"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Secondary Contact Info */}
            <div className="footer-contact-details">
              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="footer-desktop-phone-link"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}
              >
                <PhoneCall size={14} color="var(--accent-gold)" />
                <span>{BRAND_INFO.phone} (Helpline)</span>
              </a>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A09D94', textDecoration: 'none' }}
              >
                <Mail size={14} color="var(--accent-gold)" />
                <span>{BRAND_INFO.email}</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A09D94' }}>
                <MapPin size={14} color="var(--accent-gold)" />
                <span>Pune Headquarters (Serving All-India)</span>
              </div>
            </div>

            {/* Desktop WhatsApp Button */}
            <div className="footer-desktop-wa-container">
              <button
                onClick={() => openWhatsAppEnquiry()}
                style={{
                  marginTop: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <MessageCircle size={14} />
                <span>Instant WhatsApp Enquiry</span>
              </button>
            </div>
          </div>

          {/* Col 2: Pooja Services (Accordion on mobile) */}
          <div className="footer-nav-col">
            <div
              className="footer-accordion-header"
              onClick={() => toggleSection('poojas')}
            >
              <h4 className="footer-heading">
                Pooja Services
              </h4>
              <span className="footer-accordion-icon">
                {openSections.poojas ? <ChevronUp size={16} color="var(--accent-gold)" /> : <ChevronDown size={16} color="#7E7A72" />}
              </span>
            </div>

            <div className={`footer-accordion-content ${openSections.poojas ? 'open' : ''}`}>
              <ul className="footer-nav-list">
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'griha-pravesh' })}
                    className="footer-nav-link"
                  >
                    Griha Pravesh Puja
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'satyanarayan-puja' })}
                    className="footer-nav-link"
                  >
                    Satyanarayan Puja &amp; Katha
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'vastu-shanti-puja' })}
                    className="footer-nav-link"
                  >
                    Vastu Shanti Puja &amp; Havan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'rudrabhishek-puja' })}
                    className="footer-nav-link"
                  >
                    Rudrabhishek Puja
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'maha-mrityunjaya-jaap' })}
                    className="footer-nav-link"
                  >
                    Maha Mrityunjaya Jaap
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'sunderkand-path' })}
                    className="footer-nav-link"
                  >
                    Sundarkand Path Recitation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: 'vivah-marriage' })}
                    className="footer-nav-link"
                  >
                    Hindu Wedding (Vivah Sanskar)
                  </button>
                </li>
                <li style={{ marginTop: '2px' }}>
                  <button
                    onClick={() => navigateTo('catalogue')}
                    className="footer-nav-link"
                    style={{ color: 'var(--accent-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Browse All 200+ Services</span>
                    <ArrowUpRight size={13} />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: North Indian Pandit by City (Accordion on mobile) */}
          <div className="footer-nav-col">
            <div
              className="footer-accordion-header"
              onClick={() => toggleSection('cities')}
            >
              <h4 className="footer-heading">
                North Indian Pandit by City
              </h4>
              <span className="footer-accordion-icon">
                {openSections.cities ? <ChevronUp size={16} color="var(--accent-gold)" /> : <ChevronDown size={16} color="#7E7A72" />}
              </span>
            </div>

            <div className={`footer-accordion-content ${openSections.cities ? 'open' : ''}`}>
              <ul className="footer-nav-list">
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'north-indian-pandit-in-pune' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>North Indian Pandit in Pune (HQ)</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'north-indian-pandit-in-mumbai' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>North Indian Pandit in Mumbai &amp; Thane</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'north-indian-pandit-in-bangalore' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>North Indian Pandit in Bangalore</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'north-indian-pandit-in-delhi' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>North Indian Pandit in Delhi NCR</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'north-indian-pandit-in-hyderabad' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>North Indian Pandit in Hyderabad</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'north-indian-pandit-in-chennai' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>North Indian Pandit in Chennai</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'trimbakeshwar-kalsarp-puja-nashik' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Trimbakeshwar Kalsarp Puja (Nashik)</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('seo-landing', { slug: 'online-e-puja-services' })}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>Online E-Puja (All-India &amp; Global)</span>
                    <ArrowUpRight size={12} color="var(--accent-gold)" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Contact & Booking Information (Accordion on mobile) */}
          <div className="footer-nav-col">
            <div
              className="footer-accordion-header"
              onClick={() => toggleSection('booking')}
            >
              <h4 className="footer-heading">
                Contact &amp; Booking
              </h4>
              <span className="footer-accordion-icon">
                {openSections.booking ? <ChevronUp size={16} color="var(--accent-gold)" /> : <ChevronDown size={16} color="#7E7A72" />}
              </span>
            </div>

            <div className={`footer-accordion-content ${openSections.booking ? 'open' : ''}`}>
              <ul className="footer-nav-list" style={{ marginBottom: '16px' }}>
                <li>
                  <button
                    onClick={() => openBookingModal()}
                    className="footer-nav-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F5A380', fontWeight: 600 }}
                  >
                    <Sparkles size={13} color="var(--accent-gold)" />
                    <span>Book a Pandit (Online Enquiry)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('how-it-works')}
                    className="footer-nav-link"
                  >
                    How We Work &amp; Booking Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('about-us')}
                    className="footer-nav-link"
                  >
                    About Acharya Jitendra Chaubey
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('faqs')}
                    className="footer-nav-link"
                  >
                    Frequently Asked Questions (FAQs)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="footer-nav-link"
                  >
                    Contact &amp; Shubh Muhurat Assistance
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('policies')}
                    className="footer-nav-link"
                  >
                    Terms of Service &amp; Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('auth')}
                    className="footer-nav-link"
                    style={{ color: 'var(--accent-gold)', fontWeight: 600 }}
                  >
                    Client Login / Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('account')}
                    className="footer-nav-link"
                  >
                    My Account &amp; Enquiries
                  </button>
                </li>
              </ul>

              <button
                onClick={() => navigateTo('sitemap')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: 'var(--accent-gold)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>View HTML Sitemap</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clean Legal & Copyright Note */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-links">
            <span onClick={() => navigateTo('about-us')} className="footer-bottom-link">About Us</span>
            <span className="footer-link-dot">•</span>
            <span onClick={() => navigateTo('faqs')} className="footer-bottom-link">FAQs</span>
            <span className="footer-link-dot">•</span>
            <span onClick={() => navigateTo('contact')} className="footer-bottom-link">Contact Us</span>
            <span className="footer-link-dot">•</span>
            <span onClick={() => navigateTo('auth')} className="footer-bottom-link">Client Login</span>
            <span className="footer-link-dot">•</span>
            <span onClick={() => navigateTo('account')} className="footer-bottom-link">My Account</span>
            <span className="footer-link-dot">•</span>
            <span onClick={() => navigateTo('policies')} className="footer-bottom-link">Privacy &amp; Terms</span>
            <span className="footer-link-dot">•</span>
            <span onClick={() => navigateTo('sitemap')} className="footer-bottom-link gold">HTML Sitemap</span>
            <span className="footer-link-dot">•</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="footer-bottom-link">XML Sitemap</a>
          </div>

          <div className="footer-copyright-text">
            © {new Date().getFullYear()} VedicPanditji (vedicpanditji.com). All Rights Reserved. North Indian &amp; Bihari Vedic Pandit Services across India.
          </div>
        </div>
      </div>

      {/* Scoped CSS for Footer Responsive Behavior */}
      <style>{`
        /* Desktop Default */
        .footer-heading {
          font-family: var(--font-display);
          color: #FFFFFF;
          fontSize: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin: 0;
        }

        .footer-nav-link {
          background: none;
          border: none;
          color: #A09D94;
          padding: 3px 0;
          font-size: 13px;
          cursor: pointer;
          text-align: left;
          transition: color 0.18s ease;
          display: block;
          width: 100%;
        }

        .footer-nav-link:hover {
          color: #FFFFFF;
        }

        .footer-bottom-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          font-size: 12.5px;
        }

        .footer-bottom-link {
          cursor: pointer;
          color: #A09D94;
          transition: color 0.18s ease;
        }

        .footer-bottom-link:hover {
          color: #FFFFFF;
        }

        .footer-bottom-link.gold {
          color: var(--accent-gold);
          font-weight: 600;
        }

        .footer-link-dot {
          color: #4D504B;
          font-size: 11px;
        }

        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 13px;
        }

        .footer-mobile-cta-row {
          display: none;
        }

        /* Desktop Layout (Width > 768px) */
        @media (min-width: 769px) {
          .footer-main-grid {
            display: grid;
            grid-template-columns: 1.25fr 1fr 1fr 1fr;
            gap: 36px;
            padding-bottom: 50px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .footer-accordion-icon {
            display: none !important;
          }

          .footer-accordion-header {
            cursor: default !important;
            padding: 0 !important;
            border-top: none !important;
            margin-bottom: 18px !important;
          }

          .footer-accordion-content {
            display: flex !important;
            flex-direction: column;
          }

          .footer-bottom-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 0 32px;
            font-size: 12px;
            color: #7E7A72;
            flex-wrap: wrap;
            gap: 12px;
          }

          .footer-desktop-wa-container {
            display: block;
          }
        }

        /* Mobile Layout (Width <= 768px) */
        @media (max-width: 768px) {
          .vp-footer-root {
            padding-top: 40px !important;
          }

          .footer-main-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
            padding-bottom: 16px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .footer-brand-col {
            padding-bottom: 22px !important;
          }

          .footer-desktop-phone-link {
            display: none !important;
          }

          .footer-desktop-wa-container {
            display: none !important;
          }

          .footer-mobile-cta-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 18px;
          }

          .footer-mobile-call-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(255, 255, 255, 0.18);
            color: #FFFFFF;
            padding: 10px 12px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            min-height: 44px;
            box-sizing: border-box;
          }

          .footer-mobile-call-btn:active {
            background: rgba(255, 255, 255, 0.12);
          }

          .footer-mobile-wa-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: #25D366;
            border: none;
            color: #FFFFFF;
            padding: 10px 12px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            min-height: 44px;
            box-sizing: border-box;
          }

          .footer-mobile-wa-btn:active {
            background: #1EBE5D;
          }

          .footer-accordion-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 2px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            cursor: pointer !important;
            user-select: none;
          }

          .footer-accordion-header:active {
            background: rgba(255, 255, 255, 0.02);
          }

          .footer-accordion-content {
            display: none;
            padding: 4px 2px 18px 2px;
            animation: footerFade 0.2s ease-out;
          }

          .footer-accordion-content.open {
            display: block !important;
          }

          .footer-nav-list {
            gap: 8px !important;
          }

          .footer-nav-link {
            padding: 6px 0 !important;
            font-size: 13.5px !important;
            min-height: 36px;
            display: flex;
            align-items: center;
          }

          .footer-bottom-bar {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            padding: 20px 0 32px !important;
            font-size: 12px;
          }

          .footer-bottom-links {
            gap: 8px 12px !important;
            line-height: 1.8 !important;
          }

          .footer-link-dot {
            display: none !important;
          }

          .footer-bottom-link {
            display: inline-block;
            background: rgba(255, 255, 255, 0.04);
            padding: 5px 10px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 12px;
          }

          .footer-copyright-text {
            color: #7E7A72;
            font-size: 11.5px;
            line-height: 1.6;
          }
        }

        @keyframes footerFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
}
