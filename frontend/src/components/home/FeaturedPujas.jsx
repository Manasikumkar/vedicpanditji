import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES, getServiceImage } from '../../data/vedicPanditData';
import {
  Star,
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
            Available across Bangalore, Pune, Mumbai, Hyderabad &amp; Online E-Puja with certified Gurukul-trained North Indian &amp; Bihari pandits and pure Samagri kits.
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

                {/* Rating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                  }}
                >
                  <Star size={13} fill="#EAB308" color="#EAB308" />
                  <span>{service.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({service.reviewsCount})</span>
                </div>

                {/* Category Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    background: 'rgba(217, 79, 30, 0.9)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {service.category}
                </div>

                {/* Title on Image overlay for contrast */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '16px',
                    right: '16px',
                    color: '#FFFFFF'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '4px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
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
                      STARTING DAKSHINA
                    </span>
                    <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                      From ₹{service.minPrice ? service.minPrice.toLocaleString('en-IN') : '2,500'}*
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#047857', fontWeight: 600, background: '#ECFDF5', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
                      <Sparkles size={11} />
                      Package A &amp; B Available
                    </span>
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
          ))}
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
            <span>Browse Full Catalogue (50+ Pujas &amp; Vidhis)</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
