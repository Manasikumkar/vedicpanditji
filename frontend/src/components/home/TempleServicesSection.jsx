import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/vedicPanditData';
import {
  MapPin,
  ArrowRight,
  Video,
  HeartHandshake,
  Building2
} from 'lucide-react';

const SPECIAL_OFFERINGS = [
  {
    id: 'hindu-wedding',
    serviceId: 'vivah-marriage',
    tag: 'Vivah Sanskar',
    title: 'Hindu Wedding Ceremony & Vivah Sanskar',
    location: 'Pune & Destination Weddings',
    image: '/images/special-vivah.jpg',
    description: 'Complete Vedic wedding ceremonies conducted according to North Indian, Bihari, Marwari, or Arya Samaj traditions. Includes Lagna Patrika, Tilak, Mandap Puja, Jai Mala, and Saptapadi.',
    badge: 'Lead Acharya Conduction',
    icon: HeartHandshake,
    actionText: 'Plan Vivah Puja'
  },
  {
    id: 'online-e-puja',
    serviceId: 'online-e-puja',
    tag: 'Worldwide Devotees',
    title: 'Online E-Puja & Live Video Call Hawan',
    location: 'Global / Virtual via Zoom',
    image: '/images/special-epuja.jpg',
    description: 'Perform authentic Vedic Havans, Rudrabhishek, and Dosha Nivarana rituals from the comfort of your home anywhere in the world. Live sankalp taken with your Gotra and Nakshatra.',
    badge: 'Live Virtual Conduction',
    icon: Video,
    actionText: 'Book Online E-Puja'
  },
  {
    id: 'corporate-vastu',
    serviceId: 'office-opening-puja',
    tag: 'Workplace & Business',
    title: 'Office, Shop & Factory Opening Puja',
    location: 'Pune, PCMC & Industrial Belts',
    image: '/images/special-corporate.jpg',
    description: 'Auspicious Muhurat inauguration rituals for shops, business establishments, workplaces, and commercial ventures to invoke blessings for prosperity and success.',
    badge: 'Custom Corporate Muhurat',
    icon: Building2,
    actionText: 'Enquire for Workplace Puja'
  }
];

export default function TempleServicesSection() {
  const { navigateTo, openBookingModal } = useApp();

  const handleCardAction = (item) => {
    if (item.id === 'hindu-wedding') {
      const match = SERVICES.find(s => s.id === 'vivah-marriage');
      if (match) {
        navigateTo('service-detail', { serviceId: 'vivah-marriage' });
      } else {
        openBookingModal('Hindu Wedding & Vivah Sanskar');
      }
    } else if (item.id === 'online-e-puja') {
      const match = SERVICES.find(s => s.id === 'satyanarayan-puja');
      if (match) {
        navigateTo('service-detail', { serviceId: 'satyanarayan-puja', city: 'Online E-Puja' });
      } else {
        openBookingModal('Online E-Puja Consultation');
      }
    } else if (item.id === 'corporate-vastu') {
      const match = SERVICES.find(s => s.id === 'vastu-shanti-puja');
      if (match) {
        navigateTo('service-detail', { serviceId: 'vastu-shanti-puja' });
      } else {
        openBookingModal('Office & Corporate Vastu Shanti');
      }
    }
  };

  return (
    <section style={{ padding: '85px 0', background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Specialized Vidhis</span>
          <h2 className="section-title">Grand Vivah, E-Puja &amp; Corporate Ceremonies</h2>
          <p className="section-desc">
            From royal Vivah Sanskars across destination venues to Live E-Pujas for NRI devotees worldwide and corporate vastu blessings.
          </p>
        </div>

        {/* 3 Offerings Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {SPECIAL_OFFERINGS.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="card-premium"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#FFFFFF',
                  overflow: 'hidden'
                }}
              >
                {/* Image Banner */}
                <div
                  style={{
                    position: 'relative',
                    height: '200px',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(28,26,24,0.72) 100%)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '14px',
                      background: 'rgba(217, 79, 30, 0.95)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {item.tag}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                    }}
                  >
                    <MapPin size={13} color="var(--accent-gold)" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    onClick={() => handleCardAction(item)}
                    style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', cursor: 'pointer', color: 'var(--text-main)' }}
                    className="hover:text-amber-800"
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {item.description}
                  </p>

                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-saffron)', fontSize: '12px', fontWeight: 600 }}>
                      <Icon size={16} />
                      <span>{item.badge}</span>
                    </div>
                    <button
                      onClick={() => handleCardAction(item)}
                      className="btn-outline"
                      style={{ padding: '8px 16px', fontSize: '12.5px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button
            onClick={() => navigateTo('temple-services')}
            className="btn-secondary"
            style={{ padding: '13px 28px', cursor: 'pointer', borderRadius: 'var(--radius-full)' }}
          >
            <span>Explore Pilgrimage &amp; Remote Temple Sevas</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
