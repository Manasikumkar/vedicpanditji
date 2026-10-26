import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, user, completeBooking, navigateTo } = useApp();

  const totalAmount = cart.reduce((sum, item) => sum + (item.package?.price || 0), 0);
  const totalAdvance = cart.reduce((sum, item) => sum + (item.package?.advance || 0), 0);
  const balanceDue = totalAmount - totalAdvance;

  const [paymentOption, setPaymentOption] = useState('advance'); // 'advance' or 'full'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'cash'

  const [billingDetails, setBillingDetails] = useState({
    firstName: user.name?.split(' ')[0] || '',
    lastName: user.name?.split(' ')[1] || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || 'Pune',
    pincode: '',
    notes: 'Please ensure pandit speaks Hindi and arrives in accordance with the Shubh Muhurat.'
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const primaryItem = cart[0];
    completeBooking({
      serviceName: primaryItem.name,
      packageName: primaryItem.package?.name || 'Selected Package',
      city: primaryItem.city,
      language: primaryItem.language,
      totalAmount,
      advanceAmount: totalAdvance,
      paymentType: paymentOption,
      date: primaryItem.date,
      timeSlot: primaryItem.timeSlot,
      customerName: `${billingDetails.firstName} ${billingDetails.lastName}`,
      phone: billingDetails.phone,
      address: `${billingDetails.address}, ${billingDetails.city} - ${billingDetails.pincode}`
    });
  };

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: '120px', paddingBottom: '90px', textAlign: 'center', minHeight: '80vh' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '14px' }}>
            No ceremonies currently in your checkout
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Please select a puja or ceremony package to proceed with your booking.
          </p>
          <button onClick={() => navigateTo('catalogue')} className="btn-primary" style={{ padding: '12px 28px' }}>
            Browse Pooja Catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span>
            {' / '}
            <span onClick={() => navigateTo('catalogue')} style={{ cursor: 'pointer' }}>Cart</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Checkout & Payment</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 800 }}>
            Booking Confirmation & Secure Checkout
          </h1>
        </div>

        {/* 2 Column Form & Order Summary */}
        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '40px',
              alignItems: 'start'
            }}
            className="checkout-grid"
          >
            {/* Left: Billing and Venue Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid #EAE5D9',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #EAE5D9', paddingBottom: '12px' }}>
                  1. Devotee & Contact Information
                </h3>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={billingDetails.firstName}
                      onChange={e => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Last / Family Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={billingDetails.lastName}
                      onChange={e => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={billingDetails.email}
                      onChange={e => setBillingDetails({ ...billingDetails, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={billingDetails.phone}
                      onChange={e => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                    Puja Address (Door No, Street, Landmark) *
                  </label>
                  <input
                    type="text"
                    required
                    value={billingDetails.address}
                    onChange={e => setBillingDetails({ ...billingDetails, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                  />
                </div>

                <div className="grid-2" style={{ gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={billingDetails.city}
                      onChange={e => setBillingDetails({ ...billingDetails, city: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={billingDetails.pincode}
                      onChange={e => setBillingDetails({ ...billingDetails, pincode: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #DDD7C8' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid #EAE5D9',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #EAE5D9', paddingBottom: '12px' }}>
                  2. Payment Method
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {[
                    { id: 'upi', name: 'Instant UPI (Google Pay, PhonePe, Paytm, BHIM)', icon: Smartphone },
                    { id: 'card', name: 'Credit / Debit Cards (Visa, MasterCard, RuPay)', icon: CreditCard },
                    { id: 'netbanking', name: 'NetBanking (All Indian Major Banks)', icon: Building },
                    { id: 'cash', name: 'Cash Directly to Assigned Pandit (Post-Puja)', icon: Banknote }
                  ].map(m => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: paymentMethod === m.id ? '2px solid var(--accent-saffron)' : '1px solid #DDD7C8',
                          background: paymentMethod === m.id ? 'var(--accent-saffron-light)' : '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <Icon size={18} color="var(--accent-saffron)" />
                        <span style={{ fontSize: '14px', fontWeight: 600, flex: 1 }}>{m.name}</span>
                        {paymentMethod === m.id && <CheckCircle2 size={16} color="var(--accent-saffron)" />}
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    background: 'var(--bg-primary)',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ShieldCheck size={18} color="#22C55E" />
                  <span>Secure 256-bit SSL encrypted transaction via Razorpay / CCAvenue</span>
                </div>
              </div>
            </div>

            {/* Right: Order Summary & Advance Token Choice */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #EAE5D9',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '100px'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ paddingBottom: '14px', borderBottom: '1px solid #EAE5D9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{item.name}</h4>
                        <div style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                          {item.package?.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.city} • {item.language} • {item.date}
                        </div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800 }}>
                        ₹{item.package?.price?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Type Selection */}
              <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', border: '1px solid #EAE5D9', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Choose Payment Option
                </div>

                <div
                  onClick={() => setPaymentOption('advance')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: paymentOption === 'advance' ? '2px solid var(--accent-saffron)' : '1px solid #DDD7C8',
                    background: '#FFFFFF',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                    <span>Pay Token Advance</span>
                    <span style={{ color: 'var(--accent-saffron)' }}>₹{totalAdvance.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Locks priest slot. Balance ₹{balanceDue.toLocaleString('en-IN')} payable after puja.
                  </div>
                </div>

                <div
                  onClick={() => setPaymentOption('full')}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: paymentOption === 'full' ? '2px solid var(--accent-saffron)' : '1px solid #DDD7C8',
                    background: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                    <span>Pay Full Amount</span>
                    <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Complete hassle-free advance settlement.
                  </div>
                </div>
              </div>

              {/* Total Due */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '20px',
                  paddingTop: '12px',
                  borderTop: '2px solid #EAE5D9'
                }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800 }}>Amount Due Today</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {paymentOption === 'advance' ? 'Token Advance Deposit' : 'Full Payment'}
                  </div>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                  ₹{(paymentOption === 'advance' ? totalAdvance : totalAmount).toLocaleString('en-IN')}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '15px' }}
              >
                <Sparkles size={16} />
                <span>Confirm & Place Booking</span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Instant WhatsApp & SMS confirmation will be sent upon completion.
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
