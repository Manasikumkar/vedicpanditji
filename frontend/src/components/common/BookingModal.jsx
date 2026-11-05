import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICES, CITIES } from '../../data/vedicPanditData';
import { animateModalOpen } from '../../utils/gsapAnimations';
import {
  getPackagesForService,
  getOptionalSamagriOptions,
  calculateBookingTotal
} from '../../data/pujaPackagesData';
import EnquiryConfirmationView from './EnquiryConfirmationView';
import { generateSubmissionId } from '../../services/webhookService';
import { useI18n } from '../../i18n/useI18n';
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
    pricingVersion,
    user
  } = useApp();
  const { t, lang } = useI18n();
  const samagriOptions = getOptionalSamagriOptions(lang);

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
    return getPackagesForService(activeService, city, lang);
  }, [activeService, city, lang, pricingVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  // English copies: the booking record and totals sent downstream stay in English whatever the page language
  const packagesEn = useMemo(() => {
    return getPackagesForService(activeService, city, 'en');
  }, [activeService, city, pricingVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-resolve the chosen package by id so a live pricing swap updates its price
  const livePkg = useMemo(
    () => (selectedPkg ? packages.find(p => p.id === selectedPkg.id) || selectedPkg : null),
    [selectedPkg, packages]
  );
  const livePkgEn = useMemo(
    () => (selectedPkg ? packagesEn.find(p => p.id === selectedPkg.id) || selectedPkg : null),
    [selectedPkg, packagesEn]
  );

  // Pricing calculation
  const pricingSummary = useMemo(() => {
    return calculateBookingTotal(livePkgEn, selectedExtras);
  }, [livePkgEn, selectedExtras]);

  // Determine initial step when modal opens
  useEffect(() => {
    if (bookingModalOpen) {
      const initialCity = typeof selectedCity === 'string' ? selectedCity : selectedCity?.name || 'Pune';
      setCity(initialCity);
      setLocality(selectedLocality === 'All Pune Areas' ? '' : selectedLocality || '');

      if (bookingService) {
        setCurrentService(bookingService);
        const availablePkgs = getPackagesForService(bookingService, initialCity, lang);

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
  }, [bookingModalOpen, bookingService, bookingSelectedPackage, selectedCity, selectedLocality, lang]);

  if (!bookingModalOpen) return null;

  // Handle Puja Selection in Step 1
  const handleSelectPuja = (svc) => {
    setCurrentService(svc);
    const availablePkgs = getPackagesForService(svc, city, lang);
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
    const pkgToSave = livePkgEn || packagesEn[0];

    // Maintain stable submissionId across retries of the same booking attempt
    const activeSubId = submissionId || generateSubmissionId();
    if (!submissionId) {
      setSubmissionId(activeSubId);
    }

    // Collect names of selected extra samagri items (English for the booking record)
    const samagriOptionsEn = getOptionalSamagriOptions('en');
    const selectedExtraNames = selectedExtras
      .map(id => samagriOptionsEn.find(o => o.id === id)?.name)
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
    { key: 'puja', labelKey: 'booking.step.puja' },
    { key: 'city', labelKey: 'booking.step.city' },
    { key: 'packages', labelKey: 'booking.step.packages' },
    { key: 'samagri', labelKey: 'booking.step.samagri' },
    { key: 'details', labelKey: 'booking.step.details' },
    { key: 'confirmation', labelKey: 'booking.step.status' }
  ];

  // Time slot values are sent in the booking record, so they stay English; only the labels translate
  const timeSlotOptions = [
    { value: 'Morning Shubh Muhurat (07:30 AM - 10:00 AM)', labelKey: 'booking.time-slot.morning' },
    { value: 'Mid-day Auspicious (10:30 AM - 01:00 PM)', labelKey: 'booking.time-slot.midday' },
    { value: 'Evening Pradosh (05:00 PM - 07:30 PM)', labelKey: 'booking.time-slot.evening' },
    { value: 'Time to be decided with Panditji', labelKey: 'booking.time-slot.to-be-decided' }
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
                title={t('booking.back-title')}
                aria-label={t('booking.back-label')}
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
                <span>{t('booking.header-tagline')}</span>
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
                {step === 'puja' && (city ? t('booking.title.puja-for-city', { city }) : t('booking.title.puja'))}
                {step === 'city' && (currentService ? t('booking.title.city-for-service', { name: currentService.name }) : t('booking.title.city'))}
                {step === 'packages' && t('booking.title.packages', { name: activeService.name })}
                {step === 'samagri' && t('booking.title.samagri', { name: activeService.name })}
                {step === 'details' && t('booking.title.details')}
                {step === 'confirmation' && t('booking.title.confirmation')}
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
            aria-label={t('booking.close')}
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
                  <span>{t(s.labelKey)}</span>
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
                    {t('booking.service-location')}<strong style={{ color: '#BD4B23' }}>{city}</strong>
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
                  {t('booking.change-city')}
                </button>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                {t('booking.puja-intro.before')}<strong>{city}</strong>{t('booking.puja-intro.after')}
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
                  placeholder={t('booking.search-placeholder')}
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
                        {svc.indicativePrice || t('booking.starting-quote')}
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
                      <span>{t('booking.select')}</span>
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
                  {t('booking.selected-ceremony')}<strong style={{ color: '#BD4B23' }}>{activeService.name}</strong>
                </span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                {t('booking.city-intro')}
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
                        {c.name === 'Pune' ? t('booking.city-mode.pune-hub') : (c.popular ? t('booking.city-mode.direct') : t('booking.city-mode.pan-india'))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional Locality Specification */}
              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  {t('booking.locality-label.before')}{city}{t('booking.locality-label.after')}
                </label>
                <input
                  type="text"
                  placeholder={
                    ({
                      Chennai: t('booking.locality-placeholder.chennai'),
                      Mumbai: t('booking.locality-placeholder.mumbai'),
                      Bangalore: t('booking.locality-placeholder.bangalore'),
                      Pune: t('booking.locality-placeholder.pune'),
                      Delhi: t('booking.locality-placeholder.delhi'),
                      Hyderabad: t('booking.locality-placeholder.hyderabad'),
                      Nashik: t('booking.locality-placeholder.nashik')
                    })[city] || t('booking.locality-placeholder.default', { city })
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
                  <span>{t('booking.continue-to-packages')}</span>
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
                  <strong style={{ color: '#BD4B23' }}>{activeService.name}</strong>{t('booking.location-sep')}<strong>{city} {locality ? `(${locality})` : ''}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setStep('puja')}
                    style={{ background: 'none', border: 'none', color: '#BD4B23', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                  >
                    {t('booking.change-puja')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('city')}
                    style={{ background: 'none', border: 'none', color: '#BD4B23', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                  >
                    {t('booking.change-city')}
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
                      onClick={() => setSelectedPkg(pkg)}
                      style={{
                        borderRadius: '18px',
                        border: isSelected ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                        background: isSelected ? '#FFFAF7' : '#FFFFFF',
                        padding: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 10px 24px rgba(189, 75, 35, 0.12)' : 'var(--shadow-sm)',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
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
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPkg(pkg);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedPkg(pkg);
                            }
                          }}
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #BD4B23' : '2px solid #D8D2C4',
                            background: '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                            flexShrink: 0
                          }}
                          title={isSelected ? 'Package Selected' : `Select ${pkg.name}`}
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
                          {pkg.priceNote || t('booking.price-note-default')}
                        </div>
                      </div>

                      {/* Short 2-3 Inclusions Only */}
                      <div style={{ marginBottom: '20px', borderTop: '1px solid #F0EDE6', paddingTop: '14px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          {t('booking.key-inclusions')}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPackage(pkg);
                        }}
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
                        <span>{isSelected ? t('booking.package-selected') : t('booking.select-package')}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Notice */}
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                {t('booking.packages-footnote')}
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
                  {t('booking.selected')}<strong style={{ color: '#BD4B23' }}>{livePkg?.name || t('booking.ritual-package')}</strong> ({livePkg?.priceDisplay || t('booking.custom-quote')})
                </div>
                <button
                  type="button"
                  onClick={() => setStep('packages')}
                  style={{ background: 'none', border: 'none', color: '#BD4B23', textDecoration: 'underline', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                >
                  {t('booking.change-package')}
                </button>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                {t('booking.samagri-intro')}
              </p>

              {/* Samagri Checklist Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {samagriOptions.map(opt => {
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
                                {t('booking.included-in')}{livePkg?.name?.split('—')[0] || t('booking.package-b')}
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
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>{t('booking.included-zero')}</span>
                        ) : opt.price !== null ? (
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#BD4B23' }}>+{opt.priceDisplay}</span>
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#78716C' }}>{t('booking.price-tbc')}</span>
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
                    {t('booking.estimated-total')}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#BD4B23' }}>
                    {pricingSummary.displayString}
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {pricingSummary.hasUnconfirmedPrices ? (
                    <span>{t('booking.total-note.unconfirmed')}</span>
                  ) : (
                    <span>{t('booking.total-note.verified')}</span>
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
                  {t('booking.continue-without-extras')}
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
                  <span>{t('booking.continue-to-details')}</span>
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
                  <strong style={{ color: '#BD4B23' }}>{activeService.name}</strong> • {city} • {livePkg?.name || t('booking.selected-package')}
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
                      {t('booking.ceremony-date')}{needMuhuratConsult ? t('booking.consulting-panditji') : '*'}
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
                      <span>{t('booking.calculate-muhurat')}</span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      {t('booking.time-slot-label')}
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
                      {timeSlotOptions.map(o => (
                        <option key={o.value} value={o.value}>{t(o.labelKey)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Devotee Name & Phone */}
                <div className="vp-modal-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      {t('booking.name-label')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('booking.name-placeholder')}
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
                      {t('booking.phone-label')}
                    </label>
                    <input
                      type="tel"
                      placeholder={t('booking.phone-placeholder')}
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
                    {t('booking.address-label')}{city} *
                  </label>
                  <input
                    type="text"
                    placeholder={t('booking.address-placeholder')}
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
                      {t('booking.gotra-label')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('booking.gotra-placeholder')}
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
                      {t('booking.language-label')}
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
                      <option value="Hindi & Sanskrit">{t('booking.language.hindi-sanskrit')}</option>
                      <option value="Hindi Only">{t('booking.language.hindi')}</option>
                      <option value="Sanskrit Only">{t('booking.language.sanskrit')}</option>
                    </select>
                  </div>
                </div>

                {/* Additional Devotee Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    {t('booking.notes-label')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('booking.notes-placeholder')}
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
                  <span>{t('booking.back-to-samagri')}</span>
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
                  {isSubmitting ? t('booking.submitting') : t('booking.submit')}
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
                // Builds the WhatsApp fallback message to the business, so it stays English
                enquiryData={{
                  customerName: customerName || 'Devotee',
                  phone,
                  serviceName: activeService?.name,
                  city,
                  locality,
                  selectedPackage: livePkgEn?.name || 'Vedic Vidhi',
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
