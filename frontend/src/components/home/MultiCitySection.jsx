import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Flame,
  Building2
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
      name: 'Pune & PCMC (Headquarters)',
      state: 'Maharashtra',
      badge: 'Verified Resident In-Person',
      badgeType: 'confirmed',
      description: 'VedicPanditji primary hub led by Pandit Jitendra Chaubey with 75+ resident Gurukul Acharyas serving Wakad, Baner, Hinjewadi, Kothrud, Kharadi & Hadapsar.',
      image: '/images/hero-puja.jpg',
      links: [
        { title: 'North Indian Pandit in Pune', slug: 'north-indian-pandit-in-pune', tag: 'HQ 75+ Priests' },
        { title: 'Bihari Pandit in Pune', slug: 'bihari-pandit-in-pune', tag: 'Maithil & Bhojpuri' },
        { title: 'Griha Pravesh Puja in Pune', slug: 'griha-pravesh-puja-in-pune', tag: '10,000+ Blessed' },
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
        { title: 'North Indian Pandit in Mumbai', slug: 'north-indian-pandit-in-mumbai', tag: 'Suburbs & Thane' },
        { title: 'Griha Pravesh Puja in Mumbai', slug: 'griha-pravesh-puja-in-mumbai', tag: 'High-Rise Vidhi' },
        { title: 'Bihari Pandit in Mumbai', slug: 'bihari-pandit-in-mumbai', tag: 'Chhath & Sanskars' },
        { title: 'Satyanarayan Puja in Mumbai', slug: 'satyanarayan-puja-in-mumbai', tag: 'Evening Pradosh' }
      ]
    },
    {
      id: 'Hyderabad',
      name: 'Hyderabad & Cyberabad',
      state: 'Telangana',
      badge: 'Live E-Puja & Visiting Acharyas',
      badgeType: 'hybrid',
      description: 'Dedicated Hindi Vedic services for North Indian families across Hitec City, Gachibowli, Kondapur, Madhapur & Kukatpally.',
      image: '/images/samagri-thali.jpg',
      links: [
        { title: 'North Indian Pandit in Hyderabad', slug: 'north-indian-pandit-in-hyderabad', tag: 'Live Sankalpam' },
        { title: 'Griha Pravesh Puja in Hyderabad', slug: 'griha-pravesh-puja-in-hyderabad', tag: 'Gated Communities' }
      ]
    },
    {
      id: 'Delhi',
      name: 'Delhi & NCR',
      state: 'Delhi NCR',
      badge: 'Live E-Puja & Visiting Acharyas',
      badgeType: 'hybrid',
      description: 'Serving North Indian families across South Delhi, Dwarka, Noida, Gurugram, Rohini & Ghaziabad with authentic Hindi & Sanskrit rituals.',
      image: '/images/hero-puja.jpg',
      links: [
        { title: 'North Indian Pandit in Delhi NCR', slug: 'north-indian-pandit-in-delhi', tag: 'All-India Coverage' },
        { title: 'Griha Pravesh & Vastu Shanti', slug: 'north-indian-pandit-in-delhi', tag: 'Auspicious Muhurat' },
        { title: 'Satyanarayan Katha in Hindi', slug: 'north-indian-pandit-in-delhi', tag: 'Complete Vidhi' },
        { title: 'Rudrabhishek & Hawan', slug: 'north-indian-pandit-in-delhi', tag: 'Vedic Chanting' }
      ]
    },
    {
      id: 'Chennai',
      name: 'Chennai',
      state: 'Tamil Nadu',
      badge: 'Live E-Puja & Visiting Acharyas',
      badgeType: 'hybrid',
      description: 'Serving the North Indian community and diaspora along OMR, Velachery, Anna Nagar, T Nagar & Adyar with Hindi & Sanskrit rituals.',
      image: '/images/bangalore-puja.jpg',
      links: [
        { title: 'North Indian Pandit in Chennai', slug: 'north-indian-pandit-in-chennai', tag: 'Hindi Speaking' },
        { title: 'Griha Pravesh in Chennai', slug: 'north-indian-pandit-in-chennai', tag: 'North Indian Vidhi' },
        { title: 'Satyanarayan Puja in Chennai', slug: 'north-indian-pandit-in-chennai', tag: 'Hindi Katha' },
        { title: 'Vastu Shanti & Hawan', slug: 'north-indian-pandit-in-chennai', tag: 'Pure Samagri' }
      ]
    },
    {
      id: 'Nashik',
      name: 'Nashik & Trimbakeshwar',
      state: 'Maharashtra',
      badge: 'Verified Tirtha Coordination',
      badgeType: 'pilgrimage',
      description: 'Sacred pilgrimage rituals at Kushavarta Kund and Trimbakeshwar Jyotirlinga with authorized hereditary Purohits.',
      image: '/images/temple-service.jpg',
      links: [
        { title: 'Trimbakeshwar Kalsarp Puja Nashik', slug: 'trimbakeshwar-kalsarp-puja-nashik', tag: 'Jyotirlinga Kshetra' }
      ]
    },
    {
      id: 'Online',
      name: 'Online E-Puja (Pan-India & Global)',
      state: 'Worldwide',
      badge: '100% Live Interactive Video',
      badgeType: 'online',
      description: 'Private 2-way HD Zoom ceremonies with personalized Gotra Sankalp and consecrated Prasad courier across India, USA, UK & UAE.',
      image: '/images/aesthetic-pooja.jpg',
      links: [
        { title: 'Online E-Puja Services', slug: 'online-e-puja-services', tag: 'Global Express Prasad' }
      ]
    }
  ];

  const currentCity = cityDirectory.find(c => c.id === activeTab) || cityDirectory[0];

  return (
    <section style={{ padding: '80px 0', background: '#F8F6F0', borderTop: '1px solid #EAE5D9' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              border: '1px solid rgba(189, 75, 35, 0.25)',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#BD4B23',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={13} color="#BD4B23" />
            <span>North Indian Pandit by City • All-India Coverage</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}
          >
            Vedic Pandit Services Across India
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Explore city-specific landing pages tailored for North Indian and Bihari families in <strong>Pune</strong>, <strong>Mumbai</strong>, <strong>Bangalore</strong>, <strong>Delhi-NCR</strong>, <strong>Hyderabad</strong> &amp; <strong>Chennai</strong>.
          </p>
        </div>

        {/* City Tab Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '36px'
          }}
        >
          {cityDirectory.map(city => (
            <button
              key={city.id}
              onClick={() => setActiveTab(city.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                border: activeTab === city.id ? '2px solid #BD4B23' : '1px solid #D8D2C4',
                background: activeTab === city.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                color: activeTab === city.id ? '#BD4B23' : 'var(--text-main)',
                cursor: 'pointer',
                boxShadow: activeTab === city.id ? '0 4px 16px rgba(189, 75, 35, 0.14)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <MapPin size={14} color={activeTab === city.id ? '#BD4B23' : '#8A857A'} />
              <span>{city.id === 'Bangalore' ? 'Bangalore' : city.id === 'Pune' ? 'Pune (HQ)' : city.id === 'Mumbai' ? 'Mumbai' : city.id === 'Hyderabad' ? 'Hyderabad' : city.id === 'Nashik' ? 'Nashik' : 'Online E-Puja'}</span>
            </button>
          ))}
        </div>

        {/* Active City Showcase Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #EAE5D9',
            boxShadow: '0 12px 36px rgba(44, 39, 36, 0.06)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.8fr',
              alignItems: 'stretch'
            }}
            className="city-showcase-grid"
          >
            {/* Left: City Visual & Fulfillment Notice */}
            <div
              style={{
                position: 'relative',
                minHeight: '340px',
                backgroundImage: `url(${currentCity.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#FFFFFF'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(20,18,16,0.85) 100%)'
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: currentCity.badgeType === 'confirmed' ? 'rgba(34, 197, 94, 0.9)' : currentCity.badgeType === 'hybrid' ? 'rgba(217, 119, 6, 0.9)' : 'rgba(29, 78, 216, 0.9)',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}
                >
                  <ShieldCheck size={13} />
                  <span>{currentCity.badge}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  {currentCity.name}
                </h3>

                <p style={{ fontSize: '13px', color: '#E2DFD7', lineHeight: 1.5, marginBottom: '16px' }}>
                  {currentCity.description}
                </p>

                <button
                  onClick={() => navigateTo('seo-landing', { slug: currentCity.links[0].slug })}
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
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                      background: '#FDFCF9',
                      border: '1px solid #EAE5D9',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent-saffron)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(189, 75, 35, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#EAE5D9';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                        <span
                          style={{
                            background: 'rgba(189, 75, 35, 0.08)',
                            color: '#BD4B23',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {link.tag}
                        </span>
                        <ArrowRight size={14} color="#BD4B23" />
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
