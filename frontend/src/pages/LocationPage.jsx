import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getLocationBySlug, getNearbyLocations } from '../data/locations';
import { getRelatedGuidesForService } from '../utils/internalLinks';
import { useI18n } from '../i18n/useI18n';
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  PhoneCall,
  MessageCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Home
} from 'lucide-react';

export default function LocationPage({ slug: propSlug }) {
  const { routeParams, navigateTo, openBookingModal, openWhatsAppEnquiry, callHelpline, BRAND_INFO } = useApp();
  const { lang, locServiceName, locServiceDesc, locLocationName } = useI18n();
  
  const activeSlug = propSlug || routeParams?.slug || 'pandit-in-pune';
  const location = getLocationBySlug(activeSlug) || getLocationBySlug('pandit-in-pune');

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSlug]);

  if (!location) {
    return (
      <div style={{ paddingTop: '120px', paddingBottom: '90px', textAlign: 'center' }}>
        <h2>{lang === 'mr' ? 'ठिकाणाची माहिती आढळली नाही' : lang === 'hi' ? 'स्थान की जानकारी नहीं मिली' : 'Locality Information Not Found'}</h2>
        <button onClick={() => navigateTo('home')} className="btn-primary" style={{ marginTop: '20px' }}>
          {lang === 'mr' ? 'मुख्यपृष्ठावर परत जा' : lang === 'hi' ? 'मुखपृष्ठ पर लौटें' : 'Return to Homepage'}
        </button>
      </div>
    );
  }

  const locName = locLocationName(location, lang);
  const locParentCity = location.parentCity
    ? (location.parentCity.includes('PCMC')
        ? (lang === 'mr' ? 'पिंपरी-चिंचवड (PCMC)' : lang === 'hi' ? 'पिंपरी-चिंचवड (PCMC)' : location.parentCity)
        : (lang === 'mr' ? 'पुणे' : lang === 'hi' ? 'पुणे' : location.parentCity))
    : '';

  const nearbyLocations = getNearbyLocations(location);
  const relatedGuides = getRelatedGuidesForService('griha-pravesh');

  // Localized intro paragraph
  const getIntroText = () => {
    if (lang === 'mr') {
      return `${locName} आणि परिसरातील सर्व सोसायट्यांमध्ये राहणाऱ्या कुटुंबांसाठी वैदिक पंडित जी द्वारे अस्सल उत्तर भारतीय व बिहारी वैदिक पूजा सेवा थेट घरी पुरवली जाते. गृहप्रवेश, सत्यनारायण कथा, वास्तुशांती, रुद्राभिषेक आणि सर्व प्रकारच्या पवित्र हवनासाठी अनुभवी पुरोहित उपलब्ध आहेत.\n\nसर्व विधी अस्सल संस्कृत मंत्रोच्चार आणि प्रत्येक विधीचे अर्थपूर्ण स्पष्टीकरण देऊन शास्त्रोक्त पद्धतीने संपन्न केले जातात. पूजेसाठी लागणारी १००% शुद्ध वैदिक सामग्री आणि हवन साहित्य पंडितजी स्वतः सोबत आणतात.`;
    }
    if (lang === 'hi') {
      return `${locName} एवं आसपास के सभी क्षेत्रों व सोसायटियों में रहने वाले परिवारों के लिए वैदिक पंडित जी द्वारा प्रामाणिक उत्तर भारतीय एवं बिहारी वैदिक पूजा सेवाएँ सीधे आपके घर पर प्रदान की जाती हैं। गृह प्रवेश, सत्यनारायण कथा, वास्तु शांति, रुद्राभिषेक एवं समस्त प्रकार के वैदिक हवनों हेतु अनुभवी आचार्य उपलब्ध हैं।\n\nसमस्त धार्मिक अनुष्ठान शुद्ध संस्कृत मंत्रोच्चार एवं सुबोध हिंदी कथा वाचन के साथ शास्त्रसम्मत विधि से संपन्न कराए जाते हैं। पूजन के लिए आवश्यक शत-प्रतिशत शुद्ध वैदिक सामग्री एवं हवन कुंड पंडित जी स्वयं साथ लेकर आते हैं।`;
    }
    return location.intro;
  };

  // Localized FAQs
  const getFaqs = () => {
    if (lang === 'mr') {
      return [
        {
          q: `पंडितजी ${locName} मधील आमच्या सोसायटीत येतात का?`,
          a: `होय, आमचे अनुभवी पुरोहित ${locName} आणि परिसरातील सर्व सोसायट्या व घरांमध्ये थेट उपस्थित राहून पूजा संपन्न करतात.`
        },
        {
          q: `फ्लॅट किंवा अपार्टमेंटमध्ये हवन सुरक्षितपणे करता येते का?`,
          a: `होय. आमचे पंडितजी विशेष तांब्याचे हवन कुंड, सुका आंबा लाकूड आणि गाईचे शुद्ध तूप वापरतात, ज्यामुळे धूर अतिशय कमी होतो आणि विधी पूर्णपणे शास्त्रोक्त होतो.`
        },
        {
          q: `हिंदी व संस्कृत जाणणारे पंडित कसे बुक करावे?`,
          a: `तुम्ही वेबसाईटवरून थेट चौकशी करू शकता किंवा आमच्या हेल्पलाइनवर कॉल करू शकता. आम्ही तुमच्या गरजेनुसार शुभ मुहूर्त व पुरोहितांचे नियोजन करू.`
        }
      ];
    }
    if (lang === 'hi') {
      return [
        {
          q: `क्या पंडित जी ${locName} में हमारी सोसायटी में आते हैं?`,
          a: `हाँ, हमारे अनुभवी पुरोहित ${locName} एवं आसपास की सभी सोसायटियों व घरों में सीधे पहुँचकर पूजा संपन्न कराते हैं।`
        },
        {
          q: `क्या फ्लैट या अपार्टमेंट में हवन सुरक्षित रूप से किया जा सकता है?`,
          a: `हाँ। हमारे पंडित जी विशेष ताम्र हवन कुंड, सूखी आम की समिधा और शुद्ध गोघृत का उपयोग करते हैं, जिससे धुआँ न्यूनतम रहता है और अनुष्ठान १००% शास्त्रसम्मत होता है।`
        },
        {
          q: `हिंदी एवं संस्कृत भाषी पंडित कैसे बुक करें?`,
          a: `आप वेबसाइट पर ऑनलाइन पूछताछ भेज सकते हैं या सीधे हमारे हेल्पलाइन नंबर पर संपर्क कर सकते हैं। हम आपकी तिथि अनुसार शुभ मुहूर्त एवं पंडित जी की व्यवस्था करेंगे।`
        }
      ];
    }
    return location.localFaqs || [];
  };

  const faqsList = getFaqs();

  return (
    <div style={{ paddingTop: '95px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* ======================================================== */}
        {/* 1. BREADCRUMBS */}
        {/* ======================================================== */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} className="hover:text-amber-800">
            <Home size={13} />
            <span>{lang === 'mr' ? 'मुख्यपृष्ठ' : lang === 'hi' ? 'होम' : 'Home'}</span>
          </span>
          <span>/</span>
          <span onClick={() => navigateTo('location-detail', { slug: 'pandit-in-pune' })} style={{ cursor: 'pointer' }} className="hover:text-amber-800">
            {lang === 'mr' ? 'ठिकाणे' : lang === 'hi' ? 'स्थान' : 'Locations'}
          </span>
          {!location.isParentHub && location.parentCity && (
            <>
              <span>/</span>
              <span
                onClick={() => navigateTo('location-detail', { slug: location.parentSlug || 'pandit-in-pune' })}
                style={{ cursor: 'pointer' }}
                className="hover:text-amber-800"
              >
                {locParentCity || location.parentCity}
              </span>
            </>
          )}
          <span>/</span>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{locName}</span>
        </nav>

        {/* ======================================================== */}
        {/* 2. HERO HEADER */}
        {/* ======================================================== */}
        <header
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FDFBF7 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '24px',
            padding: '40px 36px',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'var(--accent-saffron-light)', color: 'var(--accent-saffron)', fontSize: '12px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <Sparkles size={14} />
              <span>{lang === 'mr' ? `${locName} • पडताळलेले घरपोच वैदिक पुरोहित` : lang === 'hi' ? `${locName} • सत्यापित वैदिक पंडित सेवा` : (location.badge || 'Verified Doorstep Vedic Priests')}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25, marginBottom: '16px' }}>
              {lang === 'mr' ? `${locName} मध्ये वैदिक पूजा व हवनासाठी अनुभवी पंडित` : lang === 'hi' ? `${locName} में वैदिक पूजा एवं हवन हेतु अनुभवी पंडित` : location.h1}
            </h1>

            <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px', fontWeight: 500 }}>
              {lang === 'mr' ? `${locName} मधील सोसायट्या व कुटुंबांसाठी अस्सल हिंदी व संस्कृत जाणणारे अनुभवी वैदिक पुरोहित.` : lang === 'hi' ? `${locName} की सोसायटियों एवं परिवारों के लिए हिंदी व संस्कृत भाषी वैदिक पुरोहित।` : location.tagline}
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => openBookingModal(null, location.name, location.parentCity)}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <CalendarCheck size={18} />
                <span>{lang === 'mr' ? `${locName} मध्ये पंडित बुक करा` : lang === 'hi' ? `${locName} में पंडित बुक करें` : `Book Pandit in ${location.name}`}</span>
              </button>

              <button
                type="button"
                onClick={() => openWhatsAppEnquiry(`Namaste Panditji, I would like to enquire about booking a puja in ${location.name}.`)}
                style={{
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <MessageCircle size={17} />
                <span>{lang === 'mr' ? 'व्हॉट्सअ‍ॅपवर संपर्क करा' : lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'WhatsApp Panditji'}</span>
              </button>

              <button
                type="button"
                onClick={callHelpline}
                style={{
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#FFFFFF',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <PhoneCall size={16} color="var(--accent-saffron)" />
                <span>{BRAND_INFO.phone}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* 3. DISTINCT LOCAL INTRODUCTION & PILLARS */}
        {/* ======================================================== */}
        <section style={{ marginBottom: '48px' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              padding: '36px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <MapPin size={22} color="var(--accent-saffron)" />
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'mr' ? `${locName} मध्ये वैदिक पंडित सेवा` : lang === 'hi' ? `${locName} में वैदिक पंडित सेवाएँ` : `Vedic Pandit Services in ${location.name}`}
              </h2>
            </div>

            <div style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-line', marginBottom: '30px' }}>
              {getIntroText()}
            </div>

            {/* Service Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent-saffron)' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {lang === 'mr' ? 'अस्सल हिंदी व संस्कृत' : lang === 'hi' ? 'प्रामाणिक हिंदी एवं संस्कृत' : 'Native Hindi & Sanskrit'}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {lang === 'mr' ? 'संपूर्ण कथेचे स्पष्टीकरण व अस्सल वैदिक मंत्रोच्चारासह विधी.' : lang === 'hi' ? 'संपूर्ण हिंदी कथा एवं अर्थ सहित शुद्ध वैदिक मंत्रोच्चार।' : 'Authentic mantra recitations with full Hindi Katha narration.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent-gold)' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {lang === 'mr' ? 'अचूक शुभ मुहूर्त' : lang === 'hi' ? 'अचूक शुभ मुहूर्त' : 'Strict Muhurat Adherence'}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {lang === 'mr' ? 'हिंदू पंचांग व कुटुंबियांच्या जन्म नक्षत्रावर आधारित अचूक वेळ.' : lang === 'hi' ? 'पारंपरिक हिंदू पंचांग एवं जन्म नक्षत्र के आधार पर निर्धारित।' : 'Calculated from Hindu Panchang and family Janma Nakshatra.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(21, 150, 107, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#15966B' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {lang === 'mr' ? '१००% शुद्ध सामग्री' : lang === 'hi' ? '१००% शुद्ध वैदिक सामग्री' : '100% Pure Samagri'}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {lang === 'mr' ? 'शुद्ध देशी गायीचे तूप, वाळलेली आंब्याची समिधा व शुद्ध साहित्य.' : lang === 'hi' ? 'शुद्ध देशी गोघृत, सूखी आम की समिधा एवं दुर्लभ जड़ी-बूटियाँ।' : 'Pure Desi cow ghee, dry mango wood, and herbal havan herbs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. AVAILABLE PUJA CEREMONIES IN THIS LOCALITY */}
        {/* ======================================================== */}
        <section style={{ marginBottom: '52px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
              {lang === 'mr' ? 'पवित्र वैदिक विधी' : lang === 'hi' ? 'पवित्र वैदिक अनुष्ठान' : 'Sacred Rituals'}
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
              {lang === 'mr' ? `${locName} मध्ये केल्या जाणाऱ्या प्रमुख वैदिक पूजा` : lang === 'hi' ? `${locName} में संपन्न होने वाली प्रमुख पूजाएँ` : `Popular Vedic Pujas Performed in ${location.name}`}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}
          >
            {(location.topServices || []).map((svc) => (
              <div
                key={svc.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Flame size={18} color="var(--accent-saffron)" />
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {locServiceName(svc)}
                    </h3>
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                    {locServiceDesc(svc) || svc.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #F5EFE6' }}>
                  <button
                    type="button"
                    onClick={() => openBookingModal(svc.name, location.name, location.parentCity)}
                    className="btn-primary"
                    style={{
                      padding: '8px 16px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      flex: 1,
                      cursor: 'pointer'
                    }}
                  >
                    {lang === 'mr' ? `${locName} साठी चौकशी करा` : lang === 'hi' ? `${locName} हेतु पूछताछ करें` : `Enquire for ${location.name}`}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('service-detail', { serviceId: svc.id })}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: '#FAF8F5',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                    title="View ceremony details"
                  >
                    {lang === 'mr' ? 'विधी तपशील' : lang === 'hi' ? 'विधि देखें' : 'View Vidhi'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. STEP-BY-STEP ARRANGEMENT PROCEDURE */}
        {/* ======================================================== */}
        <section
          style={{
            background: 'linear-gradient(135deg, #FBF7F0 0%, #F5F0E6 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '36px',
            marginBottom: '52px'
          }}
        >
          <div style={{ maxWidth: '700px', marginBottom: '28px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
              {lang === 'mr' ? 'सोपी ४-टप्प्यांची पद्धत' : lang === 'hi' ? 'सरल ४-चरणीय प्रक्रिया' : 'Simple 4-Step Process'}
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
              {lang === 'mr' ? `${locName} मध्ये वैदिक पंडित कसे बुक करावे` : lang === 'hi' ? `${locName} में वैदिक पंडित कैसे बुक करें` : `How to Arrange a Vedic Pandit in ${location.name}`}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}
          >
            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>01</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                {lang === 'mr' ? 'चौकशी व गोत्र माहिती' : lang === 'hi' ? 'पूछताछ एवं गोत्र विवरण' : 'Enquiry & Gotra Details'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'mr' ? `तुमची पूजेची गरज, अपेक्षित तारीख, गोत्र आणि ${locName} मधील पत्ता सांगा.` : lang === 'hi' ? `अपनी पूजा आवश्यकता, पसंदीदा तारीख, परिवार का गोत्र और ${locName} का पता साझा करें।` : `Share your ceremony requirement, preferred dates, family Gotra, and apartment locality in ${location.name}.`}
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>02</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                {lang === 'mr' ? 'मुहूर्त व पंडित नियोजन' : lang === 'hi' ? 'मुहूर्त एवं पंडित निर्धारण' : 'Shubh Muhurat Calculation'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'mr' ? 'वरिष्ठ आचार्य शुभ मुहूर्त निश्चित करतात आणि अनुभवी उत्तर भारतीय पुरोहितांचे नियोजन करतात.' : lang === 'hi' ? 'वरिष्ठ आचार्य शुभ लग्न मुहूर्त निकालते हैं और योग्य उत्तर भारतीय पंडित नियुक्त करते हैं।' : 'Senior Vedic Acharyas calculate the auspicious Lagna and Tithi matching your family birth stars.'}
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>03</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                {lang === 'mr' ? 'शुद्ध साहित्याची तयारी' : lang === 'hi' ? 'शुद्ध सामग्री व्यवस्था' : 'Samagri Alignment'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'mr' ? 'पंडितजी संपूर्ण आवश्यक हवन सामग्री, हवन कुंड व पूजेचे साहित्य घेऊन येतात. तुम्ही फक्त ताजी फुले व फळे तयार ठेवा.' : lang === 'hi' ? 'पंडित जी सभी आवश्यक हवन सामग्री, हवन कुंड एवं पूजन द्रव्य साथ लेकर आते हैं। आपको केवल ताजे फूल व फल रखने होते हैं।' : 'Panditji coordinates all dry herbs, havan wood, and pure cow ghee. You only keep basic fresh flowers and fruits ready.'}
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-saffron)', marginBottom: '8px' }}>04</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                {lang === 'mr' ? 'घरी विधी व आशीर्वाद' : lang === 'hi' ? 'गृह अनुष्ठान एवं आशीर्वाद' : 'Auspicious Conduction'}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'mr' ? 'मंत्रोच्चार, हवन, आरती व आदरपूर्वक आशीर्वादाने संपूर्ण विधी संपन्न होतो.' : lang === 'hi' ? 'पंडित जी आपके निवास पर पहुँचकर शुद्ध संस्कृत मंत्रोच्चार एवं हिंदी कथा के साथ अनुष्ठान संपन्न कराते हैं।' : 'Panditji arrives punctually at your residence to conduct the ritual with authentic Sanskrit chanting and Hindi Katha.'}
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. VERIFIED LOCAL FAQS */}
        {/* ======================================================== */}
        {faqsList && faqsList.length > 0 && (
          <section style={{ marginBottom: '52px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
                {lang === 'mr' ? 'भक्तांचे प्रश्न' : lang === 'hi' ? 'भक्तों के प्रश्न' : 'Devotee Questions'}
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {lang === 'mr' ? `${locName} मध्ये पंडित बुकिंगबाबत वारंवार विचारले जाणारे प्रश्न` : lang === 'hi' ? `${locName} में पंडित बुकिंग संबंधी अक्सर पूछे जाने वाले प्रश्न` : `Frequently Asked Questions for ${location.name}`}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqsList.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1px solid var(--border-subtle)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--text-main)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} color="var(--accent-saffron)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 24px 20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, borderTop: '1px solid #FAF7F0', paddingTop: '14px' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 7. RELATED EDUCATIONAL GUIDES */}
        {/* ======================================================== */}
        <section style={{ marginBottom: '52px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-saffron)' }}>
                {lang === 'mr' ? 'माहितीपूर्ण मार्गदर्शन' : lang === 'hi' ? 'मार्गदर्शक लेख' : 'Educational Resources'}
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {lang === 'mr' ? 'वैदिक पूजा मार्गदर्शिका' : lang === 'hi' ? 'वैदिक पूजा मार्गदर्शिकाएँ' : 'Vedic Puja Guides for Devotees'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('puja-guides')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-saffron)',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <span>{lang === 'mr' ? 'सर्व मार्गदर्शक पहा' : lang === 'hi' ? 'सभी मार्गदर्शिकाएँ देखें' : 'View All Guides'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {relatedGuides.map((guide) => (
              <div
                key={guide.slug}
                onClick={() => navigateTo('puja-guide-detail', { slug: guide.slug })}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)', letterSpacing: '0.04em' }}>
                    {guide.categoryName}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginTop: '6px', marginBottom: '10px', lineHeight: 1.4 }}>
                    {guide.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {guide.summary}
                  </p>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-saffron)', fontSize: '12.5px', fontWeight: 700 }}>
                  <span>{lang === 'mr' ? 'पूर्ण वाचा' : lang === 'hi' ? 'पूरा पढ़ें' : 'Read Guide'}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. NEARBY CONNECTED LOCALITIES (INTERNAL LINKING) */}
        {/* ======================================================== */}
        {nearbyLocations && nearbyLocations.length > 0 && (
          <section
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'mr' ? `${locParentCity || 'पुणे व पिंपरी-चिंचवड'} मधील जवळपासचे परिसर` : lang === 'hi' ? `${locParentCity || 'पुणे एवं पिंपरी-चिंचवड'} के आसपास के क्षेत्र` : `Explore Nearby Localities in ${location.parentCity || 'Pune & PCMC'}`}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {lang === 'mr' ? 'जवळपासच्या सर्व भागांमध्ये उत्तर भारतीय वैदिक पंडित सेवा उपलब्ध आहे:' : lang === 'hi' ? 'आसपास के सभी प्रमुख क्षेत्रों में उत्तर भारतीय वैदिक पंडित सेवा उपलब्ध है:' : 'Doorstep North Indian Vedic pandit services available across neighboring areas:'}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {nearbyLocations.map((nearLoc) => (
                <button
                  key={nearLoc.slug}
                  type="button"
                  onClick={() => navigateTo('location-detail', { slug: nearLoc.slug })}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    background: '#FAF7F0',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                  className="hover:border-amber-600 hover:text-amber-800"
                >
                  <MapPin size={13} color="var(--accent-saffron)" />
                  <span>{lang === 'mr' ? `${locLocationName(nearLoc, 'mr')} मध्ये पंडित` : lang === 'hi' ? `${locLocationName(nearLoc, 'hi')} में पंडित` : `Pandit in ${nearLoc.name}`}</span>
                </button>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
