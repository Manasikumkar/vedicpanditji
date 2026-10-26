import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/vedicPanditData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

const VEDIC_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Select Ceremony & Consult Shubh Muhurat',
    subtitle: 'Free Muhurat Calculation based on Kundali & Panchang',
    description: 'Choose your desired puja, hawan, or wedding ritual. Share your preferred dates, Gotra, and Nakshatra. Our senior Vedic Acharyas assess your family horoscope to recommend the most auspicious lagna and tithi.'
  },
  {
    step: '02',
    title: 'Customized Vidhi & Transparent Dakshina',
    subtitle: 'No Hidden Fees & Clear Samagri Inclusions',
    description: 'We finalize whether you require complete premium samagri (pure cow ghee, hawan kashtha, dry fruits, fresh flowers) or pandit-only service. You receive a transparent breakdown with zero last-minute surprises.'
  },
  {
    step: '03',
    title: 'Certified Gurukul Pandit Assigned to Your Home',
    subtitle: 'North Indian & Bihari Priests with Hindi & Sanskrit Vidhi',
    description: 'A verified Gurukul-trained pandit conducts your ceremony with pristine Sanskrit shlokas and fluent Hindi Katha, arriving punctually with all requisite sacred paraphernalia and hawan kund.'
  },
  {
    step: '04',
    title: 'Sacred Ritual Conduction & Divine Blessings',
    subtitle: 'Shuddha Sanskrit Mantras with Detailed Meaning',
    description: 'The Acharya guides your entire family through each step—Ganesh Sthapana, Kalash Puja, Navagraha Aradhana, Agni Hotra Hawan, and Purna Ahuti—explaining significance and leaving your abode purified.'
  }
];

const VEDIC_GUARANTEES = [
  {
    title: 'Gurukul-Certified Acharyas',
    desc: 'Trained in authentic Vedic pathashalas and Karmakanda with flawless Sanskrit pronunciation and scriptural mastery.'
  },
  {
    title: '100% Shuddha Hawan Samagri',
    desc: 'Unadulterated ayurvedic herbs, pure desi cow ghee, authentic gangajal, and fresh samagri packed hygienically.'
  },
  {
    title: 'Exact Panchang Shubh Muhurat',
    desc: 'Personalized muhurat calculations aligned with your Janma Rashi, Nakshatra, and family astrological chart.'
  },
  {
    title: 'Doorstep & All-India Service Coverage',
    desc: 'Punctual resident doorstep service across Pune & MMR, with visiting Acharyas and live interactive HD E-Pujas nationwide.'
  }
];

export default function HowWeWorkPage() {
  const { navigateTo, openBookingModal, callHelpline } = useApp();

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '50px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>How We Work</span>
          </div>
          <span className="section-tag">Process &amp; Transparency</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, marginBottom: '14px' }}>
            How VedicPanditji Conducts Your Ceremony
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            We take complete responsibility for your auspicious rituals across India. From Shubh Muhurat astrological calculation and priest assignment to 100% pure Vedic samagri and peaceful hawan conduction.
          </p>
        </div>

        {/* Detailed 4 Steps with Visuals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '70px' }}>
          {VEDIC_PROCESS_STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px',
                border: '1px solid #EAE5D9',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '30px',
                alignItems: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="how-we-work-card"
            >
              {/* Step Badge */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-saffron)'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Step
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800 }}>
                  {step.step}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '10px' }}>
                  {step.subtitle}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Vedic Standards Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <span className="section-tag">Quality Assurance</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700 }}>
              The 4 Core VedicPanditji Guarantees
            </h2>
          </div>

          <div className="grid-2" style={{ gap: '24px' }}>
            {VEDIC_GUARANTEES.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                <CheckCircle2 size={22} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpline CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%)',
            borderRadius: '16px',
            border: '1px solid var(--border-gold)',
            padding: '28px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
              Have questions regarding Shubh Muhurat or Puja Vidhi in Pune?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Consult directly with our senior Vedic Acharyas and coordinators.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openBookingModal(null, null, 'Pune')}
              className="btn-primary"
              style={{ padding: '12px 22px', fontSize: '14px', cursor: 'pointer' }}
            >
              <span>Book a Pandit</span>
            </button>
            <button
              onClick={() => navigateTo('catalogue')}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px', cursor: 'pointer' }}
            >
              <span>Explore Puja Catalogue</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-we-work-card {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
        }
      `}</style>
    </div>
  );
}
