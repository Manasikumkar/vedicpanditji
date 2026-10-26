import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CalendarClock,
  UserCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HowItWorksSection() {
  const { openBookingModal } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Select Puja or Enquire',
      subtitle: 'Browse 200+ Pujas & Ceremonies',
      desc: 'Pick your desired ceremony or connect with our team via WhatsApp to discuss your family ritual requirements.',
      icon: Search
    },
    {
      step: '02',
      title: 'Shubh Muhurat Fixing',
      subtitle: 'Panchang & Kundali Calculation',
      desc: 'Pandit Jitendra Chaubey & senior Acharyas calculate the most auspicious tithi and nakshatra timing for you.',
      icon: CalendarClock
    },
    {
      step: '03',
      title: 'Priest & Samagri Assignment',
      subtitle: 'Certified Pathashala Scholars',
      desc: 'A verified North Indian or Bihari priest is assigned with a comprehensive kit of 100% pure Vedic Samagri.',
      icon: UserCheck
    },
    {
      step: '04',
      title: 'Authentic Vidhi & Blessings',
      subtitle: 'Punctual & Devotional Conduction',
      desc: 'Panditji arrives on time, guides your family through every sacred mantra, and performs Agnihotra Havan.',
      icon: Sparkles
    }
  ];

  return (
    <section style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Simple & Transparent Process</span>
          <h2 className="section-title">How VedicPanditji Works</h2>
          <p className="section-desc">
            Organizing an authentic Vedic ritual at your home in Pune is effortless, reverent, and completely reliable.
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
                  borderRadius: '18px',
                  padding: '28px 24px',
                  border: '1px solid #EAE5D9',
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
                      background: 'rgba(189, 75, 35, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#BD4B23'
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '26px',
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
                <div style={{ fontSize: '11px', color: '#BD4B23', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.04em' }}>
                  {step.subtitle}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
