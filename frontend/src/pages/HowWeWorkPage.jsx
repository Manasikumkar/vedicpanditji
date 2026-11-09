import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/vedicPanditData';
import { useI18n } from '../i18n/useI18n';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  Home
} from 'lucide-react';

export default function HowWeWorkPage() {
  const { navigateTo, openBookingModal, callHelpline } = useApp();
  const { lang, t } = useI18n();

  const labels = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbHow: 'कार्यपद्धती',
      sectionTag: 'प्रक्रिया व पारदर्शकता',
      h1: 'वैदिकपंडितजी तुमचे विधी कसे संपन्न करतात',
      intro: 'आम्ही तुमच्या सर्व शुभ धार्मिक विधींची संपूर्ण जबाबदारी घेतो. शुभ मुहूर्त ज्योतिषीय गणनेपासून ते पंडित नेमणूक, १००% शुद्ध पूजा साहित्य आणि शांततापूर्ण हवन विधीपर्यंत सर्व काही पद्धतशीर पार पाडले जाते.',
      steps: [
        {
          step: '०१',
          title: 'विधी निवडा आणि शुभ मुहूर्त सल्ला घ्या',
          subtitle: 'कुंडली व पंचांगावर आधारित विनामूल्य मुहूर्त गणना',
          description: 'तुमची इच्छित पूजा, हवन किंवा विवाह विधी निवडा. तुमच्या सोयीच्या तारखा, गोत्र आणि नक्षत्र सामायिक करा. आमचे ज्येष्ठ वैदिक आचार्य सर्वात शुभ लग्न आणि तिथी सुचवण्यासाठी कुंडलीचा अभ्यास करतात.'
        },
        {
          step: '०२',
          title: 'सानुकूल विधी व पारदर्शक दक्षिणा',
          subtitle: 'कोणतेही छुपे शुल्क नाही व साहित्याची स्पष्ट माहिती',
          description: 'तुम्हाला संपूर्ण प्रीमियम साहित्य (शुद्ध गाईचे तूप, हवन समिधा, सुकामेवा, ताजी फुले) हवे आहे की फक्त पुरोहित सेवा हवी आहे, हे ठरवले जाते. तुम्हाला सुरुवातीलाच पारदर्शक दक्षिणा सांगितली जाते.'
        },
        {
          step: '०३',
          title: 'अनुभवी वैदिक पंडित तुमच्या घरी उपस्थित',
          subtitle: 'हिंदी व संस्कृत विधीसह उत्तर भारतीय व बिहारी पुरोहित',
          description: 'प्रमाणित वैदिक पंडित शुद्ध संस्कृत श्लोक आणि अस्खलित हिंदी कथेसह तुमची पूजा संपन्न करतात. ते सर्व आवश्यक पवित्र उपकरणे आणि हवन कुंड घेऊन वेळेवर पोहोचतात.'
        },
        {
          step: '०४',
          title: 'पवित्र विधी संपन्नता आणि दैवी आशीर्वाद',
          subtitle: 'तपशीलवार अर्थासह शुद्ध संस्कृत मंत्र',
          description: 'आचार्य तुमच्या संपूर्ण कुटुंबाला प्रत्येक टप्प्यावर मार्गदर्शन करतात—गणेश स्थापना, कलश पूजा, नवग्रह आराधना, अग्निहोत्र हवन आणि पूर्णाहुती—सर्व विधींचे महत्त्व समजावून सांगून घराचे शुद्धीकरण करतात.'
        }
      ],
      standardsTag: 'गुणवत्तेची खात्री',
      standardsTitle: 'वैदिक सेवेचे ४ मुख्य निकष',
      standards: [
        {
          title: 'अनुभवी वैदिक आचार्य',
          desc: 'अचूक संस्कृत उच्चार आणि शास्त्रोक्त श्रद्धेसह वैदिक कर्मकांडात प्रशिक्षित.'
        },
        {
          title: '१००% शुद्ध हवन साहित्य',
          desc: 'अभेसळ आयुर्वेदिक जडीबुटी, शुद्ध देशी गाईचे तूप, अस्सल गंगाजल आणि स्वच्छतेने पॅक केलेले साहित्य.'
        },
        {
          title: 'अचूक पंचांग शुभ मुहूर्त',
          desc: 'तुमची जन्म राशी, नक्षत्र आणि कौटुंबिक पत्रिकेनुसार वैयक्तिकृत मुहूर्त गणना.'
        },
        {
          title: 'घरपोच व देशभरात सेवा विस्तार',
          desc: 'पुणे व मुंबईत वक्तशीर घरपोच सेवा, तसेच देशभरात प्रवास करणारे आचार्य आणि थेट ई-पूजा.'
        }
      ],
      ctaTitle: 'पुण्यात शुभ मुहूर्त किंवा पूजा विधीबाबत काही शंका आहेत का?',
      ctaDesc: 'आमच्या ज्येष्ठ वैदिक आचार्य आणि समन्वयकांशी थेट चर्चा करा.',
      bookPandit: 'पंडित बुक करा',
      exploreCatalogue: 'पूजा सूची पहा'
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbHow: 'कार्यप्रणाली',
      sectionTag: 'प्रक्रिया एवं पारदर्शिता',
      h1: 'वैदिकपंडितजी आपका अनुष्ठान कैसे संपन्न कराते हैं',
      intro: 'हम आपके मांगलिक धार्मिक संस्कारों की संपूर्ण जिम्मेदारी लेते हैं। शुभ मुहूर्त की सूक्ष्म ज्योतिषीय गणना एवं आचार्य चयन से लेकर शत-प्रतिशत शुद्ध पूजन सामग्री और शांत वातावरण में विधिपूर्वक हवन संपन्न कराने तक।',
      steps: [
        {
          step: '01',
          title: 'अनुष्ठान चुनें एवं शुभ मुहूर्त परामर्श लें',
          subtitle: 'कुंडली व पंचांग आधारित निःशुल्क मुहूर्त गणना',
          description: 'अपनी मनोवांछित पूजा, हवन अथवा विवाह संस्कार चुनें। अपनी पसंदीदा तिथियाँ, पारिवारिक गोत्र व जन्म नक्षत्र साझा करें। हमारे वरिष्ठ वैदिक आचार्य सर्वाधिक कल्याणकारी लग्न एवं तिथि का निर्धारण करते हैं।'
        },
        {
          step: '02',
          title: 'कस्टमाइज्ड विधि एवं पारदर्शी दक्षिणा',
          subtitle: 'कोई छिपा शुल्क नहीं एवं सामग्री की स्पष्ट सूची',
          description: 'यह तय किया जाता है कि आपको संपूर्ण शुद्ध सामग्री (देशी गाय का घी, आम की समिधा, सूखे मेवे, ताजे फूल) चाहिए अथवा केवल पुरोहित सेवा। आपको पहले ही स्पष्ट एवं पारदर्शी विवरण दिया जाता है।'
        },
        {
          step: '03',
          title: 'अनुभवी वैदिक पंडित आपके घर पर उपस्थित',
          subtitle: 'हिंदी व संस्कृत विधि विधान में दक्ष उत्तर भारतीय व बिहारी पुरोहित',
          description: 'सत्यापित वैदिक पंडित विशुद्ध संस्कृत श्लोक एवं सुबोध हिंदी कथा वाचन के साथ अनुष्ठान कराते हैं। वे समस्त आवश्यक पावन सामग्री व हवन कुंड के साथ समय पर पहुँचते हैं।'
        },
        {
          step: '04',
          title: 'पवित्र अनुष्ठान पूर्णता एवं दिव्य आशीर्वाद',
          subtitle: 'सस्वर शुद्ध संस्कृत मंत्रोच्चार एवं अर्थ सहित व्याख्या',
          description: 'आचार्य आपके पूरे परिवार को प्रत्येक चरण—गणेश पूजन, कलश स्थापना, नवग्रह शांति, अग्निहोत्र हवन एवं पूर्णाहुति—का आध्यात्मिक महत्व समझाते हुए संपन्न कराते हैं।'
        }
      ],
      standardsTag: 'गुणवत्ता आश्वासन',
      standardsTitle: 'वैदिक सेवा के 4 प्रमुख मानक',
      standards: [
        {
          title: 'अनुभवी वैदिक आचार्य',
          desc: 'विशुद्ध संस्कृत उच्चारण एवं शास्त्रीय निष्ठा के साथ वैदिक कर्मकांड में पारंगत।'
        },
        {
          title: '100% शुद्ध हवन सामग्री',
          desc: 'बिना किसी मिलावट की आयुर्वेदिक दुर्लभ जड़ी-बूटियाँ, शुद्ध देशी गाय का घी, गंगाजल एवं सुरक्षित पैकिंग।'
        },
        {
          title: 'सटीक पंचांग शुभ मुहूर्त',
          desc: 'आपकी जन्म राशि, नक्षत्र और पारिवारिक कुंडली के अनुसार व्यक्तिगत मुहूर्त निर्धारण।'
        },
        {
          title: 'घर पर एवं संपूर्ण भारत में सेवा',
          desc: 'पुणे व मुंबई में समय पर घर पर सेवा, तथा प्रमुख शहरों में भ्रमणशील आचार्य एवं लाइव ई-पूजा।'
        }
      ],
      ctaTitle: 'पुणे में शुभ मुहूर्त अथवा पूजा विधि के विषय में कोई प्रश्न है?',
      ctaDesc: 'हमारे वरिष्ठ वैदिक आचार्यों एवं समन्वयकों से सीधा परामर्श प्राप्त करें।',
      bookPandit: 'पंडित बुक करें',
      exploreCatalogue: 'अनुष्ठान सूची देखें'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbHow: 'How We Work',
      sectionTag: 'Process & Transparency',
      h1: 'How VedicPanditji Conducts Your Ceremony',
      intro: 'We take complete responsibility for your auspicious rituals across India. From Shubh Muhurat astrological calculation and priest assignment to 100% pure Vedic samagri and peaceful hawan conduction.',
      steps: [
        {
          step: '01',
          title: 'Select Ceremony & Consult Shubh Muhurat',
          subtitle: 'Free Muhurat Calculation based on Kundali & Panchang',
          description: 'Choose your desired puja, hawan, or wedding ritual. Share your preferred dates, Gotra, and Nakshatra. Our senior Vedic Acharyas assess your family horoscope to recommend the most auspicious lagna and tithi.'
        },
        {
          step: '02',
          title: 'Customized Vidhi & Transparent Dakshina',
          subtitle: 'No Hidden Fees & Clear Samagri Inclusions',
          description: 'We finalize whether you require complete premium samagri (pure cow ghee, hawan kashtha, dry fruits, fresh flowers) or pandit-only service. You receive a transparent breakdown with zero last-minute surprises.'
        },
        {
          step: '03',
          title: 'Experienced Vedic Pandit Assigned to Your Home',
          subtitle: 'North Indian & Bihari Priests with Hindi & Sanskrit Vidhi',
          description: 'A verified Vedic pandit conducts your ceremony with pristine Sanskrit shlokas and fluent Hindi Katha, arriving punctually with all requisite sacred paraphernalia and hawan kund.'
        },
        {
          step: '04',
          title: 'Sacred Ritual Conduction & Divine Blessings',
          subtitle: 'Shuddha Sanskrit Mantras with Detailed Meaning',
          description: 'The Acharya guides your entire family through each step—Ganesh Sthapana, Kalash Puja, Navagraha Aradhana, Agni Hotra Hawan, and Purna Ahuti—explaining significance and leaving your abode purified.'
        }
      ],
      standardsTag: 'Quality Assurance',
      standardsTitle: 'The 4 Core Vedic Service Standards',
      standards: [
        {
          title: 'Experienced Vedic Acharyas',
          desc: 'Trained in Vedic Karmakanda with accurate Sanskrit pronunciation and scriptural devotion.'
        },
        {
          title: '100% Shuddha Hawan Samagri',
          desc: 'Unadulterated ayurvedic herbs, pure desi cow ghee, authentic gangajal, and fresh samagri packed hygienically.'
        },
        {
          title: 'Exact Panchang Shubh Muhurat',
          desc: 'Personalized muhurat calculations aligned with your Janma Rashi, Nakshatra, and family astrological chart.'
        },
        {
          title: 'Doorstep & All-India Service Coverage',
          desc: 'Punctual doorstep service across Pune & MMR, with visiting Acharyas and live interactive HD E-Pujas nationwide.'
        }
      ],
      ctaTitle: 'Have questions regarding Shubh Muhurat or Puja Vidhi in Pune?',
      ctaDesc: 'Consult directly with our senior Vedic Acharyas and coordinators.',
      bookPandit: 'Book a Pandit',
      exploreCatalogue: 'Explore Puja Catalogue'
    }
  };

  const L = labels[lang] || labels.en;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '50px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>{L.breadcrumbHome}</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbHow}</span>
          </div>
          <span className="section-tag">{L.sectionTag}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, marginBottom: '14px' }}>
            {L.h1}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            {L.intro}
          </p>
        </div>

        {/* Detailed 4 Steps with Visuals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '70px' }}>
          {L.steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '36px',
                border: '1px solid #EAE5D9',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '30px',
                alignItems: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="how-we-work-card"
            >
              {/* Step Badge */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-saffron)'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Step
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800 }}>
                  {step.step}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '10px' }}>
                  {step.subtitle}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Vedic Standards Box */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <span className="section-tag">{L.standardsTag}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700 }}>
              {L.standardsTitle}
            </h2>
          </div>

          <div className="grid-2" style={{ gap: '24px' }}>
            {L.standards.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid #EAE5D9',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                <CheckCircle2 size={22} color="var(--accent-saffron)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helpline CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%)',
            borderRadius: '16px',
            border: '1px solid var(--border-gold)',
            padding: '28px 36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
              {L.ctaTitle}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {L.ctaDesc}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openBookingModal(null, null, 'Pune')}
              className="btn-primary"
              style={{ padding: '12px 22px', fontSize: '14px', cursor: 'pointer' }}
            >
              <span>{L.bookPandit}</span>
            </button>
            <button
              onClick={() => navigateTo('catalogue')}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px', cursor: 'pointer' }}
            >
              <span>{L.exploreCatalogue}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-we-work-card {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
        }
      `}</style>
    </div>
  );
}
