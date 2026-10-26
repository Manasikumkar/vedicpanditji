import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { BRAND_INFO } from '../../data/vedicPanditData';
import { animateNavbarEntrance } from '../../utils/gsapAnimations';
import {
  Menu,
  X,
  PhoneCall,
  Sparkles,
  User
} from 'lucide-react';

export default function Navbar() {
  const {
    currentRoute,
    navigateTo,
    openBookingModal,
    user
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
    if (route === 'about-us') {
      return currentRoute === 'about-us' || currentRoute === 'about';
    }
    if (route === 'temple-services') {
      return currentRoute === 'temple-services';
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
            title="VedicPanditji - Authentic Vedic Pujas"
          >
            <img
              src="/images/vedicpanditji-logo.png"
              alt="VedicPanditji logo"
              className="vp-brand-logo-img"
            />
          </div>

          {/* 2. CENTER — MAIN NAVIGATION (Home, About Us, Pooja Services, Temple Services, Contact) */}
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
              <span>Pooja Services</span>
              <span className="vp-nav-indicator" />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('temple-services')}
              className={`vp-nav-link ${isNavActive('temple-services') ? 'active' : ''}`}
            >
              <span>Temple Services</span>
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
              title={`Call Acharya Jitendra Chaubey: ${BRAND_INFO.phone}`}
            >
              <PhoneCall size={14} />
              <span className="vp-phone-text">{BRAND_INFO.phone}</span>
            </a>

            {/* Devotee Account / Login Link */}
            <button
              type="button"
              onClick={() => handleNavClick(user?.isLoggedIn ? 'account' : 'auth')}
              className="vp-auth-btn"
              title={user?.isLoggedIn ? `Devotee Account (${user.name || 'Profile'})` : 'Devotee Login / Register'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: user?.isLoggedIn ? 'rgba(189, 75, 35, 0.08)' : 'transparent',
                border: user?.isLoggedIn ? '1px solid rgba(189, 75, 35, 0.3)' : '1px solid #D8D2C4',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 600,
                color: user?.isLoggedIn ? '#BD4B23' : '#4A463F',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={13} color={user?.isLoggedIn ? '#BD4B23' : '#6E6B65'} />
              <span>{user?.isLoggedIn ? (user.name ? user.name.split(' ')[0] : 'My Account') : 'Login'}</span>
            </button>

            {/* Primary Action CTA — Book a Pandit */}
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="vp-book-cta"
            >
              <Sparkles size={14} />
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
                <span>📖 About Us</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('catalogue')}
                className={`vp-drawer-link ${isNavActive('catalogue') ? 'active' : ''}`}
              >
                <span>🪔 Pooja Services</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('temple-services')}
                className={`vp-drawer-link ${isNavActive('temple-services') ? 'active' : ''}`}
              >
                <span>🛕 Temple Services</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className={`vp-drawer-link ${isNavActive('contact') ? 'active' : ''}`}
              >
                <span>📞 Contact</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick(user?.isLoggedIn ? 'account' : 'auth')}
                className={`vp-drawer-link ${isNavActive('account') || isNavActive('auth') ? 'active' : ''}`}
              >
                <span>👤 {user?.isLoggedIn ? 'My Account & Enquiries' : 'Devotee Login / Register'}</span>
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
                <Sparkles size={16} />
                <span>Book a Pandit</span>
              </button>

              <div className="vp-drawer-contact-row">
                <a
                  href={`tel:${BRAND_INFO.phoneClean}`}
                  className="vp-drawer-phone-btn"
                >
                  <PhoneCall size={14} />
                  <span>Call Panditji: {BRAND_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCOPED CLEAN NAVBAR STYLES */}
      <style>{`
        /* Root Sticky Header */
        .vp-navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          background: rgba(253, 251, 247, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(230, 222, 209, 0.7);
        }

        .vp-navbar-scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(44, 39, 36, 0.06);
          border-bottom: 1px solid rgba(226, 218, 204, 0.9);
        }

        /* Layout Container */
        .vp-navbar-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          gap: 20px;
        }

        /* 1. BRAND STYLES */
        .vp-brand {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
        }

        .vp-brand-logo-img {
          height: 48px;
          width: auto;
          max-width: 195px;
          object-fit: contain;
          display: block;
        }

        .vp-brand-logo-img-drawer {
          height: 42px;
          width: auto;
          max-width: 175px;
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
          padding: 8px 6px;
          font-size: 14.5px;
          font-weight: 600;
          color: #383431;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.18s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vp-nav-link:hover {
          color: #BD4B23;
        }

        .vp-nav-link.active {
          color: #BD4B23;
          font-weight: 700;
        }

        .vp-nav-indicator {
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #BD4B23;
          border-radius: 2px;
          transition: width 0.2s ease;
        }

        .vp-nav-link:hover .vp-nav-indicator,
        .vp-nav-link.active .vp-nav-indicator {
          width: 80%;
        }

        /* 3. RIGHT ACTIONS */
        .vp-right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* Direct Helpline Link */
        .vp-phone-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1px solid #E2DCCE;
          color: #BD4B23;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .vp-phone-link:hover {
          border-color: #BD4B23;
          background: #FAF6EF;
        }

        /* Book a Pandit CTA Button */
        .vp-book-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          background: linear-gradient(135deg, #BD4B23 0%, #D45728 100%);
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 3px 12px rgba(189, 75, 35, 0.28);
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .vp-book-cta:hover {
          background: linear-gradient(135deg, #A83F1C 0%, #BD4B23 100%);
          box-shadow: 0 5px 16px rgba(189, 75, 35, 0.38);
          transform: translateY(-1px);
        }

        /* Mobile Hamburger Toggle */
        .vp-mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #292524;
          padding: 6px;
          min-width: 44px;
          min-height: 44px;
          cursor: pointer;
        }

        /* Drawer Overlay */
        .vp-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
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
          border-bottom: 1px solid #EAE5D9;
        }

        .vp-drawer-close {
          background: none;
          border: none;
          color: #78716C;
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
          padding: 13px 16px;
          border-radius: 10px;
          background: none;
          border: none;
          font-size: 15px;
          font-weight: 600;
          color: #383431;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .vp-drawer-link:hover,
        .vp-drawer-link.active {
          background: #FAF6EF;
          color: #BD4B23;
        }

        .vp-drawer-actions {
          padding: 18px 20px 24px;
          border-top: 1px solid #EAE5D9;
          background: #FCFAF7;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vp-drawer-book-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          border-radius: 10px;
          background: linear-gradient(135deg, #BD4B23 0%, #D45728 100%);
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          border: none;
          box-shadow: 0 4px 12px rgba(189, 75, 35, 0.25);
          cursor: pointer;
        }

        .vp-drawer-contact-row {
          display: flex;
          width: 100%;
        }

        .vp-drawer-phone-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #E2DCCE;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          font-weight: 700;
          color: #BD4B23;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .vp-drawer-phone-btn:hover {
          background: #FAF6EF;
          border-color: #BD4B23;
        }

        /* Animations */
        @keyframes vpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes vpSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1200px) {
          .vp-center-nav {
            gap: 18px;
          }
          .vp-nav-link {
            font-size: 14px;
          }
        }

        @media (max-width: 1024px) {
          .vp-center-nav {
            gap: 14px;
          }
          .vp-nav-link {
            font-size: 13.5px;
          }
          .vp-phone-text {
            display: none;
          }
          .vp-phone-link {
            padding: 8px;
            border-radius: 50%;
          }
        }

        @media (max-width: 860px) {
          .vp-center-nav {
            display: none;
          }
          .vp-mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 540px) {
          .vp-navbar-container {
            padding: 0 14px;
            height: 64px;
          }
          .vp-brand-logo-img {
            height: 36px;
            max-width: 140px;
          }
          .vp-phone-link {
            display: none;
          }
          .vp-book-cta {
            padding: 8px 14px;
            font-size: 13px;
            min-height: 40px;
          }
        }

        @media (max-width: 360px) {
          .vp-navbar-container {
            padding: 0 10px;
          }
          .vp-brand-logo-img {
            height: 32px;
            max-width: 120px;
          }
          .vp-book-cta span {
            display: none;
          }
          .vp-book-cta {
            padding: 8px 10px;
            min-height: 38px;
          }
        }
      `}</style>
    </>
  );
}
