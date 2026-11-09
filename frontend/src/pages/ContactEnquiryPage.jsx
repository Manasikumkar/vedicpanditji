import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO, SERVICES, PUNE_LOCALITIES } from '../data/vedicPanditData';
import { submitEnquiryToWebhook, buildWhatsAppEnquiryUrl, generateSubmissionId } from '../services/webhookService';
import EnquiryConfirmationView from '../components/common/EnquiryConfirmationView';
import { Analytics } from '../utils/analytics';
import { useI18n } from '../i18n/useI18n';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  Home
} from 'lucide-react';

export default function ContactEnquiryPage() {
  const { navigateTo, showToast } = useApp();
  const { lang, t, locServiceName } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'Wakad',
    tradition: 'North Indian / Hindi',
    serviceNeeded: 'Satyanarayan Puja',
    datePreference: '',
    message: '',
    website_hp: '' // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  const L = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbContact: 'संपर्क व शुभ मुहूर्त चौकशी',
      sectionTag: 'थेट पंडित सल्लामसलत',
      h1: 'वैदिकपंडितजी आचार्यांशी संपर्क साधा',
      tagline: 'शुभ मुहूर्त गणना, गोत्र संकल्प मार्गदर्शन किंवा पुणे, पिंपरी-चिंचवड व संपूर्ण देशभरात अस्सल उत्तर भारतीय पंडित बुकिंगसाठी थेट संपर्क साधा.',
      helplineTitle: 'थेट आचार्य हेल्पलाइन',
      helplineDesc: 'त्वरित मुहूर्त मार्गदर्शन, पूजा साहित्य पडताळणी आणि पंडित वेळेचे नियोजनासाठी थेट संपर्क करा.',
      emailTitle: 'अधिकृत ईमेल सपोर्ट',
      emailDesc: 'विधी रूपरेषा, गोत्र तपशील किंवा विवाहाचे वेळापत्रक ईमेल करा.',
      hubTitle: 'प्रमुख केंद्र व सेवा विस्तार',
      hubDesc: 'पुणे व पिंपरी-चिंचवडमधील सर्व सोसायट्यांमध्ये थेट घरपोच सेवा, तसेच प्रमुख शहरांमध्ये प्रवास करणारे आचार्य आणि थेट ई-पूजा उपलब्ध.',
      hoursTitle: 'सल्लामसलत वेळ',
      hoursTime: 'सकाळी ०६:३० ते रात्री ०९:३० (दररोज)',
      hoursDesc: 'शुभ मुहूर्त काढण्यासाठी रविवार आणि सणांच्या दिवसांसह आठवड्याचे सातही दिवस उपलब्ध.',
      formBadge: 'वैदिक शुभ मुहूर्त सल्लामसलत',
      formTitle: 'पूजा चौकशी पाठवा',
      formDesc: 'तुमची माहिती भरा, आमचे ज्येष्ठ आचार्य तुमच्या शुभ मुहूर्ताची पडताळणी करतील आणि पुरोहितांची उपलब्धता निश्चित करतील.',
      nameLabel: 'तुमचे पूर्ण नाव *',
      namePlaceholder: 'उदा. आलोक शर्मा',
      phoneLabel: 'मोबाईल / व्हॉट्सअॅप *',
      phonePlaceholder: '१० अंकी मोबाईल क्रमांक',
      emailLabel: 'ईमेल पत्ता (ऐच्छिक)',
      emailPlaceholder: 'name@email.com',
      localityLabel: 'पुणे / PCMC परिसर *',
      serviceLabel: 'आवश्यक पूजा / विधी *',
      otherCeremony: 'इतर सानुकूल वैदिक विधी',
      dateLabel: 'पसंतीची तारीख (किंवा अंदाजे तारीख)',
      messageLabel: 'विशेष मागण्या, गोत्र किंवा चौकशी',
      messagePlaceholder: 'कुटुंबाचे गोत्र, नक्षत्र किंवा विशेष विधीच्या मागण्या नमूद करा...',
      submitBtn: 'वैदिकपंडितजी आचार्यांना चौकशी पाठवा',
      submittingBtn: 'चौकशी पाठवत आहे...',
      toastSuccess: 'चौकशी प्राप्त झाली! आमचे ज्येष्ठ वैदिक आचार्य लवकरच तुमच्या शुभ मुहूर्ताची पडताळणी करतील.',
      toastWarn: 'ऑनलाइन चौकशी पाठवता आली नाही. कृपया व्हॉट्सअॅप किंवा फोनद्वारे थेट संपर्क साधा.',
      toastErr: 'चौकशी पाठवताना त्रुटी आली. कृपया थेट संपर्क साधा.'
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbContact: 'संपर्क एवं शुभ मुहूर्त पूछताछ',
      sectionTag: 'सीधा पंडित परामर्श',
      h1: 'वैदिकपंडितजी आचार्यों से संपर्क करें',
      tagline: 'शुभ मुहूर्त गणना, गोत्र संकल्प मार्गदर्शन अथवा पुणे, पिंपरी-चिंचवड व समस्त भारत में प्रामाणिक उत्तर भारतीय पंडित बुकिंग हेतु सीधा संपर्क करें।',
      helplineTitle: 'सीधी आचार्य हेल्पलाइन',
      helplineDesc: 'त्वरित मुहूर्त परामर्श, पूजन सामग्री सत्यापन एवं पंडित जी की उपलब्धता हेतु सीधा संपर्क करें।',
      emailTitle: 'आधिकारिक ईमेल सहायता',
      emailDesc: 'अनुष्ठान विवरण, गोत्र जानकारी अथवा विवाह कार्यक्रम ईमेल करें।',
      hubTitle: 'प्रमुख केंद्र एवं सेवा विस्तार',
      hubDesc: 'पुणे व पिंपरी-चिंचवड की सभी सोसायटियों में घर पर सेवा, तथा प्रमुख शहरों में भ्रमणशील आचार्य एवं लाइव ई-पूजा उपलब्ध।',
      hoursTitle: 'परामर्श समय',
      hoursTime: 'प्रातः 06:30 से रात्रि 09:30 (प्रतिदिन)',
      hoursDesc: 'शुभ मुहूर्त निर्धारण हेतु रविवार एवं पर्व-त्योहारों सहित सप्ताह के सातों दिन उपलब्ध।',
      formBadge: 'वैदिक शुभ मुहूर्त परामर्श',
      formTitle: 'पूजा पूछताछ भेजें',
      formDesc: 'अपना विवरण भरें, हमारे वरिष्ठ आचार्य आपके शुभ मुहूर्त की समीक्षा करेंगे और पुरोहित उपलब्धता सुनिश्चित करेंगे।',
      nameLabel: 'आपका पूरा नाम *',
      namePlaceholder: 'उदा. आलोक शर्मा',
      phoneLabel: 'मोबाइल / व्हाट्सएप *',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर',
      emailLabel: 'ईमेल पता (वैकल्पिक)',
      emailPlaceholder: 'name@email.com',
      localityLabel: 'पुणे / PCMC क्षेत्र *',
      serviceLabel: 'वांछित पूजा / अनुष्ठान *',
      otherCeremony: 'अन्य वैदिक अनुष्ठान',
      dateLabel: 'पसंदीदा तिथि (या संभावित तिथि)',
      messageLabel: 'विशेष आवश्यकताएँ, गोत्र अथवा पूछताछ',
      messagePlaceholder: 'पारिवारिक गोत्र, नक्षत्र अथवा विशेष अनुष्ठान का उल्लेख करें...',
      submitBtn: 'वैदिकपंडितजी आचार्यों को पूछताछ भेजें',
      submittingBtn: 'पूछताछ भेजी जा रही है...',
      toastSuccess: 'पूछताछ प्राप्त हुई! हमारे वरिष्ठ वैदिक आचार्य शीघ्र ही आपके शुभ मुहूर्त की समीक्षा करेंगे।',
      toastWarn: 'ऑनलाइन पूछताछ नहीं भेजी जा सकी। कृपया व्हाट्सएप अथवा फोन द्वारा सीधा संपर्क करें।',
      toastErr: 'पूछताछ भेजने में त्रुटि हुई। कृपया सीधा संपर्क करें।'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbContact: 'Contact & Shubh Muhurat Enquiry',
      sectionTag: 'Direct Pandit Consultation',
      h1: 'Contact VedicPanditji Acharyas',
      tagline: 'Need Shubh Muhurat calculation, gotra sankalp guidance, or booking an authentic North Indian Pandit in Pune, PCMC, or anywhere across India? Reach out directly.',
      helplineTitle: 'Direct Acharya Helpline',
      helplineDesc: 'Direct helpline for instant Muhurat guidance, samagri verification, and priest scheduling.',
      emailTitle: 'Official Email Support',
      emailDesc: 'Send ceremony itineraries, Gotra details, or wedding schedules.',
      hubTitle: 'Primary Hub & Service Coverage',
      hubDesc: 'Verified doorstep coverage across all residential societies in Pune and PCMC, with all-India availability for visiting Acharyas and live E-Pujas.',
      hoursTitle: 'Consultation Hours',
      hoursTime: '06:30 AM – 09:30 PM (Daily)',
      hoursDesc: 'Available 7 days a week including Sundays and festival days for auspicious Muhurat calculations.',
      formBadge: 'Vedic Shubh Muhurat Consultation',
      formTitle: 'Send Ceremony Enquiry',
      formDesc: 'Fill in your details and our senior Acharyas will review your Shubh Muhurat window and confirm priest availability.',
      nameLabel: 'Your Full Name *',
      namePlaceholder: 'e.g. Alok Sharma',
      phoneLabel: 'Mobile / WhatsApp *',
      phonePlaceholder: '10-digit number',
      emailLabel: 'Email Address (Optional)',
      emailPlaceholder: 'name@email.com',
      localityLabel: 'Pune / PCMC Locality *',
      serviceLabel: 'Ceremony / Pooja Required *',
      otherCeremony: 'Other Custom Vedic Ceremony',
      dateLabel: 'Preferred Date (or Approx)',
      messageLabel: 'Special Requirements, Gotra, or Inquiries',
      messagePlaceholder: 'Mention family Gotra, Nakshatra, or any special vidhi requests...',
      submitBtn: 'Submit Enquiry to VedicPanditji Acharyas',
      submittingBtn: 'Submitting Enquiry...',
      toastSuccess: 'Enquiry received! Our senior Vedic Acharyas will review your Muhurat request shortly.',
      toastWarn: 'Online enquiry could not be sent. Please contact Panditji via WhatsApp or Phone.',
      toastErr: 'Error sending enquiry. Please contact Panditji directly.'
    }
  }[lang] || {
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact & Shubh Muhurat Enquiry',
    sectionTag: 'Direct Pandit Consultation',
    h1: 'Contact VedicPanditji Acharyas',
    tagline: 'Need Shubh Muhurat calculation, gotra sankalp guidance, or booking an authentic North Indian Pandit in Pune, PCMC, or anywhere across India? Reach out directly.',
    helplineTitle: 'Direct Acharya Helpline',
    helplineDesc: 'Direct helpline for instant Muhurat guidance, samagri verification, and priest scheduling.',
    emailTitle: 'Official Email Support',
    emailDesc: 'Send ceremony itineraries, Gotra details, or wedding schedules.',
    hubTitle: 'Primary Hub & Service Coverage',
    hubDesc: 'Verified doorstep coverage across all residential societies in Pune and PCMC, with all-India availability for visiting Acharyas and live E-Pujas.',
    hoursTitle: 'Consultation Hours',
    hoursTime: '06:30 AM – 09:30 PM (Daily)',
    hoursDesc: 'Available 7 days a week including Sundays and festival days for auspicious Muhurat calculations.',
    formBadge: 'Vedic Shubh Muhurat Consultation',
    formTitle: 'Send Ceremony Enquiry',
    formDesc: 'Fill in your details and our senior Acharyas will review your Shubh Muhurat window and confirm priest availability.',
    nameLabel: 'Your Full Name *',
    namePlaceholder: 'e.g. Alok Sharma',
    phoneLabel: 'Mobile / WhatsApp *',
    phonePlaceholder: '10-digit number',
    emailLabel: 'Email Address (Optional)',
    emailPlaceholder: 'name@email.com',
    localityLabel: 'Pune / PCMC Locality *',
    serviceLabel: 'Ceremony / Pooja Required *',
    otherCeremony: 'Other Custom Vedic Ceremony',
    dateLabel: 'Preferred Date (or Approx)',
    messageLabel: 'Special Requirements, Gotra, or Inquiries',
    messagePlaceholder: 'Mention family Gotra, Nakshatra, or any special vidhi requests...',
    submitBtn: 'Submit Enquiry to VedicPanditji Acharyas',
    submittingBtn: 'Submitting Enquiry...',
    toastSuccess: 'Enquiry received! Our senior Vedic Acharyas will review your Muhurat request shortly.',
    toastWarn: 'Online enquiry could not be sent. Please contact Panditji via WhatsApp or Phone.',
    toastErr: 'Error sending enquiry. Please contact Panditji directly.'
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    const activeSubId = submissionId || generateSubmissionId();
    if (!submissionId) {
      setSubmissionId(activeSubId);
    }

    Analytics.trackFormStarted('contact_enquiry', { service: formData.serviceNeeded, locality: formData.locality });

    const result = await submitEnquiryToWebhook({
      submissionId: activeSubId,
      formType: 'contact_enquiry',
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceName: formData.serviceNeeded,
      city: 'Pune',
      locality: formData.locality,
      language: formData.tradition,
      date: formData.datePreference || 'Flexible',
      notes: formData.message,
      website_hp: formData.website_hp
    });

    setIsSubmitting(false);
    setSubmissionResult(result);

    if (result.success) {
      Analytics.trackFormSubmitted('contact_enquiry', { serviceName: formData.serviceNeeded });
      showToast(L.toastSuccess);
    } else if (result.status === 'unavailable' || !result.isConfigured) {
      showToast(L.toastWarn, 'warning');
    } else {
      showToast(result.message || L.toastErr, 'error');
    }
  };

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>{L.breadcrumbHome}</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbContact}</span>
        </nav>

        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
          <span className="section-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>{L.sectionTag}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, marginBottom: '12px' }}>
            {L.h1}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            {L.tagline}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: '32px' }} className="contact-grid">
          
          {/* Left Column: Direct Helpline & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Phone Card */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-saffron)' }}>
                  <PhoneCall size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {L.helplineTitle}
                  </div>
                  <a href={'tel:' + BRAND_INFO.phoneClean} style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-saffron)', textDecoration: 'none' }}>
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {L.helplineDesc}
              </p>
            </div>

            {/* Email Card */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {L.emailTitle}
                  </div>
                  <a href={'mailto:' + BRAND_INFO.email} style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {L.emailDesc}
              </p>
            </div>

            {/* Service Coverage Area */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {L.hubTitle}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Pune &amp; Pimpri-Chinchwad (PCMC)
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {L.hubDesc}
              </p>
            </div>

            {/* Consultation Hours */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {L.hoursTitle}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {L.hoursTime}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {L.hoursDesc}
              </p>
            </div>

          </div>

          {/* Right Column: Enquiry Form or Status View */}
          <div style={{ background: '#FFFFFF', padding: '36px', borderRadius: '24px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            
            {isSubmitting || submissionResult ? (
              <EnquiryConfirmationView
                state={
                  isSubmitting
                    ? 'loading'
                    : (submissionResult?.success
                        ? 'success'
                        : (submissionResult?.status === 'unavailable' || submissionResult?.isUnavailable
                            ? 'unavailable'
                            : 'error'))
                }
                enquiryType="contact_enquiry"
                enquiryData={{
                  customerName: formData.name,
                  phone: formData.phone,
                  email: formData.email,
                  serviceName: formData.serviceNeeded,
                  city: 'Pune',
                  locality: formData.locality,
                  preferredDate: formData.datePreference || 'Flexible',
                  customerNotes: formData.message
                }}
                result={submissionResult}
                onRetry={handleSubmit}
                onClose={() => {
                  setSubmissionResult(null);
                  setSubmissionId(null);
                }}
                onEdit={() => setSubmissionResult(null)}
              />
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot field (hidden from legitimate users) */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'var(--accent-saffron-light)', color: 'var(--accent-saffron)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                  <Sparkles size={13} />
                  <span>{L.formBadge}</span>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  {L.formTitle}
                </h2>
                
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
                  {L.formDesc}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      {L.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={L.namePlaceholder}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      {L.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={L.phonePlaceholder}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      {L.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder={L.emailPlaceholder}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      {L.localityLabel}
                    </label>
                    <select
                      value={formData.locality}
                      onChange={e => setFormData({ ...formData, locality: e.target.value })}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', background: '#FFFFFF', outline: 'none' }}
                    >
                      {PUNE_LOCALITIES.map((loc, idx) => (
                        <option key={idx} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      {L.serviceLabel}
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={e => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', background: '#FFFFFF', outline: 'none' }}
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.name}>{locServiceName(s)}</option>
                      ))}
                      <option value="Custom Family Pooja">{L.otherCeremony}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      {L.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={formData.datePreference}
                      onChange={e => setFormData({ ...formData, datePreference: e.target.value })}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                    {L.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={L.messagePlaceholder}
                    style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isSubmitting ? 0.75 : 1
                  }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? L.submittingBtn : L.submitBtn}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
