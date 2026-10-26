import React from 'react';
import { CUSTOMER_REVIEWS, BRAND_INFO } from '../../data/vedicPanditData';
import { Star, Quote, CheckCircle2, UserCheck } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section style={{ padding: '90px 0', background: 'var(--bg-primary)', borderTop: '1px solid #EAE5D9' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Devotee Experiences in Pune</span>
          <h2 className="section-title">Verified Google Customer Reviews</h2>
          <p className="section-desc">
            Rated {BRAND_INFO.rating} / 5.0 on Google based on {BRAND_INFO.reviewsCount}+ verified reviews for Pandit Jitendra Chaubey and the VedicPanditji team.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid-3" style={{ gap: '24px' }}>
          {CUSTOMER_REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="card-premium"
              style={{
                borderRadius: '18px',
                padding: '26px',
                background: '#FFFFFF',
                border: '1px solid #EAE5D9',
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
                  color: 'rgba(189, 75, 35, 0.12)'
                }}
              >
                <Quote size={36} />
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
                    color: '#15803D',
                    background: '#DCFCE7',
                    padding: '3px 8px',
                    borderRadius: '12px',
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
                  fontSize: '13px',
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
                  borderTop: '1px solid #EAE5D9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {rev.service} • {rev.time}
                  </div>
                </div>

                {/* Conducted By Badge */}
                <div
                  style={{
                    textAlign: 'right',
                    background: 'var(--bg-primary)',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #EAE5D9'
                  }}
                >
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Conducted By
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#BD4B23' }}>
                    Pandit Jitendra Chaubey
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
