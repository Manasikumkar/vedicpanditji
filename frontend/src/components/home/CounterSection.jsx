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
      color: 'var(--accent-saffron)'
    },
    {
      number: BRAND_INFO.priestsCount,
      label: 'Vedic Priests',
      subtext: 'Pathashala certified North Indian & Bihari scholars',
      icon: Users,
      color: 'var(--accent-gold)'
    },
    {
      number: BRAND_INFO.pujaTypes,
      label: 'Types of Authentic Pujas',
      subtext: 'Griha Pravesh, Havans, Sanskars & Paths',
      icon: BookOpenCheck,
      color: 'var(--accent-saffron)'
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
        borderBottom: '1px solid var(--border-subtle)',
        padding: '48px 0',
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
                  padding: '20px 22px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)'
                }}
                className="counter-item"
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(36, 35, 33, 0.04)'
                  }}
                >
                  <Icon size={25} color={item.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '28px',
                      fontWeight: 800,
                      color: 'var(--text-main)',
                      lineHeight: 1.15
                    }}
                  >
                    {item.number}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-saffron)', marginTop: '2px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .counter-item:hover {
          transform: translateY(-2px);
          border-color: rgba(217, 79, 30, 0.3);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 992px) {
          .counter-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 580px) {
          .counter-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .counter-item {
            padding: 16px 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
