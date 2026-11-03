import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';

export default function MultiCitySection() {
  const { navigateTo } = useApp();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('Bangalore');

  const cityDirectory = [
    {
      id: 'Bangalore',
      name: 'Bangalore (Bengaluru)',
      state: 'Karnataka',
      badge: t('home.cities.badge-live-visiting-acharyas'),
      badgeType: 'hybrid',
      description: t('home.cities.bangalore-description'),
      image: '/images/bangalore-puja.jpg',
      links: [
        { title: t('home.cities.link-north-indian-pandit', { city: 'Bangalore' }), slug: 'north-indian-pandit-in-bangalore', tag: t('home.cities.tag-high-demand') },
        { title: t('home.cities.link-griha-pravesh-puja', { city: 'Bangalore' }), slug: 'griha-pravesh-puja-in-bangalore', tag: t('home.cities.tag-most-popular') },
        { title: t('home.cities.link-satyanarayan-puja', { city: 'Bangalore' }), slug: 'satyanarayan-puja-in-bangalore', tag: t('home.cities.tag-hindi-katha') },
        { title: t('home.cities.link-bihari-pandit', { city: 'Bangalore' }), slug: 'bihari-pandit-in-bangalore', tag: t('home.cities.tag-chhath-vivah') },
        { title: t('home.cities.link-vastu-shanti-puja', { city: 'Bangalore' }), slug: 'vastu-shanti-puja-in-bangalore', tag: t('home.cities.tag-apartment-vastu') },
        { title: t('home.cities.link-hindu-wedding-pandit', { city: 'Bangalore' }), slug: 'hindu-wedding-pandit-in-bangalore', tag: t('home.cities.tag-destination-vivah') }
      ]
    },
    {
      id: 'Pune',
      name: 'Pune & PCMC Hub',
      state: 'Maharashtra',
      badge: t('home.cities.badge-verified-doorstep-in-person'),
      badgeType: 'confirmed',
      description: t('home.cities.pune-description'),
      image: '/images/hero-puja.jpg',
      links: [
        { title: t('home.cities.link-north-indian-pandit', { city: 'Pune' }), slug: 'north-indian-pandit-in-pune', tag: t('home.cities.tag-pune-doorstep') },
        { title: t('home.cities.link-bihari-pandit', { city: 'Pune' }), slug: 'bihari-pandit-in-pune', tag: t('home.cities.tag-maithil-bhojpuri') },
        { title: t('home.cities.link-griha-pravesh-puja', { city: 'Pune' }), slug: 'griha-pravesh-puja-in-pune', tag: t('home.cities.tag-most-popular') },
        { title: t('home.cities.link-satyanarayan-puja', { city: 'Pune' }), slug: 'satyanarayan-puja-in-pune', tag: t('home.cities.tag-complete-katha') },
        { title: t('home.cities.link-vastu-shanti-puja', { city: 'Pune' }), slug: 'vastu-shanti-puja-in-pune', tag: t('home.cities.tag-havan-included') },
        { title: t('home.cities.link-hindu-wedding-pandit', { city: 'Pune' }), slug: 'hindu-wedding-pandit-in-pune', tag: t('home.cities.tag-full-vivah-sanskar') }
      ]
    },
    {
      id: 'Mumbai',
      name: 'Mumbai, Thane & Navi Mumbai',
      state: 'Maharashtra',
      badge: t('home.cities.badge-verified-in-person-service'),
      badgeType: 'confirmed',
      description: t('home.cities.mumbai-description'),
      image: '/images/mandap-altar.jpg',
      links: [
        { title: t('home.cities.link-north-indian-pandit', { city: 'Mumbai' }), slug: 'north-indian-pandit-in-mumbai', tag: t('home.cities.tag-express-travel') },
        { title: t('home.cities.link-bihari-pandit', { city: 'Mumbai' }), slug: 'bihari-pandit-in-mumbai', tag: t('home.cities.tag-vedic-rituals') },
        { title: t('home.cities.link-griha-pravesh-puja', { city: 'Mumbai' }), slug: 'griha-pravesh-puja-in-mumbai', tag: t('home.cities.tag-mmr-region') },
        { title: t('home.cities.link-satyanarayan-puja', { city: 'Mumbai' }), slug: 'satyanarayan-puja-in-mumbai', tag: t('home.cities.tag-shubh-muhurat') },
        { title: t('home.cities.link-vastu-shanti-puja', { city: 'Mumbai' }), slug: 'vastu-shanti-puja-in-mumbai', tag: t('home.cities.tag-flats-villas') },
        { title: t('home.cities.link-hindu-wedding-pandit', { city: 'Mumbai' }), slug: 'hindu-wedding-pandit-in-mumbai', tag: t('home.cities.tag-vedic-wedding') }
      ]
    },
    {
      id: 'Delhi',
      name: 'Delhi-NCR (Gurgaon & Noida)',
      state: 'Delhi NCR',
      badge: t('home.cities.badge-visiting-acharyas-live'),
      badgeType: 'hybrid',
      description: t('home.cities.delhi-description'),
      image: '/images/special-corporate.jpg',
      links: [
        { title: t('home.cities.link-north-indian-pandit', { city: 'Delhi' }), slug: 'north-indian-pandit-in-delhi', tag: t('home.cities.tag-ncr-wide') },
        { title: t('home.cities.link-griha-pravesh-puja', { city: 'Delhi' }), slug: 'griha-pravesh-puja-in-delhi', tag: t('home.cities.tag-popular') },
        { title: t('home.cities.link-satyanarayan-puja', { city: 'Delhi' }), slug: 'satyanarayan-puja-in-delhi', tag: t('home.cities.tag-purnima-katha') },
        { title: t('home.cities.link-bihari-pandit', { city: 'Delhi' }), slug: 'bihari-pandit-in-delhi', tag: t('home.cities.tag-sanskrit-vidhi') },
        { title: t('home.cities.link-vastu-shanti-puja', { city: 'Delhi' }), slug: 'vastu-shanti-puja-in-delhi', tag: t('home.cities.tag-commercial-home') },
        { title: t('home.cities.link-hindu-wedding-pandit', { city: 'Delhi' }), slug: 'hindu-wedding-pandit-in-delhi', tag: t('home.cities.tag-lagna-vidhi') }
      ]
    },
    {
      id: 'Hyderabad',
      name: 'Hyderabad & Secunderabad',
      state: 'Telangana',
      badge: t('home.cities.badge-live-visiting-pandit'),
      badgeType: 'hybrid',
      description: t('home.cities.hyderabad-description'),
      image: '/images/category-festival.jpg',
      links: [
        { title: t('home.cities.link-north-indian-pandit', { city: 'Hyderabad' }), slug: 'north-indian-pandit-in-hyderabad', tag: t('home.cities.tag-hindi-purohit') },
        { title: t('home.cities.link-griha-pravesh-puja', { city: 'Hyderabad' }), slug: 'griha-pravesh-puja-in-hyderabad', tag: t('home.cities.tag-apartments') },
        { title: t('home.cities.link-satyanarayan-puja', { city: 'Hyderabad' }), slug: 'satyanarayan-puja-in-hyderabad', tag: t('home.cities.tag-katha-havan') },
        { title: t('home.cities.link-bihari-pandit', { city: 'Hyderabad' }), slug: 'bihari-pandit-in-hyderabad', tag: t('home.cities.tag-north-traditions') },
        { title: t('home.cities.link-vastu-shanti-puja', { city: 'Hyderabad' }), slug: 'vastu-shanti-puja-in-hyderabad', tag: t('home.cities.tag-dosha-nivaran') },
        { title: t('home.cities.link-hindu-wedding-pandit', { city: 'Hyderabad' }), slug: 'hindu-wedding-pandit-in-hyderabad', tag: t('home.cities.tag-saptapadi') }
      ]
    },
    {
      id: 'Chennai',
      name: 'Chennai & Tamil Nadu',
      state: 'Tamil Nadu',
      badge: t('home.cities.badge-live-visiting-acharyas'),
      badgeType: 'hybrid',
      description: t('home.cities.chennai-description'),
      image: '/images/category-jaap.jpg',
      links: [
        { title: t('home.cities.link-north-indian-pandit', { city: 'Chennai' }), slug: 'north-indian-pandit-in-chennai', tag: t('home.cities.tag-omr-city') },
        { title: t('home.cities.link-griha-pravesh-puja', { city: 'Chennai' }), slug: 'griha-pravesh-puja-in-chennai', tag: t('home.cities.tag-north-rituals') },
        { title: t('home.cities.link-satyanarayan-puja', { city: 'Chennai' }), slug: 'satyanarayan-puja-in-chennai', tag: t('home.cities.tag-hindi-vidhi') },
        { title: t('home.cities.link-bihari-pandit', { city: 'Chennai' }), slug: 'bihari-pandit-in-chennai', tag: t('home.cities.tag-pure-sankalp') },
        { title: t('home.cities.link-vastu-shanti-puja', { city: 'Chennai' }), slug: 'vastu-shanti-puja-in-chennai', tag: t('home.cities.tag-vedic-havan') },
        { title: t('home.cities.link-hindu-wedding-pandit', { city: 'Chennai' }), slug: 'hindu-wedding-pandit-in-chennai', tag: t('home.cities.tag-north-vivah') }
      ]
    }
  ];

  const currentCity = cityDirectory.find(c => c.id === activeTab) || cityDirectory[0];

  return (
    <section style={{ padding: '85px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">{t('home.cities.tag')}</span>
          <h2 className="section-title">{t('home.cities.title')}</h2>
          <p className="section-desc">
            {t('home.cities.desc')}
          </p>
        </div>

        {/* City Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '36px'
          }}
        >
          {cityDirectory.map(city => {
            const isActive = city.id === activeTab;
            return (
              <button
                key={city.id}
                onClick={() => setActiveTab(city.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--accent-saffron)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--accent-saffron-gradient)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 14px rgba(217, 79, 30, 0.25)' : 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span>{city.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active City Showcase Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-floating)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.3fr',
              gap: 0
            }}
            className="city-showcase-grid"
          >
            {/* Left: City Info & Photo */}
            <div
              style={{
                position: 'relative',
                minHeight: '340px',
                backgroundImage: `url(${currentCity.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '32px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(28,26,24,0.88) 100%)'
                }}
              />

              <div style={{ position: 'relative', zIndex: 2, color: '#FFFFFF' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(217, 79, 30, 0.95)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '11.5px', fontWeight: 700, marginBottom: '10px' }}>
                  <ShieldCheck size={13} />
                  <span>{currentCity.badge}</span>
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  {currentCity.name}
                </h3>

                <p style={{ fontSize: '13.5px', color: '#FAF8F4', lineHeight: 1.6, marginBottom: '20px' }}>
                  {currentCity.description}
                </p>

                <button
                  onClick={() => navigateTo('catalogue')}
                  className="btn-primary"
                  style={{
                    padding: '9px 18px',
                    fontSize: '13px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{`${t('home.cities.explore')} `}{currentCity.id}{` ${t('home.cities.services')}`}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right: City-Specific SEO Landing Links Grid */}
            <div style={{ padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {`${t('home.cities.high-intent-pages')} (`}{currentCity.links.length})
                </h4>
                <span style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                  {t('home.cities.seo-verified-urls')}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '14px'
                }}
                className="city-links-grid"
              >
                {currentCity.links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateTo('seo-landing', { slug: link.slug })}
                    style={{
                      background: '#FAF8F5',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'var(--transition-smooth)'
                    }}
                    className="city-link-card"
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <span
                          style={{
                            background: 'rgba(217, 79, 30, 0.08)',
                            color: 'var(--accent-saffron)',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {link.tag}
                        </span>
                        <ArrowRight size={14} color="var(--accent-saffron)" />
                      </div>
                      <h5 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35 }}>
                        {link.title}
                      </h5>
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                      /services/{link.slug}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .city-link-card:hover {
          border-color: var(--accent-saffron) !important;
          box-shadow: 0 6px 18px rgba(217, 79, 30, 0.1) !important;
          transform: translateY(-2px);
          background: #FFFFFF !important;
        }

        @media (max-width: 900px) {
          .city-showcase-grid {
            grid-template-columns: 1fr !important;
          }
          .city-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
