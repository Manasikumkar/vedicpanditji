import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n/useI18n';
import { switcherOptions } from '../../i18n/switcher';

export default function LanguageSwitcher() {
  const { lang, currentRoute } = useApp();
  const { t } = useI18n();
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const { options, englishOnly } = switcherOptions({ pathname, route: currentRoute });

  // Nothing to switch between and nothing to explain
  if (options.length < 2 && !englishOnly) return null;

  return (
    <div
      className="vp-lang-switcher"
      role="navigation"
      aria-label={t('switcher.label')}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}
    >
      {options.map((o) => (
        <a
          key={o.code}
          href={o.href}
          hrefLang={o.code}
          lang={o.code}
          aria-current={o.code === lang ? 'true' : undefined}
          style={{
            textDecoration: 'none',
            color: o.code === lang ? '#BD4B23' : '#1A1613',
            fontWeight: o.code === lang ? 700 : 500
          }}
        >
          {o.label}
        </a>
      ))}
      {englishOnly && <span style={{ color: '#6B6558', fontSize: '12px' }}>{t('switcher.english-only')}</span>}
    </div>
  );
}
