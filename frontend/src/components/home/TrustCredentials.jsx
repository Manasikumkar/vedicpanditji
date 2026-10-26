import React from 'react';
import { VEDIC_PILLARS } from '../../data/vedicPanditData';
import {
  GraduationCap,
  Sparkles,
  Languages,
  ClockCheck,
  ShieldCheck,
  Award
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Sparkles,
  Languages,
  ClockCheck
};

export default function TrustCredentials() {
  return (
    <section style={{ padding: '90px 0', background: '#FFFFFF', borderTop: '1px solid #EAE5D9' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Authenticity & Shastra Vidhi</span>
          <h2 className="section-title">The VedicPanditji Standard</h2>
          <p className="section-desc">
            Our network of 75+ certified Gurukul North Indian and Bihari Pandits strictly follows Vedic traditions, authentic Sanskrit mantras, and certified ritual procedures with all-India service coverage.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid-4" style={{ gap: '24px', marginBottom: '50px' }}>
          {VEDIC_PILLARS.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Sparkles;
            return (
              <div
                key={i}
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  border: '1px solid #EAE5D9',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #EAE5D9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-saffron)',
                    marginBottom: '18px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                  }}
                >
                  <Icon size={26} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Guarantee Banner */}
        <div
          className="trust-guarantee-banner"
          style={{
            background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: '18px',
            padding: '30px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--accent-gold)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Award size={28} />
          </div>
          <div style={{ flex: 1, minWidth: 'min(280px, 100%)' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
              100% Satisfaction & Shanti Guarantee
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              If your assigned pandit is late or if samagri is deficient in any way, our dedicated temple relationship managers replace or rectify immediately.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--accent-saffron)',
                background: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '10px',
                border: '1px solid #EAE5D9',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={16} />
              <span>Verified Shastra Standards</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .trust-guarantee-banner {
            padding: 20px 16px !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
