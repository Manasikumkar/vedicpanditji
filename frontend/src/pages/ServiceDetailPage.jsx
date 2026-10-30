import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, CUSTOMER_REVIEWS, getServiceImage } from '../data/vedicPanditData';
import { getPackagesForService, getCityNote } from '../data/pujaPackagesData';
import {
  Star,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Share2,
  Package,
  Check
} from 'lucide-react';

export default function ServiceDetailPage() {
  const { routeParams, navigateTo, openBookingModal, showToast, selectedCity } = useApp();

  // Find service from params or fallback
  const serviceId = routeParams?.serviceId || 'satyanarayan-puja';
  const service = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const [activeTab, setActiveTab] = useState('description'); // 'description', 'reviews', 'faqs'
  const [selectedCityName, setSelectedCityName] = useState(
    routeParams?.city || (typeof selectedCity === 'string' ? selectedCity : selectedCity?.name || 'Pune')
  );

  const packages = getPackagesForService(service, selectedCityName);

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState('5');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    showToast('Your review has been submitted for verification!');
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ceremony link copied to clipboard!');
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Home</span>
          {' / '}
          <span onClick={() => navigateTo('catalogue')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Ceremonies</span>
          {' / '}
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{service.name}</span>
        </div>

        {/* Top Product Summary Grid */}
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
                  <span>Available Across Pune &amp; PCMC</span>
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
                <ShieldCheck size={16} color="var(--accent-saffron)" />
                <span>Certified North Indian &amp; Bihari Pandits under Senior Vedic Acharyas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Package size={16} color="var(--accent-saffron)" />
                <span>100% pure Vedic Hawan Samagri &amp; cow ghee options included</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Clock size={16} color="var(--accent-saffron)" />
                <span>Personalized Shubh Muhurat consultation by horoscope &amp; Nakshatra</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Dakshina, Inclusions & Booking Action */}
          <div>
            <div className="badge-saffron" style={{ marginBottom: '10px' }}>
              <Sparkles size={12} />
              <span>Vedic Ritual in Pune &bull; Certified Priests</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
              {service.name}
            </h1>

            {/* Rating and Reviews link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#EAB308" color="#EAB308" />
                ))}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>{service.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                ({service.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Indicative Dakshina Range */}
            <div
              style={{
                background: 'var(--bg-primary)',
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid #EAE5D9',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Dakshina:
              </span>
              {service.priceVerified && service.minPrice ? (
                <>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                    From ₹{service.minPrice.toLocaleString('en-IN')}*
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    (Indicative Starting Dakshina • Final quote confirmed on Muhurat review)
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                    Custom Quote
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    (Based on Puja Requirements, Date &amp; Location)
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {service.shortDescription}
            </p>

            {/* Key Insights & Our Promise */}
            <div className="grid-2" style={{ gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#FDFCF9', padding: '14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-saffron)' }}>
                  Key Ritual Insights:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {service.keyInsights?.slice(0, 3).map((ins, i) => (
                    <li key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-saffron)' }}>•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#FDFCF9', padding: '14px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-gold)' }}>
                  Our Vedic Promise:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {service.ourPromise?.slice(0, 3).map((prom, i) => (
                    <li key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-gold)' }}>✓</span>
                      <span>{prom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Genuine VedicPanditji Booking & Consultation Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
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
                  <span>View Packages</span>
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #DDD7C8',
                  color: 'var(--text-secondary)',
                  fontSize: '13px'
                }}
              >
                <Sparkles size={15} color="var(--accent-saffron)" />
                <span>Custom Muhurat &amp; Samagri guidance included with every ceremony</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RELEVANT PRICING & PACKAGES SECTION (Harivara UX Reference) */}
        {/* ======================================================== */}
        <section id="pricing-packages" style={{ marginBottom: '40px' }}>
          <div
            className="service-packages-container"
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid #EAE5D9',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* Section Header with City Selector */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: '1px solid #EAE5D9',
                paddingBottom: '20px'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#BD4B23', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={13} />
                  <span>Transparent Shastra Packages</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  {service.name} Pricing &amp; Packages
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '640px' }}>
                  Choose from our verified ceremony options. All rituals are performed by certified North Indian Vedic priests in sacred Hindi and Sanskrit.
                </p>
              </div>

              {/* City Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FBF9F5', padding: '8px 14px', borderRadius: '12px', border: '1px solid #EAE5D9' }}>
                <MapPin size={16} color="#BD4B23" />
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>Select Serving City</div>
                  <select
                    value={selectedCityName}
                    onChange={e => setSelectedCityName(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#BD4B23',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Pune">Pune &amp; PCMC (HQ)</option>
                    <option value="Mumbai">Mumbai &amp; Thane (MMR)</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Nashik">Nashik / Trimbakeshwar</option>
                    <option value="Online E-Puja">Online E-Puja (Pan-India &amp; Global)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* City Availability Notice */}
            <div style={{ fontSize: '12px', color: '#BD4B23', fontWeight: 600, background: '#FBF9F5', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
              <MapPin size={14} color="#BD4B23" />
              <span>{getCityNote(selectedCityName)}</span>
            </div>

            {/* Package Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: packages.length > 2 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                gap: '24px'
              }}
              className="service-packages-grid"
            >
              {packages.map(pkg => (
                <div
                  key={pkg.id}
                  className="card-premium service-package-card"
                  style={{
                    borderRadius: '20px',
                    border: pkg.tier === 'popular' ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                    background: pkg.tier === 'popular' ? '#FFFAF7' : '#FFFFFF',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: pkg.tier === 'popular' ? '0 12px 30px rgba(189, 75, 35, 0.12)' : 'var(--shadow-sm)'
                  }}
                >
                  {/* Tier Badge */}
                  <div style={{ marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        background: pkg.tier === 'popular' ? '#BD4B23' : '#F1EFEA',
                        color: pkg.tier === 'popular' ? '#FFFFFF' : '#57534E',
                        display: 'inline-block'
                      }}
                    >
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Package Title */}
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px', lineHeight: 1.3 }}>
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '18px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#BD4B23' }}>
                      {pkg.priceDisplay}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {pkg.indicativePrice ? '(Starting Dakshina)*' : '(Custom Quote)'}
                    </span>
                  </div>

                  {/* Short 2-3 Inclusions */}
                  <div style={{ flex: 1, borderTop: '1px solid #EAE5D9', paddingTop: '16px', marginBottom: '22px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Package Inclusions:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
                      {(pkg.inclusions || []).map((inc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          <Check size={15} color="#BD4B23" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Single Clear Package Action */}
                  <button
                    type="button"
                    onClick={() => openBookingModal(service, null, selectedCityName, pkg)}
                    className={pkg.tier === 'popular' ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Sparkles size={15} />
                    <span>Select {pkg.name.split('—')[0]?.trim() || 'Package'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
              *Indicative dakshina is subject to Shubh Muhurat review, samagri preferences, and travel arrangements. The final quote and priest allocation are confirmed directly with our Vedic coordination team.
            </div>
          </div>
        </section>

        {/* Detailed Tabs: Description, Reviews, FAQ */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #EAE5D9',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Tab Navigation Headers */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #EAE5D9',
              background: 'var(--bg-primary)',
              fontSize: '15px',
              fontWeight: 700
            }}
          >
            <button
              onClick={() => setActiveTab('description')}
              style={{
                padding: '16px 28px',
                borderBottom: activeTab === 'description' ? '3px solid var(--accent-saffron)' : '3px solid transparent',
                color: activeTab === 'description' ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                background: activeTab === 'description' ? '#FFFFFF' : 'transparent',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Description &amp; Vidhi
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '16px 28px',
                borderBottom: activeTab === 'reviews' ? '3px solid var(--accent-saffron)' : '3px solid transparent',
                color: activeTab === 'reviews' ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                background: activeTab === 'reviews' ? '#FFFFFF' : 'transparent',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Verified Google Reviews ({service.reviewsCount})
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              style={{
                padding: '16px 28px',
                borderBottom: activeTab === 'faqs' ? '3px solid var(--accent-saffron)' : '3px solid transparent',
                color: activeTab === 'faqs' ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                background: activeTab === 'faqs' ? '#FFFFFF' : 'transparent',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              FAQ ({service.faqs?.length || 3})
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '36px' }}>
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '14px' }}>
                  About {service.name}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px', whiteSpace: 'pre-line' }}>
                  {service.fullDescription || service.shortDescription}
                </p>

                <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px' }}>
                  Ceremony Vidhi &amp; Ritual Sequence:
                </h4>
                <div className="grid-2" style={{ gap: '16px', marginBottom: '28px' }}>
                  {(service.vidhiSteps || [
                    'Swasti Vachan & Shanti Path',
                    'Sankalpam with Gotra & Nakshatra',
                    'Gauri-Ganesh Sthapana & Kalash Pujan',
                    'Navagraha Aradhana & Dikpal Pujan',
                    'Main Deity Abhishekam & Archana',
                    'Katha Pathan & Explanation',
                    'Hawan / Agnihotra with Shuddha Ghee',
                    'Maha Mangala Aarti & Prasad Vitaran'
                  ]).map((step, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: 'var(--bg-primary)',
                        border: '1px solid #EAE5D9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px'
                      }}
                    >
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent-saffron)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

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
                      Need Shubh Muhurat guidance for this ceremony?
                    </h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Our senior Vedic Acharyas provide free astrological Muhurat dates tailored to your family.
                    </p>
                  </div>
                  <button
                    onClick={() => openBookingModal(service.name)}
                    className="btn-primary"
                    style={{ padding: '10px 20px', fontSize: '13px', cursor: 'pointer' }}
                  >
                    Check Shubh Muhurat
                  </button>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700 }}>
                      Verified Google Reviews
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Rated 4.9★ across 262+ reviews on Google Places
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={18} fill="#EAB308" color="#EAB308" />
                    <span style={{ fontSize: '18px', fontWeight: 800 }}>4.9</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>out of 5</span>
                  </div>
                </div>

                {/* Submit New Review Form */}
                <form
                  onSubmit={handleReviewSubmit}
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '24px',
                    borderRadius: '14px',
                    border: '1px solid #EAE5D9',
                    marginBottom: '32px'
                  }}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>
                    Share Your Feedback
                  </h4>

                  <div className="grid-3" style={{ gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={e => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        Your Locality in Pune *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Wakad / Baner / Kothrud"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        Rating *
                      </label>
                      <select
                        value={newReviewRating}
                        onChange={e => setNewReviewRating(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DDD7C8', background: '#FFFFFF' }}
                      >
                        <option value="5">5 Stars (Excellent)</option>
                        <option value="4">4 Stars (Very Good)</option>
                        <option value="3">3 Stars (Good)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Review Comment *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={newReviewComment}
                      onChange={e => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience with VedicPanditji and the Vedic ceremony..."
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: '10px 22px', fontSize: '13px', cursor: 'pointer' }}>
                    Submit Review
                  </button>
                </form>

                {/* Genuine Verified Reviews */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {CUSTOMER_REVIEWS.map((rev, i) => (
                    <div key={i} style={{ padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', background: '#FFFFFF' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontWeight: 700 }}>{rev.author}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>({rev.location})</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} size={13} fill="#EAB308" color="#EAB308" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        "{rev.comment}"
                      </p>
                      <div style={{ fontSize: '11px', color: 'var(--accent-saffron)', marginTop: '8px', fontWeight: 600 }}>
                        ✓ {rev.service} &bull; Verified Google Review
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs Tab */}
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

        {/* City-Specific Landing Links */}
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
              Available with North Indian Pandits Across India
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.6 }}>
            Looking to book {service.name} in your city? Explore our city-specific North Indian Pandit landing pages:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { name: 'Pune (HQ In-Person)', slug: 'north-indian-pandit-in-pune' },
              { name: 'Mumbai & MMR', slug: 'north-indian-pandit-in-mumbai' },
              { name: 'Bangalore', slug: 'north-indian-pandit-in-bangalore' },
              { name: 'Delhi NCR', slug: 'north-indian-pandit-in-delhi' },
              { name: 'Hyderabad', slug: 'north-indian-pandit-in-hyderabad' },
              { name: 'Chennai', slug: 'north-indian-pandit-in-chennai' },
              { name: 'Online E-Puja (Pan-India)', slug: 'online-e-puja-services' }
            ].map((cityItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => navigateTo('seo-landing', { slug: cityItem.slug })}
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
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
                📍 {cityItem.name}
              </button>
            ))}
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
