import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/vedicPanditData';
import {
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
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
    tag: 'Commercial & Corporate',
    title: 'Office & Factory Opening Vastu Puja',
    location: 'Pune, PCMC & Industrial Belts',
    image: '/images/special-corporate.jpg',
    description: 'Auspicious Muhurat inauguration rituals for corporate offices, IT parks, retail showrooms, and industrial plants. Removes negative energy and invites Mahalakshmi prosperity.',
    badge: 'Custom Corporate Muhurat',
    icon: Building2,
    actionText: 'Inquire Corporate Puja'
  }
];

export default function TempleServicesSection() {
  const { navigateTo, openBookingModal, openWhatsAppEnquiry } = useApp();

  const handleCardAction = (item) => {
    if (item.id === 'hindu-wedding') {
      const match = SERVICES.find(s => s.id === 'vivah-marriage');
      if (match) {
        navigateTo('service-detail', { serviceId: 'vivah-marriage' });
      } else {
        openBookingModal('Vivah (Marriage) Ceremony');
      }
    } else if (item.id === 'online-e-puja') {
      openBookingModal(null, null, 'Online E-Puja (Pan-India & Global)');
    } else if (item.id === 'corporate-vastu') {
      const match = SERVICES.find(s => s.id === 'office-opening-puja');
      if (match) {
        navigateTo('service-detail', { serviceId: 'office-opening-puja' });
      } else {
        openBookingModal('Office Opening / Business Inauguration Puja');
      }
    } else {
      navigateTo('catalogue');
    }
  };

  return (
    <section style={{ padding: '90px 0', background: '#FFFFFF', borderTop: '1px solid #EAE5D9' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Specialized Ceremonies &amp; E-Pujas</span>
          <h2 className="section-title">Special Vivah &amp; Dedicated Vedic Offerings</h2>
          <p className="section-desc">
            In addition to domestic household pujas, VedicPanditji provides specialized multi-day wedding ceremony planning, corporate office inaugurations, and worldwide online E-Pujas.
          </p>
        </div>

        {/* Special Services Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {SPECIAL_OFFERINGS.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="card-premium"
                style={{
                  borderRadius: '18px',
                  border: '1px solid #EAE5D9',
                  background: '#FFFFFF',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Image banner */}
                <div
                  onClick={() => handleCardAction(item)}
                  style={{
                    height: '200px',
                    position: 'relative',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer'
                  }}
                  title={`View details for ${item.title}`}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '14px',
                      background: 'rgba(217, 119, 6, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
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
                      gap: '4px',
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
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    onClick={() => handleCardAction(item)}
                    style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', cursor: 'pointer' }}
                    className="hover:text-amber-800"
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '20px', flex: 1 }}>
                    {item.description}
                  </p>

                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid #EAE5D9',
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
                      style={{ padding: '8px 16px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button
            onClick={() => navigateTo('temple-services')}
            className="btn-secondary"
            style={{ padding: '12px 28px', cursor: 'pointer' }}
          >
            <span>Explore Pilgrimage &amp; Remote Temple Sevas</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
