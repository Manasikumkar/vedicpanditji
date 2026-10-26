import React from 'react';
import { ShieldCheck, Award, Star, BookOpen, CheckCircle } from 'lucide-react';
import { BRAND_INFO } from '../../data/vedicPanditData';

const VEDIC_CREDENTIALS = [
  {
    icon: BookOpen,
    title: 'Gurukul Trained Acharyas',
    tag: 'Authentic Vidhi',
    detail: 'Priests certified in Vedic Karmakanda and traditional Shastra rituals from reputed Gurukuls.'
  },
  {
    icon: Star,
    title: '4.9★ Google Rating',
    tag: '260+ Verified Reviews',
    detail: 'Highest rated North Indian & Bihari pandit service in Pune with genuine reviews from satisfied families.'
  },
  {
    icon: Award,
    title: '15+ Years Tradition',
    tag: 'Devotional Trust',
    detail: 'Extensive track record performing Griha Pravesh, Satyanarayan Katha, Vivah, and Maha Havans across Maharashtra.'
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
    <section style={{ padding: '70px 0', background: 'var(--bg-primary)', borderTop: '1px solid #EAE5D9' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">Trust &amp; Verified Reputation</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700 }}>
            Why Pune Devotees Revere VedicPanditji
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', margin: '8px auto 0' }}>
            Built on Vedic principles, transparent guidance, and dedicated Gurukul-trained acharyas.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px'
          }}
          className="media-grid"
        >
          {VEDIC_CREDENTIALS.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '22px 18px',
                  border: '1px solid #EAE5D9',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="media-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(217, 119, 6, 0.1)',
                        color: 'var(--accent-saffron)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                      {cred.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {cred.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {cred.detail}
                  </p>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--accent-saffron)', marginTop: '14px', fontWeight: 600 }}>
                  Verified Commitment ✓
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .media-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .media-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
