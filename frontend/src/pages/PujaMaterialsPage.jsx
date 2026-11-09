import React from 'react';
import { useApp } from '../context/AppContext';
import { PUJA_MATERIALS } from '../data/vedicPanditData';
import { useI18n } from '../i18n/useI18n';
import {
  Truck,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Home
} from 'lucide-react';

const PRODUCT_TRANSLATIONS = {
  'sam-1': {
    name: {
      en: 'Vedic Havan Samagri Pack (100% Pure Herbs)',
      mr: 'वैदिक हवन साहित्य पॅक (१००% शुद्ध जडीबुटी)',
      hi: 'वैदिक हवन सामग्री पैक (100% शुद्ध जड़ी-बूटियाँ)'
    },
    weight: {
      en: '1.5 kg',
      mr: '१.५ किलो',
      hi: '1.5 किग्रा'
    },
    description: {
      en: 'Contains 54 rare Ayurvedic herbs, guggul, loban, dry jatamansi, nagarmotha, kapoor kachri, and black sesame.',
      mr: '५४ दुर्मिळ आयुर्वेदिक औषधी वनस्पती, गुग्गुळ, लोबान, जटामांसी, नागरमोथा, कापूर कचरी आणि काळे तीळ समाविष्ट.',
      hi: '५४ दुर्लभ आयुर्वेदिक जड़ी-बूटियां, गुग्गुल, लोबान, जटामांसी, नागरमोथा, कपूर कचरी एवं काले तिल सम्मिलित।'
    }
  },
  'sam-2': {
    name: {
      en: 'Desi Gir Cow A2 Ghee for Yajna',
      mr: 'यज्ञासाठी देशी गीर गायीचे शुद्ध A2 तूप',
      hi: 'यज्ञ हेतु देशी गीर गाय का शुद्ध A2 घी'
    },
    weight: {
      en: '1 Litre',
      mr: '१ लिटर',
      hi: '1 लीटर'
    },
    description: {
      en: 'Bilona method prepared pure A2 cow ghee without any artificial preservatives, perfect for sacred havan fires.',
      mr: 'बिलोना पद्धतीने तयार केलेले कोणतेही कृत्रिम संरक्षक नसलेले शुद्ध A2 गाईचे तूप, पवित्र हवन आणि यज्ञासाठी सर्वोत्तम.',
      hi: 'बिलोना विधि से निर्मित शून्य कृत्रिम परिरक्षक युक्त शुद्ध A2 गोघृत, पावन हवन एवं यज्ञ वेदी हेतु सर्वोत्तम।'
    }
  },
  'sam-3': {
    name: {
      en: 'Handcrafted Brass Puja Deepam Set (Kamakshi / Diya)',
      mr: 'हस्तनिर्मित पितळी पूजा दीपम संच (कामाक्षी / दिवा)',
      hi: 'हस्तनिर्मित पीतल पूजा दीपम सेट (कामाक्षी / दीया)'
    },
    weight: {
      en: '850 grams',
      mr: '८५० ग्रॅम',
      hi: '850 ग्राम'
    },
    description: {
      en: 'Pure heavy solid brass Kamakshi lamp crafted by hereditary artisans with intricate Gajalakshmi embossing.',
      mr: 'पारंपरिक कारागिरांनी सुबक गजलक्ष्मी नक्षीकामासह घडवलेला शुद्ध जड पितळी कामाक्षी दीप.',
      hi: 'पारंपरिक कारीगरों द्वारा सूक्ष्म गजलक्ष्मी नक्काशी सहित निर्मित शुद्ध भारी पीतल कामाक्षी दीप।'
    }
  },
  'sam-4': {
    name: {
      en: 'Sacred Griha Pravesh Samagri Box (Complete Kit)',
      mr: 'गृहप्रवेश संपूर्ण पूजा साहित्य पेटी (सर्वसमावेशक किट)',
      hi: 'गृह प्रवेश संपूर्ण पूजन सामग्री बॉक्स (पूर्ण किट)'
    },
    weight: {
      en: 'Complete Box (35 Items)',
      mr: 'संपूर्ण पेटी (३५ आवश्यक वस्तू)',
      hi: 'संपूर्ण बॉक्स (35 आवश्यक वस्तुएँ)'
    },
    description: {
      en: 'All-in-one box: Navadhanya, copper kalash, mango leaves, purna kumbha vastram, Ganga jal, Gomutra, and havan kunda.',
      mr: 'सर्वसमावेशक किट: नवधान्य, तांब्याचा कलश, आंब्याची पाने, पूर्णकुंभ वस्त्र, गंगाजल, गोमूत्र आणि हवन कुंड समाविष्ट.',
      hi: 'ऑल-इन-वन बॉक्स: नवधान्य, तांबे का कलश, आम्र पल्लव, पूर्ण कुंभ वस्त्र, गंगाजल, गोमूत्र एवं हवन कुंड सम्मिलित।'
    }
  },
  'sam-5': {
    name: {
      en: 'Satyanarayan Pooja Samagri Kit',
      mr: 'सत्यनारायण पूजा साहित्य किट',
      hi: 'सत्यनारायण पूजा सामग्री किट'
    },
    weight: {
      en: '24 Essential Items',
      mr: '२४ आवश्यक वस्तू',
      hi: '24 आवश्यक वस्तुएँ'
    },
    description: {
      en: 'Haldi, Kumkum, Chandan, Yagnopaveetam, Kalash vastram, Gangajal, Supari, and Rangoli colors.',
      mr: 'हळद, कुंकू, चंदन, यज्ञोपवीत (जानवे), कलश वस्त्र, गंगाजल, सुपारी आणि रांगोळी रंग समाविष्ट.',
      hi: 'हल्दी, कुमकुम, चंदन, यज्ञोपवीत, कलश वस्त्र, गंगाजल, सुपारी एवं रंगोली रंग सम्मिलित।'
    }
  }
};

export default function PujaMaterialsPage() {
  const { navigateTo, openWhatsAppEnquiry } = useApp();
  const { lang, t } = useI18n();

  const getProductName = (prod) => PRODUCT_TRANSLATIONS[prod.id]?.name[lang] || prod.name;
  const getProductWeight = (prod) => PRODUCT_TRANSLATIONS[prod.id]?.weight[lang] || prod.weight;
  const getProductDesc = (prod) => PRODUCT_TRANSLATIONS[prod.id]?.description[lang] || prod.description;

  const labels = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbMaterials: 'पूजा साहित्य व हवन किट',
      sectionTag: 'पवित्र व शास्त्रशुद्ध',
      h1: 'अस्सल वैदिक पूजा साहित्य आणि हवन किट्स',
      tagline: 'वैदिकपंडितजींच्या साहित्य किटमधील प्रत्येक पवित्र वनस्पती, सुकामेवा, हवन समिधा आणि शुद्ध गाईचे तूप पुणे व देशभरातील सर्व वैदिक विधींमध्ये दैवी सुगंधी शुद्धता राखण्यासाठी काळजीपूर्वक निवडले जाते.',
      feature1Title: 'जलद मेट्रो डिलिव्हरी',
      feature1Desc: 'त्याच दिवशी व २४ तासांत घरपोच पाठवणी',
      feature2Title: '१००% शास्त्रशुद्ध',
      feature2Desc: 'कोणतीही भेसळ नाही, कृत्रिम सुगंध किंवा रसायने विरहित',
      feature3Title: 'आचार्यांद्वारे प्रमाणित साहित्य',
      feature3Desc: 'वैदिक पाठशाळेच्या अधिकृत यादीनुसार पॅक केलेले',
      orderBtn: 'चौकशी व ऑर्डर करा',
      whatsappMsg: (item) => `नमस्ते पंडितजी, मला अस्सल वैदिक पूजा साहित्य किट ऑर्डर करायचे आहे: ${getProductName(item)} (${getProductWeight(item)}), किंमत ₹${item.price.toLocaleString('en-IN')}. कृपया डिलिव्हरी तपशील सांगा.`
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbMaterials: 'पूजा सामग्री एवं हवन किट',
      sectionTag: 'पवित्र एवं शास्त्रसम्मत',
      h1: 'प्रामाणिक वैदिक पूजन सामग्री एवं हवन किट',
      tagline: 'वैदिकपंडitजी की सामग्री किट में सम्मिलित प्रत्येक पावन जड़ी-बूटी, सूखे मेवे, हवन समिधा एवं शुद्ध देशी गाय का घी पुणे व भारत भर के समस्त वैदिक अनुष्ठानों में दिव्य सुगंध व पवित्रता सुनिश्चित करने हेतु विशेष रूप से तैयार किया गया है।',
      feature1Title: 'द्रुत मेट्रो डिलीवरी',
      feature1Desc: 'उसी दिन एवं 24 घंटे में घर पर प्रेषण',
      feature2Title: '100% शास्त्रसम्मत शुद्ध',
      feature2Desc: 'शून्य मिलावट, कृत्रिम सुगंध एवं रसायनों से सर्वथा मुक्त',
      feature3Title: 'आचार्यों द्वारा प्रमाणित सूची',
      feature3Desc: 'वैदिक पाठशाला की प्रामाणिक सूची अनुसार सुसज्जित',
      orderBtn: 'पूछताछ एवं ऑर्डर करें',
      whatsappMsg: (item) => `नमस्ते पंडित जी, मुझे प्रामाणिक वैदिक पूजा सामग्री किट ऑर्डर करनी है: ${getProductName(item)} (${getProductWeight(item)}), मूल्य ₹${item.price.toLocaleString('en-IN')}। कृपया डिलीवरी विवरण की पुष्टि करें।`
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbMaterials: 'Puja Materials & Samagri',
      sectionTag: 'Pure & Consecrated',
      h1: 'Authentic Vedic Puja Materials & Hawan Kits',
      tagline: 'Every sacred herb, dry fruit, hawan kashtha, and pure cow ghee in VedicPanditji’s samagri kits is curated to ensure divine aromatic purity during sacred Vedic offerings across Pune and all major Indian cities.',
      feature1Title: 'Express Metro Delivery',
      feature1Desc: 'Same day & 24h doorstep dispatch',
      feature2Title: '100% Shastra Pure',
      feature2Desc: 'No adulteration, synthetic scents or chemicals',
      feature3Title: 'Priest Approved Inclusions',
      feature3Desc: 'Packed according to Vedic Pathashala lists',
      orderBtn: 'Enquire & Order',
      whatsappMsg: (item) => `Namaste Panditji, I would like to order the authentic Vedic samagri kit: ${getProductName(item)} (${getProductWeight(item)}) priced at ₹${item.price.toLocaleString('en-IN')}. Please confirm delivery and dispatch details.`
    }
  };

  const L = labels[lang] || labels.en;

  const handleOrderProduct = (item) => {
    openWhatsAppEnquiry(L.whatsappMsg(item));
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>{L.breadcrumbHome}</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbMaterials}</span>
          </div>
          <span className="section-tag">{L.sectionTag}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, marginBottom: '14px' }}>
            {L.h1}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            {L.tagline}
          </p>
        </div>

        {/* Delivery Guarantee Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '40px'
          }}
          className="materials-features-grid"
        >
          <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={24} color="var(--accent-saffron)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{L.feature1Title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{L.feature1Desc}</div>
            </div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} color="#22C55E" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{L.feature2Title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{L.feature2Desc}</div>
            </div>
          </div>
          <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #EAE5D9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={24} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{L.feature3Title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{L.feature3Desc}</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid-4" style={{ gap: '24px' }}>
          {PUJA_MATERIALS.map(prod => (
            <div
              key={prod.id}
              className="card-premium"
              style={{
                borderRadius: '16px',
                border: '1px solid #EAE5D9',
                background: '#FFFFFF',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  height: '180px',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#FAF8F5'
                }}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block'
                  }}
                />
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                  {getProductName(prod)}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--accent-saffron)', fontWeight: 600, marginBottom: '10px' }}>
                  {getProductWeight(prod)}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px', flex: 1 }}>
                  {getProductDesc(prod)}
                </p>

                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #EAE5D9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
                    ₹{prod.price.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => handleOrderProduct(prod)}
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
                    }}
                  >
                    <MessageCircle size={14} />
                    <span>{L.orderBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .materials-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
