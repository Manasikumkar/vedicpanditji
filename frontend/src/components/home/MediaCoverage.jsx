import React from 'react';
import { ShieldCheck, Award, Star, BookOpen, CheckCircle } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';

// Keys, translated at render time
const VEDIC_CREDENTIALS = [
  {
    icon: BookOpen,
    titleKey: 'home.media.acharyas-title',
    tagKey: 'home.media.acharyas-tag',
    detailKey: 'home.media.acharyas-detail'
  },
  {
    icon: Star,
    titleKey: 'home.media.mantras-title',
    tagKey: 'home.media.mantras-tag',
    detailKey: 'home.media.mantras-detail'
  },
  {
    icon: Award,
    titleKey: 'home.media.pan-india-title',
    tagKey: 'home.media.pan-india-tag',
    detailKey: 'home.media.pan-india-detail'
  },
  {
    icon: ShieldCheck,
    titleKey: 'home.media.samagri-title',
    tagKey: 'home.media.samagri-tag',
    detailKey: 'home.media.samagri-detail'
  },
  {
    icon: CheckCircle,
    titleKey: 'home.media.muhurat-title',
    tagKey: 'home.media.muhurat-tag',
    detailKey: 'home.media.muhurat-detail'
  }
];

export default function MediaCoverage() {
  const { t } = useI18n();
  return (
    <section style={{ padding: '75px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">{t('home.media.tag')}</span>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.015em' }}>
            {t('home.media.title')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '620px', margin: '8px auto 0' }}>
            {t('home.media.desc')}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '18px'
          }}
          className="media-grid"
        >
          {VEDIC_CREDENTIALS.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <div
                key={i}
                className="card-premium"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  padding: '22px 18px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(217, 79, 30, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-saffron)'
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'var(--accent-saffron)',
                      background: 'var(--accent-saffron-light)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t(cred.tagKey)}
                  </span>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35, marginTop: '4px' }}>
                  {t(cred.titleKey)}
                </h3>

                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {t(cred.detailKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .media-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .media-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .media-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
