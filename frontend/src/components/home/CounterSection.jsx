import React from 'react';
import { Flame, Users, BookOpenCheck, Star } from 'lucide-react';
import { BRAND_INFO } from '../../data/vedicPanditData';

export default function CounterSection() {
  const stats = [
    {
      number: BRAND_INFO.poojasPerformed,
      label: 'Poojas Performed',
      subtext: 'Across Pune households & Maharashtra',
      icon: Flame,
      color: '#BD4B23'
    },
    {
      number: BRAND_INFO.priestsCount,
      label: 'Vedic Priests',
      subtext: 'Pathashala certified North Indian & Bihari scholars',
      icon: Users,
      color: '#C59A3F'
    },
    {
      number: BRAND_INFO.pujaTypes,
      label: 'Types of Authentic Pujas',
      subtext: 'Griha Pravesh, Havans, Sanskars & Paths',
      icon: BookOpenCheck,
      color: '#BD4B23'
    },
    {
      number: `${BRAND_INFO.rating} ★`,
      label: 'Google Customer Rating',
      subtext: `Based on ${BRAND_INFO.reviewsCount}+ verified Google reviews`,
      icon: Star,
      color: '#EAB308'
    }
  ];

  return (
    <section
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EAE5D9',
        padding: '50px 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="counter-grid"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 22px',
                  borderRadius: '16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  transition: 'all 0.3s ease'
                }}
                className="counter-item"
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: '1px solid #EAE5D9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  <Icon size={26} color={item.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: 'var(--text-main)',
                      lineHeight: 1.1
                    }}
                  >
                    {item.number}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#BD4B23', marginTop: '2px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
