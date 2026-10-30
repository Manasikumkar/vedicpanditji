// Clearly labeled development fixtures for testing the admin dashboard UI.
// Notice: These records are purely for UI development and layout validation.

export const SAMPLE_SERVICES = [
  {
    id: 'griha-pravesh',
    name: 'Griha Pravesh Puja',
    category: 'pujas',
    tradition: 'North Indian / Bihari / Vedic',
    duration: '2.5 to 3.5 Hours',
    shortDescription: 'Series of Vedic rituals before moving into a new home. Cleanses negative energies and invokes divine blessings.',
    longDescription: 'Comprehensive North Indian Vedic Griha Pravesh ceremony including Dwar Puja, Gauri Ganesh Puja, Kalash Sthapana, Navgraha Puja, Vastu Purush Sthapana, and Havan.',
    indicativeStartingPrice: 3500,
    isPriceVerified: true,
    isActive: true,
    availableCities: ['Pune', 'Mumbai', 'Bangalore', 'Delhi-NCR', 'Hyderabad'],
    seoTitle: 'Griha Pravesh Puja by Certified North Indian Vedic Pandits',
    seoMetaDescription: 'Book verified North Indian Pandits for Griha Pravesh Puja. Authentic Shastra Vidhi with complete samagri options.',
    seoSlug: 'griha-pravesh-puja'
  },
  {
    id: 'satyanarayan-puja',
    name: 'Satyanarayan Puja & Katha',
    category: 'pujas',
    tradition: 'North Indian / Hindi / Bihari',
    duration: '2 to 2.5 Hours',
    shortDescription: 'Sacred narrative of Lord Vishnu ensuring happiness, prosperity, and spiritual contentment.',
    longDescription: '5-chapter Shri Satyanarayan Katha with Panchamrit Abhishek, Tulsi Archana, and Vishnu Sahasranama chanting.',
    indicativeStartingPrice: 2500,
    isPriceVerified: true,
    isActive: true,
    availableCities: ['Pune', 'Mumbai', 'Bangalore', 'Delhi-NCR', 'Hyderabad', 'Ahmedabad'],
    seoTitle: 'Satyanarayan Puja & Katha | Vedic Purohits',
    seoMetaDescription: 'Auspicious Shri Satyanarayan Puja and Katha by certified Vedic Purohits with pure Vedic samagri.',
    seoSlug: 'satyanarayan-puja'
  },
  {
    id: 'vastu-shanti-puja',
    name: 'Vastu Shanti Puja & Havan',
    category: 'shanti',
    tradition: 'North Indian / Vedic',
    duration: '3 to 4 Hours',
    shortDescription: 'Pacifies directional disharmonies, neutralizes architectural defects, and protects the household.',
    longDescription: 'Complete Vastu Purush Sthapana, Dikpal Bali, and extensive Agnihotra Havan following authentic Shastras.',
    indicativeStartingPrice: 3500,
    isPriceVerified: true,
    isActive: true,
    availableCities: ['Pune', 'Mumbai', 'Bangalore'],
    seoTitle: 'Vastu Shanti Puja for Home and Commercial Spaces',
    seoMetaDescription: 'Rectify Vastu dosha and invoke positive vibrations with authentic Vastu Shanti Puja.',
    seoSlug: 'vastu-shanti-puja'
  },
  {
    id: 'rudrabhishek-puja',
    name: 'Maha Rudrabhishek Puja',
    category: 'pujas',
    tradition: 'North Indian / Vedic / Sanskrit',
    duration: '2 to 3 Hours',
    shortDescription: 'Sacred consecration of Shiva Lingam with 11 holy substances and Vedic Sri Rudram recitations.',
    longDescription: 'Potent ritual to eliminate health hurdles, ward off negative planetary alignments, and bestow divine tranquility.',
    indicativeStartingPrice: 3500,
    isPriceVerified: true,
    isActive: true,
    availableCities: ['Pune', 'Mumbai', 'Bangalore', 'Delhi-NCR'],
    seoTitle: 'Maha Rudrabhishek Puja by Senior Vedic Purohits',
    seoMetaDescription: 'Experience divine peace and prosperity with sacred Maha Rudrabhishek Puja.',
    seoSlug: 'rudrabhishek-puja'
  }
];

export const SAMPLE_PACKAGES = [
  {
    id: 'gp-dakshina',
    serviceId: 'griha-pravesh',
    name: 'Package A — Ritual Only',
    tier: 'standard',
    badge: 'Devotee Arranges Samagri',
    indicativePrice: 3500,
    priceDisplay: '₹3,500*',
    priceNote: 'Indicative starting dakshina',
    isVerified: true,
    inclusions: [
      'Pandit Dakshina for complete ceremony',
      'Puja performed as per agreed Shastra vidhi',
      'Samagri checklist provided (devotee arranges materials)'
    ],
    includedSamagriIds: [],
    isActive: true
  },
  {
    id: 'gp-samagri',
    serviceId: 'griha-pravesh',
    name: 'Package B — Ritual + Samagri',
    tier: 'popular',
    badge: 'Most Popular',
    indicativePrice: 5500,
    priceDisplay: '₹5,500*',
    priceNote: 'Indicative starting dakshina',
    isVerified: true,
    inclusions: [
      'Pandit Dakshina for complete ceremony',
      'Essential pure Hawan Samagri kit included',
      'Devotee only prepares fresh flowers & fruits'
    ],
    includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'],
    isActive: true
  },
  {
    id: 'sn-dakshina',
    serviceId: 'satyanarayan-puja',
    name: 'Package A — Ritual Only',
    tier: 'standard',
    badge: 'Devotee Arranges Samagri',
    indicativePrice: 2500,
    priceDisplay: '₹2,500*',
    priceNote: 'Indicative starting dakshina',
    isVerified: true,
    inclusions: [
      'Pandit Dakshina for 5-chapter Katha & Havan',
      'Puja performed as per agreed Shastra vidhi',
      'Samagri checklist provided'
    ],
    includedSamagriIds: [],
    isActive: true
  },
  {
    id: 'sn-samagri',
    serviceId: 'satyanarayan-puja',
    name: 'Package B — Ritual + Samagri',
    tier: 'popular',
    badge: 'Most Popular',
    indicativePrice: 3800,
    priceDisplay: '₹3,800*',
    priceNote: 'Indicative starting dakshina',
    isVerified: true,
    inclusions: [
      'Pandit Dakshina for 5-chapter Katha & Havan',
      'Essential pure Hawan Samagri kit included',
      'Devotee only prepares fresh flowers & prasad'
    ],
    includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'],
    isActive: true
  }
];

export const SAMPLE_SAMAGRI = [
  {
    id: 'opt-flowers',
    name: 'Fresh Flowers & Toran Garland',
    description: 'Fresh marigold garlands, loose puja flowers & sacred tulsi',
    category: 'fresh',
    price: null,
    priceDisplay: 'Price to be confirmed',
    isVerified: false,
    isActive: true
  },
  {
    id: 'opt-fruits',
    name: 'Pancha-Phala (5 Fresh Seasonal Fruits)',
    description: '5 varieties of fresh fruits for sacred Naivedya offering',
    category: 'fresh',
    price: null,
    priceDisplay: 'Price to be confirmed',
    isVerified: false,
    isActive: true
  },
  {
    id: 'opt-coconut',
    name: 'Purna Shrifal (Sacred Coconuts with Water)',
    description: '2 auspicious water coconuts for Kalash Sthapana & Balidana',
    category: 'fresh',
    price: null,
    priceDisplay: 'Price to be confirmed',
    isVerified: false,
    isActive: true
  },
  {
    id: 'opt-havan-samagri',
    name: 'Pure Herbal Hawan Samagri Pack (1.5 kg)',
    description: 'Herbal mixture with guggul, loban, black sesame & sacred wood',
    category: 'havan',
    price: 950,
    priceDisplay: '₹950',
    isVerified: true,
    isActive: true
  },
  {
    id: 'opt-cow-ghee',
    name: 'Pure Desi Cow Ghee for Homa (500g)',
    description: 'Consecrated pure cow ghee for sacred Agnihotra offerings',
    category: 'ghee',
    price: null,
    priceDisplay: 'Price to be confirmed',
    isVerified: false,
    isActive: true
  },
  {
    id: 'opt-complete-kit',
    name: 'Complete Puja & Hawan Samagri Kit',
    description: 'Full box: Gangajal, Roli, Akshat, Janeu, Kalash & Dry Fruits',
    category: 'kits',
    price: null,
    priceDisplay: 'Price to be confirmed',
    isVerified: false,
    isActive: true
  }
];

export const DEV_SAMPLE_ENQUIRIES = [
  {
    id: 'VP-DEV-1001',
    isDevelopmentFixture: true,
    customerName: '[DEMO Devotee] Rajesh Sharma',
    customerPhone: '+91 98765 43210',
    serviceId: 'griha-pravesh',
    serviceName: 'Griha Pravesh Puja',
    city: 'Pune',
    locality: 'Wakad',
    packageId: 'gp-samagri',
    packageName: 'Package B — Ritual + Samagri',
    packagePriceDisplay: '₹5,500*',
    selectedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'],
    requestedDate: '2026-11-15',
    timeSlot: 'Morning Shubh Muhurat (07:30 AM - 10:00 AM)',
    needMuhuratConsult: true,
    address: 'Flat 402, Royal Palms, Wakad, Pune',
    preferredLanguage: 'Hindi & Sanskrit',
    gotra: 'Kashyap',
    customerNotes: 'New 3BHK flat possession. Seeking auspicious morning muhurat.',
    adminInternalNotes: 'Devotee requested Hindi-speaking Pandit. Assigned Acharya verification pending.',
    status: 'New',
    assignedPandit: 'Pending Review by Senior Vedic Acharyas',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'VP-DEV-1002',
    isDevelopmentFixture: true,
    customerName: '[DEMO Devotee] Sunita Verma',
    customerPhone: '+91 98220 12345',
    serviceId: 'satyanarayan-puja',
    serviceName: 'Satyanarayan Puja & Katha',
    city: 'Mumbai',
    locality: 'Powai',
    packageId: 'sn-dakshina',
    packageName: 'Package A — Ritual Only',
    packagePriceDisplay: '₹2,500*',
    selectedSamagriIds: [],
    requestedDate: '2026-11-20',
    timeSlot: 'Evening (05:00 PM - 07:30 PM)',
    needMuhuratConsult: false,
    address: 'Hiranandani Gardens, Powai, Mumbai',
    preferredLanguage: 'Hindi & Sanskrit',
    gotra: 'Vashistha',
    customerNotes: 'Monthly Purnima Satyanarayan Katha.',
    adminInternalNotes: 'Spoke with devotee on phone; devotee confirmed she will arrange all fresh fruits and samagri herself.',
    status: 'Under Review',
    assignedPandit: 'Acharya Mishraji (Shortlisted)',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'VP-DEV-1003',
    isDevelopmentFixture: true,
    customerName: '[DEMO Devotee] Amit Joshi',
    customerPhone: '+91 99100 88221',
    serviceId: 'vastu-shanti-puja',
    serviceName: 'Vastu Shanti Puja & Havan',
    city: 'Bangalore',
    locality: 'Whitefield',
    packageId: 'gp-dakshina',
    packageName: 'Package A — Ritual Only',
    packagePriceDisplay: '₹3,500*',
    selectedSamagriIds: ['opt-havan-samagri'],
    requestedDate: '2026-11-28',
    timeSlot: 'Morning (08:00 AM - 11:30 AM)',
    needMuhuratConsult: true,
    address: 'Prestige Boulevard, Whitefield, Bangalore',
    preferredLanguage: 'Hindi & Sanskrit',
    gotra: 'Bharadwaja',
    customerNotes: 'Need consultation regarding Vastu Shanti Vidhi before housewarming.',
    adminInternalNotes: 'Awaiting devotee response on Muhurat slot options sent via SMS.',
    status: 'Awaiting Customer Response',
    assignedPandit: 'Pandit Sharmaji',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString()
  }
];

export const DEV_SAMPLE_BOOKINGS = [
  {
    id: 'BKG-DEV-2001',
    isDevelopmentFixture: true,
    enquiryId: 'VP-DEV-1001',
    customerName: '[DEMO Devotee] Rajesh Sharma',
    customerPhone: '+91 98765 43210',
    serviceName: 'Griha Pravesh Puja',
    packageName: 'Package B — Ritual + Samagri',
    city: 'Pune',
    venueAddress: 'Flat 402, Royal Palms, Wakad, Pune',
    ceremonyDate: '2026-11-15',
    ceremonyTime: '08:00 AM - 11:00 AM',
    gotra: 'Kashyap',
    status: 'Awaiting Panditji Confirmation',
    verifiedDakshina: 3500,
    verifiedSamagriCost: 2000,
    totalQuotedAmount: 5500,
    isPriceVerified: true,
    quotationNotes: 'Inclusive of complete Hawan Samagri kit and pure cow ghee.',
    assignedPanditName: 'Pandit Radheshyam Shastri',
    assignedPanditPhone: '+91 97668 80979',
    confirmationNotes: 'Panditji availability verbally reserved for 15 Nov morning.',
    confirmedAt: null,
    completedAt: null,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'BKG-DEV-2002',
    isDevelopmentFixture: true,
    enquiryId: null,
    customerName: '[DEMO Devotee] Manoj Saxena',
    customerPhone: '+91 98450 67890',
    serviceName: 'Maha Rudrabhishek Puja',
    packageName: 'Package B — Ritual + Samagri',
    city: 'Pune',
    venueAddress: 'Row House 12, Baner, Pune',
    ceremonyDate: '2026-11-08',
    ceremonyTime: '07:00 AM - 09:30 AM',
    gotra: 'Sandilya',
    status: 'Confirmed',
    verifiedDakshina: 3500,
    verifiedSamagriCost: 2000,
    totalQuotedAmount: 5500,
    isPriceVerified: true,
    quotationNotes: 'Special bilva leaves and pure panchamrit samagri included.',
    assignedPanditName: 'Acharya Vidyadhar Shukla',
    assignedPanditPhone: '+91 98223 99881',
    confirmationNotes: 'Explicitly verified and confirmed by Senior Coordinator on phone with Panditji.',
    confirmedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    completedAt: null,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];

