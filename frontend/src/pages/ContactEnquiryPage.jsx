import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO, SERVICES, PUNE_LOCALITIES } from '../data/vedicPanditData';
import { submitEnquiryToWebhook, buildWhatsAppEnquiryUrl, generateSubmissionId } from '../services/webhookService';
import EnquiryConfirmationView from '../components/common/EnquiryConfirmationView';
import { Analytics } from '../utils/analytics';
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
      showToast('Enquiry received! Our senior Vedic Acharyas will review your Muhurat request shortly.');
    } else if (result.status === 'unavailable' || !result.isConfigured) {
      showToast('Online enquiry could not be sent. Please contact Panditji via WhatsApp or Phone.', 'warning');
    } else {
      showToast(result.message || 'Error sending enquiry. Please contact Panditji directly.', 'error');
    }
  };

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>Home</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Contact &amp; Shubh Muhurat Enquiry</span>
        </nav>

        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
          <span className="section-tag" style={{ marginBottom: '10px', display: 'inline-block' }}>Direct Pandit Consultation</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 800, marginBottom: '12px' }}>
            Contact VedicPanditji Acharyas
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Need Shubh Muhurat calculation, gotra sankalp guidance, or booking an authentic North Indian Pandit in Pune, PCMC, or anywhere across India? Reach out directly.
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
                    Direct Helpline &amp; WhatsApp
                  </div>
                  <a href={`tel:${BRAND_INFO.phoneClean}`} style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent-saffron)', textDecoration: 'none' }}>
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Direct helpline for instant Muhurat guidance, samagri verification, and priest scheduling.
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
                    Official Email Support
                  </div>
                  <a href={`mailto:${BRAND_INFO.email}`} style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Send ceremony itineraries, Gotra details, or wedding schedules.
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
                    Primary Hub &amp; Service Coverage
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Pune &amp; Pimpri-Chinchwad (PCMC)
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Verified doorstep coverage across all residential societies in Pune and PCMC, with all-India availability for visiting Acharyas and live E-Pujas.
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
                    Consultation Hours
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    06:30 AM – 09:30 PM (Daily)
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Available 7 days a week including Sundays and festival days for auspicious Muhurat calculations.
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
                  <span>Vedic Shubh Muhurat Consultation</span>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Send Ceremony Enquiry
                </h2>
                
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
                  Fill in your details and our senior Acharyas will review your Shubh Muhurat window and confirm priest availability.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alok Sharma"
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit number"
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Pune / PCMC Locality *
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
                      Ceremony / Pooja Required *
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={e => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      style={{ width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid var(--border-medium)', fontSize: '13.5px', background: '#FFFFFF', outline: 'none' }}
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Custom Family Pooja">Other Custom Vedic Ceremony</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '6px' }}>
                      Preferred Date (or Approx)
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
                    Special Requirements, Gotra, or Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention family Gotra, Nakshatra, or any special vidhi requests..."
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
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry to VedicPanditji Acharyas'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
