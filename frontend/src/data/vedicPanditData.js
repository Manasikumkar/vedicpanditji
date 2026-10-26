// Comprehensive Canonical Data Source for VedicPanditji Platform
// Verified against live vedicpanditji.com service categories, product listings, and customer reviews
import { MULTI_CITY_SEO_PAGES } from './multiCitySeoData.js';
import { ALL_POOJA_SERVICES } from './allPoojaServices.js';

export const BRAND_INFO = {
  name: 'VedicPanditji',
  legalName: 'Vedic Pandit Services',
  domain: 'vedicpanditji.com',
  tagline: 'North Indian Pandit ji for Pooja & Ceremonies Across India',
  phone: '+91 97668 80979',
  phoneClean: '919766880979',
  phoneRaw: '9766880979',
  email: 'info@vedicpanditji.com',
  address: 'Headquarters: Pune, Maharashtra (Serving All-India)',
  whatsappUrl: 'https://wa.me/919766880979?text=Namaste%20Panditji%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20puja.',
  headPriest: 'Senior Vedic Acharya & Purohit Team',
  rating: 4.9,
  reviewsCount: 262,
  poojasPerformed: '10,000+',
  priestsCount: '75+',
  pujaTypes: '200+',
  supportedLanguages: ['Hindi', 'Sanskrit'],
  serviceCoverage: 'All over India'
};

// Verified Service Localities across Pune & Metro Hubs
export const PUNE_LOCALITIES = [
  'All Pune Areas',
  'Kothrud',
  'Wakad',
  'Baner',
  'Hinjewadi',
  'Hadapsar',
  'Viman Nagar',
  'Kharadi',
  'Pimpri-Chinchwad',
  'Aundh',
  'Bavdhan',
  'Magarpatta City',
  'Kalyani Nagar',
  'Kondhwa',
  'Shivajinagar'
];

export const CITIES = [
  {
    id: 'Pune',
    name: 'Pune',
    state: 'Maharashtra',
    popular: true,
    verificationStatus: 'in-person-confirmed',
    verificationLabel: 'Verified Doorstep In-Person Priests',
    tagline: 'Primary Headquarters & Resident North Indian & Bihari Pandits',
    localities: ['Kothrud', 'Wakad', 'Baner', 'Hinjewadi', 'Hadapsar', 'Viman Nagar', 'Kharadi', 'Pimpri-Chinchwad', 'Aundh', 'Bavdhan', 'Magarpatta City', 'Kalyani Nagar', 'Pimple Saudagar', 'Ravet']
  },
  {
    id: 'Mumbai',
    name: 'Mumbai & MMR',
    state: 'Maharashtra',
    popular: true,
    verificationStatus: 'in-person-confirmed',
    verificationLabel: 'Verified Direct Pandit Service & Express Travel',
    tagline: 'North Indian & Bihari Pujas across Mumbai, Navi Mumbai & Thane',
    localities: ['Andheri', 'Powai', 'Bandra', 'Goregaon', 'Borivali', 'Thane West', 'Vashi', 'Nerul', 'Kharghar', 'Mulund', 'Malad', 'Kandivali']
  },
  {
    id: 'Bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    popular: true,
    verificationStatus: 'hybrid-online-travelling',
    verificationLabel: 'Verified Live E-Puja & Visiting Acharyas',
    tagline: 'Live Interactive Zoom E-Pujas & Travelling Acharyas for North Indian Diaspora',
    localities: ['Whitefield', 'Bellandur', 'HSR Layout', 'Electronic City', 'Sarjapur Road', 'Marathahalli', 'Indiranagar', 'Koramangala', 'Hebbal', 'Yelahanka']
  },
  {
    id: 'Hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    popular: true,
    verificationStatus: 'hybrid-online-travelling',
    verificationLabel: 'Verified Live E-Puja & Visiting Acharyas',
    tagline: 'Vedic Ceremonies for Cyberabad & North Indian Devotees',
    localities: ['Hitec City', 'Gachibowli', 'Kondapur', 'Madhapur', 'Kukatpally', 'Manikonda', 'Banjara Hills', 'Jubilee Hills']
  },
  {
    id: 'Delhi',
    name: 'Delhi & NCR',
    state: 'Delhi NCR',
    popular: true,
    verificationStatus: 'hybrid-online-travelling',
    verificationLabel: 'Verified Live E-Puja & Visiting Acharyas',
    tagline: 'Authentic Hindi & Sanskrit Vedic Ceremonies for Delhi-NCR Families',
    localities: ['South Delhi', 'Dwarka', 'Noida', 'Gurugram', 'Rohini', 'Ghaziabad', 'Janakpuri', 'Greater Noida']
  },
  {
    id: 'Chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    popular: true,
    verificationStatus: 'hybrid-online-travelling',
    verificationLabel: 'Verified Live E-Puja & Visiting Acharyas',
    tagline: 'Authentic Hindi & Sanskrit Vedic Pujas for North Indian Families in Chennai',
    localities: ['OMR', 'Velachery', 'Anna Nagar', 'T Nagar', 'Adyar', 'Sholinganallur', 'Porur', 'Thiruvanmiyur']
  },
  {
    id: 'Nashik',
    name: 'Nashik / Trimbakeshwar',
    state: 'Maharashtra',
    popular: true,
    verificationStatus: 'pilgrimage-confirmed',
    verificationLabel: 'Verified Tirtha Purohits',
    tagline: 'Trimbakeshwar Kalsarp Shanti, Narayan Nagbali & Pitru Tarpan',
    localities: ['Trimbakeshwar Temple Kshetra', 'Kushavarta Kund', 'Panchavati', 'Ramkund Nashik', 'Godavari Ghat']
  },
  {
    id: 'Online',
    name: 'Online E-Puja (Pan-India & Global)',
    state: 'Global / Zoom Live',
    popular: true,
    verificationStatus: 'online-confirmed',
    verificationLabel: '100% Verified Live Interactive E-Puja',
    tagline: 'Personalized Sankalp, Real-Time Video Chanting & Consecrated Prasad Courier',
    localities: ['Pan-India', 'USA & Canada', 'UK & Europe', 'UAE & Gulf', 'Australia & Singapore']
  }
];

export const TRADITIONS = [
  { id: 'north-indian', name: 'North Indian Pandit (Hindi)', description: 'Hindi, UP, MP, Rajasthan & Delhi Vedic traditions' },
  { id: 'bihari', name: 'Bihari Pandit (Hindi / Sanskrit)', description: 'Authentic Maithil, Bhojpuri, Magahi & Chhath Puja rituals in Hindi' },
  { id: 'vedic-hindi', name: 'Vedic Hindi Purohit', description: 'Shukla Yajurveda & Rigveda sampradaya in Hindi & Sanskrit' },
  { id: 'universal', name: 'Vedic Sanskrit Priest', description: 'Classical Sanskrit Vedic chanting, Stotras & Havan rituals' }
];

export const VEDIC_PILLARS = [
  {
    title: 'Certified Gurukul Pandits',
    desc: 'Led by Senior Gurukul-trained Acharyas with 75+ verified scholars possessing deep mastery in Sanskrit shlokas, karmakanda, and Vedic rituals.',
    icon: 'GraduationCap'
  },
  {
    title: '100% Pure Vedic Samagri',
    desc: 'Unadulterated pure cow ghee, authentic herbs, havan wood, and sacred gangajal delivered directly to your doorstep.',
    icon: 'Sparkles'
  },
  {
    title: 'Hindi & Sanskrit Shastra Vidhi',
    desc: 'Rituals performed strictly in authentic Vedic Sanskrit and explained clearly in fluent Hindi for all family members.',
    icon: 'Languages'
  },
  {
    title: 'Punctuality & Shubh Muhurtham',
    desc: 'Strict adherence to auspicious planetary timings verified from Hindu Panchang and family Janma Kundali.',
    icon: 'ClockCheck'
  }
];

export const FAQS_LIST = [
  {
    category: 'Booking & Payment',
    q: 'How does the VedicPanditji booking and confirmation process work?',
    a: 'Submit your puja request with preferred date and city. Our senior Vedic Acharyas review your Shubh Muhurat and confirm priest availability. Transparent dakshina is agreed beforehand with zero hidden charges.'
  },
  {
    category: 'Priests & Qualifications',
    q: 'What languages do your Pandits speak?',
    a: 'VedicPanditji officially supports Hindi and Sanskrit. All Vedic mantras are recited in authentic Sanskrit with flawless phonetics, and the Katha, Vidhi significance, and Sankalpam are explained clearly in fluent Hindi.'
  },
  {
    category: 'Locations & Coverage',
    q: 'Do you provide pandit services all over India?',
    a: 'Yes, VedicPanditji provides service all over India. We maintain full resident doorstep priest networks in Pune and Mumbai, and provide verified visiting Acharyas for major family ceremonies and interactive live HD E-Pujas for devotees across Bangalore, Hyderabad, Delhi-NCR, Chennai, and other cities.'
  },
  {
    category: 'Samagri & Preparations',
    q: 'Does Panditji bring the puja samagri?',
    a: 'Yes, Panditji can provide complete, pure unadulterated samagri including pure cow ghee, mango havan wood, navadhanya, roli, moli, gangajal, and dhoop. Devotees only need to keep basic fresh fruits, flowers, and household utensils ready.'
  },
  {
    category: 'Booking & Payment',
    q: 'How is Shubh Muhurat calculated for our family?',
    a: 'Our senior Acharyas calculate the Muhurat considering your family Gotra, Janma Nakshatra, and Panchang Tithi to identify the most auspicious Lagna for maximum spiritual benefit.'
  },
  {
    category: 'Temple Services',
    q: 'Do you arrange pilgrimage pujas at Trimbakeshwar or Kashi?',
    a: 'Yes, we arrange verified Tirtha Purohits for Kalsarp Shanti, Narayan Nagbali, Pitru Tarpan, and Rudrabhishek at sacred Kshetras including Trimbakeshwar (Nashik) and Kashi with complete scriptural fidelity.'
  }
];

// Verified Service Categories from vedicpanditji.com
export const SERVICE_CATEGORIES = [
  {
    id: 'pujas',
    name: 'Pujas',
    tagline: 'Auspicious home ceremonies, Griha Pravesh & Satyanarayan Katha',
    icon: 'Flame',
    count: '35+ Pujas',
    image: '/images/hero-puja.jpg'
  },
  {
    id: 'havans',
    name: 'Havans & Homams',
    tagline: 'Sacred fire Agnihotra rituals with pure samagri and cow ghee',
    icon: 'Sparkles',
    count: '25+ Havans',
    image: '/images/category-havan.jpg'
  },
  {
    id: 'jaaps',
    name: 'Jaaps & Mantras',
    tagline: 'Maha Mrityunjaya, Gayatri and Navagraha dosha mantra chanting',
    icon: 'BookOpen',
    count: '18+ Jaaps',
    image: '/images/category-jaap.jpg'
  },
  {
    id: 'paths',
    name: 'Paths & Kathas',
    tagline: 'Sundarkand Path, Ramcharitmanas, Durga Saptashati & Bhagwat Katha',
    icon: 'Scroll',
    count: '12+ Paths',
    image: '/images/category-path.jpg'
  },
  {
    id: 'shanti-pujas',
    name: 'Shanti Pujas',
    tagline: 'Vastu Shanti, Gand Mool Nakshatra, Kalsarp and Graha Shanti',
    icon: 'Shield',
    count: '15+ Shanti Vidhis',
    image: '/images/category-shanti.jpg'
  },
  {
    id: 'festival-pujas',
    name: 'Festival Pujas',
    tagline: 'Ganesh Chaturthi, Diwali Lakshmi Puja, Navratri & Chhath Puja',
    icon: 'Calendar',
    count: '20+ Festivals',
    image: '/images/category-festival.jpg'
  },
  {
    id: 'wedding-services',
    name: 'Hindu Wedding Planners',
    tagline: 'Complete Vivah Sanskar, Sagai, Haldi & Saptapadi Vedic Vidhi',
    icon: 'Heart',
    count: 'Complete Sanskars',
    image: '/images/category-wedding.jpg'
  },
  {
    id: 'bhajans-chowki',
    name: 'Bhajans & Chowki',
    tagline: 'Devotional Mata Ki Chowki, Jagran and Bhajan Sandhya setups',
    icon: 'Music',
    count: 'Live Chowki',
    image: '/images/category-bhajan.jpg'
  },
  {
    id: 'pitru-pujas',
    name: 'Pitru Pujas',
    tagline: 'Shradh Karma, Tarpan, Pitru Paksha & Narayan Bali rituals',
    icon: 'Sun',
    count: 'Pitru Karya',
    image: '/images/category-pitru.jpg'
  }
];

// Verified Pujas & Services from vedicpanditji.com
export const SERVICES = ALL_POOJA_SERVICES;

export const getServiceImage = (service) => {
  if (service && service.image) return service.image;
  const cat = service ? service.category : '';
  switch (cat) {
    case 'pujas':
      return service && service.id === 'griha-pravesh' ? '/images/bangalore-puja.jpg' : '/images/hero-puja.jpg';
    case 'havans':
      return '/images/category-havan.jpg';
    case 'jaaps':
      return '/images/category-jaap.jpg';
    case 'paths':
      return '/images/category-path.jpg';
    case 'shanti-pujas':
      return '/images/category-shanti.jpg';
    case 'festival-pujas':
      return '/images/category-festival.jpg';
    case 'wedding-services':
      return '/images/category-wedding.jpg';
    case 'bhajans-chowki':
      return '/images/category-bhajan.jpg';
    case 'pitru-pujas':
      return '/images/category-pitru.jpg';
    default:
      return '/images/hero-puja.jpg';
  }
};

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Jay Tomar',
    rating: 5,
    date: '28 Aug 2026',
    time: 'Pune, Maharashtra',
    service: 'Hindu Wedding Ceremony & Vivah Vidhi',
    comment: 'Extreme happy after completion of all rituals in worship and the way it was done superb really feel good after Pooja.... The way mantra was chanted and the high tempo of the same was awesome..... Thanks pandit ji'
  },
  {
    id: 'rev-2',
    author: 'Gaurav Mathur',
    rating: 5,
    date: '10 Jul 2026',
    time: 'Wakad, Pune',
    service: 'Griha Pravesh Puja',
    comment: 'Excellent grah pravesh puja done by panditji. Explained all the rituals very well. Highly recommended.'
  },
  {
    id: 'rev-3',
    author: 'Shubha Kajle',
    rating: 5,
    date: '07 Jul 2026',
    time: 'Baner, Pune',
    service: 'Vastu Shanti & Navagraha Havan',
    comment: 'We recently performed our Vastu Shanti Pooja, and the experience was truly peaceful and divine.'
  },
  {
    id: 'rev-4',
    author: 'Anil Mohite',
    rating: 5,
    date: '19 Jun 2026',
    time: 'Kothrud, Pune',
    service: 'Satyanarayan Puja & Katha',
    comment: 'It was a wonderful experience. Panditji performed the puja with complete devotion and proper rituals. He arrived on time and completed everything very well. Highly recommended.'
  },
  {
    id: 'rev-5',
    author: 'Satyam S.',
    rating: 5,
    date: '18 Jun 2026',
    time: 'Hinjewadi, Pune',
    service: 'Wedding & Lagna Muhurat Ceremony',
    comment: 'We are very grateful to Pandit Ji. Our wedding ceremony started late, but he patiently stayed with us for a long time and completed all the rituals without any complaints or irritation. He remained calm, supportive, and professional throughout the ceremony. We sincerely appreciate his patience, dedication, and kind nature.'
  },
  {
    id: 'rev-6',
    author: 'Smita Gupta',
    rating: 5,
    date: '30 Aug 2026',
    time: 'Viman Nagar, Pune',
    service: 'Bhoomi Puja & Foundation Havan',
    comment: 'Very detailed puja done. The pandit ji explained the significance of every mantra and made all family members feel blessed and involved.'
  }
];

export const REVIEWS = CUSTOMER_REVIEWS;

// Target SEO Landing Pages Specifications (Multi-City SEO Strategy)
export const SEO_LANDING_PAGES = MULTI_CITY_SEO_PAGES;
export { MULTI_CITY_SEO_PAGES };

export const TEMPLE_SERVICES_DATA = [
  {
    id: 'kashi',
    name: 'Kashi / Varanasi Kshetra',
    state: 'Uttar Pradesh',
    image: '/images/temple-service.jpg',
    rituals: [
      { name: 'Asthi Visarjan at Manikarnika Ghat', price: 6200, advance: 1500 },
      { name: 'Kashi Rudrabhishek at Ganga Ghat', price: 7500, advance: 1800 },
      { name: 'Pinda Daan at Harishchandra Ghat', price: 5500, advance: 1200 }
    ],
    description: 'The eternal City of Light ruled by Lord Vishwanath on the holy Ganga.'
  },
  {
    id: 'gaya',
    name: 'Gaya Vishnupad Kshetra',
    state: 'Bihar',
    image: '/images/temple-service.jpg',
    rituals: [
      { name: 'Gaya Pinda Daan (Vishnupada, Falgu, Akshaya Vata)', price: 8500, advance: 2000 },
      { name: 'Tripindi Shradh at Gaya', price: 11500, advance: 2500 }
    ],
    description: 'The supreme place on earth for ancestral redemption where Lord Vishnu personally left his divine footprints.'
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar Jyotirlinga',
    state: 'Maharashtra',
    image: '/images/temple-service.jpg',
    rituals: [
      { name: 'Kaal Sarp Dosh Nivarana Pooja', price: 8500, advance: 2000 },
      { name: 'Narayan Nagbali Puja', price: 18500, advance: 4000 },
      { name: 'Tripindi Shradh at Kushavarta Kund', price: 7500, advance: 1500 }
    ],
    description: 'Revered source of river Godavari and three-faced Jyotirlinga representing Brahma, Vishnu, and Mahesh.'
  },
  {
    id: 'rameshwaram',
    name: 'Rameswaram Jyotirlinga Kshetra',
    state: 'Tamil Nadu',
    image: '/images/temple-service.jpg',
    rituals: [
      { name: 'Asthi Visarjan at Agni Theertham', price: 6500, advance: 1500 },
      { name: 'Thila Homam at Sethu Karai', price: 9500, advance: 2000 },
      { name: 'Pinda Daan & Hiranya Shradham', price: 5800, advance: 1200 },
      { name: '22 Theertha Snana Sankalpam', price: 4200, advance: 1000 }
    ],
    description: 'One of the sacred Char Dhams and 12 Jyotirlingas, revered for ancestral rites.'
  }
];

export const TEMPLE_SERVICES = TEMPLE_SERVICES_DATA.map(t => {
  const minPrice = t.rituals && t.rituals.length > 0
    ? Math.min(...t.rituals.map(r => r.price))
    : 4200;
  return {
    ...t,
    title: t.title || t.name,
    location: t.location || t.state,
    startingPrice: t.startingPrice || minPrice
  };
});

export const PUJA_SAMAGRI_PRODUCTS = [
  {
    id: 'sam-1',
    name: 'Vedic Havan Samagri Pack (100% Pure Herbs)',
    category: 'havan-samagri',
    price: 950,
    originalPrice: 1250,
    rating: 4.9,
    weight: '1.5 kg',
    inStock: true,
    image: '/images/samagri-thali.jpg',
    description: 'Contains 54 rare Ayurvedic herbs, guggul, loban, dry jatamansi, nagarmotha, kapoor kachri, and black sesame.'
  },
  {
    id: 'sam-2',
    name: 'Desi Gir Cow A2 Ghee for Yajna',
    category: 'pure-ghee',
    price: 1450,
    originalPrice: 1800,
    rating: 5.0,
    weight: '1 Litre',
    inStock: true,
    image: '/images/samagri-thali.jpg',
    description: 'Bilona method prepared pure A2 cow ghee without any artificial preservatives, perfect for sacred havan fires.'
  },
  {
    id: 'sam-3',
    name: 'Handcrafted Brass Puja Deepam Set (Kamakshi / Diya)',
    category: 'brass-items',
    price: 1850,
    originalPrice: 2400,
    rating: 4.95,
    weight: '850 grams',
    inStock: true,
    image: '/images/samagri-thali.jpg',
    description: 'Pure heavy solid brass Kamakshi lamp crafted by hereditary artisans with intricate Gajalakshmi embossing.'
  },
  {
    id: 'sam-4',
    name: 'Sacred Griha Pravesh Samagri Box (Complete Kit)',
    category: 'kits',
    price: 3200,
    originalPrice: 4100,
    rating: 4.98,
    weight: 'Complete Box (35 Items)',
    inStock: true,
    image: '/images/samagri-thali.jpg',
    description: 'All-in-one box: Navadhanya, copper kalash, mango leaves, purna kumbha vastram, Ganga jal, Gomutra, and havan kunda.'
  },
  {
    id: 'sam-5',
    name: 'Satyanarayan Pooja Samagri Kit',
    category: 'kits',
    price: 1650,
    originalPrice: 2100,
    rating: 4.88,
    weight: '24 Essential Items',
    inStock: true,
    image: '/images/samagri-thali.jpg',
    description: 'Haldi, Kumkum, Chandan, Yagnopaveetam, Kalash vastram, Gangajal, Supari, and Rangoli colors.'
  }
];

export const PUJA_MATERIALS = PUJA_SAMAGRI_PRODUCTS;


