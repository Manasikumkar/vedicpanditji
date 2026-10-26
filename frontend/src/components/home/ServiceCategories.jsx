import React from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/vedicPanditData';
import {
  Flame,
  Sparkles,
  BookOpen,
  Scroll,
  Shield,
  Calendar,
  Heart,
  Music,
  Sun,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Flame,
  Sparkles,
  BookOpen,
  Scroll,
  Shield,
  Calendar,
  Heart,
  Music,
  Sun
};

export default function ServiceCategories() {
  const { navigateTo, setSelectedCategory } = useApp();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('catalogue');
  };

  return (
    <section style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Authentic Vedic Offerings</span>
          <h2 className="section-title">Explore by Puja Categories</h2>
          <p className="section-desc">
            Explore 200+ authentic Vedic rituals, Havans, and ceremonies conducted by experienced North Indian & Bihari pandits across Pune.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid-3" style={{ gap: '24px' }}>
          {SERVICE_CATEGORIES.map(cat => {
            const Icon = iconMap[cat.icon] || Flame;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="card-premium"
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #EAE5D9',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Category Image Header */}
                <div
                  style={{
                    height: '140px',
                    position: 'relative',
                    backgroundImage: `url(${cat.image || '/images/hero-puja.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)'
                    }}
                  />
                  {/* Top Badge & Count */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--accent-saffron)',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                  >
                    {cat.count}
                  </div>
                  {/* Icon floating */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: '20px',
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--accent-saffron)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(189, 75, 35, 0.35)',
                      border: '2px solid #FFFFFF'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '28px 22px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: 'var(--text-main)'
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                      flex: 1
                    }}
                  >
                    {cat.tagline}
                  </p>

                  {/* Bottom Action Link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--accent-saffron)',
                      marginTop: 'auto'
                    }}
                  >
                    <span>View All {cat.name}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
