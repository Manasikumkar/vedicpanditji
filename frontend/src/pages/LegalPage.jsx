import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, RefreshCw, Lock } from 'lucide-react';
import { BRAND_INFO } from '../data/vedicPanditData';

export default function LegalPage() {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('cancellation'); // 'cancellation', 'privacy', 'terms'

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Policies &amp; Legal</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 800 }}>
            VedicPanditji Customer Policies &amp; Service Terms
          </h1>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          <button
            onClick={() => setActiveTab('cancellation')}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'cancellation' ? 'var(--accent-saffron)' : '#FFFFFF',
              color: activeTab === 'cancellation' ? '#FFFFFF' : 'var(--text-main)',
              border: '1px solid #EAE5D9',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} />
            <span>Cancellation &amp; Rescheduling</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'privacy' ? 'var(--accent-saffron)' : '#FFFFFF',
              color: activeTab === 'privacy' ? '#FFFFFF' : 'var(--text-main)',
              border: '1px solid #EAE5D9',
              cursor: 'pointer'
            }}
          >
            <Lock size={14} />
            <span>Privacy &amp; Data Confidentiality</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'terms' ? 'var(--accent-saffron)' : '#FFFFFF',
              color: activeTab === 'terms' ? '#FFFFFF' : 'var(--text-main)',
              border: '1px solid #EAE5D9',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Container */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7
          }}
        >
          {activeTab === 'cancellation' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--text-main)', marginBottom: '16px' }}>
                Cancellation &amp; Rescheduling Guidelines
              </h2>
              <p style={{ marginBottom: '14px' }}>
                At VedicPanditji, we understand that auspicious dates and family ceremonies may occasionally require adjustment due to astrological considerations or personal emergencies.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                1. Free Rescheduling
              </h4>
              <p style={{ marginBottom: '14px' }}>
                You may reschedule your ceremony date and time slot at <strong>zero extra charges</strong> provided the request is communicated at least 24 hours prior to the scheduled Shubh Muhurat.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                2. Direct Consultation Flexibility
              </h4>
              <p style={{ marginBottom: '14px' }}>
                Since VedicPanditji operates on direct consultation and transparent dakshina without mandatory advance token lock-ins, clients can easily adjust priest assignments by speaking directly with Pandit Jitendra Chaubey.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                3. Pandit Replacement Assurance
              </h4>
              <p>
                In the rare event that an assigned priest faces an unavoidable medical emergency, Acharya Jitendra Chaubey personally ensures a senior Gurukul-trained substitute is dispatched on time to preserve your Muhurat sanctity.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--text-main)', marginBottom: '16px' }}>
                Privacy &amp; Data Security Policy
              </h2>
              <p style={{ marginBottom: '14px' }}>
                VedicPanditji respects the spiritual sanctity and confidentiality of our devotee families. We never sell, rent, or disclose your personal contact information, horoscope details, Gotra, or address to any third-party marketing networks.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                Information We Collect
              </h4>
              <p style={{ marginBottom: '14px' }}>
                We collect your name, phone number, address in Pune/PCMC, and astrological details (such as Janma Nakshatra and Gotra) solely to coordinate priests, compute accurate Muhurats, and perform the sacred Sankalpam.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                Direct Communication
              </h4>
              <p>
                All communications occur directly between the devotee and VedicPanditji's team via official helpline ({BRAND_INFO.phone}) and verified WhatsApp.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--text-main)', marginBottom: '16px' }}>
                Terms of Service
              </h2>
              <p style={{ marginBottom: '14px' }}>
                By inquiring or scheduling a ceremony through VedicPanditji.com, you agree to these service principles.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                Vedic Services &amp; Priests
              </h4>
              <p style={{ marginBottom: '14px' }}>
                All our priests are certified Gurukul scholars vetted under Acharya Jitendra Chaubey. Rites are conducted strictly according to North Indian, Bihari, or requested regional Shastra Vidhis.
              </p>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                Dakshina &amp; Samagri Arrangement
              </h4>
              <p>
                Dakshina and samagri charges are mutually agreed upon during the pre-puja consultation. Devotees may choose complete samagri inclusion or provide their own items using our Shuddha Samagri checklist.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
