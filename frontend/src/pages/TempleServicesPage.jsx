import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TEMPLE_SERVICES } from '../data/vedicPanditData';
import {
  Landmark,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video,
  HeartHandshake,
  X,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  MessageCircle
} from 'lucide-react';

export default function TempleServicesPage() {
  const { navigateTo, openBookingModal, openWhatsAppEnquiry, setEnquiries, showToast, user } = useApp();

  const [selectedTempleForSeva, setSelectedTempleForSeva] = useState(null);
  const [selectedRitualName, setSelectedRitualName] = useState('');
  const [sevaMode, setSevaMode] = useState('Remote Sankalpam & Courier Prasad');
  const [devoteeName, setDevoteeName] = useState(user?.name || '');
  const [gotra, setGotra] = useState(user?.gotra || '');
  const [devoteePhone, setDevoteePhone] = useState(user?.phone || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [ancestorNotes, setAncestorNotes] = useState('');
  const [sevaSubmitted, setSevaSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  const handleOpenSevaModal = (temple) => {
    setSelectedTempleForSeva(temple);
    setSelectedRitualName(temple.rituals?.[0]?.name || 'Kshetra Sankalpam');
    setSevaMode('Remote Sankalpam & Courier Prasad');
    setDevoteeName(user?.name || '');
    setGotra(user?.gotra || '');
    setDevoteePhone(user?.phone || '');
    setPreferredDate('');
    setAncestorNotes('');
    setSevaSubmitted(false);
  };

  const handleCloseSevaModal = () => {
    setSelectedTempleForSeva(null);
    setSevaSubmitted(false);
  };

  const handleSevaSubmit = (e) => {
    e.preventDefault();
    if (!devoteeName.trim() || !devoteePhone.trim()) {
      showToast('Please enter your name and contact phone number', 'error');
      return;
    }

    const refId = `SEVA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refId);

    const activeRitual = selectedTempleForSeva?.rituals?.find(r => r.name === selectedRitualName) || {
      name: selectedRitualName,
      price: selectedTempleForSeva?.startingPrice || 4200
    };

    const newEnquiry = {
      id: refId,
      date: new Date().toISOString().split('T')[0],
      service: `Temple Seva: ${selectedTempleForSeva?.title || selectedTempleForSeva?.name} - ${activeRitual.name}`,
      category: 'Temple Pilgrimage',
      package: sevaMode,
      price: activeRitual.price,
      customerName: devoteeName,
      phone: devoteePhone,
      city: selectedTempleForSeva?.location || selectedTempleForSeva?.state,
      dateSlot: preferredDate || 'As per Shubh Muhurat / Tithi',
      gotra: gotra || 'Kashyap / Devotee Gotra',
      address: sevaMode === 'Remote Sankalpam & Courier Prasad' ? 'Remote (Prasadam Courier)' : 'In-Person Kshetra Visit',
      status: 'Enquiry Received',
      notes: ancestorNotes || `Ritual: ${activeRitual.name}. Mode: ${sevaMode}`
    };

    setEnquiries(prev => [newEnquiry, ...(prev || [])]);
    setSevaSubmitted(true);
    showToast('Temple Seva enquiry submitted successfully!');
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Temple Services & Pilgrimage</span>
          </div>
          <span className="section-tag">Sacred Kshetras</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, marginBottom: '14px' }}>
            Temple Pilgrimage Services &amp; Remote Sevas
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            VedicPanditji coordinates authentic sacred Kshetra rituals at Kashi, Gaya, Trimbakeshwar, and Rameshwaram through verified Tirtha Purohits, supporting both in-person pilgrimage visits and remote sankalpam with consecrated Prasad courier worldwide.
          </p>
        </div>

        {/* Global E-Puja Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '48px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '650px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--accent-saffron)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Video size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                Cannot travel in person? Book an Online E-Puja via Live Zoom
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Perform regular home pujas and havans online anywhere in the world. Priests conduct the full sankalpam in your Gotra and Nakshatra.
              </p>
            </div>
          </div>
          <button
            onClick={() => openBookingModal(null, null, 'Online E-Puja (Pan-India & Global)')}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '13px', cursor: 'pointer' }}
          >
            Book Online E-Puja
          </button>
        </div>

        {/* Kshetras Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {TEMPLE_SERVICES.map(temple => (
            <div
              key={temple.id}
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
              <div
                style={{
                  height: '220px',
                  position: 'relative',
                  backgroundImage: `url(${temple.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <MapPin size={14} color="var(--accent-gold)" />
                  <span>{temple.location || temple.state}</span>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                  {temple.title || temple.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
                  {temple.description}
                </p>

                {/* Key Rituals Preview */}
                {temple.rituals && temple.rituals.length > 0 && (
                  <div style={{ marginBottom: '16px', padding: '10px 12px', background: '#FDFBF7', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#BD4B23', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Available Rituals:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {temple.rituals.slice(0, 3).map((r, i) => (
                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>• {r.name}</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>₹{r.price.toLocaleString('en-IN')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Dakshina &amp; Seva From
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                      ₹{(temple.startingPrice ?? temple.rituals?.[0]?.price ?? 4200)?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenSevaModal(temple)}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    <span>Book Seva</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Sacred Temple Seva Modal */}
        {selectedTempleForSeva && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(26, 20, 16, 0.75)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                border: '1px solid #EAE5D9',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #EAE5D9',
                  background: 'linear-gradient(135deg, #FFFDF9 0%, #FBF6EC 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderRadius: '20px 20px 0 0'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#BD4B23', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                    Sacred Pilgrimage Kshetra Seva
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {selectedTempleForSeva.title || selectedTempleForSeva.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <MapPin size={12} color="var(--accent-gold)" />
                    <span>{selectedTempleForSeva.location || selectedTempleForSeva.state}</span>
                  </div>
                </div>
                <button
                  onClick={handleCloseSevaModal}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #EAE5D9',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px' }}>
                {!sevaSubmitted ? (
                  <form onSubmit={handleSevaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Ritual Select */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Select Sacred Ritual *
                      </label>
                      <select
                        value={selectedRitualName}
                        onChange={e => setSelectedRitualName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #D8D2C4',
                          fontSize: '14px',
                          background: '#FDFCF9',
                          outline: 'none'
                        }}
                      >
                        {selectedTempleForSeva.rituals?.map((r, i) => (
                          <option key={i} value={r.name}>
                            {r.name} — ₹{r.price.toLocaleString('en-IN')}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Pilgrimage Mode */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
                        Participation Mode *
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setSevaMode('Remote Sankalpam & Courier Prasad')}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: sevaMode === 'Remote Sankalpam & Courier Prasad' ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                            background: sevaMode === 'Remote Sankalpam & Courier Prasad' ? '#FFF9F5' : '#FFFFFF',
                            textAlign: 'left',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px'
                          }}
                        >
                          <span style={{ fontWeight: 700, color: sevaMode === 'Remote Sankalpam & Courier Prasad' ? '#BD4B23' : 'var(--text-main)' }}>
                            Remote Sankalpam
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Live video + Prasad courier
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSevaMode('In-Person Pilgrimage Visit')}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: sevaMode === 'In-Person Pilgrimage Visit' ? '2px solid #BD4B23' : '1px solid #EAE5D9',
                            background: sevaMode === 'In-Person Pilgrimage Visit' ? '#FFF9F5' : '#FFFFFF',
                            textAlign: 'left',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px'
                          }}
                        >
                          <span style={{ fontWeight: 700, color: sevaMode === 'In-Person Pilgrimage Visit' ? '#BD4B23' : 'var(--text-main)' }}>
                            In-Person Pilgrimage
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Attend at the Ghat / Kshetra
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Devotee Name & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          Devotee / Yajman Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={devoteeName}
                          onChange={e => setDevoteeName(e.target.value)}
                          placeholder="e.g. Ramesh Sharma"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid #D8D2C4',
                            fontSize: '13px',
                            background: '#FDFCF9',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={devoteePhone}
                          onChange={e => setDevoteePhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid #D8D2C4',
                            fontSize: '13px',
                            background: '#FDFCF9',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Gotra & Preferred Date */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          Gotra / Nakshatra (Optional)
                        </label>
                        <input
                          type="text"
                          value={gotra}
                          onChange={e => setGotra(e.target.value)}
                          placeholder="e.g. Kashyap / Rohini"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid #D8D2C4',
                            fontSize: '13px',
                            background: '#FDFCF9',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                          Preferred Date / Tithi
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={e => setPreferredDate(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid #D8D2C4',
                            fontSize: '13px',
                            background: '#FDFCF9',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Special Ancestor / Pitru Notes */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                        Ancestor / Family Details or Special Instructions
                      </label>
                      <textarea
                        rows={2}
                        value={ancestorNotes}
                        onChange={e => setAncestorNotes(e.target.value)}
                        placeholder="For Pinda Daan / Shradh, mention ancestors names or your travel itinerary."
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid #D8D2C4',
                          fontSize: '13px',
                          background: '#FDFCF9',
                          outline: 'none',
                          resize: 'none'
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ flex: 1, padding: '12px 20px', fontSize: '14px', cursor: 'pointer' }}
                      >
                        <span>Submit Sacred Seva Request</span>
                        <ArrowRight size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseSevaModal}
                        className="btn-secondary"
                        style={{ padding: '12px 20px', fontSize: '14px', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#E8F5E9',
                        color: '#2E7D32',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}
                    >
                      <CheckCircle2 size={32} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#BD4B23', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Reference ID: {submittedRef}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>
                      Har Har Mahadev! Seva Registered
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                      Your pilgrimage seva request for <strong>{selectedTempleForSeva.title || selectedTempleForSeva.name}</strong> ({selectedRitualName}) has been noted. Pandit Jitendra Chaubey and the local Kshetra Tirtha Purohit will connect with you to confirm the Shubh Muhurat and Sankalpam details.
                    </p>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => openWhatsAppEnquiry(`Namaste Panditji, I have submitted a pilgrimage seva request for ${selectedTempleForSeva.title || selectedTempleForSeva.name} (${selectedRitualName}), Reference: ${submittedRef}. Devotee: ${devoteeName}, Gotra: ${gotra || 'Not specified'}.`)}
                        style={{
                          background: '#25D366',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '12px 22px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <MessageCircle size={16} />
                        <span>Send Details on WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseSevaModal}
                        className="btn-secondary"
                        style={{ padding: '12px 20px', fontSize: '13px', cursor: 'pointer' }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
