// Verified Package & Pricing Directory for VedicPanditji
// Strictly adheres to honest two-tier structure:
// Package A: Ritual Only (Dakshina)
// Package B: Ritual + Samagri
// Structured for CMS readiness, transparent optional item add-ons, and no fabricated rates.

export const VERIFIED_PUJA_PACKAGES = {
  'griha-pravesh': [
    {
      id: 'gp-dakshina',
      name: 'Package A — Ritual Only',
      tier: 'standard',
      badge: 'Devotee Arranges Samagri',
      indicativePrice: 3500,
      priceDisplay: '₹3,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for complete ceremony',
        'Puja performed as per agreed Shastra vidhi',
        'Samagri checklist provided (devotee arranges materials)'
      ],
      includedSamagriIds: []
    },
    {
      id: 'gp-samagri',
      name: 'Package B — Ritual + Samagri',
      tier: 'popular',
      badge: 'Most Popular',
      indicativePrice: 5500,
      priceDisplay: '₹5,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for complete ceremony',
        'Essential pure Hawan Samagri kit included',
        'Devotee only prepares fresh flowers & fruits'
      ],
      includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
    }
  ],

  'satyanarayan-puja': [
    {
      id: 'sn-dakshina',
      name: 'Package A — Ritual Only',
      tier: 'standard',
      badge: 'Devotee Arranges Samagri',
      indicativePrice: 2500,
      priceDisplay: '₹2,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for 5-chapter Katha & Havan',
        'Puja performed as per agreed Shastra vidhi',
        'Samagri checklist provided (devotee arranges materials)'
      ],
      includedSamagriIds: []
    },
    {
      id: 'sn-samagri',
      name: 'Package B — Ritual + Samagri',
      tier: 'popular',
      badge: 'Most Popular',
      indicativePrice: 3800,
      priceDisplay: '₹3,800*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for 5-chapter Katha & Havan',
        'Essential pure Hawan Samagri kit included',
        'Devotee only prepares fresh flowers & prasad'
      ],
      includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
    }
  ],

  'vastu-shanti-puja': [
    {
      id: 'vs-dakshina',
      name: 'Package A — Ritual Only',
      tier: 'standard',
      badge: 'Devotee Arranges Samagri',
      indicativePrice: 3500,
      priceDisplay: '₹3,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for Vastu Shanti Vidhi',
        'Puja performed as per agreed Shastra vidhi',
        'Samagri checklist provided (devotee arranges materials)'
      ],
      includedSamagriIds: []
    },
    {
      id: 'vs-samagri',
      name: 'Package B — Ritual + Samagri',
      tier: 'popular',
      badge: 'Most Popular',
      indicativePrice: 5500,
      priceDisplay: '₹5,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for Vastu Shanti Vidhi',
        'Essential pure Hawan Samagri kit included',
        'Devotee only prepares fresh flowers & fruits'
      ],
      includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
    }
  ],

  'rudrabhishek-puja': [
    {
      id: 'rb-dakshina',
      name: 'Package A — Ritual Only',
      tier: 'standard',
      badge: 'Devotee Arranges Samagri',
      indicativePrice: 3500,
      priceDisplay: '₹3,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for Rudri Path & Abhishek',
        'Puja performed as per agreed Shastra vidhi',
        'Samagri checklist provided (devotee arranges materials)'
      ],
      includedSamagriIds: []
    },
    {
      id: 'rb-samagri',
      name: 'Package B — Ritual + Samagri',
      tier: 'popular',
      badge: 'Most Popular',
      indicativePrice: 5500,
      priceDisplay: '₹5,500*',
      priceNote: 'Indicative starting dakshina',
      inclusions: [
        'Pandit Dakshina for Rudri Path & Abhishek',
        'Essential pure Hawan & Abhishek kit included',
        'Devotee arranges fresh milk, flowers & Belpatra'
      ],
      includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
    }
  ]
};

// Structured Optional Samagri Items Catalog (CMS-Ready)
export const OPTIONAL_SAMAGRI_OPTIONS = [
  {
    id: 'opt-flowers',
    name: 'Fresh Flowers & Toran Garland',
    description: 'Fresh marigold garlands, loose puja flowers & sacred tulsi',
    price: null, // Market rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'fresh',
    includedInTiers: []
  },
  {
    id: 'opt-fruits',
    name: 'Pancha-Phala (5 Fresh Seasonal Fruits)',
    description: '5 varieties of fresh fruits for sacred Naivedya offering',
    price: null, // Market rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'fresh',
    includedInTiers: []
  },
  {
    id: 'opt-coconut',
    name: 'Purna Shrifal (Sacred Coconuts with Water)',
    description: '2 auspicious water coconuts for Kalash Sthapana & Balidana',
    price: null, // Market rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'fresh',
    includedInTiers: []
  },
  {
    id: 'opt-havan-samagri',
    name: 'Pure Herbal Hawan Samagri Pack (1.5 kg)',
    description: 'Herbal mixture with guggul, loban, black sesame & sacred wood',
    price: 950, // Verified from PUJA_SAMAGRI_PRODUCTS
    priceDisplay: '₹950',
    category: 'havan',
    includedInTiers: ['popular'] // Included in Package B
  },
  {
    id: 'opt-cow-ghee',
    name: 'Pure Desi Cow Ghee for Homa (500g)',
    description: 'Consecrated pure cow ghee for sacred Agnihotra offerings',
    price: null, // Unverified rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'ghee',
    includedInTiers: ['popular'] // Included in Package B
  },
  {
    id: 'opt-complete-kit',
    name: 'Complete Puja & Hawan Samagri Kit',
    description: 'Full box: Gangajal, Roli, Akshat, Janeu, Kalash & Dry Fruits',
    price: null, // Ceremony-dependent -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'kits',
    includedInTiers: ['popular'] // Included in Package B
  }
];

// Calculate transparent total with protection against duplicate charges and fabricated unverified rates
export function calculateBookingTotal(basePackage, selectedOptionIds = []) {
  if (!basePackage) {
    return {
      basePrice: 0,
      extrasPrice: 0,
      totalPrice: 0,
      hasUnconfirmedPrices: true,
      displayString: 'Custom Quote',
      unconfirmedItemNames: []
    };
  }

  const isBaseVerified = basePackage.indicativePrice !== null && typeof basePackage.indicativePrice === 'number';
  const basePrice = isBaseVerified ? basePackage.indicativePrice : 0;
  
  let extrasPrice = 0;
  let hasUnconfirmedPrices = !isBaseVerified;
  const unconfirmedItemNames = [];

  const alreadyIncludedIds = basePackage.includedSamagriIds || (basePackage.tier === 'popular' ? ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'] : []);

  selectedOptionIds.forEach(id => {
    // Prevent duplicate charge if item is already included in selected package
    if (alreadyIncludedIds.includes(id)) {
      return;
    }

    const item = OPTIONAL_SAMAGRI_OPTIONS.find(opt => opt.id === id);
    if (!item) return;

    if (item.price !== null && typeof item.price === 'number') {
      extrasPrice += item.price;
    } else {
      hasUnconfirmedPrices = true;
      unconfirmedItemNames.push(item.name);
    }
  });

  const totalPrice = basePrice + extrasPrice;

  let displayString = '';
  if (!isBaseVerified) {
    displayString = 'Custom Quote — Based on Vidhi & Location';
  } else if (hasUnconfirmedPrices) {
    if (unconfirmedItemNames.length > 0) {
      displayString = `₹${totalPrice.toLocaleString('en-IN')}* + ${unconfirmedItemNames.length} custom item(s) to be confirmed`;
    } else {
      displayString = `₹${totalPrice.toLocaleString('en-IN')}* (Indicative starting total)`;
    }
  } else {
    displayString = `₹${totalPrice.toLocaleString('en-IN')}* (Estimated Total)`;
  }

  return {
    basePrice,
    extrasPrice,
    totalPrice,
    hasUnconfirmedPrices,
    displayString,
    unconfirmedItemNames
  };
}

// Helper: Retrieve verified packages for any service, with honest custom quote fallback
export function getPackagesForService(service, city = 'Pune') {
  if (!service) return [];
  const serviceId = typeof service === 'string'
    ? service
    : (service.id || (service.name ? service.name.toLowerCase().replace(/\s+/g, '-') : 'custom-puja'));

  // 1. Return bespoke verified packages if defined
  if (serviceId && VERIFIED_PUJA_PACKAGES[serviceId]) {
    return VERIFIED_PUJA_PACKAGES[serviceId].map(pkg => ({
      ...pkg,
      cityNote: getCityNote(city)
    }));
  }

  // 2. Unverified / Custom Services: Clean 2-tier structure without fake multipliers
  const serviceName = service.name || 'Vedic Ceremony';

  const isConsultationOnly = service.category === 'astrology' || 
                            (serviceId && serviceId.includes('kundali')) || 
                            (serviceId && serviceId.includes('consultation')) || 
                            (serviceId && serviceId.includes('horoscope'));

  if (isConsultationOnly) {
    return [
      {
        id: `${serviceId}-vidhi`,
        name: 'Consultation & Guidance Vidhi',
        tier: 'standard',
        badge: 'Custom Quote',
        indicativePrice: null,
        priceDisplay: 'Custom Quote',
        priceNote: 'Based on horoscope analysis & requirements',
        inclusions: [
          'Detailed Janma Kundali examination',
          'Planetary dosha analysis and remedy guidance',
          'Auspicious Muhurat calculation if required'
        ],
        includedSamagriIds: [],
        cityNote: getCityNote(city)
      }
    ];
  }

  return [
    {
      id: `${serviceId}-dakshina`,
      name: 'Package A — Ritual Only',
      tier: 'standard',
      badge: 'Devotee Arranges Samagri',
      indicativePrice: null,
      priceDisplay: 'Custom Quote',
      priceNote: 'Based on Vidhi, Muhurat & Location',
      inclusions: [
        'Pandit Dakshina for ceremony',
        `Puja performed as per agreed Shastra requirements`,
        'Samagri checklist provided (devotee arranges materials)'
      ],
      includedSamagriIds: [],
      cityNote: getCityNote(city)
    },
    {
      id: `${serviceId}-samagri`,
      name: 'Package B — Ritual + Samagri',
      tier: 'popular',
      badge: 'Samagri Included',
      indicativePrice: null,
      priceDisplay: 'Custom Quote',
      priceNote: 'Based on Vidhi, Muhurat & Location',
      inclusions: [
        'Pandit Dakshina for ceremony',
        'Pure Hawan Samagri kit included',
        'Additional materials available as optional selections'
      ],
      includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'],
      cityNote: getCityNote(city)
    }
  ];
}

// Honest City Availability Descriptions
export function getCityNote(city) {
  if (city === 'Pune') {
    return 'Pune & PCMC (Resident Gurukul Priests • Doorstep Service from Headquarters)';
  }
  if (city === 'Mumbai') {
    return 'Mumbai & MMR (Doorstep Service subject to date & priest availability)';
  }
  if (city === 'Bangalore') {
    return 'Bangalore (Visiting Pandit on schedule or Interactive Live Online E-Puja)';
  }
  if (city === 'Delhi') {
    return 'Delhi NCR (Visiting Pandit on schedule or Interactive Live Online E-Puja)';
  }
  if (city === 'Hyderabad') {
    return 'Hyderabad (Visiting Pandit on schedule or Interactive Live Online E-Puja)';
  }
  if (city === 'Chennai') {
    return 'Chennai (Visiting Pandit on schedule or Interactive Live Online E-Puja)';
  }
  if (city === 'Nashik') {
    return 'Nashik / Trimbakeshwar (Tirtha Kshetra Ceremonies by prior appointment)';
  }
  if (city === 'Online E-Puja') {
    return 'Live Online E-Puja with interactive video sankalpa & doorstep consecrated prasad';
  }
  return `${city} (Subject to location, date, and priest availability)`;
}
