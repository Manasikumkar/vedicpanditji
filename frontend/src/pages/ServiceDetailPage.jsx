import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, getServiceImage } from '../data/vedicPanditData';
import { getPricingDisplay } from '../data/pujaPricing';
import PricingPackagesSection from '../components/pricing/PricingPackagesSection';
import {
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Share2,
  Package,
  Check,
  CalendarCheck
} from 'lucide-react';

export default function ServiceDetailPage() {
  const { routeParams, navigateTo, openBookingModal, showToast, selectedCity } = useApp();

  // Find service from params or fallback
  const serviceId = routeParams?.serviceId || 'satyanarayan-puja';
  const service = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const [activeTab, setActiveTab] = useState('significance'); // 'significance', 'vidhi', 'samagri', 'timing', 'faqs'
  const [selectedCityName, setSelectedCityName] = useState(
    routeParams?.city || (typeof selectedCity === 'string' ? selectedCity : selectedCity?.name || 'Pune')
  );

  const pricingDisplay = getPricingDisplay(service.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ceremony link copied to clipboard!');
    }
  };

  // Contextual timing suggestions based on category & service
  const getTimingContext = () => {
    const sId = service.id || '';
    if (sId.includes('griha-pravesh')) {
      return {
        bestDays: 'Auspicious Shubh Muhurat determined from Panchang (Vrishabha, Mithuna, Kanya, Dhanu Lagna)',
        timing: 'Morning hours during Shukla Paksha before shifting belongings or staying overnight',
        notes: 'Both husband and wife participate as Yajamans. Auspicious nakshatras like Rohini, Mrigashira, Uttara Phalguni, Chitra, and Anuradha are preferred.'
      };
    }
    if (sId.includes('satyanarayan')) {
      return {
        bestDays: 'Purnima (Full Moon Day), Ekadashi, Sankranti, Thursdays, or Saturdays',
        timing: 'Predominantly conducted during evening Pradosh time or auspicious morning hours',
        notes: 'Ideal for celebrating new beginnings, housewarmings, weddings, birthdays, anniversaries, and fulfilling vows (Manokamna).'
      };
    }
    if (sId.includes('vastu-shanti')) {
      return {
        bestDays: 'Shubh Tithi prior to moving or during auspicious solar transits',
        timing: 'Morning hours during favorable planetary Lagna',
        notes: 'Recommended whenever moving into a new flat/plot, undertaking renovations, or to pacify directional energies.'
      };
    }
    if (sId.includes('rudrabhishek')) {
      return {
        bestDays: 'Mondays, Pradosh Vrat days, Masa Shivratri, Maha Shivratri, or any day in Shravan Maas',
        timing: 'Morning Brahma Muhurat or Pradosh Kaal (evening)',
        notes: 'Lord Shiva is pleased with Abhishek offerings of raw milk, gangajal, honey, belpatra, and sacred bhasma.'
      };
    }
    if (service.category === 'havans') {
      return {
        bestDays: 'Shukla Paksha mornings, Sundays/Tuesdays for Ganapathi/Navagraha, or festival periods',
        timing: 'Morning hours (Surya Udaya Kaal) for optimal Agnihotra purification',
        notes: 'Conducted with sacred mango wood and pure herbal hawan samagri to disperse positive spiritual vibrations.'
      };
    }
    if (service.category === 'pitru-pujas') {
      return {
        bestDays: 'Pitru Paksha (Mahalaya), Amavasya, or Annual Death Anniversary (Barsi)',
        timing: 'Aparahna Kaal (afternoon 11:30 AM to 02:30 PM)',
        notes: 'Performed with black sesame (Kala Til), Kusha grass, and pure water for ancestral peace and pitru tripti.'
      };
    }
    return {
      bestDays: 'Auspicious days based on family Nakshatra and Gotra',
      timing: 'Morning or Evening Sandhya Muhurat',
      notes: 'Our senior Acharyas review your family Janma Kundali to recommend the optimal date and Lagna.'
    };
  };

  const timingInfo = getTimingContext();

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            style={{ color: 'inherit', textDecoration: 'none' }}
            className="hover:text-amber-800"
          >
            Home
          </a>
          {' / '}
          <a
            href="/services"
            onClick={(e) => { e.preventDefault(); navigateTo('catalogue'); }}
            style={{ color: 'inherit', textDecoration: 'none' }}
            className="hover:text-amber-800"
          >
            Ceremonies
          </a>
          {' / '}
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{service.name}</span>
        </nav>

        {/* ======================================================== */}
        {/* 1. TOP SUMMARY GRID (Hero, Title, Inclusions & CTAs) */}
        {/* ======================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '40px',
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
          className="service-detail-top-grid"
        >
          {/* Left Column: Image Banner */}
          <div>
            <div
              className="service-detail-img-box"
              style={{
                width: '100%',
                height: '380px',
                borderRadius: '16px',
                backgroundImage: `url(${service.image || getServiceImage(service)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleShare}
                title="Share this service"
              >
                <Share2 size={16} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                  <MapPin size={15} color="var(--accent-gold)" />
                  <span>Doorstep Service across {selectedCityName} &amp; Metro Hubs</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div
              style={{
                marginTop: '20px',
                background: 'var(--bg-primary)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #EAE5D9',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                <span>Experienced North Indian &amp; Bihari Pandits under Senior Vedic Acharyas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Package size={16} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                <span>100% pure Vedic Hawan Samagri &amp; cow ghee options included</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Clock size={16} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                <span>Personalized Shubh Muhurat consultation by horoscope &amp; Nakshatra</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Dakshina, Inclusions & Booking Action */}
          <div>
            <div className="badge-saffron" style={{ marginBottom: '10px' }}>
              <Sparkles size={12} />
              <span>Authentic Vedic Ritual &bull; {service.category?.toUpperCase() || 'CEREMONY'}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-main)' }}>
              {service.name}
            </h1>

            {/* Dakshina Range / Custom Quote Display */}
            <div
              style={{
                background: 'var(--bg-primary)',
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid #EAE5D9',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Dakshina:
              </span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                {pricingDisplay.displayPrice}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {pricingDisplay.hasPackages
                  ? '(Indicative starting dakshina • Confirmed on Muhurat review)'
                  : '(Based on requirements, duration, pandits & location)'}
              </span>
            </div>

            {/* Short Description */}
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {service.shortDescription}
            </p>

            {/* Key Insights & Our Promise */}
            <div className="grid-2" style={{ gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#FDFCF9', padding: '14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-saffron)' }}>
                  Key Ritual Insights:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', padding: 0, margin: 0 }}>
                  {service.keyInsights?.slice(0, 3).map((ins, i) => (
                    <li key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-saffron)' }}>•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#FDFCF9', padding: '14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-gold)' }}>
                  Our Vedic Promise:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', padding: 0, margin: 0 }}>
                  {service.ourPromise?.slice(0, 3).map((prom, i) => (
                    <li key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                      <span>{prom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Genuine Booking Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => openBookingModal(service, null, selectedCityName)}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '220px', padding: '14px', fontSize: '15px', cursor: 'pointer' }}
                >
                  <Sparkles size={16} />
                  <span>Book Pandit &amp; Check Muhurat</span>
                </button>

                <a
                  href="#pricing-packages"
                  className="btn-secondary"
                  style={{
                    padding: '14px 22px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <Package size={16} color="#BD4B23" />
                  <span>View Pricing &amp; Packages</span>
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '10px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #DDD7C8',
                  color: 'var(--text-secondary)',
                  fontSize: '12.5px'
                }}
              >
                <Sparkles size={14} color="var(--accent-saffron)" />
                <span>Custom Muhurat &amp; Samagri guidance included with every ceremony</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. CENTRALIZED PRICING & PACKAGES SECTION */}
        {/* ======================================================== */}
        <PricingPackagesSection
          service={service}
          selectedCityName={selectedCityName}
          onCityChange={(newCity) => setSelectedCityName(newCity)}
          onSelectPackage={(pkg, city) => openBookingModal(service, null, city, pkg)}
          onEnquireGeneral={(city) => openBookingModal(service, null, city)}
        />

        {/* ======================================================== */}
        {/* 3. STRUCTURED HARIVARA CONTENT HIERARCHY TABS */}
        {/* (Significance, When to Perform, Vidhi, Samagri, FAQs) */}
        {/* ======================================================== */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EAE5D9',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
        >
          {/* Tab Navigation Headers */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #EAE5D9',
              background: 'var(--bg-primary)',
              fontSize: '14px',
              fontWeight: 700,
              overflowX: 'auto'
            }}
          >
            {[
              { id: 'significance', label: 'Significance & Benefits' },
              { id: 'timing', label: 'When to Perform' },
              { id: 'vidhi', label: 'Procedure & Vidhi Sequence' },
              { id: 'samagri', label: 'Samagri Checklist' },
              { id: 'faqs', label: `FAQs (${service.faqs?.length || 3})` }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 24px',
                  borderBottom: activeTab === tab.id ? '3px solid var(--accent-saffron)' : '3px solid transparent',
                  color: activeTab === tab.id ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                  background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  fontWeight: 700
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div style={{ padding: '36px' }}>
            {/* Tab 1: Significance & Benefits */}
            {activeTab === 'significance' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  Significance &amp; Spiritual Importance of {service.name}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px', whiteSpace: 'pre-line' }}>
                  {service.longDescription || service.shortDescription}
                </p>

                <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
                  Spiritual Benefits of Conducting This Ceremony:
                </h4>
                <div className="grid-2" style={{ gap: '14px', marginBottom: '24px' }}>
                  {(service.keyInsights || [
                    'Brings divine peace, positivity, and harmony to the household',
                    'Purifies the living environment and eliminates negative energies',
                    'Blesses the family with health, wealth, and long-term prosperity',
                    'Fulfills sacred Shastra obligations with authentic Vedic mantras'
                  ]).map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: '#FDFBF7',
                        border: '1px solid #EAE5D9',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '13.5px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Sparkles size={16} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Consultation callout */}
                <div
                  style={{
                    background: 'var(--accent-saffron-light)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(189, 75, 35, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div>
                    <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-saffron)' }}>
                      Have specific family traditions or Gotra considerations?
                    </h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Our senior Acharyas customize rituals according to North Indian (UP, Bihar, MP, Rajasthan) and Vedic traditions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBookingModal(service.name)}
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '13px', cursor: 'pointer' }}
                  >
                    Speak with Senior Pandit
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: When to Perform */}
            {activeTab === 'timing' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  When to Perform {service.name} (Auspicious Timing &amp; Muhurat)
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  In Vedic tradition, performing ceremonies during favorable planetary Lagnas, Tithis, and Nakshatras amplifies the spiritual blessings for all family members.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px',
                    marginBottom: '28px'
                  }}
                >
                  <div style={{ background: '#FDFBF7', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-saffron)', fontWeight: 700 }}>
                      <CalendarCheck size={18} />
                      <span>Recommended Days &amp; Tithis</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {timingInfo.bestDays}
                    </p>
                  </div>

                  <div style={{ background: '#FDFBF7', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-gold)', fontWeight: 700 }}>
                      <Clock size={18} />
                      <span>Auspicious Time of Day</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {timingInfo.timing}
                    </p>
                  </div>

                  <div style={{ background: '#FDFBF7', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#047857', fontWeight: 700 }}>
                      <Check size={18} />
                      <span>Shastra Guidance</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {timingInfo.notes}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: '#FFF8F4',
                    border: '1.5px solid var(--accent-saffron)',
                    borderRadius: '14px',
                    padding: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#BD4B23', marginBottom: '4px' }}>
                      Get a Free Muhurat Calculation for Your Family
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Share your Gotra and birth Nakshatra; our senior Acharyas will calculate the most auspicious Lagna.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBookingModal(service.name)}
                    className="btn-primary"
                    style={{ padding: '11px 22px', fontSize: '13.5px', cursor: 'pointer' }}
                  >
                    Calculate Shubh Muhurat
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Procedure & Vidhi Sequence */}
            {activeTab === 'vidhi' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  Scriptural Procedure &amp; Vidhi Sequence
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Conducted strictly in authentic Sanskrit mantras with clear, step-by-step Hindi explanations by our North Indian and Bihari Purohits:
                </p>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '28px' }}>
                  {[
                    { step: 'Swasti Vachan & Shanti Path', desc: 'Invocation of cosmic peace and purification of the sacred premises.' },
                    { step: 'Sankalpam with Gotra & Nakshatra', desc: 'Formal vow taken by the Yajaman reciting family lineage, gotra, and spiritual purpose.' },
                    { step: 'Gauri-Ganesh Sthapana & Kalash Pujan', desc: 'Worship of Vignaharta Lord Ganesha and invocation of sacred Varuna deities into the Kalash.' },
                    { step: 'Navagraha Aradhana & Dikpal Pujan', desc: 'Pacification of nine celestial grahas and ten directional guardians for complete protection.' },
                    { step: 'Main Deity Abhishekam & Archana', desc: 'Consecration, mantra chanting, and sacred offerings specific to this ceremony.' },
                    { step: 'Katha Pathan & Spiritual Explanation', desc: 'Recitation of sacred Shastra stories with meaningful lessons explained clearly in fluent Hindi.' },
                    { step: 'Hawan / Agnihotra with Pure Ghee', desc: 'Sacred fire offerings with pure cow ghee and herbal samagri for spiritual cleansing.' },
                    { step: 'Maha Mangala Aarti & Prasad Vitaran', desc: 'Concluding Aarti, Pushpanjali, Panditji blessings, and distribution of sanctified Prasad.' }
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'var(--bg-primary)',
                        border: '1px solid #EAE5D9',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}
                    >
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'var(--accent-saffron)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                          {s.step}
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Samagri Checklist */}
            {activeTab === 'samagri' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px', color: 'var(--text-main)' }}>
                  Ceremony Samagri Checklist (Pandit vs Devotee)
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  We ensure absolute transparency regarding what is included in our samagri kits versus what the family needs to prepare:
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    marginBottom: '28px'
                  }}
                >
                  {/* Column 1: What Panditji Provides */}
                  <div
                    style={{
                      background: '#FDFBF7',
                      borderRadius: '16px',
                      border: '1px solid #EAE5D9',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#047857' }}>
                      <Package size={20} />
                      <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>
                        Provided by Panditji (Package B or Kit)
                      </h4>
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {[
                        'Pure Herbal Hawan Samagri with 54 Ayurvedic herbs',
                        'Sacred Mango Hawan Wood (Kashtha) & Camphor (Kapoor)',
                        'Pure Desi Cow Ghee for Agnihotra offerings (in Samagri package)',
                        'Roli, Kumkum, Chandan, Haldi, Akshat & Sacred Moli',
                        'Navadhanya (9 sacred grains) & Supari',
                        'Purna Kalash Vastram & Janeu (Yagnopaveetam)',
                        'Dhoop sticks, Guggul, Loban & Gangajal'
                      ].map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check size={14} color="#047857" style={{ flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: What Devotee Prepares */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #EAE5D9',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#BD4B23' }}>
                      <Check size={20} />
                      <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>
                        Arranged by Devotee (Yajaman) at Home
                      </h4>
                    </div>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {[
                        'Fresh marigold flower garlands and loose puja flowers',
                        '5 varieties of fresh seasonal fruits (Pancha-Phala)',
                        'Fresh cow milk, curd, honey & sugar for Panchamrit',
                        'Water coconuts (Purna Shrifal) with intact husk',
                        'Household brass/copper thalis, small bowls, and spoons',
                        'Wooden chowki or bajot for deity sthapana',
                        'Clean sitting asanas (mats) for family members'
                      ].map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#BD4B23', fontWeight: 700, fontSize: '13px' }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  *Our coordination team shares a detailed checklist via WhatsApp immediately upon booking confirmation so your family is fully prepared.
                </div>
              </div>
            )}

            {/* Tab 5: FAQs */}
            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                  Frequently Asked Questions about {service.name}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(service.faqs || [
                    {
                      q: 'What materials (samagri) are provided by VedicPanditji?',
                      a: 'We bring complete hawan kashtha, pure desi cow ghee, navagraha samidha, kumkum, chandan, kalash items, and sacred dry herbs. You only need to provide household items like fresh flowers, fruits, and milk.'
                    },
                    {
                      q: 'Which languages are supported for the ceremony?',
                      a: 'VedicPanditji officially supports Hindi and Sanskrit. All Vedic mantras, stotras, and hawan ahutis are chanted in authentic Sanskrit, while the Katha, Sankalpam, and step-by-step vidhi instructions are explained in fluent Hindi.'
                    },
                    {
                      q: 'How is Shubh Muhurat determined?',
                      a: 'Our senior Acharyas examine your birth Nakshatra, Gotra, and local Panchang sunrise/sunset timings to advise the most auspicious hour.'
                    }
                  ]).map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '18px 20px',
                        borderRadius: '12px',
                        background: 'var(--bg-primary)',
                        border: '1px solid #EAE5D9'
                      }}
                    >
                      <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
                        {faq.q}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. VERIFIED PUNE & PCMC DOORSTEP COVERAGE */}
        {/* ======================================================== */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '30px 36px',
            border: '1px solid #EAE5D9',
            marginTop: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <MapPin size={18} color="var(--accent-saffron)" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Doorstep {service.name} Coverage across Pune &amp; PCMC
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.6 }}>
            Our verified North Indian and Bihari Pandits provide authentic doorstep ceremonies across Pune and Pimpri-Chinchwad (PCMC), as well as interactive E-Pujas nationwide:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { name: 'Pune (All Pune Areas)', slug: 'pandit-in-pune' },
              { name: 'Kothrud', slug: 'pandit-in-kothrud' },
              { name: 'Baner', slug: 'pandit-in-baner' },
              { name: 'Hinjawadi', slug: 'pandit-in-hinjawadi' },
              { name: 'Kharadi', slug: 'pandit-in-kharadi' },
              { name: 'Wakad', slug: 'pandit-in-wakad' },
              { name: 'Pimple Saudagar', slug: 'pandit-in-pimple-saudagar' },
              { name: 'Hadapsar', slug: 'pandit-in-hadapsar' },
              { name: 'Aundh', slug: 'pandit-in-aundh' },
              { name: 'Viman Nagar', slug: 'pandit-in-viman-nagar' },
              { name: 'Pimpri-Chinchwad (PCMC)', slug: 'pandit-in-pcmc' },
              { name: 'Ravet', slug: 'pandit-in-ravet' }
            ].map((locItem, idx) => (
              <a
                key={idx}
                href={`/locations/${locItem.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('location-detail', { slug: locItem.slug });
                }}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-saffron)';
                  e.currentTarget.style.color = '#BD4B23';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#EAE5D9';
                  e.currentTarget.style.color = 'var(--text-main)';
                }}
              >
                📍 Pandit in {locItem.name}
              </a>
            ))}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #F3EFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Need in-depth vidhi details, auspicious Muhurat calculations, or samagri checklists?
            </span>
            <a
              href="/puja-guides"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('puja-guides');
              }}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent-saffron)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📖 Explore Hindu Puja Educational Guides &rarr;
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-detail-top-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
