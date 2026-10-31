import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PUJA_CATEGORIES, PUJA_GUIDES_DATA } from '../data/guides/pujaGuidesData';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Home,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

export default function PujaGuidesHubPage() {
  const { navigateTo, openBookingModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = PUJA_GUIDES_DATA.filter((guide) => {
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.keywords && guide.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>Home</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>Puja Guides &amp; Educational Hub</span>
        </nav>

        {/* Page Header Banner */}
        <header
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FDFBF7 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: '40px 36px',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '36px'
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'var(--accent-saffron-light)', color: 'var(--accent-saffron)', fontSize: '12px', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <BookOpen size={14} />
              <span>Vedic Knowledge Hub</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25, marginBottom: '14px' }}>
              Hindu Puja &amp; Vedic Ritual Guides
            </h1>

            <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
              Authoritative educational resources on Sanatan Dharma ceremonies, step-by-step vidhi procedures, pure samagri lists, and Shubh Muhurat calculations. Compiled and published for devotees by the VedicPanditji Editorial Desk.
            </p>

            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '560px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides (e.g. Griha Pravesh, Satyanarayan, Havan, Samagri)..."
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 44px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-medium)',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#FFFFFF',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>
        </header>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '32px'
          }}
        >
          {PUJA_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--accent-saffron)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--accent-saffron)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Guides Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}
        >
          {filteredGuides.map((guide) => (
            <article
              key={guide.slug}
              onClick={() => navigateTo('puja-guide-detail', { slug: guide.slug })}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid var(--border-subtle)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              className="hover:shadow-md hover:-translate-y-1"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-saffron)', background: 'var(--accent-saffron-light)', padding: '4px 10px', borderRadius: '6px' }}>
                    {guide.categoryName}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <Clock size={13} />
                    <span>{guide.readingTime}</span>
                  </div>
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.4, marginBottom: '10px' }}>
                  {guide.title}
                </h2>

                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                  {guide.summary}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #FAF7F0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-saffron)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Read Full Guide</span>
                  <ArrowRight size={14} />
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Verified Vidhi
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Booking Notice */}
        <section
          style={{
            background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE6 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              Planning a Vedic Ceremony at Home?
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Connect with senior Vedic Acharyas for Shubh Muhurat guidance, gotra sankalp consultation, and verified North Indian purohit booking across Pune, PCMC, and all over India.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openBookingModal()}
            className="btn-primary"
            style={{
              padding: '13px 26px',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <CalendarCheck size={17} />
            <span>Consult Panditji</span>
          </button>
        </section>

      </div>
    </div>
  );
}
