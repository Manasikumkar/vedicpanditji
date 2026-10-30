import React from 'react';
import { CUSTOMER_REVIEWS, BRAND_INFO } from '../../data/vedicPanditData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section style={{ padding: '85px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Devotee Experiences</span>
          <h2 className="section-title">Verified Google Customer Reviews</h2>
          <p className="section-desc">
            Rated {BRAND_INFO.rating} / 5.0 on Google based on {BRAND_INFO.reviewsCount}+ verified customer reviews for the VedicPanditji team across Pune, Mumbai, Bangalore &amp; beyond.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid-3" style={{ gap: '26px' }}>
          {CUSTOMER_REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="card-premium"
              style={{
                borderRadius: 'var(--radius-md)',
                padding: '26px',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Quote Mark Decoration */}
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  color: 'rgba(217, 79, 30, 0.12)'
                }}
              >
                <Quote size={34} />
              </div>

              {/* Star Rating & Google Verified Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#EAB308" color="#EAB308" />
                  ))}
                  <span style={{ fontSize: '12px', fontWeight: 700, marginLeft: '6px', color: 'var(--text-main)' }}>
                    5.0
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#047857',
                    background: '#ECFDF5',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <CheckCircle2 size={11} />
                  <span>Google Verified</span>
                </span>
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  marginBottom: '20px',
                  flex: 1
                }}
              >
                "{rev.comment}"
              </p>

              {/* Reviewer & Service Info */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {rev.service} &bull; {rev.time}
                  </div>
                </div>

                {/* Conducted By Badge */}
                <div
                  style={{
                    textAlign: 'right',
                    background: 'var(--bg-primary)',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Conducted By
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-saffron)' }}>
                    Senior Vedic Panditji
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
