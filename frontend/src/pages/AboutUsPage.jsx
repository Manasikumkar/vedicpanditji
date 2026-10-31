import React from 'react';
import { useApp } from '../context/AppContext';
import { PUNE_LOCALITIES } from '../data/vedicPanditData';
import { CheckCircle2 } from 'lucide-react';

export default function AboutUsPage() {
  const { navigateTo, openBookingModal } = useApp();

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">Home</span>
          {' / '}
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>About Us</span>
        </div>

        {/* Hero Banner */}
        <div
          className="about-hero-banner"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 247, 240, 0.95) 0%, rgba(246, 241, 232, 0.92) 100%), url(/images/hero-devotional-bg.jpg) center/cover no-repeat',
            borderRadius: '24px',
            padding: '52px 44px',
            color: 'var(--text-main)',
            marginBottom: '60px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
              Authentic Vedic Heritage &bull; Pune &bull; Pan-India
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.25 }}>
              Preserving Vedic Sanatan Traditions with Devotion &amp; Precision
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
              VedicPanditji was founded with a singular mission: to connect families across India with experienced North Indian and Bihari Pandits who conduct ceremonies with deep scriptural reverence in Hindi and Sanskrit.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openBookingModal(null, null, 'Pune')}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '14px', cursor: 'pointer' }}
              >
                <span>Book a Pandit</span>
              </button>
              <button
                onClick={() => navigateTo('catalogue')}
                className="btn-secondary"
                style={{ padding: '12px 24px', fontSize: '14px', cursor: 'pointer', background: '#FFFFFF' }}
              >
                <span>Browse Ceremonies Catalogue</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verified Pillars Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '70px'
          }}
          className="about-stats-grid"
        >
          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #EAE5D9', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-saffron)', fontFamily: 'var(--font-display)' }}>Hindi &amp; Sanskrit</div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>Ritual Languages</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Classical Mantras &amp; Hindi Katha</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #EAE5D9', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-saffron)', fontFamily: 'var(--font-display)' }}>Vedic Vidwans</div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>Authentic Traditions</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>North Indian &amp; Bihari Priests</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #EAE5D9', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-saffron)', fontFamily: 'var(--font-display)' }}>Pune &amp; PCMC</div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>Doorstep Conduction</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Doorstep Locality Network</div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #EAE5D9', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-saffron)', fontFamily: 'var(--font-display)' }}>Pure Samagri</div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>Ceremonial Materials</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Hawan Kashtha &amp; Cow Ghee</div>
          </div>
        </div>

        {/* Founder & Philosophy */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '60px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}
          className="founder-card-grid"
        >
          <div>
            <span className="section-tag">Spiritual Leadership</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>
              Meet Our Senior Vedic Acharyas
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
              With deep roots in the sacred tradition of Vedic Karmakanda, our experienced Vedic Acharyas guide families through auspicious life milestones. Renowned across Pune and major Indian cities for their knowledge in Shubh Muhurat calculations, Griha Pravesh, Satyanarayan Vrat Katha, and wedding ceremonies, our team ensures that every mantra resonates with profound spiritual vibration.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              Under strict scriptural standards, all affiliated Vedic Purohits are vetted not only for their scriptural pronunciation and ritual knowledge, but for their punctuality, warmth, and devotion to explaining the meaning of the rites to modern devotees and younger generations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--accent-saffron)" />
                <span>Expertise in Shukla Yajurveda, Rigvedic chants, and Parashara Muhurat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--accent-saffron)" />
                <span>Rituals solemnized strictly in Vedic Sanskrit with step-by-step Hindi Katha explanation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={18} color="var(--accent-saffron)" />
                <span>Personalized guidance for Gotra Sankalp, Vidhi requirements, and Panchang Muhurat</span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%)',
              borderRadius: '20px',
              padding: '36px',
              border: '1px solid var(--border-gold)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>🕉️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
              Sanatan Seva Sankalp
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              "Our devotion is to bring the sacred agni of the Vedas to your threshold, cleansing spaces of negative energies and bestowing divine peace (Shanti), wealth, and prosperity."
            </p>
            <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>Senior Acharya Parishad</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Vedic Scholars, VedicPanditji</div>
            </div>
          </div>
        </div>

        {/* All-India Coverage and Localities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }} className="about-coverage-grid">
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid #EAE5D9' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
              All-India Service Coverage
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
              VedicPanditji serves devotees nationwide. From doorstep in-person priests in Pune &amp; Mumbai to visiting Acharyas and live interactive HD E-Pujas in major hubs:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Pune & PCMC Hub', 'Mumbai & MMR', 'Bangalore', 'Delhi-NCR', 'Hyderabad', 'Chennai', 'Nashik (Trimbakeshwar)', 'Pan-India & Global E-Puja'].map((cName, idx) => (
                <span key={idx} style={{ background: 'var(--bg-primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: 'var(--text-main)', border: '1px solid #EAE5D9', fontWeight: 600 }}>
                  🕉️ {cName}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid #EAE5D9' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
              Pune &amp; PCMC Localities
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
              Experienced Vedic Purohits travel directly to residential premises across:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PUNE_LOCALITIES.filter(l => l !== 'All Pune Areas').slice(0, 10).map((loc, idx) => (
                <span key={idx} style={{ background: 'var(--bg-primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: 'var(--text-secondary)', border: '1px solid #EAE5D9' }}>
                  📍 {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .founder-card-grid {
            grid-template-columns: 1fr !important;
          }
          .about-coverage-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .about-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .about-hero-banner {
            padding: 28px 18px !important;
            margin-bottom: 36px !important;
          }
          .founder-card-grid {
            padding: 24px 18px !important;
          }
          .about-coverage-grid > div {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
