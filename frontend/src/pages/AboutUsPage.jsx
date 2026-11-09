import React from 'react';
import { useApp } from '../context/AppContext';
import { PUNE_LOCALITIES } from '../data/vedicPanditData';
import { useI18n } from '../i18n/useI18n';
import { CheckCircle2, Home, Flame, MapPin, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export default function AboutUsPage() {
  const { navigateTo, openBookingModal } = useApp();
  const { lang, t } = useI18n();

  const labels = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbAbout: 'आमच्याविषयी',
      badge: 'अस्सल वैदिक वारसा • पुणे • संपूर्ण भारत',
      h1: 'भक्ती आणि शास्त्रीय अचूकतेसह वैदिक सनातन परंपरेचे संवर्धन',
      mission: 'वैदिकपंडितजींची स्थापना एका उदात्त ध्येयाने झाली: देशभरातील भाविक कुटुंबांना अनुभवी उत्तर भारतीय व बिहारी पंडितांशी जोडणे, जे सखोल शास्त्रोक्त श्रद्धेने हिंदी व संस्कृतमध्ये सर्व विधी संपन्न करतात.',
      bookPandit: 'पंडित बुक करा',
      browseServices: 'विधी सूची पहा',
      pillars: [
        { stat: 'हिंदी व संस्कृत', title: 'विधीच्या भाषा', desc: 'अस्सल वैदिक मंत्र आणि सुलभ हिंदी कथा' },
        { stat: 'वैदिक विद्वान', title: 'प्रामाणिक परंपरा', desc: 'अनुभवी उत्तर भारतीय व बिहारी पुरोहित' },
        { stat: 'पुणे व PCMC', title: 'घरपोच विधी सेवा', desc: 'सर्व प्रमुख उपनगरांमध्ये थेट उपस्थिती' },
        { stat: 'शुद्ध सामग्री', title: 'पूजा साहित्य', desc: 'हवन समिधा व शुद्ध देशी गाईचे तूप' }
      ],
      leadershipTag: 'आध्यात्मिक मार्गदर्शन',
      leadershipTitle: 'आमच्या ज्येष्ठ वैदिक आचार्यांची ओळख',
      leadershipP1: 'वैदिक कर्मकांडाच्या पवित्र परंपरेत निष्णात असलेले आमचे ज्येष्ठ आचार्य कुटुंबांना आयुष्यातील प्रत्येक महत्त्वाच्या वळणावर मार्गदर्शन करतात. शुभ मुहूर्त गणना, गृहप्रवेश, सत्यनारायण व्रत कथा आणि विवाह विधींमधील त्यांच्या विद्वत्तेमुळे प्रत्येक मंत्रोच्चार सकारात्मक आध्यात्मिक ऊर्जा निर्माण करतो.',
      leadershipP2: 'कठोर शास्त्रीय निकषांनुसार, आमच्याशी जोडलेले सर्व वैदिक पुरोहित केवळ मंत्रोच्चार आणि विधी ज्ञानासाठीच नव्हे, तर त्यांची वक्तशीरपणा, आदरयुक्त स्वभाव आणि आधुनिक पिढीला विधींचे महत्त्व समजावून सांगण्याच्या क्षमतेसाठी ओळखले जातात.',
      points: [
        'शुक्ल यजुर्वेद, ऋग्वेदीय ऋचा आणि पराशर पद्धतीनुसार शुभ मुहूर्त गणना',
        'अस्सल वैदिक संस्कृत मंत्रोच्चार आणि प्रत्येक टप्प्यावर स्पष्ट हिंदी कथा विवेचन',
        'गोत्र संकल्प, आवश्यक साहित्य आणि पंचांग मुहूर्ताबाबत वैयक्तिक मार्गदर्शन'
      ],
      sankalpTitle: 'सनातन सेवा संकल्प',
      sankalpQuote: '"वेदांचा पवित्र अग्नी तुमच्या उंबरठ्यावर आणून वास्तूतील नकारात्मक ऊर्जा दूर करणे आणि जीवनात दैवी शांती, सुख व समृद्धी प्रस्थापित करणे हाच आमचा भक्तिभाव आहे."',
      sankalpAuthor: 'ज्येष्ठ आचार्य परिषद',
      sankalpRole: 'वैदिक विद्वान, वैदिकपंडितजी',
      coverageTitle: 'अखिल भारतीय सेवा विस्तार',
      coverageDesc: 'वैदिकपंडितजी देशभरातील भाविकांची सेवा करतात. पुणे व मुंबईत घरपोच पुरोहितांपासून ते प्रमुख शहरांमध्ये थेट संवाद साधणाऱ्या HD ई-पूजेपर्यंत:',
      coverageHubs: ['पुणे व PCMC केंद्र', 'मुंबई व MMR', 'बंगळुरू', 'दिल्ली-एनसीआर', 'हैदराबाद', 'चेन्नई', 'नाशिक (त्र्यंबकेश्वर)', 'अखिल भारत व जागतिक ई-पूजा'],
      puneTitle: 'पुणे व पिंपरी-चिंचवड परिसर',
      puneDesc: 'अनुभवी वैदिक पुरोहित खालील प्रमुख परिसरांमध्ये थेट तुमच्या निवासस्थानी येतात:'
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbAbout: 'हमारे बारे में',
      badge: 'प्रामाणिक वैदिक धरोहर • पुणे • संपूर्ण भारत',
      h1: 'समर्पण एवं शास्त्रीय शुद्धता के साथ वैदिक सनातन परंपरा का संरक्षण',
      mission: 'वैदिकपंडितजी की स्थापना एक पावन संकल्प के साथ हुई: भारत भर के परिवारों को अनुभवी उत्तर भारतीय एवं बिहारी पंडितों से जोड़ना, जो गहरी शास्त्रीय निष्ठा के साथ हिंदी और संस्कृत में समस्त अनुष्ठान संपन्न कराते हैं।',
      bookPandit: 'पंडित बुक करें',
      browseServices: 'अनुष्ठान सूची देखें',
      pillars: [
        { stat: 'हिंदी एवं संस्कृत', title: 'अनुष्ठान की भाषाएँ', desc: 'सस्वर वैदिक मंत्र एवं सुबोध हिंदी कथा' },
        { stat: 'वैदिक विद्वान', title: 'प्रामाणिक परंपराएँ', desc: 'अनुभवी उत्तर भारतीय व बिहारी पुरोहित' },
        { stat: 'पुणे व PCMC', title: 'घर पर सेवा', desc: 'समस्त आवासीय क्षेत्रों में सुलभ उपलब्धता' },
        { stat: 'शुद्ध सामग्री', title: 'पूजन सामग्री', desc: 'हवन समिधा एवं शुद्ध देशी गाय का घी' }
      ],
      leadershipTag: 'आध्यात्मिक नेतृत्व',
      leadershipTitle: 'हमारे वरिष्ठ वैदिक आचार्यों से मिलें',
      leadershipP1: 'वैदिक कर्मकांड की पावन परंपरा में दीक्षित हमारे अनुभवी वैदिक आचार्य परिवारों को जीवन के मांगलिक अवसरों पर शास्त्रीय मार्गदर्शन प्रदान करते हैं। शुभ मुहूर्त निर्धारण, गृह प्रवेश, श्री सत्यनारायण व्रत कथा एवं विवाह संस्कारों में उनकी विशेषज्ञता यह सुनिश्चित करती है कि प्रत्येक मंत्र परिवार में सकारात्मक आध्यात्मिक ऊर्जा का संचार करे।',
      leadershipP2: 'कठोर शास्त्रीय मानकों के अंतर्गत, हमारे सभी पुरोहित न केवल शुद्ध मंत्रोच्चार और विधि ज्ञान के लिए, बल्कि समय की पाबंदी, विनम्रता और नई पीढ़ी को संस्कारों का वैज्ञानिक व आध्यात्मिक महत्व समझाने के लिए जाने जाते हैं।',
      points: [
        'शुक्ल यजुर्वेद, ऋग्वेदीय ऋचाओं एवं पराशर पंचांग पद्धति द्वारा अचूक मुहूर्त गणना',
        'विशुद्ध वैदिक संस्कृत में अनुष्ठान एवं प्रत्येक चरण की सुबोध हिंदी व्याख्या',
        'गोत्र संकल्प, पूजन विधि और आवश्यक सामग्री हेतु व्यक्तिगत मार्गदर्शन'
      ],
      sankalpTitle: 'सनातन सेवा संकल्प',
      sankalpQuote: '"वेदों की पावन अग्नि को आपके घर की चौखट तक पहुँचाकर वास्तु के समस्त दोषों का निवारण करना तथा आपके जीवन में सुख, शांति और समृद्धि का वरदान लाना ही हमारा परम ध्येय है।"',
      sankalpAuthor: 'वरिष्ठ आचार्य परिषद',
      sankalpRole: 'वैदिक विद्वान, वैदिकपंडितजी',
      coverageTitle: 'अखिल भारतीय सेवा विस्तार',
      coverageDesc: 'वैदिकपंडितजी देश भर के भक्तों की सेवा में समर्पित हैं। पुणे और मुंबई में घर पर पुरोहित सेवा से लेकर देश के प्रमुख महानगरों में लाइव इंटरएक्टिव एचडी ई-पूजा तक:',
      coverageHubs: ['पुणे व PCMC केंद्र', 'मुंबई व MMR', 'बैंगलोर', 'दिल्ली-एनसीआर', 'हैदराबाद', 'चेन्नई', 'नासिक (त्र्यंबकेश्वर)', 'अखिल भारत एवं वैश्विक ई-पूजा'],
      puneTitle: 'पुणे एवं पिंपरी-चिंचवड क्षेत्र',
      puneDesc: 'अनुभवी वैदिक पुरोहित सीधे आपके घर पर पूजा हेतु उपस्थित होते हैं:'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbAbout: 'About Us',
      badge: 'Authentic Vedic Heritage • Pune • Pan-India',
      h1: 'Preserving Vedic Sanatan Traditions with Devotion & Precision',
      mission: 'VedicPanditji was founded with a singular mission: to connect families across India with experienced North Indian and Bihari Pandits who conduct ceremonies with deep scriptural reverence in Hindi and Sanskrit.',
      bookPandit: 'Book a Pandit',
      browseServices: 'Browse Ceremonies Catalogue',
      pillars: [
        { stat: 'Hindi & Sanskrit', title: 'Ritual Languages', desc: 'Classical Mantras & Hindi Katha' },
        { stat: 'Vedic Vidwans', title: 'Authentic Traditions', desc: 'North Indian & Bihari Priests' },
        { stat: 'Pune & PCMC', title: 'Doorstep Conduction', desc: 'Doorstep Locality Network' },
        { stat: 'Pure Samagri', title: 'Ceremonial Materials', desc: 'Hawan Kashtha & Cow Ghee' }
      ],
      leadershipTag: 'Spiritual Leadership',
      leadershipTitle: 'Meet Our Senior Vedic Acharyas',
      leadershipP1: 'With deep roots in the sacred tradition of Vedic Karmakanda, our experienced Vedic Acharyas guide families through auspicious life milestones. Renowned across Pune and major Indian cities for their knowledge in Shubh Muhurat calculations, Griha Pravesh, Satyanarayan Vrat Katha, and wedding ceremonies, our team ensures that every mantra resonates with profound spiritual vibration.',
      leadershipP2: 'Under strict scriptural standards, all affiliated Vedic Purohits are vetted not only for their scriptural pronunciation and ritual knowledge, but for their punctuality, warmth, and devotion to explaining the meaning of the rites to modern devotees and younger generations.',
      points: [
        'Expertise in Shukla Yajurveda, Rigvedic chants, and Parashara Muhurat',
        'Rituals solemnized strictly in Vedic Sanskrit with step-by-step Hindi Katha explanation',
        'Personalized guidance for Gotra Sankalp, Vidhi requirements, and Panchang Muhurat'
      ],
      sankalpTitle: 'Sanatan Seva Sankalp',
      sankalpQuote: '"Our devotion is to bring the sacred agni of the Vedas to your threshold, cleansing spaces of negative energies and bestowing divine peace (Shanti), wealth, and prosperity."',
      sankalpAuthor: 'Senior Acharya Parishad',
      sankalpRole: 'Vedic Scholars, VedicPanditji',
      coverageTitle: 'All-India Service Coverage',
      coverageDesc: 'VedicPanditji serves devotees nationwide. From doorstep in-person priests in Pune & Mumbai to visiting Acharyas and live interactive HD E-Pujas in major hubs:',
      coverageHubs: ['Pune & PCMC Hub', 'Mumbai & MMR', 'Bangalore', 'Delhi-NCR', 'Hyderabad', 'Chennai', 'Nashik (Trimbakeshwar)', 'Pan-India & Global E-Puja'],
      puneTitle: 'Pune & PCMC Localities',
      puneDesc: 'Experienced Vedic Purohits travel directly to residential premises across:'
    }
  };

  const L = labels[lang] || labels.en;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">{L.breadcrumbHome}</span>
          {' / '}
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbAbout}</span>
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
              {L.badge}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.25 }}>
              {L.h1}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
              {L.mission}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openBookingModal(null, null, 'Pune')}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '14px', cursor: 'pointer' }}
              >
                <span>{L.bookPandit}</span>
              </button>
              <button
                onClick={() => navigateTo('catalogue')}
                className="btn-secondary"
                style={{ padding: '12px 24px', fontSize: '14px', cursor: 'pointer', background: '#FFFFFF' }}
              >
                <span>{L.browseServices}</span>
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
          {L.pillars.map((pil, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '30px', borderRadius: '16px', border: '1px solid #EAE5D9', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-saffron)', fontFamily: 'var(--font-display)' }}>{pil.stat}</div>
              <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>{pil.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{pil.desc}</div>
            </div>
          ))}
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
            <span className="section-tag">{L.leadershipTag}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>
              {L.leadershipTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
              {L.leadershipP1}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              {L.leadershipP2}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {L.points.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--accent-saffron)" style={{ flexShrink: 0 }} />
                  <span>{pt}</span>
                </div>
              ))}
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
            <div style={{ fontSize: '38px', marginBottom: '10px' }}>🕉️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
              {L.sankalpTitle}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px', fontStyle: 'italic' }}>
              {L.sankalpQuote}
            </p>
            <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{L.sankalpAuthor}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{L.sankalpRole}</div>
            </div>
          </div>
        </div>

        {/* All-India Coverage and Localities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }} className="about-coverage-grid">
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid #EAE5D9' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
              {L.coverageTitle}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
              {L.coverageDesc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {L.coverageHubs.map((cName, idx) => (
                <span key={idx} style={{ background: 'var(--bg-primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: 'var(--text-main)', border: '1px solid #EAE5D9', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="var(--accent-saffron)" />
                  {cName}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid #EAE5D9' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>
              {L.puneTitle}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
              {L.puneDesc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PUNE_LOCALITIES.filter(l => l !== 'All Pune Areas').slice(0, 10).map((loc, idx) => (
                <span key={idx} style={{ background: 'var(--bg-primary)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: 'var(--text-secondary)', border: '1px solid #EAE5D9', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="var(--accent-gold)" />
                  {loc}
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
        }
      `}</style>
    </div>
  );
}
