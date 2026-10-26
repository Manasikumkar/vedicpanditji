import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Download
} from 'lucide-react';

export default function BookingConfirmationPage() {
  const { routeParams, navigateTo, orders } = useApp();

  const order = routeParams?.order || orders[0] || {
    id: 'VP-2026-8941',
    serviceName: 'Satyanarayan Puja & Katha',
    packageName: 'Standard Vedic Vidhi with Havan',
    scheduledDate: '2026-10-28 (07:30 AM Brahma Muhurtham)',
    city: 'Pune',
    language: 'Hindi & Sanskrit',
    advancePaid: 1500,
    balanceDue: 6000,
    totalAmount: 7500,
    customerName: 'Rajesh Sharma',
    phone: '+91 97668 80979',
    address: 'Flat 402, Rohan Mithila, Viman Nagar, Pune - 411014',
    assignedPandit: 'Senior Vedic Pandit & Purohit Team'
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Success Header Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.2)'
            }}
          >
            <CheckCircle2 size={40} />
          </div>

          <span className="badge-saffron" style={{ marginBottom: '12px' }}>
            <Sparkles size={12} />
            <span>Booking Confirmed</span>
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
            Puja Scheduled Successfully!
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Booking Reference Number:{' '}
            <strong style={{ color: 'var(--text-main)', fontSize: '16px' }}>{order.id}</strong>
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-primary)',
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              border: '1px solid #EAE5D9'
            }}
          >
            <ShieldCheck size={16} color="#16A34A" />
            <span>SMS & WhatsApp Confirmation Dispatched to <strong>{order.phone}</strong></span>
          </div>
        </div>

        {/* Ceremony Breakdown Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '32px'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #EAE5D9', paddingBottom: '12px' }}>
            Ceremony & Priest Allocation Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed #EAE5D9' }}>
              <span style={{ color: 'var(--text-muted)' }}>Ceremony:</span>
              <span style={{ fontWeight: 700 }}>{order.serviceName}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed #EAE5D9' }}>
              <span style={{ color: 'var(--text-muted)' }}>Selected Package:</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-saffron)' }}>{order.packageName}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed #EAE5D9' }}>
              <span style={{ color: 'var(--text-muted)' }}>Scheduled Date & Muhurtham:</span>
              <span style={{ fontWeight: 700 }}>{order.scheduledDate}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed #EAE5D9' }}>
              <span style={{ color: 'var(--text-muted)' }}>Assigned Vedic Scholar:</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{order.assignedPandit}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px dashed #EAE5D9' }}>
              <span style={{ color: 'var(--text-muted)' }}>Venue Address:</span>
              <span style={{ fontWeight: 500, textAlign: 'right', maxWidth: '380px' }}>{order.address}</span>
            </div>

            {/* Financial Summary */}
            <div
              style={{
                marginTop: '10px',
                background: 'var(--bg-primary)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #EAE5D9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Package Dakshina:</span>
                <span style={{ fontWeight: 700 }}>₹{order.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#16A34A', fontWeight: 600 }}>
                <span>Token Advance Paid Today:</span>
                <span>₹{order.advancePaid?.toLocaleString('en-IN')} (Paid)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #EAE5D9', fontWeight: 800, fontSize: '15px' }}>
                <span>Remaining Balance Due After Ceremony:</span>
                <span style={{ color: 'var(--accent-saffron)' }}>₹{order.balanceDue?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={() => navigateTo('account')}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '14px' }}
          >
            <span>View in My Account</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '14px' }}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
