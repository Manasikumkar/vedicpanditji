import React from 'react';
import {
  Search,
  CalendarClock,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';

export default function HowItWorksSection() {
  const { t } = useI18n();
  const steps = [
    {
      step: '01',
      title: t('home.how.step1-title'),
      subtitle: t('home.how.step1-subtitle'),
      desc: t('home.how.step1-desc'),
      icon: Search
    },
    {
      step: '02',
      title: t('home.how.step2-title'),
      subtitle: t('home.how.step2-subtitle'),
      desc: t('home.how.step2-desc'),
      icon: CalendarClock
    },
    {
      step: '03',
      title: t('home.how.step3-title'),
      subtitle: t('home.how.step3-subtitle'),
      desc: t('home.how.step3-desc'),
      icon: UserCheck
    },
    {
      step: '04',
      title: t('home.how.step4-title'),
      subtitle: t('home.how.step4-subtitle'),
      desc: t('home.how.step4-desc'),
      icon: Sparkles
    }
  ];

  return (
    <section style={{ padding: '85px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">{t('home.how.tag')}</span>
          <h2 className="section-title">{t('home.how.title')}</h2>
          <p className="section-desc">
            {t('home.how.desc')}
          </p>
        </div>

        {/* 4 Steps Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            position: 'relative'
          }}
          className="how-it-works-grid"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card-premium"
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px 24px',
                  border: '1px solid var(--border-subtle)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Step Number Badge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(217, 79, 30, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-saffron)'
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '24px',
                      fontWeight: 800,
                      color: 'var(--accent-gold)'
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    marginBottom: '4px',
                    color: 'var(--text-main)',
                    lineHeight: 1.3
                  }}
                >
                  {step.title}
                </h3>
                <div style={{ fontSize: '11.5px', color: 'var(--accent-saffron)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.04em' }}>
                  {step.subtitle}
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .how-it-works-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 580px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
