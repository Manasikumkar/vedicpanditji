import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_INFO } from '../../data/vedicPanditData';
import { animateNavbarEntrance } from '../../utils/gsapAnimations';
import {
  Menu,
  X,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

export default function Navbar() {
  const {
    currentRoute,
    navigateTo,
    openBookingModal,
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Animate navbar on mount
  useEffect(() => {
    const tween = animateNavbarEntrance(navRef.current);
    return () => {
      if (tween) tween.kill();
    };
  }, []);

  // Check scroll state for background blur and elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (route, params = {}) => {
    navigateTo(route, params);
    setMobileMenuOpen(false);
  };

  const isNavActive = (route) => {
    if (route === 'catalogue') {
      return currentRoute === 'catalogue' || currentRoute === 'service-detail';
    }
    if (route === 'locations') {
      return currentRoute === 'location-detail';
    }
    if (route === 'puja-guides') {
      return currentRoute === 'puja-guides-hub' || currentRoute === 'puja-guide-detail';
    }
    if (route === 'about-us') {
      return currentRoute === 'about-us' || currentRoute === 'about';
    }
    if (route === 'temple-services') {
      return currentRoute === 'temple-services';
    }
    if (route === 'faqs') {
      return currentRoute === 'faqs';
    }
    if (route === 'contact') {
      return currentRoute === 'contact';
    }
    return currentRoute === route;
  };

  return (
    <>
      <header
        ref={navRef}
        className={`vp-navbar-root ${scrolled ? 'vp-navbar-scrolled' : 'vp-navbar-top'}`}
      >
        <div className="vp-navbar-container">
          
          {/* 1. LEFT — OFFICIAL VEDICPANDITJI LOGO */}
          <div
            onClick={() => handleNavClick('home')}
            className="vp-brand"
            role="button"
            tabIndex={0}
            title="VedicPanditji - Authentic Vedic Pujas Across Major Cities"
          >
            <img
              src="/images/vedicpanditji-logo.png"
              alt="VedicPanditji logo"
              className="vp-brand-logo-img"
            />
          </div>

          {/* 2. CENTER — MAIN NAVIGATION */}
          <nav className="vp-center-nav" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`vp-nav-link ${isNavActive('home') ? 'active' : ''}`}
            >
              <span>Home</span>
              <span className="vp-nav-indicator" />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('about-us')}
              className={`vp-nav-link ${isNavActive('about-us') ? 'active' : ''}`}
            >
              <span>About Us</span>
              <span className="vp-nav-indicator" />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('catalogue')}
              className={`vp-nav-link ${isNavActive('catalogue') ? 'active' : ''}`}
            >
              <span>Ceremonies</span>
              <span className="vp-nav-indicator" />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('location-detail', { slug: 'pandit-in-pune' })}
              className={`vp-nav-link ${isNavActive('locations') ? 'active' : ''}`}
            >
              <span>Locations</span>
              <span className="vp-nav-indicator" />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`vp-nav-link ${isNavActive('contact') ? 'active' : ''}`}
            >
              <span>Contact</span>
              <span className="vp-nav-indicator" />
            </button>
          </nav>

          {/* 3. RIGHT — PRIMARY ACTIONS & PROMINENT BOOKING CTA */}
          <div className="vp-right-actions">
            
            {/* Direct Phone Helpline */}
            <a
              href={`tel:${BRAND_INFO.phoneClean}`}
              className="vp-phone-link"
              title={`Call Vedic Panditji Helpline: ${BRAND_INFO.phone}`}
            >
              <PhoneCall size={13} color="var(--accent-saffron)" />
              <span className="vp-phone-text">{BRAND_INFO.phone}</span>
            </a>

            {/* Primary Action CTA — Book a Pandit */}
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="vp-book-cta"
            >
              <CalendarCheck size={15} />
              <span>Book a Pandit</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="vp-mobile-toggle"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE / TABLET SLIDE-OUT DRAWER */}
      {mobileMenuOpen && (
        <div className="vp-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="vp-drawer-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="vp-drawer-header">
              <div className="vp-brand" onClick={() => handleNavClick('home')}>
                <img
                  src="/images/vedicpanditji-logo.png"
                  alt="VedicPanditji logo"
                  className="vp-brand-logo-img-drawer"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="vp-drawer-close"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="vp-drawer-nav">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`vp-drawer-link ${isNavActive('home') ? 'active' : ''}`}
              >
                <span>🏠 Home</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('about-us')}
                className={`vp-drawer-link ${isNavActive('about-us') ? 'active' : ''}`}
              >
                <span>✨ About Us</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('catalogue')}
                className={`vp-drawer-link ${isNavActive('catalogue') ? 'active' : ''}`}
              >
                <span>🪔 Ceremonies</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('location-detail', { slug: 'pandit-in-pune' })}
                className={`vp-drawer-link ${isNavActive('locations') ? 'active' : ''}`}
              >
                <span>📍 Pune &amp; PCMC Locations</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('faqs')}
                className={`vp-drawer-link ${isNavActive('faqs') ? 'active' : ''}`}
              >
                <span>❓ FAQs</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className={`vp-drawer-link ${isNavActive('contact') ? 'active' : ''}`}
              >
                <span>📞 Contact</span>
              </button>
            </nav>

            {/* Drawer Direct Actions */}
            <div className="vp-drawer-actions">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="vp-drawer-book-btn"
              >
                <CalendarCheck size={16} />
                <span>Book a Pandit</span>
              </button>

              <div className="vp-drawer-contact-row">
                <a
                  href={`tel:${BRAND_INFO.phoneClean}`}
                  className="vp-drawer-contact-link"
                >
                  <PhoneCall size={14} color="var(--accent-saffron)" />
                  <span>Call {BRAND_INFO.phone}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* NAVBAR STYLES */}
      <style>{`
        .vp-navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height, 84px);
          z-index: 1000;
          transition: background-color 0.3s ease, height 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .vp-navbar-top {
          background-color: rgba(251, 247, 240, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(233, 223, 209, 0.6);
        }

        .vp-navbar-scrolled {
          height: var(--header-height-scrolled, 74px);
          background-color: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 20px rgba(36, 35, 33, 0.05);
          border-bottom: 1px solid var(--border-subtle);
        }

        .vp-navbar-container {
          width: 100%;
          max-width: var(--container-max, 1280px);
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* 1. BRAND */
        .vp-brand {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }

        .vp-brand-logo-img {
          height: 46px;
          width: auto;
          max-width: 190px;
          object-fit: contain;
          display: block;
        }

        .vp-brand-logo-img-drawer {
          height: 40px;
          width: auto;
          max-width: 170px;
          object-fit: contain;
          display: block;
        }

        /* 2. CENTER NAVIGATION */
        .vp-center-nav {
          display: flex;
          align-items: center;
          gap: 28px;
          margin: 0 auto;
          white-space: nowrap;
        }

        .vp-nav-link {
          position: relative;
          background: none;
          border: none;
          padding: 8px 4px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-main);
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vp-nav-link:hover {
          color: var(--accent-saffron);
        }

        .vp-nav-link.active {
          color: var(--accent-saffron);
          font-weight: 600;
        }

        .vp-nav-indicator {
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--accent-saffron);
          border-radius: 2px;
          transition: width 0.25s ease;
        }

        .vp-nav-link:hover .vp-nav-indicator,
        .vp-nav-link.active .vp-nav-indicator {
          width: 75%;
        }

        /* 3. RIGHT ACTIONS */
        .vp-right-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Helpline Link Pill */
        .vp-phone-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .vp-phone-link:hover {
          border-color: var(--accent-saffron);
          background: #FAF8F4;
          color: var(--accent-saffron);
        }

        /* Auth Pill */
        .vp-auth-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 7px 14px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .vp-auth-btn:hover {
          border-color: var(--accent-saffron);
          color: var(--accent-saffron);
        }

        /* Book a Pandit CTA Button */
        .vp-book-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 22px;
          border-radius: var(--radius-full);
          background: var(--accent-saffron-gradient);
          color: #FFFFFF;
          font-size: 13.5px;
          font-weight: 700;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 16px rgba(217, 79, 30, 0.32);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .vp-book-cta:hover {
          background: linear-gradient(135deg, #DD4B1A 0%, #C24214 100%);
          box-shadow: 0 6px 20px rgba(217, 79, 30, 0.42);
          transform: translateY(-1.5px);
        }

        /* Mobile Hamburger Toggle */
        .vp-mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-main);
          padding: 6px;
          min-width: 44px;
          min-height: 44px;
          cursor: pointer;
        }

        /* Drawer Overlay */
        .vp-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(36, 35, 33, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
          animation: vpFadeIn 0.2s ease-out;
        }

        .vp-drawer-panel {
          width: 100%;
          max-width: min(320px, 88vw);
          background: #FFFFFF;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -6px 0 25px rgba(0, 0, 0, 0.15);
          animation: vpSlideLeft 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vp-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .vp-drawer-close {
          background: none;
          border: none;
          color: var(--text-muted);
          padding: 6px;
          cursor: pointer;
        }

        .vp-drawer-nav {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .vp-drawer-link {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          background: none;
          border: none;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-main);
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .vp-drawer-link:hover, .vp-drawer-link.active {
          background: var(--accent-saffron-light);
          color: var(--accent-saffron);
        }

        .vp-drawer-actions {
          padding: 18px;
          border-top: 1px solid var(--border-subtle);
          background: #FAF8F4;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vp-drawer-book-btn {
          width: 100%;
          padding: 13px;
          border-radius: var(--radius-full);
          background: var(--accent-saffron-gradient);
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(217, 79, 30, 0.3);
        }

        .vp-drawer-contact-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vp-drawer-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }

        @keyframes vpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes vpSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .vp-center-nav {
            gap: 14px;
          }
          .vp-phone-text {
            display: none;
          }
          .vp-phone-link {
            padding: 7px 10px;
          }
        }

        @media (max-width: 960px) {
          .vp-center-nav {
            display: none;
          }
          .vp-mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .vp-phone-link {
            display: none;
          }
          .vp-auth-btn {
            display: none;
          }
          .vp-book-cta {
            padding: 9px 16px;
            font-size: 12.5px;
          }
        }
      `}</style>
    </>
  );
}
