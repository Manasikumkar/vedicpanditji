import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    cartDrawerOpen,
    setCartDrawerOpen,
    navigateTo
  } = useApp();

  if (!cartDrawerOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.package?.price || 0), 0);
  const totalAdvance = cart.reduce((sum, item) => sum + (item.package?.advance || 0), 0);
  const balanceDue = totalAmount - totalAdvance;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        background: 'rgba(28, 30, 27, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setCartDrawerOpen(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: '#FFFFFF',
          boxShadow: '-8px 0 36px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #EAE5D9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-primary)'
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 700 }}>
              Your Puja Bookings
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {cart.length} {cart.length === 1 ? 'Service' : 'Services'} selected
            </div>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            aria-label="Close cart drawer"
            style={{
              padding: '6px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid #EAE5D9'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'var(--text-muted)'
                }}
              >
                <Sparkles size={28} />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Explore our authentic Vedic ceremonies and book a verified Pandit for your home.
              </p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigateTo('catalogue');
                }}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                Explore Services
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    border: '1px solid #EAE5D9',
                    borderRadius: '12px',
                    padding: '14px',
                    background: 'var(--bg-primary)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ paddingRight: '20px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                        {item.name}
                      </h4>
                      <div style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600, marginBottom: '6px' }}>
                        {item.package?.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        📍 {item.city} • 🗣 {item.language}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        📅 {item.date} ({item.timeSlot})
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      style={{ color: 'var(--text-muted)', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div
                    style={{
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '1px dashed #DDD7C8',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Token Advance Due</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-saffron)' }}>
                        ₹{item.package?.advance?.toLocaleString('en-IN') || 0}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Package</div>
                      <div style={{ fontSize: '15px', fontWeight: 800 }}>
                        ₹{item.package?.price?.toLocaleString('en-IN') || 0}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #EAE5D9',
              background: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Package Value</span>
              <span style={{ fontWeight: 600 }}>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Balance Payable to Pandit After Puja</span>
              <span style={{ fontWeight: 600 }}>₹{balanceDue.toLocaleString('en-IN')}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #EAE5D9',
                marginBottom: '16px',
                fontSize: '16px',
                fontWeight: 800
              }}
            >
              <span>Token Advance Payable Now</span>
              <span style={{ color: 'var(--accent-saffron)' }}>₹{totalAdvance.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                setCartDrawerOpen(false);
                navigateTo('checkout');
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '15px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '12px',
                fontSize: '11px',
                color: 'var(--text-muted)'
              }}
            >
              <ShieldCheck size={14} color="#22C55E" />
              <span>100% Certified Vedic Guarantee • Safe & Transparent</span>
            </div>
          </div>
        )}

        <style>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
