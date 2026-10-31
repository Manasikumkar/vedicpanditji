import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function MultiCitySection() {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('Bangalore');

  const cityDirectory = [
    {
      id: 'Bangalore',
      name: 'Bangalore (Bengaluru)',
      state: 'Karnataka',
      badge: 'Live E-Puja & Visiting Acharyas',
      badgeType: 'hybrid',
      description: 'Serving North Indian & Bihari tech professionals and families in Whitefield, Bellandur, Sarjapur, HSR Layout, Electronic City & Indiranagar.',
      image: '/images/bangalore-puja.jpg',
      links: [
        { title: 'North Indian Pandit in Bangalore', slug: 'north-indian-pandit-in-bangalore', tag: 'High Demand' },
        { title: 'Griha Pravesh Puja in Bangalore', slug: 'griha-pravesh-puja-in-bangalore', tag: 'Most Popular' },
        { title: 'Satyanarayan Puja in Bangalore', slug: 'satyanarayan-puja-in-bangalore', tag: 'Hindi Katha' },
        { title: 'Bihari Pandit in Bangalore', slug: 'bihari-pandit-in-bangalore', tag: 'Chhath & Vivah' },
        { title: 'Vastu Shanti Puja in Bangalore', slug: 'vastu-shanti-puja-in-bangalore', tag: 'Apartment Vastu' },
        { title: 'Hindu Wedding Pandit in Bangalore', slug: 'hindu-wedding-pandit-in-bangalore', tag: 'Destination Vivah' }
      ]
    },
    {
      id: 'Pune',
      name: 'Pune & PCMC Hub',
      state: 'Maharashtra',
      badge: 'Verified Doorstep In-Person',
      badgeType: 'confirmed',
      description: 'VedicPanditji primary hub with doorstep Vedic Purohits serving Wakad, Baner, Hinjawadi, Kothrud, Kharadi & Hadapsar.',
      image: '/images/hero-puja.jpg',
      links: [
        { title: 'North Indian Pandit in Pune', slug: 'north-indian-pandit-in-pune', tag: 'Pune Doorstep' },
        { title: 'Bihari Pandit in Pune', slug: 'bihari-pandit-in-pune', tag: 'Maithil & Bhojpuri' },
        { title: 'Griha Pravesh Puja in Pune', slug: 'griha-pravesh-puja-in-pune', tag: 'Most Popular' },
        { title: 'Satyanarayan Puja in Pune', slug: 'satyanarayan-puja-in-pune', tag: 'Complete Katha' },
        { title: 'Vastu Shanti Puja in Pune', slug: 'vastu-shanti-puja-in-pune', tag: 'Havan Included' },
        { title: 'Hindu Wedding Pandit in Pune', slug: 'hindu-wedding-pandit-in-pune', tag: 'Full Vivah Sanskar' }
      ]
    },
    {
      id: 'Mumbai',
      name: 'Mumbai, Thane & Navi Mumbai',
      state: 'Maharashtra',
      badge: 'Verified In-Person Service',
      badgeType: 'confirmed',
      description: 'Serving Mumbai Western Suburbs, Powai, Thane West, Navi Mumbai & South Mumbai with punctual pandit doorstep transit.',
      image: '/images/mandap-altar.jpg',
      links: [
        { title: 'North Indian Pandit in Mumbai', slug: 'north-indian-pandit-in-mumbai', tag: 'Express Travel' },
        { title: 'Bihari Pandit in Mumbai', slug: 'bihari-pandit-in-mumbai', tag: 'Vedic Rituals' },
        { title: 'Griha Pravesh Puja in Mumbai', slug: 'griha-pravesh-puja-in-mumbai', tag: 'MMR Region' },
        { title: 'Satyanarayan Puja in Mumbai', slug: 'satyanarayan-puja-in-mumbai', tag: 'Shubh Muhurat' },
        { title: 'Vastu Shanti Puja in Mumbai', slug: 'vastu-shanti-puja-in-mumbai', tag: 'Flats & Villas' },
        { title: 'Hindu Wedding Pandit in Mumbai', slug: 'hindu-wedding-pandit-in-mumbai', tag: 'Vedic Wedding' }
      ]
    },
    {
      id: 'Delhi',
      name: 'Delhi-NCR (Gurgaon & Noida)',
      state: 'Delhi NCR',
      badge: 'Visiting Acharyas & Live',
      badgeType: 'hybrid',
      description: 'Doorstep Pandit service & Live E-Puja across Gurgaon, Noida, Greater Noida, Ghaziabad & South Delhi.',
      image: '/images/special-corporate.jpg',
      links: [
        { title: 'North Indian Pandit in Delhi', slug: 'north-indian-pandit-in-delhi', tag: 'NCR Wide' },
        { title: 'Griha Pravesh Puja in Delhi', slug: 'griha-pravesh-puja-in-delhi', tag: 'Popular' },
        { title: 'Satyanarayan Puja in Delhi', slug: 'satyanarayan-puja-in-delhi', tag: 'Purnima Katha' },
        { title: 'Bihari Pandit in Delhi', slug: 'bihari-pandit-in-delhi', tag: 'Sanskrit Vidhi' },
        { title: 'Vastu Shanti Puja in Delhi', slug: 'vastu-shanti-puja-in-delhi', tag: 'Commercial & Home' },
        { title: 'Hindu Wedding Pandit in Delhi', slug: 'hindu-wedding-pandit-in-delhi', tag: 'Lagna Vidhi' }
      ]
    },
    {
      id: 'Hyderabad',
      name: 'Hyderabad & Secunderabad',
      state: 'Telangana',
      badge: 'Live E-Puja & Visiting Pandit',
      badgeType: 'hybrid',
      description: 'Dedicated North Indian rituals for Gachibowli, Hitec City, Kondapur, Madhapur & Kukatpally devotees.',
      image: '/images/category-festival.jpg',
      links: [
        { title: 'North Indian Pandit in Hyderabad', slug: 'north-indian-pandit-in-hyderabad', tag: 'Hindi Purohit' },
        { title: 'Griha Pravesh Puja in Hyderabad', slug: 'griha-pravesh-puja-in-hyderabad', tag: 'Apartments' },
        { title: 'Satyanarayan Puja in Hyderabad', slug: 'satyanarayan-puja-in-hyderabad', tag: 'Katha & Havan' },
        { title: 'Bihari Pandit in Hyderabad', slug: 'bihari-pandit-in-hyderabad', tag: 'North Traditions' },
        { title: 'Vastu Shanti Puja in Hyderabad', slug: 'vastu-shanti-puja-in-hyderabad', tag: 'Dosha Nivaran' },
        { title: 'Hindu Wedding Pandit in Hyderabad', slug: 'hindu-wedding-pandit-in-hyderabad', tag: 'Saptapadi' }
      ]
    },
    {
      id: 'Chennai',
      name: 'Chennai & Tamil Nadu',
      state: 'Tamil Nadu',
      badge: 'Live E-Puja & Visiting Acharyas',
      badgeType: 'hybrid',
      description: 'North Indian & Bihari community rituals in OMR, Velachery, Anna Nagar, T. Nagar & ECR.',
      image: '/images/category-jaap.jpg',
      links: [
        { title: 'North Indian Pandit in Chennai', slug: 'north-indian-pandit-in-chennai', tag: 'OMR & City' },
        { title: 'Griha Pravesh Puja in Chennai', slug: 'griha-pravesh-puja-in-chennai', tag: 'North Rituals' },
        { title: 'Satyanarayan Puja in Chennai', slug: 'satyanarayan-puja-in-chennai', tag: 'Hindi Vidhi' },
        { title: 'Bihari Pandit in Chennai', slug: 'bihari-pandit-in-chennai', tag: 'Pure Sankalp' },
        { title: 'Vastu Shanti Puja in Chennai', slug: 'vastu-shanti-puja-in-chennai', tag: 'Vedic Havan' },
        { title: 'Hindu Wedding Pandit in Chennai', slug: 'hindu-wedding-pandit-in-chennai', tag: 'North Vivah' }
      ]
    }
  ];

  const currentCity = cityDirectory.find(c => c.id === activeTab) || cityDirectory[0];

  return (
    <section style={{ padding: '85px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Multi-City Vedic Coverage</span>
          <h2 className="section-title">Authentic Pujas Across Major Cities</h2>
          <p className="section-desc">
            VedicPanditji offers verified doorstep North Indian &amp; Bihari Pandits across Pune, Mumbai, Bangalore, Delhi-NCR, Hyderabad &amp; Chennai with 100% Shastra compliance.
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
                  <span>Explore {currentCity.id} Services</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right: City-Specific SEO Landing Links Grid */}
            <div style={{ padding: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  City-Specific High Intent Pages ({currentCity.links.length})
                </h4>
                <span style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                  SEO Verified URLs
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
