import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  LogOut,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Home,
  MessageCircle,
  ArrowRight,
  Edit3,
  Trash2
} from 'lucide-react';

export default function MyAccountPage() {
  const { user, setUser, enquiries, deleteEnquiry, navigateTo, openWhatsAppEnquiry, callHelpline, showToast, BRAND_INFO } = useApp();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'profile', 'addresses'

  // Editable profile state initialized from current user session
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '+91 97668 80979',
    email: user?.email || '',
    city: user?.city || 'Pune',
    gotra: user?.gotra || 'Kashyapa / Shandilya',
    nakshatra: user?.nakshatra || 'Rohini',
    address: user?.address || 'Flat 402, Rohan Tarang, Wakad, Pune, Maharashtra 411057'
  });

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: '', email: '', phone: '', city: 'Pune' });
    showToast('You have been signed out successfully.');
    navigateTo('home');
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      ...profileForm,
      isLoggedIn: true
    });
    showToast('Devotee profile & Gotra details saved successfully!');
  };

  // 1. UNFAUTHENTICATED STATE
  if (!user || !user.isLoggedIn) {
    return (
      <div style={{ paddingTop: '110px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '42px 36px',
              border: '1px solid #EAE5D9',
              boxShadow: '0 20px 50px rgba(44, 39, 36, 0.08)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #BD4B23 0%, #C59A3F 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 24px rgba(189, 75, 35, 0.25)'
              }}
            >
              <User size={30} />
            </div>

            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#BD4B23', display: 'block', marginBottom: '6px' }}>
              Devotee Account &amp; Enquiries
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
              Sign In to Your VedicPanditji Account
            </h1>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
              Sign in to view your ceremony bookings, consult with Pandit Jitendra Chaubey regarding auspicious Shubh Muhurats, and track assigned Gurukul priests.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => navigateTo('auth')}
                className="btn-primary"
                style={{
                  padding: '14px',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <User size={16} />
                <span>Sign In / Register</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigateTo('catalogue')}
                className="btn-secondary"
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <span>Browse All 200+ Vedic Pujas</span>
              </button>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #EAE5D9', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <ShieldCheck size={14} color="#BD4B23" />
                <span>100% Verified Priests</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle2 size={14} color="#C59A3F" />
                <span>Direct WhatsApp Coordination</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header User Banner */}
        <div
          className="account-header-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px 36px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(189, 75, 35, 0.12)',
                color: '#BD4B23',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={32} />
            </div>
            <div>
              <div className="badge-saffron" style={{ marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={11} />
                <span>Verified Devotee Member</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>
                {user.name || 'Devotee'}
              </h1>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {user.email || 'Registered Devotee'} {user.phone ? `• ${user.phone}` : ''} • {user.city || 'Pune'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigateTo('catalogue')}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '13px', cursor: 'pointer' }}
            >
              <Sparkles size={14} />
              <span>Schedule New Puja</span>
            </button>
            <button
              onClick={handleLogout}
              className="btn-secondary"
              style={{ padding: '10px 16px', fontSize: '13px', color: '#DC2626', borderColor: '#FCA5A5', cursor: 'pointer' }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '32px',
            alignItems: 'start'
          }}
          className="account-grid"
        >
          {/* Left: Tab Menu */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EAE5D9',
              padding: '12px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <button
              onClick={() => setActiveTab('bookings')}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: activeTab === 'bookings' ? 700 : 500,
                background: activeTab === 'bookings' ? 'rgba(189, 75, 35, 0.1)' : 'transparent',
                color: activeTab === 'bookings' ? '#BD4B23' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={16} />
                <span>My Puja Enquiries</span>
              </div>
              <span style={{ background: '#BD4B23', color: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                {enquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: activeTab === 'profile' ? 700 : 500,
                background: activeTab === 'profile' ? 'rgba(189, 75, 35, 0.1)' : 'transparent',
                color: activeTab === 'profile' ? '#BD4B23' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <User size={16} />
              <span>Devotee Profile &amp; Gotra</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: activeTab === 'addresses' ? 700 : 500,
                background: activeTab === 'addresses' ? 'rgba(189, 75, 35, 0.1)' : 'transparent',
                color: activeTab === 'addresses' ? '#BD4B23' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <Home size={16} />
              <span>Saved Puja Address</span>
            </button>
          </div>

          {/* Right: Content Area */}
          <div>
            {/* 1. ENQUIRIES / BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                    My Puja Enquiries
                  </h3>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Saved Locally on This Browser
                  </span>
                </div>

                {/* Honest Storage Disclosure Banner */}
                {enquiries.length > 0 && (
                  <div
                    style={{
                      background: '#FFFBEB',
                      border: '1px solid #FCD34D',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      fontSize: '13px',
                      color: '#92400E',
                      lineHeight: 1.5,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}
                  >
                    <ShieldCheck size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Important Notice:</strong> Enquiries shown below are stored in your local browser history. If you have not yet contacted Panditji, tap <strong>"Send via WhatsApp"</strong> on any enquiry so Pandit Jitendra Chaubey can calculate the auspicious Shubh Muhurat and confirm priest availability.
                    </div>
                  </div>
                )}

                {enquiries.length === 0 ? (
                  <div style={{ background: '#FFFFFF', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid #EAE5D9' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      You have no saved puja enquiries on this device yet.
                    </p>
                    <button onClick={() => navigateTo('catalogue')} className="btn-primary" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                      Schedule a Vedic Ceremony
                    </button>
                  </div>
                ) : (
                  enquiries.map(enquiry => (
                    <div
                      key={enquiry.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid #EAE5D9',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {/* Top Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', borderBottom: '1px solid #EAE5D9', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
                            Draft Ref: {enquiry.id} • Saved on {enquiry.date}
                          </div>
                          <h4 style={{ fontSize: '19px', fontWeight: 800, marginTop: '4px', color: 'var(--text-main)' }}>
                            {enquiry.serviceName}
                          </h4>
                          <div style={{ fontSize: '13px', color: '#BD4B23', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <MapPin size={13} />
                            <span>{enquiry.city} • Package: {enquiry.packageName} ({enquiry.packagePrice})</span>
                          </div>
                        </div>

                        <span
                          style={{
                            background: enquiry.isDraftOnly ? '#FEF3C7' : '#DCFCE7',
                            color: enquiry.isDraftOnly ? '#92400E' : '#15803D',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: enquiry.isDraftOnly ? '#D97706' : '#16A34A' }} />
                          <span>{enquiry.status}</span>
                        </span>
                      </div>

                      {/* Details Grid */}
                      <div className="grid-2" style={{ gap: '16px', fontSize: '13px', marginBottom: '18px' }}>
                        <div style={{ background: '#FDFCF9', padding: '12px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Requested Date &amp; Slot:</span>
                          <div style={{ fontWeight: 700, marginTop: '3px', color: 'var(--text-main)' }}>
                            {enquiry.scheduledDate}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            *Pending Muhurat calculation by Panditji
                          </div>
                        </div>
                        <div style={{ background: '#FDFCF9', padding: '12px', borderRadius: '10px', border: '1px solid #EAE5D9' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>Priest Allocation:</span>
                          <div style={{ fontWeight: 700, color: 'var(--accent-gold)', marginTop: '3px' }}>
                            {enquiry.assignedPandit}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            *Allocated upon direct confirmation
                          </div>
                        </div>
                      </div>

                      {enquiry.notes && (
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', background: '#F9F8F5', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #EAE5D9' }}>
                          <strong>Devotee Notes:</strong> {enquiry.notes}
                        </div>
                      )}

                      {/* Direct WhatsApp & Helpline Actions */}
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #FBF9F5 0%, #F5F0E6 100%)',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          border: '1px solid #EAE5D9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}
                      >
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          Send this saved request to Pandit Jitendra Chaubey for instant verification:
                        </div>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => {
                              const msg = `Namaste Panditji, I would like to follow up on my enquiry #${enquiry.id} for ${enquiry.serviceName} (${enquiry.packageName}) in ${enquiry.city}.\n\nHost: ${enquiry.customerName}\nPhone: ${enquiry.phone}\nRequested Date: ${enquiry.scheduledDate}\n\nPlease verify Shubh Muhurat and priest availability.`;
                              openWhatsAppEnquiry(msg);
                            }}
                            style={{
                              background: '#25D366',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '10px',
                              padding: '8px 16px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>Send via WhatsApp</span>
                          </button>

                          <button
                            onClick={callHelpline}
                            className="btn-secondary"
                            style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                          >
                            <PhoneCall size={13} color="#BD4B23" />
                            <span>Call Helpline</span>
                          </button>

                          <button
                            onClick={() => deleteEnquiry(enquiry.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#DC2626',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 10px'
                            }}
                            title="Remove this draft from browser"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid #EAE5D9', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Edit3 size={18} color="#BD4B23" />
                  <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>
                    Devotee Profile &amp; Vedic Preferences
                  </h3>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '22px' }}>
                  These details help Acharya Jitendra Chaubey and the assigned Gurukul priest prepare the sacred Sankalpa and Vedic Vidhi for your family.
                </p>

                <form onSubmit={handleProfileSave}>
                  <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Full Devotee Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Primary City
                      </label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '16px', marginBottom: '22px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Family Gotra (for Sankalpa)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kashyap, Shandilya, Bharadwaj"
                        value={profileForm.gotra}
                        onChange={e => setProfileForm({ ...profileForm, gotra: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                        Janma Nakshatra / Rashi
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rohini, Pushya, Ashwini"
                        value={profileForm.nakshatra}
                        onChange={e => setProfileForm({ ...profileForm, nakshatra: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                      Puja Address / Venue Details
                    </label>
                    <input
                      type="text"
                      value={profileForm.address}
                      onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="e.g. Flat 402, Rohan Tarang, Wakad, Pune"
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #D8D2C4', fontSize: '14px', outline: 'none', background: '#FDFCF9' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '12px 26px', fontSize: '14px', cursor: 'pointer' }}
                  >
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* 3. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid #EAE5D9', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '18px', color: 'var(--text-main)' }}>
                  Saved Puja Locations &amp; Venue Addresses
                </h3>
                <div style={{ border: '1px solid #EAE5D9', borderRadius: '12px', padding: '20px', background: 'var(--bg-primary)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>Primary Ceremony Residence</span>
                    <span className="badge-saffron" style={{ fontSize: '10px' }}>HQ Serving Area</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {profileForm.address || 'Pune, Maharashtra'}
                  </p>
                  <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                    Doorstep Priest &amp; Pure Hawan Samagri Delivery Included
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .account-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
