import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n/useI18n';
import { LANGUAGES } from '../../i18n/languages';
import { splitLangPrefix, localizePath } from '../../i18n/paths';

export default function LanguageSwitcher({ inDrawer = false }) {
  const { lang } = useApp();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const { path } = splitLangPrefix(pathname);

  const enabledLanguages = Object.values(LANGUAGES).filter((l) => l.enabled);
  const currentLangObj = LANGUAGES[lang] || LANGUAGES.en;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // If only one language is enabled, hide the switcher
  if (enabledLanguages.length < 2) return null;

  const options = enabledLanguages.map((l) => ({
    code: l.code,
    label: l.label,
    name: l.name,
    href: localizePath(path, l.code)
  }));

  // Drawer layout: Clean segmented pill bar
  if (inDrawer) {
    return (
      <div className="vp-lang-switcher vp-drawer-lang-selector" role="navigation" aria-label={t('switcher.label')}>
        <div className="vp-drawer-lang-label">
          <Globe size={13} color="var(--accent-saffron, #BD4B23)" />
          <span>{t('switcher.label')}</span>
        </div>
        <div className="vp-drawer-lang-pills">
          {options.map((o) => {
            const isActive = o.code === lang;
            return (
              <a
                key={o.code}
                href={o.href}
                hrefLang={o.code}
                lang={o.code}
                className={`vp-drawer-lang-pill ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {o.name === 'English' ? 'EN' : o.label}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop layout: Compact modern dropdown
  return (
    <div className="vp-lang-switcher vp-lang-dropdown-container" ref={dropdownRef} role="navigation" aria-label={t('switcher.label')}>
      <button
        type="button"
        className={`vp-lang-btn ${open ? 'active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('switcher.label')}
        title={t('switcher.label')}
      >
        <Globe size={14} className="vp-lang-icon" />
        <span className="vp-lang-current-label">{currentLangObj?.name === 'English' ? 'EN' : currentLangObj?.label}</span>
        <ChevronDown size={12} className={`vp-lang-chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="vp-lang-menu" role="listbox">
          {options.map((o) => {
            const isSelected = o.code === lang;
            return (
              <a
                key={o.code}
                href={o.href}
                hrefLang={o.code}
                lang={o.code}
                role="option"
                aria-selected={isSelected}
                className={`vp-lang-menu-item ${isSelected ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <div className="vp-lang-menu-text">
                  <span className="vp-lang-menu-name">{o.name}</span>
                  <span className="vp-lang-menu-sub">{o.label}</span>
                </div>
                {isSelected && <Check size={14} className="vp-lang-check" />}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        .vp-lang-dropdown-container {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .vp-lang-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle, #EAE5D9);
          border-radius: var(--radius-full, 9999px);
          padding: 7px 12px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main, #1A1613);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          line-height: 1;
        }

        .vp-lang-btn:hover,
        .vp-lang-btn.active {
          border-color: var(--accent-saffron, #BD4B23);
          color: var(--accent-saffron, #BD4B23);
          background: #FAF8F4;
        }

        .vp-lang-icon {
          color: var(--accent-saffron, #BD4B23);
          flex-shrink: 0;
        }

        .vp-lang-current-label {
          font-size: 12.5px;
          font-weight: 600;
        }

        .vp-lang-chevron {
          color: var(--text-muted, #6B6558);
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .vp-lang-chevron.open {
          transform: rotate(180deg);
        }

        .vp-lang-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 165px;
          background: #FFFFFF;
          border: 1px solid #EAE5D9;
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 10px 28px rgba(36, 35, 33, 0.12), 0 2px 8px rgba(36, 35, 33, 0.04);
          z-index: 1200;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: vpLangFadeDown 0.15s ease-out;
        }

        @keyframes vpLangFadeDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .vp-lang-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #1A1613;
          font-size: 13px;
          font-weight: 500;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .vp-lang-menu-item:hover {
          background: #FAF8F4;
          color: var(--accent-saffron, #BD4B23);
        }

        .vp-lang-menu-item.active {
          background: #FFF5EE;
          color: var(--accent-saffron, #BD4B23);
          font-weight: 700;
        }

        .vp-lang-menu-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vp-lang-menu-name {
          font-size: 13px;
        }

        .vp-lang-menu-sub {
          font-size: 11.5px;
          color: var(--text-muted, #8C827A);
        }

        .vp-lang-menu-item.active .vp-lang-menu-sub {
          color: var(--accent-saffron, #BD4B23);
        }

        .vp-lang-check {
          color: var(--accent-saffron, #BD4B23);
          flex-shrink: 0;
        }

        /* Drawer Language Selector Styles */
        .vp-drawer-lang-selector {
          padding: 12px 16px;
          background: #FAF8F4;
          border-bottom: 1px solid var(--border-subtle, #EAE5D9);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .vp-drawer-lang-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted, #6B6558);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .vp-drawer-lang-pills {
          display: flex;
          gap: 6px;
        }

        .vp-drawer-lang-pill {
          flex: 1;
          text-align: center;
          padding: 7px 4px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid var(--border-subtle, #EAE5D9);
          background: #FFFFFF;
          color: var(--text-main, #1A1613);
          transition: all 0.2s ease;
        }

        .vp-drawer-lang-pill:hover {
          border-color: var(--accent-saffron, #BD4B23);
          color: var(--accent-saffron, #BD4B23);
        }

        .vp-drawer-lang-pill.active {
          background: var(--accent-saffron, #BD4B23);
          color: #FFFFFF;
          border-color: var(--accent-saffron, #BD4B23);
          box-shadow: 0 2px 8px rgba(189, 75, 35, 0.25);
        }
      `}</style>
    </div>
  );
}
