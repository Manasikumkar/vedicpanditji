import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS_LIST } from '../data/vedicPanditData';
import { useI18n } from '../i18n/useI18n';
import { ChevronDown, ChevronUp, Search, HelpCircle, Home } from 'lucide-react';

export default function FaqsPage() {
  const { navigateTo } = useApp();
  const { lang, t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const localizedFaqsData = {
    mr: {
      breadcrumbHome: 'मुख्यपृष्ठ',
      breadcrumbFaq: 'वारंवार विचारले जाणारे प्रश्न',
      sectionTag: 'मदत व स्पष्टता',
      h1: 'वारंवार विचारले जाणारे प्रश्न',
      intro: 'भारतातील अनुभवी उत्तर भारतीय व बिहारी पंडितांचे बुकिंग, शुभ मुहूर्त गणना, शुद्ध पूजा साहित्य व्यवस्था आणि अस्सल हिंदी व संस्कृत वैदिक विधींविषयी संपूर्ण माहिती.',
      searchPlaceholder: 'वारंवार विचारले जाणारे प्रश्न शोधा (उदा. दक्षिणा, साहित्य, मुहूर्त)...',
      categories: [
        { id: 'All', label: 'सर्व प्रश्न' },
        { id: 'Booking & Payment', label: 'बुकिंग व दक्षिणा' },
        { id: 'Priests & Qualifications', label: 'पुरोहित व भाषा' },
        { id: 'Samagri & Preparations', label: 'साहित्य व तयारी' },
        { id: 'Locations & Coverage', label: 'परिसर व व्याप्ती' },
        { id: 'Temple Services', label: 'तीर्थक्षेत्र पूजा' }
      ],
      faqs: [
        {
          category: 'Booking & Payment',
          q: 'वैदिकपंडितजी बुकिंग आणि पुष्टीकरण प्रक्रिया कशी कार्य करते?',
          a: 'तुमच्या पसंतीच्या तारीख आणि शहरासह तुमची पूजा विनंती पाठवा. आमचे ज्येष्ठ वैदिक आचार्य तुमच्या शुभ मुहूर्ताची पडताळणी करतात आणि पंडितांची उपलब्धता निश्चित करतात. कोणतीही छुपी रक्कम न ठेवता पारदर्शक दक्षिणा आधीच ठरवली जाते.'
        },
        {
          category: 'Priests & Qualifications',
          q: 'तुमचे पंडित कोणत्या भाषांमध्ये पूजा संपन्न करतात?',
          a: 'वैदिकपंडितजी अधिकृतपणे हिंदी आणि संस्कृतचे समर्थन करतात. सर्व वैदिक मंत्रांचे पठण अस्सल संस्कृतमध्ये निर्दोष उच्चारांसह केले जाते आणि कथा, विधीचे महत्त्व आणि संकल्प अस्खलित हिंदीमध्ये स्पष्ट केले जातात.'
        },
        {
          category: 'Locations & Coverage',
          q: 'तुम्ही संपूर्ण भारतात पंडित सेवा पुरवता का?',
          a: 'होय, वैदिकपंडितजी संपूर्ण भारतात सेवा प्रदान करतात. आम्ही पुणे, पिंपरी-चिंचवड आणि मुंबईमध्ये घरपोच पुरोहित सेवा पुरवतो, तसेच महत्त्वाच्या कौटुंबिक विधींसाठी अनुभवी आचार्य आणि बंगळुरू, हैदराबाद, दिल्ली-एनसीआर, चेन्नई व इतर शहरांतील भाविकांसाठी थेट संवाद साधणारी HD ई-पूजा आयोजित करतो.'
        },
        {
          category: 'Samagri & Preparations',
          q: 'पंडितजी पूजा साहित्य सोबत आणतात का?',
          a: 'होय, पंडितजी शुद्ध गाईचे तूप, आंब्याची समिधा, नवधान्य, रोली, मौली, गंगाजल आणि धूप यासह संपूर्ण शुद्ध पूजा साहित्य किट आणू शकतात. यजमानांना फक्त ताजी फळे, फुले आणि घरातील पूजेची भांडी तयार ठेवावी लागतात.'
        },
        {
          category: 'Booking & Payment',
          q: 'आमच्या कुटुंबासाठी शुभ मुहूर्त कसा काढला जातो?',
          a: 'आमचे ज्येष्ठ आचार्य तुमच्या कुटुंबाचे गोत्र, जन्म नक्षत्र आणि पंचांग तिथीचा अभ्यास करून जास्तीत जास्त आध्यात्मिक लाभासाठी सर्वात शुभ लग्न आणि मुहूर्त निश्चित करतात.'
        },
        {
          category: 'Temple Services',
          q: 'तुम्ही त्र्यंबकेश्वर किंवा काशी येथे तीर्थक्षेत्र पूजा आयोजित करता का?',
          a: 'होय, आम्ही त्र्यंबकेश्वर (नाशिक) आणि काशी या पवित्र क्षेत्रांमध्ये कालसर्प शांती, नारायण नागबली, पितृ तर्पण आणि रुद्राभिषेक यांसाठी शास्त्रोक्त विधी संपन्न करणाऱ्या अधिकृत तीर्थ पुरोहितांची व्यवस्था करतो.'
        }
      ],
      emptySearch: 'कोणताही प्रश्न आढळला नाही. कृपया दुसरा शब्द शोधा.',
      stillHaveQuestions: 'अजूनही काही प्रश्न आहेत का? आमच्या आचार्यांशी थेट बोला:',
      callNow: 'थेट संपर्क साधा'
    },
    hi: {
      breadcrumbHome: 'होम',
      breadcrumbFaq: 'अक्सर पूछे जाने वाले प्रश्न',
      sectionTag: 'सहायता एवं स्पष्टता',
      h1: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      intro: 'भारत भर में अनुभवी उत्तर भारतीय एवं बिहारी पंडितों की बुकिंग, शुभ मुहूर्त गणना, शुद्ध पूजा सामग्री व्यवस्था एवं प्रामाणिक हिंदी व संस्कृत वैदिक विधि विधान की संपूर्ण जानकारी।',
      searchPlaceholder: 'अक्सर पूछे जाने वाले प्रश्न खोजें (उदा. दक्षिणा, सामग्री, मुहूर्त)...',
      categories: [
        { id: 'All', label: 'सभी प्रश्न' },
        { id: 'Booking & Payment', label: 'बुकिंग एवं दक्षिणा' },
        { id: 'Priests & Qualifications', label: 'पुरोहित एवं भाषा' },
        { id: 'Samagri & Preparations', label: 'सामग्री एवं तैयारी' },
        { id: 'Locations & Coverage', label: 'स्थान एवं विस्तार' },
        { id: 'Temple Services', label: 'तीर्थ सेवाएँ' }
      ],
      faqs: [
        {
          category: 'Booking & Payment',
          q: 'वैदिकपंडितजी बुकिंग और पुष्टि प्रक्रिया कैसे काम करती है?',
          a: 'अपनी पसंदीदा तिथि और शहर के साथ अपना पूजा अनुरोध सबमिट करें। हमारे वरिष्ठ वैदिक आचार्य आपके शुभ मुहूर्त की समीक्षा करते हैं और पंडित जी की उपलब्धता की पुष्टि करते हैं। बिना किसी छिपे शुल्क के पारदर्शी दक्षिणा पहले से तय की जाती है।'
        },
        {
          category: 'Priests & Qualifications',
          q: 'आपके पंडित किन भाषाओं में पूजा संपन्न कराते हैं?',
          a: 'वैदिकपंडितजी आधिकारिक रूप से हिंदी और संस्कृत का समर्थन करते हैं। सभी वैदिक मंत्रों का सस्वर पाठ शुद्ध संस्कृत में किया जाता है, तथा कथा, विधि का महत्व और संकल्प धाराप्रवाह हिंदी में स्पष्ट रूप से समझाया जाता है।'
        },
        {
          category: 'Locations & Coverage',
          q: 'क्या आप पूरे भारत में पंडित सेवा प्रदान करते हैं?',
          a: 'हाँ, वैदिकपंडितजी संपूर्ण भारत में सेवा प्रदान करते हैं। हम पुणे, पिंपरी-चिंचवड और मुंबई में घर पर पुरोहित सेवा उपलब्ध कराते हैं, और प्रमुख पारिवारिक आयोजनों हेतु यात्रा करने वाले आचार्यों तथा बैंगलोर, हैदराबाद, दिल्ली-एनसीआर, चेन्नई आदि शहरों के भक्तों के लिए लाइव एचडी ई-पूजा की व्यवस्था करते हैं।'
        },
        {
          category: 'Samagri & Preparations',
          q: 'क्या पंडित जी पूजा सामग्री साथ लाते हैं?',
          a: 'हाँ, पंडित जी शुद्ध गाय का घी, आम की समिधा, नवधान्य, रोली, मौली, गंगाजल और धूप सहित संपूर्ण शुद्ध व प्रामाणिक सामग्री किट ला सकते हैं। भक्तों को केवल ताजे फल, फूल और घर के बर्तन तैयार रखने होते हैं।'
        },
        {
          category: 'Booking & Payment',
          q: 'हमारे परिवार के लिए शुभ मुहूर्त की गणना कैसे की जाती है?',
          a: 'हमारे वरिष्ठ आचार्य अधिकतम आध्यात्मिक लाभ हेतु आपके पारिवारिक गोत्र, जन्म नक्षत्र और पंचांग तिथि का सूक्ष्म अध्ययन करके सबसे शुभ लग्न व मुहूर्त का निर्धारण करते हैं।'
        },
        {
          category: 'Temple Services',
          q: 'क्या आप त्र्यंबकेश्वर या काशी में तीर्थ पूजा का प्रबंध करते हैं?',
          a: 'हाँ, हम त्र्यंबकेश्वर (नासिक) और काशी जैसे पवित्र क्षेत्रों में कालसर्प शांति, नारायण नागबली, पितृ तर्पण और रुद्राभिषेक हेतु पूर्ण शास्त्रीय निष्ठा के साथ प्रमाणित तीर्थ पुरोहितों की व्यवस्था करते हैं।'
        }
      ],
      emptySearch: 'कोई प्रश्न नहीं मिला। कृपया भिन्न शब्द खोजें।',
      stillHaveQuestions: 'क्या आपका कोई अन्य प्रश्न है? हमारे आचार्यों से सीधे परामर्श करें:',
      callNow: 'सीधे कॉल करें'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbFaq: 'FAQ',
      sectionTag: 'Help & Clarity',
      h1: 'Frequently Asked Questions',
      intro: 'Everything you need to know about booking experienced North Indian & Bihari Pandits across India, Shubh Muhurat calculations, pure samagri arrangements, and authentic Hindi & Sanskrit Vedic vidhi procedures.',
      searchPlaceholder: 'Search frequently asked questions (e.g. advance, samagri, muhurtham)...',
      categories: [
        { id: 'All', label: 'All' },
        { id: 'Booking & Payment', label: 'Booking & Payment' },
        { id: 'Priests & Qualifications', label: 'Priests & Qualifications' },
        { id: 'Samagri & Preparations', label: 'Samagri & Preparations' },
        { id: 'Locations & Coverage', label: 'Locations & Coverage' },
        { id: 'Temple Services', label: 'Temple Services' }
      ],
      faqs: FAQS_LIST,
      emptySearch: 'No frequently asked questions match your search query.',
      stillHaveQuestions: 'Still have questions? Speak directly with our Acharyas:',
      callNow: 'Call Helpline'
    }
  };

  const L = localizedFaqsData[lang] || localizedFaqsData.en;

  const filteredFaqs = L.faqs.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>{L.breadcrumbHome}</span>
            {' / '}
            <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{L.breadcrumbFaq}</span>
          </div>
          <span className="section-tag">{L.sectionTag}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, marginBottom: '14px' }}>
            {L.h1}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            {L.intro}
          </p>
        </div>

        {/* Search & Category Filter Row */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px solid #EAE5D9',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={L.searchPlaceholder}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: '10px',
                border: '1px solid #DDD7C8',
                background: 'var(--bg-primary)'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {L.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: activeCategory === cat.id ? 'var(--accent-saffron)' : '#FAF8F5',
                  color: activeCategory === cat.id ? '#FFFFFF' : 'var(--text-main)',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--accent-saffron)' : '#EAE5D9',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '850px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAE5D9' }}>
              <HelpCircle size={32} color="var(--accent-saffron)" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                {L.emptySearch}
              </p>
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #EAE5D9',
                    marginBottom: '14px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '16px'
                    }}
                  >
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {item.q}
                    </span>
                    {isOpen ? <ChevronUp size={20} color="var(--accent-saffron)" style={{ flexShrink: 0 }} /> : <ChevronDown size={20} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 22px', borderTop: '1px solid #FAF7F0', paddingTop: '16px' }}>
                      <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
