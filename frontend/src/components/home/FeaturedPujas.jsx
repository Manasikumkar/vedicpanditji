import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES, BRAND_INFO, getServiceImage } from '../../data/vedicPanditData';
import {
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export default function FeaturedPujas() {
  const { navigateTo, openBookingModal, selectedLocality } = useApp();

  return (
    <section style={{ padding: '90px 0', background: '#FFFFFF', borderTop: '1px solid #EAE5D9' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Most Requested Vedic Ceremonies</span>
          <h2 className="section-title">Featured Vedic Pujas & Havans</h2>
          <p className="section-desc">
            Available across Bangalore, Pune, Mumbai, Hyderabad & Online E-Puja with certified Gurukul-trained North Indian & Bihari pandits and pure Samagri kits.
          </p>
        </div>

        {/* Featured Service Cards Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {SERVICES.slice(0, 6).map(service => (
            <div
              key={service.id}
              className="card-premium"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                border: '1px solid #EAE5D9',
                background: '#FFFFFF',
                overflow: 'hidden'
              }}
            >
              {/* Card Image Banner */}
              <div
                style={{
                  position: 'relative',
                  height: '210px',
                  backgroundImage: `url(${service.image || getServiceImage(service)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)'
                  }}
                />

                {/* Rating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <Star size={13} fill="#EAB308" color="#EAB308" />
                  <span>{service.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                    ({service.reviewsCount})
                  </span>
                </div>

                {/* Duration Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <Clock size={13} />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Category & Tradition Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#BD4B23', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {service.tradition}
                  </span>
                  <span style={{ fontSize: '12px', color: '#7E7A72' }}>
                    Pune
                  </span>
                </div>

                {/* Puja Name */}
                <h3
                  onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 800,
                    marginBottom: '10px',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    lineHeight: 1.3
                  }}
                >
                  {service.name}
                </h3>

                {/* Short Description */}
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
                  {service.shortDescription}
                </p>

                {/* Key Insights List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', background: 'var(--bg-primary)', padding: '12px 14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                  {service.keyInsights.slice(0, 2).map((ins, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={13} color="#BD4B23" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>

                {/* Price Display */}
                <div style={{ marginBottom: '16px', background: '#FDFCF9', padding: '10px 14px', borderRadius: '8px', border: '1px solid #EAE5D9' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Dakshina
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#BD4B23' }}>
                    {service.priceVerified && service.minPrice ? `From ₹${service.minPrice.toLocaleString('en-IN')}*` : 'Custom Quote'}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="card-action-btns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                    className="btn-secondary"
                    style={{ padding: '10px', fontSize: '13px', textAlign: 'center', cursor: 'pointer' }}
                  >
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => openBookingModal(service)}
                    className="btn-primary"
                    style={{ padding: '10px', fontSize: '13px', textAlign: 'center', cursor: 'pointer' }}
                  >
                    <Sparkles size={14} />
                    <span>Book Puja</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Catalogue CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => navigateTo('catalogue')}
            className="btn-secondary"
            style={{ padding: '14px 32px', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <span>View All 200+ Pujas & Havans in Pune</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
