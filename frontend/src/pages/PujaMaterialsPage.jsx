import React from 'react';
import { useApp } from '../context/AppContext';
import { PUJA_MATERIALS } from '../data/vedicPanditData';
import {
  Truck,
  ShieldCheck,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export default function PujaMaterialsPage() {
  const { navigateTo, openWhatsAppEnquiry } = useApp();

  const handleOrderProduct = (item) => {
    const message = `Namaste Panditji, I would like to order the authentic Vedic samagri kit: ${item.name} (${item.weight}) priced at ₹${item.price.toLocaleString('en-IN')}. Please confirm delivery and dispatch details.`;
    openWhatsAppEnquiry(message);
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Puja Materials & Samagri</span>
          </div>
          <span className="section-tag">Pure & Consecrated</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, marginBottom: '14px' }}>
            Authentic Vedic Puja Materials &amp; Hawan Kits
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Every sacred herb, dry fruit, hawan kashtha, and pure cow ghee in VedicPanditji’s samagri kits is curated to ensure divine aromatic purity during sacred Vedic offerings across Pune and all major Indian cities.
          </p>
        </div>

        {/* Delivery Guarantee Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '40px'
          }}
          className="materials-features-grid"
        >
          <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={24} color="var(--accent-saffron)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Express Metro Delivery</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Same day & 24h doorstep dispatch</div>
            </div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} color="#22C55E" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>100% Shastra Pure</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No adulteration, synthetic scents or chemicals</div>
            </div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={24} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>Priest Approved Inclusions</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Packed according to Vedic Pathashala lists</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid-4" style={{ gap: '24px' }}>
          {PUJA_MATERIALS.map(prod => (
            <div
              key={prod.id}
              className="card-premium"
              style={{
                borderRadius: '16px',
                border: '1px solid #EAE5D9',
                background: '#FFFFFF',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  height: '180px',
                  backgroundImage: `url(${prod.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              />

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                  {prod.name}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600, marginBottom: '10px' }}>
                  {prod.weight}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px', flex: 1 }}>
                  {prod.description}
                </p>

                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #EAE5D9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
                    ₹{prod.price.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => handleOrderProduct(prod)}
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 14px',
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
                    <span>Enquire &amp; Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .materials-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
