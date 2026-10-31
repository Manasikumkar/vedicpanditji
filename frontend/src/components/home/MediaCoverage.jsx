import React from 'react';
import { ShieldCheck, Award, Star, BookOpen, CheckCircle } from 'lucide-react';

const VEDIC_CREDENTIALS = [
  {
    icon: BookOpen,
    title: 'Experienced Vedic Acharyas',
    tag: 'Authentic Vidhi',
    detail: 'Priests dedicated to Vedic Karmakanda, sacred mantras, and authentic Shastra rituals.'
  },
  {
    icon: Star,
    title: 'Hindi & Sanskrit Mantras',
    tag: 'Scriptural Fidelity',
    detail: 'Authentic Sanskrit Vedic recitation paired with clear, heartwarming Hindi Katha explanation.'
  },
  {
    icon: Award,
    title: 'Pan-India Service',
    tag: 'Doorstep & E-Puja',
    detail: 'Doorstep purohits across Pune & PCMC, with visiting Acharyas and live interactive E-Pujas nationwide.'
  },
  {
    icon: ShieldCheck,
    title: 'Pure Vedic Samagri Options',
    tag: 'Shuddha & Pavitra',
    detail: 'Devotees can choose all-inclusive packages with pure desi cow ghee, hawan kashtha, and consecrated herbs.'
  },
  {
    icon: CheckCircle,
    title: 'Free Muhurat Guidance',
    tag: 'Panchang Precision',
    detail: 'Our senior Vedic Acharyas calculate accurate Shubh Muhurats based on your birth Nakshatra, Gotra, and Tithi.'
  }
];

export default function MediaCoverage() {
  return (
    <section style={{ padding: '75px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">Trust &amp; Verified Reputation</span>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.015em' }}>
            Why Families Across India Revere VedicPanditji
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '620px', margin: '8px auto 0' }}>
            Built on Vedic principles, transparent guidance, and dedicated Acharyas.
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
                    {cred.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35, marginTop: '4px' }}>
                  {cred.title}
                </h3>

                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {cred.detail}
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
