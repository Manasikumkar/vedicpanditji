import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, SERVICE_CATEGORIES, CITIES, BRAND_INFO, getServiceImage } from '../data/vedicPanditData';
import { getPricingDisplay } from '../data/pujaPricing';
import {
  Search,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Package
} from 'lucide-react';

export default function CataloguePage() {
  const {
    navigateTo,
    openBookingModal,
    selectedCity,
    setSelectedCity,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const initialCityName = typeof selectedCity === 'object' && selectedCity !== null ? selectedCity.name : (selectedCity || 'All Cities');
  const [targetCity, setTargetCity] = useState(initialCityName);
  const [sortBy, setSortBy] = useState('popularity');

  const displayCity = typeof targetCity === 'object' && targetCity !== null ? targetCity.name : (targetCity || 'All Cities');

  // Filter & Sort with centralized pricing
  const filteredServices = SERVICES.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;

    const matchesSearch = !searchTerm ||
                          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const pricingA = getPricingDisplay(a.id);
    const pricingB = getPricingDisplay(b.id);
    if (sortBy === 'price-low') return (pricingA.minPrice || 999999) - (pricingB.minPrice || 999999);
    if (sortBy === 'price-high') return (pricingB.minPrice || 0) - (pricingA.minPrice || 0);
    return (a.name || '').localeCompare(b.name || '');
  });

  const getCategoryCount = (catId) => {
    if (catId === 'all') return SERVICES.length;
    return SERVICES.filter(s => s.category === catId).length;
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Catalogue &amp; Pujas</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
                Vedic Pooja &amp; Ceremony Catalogue
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                Book verified North Indian Pandits for authentic rituals across {displayCity === 'All Cities' ? 'Pune, Mumbai, Bangalore, Hyderabad, Delhi, Chennai & all over India' : displayCity} with pure Vedic Samagri.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#FFFFFF', padding: '6px 14px', borderRadius: '30px', border: '1px solid #EAE5D9', fontSize: '12px', fontWeight: 600, color: 'var(--accent-gold)' }}>
              <Sparkles size={14} />
              <span>59 Vedic Ceremonies &bull; {displayCity}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid #EAE5D9',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* Search Input & Selectors Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '16px',
              alignItems: 'center'
            }}
            className="catalogue-filter-row"
          >
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search pujas (e.g., Satyanarayan, Griha Pravesh, Vastu, Rudrabhishek, Havans)..."
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid #DDD7C8',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>

            {/* City Selector */}
            <div>
              <select
                value={displayCity}
                onChange={e => {
                  const val = e.target.value;
                  setTargetCity(val);
                  if (setSelectedCity) {
                    const matched = CITIES.find(c => c.name.toLowerCase() === val.toLowerCase());
                    if (matched) setSelectedCity(matched);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #DDD7C8',
                  background: 'var(--bg-primary)',
                  fontWeight: 600
                }}
              >
                <option value="All Cities">📍 All Cities (Pan-India)</option>
                <option value="Pune">📍 Pune &amp; PCMC (HQ)</option>
                <option value="Mumbai">📍 Mumbai &amp; Thane (MMR)</option>
                <option value="Bangalore">📍 Bangalore</option>
                <option value="Delhi">📍 Delhi NCR</option>
                <option value="Hyderabad">📍 Hyderabad</option>
                <option value="Chennai">📍 Chennai</option>
                <option value="Nashik">📍 Nashik / Trimbakeshwar</option>
                <option value="Online">📍 Online Live E-Puja (Pan-India)</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #DDD7C8',
                  background: 'var(--bg-primary)',
                  fontWeight: 600
                }}
              >
                <option value="popularity">All Ceremonies (A-Z)</option>
                <option value="price-low">Indicative Dakshina: Low to High</option>
                <option value="price-high">Indicative Dakshina: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedCategory === 'all' ? 'var(--accent-saffron)' : '#F4EFE6',
                color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-main)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <span>All Ceremonies</span>
              <span style={{
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '10px',
                background: selectedCategory === 'all' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)'
              }}>
                {getCategoryCount('all')}
              </span>
            </button>
            {SERVICE_CATEGORIES.map(cat => {
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    background: selectedCategory === cat.id ? 'var(--accent-saffron)' : '#F4EFE6',
                    color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--text-main)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span style={{
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: selectedCategory === cat.id ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)'
                    }}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredServices.length}</strong> ceremonies for <strong>{displayCity}</strong>
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-saffron)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear category filter
            </button>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {filteredServices.map(service => {
            const pricing = getPricingDisplay(service.id);

            // Determine badge style
            let badgeBg = 'rgba(4, 120, 87, 0.92)'; // Green for 2-pkg
            if (pricing.model === 'fixed-price') {
              badgeBg = 'rgba(189, 75, 35, 0.94)'; // Saffron for fixed
            } else if (pricing.packageCount === 3) {
              badgeBg = 'rgba(30, 64, 175, 0.92)'; // Royal blue for 3-pkg options
            }

            return (
              <div
                key={service.id}
                className="card-premium"
                style={{
                  borderRadius: '18px',
                  border: '1px solid #EAE5D9',
                  background: '#FFFFFF',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Image banner */}
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

                  {/* Top package indicator badge */}
                  {pricing.badgeText && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: badgeBg,
                        color: '#FFFFFF',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      <Package size={12} />
                      <span>{pricing.badgeText}</span>
                    </div>
                  )}

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

                {/* Body */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {service.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px', flex: 1 }}>
                    {service.shortDescription}
                  </p>

                  <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {service.keyInsights?.slice(0, 2).map((ins, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          fontSize: '12px',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <CheckCircle2 size={13} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{ins}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid #EAE5D9',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {pricing.priceLabel || (pricing.hasPackages ? 'Starting Dakshina' : 'Dakshina')}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '2px' }}>
                        {pricing.displayPrice}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => navigateTo('service-detail', { serviceId: service.id })}
                        className="btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => openBookingModal(service.name)}
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        <span>Enquire</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .catalogue-filter-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
