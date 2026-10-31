import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES, CITIES } from '../../data/vedicPanditData';
import { animateModalOpen } from '../../utils/gsapAnimations';
import {
  getPackagesForService,
  OPTIONAL_SAMAGRI_OPTIONS,
  calculateBookingTotal
} from '../../data/pujaPackagesData';
import EnquiryConfirmationView from './EnquiryConfirmationView';
import { generateSubmissionId } from '../../services/webhookService';
import {
  X,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Search
} from 'lucide-react';

export default function BookingModal() {
  const {
    bookingModalOpen,
    closeBookingModal,
    bookingService,
    bookingSelectedPackage,
    selectedLocality,
    selectedCity,
    completeBooking,
    user
  } = useApp();

  // Step names: 'puja' (1) | 'city' (2) | 'packages' (3) | 'samagri' (4) | 'details' (5) | 'confirmation' (6)
  const [step, setStep] = useState('puja');

  // Selection states
  const [currentService, setCurrentService] = useState(bookingService || null);
  const [city, setCity] = useState(
    typeof selectedCity === 'string' ? selectedCity : selectedCity?.name || 'Pune'
  );
  const [locality, setLocality] = useState(
    selectedLocality === 'All Pune Areas' ? '' : selectedLocality || ''
  );
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]); // Array of option IDs

  // Form states
  const [date, setDate] = useState('');
  const [needMuhuratConsult, setNeedMuhuratConsult] = useState(false);
  const [timeSlot, setTimeSlot] = useState('Morning Shubh Muhurat (07:30 AM - 10:00 AM)');
  const [address, setAddress] = useState(user?.address || '');
  const [preferredLanguage, setPreferredLanguage] = useState('Hindi & Sanskrit');
  const [customerName, setCustomerName] = useState(user?.isLoggedIn ? user.name : '');
  const [phone, setPhone] = useState(user?.isLoggedIn ? user.phone : '');
  const [gotra, setGotra] = useState(user?.gotra || '');
  const [notes, setNotes] = useState('');

  // Search filter for Step 1 (Select Puja)
  const [pujaSearch, setPujaSearch] = useState('');

  // Honeypot spam prevention
  const [websiteHp, setWebsiteHp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmed enquiry state
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  // GSAP Animation refs
  const backdropRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (bookingModalOpen) {
      const tl = animateModalOpen(backdropRef.current, cardRef.current);
      return () => {
        if (tl) tl.kill();
      };
    }
  }, [bookingModalOpen]);

  // Active service helper
  const activeService = currentService || bookingService || SERVICES[0];

  // Available packages for current service & city
  const packages = useMemo(() => {
    return getPackagesForService(activeService, city);
  }, [activeService, city]);

  // Pricing calculation
  const pricingSummary = useMemo(() => {
    return calculateBookingTotal(selectedPkg, selectedExtras);
  }, [selectedPkg, selectedExtras]);

  // Determine initial step when modal opens
  useEffect(() => {
    if (bookingModalOpen) {
      const initialCity = typeof selectedCity === 'string' ? selectedCity : selectedCity?.name || 'Pune';
      setCity(initialCity);
      setLocality(selectedLocality === 'All Pune Areas' ? '' : selectedLocality || '');

      if (bookingService) {
        setCurrentService(bookingService);
        const availablePkgs = getPackagesForService(bookingService, initialCity);

        if (bookingSelectedPackage) {
          setSelectedPkg(bookingSelectedPackage);
          // If both service and package are preselected, jump straight to optional samagri step
          setStep('samagri');
        } else {
          // Puja is preselected, jump to package comparison step
          const defaultPkg = availablePkgs.find(p => p.tier === 'popular') || availablePkgs[0];
          setSelectedPkg(defaultPkg);
          setStep('packages');
        }
      } else {
        // No puja selected yet: Start at Step 1 (Select Puja)
        setCurrentService(null);
        setSelectedPkg(null);
        setSelectedExtras([]);
        setStep('puja');
      }

      setSubmittedEnquiry(null);
    }
  }, [bookingModalOpen, bookingService, bookingSelectedPackage, selectedCity, selectedLocality]);

  if (!bookingModalOpen) return null;

  // Handle Puja Selection in Step 1
  const handleSelectPuja = (svc) => {
    setCurrentService(svc);
    const availablePkgs = getPackagesForService(svc, city);
    const defaultPkg = availablePkgs.find(p => p.tier === 'popular') || availablePkgs[0];
    setSelectedPkg(defaultPkg);
    // Proceed directly to Step 3 (Choose Package) for this ceremony and city
    setStep('packages');
  };

  // Handle City Selection in Step 2
  const handleSelectCity = (cityName) => {
    setCity(cityName);
    // Proceed to Step 3 (Choose Package)
    setStep('packages');
  };

  // Handle Package Selection in Step 3
  const handleSelectPackage = (pkg) => {
    setSelectedPkg(pkg);
    // Proceed to Step 4 (Customise Samagri)
    setStep('samagri');
  };

  // Toggle optional samagri selection
  const handleToggleExtra = (optionId) => {
    // If option is already included in base package, don't toggle
    const includedIds = selectedPkg?.includedSamagriIds || (selectedPkg?.tier === 'popular' ? ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'] : []);
    if (includedIds.includes(optionId)) return;

    setSelectedExtras(prev =>
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  // Submit Final Enquiry
  const handleSubmitEnquiry = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStep('confirmation');
    const pkgToSave = selectedPkg || packages[0];

    // Maintain stable submissionId across retries of the same booking attempt
    const activeSubId = submissionId || generateSubmissionId();
    if (!submissionId) {
      setSubmissionId(activeSubId);
    }

    // Collect names of selected extra samagri items
    const selectedExtraNames = selectedExtras
      .map(id => OPTIONAL_SAMAGRI_OPTIONS.find(o => o.id === id)?.name)
      .filter(Boolean);

    const enquiryRecord = await completeBooking({
      submissionId: activeSubId,
      serviceName: activeService.name,
      packageName: pkgToSave.name,
      packagePrice: pricingSummary.displayString,
      samagriPolicy: pkgToSave.tier === 'popular' ? 'Ritual + Pure Hawan Samagri Kit Included' : 'Ritual Only (Devotee Arranges Samagri)',
      city,
      locality: locality || 'Standard Area',
      language: preferredLanguage,
      date: needMuhuratConsult ? 'Auspicious Muhurat to be calculated with Panditji' : (date || 'Date to be confirmed'),
      timeSlot,
      customerName: customerName || 'Devotee',
      phone,
      address,
      website_hp: websiteHp,
      notes: [
        notes,
        gotra ? `Gotra: ${gotra}` : '',
        selectedExtraNames.length > 0 ? `Optional Samagri: ${selectedExtraNames.join(', ')}` : '',
        pricingSummary.hasUnconfirmedPrices ? 'Estimated total subject to verified quotation.' : ''
      ].filter(Boolean).join(' | ')
    });

    setIsSubmitting(false);
    setSubmittedEnquiry(enquiryRecord);
  };

  // Filtered pujas for Step 1
  const filteredServices = SERVICES.filter(s =>
    s.name.toLowerCase().includes(pujaSearch.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(pujaSearch.toLowerCase()))
  );

  // Stepper labels
  const stepsMeta = [
    { key: 'puja', label: '1. Puja' },
    { key: 'city', label: '2. City' },
    { key: 'packages', label: '3. Package' },
    { key: 'samagri', label: '4. Samagri' },
    { key: 'details', label: '5. Details' },
    { key: 'confirmation', label: '6. Status' }
  ];

  return (
    <div
      ref={backdropRef}
      className="vp-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        background: 'rgba(28, 30, 27, 0.78)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        overflowY: 'auto'
      }}
      onClick={() => {
        if (!isSubmitting) closeBookingModal();
      }}
    >
      <div
        ref={cardRef}
        className="vp-modal-card"
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: step === 'packages' ? '780px' : (step === 'puja' || step === 'samagri' ? '740px' : '640px'),
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '94vh',
          border: '1px solid #EAE5D9',
          transition: 'max-width 0.25s ease'
        }}
      >
        {/* ======================================================== */}
        {/* MODAL HEADER */}
        {/* ======================================================== */}
        <div
          className="vp-modal-header"
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #FBF9F5 0%, #F5F0E6 100%)',
            borderBottom: '1px solid #EAE5D9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Back button if not at initial step and not on confirmation */}
            {step !== 'puja' && step !== 'confirmation' && (
              <button
                type="button"
                onClick={() => {
                  if (step === 'city') setStep(currentService ? 'packages' : 'puja');
                  else if (step === 'packages') setStep('puja');
                  else if (step === 'samagri') setStep('packages');
                  else if (step === 'details') setStep('samagri');
                }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D8D2C4',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#BD4B23'
                }}
                title="Go back to previous step"
                aria-label="Previous step"
              >
                <ArrowLeft size={16} />
              </button>
            )}

            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#BD4B23',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={12} />
                <span>VedicPanditji • Transparent Booking Flow</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  lineHeight: 1.2,
                  marginTop: '2px'
                }}
              >
                {step === 'puja' && (city ? `Select Ceremony for ${city}` : 'Select Ceremony')}
                {step === 'city' && (currentService ? `Select City for ${currentService.name}` : 'Select Service Location')}
                {step === 'packages' && `Select Package — ${activeService.name}`}
                {step === 'samagri' && `Customise Samagri — ${activeService.name}`}
                {step === 'details' && 'Enter Devotee & Ceremony Details'}
                {step === 'confirmation' && 'Enquiry Status & Reference'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
        if (!isSubmitting) closeBookingModal();
      }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #EAE5D9',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ======================================================== */}
        {/* STEP PROGRESS BREADCRUMB BAR */}
        {/* ======================================================== */}
        {step !== 'confirmation' && (
          <div
            className="vp-modal-breadcrumb-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FDFBF7',
              borderBottom: '1px solid #EAE5D9',
              padding: '8px 16px',
              overflowX: 'auto',
              gap: '6px',
              fontSize: '12px'
            }}
          >
            {stepsMeta.map((s, idx) => {
              const isCurrent = step === s.key;
              const isPassed =
                (step === 'city' && idx < 1) ||
                (step === 'packages' && idx < 2) ||
                (step === 'samagri' && idx < 3) ||
                (step === 'details' && idx < 4) ||
                (step === 'confirmation' && idx < 5);

              const isClickable = isPassed || (s.key === 'city' && step === 'puja') || (s.key === 'puja' && currentService);

              return (
                <div
                  key={s.key}
                  onClick={() => {
                    if (isClickable) {
                      setStep(s.key);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    color: isCurrent ? '#BD4B23' : (isPassed ? '#166534' : '#A8A29E'),
                    fontWeight: isCurrent ? 700 : 500,
                    cursor: isClickable ? 'pointer' : 'default'
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: isCurrent ? '#BD4B23' : (isPassed ? '#DCFCE7' : '#EAE5D9'),
                      color: isCurrent ? '#FFFFFF' : (isPassed ? '#166534' : '#78716C'),
                      fontSize: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700
                    }}
                  >
                    {isPassed ? <Check size={11} /> : idx + 1}
                  </span>
                  <span>{s.label}</span>
                  {idx < stepsMeta.length - 1 && (
                    <span style={{ color: '#D8D2C4', margin: '0 2px' }}>›</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* SCROLLABLE STEP BODY */}
        {/* ======================================================== */}
        <div className="vp-modal-body" style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>

          {/* ======================================================== */}
          {/* STEP 1: SELECT PUJA */}
          {/* ======================================================== */}
          {step === 'puja' && (
            <div>
              {/* Active Service Location Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FDFBF7',
                  border: '1px solid #EAE5D9',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginBottom: '14px',
                  fontSize: '12.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#BD4B23" />
                  <span>
                    Service Location: <strong style={{ color: '#BD4B23' }}>{city}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('city')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#BD4B23',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '11.5px',
                    fontWeight: 600
                  }}
                >
                  Change City
                </button>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Select the ceremony you would like Panditji to perform in <strong>{city}</strong>.
              </p>

              {/* Search Bar */}
              <div
                style={{
                  position: 'relative',
                  marginBottom: '16px'
                }}
              >
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#A8A29E'
                  }}
                />
                <input
                  type="text"
                  placeholder="Search ceremony (e.g., Griha Pravesh, Satyanarayan, Vastu, Rudrabhishek)..."
                  value={pujaSearch}
                  onChange={e => setPujaSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '12px',
                    border: '1px solid #D8D2C4',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#FDFBF7'
                  }}
                />
              </div>

              {/* Puja Options Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                  gap: '12px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}
              >
                {filteredServices.map(svc => (
                  <div
                    key={svc.id}
                    onClick={() => handleSelectPuja(svc)}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: '1px solid #EAE5D9',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#BD4B23';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#EAE5D9';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                        {svc.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {svc.indicativePrice || 'Transparent Starting Quote'}
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#BD4B23'
                      }}
                    >
                      <span>Select</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: SELECT CITY */}
          {/* ======================================================== */}
          {step === 'city' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FDFBF7',
                  border: '1px solid #EAE5D9',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginBottom: '16px'
                }}
              >
                <Sparkles size={14} color="#BD4B23" />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Selected Ceremony: <strong style={{ color: '#BD4B23' }}>{activeService.name}</strong>
                </span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Select the service location where Panditji will perform the puja.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px'
                }}
              >
                {CITIES.map(c => {
                  const isSelected = city.toLowerCase() === c.name.toLowerCase() || (typeof city === 'object' && city?.name === c.name);
                  return (
                    <div
                      key={c.id}
                      onClick={() => handleSelectCity(c.name)}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                        background: isSelected ? '#FFFAF7' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: 'var(--shadow-xs)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <MapPin size={14} color={isSelected ? '#BD4B23' : '#78716C'} />
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                          {c.name}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {c.name === 'Pune' ? 'Pune Hub • In-Person' : (c.popular ? 'Direct In-Person' : 'Pan-India In-Person / E-Puja')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional Locality Specification */}
              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Specific Locality / Area in {city} (Optional)
                </label>
                <input
                  type="text"
                  placeholder={
                    {
                      Chennai: 'e.g. T. Nagar, Anna Nagar, Velachery, OMR, Adyar, Mylapore...',
                      Mumbai: 'e.g. Andheri, Borivali, Thane, Powai, Navi Mumbai, Dadar...',
                      Bangalore: 'e.g. Whitefield, Koramangala, Indiranagar, HSR Layout...',
                      Pune: 'e.g. Wakad, Baner, Kothrud, Hinjewadi, Kharadi, Hadapsar...',
                      Delhi: 'e.g. Noida, Gurgaon, Dwarka, Rohini, South Delhi...',
                      Hyderabad: 'e.g. Gachibowli, Madhapur, Hitec City, Kukatpally...',
                      Nashik: 'e.g. Trimbak Road, Panchavati, Gangapur Road...'
                    }[city] || `e.g. Central area or neighbourhood in ${city}...`
                  }
                  value={locality}
                  onChange={e => setLocality(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #D8D2C4',
                    fontSize: '13px',
                    background: '#FDFBF7'
                  }}
                />
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setStep('packages')}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '10px',
                    background: '#BD4B23',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Continue to Packages</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: CHOOSE PACKAGE */}
          {/* ======================================================== */}
          {step === 'packages' && (
            <div>
              {/* Context Summary Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FDFBF7',
                  border: '1px solid #EAE5D9',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <strong style={{ color: '#BD4B23' }}>{activeService.name}</strong> • Location: <strong>{city} {locality ? `(${locality})` : ''}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setStep('puja')}
                    style={{ background: 'none', border: 'none', color: '#BD4B23', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                  >
                    Change Puja
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('city')}
                    style={{ background: 'none', border: 'none', color: '#BD4B23', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                  >
                    Change City
                  </button>
                </div>
              </div>

              {/* Simplified Two Package Cards */}
              <div
                className="vp-modal-pkg-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px'
                }}
              >
                {packages.slice(0, 2).map(pkg => {
                  const isSelected = selectedPkg?.id === pkg.id;
                  const isPopular = pkg.tier === 'popular';

                  return (
                    <div
                      key={pkg.id}
                      style={{
                        borderRadius: '18px',
                        border: isSelected ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                        background: isSelected ? '#FFFAF7' : '#FFFFFF',
                        padding: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 10px 24px rgba(189, 75, 35, 0.12)' : 'var(--shadow-sm)',
                        position: 'relative'
                      }}
                    >
                      {/* Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '8px',
                            background: isPopular ? '#FEF3C7' : '#F1EFEA',
                            color: isPopular ? '#92400E' : '#57534E'
                          }}
                        >
                          {pkg.badge}
                        </span>

                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #BD4B23' : '2px solid #D8D2C4',
                            background: '#FFFFFF'
                          }}
                        />
                      </div>

                      {/* Package Name */}
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                        {pkg.name}
                      </h3>

                      {/* Price Display */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#BD4B23' }}>
                          {pkg.priceDisplay}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {pkg.priceNote || 'Honest quote confirmed before ceremony'}
                        </div>
                      </div>

                      {/* Short 2-3 Inclusions Only */}
                      <div style={{ marginBottom: '20px', borderTop: '1px solid #F0EDE6', paddingTop: '14px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          Key Inclusions:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {pkg.inclusions.slice(0, 3).map((inc, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                              <CheckCircle2 size={14} color="#166534" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Clear Select Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectPackage(pkg)}
                        style={{
                          width: '100%',
                          padding: '11px 16px',
                          borderRadius: '10px',
                          background: isSelected ? '#BD4B23' : '#FDFBF7',
                          color: isSelected ? '#FFFFFF' : '#BD4B23',
                          border: isSelected ? 'none' : '1px solid #D8D2C4',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{isSelected ? 'Selected — Customise Samagri' : 'Select Package'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Notice */}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                *Indicative starting dakshina based on standard Vedic vidhi. Final quotation confirmed transparently with Panditji.
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: CUSTOMISE SAMAGRI */}
          {/* ======================================================== */}
          {step === 'samagri' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#FDFBF7',
                  border: '1px solid #EAE5D9',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginBottom: '16px',
                  fontSize: '12px'
                }}
              >
                <div>
                  Selected: <strong style={{ color: '#BD4B23' }}>{selectedPkg?.name || 'Ritual Package'}</strong> ({selectedPkg?.priceDisplay || 'Custom Quote'})
                </div>
                <button
                  type="button"
                  onClick={() => setStep('packages')}
                  style={{ background: 'none', border: 'none', color: '#BD4B23', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                >
                  Change Package
                </button>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                Customise optional puja materials. If an item is already included in your package, no duplicate charge is applied. Prices are verified or confirmed honestly.
              </p>

              {/* Samagri Checklist Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {OPTIONAL_SAMAGRI_OPTIONS.map(opt => {
                  const isIncludedInBase = (selectedPkg?.includedSamagriIds || (selectedPkg?.tier === 'popular' ? ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'] : [])).includes(opt.id);
                  const isChecked = isIncludedInBase || selectedExtras.includes(opt.id);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => !isIncludedInBase && handleToggleExtra(opt.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: isChecked ? '1px solid #BD4B23' : '1px solid #EAE5D9',
                        background: isIncludedInBase ? '#F6F5F2' : (isChecked ? '#FFFAF7' : '#FFFFFF'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: isIncludedInBase ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isIncludedInBase}
                          onChange={() => !isIncludedInBase && handleToggleExtra(opt.id)}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#BD4B23',
                            cursor: isIncludedInBase ? 'default' : 'pointer'
                          }}
                        />
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{opt.name}</span>
                            {isIncludedInBase && (
                              <span style={{ fontSize: '10px', fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '2px 6px', borderRadius: '4px' }}>
                                Included in {selectedPkg?.name?.split('—')[0] || 'Package B'}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                            {opt.description}
                          </div>
                        </div>
                      </div>

                      {/* Price Tag */}
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                        {isIncludedInBase ? (
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>₹0 (Included)</span>
                        ) : opt.price !== null ? (
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#BD4B23' }}>+{opt.priceDisplay}</span>
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#78716C' }}>Price to be confirmed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Transparent Estimated Total Recalculation Bar */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #FDFBF7 0%, #F5EFE6 100%)',
                  border: '1px solid #D8D2C4',
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Estimated Transparent Total:
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#BD4B23' }}>
                    {pricingSummary.displayString}
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {pricingSummary.hasUnconfirmedPrices ? (
                    <span>Note: Final quote confirmed prior to booking once fresh material rates and Muhurat are verified with Panditji.</span>
                  ) : (
                    <span>All selected items have verified pricing. No hidden fees.</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedExtras([]);
                    setStep('details');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Continue without extra samagri
                </button>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  style={{
                    padding: '11px 24px',
                    borderRadius: '10px',
                    background: '#BD4B23',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Continue to Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 5: DEVOTEE & CEREMONY DETAILS */}
          {/* ======================================================== */}
          {step === 'details' && (
            <form onSubmit={handleSubmitEnquiry}>
              {/* Honeypot anti-spam field */}
              <input
                type="text"
                name="website_hp"
                value={websiteHp}
                onChange={e => setWebsiteHp(e.target.value)}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />
              {/* Summary Bar */}
              <div
                style={{
                  background: '#FDFBF7',
                  border: '1px solid #EAE5D9',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}
              >
                <div>
                  <strong style={{ color: '#BD4B23' }}>{activeService.name}</strong> • {city} • {selectedPkg?.name || 'Selected Package'}
                </div>
                <div style={{ fontWeight: 800, color: '#BD4B23' }}>
                  {pricingSummary.displayString}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {/* Date & Muhurat */}
                <div className="vp-modal-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Ceremony Date {needMuhuratConsult ? '(Consulting Panditji)' : '*'}
                    </label>
                    <input
                      type="date"
                      disabled={needMuhuratConsult}
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #D8D2C4',
                        fontSize: '13px',
                        background: needMuhuratConsult ? '#F3F0E8' : '#FFFFFF'
                      }}
                      required={!needMuhuratConsult}
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={needMuhuratConsult}
                        onChange={e => setNeedMuhuratConsult(e.target.checked)}
                        style={{ accentColor: '#BD4B23' }}
                      />
                      <span>Calculate Shubh Muhurat with Panditji</span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Preferred Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #D8D2C4',
                        fontSize: '13px',
                        background: '#FFFFFF'
                      }}
                    >
                      <option value="Morning Shubh Muhurat (07:30 AM - 10:00 AM)">Morning Shubh Muhurat (07:30 AM - 10:00 AM)</option>
                      <option value="Mid-day Auspicious (10:30 AM - 01:00 PM)">Mid-day Auspicious (10:30 AM - 01:00 PM)</option>
                      <option value="Evening Pradosh (05:00 PM - 07:30 PM)">Evening Pradosh (05:00 PM - 07:30 PM)</option>
                      <option value="Time to be decided with Panditji">Time to be decided with Panditji</option>
                    </select>
                  </div>
                </div>

                {/* Devotee Name & Phone */}
                <div className="vp-modal-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Devotee Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #D8D2C4',
                        fontSize: '13px',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98220 12345"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #D8D2C4',
                        fontSize: '13px',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Puja Location / Address in {city} *
                  </label>
                  <input
                    type="text"
                    placeholder="House/Flat No, Society, Landmark, Area"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '13px',
                      background: '#FFFFFF'
                    }}
                  />
                </div>

                {/* Gotra / Language / Notes */}
                <div className="vp-modal-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Family Gotra (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyap, Bhardwaj, Vatsa"
                      value={gotra}
                      onChange={e => setGotra(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #D8D2C4',
                        fontSize: '13px',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      Preferred Ritual Language
                    </label>
                    <select
                      value={preferredLanguage}
                      onChange={e => setPreferredLanguage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #D8D2C4',
                        fontSize: '13px',
                        background: '#FFFFFF'
                      }}
                    >
                      <option value="Hindi & Sanskrit">Hindi &amp; Sanskrit</option>
                      <option value="Hindi Only">Hindi (Katha &amp; Vidhi)</option>
                      <option value="Sanskrit Only">Sanskrit (Mantras)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Devotee Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Specific Ritual Requests / Family Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Specific Samagri preferences, family elders attending, flat floor number"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '13px',
                      background: '#FFFFFF'
                    }}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setStep('samagri')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#BD4B23',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>Back to Samagri</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '10px',
                    background: '#BD4B23',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.75 : 1,
                    boxShadow: '0 4px 14px rgba(189, 75, 35, 0.25)'
                  }}
                >
                  {isSubmitting ? 'Submitting Enquiry...' : 'Submit Ceremony Enquiry'}
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 6: ENQUIRY CONFIRMATION (REDESIGNED) */}
          {/* ======================================================== */}
          {step === 'confirmation' && (
            <div style={{ padding: '6px 0' }}>
              <EnquiryConfirmationView
                state={
                  isSubmitting
                    ? 'loading'
                    : (submittedEnquiry?.success
                        ? 'success'
                        : (submittedEnquiry?.status === 'unavailable' || submittedEnquiry?.isUnavailable
                            ? 'unavailable'
                            : 'error'))
                }
                enquiryType="booking_enquiry"
                enquiryData={{
                  customerName: customerName || 'Devotee',
                  phone,
                  serviceName: activeService?.name,
                  city,
                  locality,
                  selectedPackage: selectedPkg?.name || 'Vedic Vidhi',
                  packagePrice: pricingSummary.displayString,
                  preferredDate: needMuhuratConsult ? 'Auspicious Muhurat Consultation' : (date || 'Date to be confirmed'),
                  preferredTimeSlot: timeSlot
                }}
                result={submittedEnquiry}
                onRetry={handleSubmitEnquiry}
                onClose={closeBookingModal}
                onEdit={() => setStep('details')}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
