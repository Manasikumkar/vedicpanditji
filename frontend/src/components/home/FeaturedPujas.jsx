import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES, getServiceImage } from '../../data/vedicPanditData';
import { getPricingDisplay } from '../../data/pujaPricing';
import {
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

export default function FeaturedPujas() {
  const { navigateTo, openBookingModal } = useApp();

  return (
    <section style={{ padding: '85px 0', background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Most Requested Vedic Ceremonies</span>
          <h2 className="section-title">Featured Vedic Pujas &amp; Havans</h2>
          <p className="section-desc">
            Available across Bangalore, Pune, Mumbai, Hyderabad &amp; Online E-Puja with experienced North Indian &amp; Bihari pandits and pure Samagri kits.
          </p>
        </div>

        {/* Featured Service Cards Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {SERVICES.slice(0, 6).map(service => {
            const pricing = getPricingDisplay(service.id);

            return (
              <div
                key={service.id}
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

                  {/* Category Pill Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      zIndex: 1
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: 'var(--accent-saffron)',
                        fontSize: '11px',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-full)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                      }}
                    >
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Duration Overlay at Bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '16px',
                      right: '16px',
                      zIndex: 1
                    }}
                  >
                    <h3
                      onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                      style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: 700,
                        marginBottom: '4px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                        cursor: 'pointer'
                      }}
                    >
                      {service.name}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '12px',
                        color: '#FAF8F4'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} color="#FCD34D" />
                        {service.duration}
                      </span>
                      <span>&bull;</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={12} color="#FCD34D" />
                        {service.tradition?.split('/')[0]?.trim() || 'Vedic Vidhi'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}
                >
                  <p
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    {service.shortDescription}
                  </p>

                  {/* Pricing / Starting Dakshina row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderTop: '1px solid var(--border-subtle)',
                      marginBottom: '16px'
                    }}
                  >
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {pricing.priceLabel ? pricing.priceLabel.toUpperCase() : (pricing.hasPackages ? 'STARTING DAKSHINA' : 'DAKSHINA')}
                      </span>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '2px' }}>
                        {pricing.displayPrice}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {pricing.badgeText ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          color: pricing.model === 'fixed-price'
                            ? '#BD4B23'
                            : (pricing.packageCount === 3 ? '#1E40AF' : '#047857'),
                          fontWeight: 600,
                          background: pricing.model === 'fixed-price'
                            ? 'var(--accent-saffron-light)'
                            : (pricing.packageCount === 3 ? '#EFF6FF' : '#ECFDF5'),
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)'
                        }}>
                          <Sparkles size={11} />
                          {pricing.badgeText}
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--accent-saffron)', fontWeight: 600, background: 'var(--accent-saffron-light)', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
                          <Sparkles size={11} />
                          Custom Shastra Vidhi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '10px' }} className="card-action-btns">
                    <button
                      onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                      className="btn-secondary"
                      style={{
                        padding: '10px 14px',
                        fontSize: '13px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      <span>Details</span>
                      <ArrowRight size={13} />
                    </button>

                    <button
                      onClick={() => openBookingModal(service)}
                      className="btn-primary"
                      style={{
                        padding: '10px 16px',
                        fontSize: '13px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      <CalendarCheck size={14} />
                      <span>Book Puja</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Pujas Bottom Link */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => navigateTo('catalogue')}
            className="btn-secondary"
            style={{
              padding: '13px 32px',
              fontSize: '14.5px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span>Browse Full Catalogue (59 Vedic Ceremonies)</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
