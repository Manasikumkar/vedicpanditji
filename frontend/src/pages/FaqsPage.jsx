import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS_LIST } from '../data/vedicPanditData';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  const { navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Booking & Payment', 'Priests & Qualifications', 'Samagri & Preparations', 'Locations & Coverage', 'Temple Services'];

  const filteredFaqs = FAQS_LIST.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>FAQ</span>
          </div>
          <span className="section-tag">Help & Clarity</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, marginBottom: '14px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Everything you need to know about booking experienced North Indian &amp; Bihari Pandits across India, Shubh Muhurat calculations, pure samagri arrangements, and authentic Hindi &amp; Sanskrit Vedic vidhi procedures.
          </p>
        </div>

        {/* Search & Category Filter Row */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #EAE5D9',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions (e.g. advance, samagri, muhurtham)..."
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: '10px',
                border: '1px solid #DDD7C8',
                background: 'var(--bg-primary)'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: activeCategory === cat ? 'var(--accent-saffron)' : '#F4EFE6',
                  color: activeCategory === cat ? '#FFFFFF' : 'var(--text-main)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '60px' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: isOpen ? '1px solid var(--accent-saffron)' : '1px solid #EAE5D9',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={18} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {faq.q}
                    </h3>
                  </div>
                  <button aria-label="Toggle answer" style={{ color: 'var(--text-muted)' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px 54px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                      borderTop: '1px solid #F4EFE6'
                    }}
                  >
                    <p style={{ marginTop: '14px' }}>{faq.a}</p>
                    <div style={{ fontSize: '12px', color: 'var(--accent-gold)', marginTop: '10px', fontWeight: 600 }}>
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div
          style={{
            background: 'var(--bg-primary)',
            borderRadius: '16px',
            border: '1px solid #EAE5D9',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto'
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>
            Still have questions not listed above?
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Our temple relationship officers can assist with custom requirements and muhurtham dates.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('contact')}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '13px', cursor: 'pointer' }}
            >
              <span>Contact Consultation Team</span>
            </button>
            <button
              onClick={() => navigateTo('catalogue')}
              className="btn-secondary"
              style={{ padding: '10px 22px', fontSize: '13px', cursor: 'pointer' }}
            >
              <span>Explore All Pujas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
