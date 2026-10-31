import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, BookOpen, MapPin, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  const { navigateTo } = useApp();

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '780px', textAlign: 'center' }}>
        
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-subtle)',
            padding: '52px 36px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ fontSize: '72px', fontWeight: 900, color: 'var(--accent-saffron)', lineHeight: 1, marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
            404
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
            Page Not Found
          </h1>

          <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 32px' }}>
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Explore our authentic ceremonies, educational guides, or local pandit services below.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="btn-primary"
              style={{
                padding: '12px 26px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Home size={16} />
              <span>Return to Homepage</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('catalogue')}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--radius-sm)',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <span>Explore Ceremonies</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Quick Helpful Links */}
          <div style={{ borderTop: '1px solid #FAF7F0', paddingTop: '28px', textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '14px', textAlign: 'center' }}>
              Popular Directories
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div
                onClick={() => navigateTo('location-detail', { slug: 'pandit-in-pune' })}
                style={{ padding: '14px', borderRadius: '10px', background: '#FAF8F5', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                className="hover:border-amber-600"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <MapPin size={14} color="var(--accent-saffron)" />
                  <span>Pandit in Pune</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Kothrud, Baner, Hinjawadi, Kharadi</div>
              </div>

              <div
                onClick={() => navigateTo('location-detail', { slug: 'pandit-in-pcmc' })}
                style={{ padding: '14px', borderRadius: '10px', background: '#FAF8F5', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                className="hover:border-amber-600"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <MapPin size={14} color="var(--accent-saffron)" />
                  <span>Pandit in PCMC</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Wakad, Pimple Saudagar, Ravet</div>
              </div>

              <div
                onClick={() => navigateTo('puja-guides')}
                style={{ padding: '14px', borderRadius: '10px', background: '#FAF8F5', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
                className="hover:border-amber-600"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--text-main)', marginBottom: '4px' }}>
                  <BookOpen size={14} color="var(--accent-gold)" />
                  <span>Puja Guides</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Griha Pravesh, Satyanarayan, Havan</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
