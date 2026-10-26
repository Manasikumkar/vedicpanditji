import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO, SERVICES, PUNE_LOCALITIES } from '../data/vedicPanditData';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export default function ContactEnquiryPage() {
  const { navigateTo, openWhatsAppEnquiry, showToast } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'Wakad, Pune',
    tradition: 'North Indian / Hindi',
    serviceNeeded: 'Satyanarayan Puja',
    datePreference: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Enquiry received! Pandit Jitendra Chaubey will review your Muhurat request shortly.');
  };

  const handleWhatsAppSend = () => {
    const text = `Namaste Panditji, I submitted an enquiry on VedicPanditji:\n- Name: ${formData.name}\n- Phone: ${formData.phone}\n- Locality: ${formData.locality}\n- Ceremony: ${formData.serviceNeeded}\n- Date: ${formData.datePreference || 'Flexible'}\n- Message: ${formData.message || 'Please consult on Shubh Muhurat'}`;
    openWhatsAppEnquiry(text);
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Contact &amp; Shubh Muhurat Enquiry</span>
          </div>
          <span className="section-tag">Direct Pandit Consultation</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, marginBottom: '14px' }}>
            Contact Acharya Jitendra Chaubey
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Need Shubh Muhurat calculation, personalized family Gotra vidhi, or booking a verified North Indian Pandit in Pune or anywhere across India? Reach out directly.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '40px',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Helpline & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Phone Card */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EAE5D9', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-saffron)' }}>
                  <PhoneCall size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Direct Helpline &amp; WhatsApp
                  </div>
                  <a href={`tel:${BRAND_INFO.phoneRaw}`} style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Dedicated direct line to Pandit Jitendra Chaubey for instant Muhurat guidance, dakshina details, and priest assignments in Pune.
              </p>
            </div>

            {/* Email Card */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EAE5D9', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official Email Support
                  </div>
                  <a href={`mailto:${BRAND_INFO.email}`} style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Send ceremony requirements, wedding itineraries, or corporate inauguration invitations.
              </p>
            </div>

            {/* Location & Office */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EAE5D9', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Head Office &amp; Sanctum
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {BRAND_INFO.address.street}, {BRAND_INFO.address.city}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Doorstep service across Hinjewadi, Wakad, Baner, Kothrud, Hadapsar, Kharadi, Viman Nagar, and all of Pimpri-Chinchwad.
              </p>
            </div>

            {/* Operating Hours */}
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EAE5D9', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Consultation Hours
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    6:00 AM – 10:00 PM (7 Days a Week)
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Early morning Brahma Muhurat Griha Pravesh and Hawans supported with advance scheduling.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div
            className="contact-form-card"
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px',
              border: '1px solid #EAE5D9',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
                  Enquiry Received with Reverence!
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 20px' }}>
                  Thank you, <strong>{formData.name}</strong>. Acharya Jitendra Chaubey has received your request for <strong>{formData.serviceNeeded}</strong> at <strong>{formData.locality}</strong>.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleWhatsAppSend}
                    className="btn-primary"
                    style={{ background: '#059669', borderColor: '#059669', padding: '12px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <MessageCircle size={18} />
                    <span>Send on WhatsApp Instantly</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                    style={{ padding: '12px 24px', cursor: 'pointer' }}
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="badge-saffron" style={{ marginBottom: '10px' }}>
                  <Sparkles size={12} />
                  <span>Vedic Shubh Muhurat Consultation</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
                  Send Puja Enquiry to VedicPanditji
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Fill in your details and Acharya Jitendra Chaubey will connect with personalized Muhurat guidance and dakshina breakdown.
                </p>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alok Sharma"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                </div>

                <div className="grid-3" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Pune Locality / Area *
                    </label>
                    <select
                      value={formData.locality}
                      onChange={e => setFormData({ ...formData, locality: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8', background: '#FFFFFF' }}
                    >
                      {PUNE_LOCALITIES.map((loc, idx) => (
                        <option key={idx} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Ritual Language &amp; Tradition
                    </label>
                    <select
                      value={formData.tradition}
                      onChange={e => setFormData({ ...formData, tradition: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8', background: '#FFFFFF' }}
                    >
                      <option value="Hindi & Sanskrit (North Indian Vedic)">Hindi &amp; Sanskrit (North Indian Vedic)</option>
                      <option value="Sanskrit Vedic Karmakanda">Sanskrit Vedic Karmakanda</option>
                      <option value="Hindi / Bihari Tradition (Sanskrit Mantras)">Hindi / Bihari Tradition (Sanskrit Mantras)</option>
                      <option value="Arya Samaj Vidhi (Sanskrit Mantras)">Arya Samaj Vidhi (Sanskrit Mantras)</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Ceremony / Pooja Required *
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={e => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8', background: '#FFFFFF' }}
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Custom Family Pooja">Other Custom Pooja / Hawan</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      Preferred Date (or Approx Month)
                    </label>
                    <input
                      type="date"
                      value={formData.datePreference}
                      onChange={e => setFormData({ ...formData, datePreference: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Special Requirements, Gotra, or Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention family Gotra, Nakshatra, or any special vidhi requests..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '15px', cursor: 'pointer' }}
                >
                  <Send size={16} />
                  <span>Submit Enquiry to Acharya Jitendra Chaubey</span>
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
