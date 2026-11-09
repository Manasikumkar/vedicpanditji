import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PUJA_CATEGORIES, PUJA_GUIDES_DATA } from '../data/guides/pujaGuidesData';
import { useI18n } from '../i18n/useI18n';
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
  const { lang, t, lp, locGuideTitle, locGuideSummary } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const L = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbHub: 'पूजा मार्गदर्शिका व विधी संग्रह',
      badge: 'वैदिक ज्ञान केंद्र',
      h1: 'हिंदू पूजा आणि वैदिक विधी मार्गदर्शिका',
      intro: 'सनातन धर्म विधी, चरणबद्ध पद्धती, शुद्ध पूजा साहित्य यादी आणि अचूक शुभ मुहूर्त गणना स्पष्ट करणारी अधिकृत शैक्षणिक मार्गदर्शिका. वैदिकपंडितजी आचार्य मंडळाद्वारे भाविकांसाठी संकलित.',
      searchPlaceholder: 'मार्गदर्शिका शोधा (उदा. गृहप्रवेश, सत्यनारायण, हवन, साहित्य)...',
      categories: {
        'all': 'सर्व मार्गदर्शिका',
        'housewarming': 'गृहप्रवेश व वास्तु',
        'kathas-havans': 'कथा व हवन',
        'sanskars': 'संस्कार विधी',
        'shanti-pujas': 'शांती पूजा',
        'festivals': 'सण व उत्सव',
        'guidance': 'मार्गदर्शन व पुरोहित निवड'
      },
      readMore: 'पूर्ण मार्गदर्शिका वाचा',
      verifiedTag: 'शास्त्रोक्त विधी',
      ctaTitle: 'घरी वैदिक विधीचे आयोजन करत आहात?',
      ctaDesc: 'शुभ मुहूर्त मार्गदर्शन, गोत्र संकल्प सल्ला आणि पुणे, पिंपरी-चिंचवड व देशभरात प्रमाणित उत्तर भारतीय पंडित बुकिंगसाठी थेट आचार्यांशी संपर्क साधा.',
      ctaBtn: 'पंडितजींशी चर्चा करा'
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbHub: 'पूजा मार्गदर्शिका एवं विधि संग्रह',
      badge: 'वैदिक ज्ञान केंद्र',
      h1: 'हिंदू पूजा एवं वैदिक अनुष्ठान मार्गदर्शिकाएँ',
      intro: 'सनातन धर्म संस्कारों, चरण-दर-चरण विधि विधान, शत-प्रतिशत शुद्ध पूजन सामग्री सूची एवं शुभ मुहूर्त की प्रामाणिक शैक्षणिक मार्गदर्शिका। वैदिकपंडितजी आचार्य परिषद द्वारा भक्तों हेतु प्रकाशित।',
      searchPlaceholder: 'मार्गदर्शिका खोजें (उदा. गृह प्रवेश, सत्यनारायण, हवन, सामग्री)...',
      categories: {
        'all': 'सभी मार्गदर्शिकाएँ',
        'housewarming': 'गृह प्रवेश एवं वास्तु',
        'kathas-havans': 'कथा एवं हवन',
        'sanskars': 'संस्कार विधि',
        'shanti-pujas': 'शांति पूजा',
        'festivals': 'पर्व एवं त्योहार',
        'guidance': 'मार्गदर्शन एवं पुरोहित चयन'
      },
      readMore: 'संपूर्ण मार्गदर्शिका पढ़ें',
      verifiedTag: 'शास्त्रसम्मत विधि',
      ctaTitle: 'घर पर किसी वैदिक अनुष्ठान की योजना है?',
      ctaDesc: 'शुभ मुहूर्त निर्धारण, गोत्र संकल्प परामर्श एवं पुणे, पिंपरी-चिंचवड व संपूर्ण भारत में सत्यापित उत्तर भारतीय पुरोहित बुकिंग हेतु आचार्यों से संपर्क करें।',
      ctaBtn: 'पंडित जी से परामर्श करें'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbHub: 'Puja Guides & Educational Hub',
      badge: 'Vedic Knowledge Hub',
      h1: 'Hindu Puja & Vedic Ritual Guides',
      intro: 'Authoritative educational resources on Sanatan Dharma ceremonies, step-by-step vidhi procedures, pure samagri lists, and Shubh Muhurat calculations. Compiled and published for devotees by the VedicPanditji Editorial Desk.',
      searchPlaceholder: 'Search guides (e.g. Griha Pravesh, Satyanarayan, Havan, Samagri)...',
      categories: {
        'all': 'All Guides',
        'housewarming': 'Housewarming & Vastu',
        'kathas-havans': 'Kathas & Havans',
        'sanskars': 'Sanskars & Milestones',
        'shanti-pujas': 'Shanti & Astrological',
        'festivals': 'Festivals & Vrats',
        'guidance': 'Priest Selection & FAQ'
      },
      readMore: 'Read Full Guide',
      verifiedTag: 'Verified Vidhi',
      ctaTitle: 'Planning a Vedic Ceremony at Home?',
      ctaDesc: 'Connect with senior Vedic Acharyas for Shubh Muhurat guidance, gotra sankalp consultation, and verified North Indian purohit booking across Pune, PCMC, and all over India.',
      ctaBtn: 'Consult Panditji'
    }
  }[lang] || {
    breadcrumbHome: 'Home',
    breadcrumbHub: 'Puja Guides & Educational Hub',
    badge: 'Vedic Knowledge Hub',
    h1: 'Hindu Puja & Vedic Ritual Guides',
    intro: 'Authoritative educational resources on Sanatan Dharma ceremonies, step-by-step vidhi procedures, pure samagri lists, and Shubh Muhurat calculations. Compiled and published for devotees by the VedicPanditji Editorial Desk.',
    searchPlaceholder: 'Search guides (e.g. Griha Pravesh, Satyanarayan, Havan, Samagri)...',
    categories: {
      'all': 'All Guides',
      'housewarming': 'Housewarming & Vastu',
      'kathas-havans': 'Kathas & Havans',
      'sanskars': 'Sanskars & Milestones',
      'shanti-pujas': 'Shanti & Astrological',
      'festivals': 'Festivals & Vrats',
      'guidance': 'Priest Selection & FAQ'
    },
    readMore: 'Read Full Guide',
    verifiedTag: 'Verified Vidhi',
    ctaTitle: 'Planning a Vedic Ceremony at Home?',
    ctaDesc: 'Connect with senior Vedic Acharyas for Shubh Muhurat guidance, gotra sankalp consultation, and verified North Indian purohit booking across Pune, PCMC, and all over India.',
    ctaBtn: 'Consult Panditji'
  };

  const filteredGuides = PUJA_GUIDES_DATA.filter((guide) => {
    const locTitle = locGuideTitle(guide) || guide.title;
    const locSummary = locGuideSummary(guide) || guide.summary;
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch =
      locTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <span>{L.breadcrumbHome}</span>
          </span>
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbHub}</span>
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
              <span>{L.badge}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25, marginBottom: '14px' }}>
              {L.h1}
            </h1>

            <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
              {L.intro}
            </p>

            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '560px' }}>
              <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={L.searchPlaceholder}
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
            const categoryLabel = L.categories[cat.id] || cat.name;
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
                {categoryLabel}
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
                    {L.categories[guide.category] || guide.categoryName}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <Clock size={13} />
                    <span>{guide.readingTime}</span>
                  </div>
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.4, marginBottom: '10px' }}>
                  {locGuideTitle(guide) || guide.title}
                </h2>

                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                  {locGuideSummary(guide) || guide.summary}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #FAF7F0' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-saffron)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{L.readMore}</span>
                  <ArrowRight size={14} />
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {L.verifiedTag}
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
              {L.ctaTitle}
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {L.ctaDesc}
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
            <span>{L.ctaBtn}</span>
          </button>
        </section>

      </div>
    </div>
  );
}
