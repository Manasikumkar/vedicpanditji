import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n/useI18n';
import { ShieldCheck, FileText, RefreshCw, Lock } from 'lucide-react';
import { BRAND_INFO } from '../data/vedicPanditData';

const LEGAL_CONTENT = {
  cancellation: {
    title: {
      en: 'Cancellation & Rescheduling Guidelines',
      hi: 'रद्दीकरण एवं पुनर्निर्धारण संबंधी दिशानिर्देश',
      mr: 'रद्द करणे आणि वेळ बदलणे संबंधी मार्गदर्शक तत्त्वे'
    },
    intro: {
      en: 'At VedicPanditji, we understand that auspicious dates and family ceremonies may occasionally require adjustment due to astrological considerations or personal emergencies.',
      hi: 'वैदिकपंडितजी में, हम समझते हैं कि शुभ तिथियों और पारिवारिक अनुष्ठानों में ज्योतिषीय गणनाओं या व्यक्तिगत अपरिहार्य कारणों से समय में बदलाव की आवश्यकता हो सकती है।',
      mr: 'वैदिकपंडितजी येथे, आम्ही समजतो की शुभ तिथी आणि कौटुंबिक विधींमध्ये ज्योतिषीय कारणे किंवा वैयक्तिक तातडीच्या परिस्थितीमुळे वेळेत बदल करावा लागू शकतो.'
    },
    sections: [
      {
        heading: {
          en: '1. Free Rescheduling',
          hi: '१. निःशुल्क पुनर्निर्धारण (Free Rescheduling)',
          mr: '१. मोफत तारीख व वेळ बदलणे (Free Rescheduling)'
        },
        body: {
          en: 'You may reschedule your ceremony date and time slot at zero extra charges provided the request is communicated at least 24 hours prior to the scheduled Shubh Muhurat.',
          hi: 'निर्धारित शुभ मुहूर्त से कम से कम २४ घंटे पूर्व सूचना देने पर आप बिना किसी अतिरिक्त शुल्क (zero extra charges) के अपनी पूजा की तिथि एवं समय पुनर्निर्धारित कर सकते हैं।',
          mr: 'नियोजित शुभ मुहूर्ताच्या किमान २४ तास आधी विनंती कळवल्यास आपण कोणत्याही अतिरिक्त शुल्काशिवाय (zero extra charges) आपल्या पूजेची तारीख आणि वेळ बदलू शकता.'
        }
      },
      {
        heading: {
          en: '2. Direct Consultation Flexibility',
          hi: '२. प्रत्यक्ष परामर्श एवं लचीलापन (Direct Consultation Flexibility)',
          mr: '२. थेट सल्लामसलत व लवचिकता (Direct Consultation Flexibility)'
        },
        body: {
          en: 'Since VedicPanditji operates on direct consultation and transparent dakshina without mandatory advance token lock-ins, clients can easily adjust priest assignments by speaking directly with our senior coordination team.',
          hi: 'वैदिकपंडितजी प्रत्यक्ष परामर्श एवं पारदर्शी दक्षिणा पर कार्य करता है, जिसमें किसी भी प्रकार का अनिवार्य अग्रिम टोकन अवरुद्ध नहीं किया जाता। अतः यजमान हमारी वरिष्ठ समन्वय टीम से सीधे बात कर पुरोहित व्यवस्था में सुगमता से समन्वय कर सकते हैं।',
          mr: 'वैदिकपंडितजी थेट सल्लामसलत आणि पारदर्शक दक्षिणेवर कार्य करते, ज्यामध्ये अनिवार्य आगाऊ टोकन रक्कम अडकवून ठेवली जात नाही. त्यामुळे यजमान आमच्या वरिष्ठ समन्वयक चमूशी थेट बोलून पुरोहित नियोजनात सहज समन्वय साधू शकतात.'
        }
      },
      {
        heading: {
          en: '3. Pandit Replacement Assurance',
          hi: '३. पुरोहित प्रतिस्थापन आश्वासन (Pandit Replacement Assurance)',
          mr: '३. पुरोहित पर्यायी व्यवस्था हमी (Pandit Replacement Assurance)'
        },
        body: {
          en: 'In the rare event that an assigned priest faces an unavoidable medical emergency, our senior Acharyas coordinate a qualified Vedic substitute on time to preserve your Muhurat sanctity.',
          hi: 'किसी दुर्लभ परिस्थिति में यदि नियत पुरोहित को कोई अपरिहार्य चिकित्सीय आपात स्थिति आती है, तो आपके मुहूर्त की पवित्रता बनाए रखने हेतु हमारे वरिष्ठ आचार्य समय पर योग्य वैदिक विकल्प की व्यवस्था सुनिश्चित करते हैं।',
          mr: 'एखाद्या अपवादात्मक प्रसंगी नियुक्त पुरोहितांना वैद्यकीय अडचण उद्भवल्यास, आपल्या मुहूर्ताचे पावित्र्य व वेळ राखण्यासाठी आमचे वरिष्ठ आचार्य वेळेत योग्य व अनुभवी वैदिक पुरोहितांची पर्यायी व्यवस्था करतात.'
        }
      }
    ]
  },
  privacy: {
    title: {
      en: 'Privacy & Data Security Policy',
      hi: 'गोपनीयता एवं डेटा सुरक्षा नीति',
      mr: 'गोपनीयता आणि डेटा सुरक्षा धोरण'
    },
    intro: {
      en: 'VedicPanditji respects the spiritual sanctity and confidentiality of our devotee families. We never sell, rent, or disclose your personal contact information, horoscope details, Gotra, or address to any third-party marketing networks.',
      hi: 'वैदिकपंडितजी यजमान परिवारों की आध्यात्मिक शुचिता और गोपनीयता का पूर्ण सम्मान करता है। हम आपकी व्यक्तिगत संपर्क जानकारी, जन्म कुंडली विवरण, गोत्र या पता किसी भी तृतीय-पक्ष मार्केटिंग नेटवर्क को कभी बेचते, साझा या प्रकट नहीं करते हैं।',
      mr: 'वैदिकपंडितजी यजमान कुटुंबांच्या आध्यात्मिक पावित्र्याचा आणि गोपनीयतेचा पूर्ण आदर करते. आम्ही आपली वैयक्तिक संपर्क माहिती, जन्मकुंडली, गोत्र किंवा पत्ता कोणत्याही त्रयस्थ विपणन (marketing) जाळ्यांना कधीही विकत नाही, भाड्याने देत नाही किंवा उघड करत नाही.'
    },
    sections: [
      {
        heading: {
          en: 'Information We Collect',
          hi: 'एकत्र की जाने वाली जानकारी',
          mr: 'आम्ही गोळा करत असलेली माहिती'
        },
        body: {
          en: `We collect your name, phone number, address in Pune/PCMC, and astrological details (such as Janma Nakshatra and Gotra) solely to coordinate priests, compute accurate Muhurats, and perform the sacred Sankalpam.`,
          hi: 'हम केवल पुरोहित समन्वय, सटीक मुहूर्त निर्धारण और पवित्र संकल्प संपन्न कराने हेतु आपका नाम, फोन नंबर, पता एवं ज्योतिषीय विवरण (जैसे जन्म नक्षत्र और गोत्र) प्राप्त करते हैं।',
          mr: 'आम्ही केवळ पुरोहित समन्वय, अचूक मुहूर्त गणना आणि पवित्र संकल्प विधी संपन्न करण्यासाठी आपले नाव, दूरध्वनी क्रमांक, पत्ता आणि ज्योतिषीय माहिती (जसे की जन्म नक्षत्र आणि गोत्र) विचारतो.'
        }
      },
      {
        heading: {
          en: 'Direct Communication',
          hi: 'सीधा संवाद',
          mr: 'थेट संवाद'
        },
        body: {
          en: `All communications occur directly between the devotee and VedicPanditji's team via official helpline (${BRAND_INFO.phone}) and verified WhatsApp.`,
          hi: `समस्त संवाद यजमान और वैदिकपंडितजी के मध्य आधिकारिक हेल्पलाइन (${BRAND_INFO.phone}) और सत्यापित व्हाट्सएप (WhatsApp) के माध्यम से सीधे होते हैं।`,
          mr: `सर्व संवाद यजमान आणि वैदिकपंडितजी यांच्यात अधिकृत हेल्पलाइन (${BRAND_INFO.phone}) आणि पडताळणी केलेल्या व्हॉट्सॲप (WhatsApp) द्वारे थेट होतात।`
        }
      }
    ]
  },
  terms: {
    title: {
      en: 'Terms of Service',
      hi: 'सेवा के नियम एवं शर्तें',
      mr: 'सेवा अटी व नियम'
    },
    intro: {
      en: 'By inquiring or scheduling a ceremony through VedicPanditji.com, you agree to these service principles.',
      hi: 'VedicPanditji.com के माध्यम से पूछताछ या अनुष्ठान निर्धारित करके, आप इन सेवा सिद्धांतों से सहमति व्यक्त करते हैं।',
      mr: 'VedicPanditji.com द्वारे चौकशी करून किंवा पूजा अनुष्ठान ठरवून, आपण खालील सेवा तत्त्वांना संमती देता.'
    },
    sections: [
      {
        heading: {
          en: 'Vedic Services & Priests',
          hi: 'वैदिक सेवाएँ एवं पुरोहित',
          mr: 'वैदिक सेवा आणि पुरोहित'
        },
        body: {
          en: 'All our priests are experienced Vedic scholars vetted under our senior Acharyas. Rites are conducted strictly according to North Indian, Bihari, or requested regional Shastra Vidhis.',
          hi: 'हमारे समस्त पुरोहित अनुभवी वैदिक विद्वान हैं और हमारे वरिष्ठ आचार्यों द्वारा परीक्षित हैं। अनुष्ठान पूर्णतः उत्तर भारतीय, बिहारी या यजमान के इच्छित क्षेत्रीय शास्त्रसम्मत विधान अनुसार संपन्न कराए जाते हैं।',
          mr: 'आमचे सर्व पुरोहित अनुभवी वैदिक विद्वान असून आमच्या वरिष्ठ आचार्यांच्या मार्गदर्शनाखाली पडताळलेले आहेत. विधी काटेकोरपणे उत्तर भारतीय, बिहारी किंवा यजमानांच्या इच्छेनुसार प्रादेशिक शास्त्रोक्त पद्धतीनुसार संपन्न केले जातात.'
        }
      },
      {
        heading: {
          en: 'Dakshina & Samagri Arrangement',
          hi: 'दक्षिणा एवं पूजा सामग्री व्यवस्था',
          mr: 'दक्षिणा आणि पूजा साहित्य व्यवस्था'
        },
        body: {
          en: 'Dakshina and samagri charges are mutually agreed upon during the pre-puja consultation. Devotees may choose complete samagri inclusion or provide their own items using our Shuddha Samagri checklist.',
          hi: 'पूजा पूर्व परामर्श के दौरान दक्षिणा और सामग्री शुल्क परस्पर सहमति से तय किए जाते हैं। यजमान संपूर्ण सामग्री सहित पैकेज चुन सकते हैं अथवा हमारी शुद्ध सामग्री सूची अनुसार स्वयं सामग्री की व्यवस्था कर सकते हैं।',
          mr: 'पूजेपूर्वीच्या सल्लामसलतीदरम्यान दक्षिणा आणि साहित्याचे शुल्क परस्पर संमतीने निश्चित केले जाते. यजमान संपूर्ण साहित्यासह पॅकेज निवडू शकतात किंवा आमच्या शुद्ध सामग्री यादीनुसार स्वतः साहित्य आणू शकतात.'
        }
      }
    ]
  }
};

export default function LegalPage() {
  const { navigateTo } = useApp();
  const { lang, t } = useI18n();
  const [activeTab, setActiveTab] = useState('cancellation'); // 'cancellation', 'privacy', 'terms'

  const currentTabContent = LEGAL_CONTENT[activeTab];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }} className="hover:text-amber-800">
              {lang === 'mr' ? 'मुख्यपृष्ठ' : lang === 'hi' ? 'होम' : 'Home'}
            </span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>
              {lang === 'mr' ? 'नियम व अटी' : lang === 'hi' ? 'नीतियाँ एवं सेवा शर्तें' : 'Policies & Legal'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 800 }}>
            {lang === 'mr' ? 'वैदिकपंडितजी ग्राहक धोरणे आणि सेवा अटी' : lang === 'hi' ? 'वैदिकपंडितजी ग्राहक नीतियाँ एवं सेवा शर्तें' : 'VedicPanditji Customer Policies & Service Terms'}
          </h1>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('cancellation')}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'cancellation' ? 'var(--accent-saffron)' : '#FFFFFF',
              color: activeTab === 'cancellation' ? '#FFFFFF' : 'var(--text-main)',
              border: '1px solid #EAE5D9',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} />
            <span>{lang === 'mr' ? 'रद्द करणे आणि वेळ बदलणे' : lang === 'hi' ? 'रद्दीकरण एवं पुनर्निर्धारण' : 'Cancellation & Rescheduling'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'privacy' ? 'var(--accent-saffron)' : '#FFFFFF',
              color: activeTab === 'privacy' ? '#FFFFFF' : 'var(--text-main)',
              border: '1px solid #EAE5D9',
              cursor: 'pointer'
            }}
          >
            <Lock size={14} />
            <span>{lang === 'mr' ? 'गोपनीयता धोरण' : lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy & Data Confidentiality'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'terms' ? 'var(--accent-saffron)' : '#FFFFFF',
              color: activeTab === 'terms' ? '#FFFFFF' : 'var(--text-main)',
              border: '1px solid #EAE5D9',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} />
            <span>{lang === 'mr' ? 'सेवा अटी' : lang === 'hi' ? 'सेवा नियम' : 'Terms of Service'}</span>
          </button>
        </div>

        {/* Content Container */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #EAE5D9',
            boxShadow: 'var(--shadow-sm)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7
          }}
        >
          {currentTabContent && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--text-main)', marginBottom: '16px' }}>
                {currentTabContent.title[lang] || currentTabContent.title.en}
              </h2>
              <p style={{ marginBottom: '16px' }}>
                {currentTabContent.intro[lang] || currentTabContent.intro.en}
              </p>
              {currentTabContent.sections.map((sec, idx) => (
                <div key={idx}>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 700, margin: '18px 0 8px' }}>
                    {sec.heading[lang] || sec.heading.en}
                  </h4>
                  <p style={{ marginBottom: '14px' }}>
                    {sec.body[lang] || sec.body.en}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
