// Centralized Static Puja Pricing Architecture & Rate Card for VedicPanditji
// Strictly adheres to static React/Vite architecture (NO database, NO backend, NO CMS)
//
// APPROVAL STATUSES:
// - 'approved': Formally verified by business owner (Sir)
// - 'local-project-data': Preserved existing project data awaiting business confirmation
// - 'proposed': Researched rate card structure ready for business review and sign-off
// - 'needs-business-confirmation': Flags specific details required to finalize commercial rate

export const PRICING_MODELS = {
  MODEL_A_FIXED: 'fixed-price',
  MODEL_B_PACKAGES: 'package-pricing',
  MODEL_C_CUSTOM: 'custom-quote'
};

export const VERIFICATION_STATUS = {
  BUSINESS_APPROVED: 'approved',
  LOCAL_PROJECT_DATA: 'local-project-data',
  PROPOSED: 'proposed',
  NEEDS_BUSINESS_CONFIRMATION: 'needs-business-confirmation'
};

// Flag to control customer-facing publication of proposed rates upon business approval
export const PUBLISH_PROPOSED_PRICES_TO_CUSTOMER = true;

// ============================================================================
// 1. PRESERVED LOCAL PROJECT DATA (4 CEREMONIES - NOT TO BE CHANGED WITHOUT APPROVAL)
// ============================================================================
export const PRESERVED_LOCAL_PACKAGES = {
  'griha-pravesh': {
    serviceId: 'griha-pravesh',
    serviceName: 'Griha Pravesh Puja',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.LOCAL_PROJECT_DATA,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Indicative starting dakshina (Preserved local project data)',
    pricingRationale: '2.5 to 3.5 hrs foundational home entry ritual. High demand across Pune & metro hubs.',
    researchBasis: 'Harivara packages range from ₹3,600 to ₹12,800. ₹3,500/₹5,500 is standard for North Indian home ritual in Pune.',
    missingBusinessInfo: 'Commercial sign-off on ₹3,500 (Dakshina only) vs ₹5,500 (with Hawan Samagri kit).',
    packages: [
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
          'Samagri checklist provided in advance (devotee arranges materials)'
        ],
        exclusions: [
          'Devotee arranges hawan samagri and cow ghee',
          'Devotee arranges fresh flowers, fruits, milk & prasad',
          'Devotee provides household puja thali & vessels'
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
          'Pure desi cow ghee & sacred hawan wood included',
          'Puja performed as per agreed Shastra vidhi'
        ],
        exclusions: [
          'Devotee only prepares fresh flowers & seasonal fruits',
          'Devotee arranges fresh milk, curd & household utensils'
        ],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'satyanarayan-puja': {
    serviceId: 'satyanarayan-puja',
    serviceName: 'Satyanarayan Puja & Katha',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.LOCAL_PROJECT_DATA,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Indicative starting dakshina (Preserved local project data)',
    pricingRationale: '2 to 2.5 hrs devotional monthly/milestone ceremony. Most frequent home puja.',
    researchBasis: 'Harivara Satyanarayan ranges from ₹3,000 to ₹6,500. VedicPanditji local rate ₹2,500/₹3,800 is highly competitive.',
    missingBusinessInfo: 'Confirmation whether Katha with Hawan includes standard cow ghee in Package B.',
    packages: [
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
          'Samagri checklist provided in advance (devotee arranges materials)'
        ],
        exclusions: [
          'Devotee arranges hawan samagri, cow ghee & dry fruits',
          'Devotee prepares Panchamrit, bananas, fresh flowers & prasad',
          'Devotee provides household chowki & thalis'
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
          'Pure cow ghee & dry ritual samagri included',
          'Puja performed as per agreed Shastra vidhi'
        ],
        exclusions: [
          'Devotee prepares fresh flowers, bananas & Sheera (Prasad)',
          'Devotee prepares fresh Panchamrit (milk, curd, honey, sugar, tulsi)'
        ],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'vastu-shanti-puja': {
    serviceId: 'vastu-shanti-puja',
    serviceName: 'Vastu Shanti Puja & Havan',
    category: 'shanti-pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.LOCAL_PROJECT_DATA,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Indicative starting dakshina (Preserved local project data)',
    pricingRationale: '3 to 4 hrs architectural pacification and Agnihotra hawan for flats/plots.',
    researchBasis: 'Harivara Vastu Homam packages range from ₹4,500 to ₹14,000.',
    missingBusinessInfo: 'Whether copper Vastu Yantra is provided by VedicPanditji or devotee.',
    packages: [
      {
        id: 'vs-dakshina',
        name: 'Package A — Ritual Only',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Indicative starting dakshina',
        inclusions: [
          'Pandit Dakshina for Vastu Shanti Vidhi & Havan',
          'Puja performed as per agreed Shastra vidhi',
          'Samagri checklist provided in advance (devotee arranges materials)'
        ],
        exclusions: [
          'Devotee arranges hawan samagri and cow ghee',
          'Devotee arranges fresh flowers, fruits & prasad',
          'Devotee provides copper kalash & household utensils'
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
          'Pandit Dakshina for Vastu Shanti Vidhi & Havan',
          'Essential pure Hawan Samagri kit included',
          'Pure desi cow ghee & hawan kashtha included',
          'Puja performed as per agreed Shastra vidhi'
        ],
        exclusions: [
          'Devotee prepares fresh flowers, water coconut & seasonal fruits',
          'Devotee arranges fresh milk & curd'
        ],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'rudrabhishek-puja': {
    serviceId: 'rudrabhishek-puja',
    serviceName: 'Rudrabhishek Puja & Shivling Abhishek',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.LOCAL_PROJECT_DATA,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Indicative starting dakshina (Preserved local project data)',
    pricingRationale: '2 to 3 hrs Namakam/Chamakam chanting with 11-substance abhishek.',
    researchBasis: 'Harivara Rudra Abhishek ranges from ₹3,500 to ₹8,500 in Maharashtra.',
    missingBusinessInfo: 'Whether Panditji brings a Narmadeshwar Shivling for households lacking one.',
    packages: [
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
          'Samagri checklist provided in advance (devotee arranges materials)'
        ],
        exclusions: [
          'Devotee arranges fresh raw milk, gangajal, honey, curd & sugarcane juice',
          'Devotee arranges fresh Belpatra, Dhatura, flowers & prasad',
          'Devotee arranges Shivling & abhishek patra'
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
          'Essential pure Hawan & Abhishek dry samagri kit included',
          'Sacred Bhasma, Chandan, Janeu & Havan wood included',
          'Puja performed as per agreed Shastra vidhi'
        ],
        exclusions: [
          'Devotee arranges fresh milk, curd, honey & panchamrit liquids',
          'Devotee arranges fresh Belpatra, Dhatura & flowers'
        ],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  }
};

// Aliased export for legacy consumers
export const LOCAL_PROJECT_PACKAGES = PRESERVED_LOCAL_PACKAGES;
export const VERIFIED_PUJA_PACKAGES = Object.fromEntries(
  Object.entries(PRESERVED_LOCAL_PACKAGES).map(([k, v]) => [k, v.packages])
);

// ============================================================================
// 2. COMPLETE 59-SERVICE RATE CARD & PRICING PROPOSAL REGISTRY
// Researched against Harivara benchmarks and Pune/Metro market standards
// ============================================================================
export const COMPLETE_59_PUJA_RATE_CARDS = {
  // 1-4 Preserved local project ceremonies
  ...PRESERVED_LOCAL_PACKAGES,

  // --------------------------------------------------------------------------
  // PUJAS CATEGORY (Ceremonies 5 to 20)
  // --------------------------------------------------------------------------
  'bhoomi-puja': {
    serviceId: 'bhoomi-puja',
    serviceName: 'Bhoomi Puja (Plot Groundbreaking)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 to 3 hrs plot foundation ritual with Ashta Dikpala and Kurma sthapana.',
    researchBasis: 'Harivara Bhoomi Puja ranges from ₹3,600 to ₹12,800. ₹3,100/₹4,800 is an honest starting structure.',
    missingBusinessInfo: 'Whether copper Kurma/Naga or foundation bricks are arranged by Panditji.',
    packages: [
      {
        id: 'bp-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior Vedic Acharya for Bhoomi Pujan & Sankalp',
          'Dikpal & Vastu Purush invocation on plot',
          'Detailed foundation samagri checklist provided'
        ],
        exclusions: ['Samagri kit', 'Fresh flowers, fruits, coconuts', 'Foundation digging tools'],
        includedSamagriIds: []
      },
      {
        id: 'bp-standard',
        name: 'Standard — Ritual + Essential Samagri',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior Vedic Acharya for Bhoomi Pujan',
          'Essential Hawan Samagri kit, Navadhanya & Copper Kalash included',
          'Desi cow ghee & sacred mango wood included',
          'Full ground sanctification vidhi'
        ],
        exclusions: ['Fresh fruits, loose marigold garlands', 'Household thali & digging shovel'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'office-opening-puja': {
    serviceId: 'office-opening-puja',
    serviceName: 'Office Opening & Vyapar Vriddhi Puja',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs commercial sanctification, Gauri-Ganesh, Navagraha and Kuber-Laxmi sthapana.',
    researchBasis: 'Harivara Office Opening ranges from ₹4,300 to ₹9,800. ₹3,100/₹4,800 is competitive for commercial units.',
    missingBusinessInfo: 'Whether smoke-free Agnihotra kund is provided for air-conditioned office spaces.',
    packages: [
      {
        id: 'oo-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Experienced Pandit for Office Opening Vidhi',
          'Gauri-Ganesh, Navagraha & Vyapar Vriddhi Pujan',
          'Office samagri checklist provided in advance'
        ],
        exclusions: ['Hawan samagri kit', 'Cash counter toran & fresh flowers', 'Puja utensils'],
        includedSamagriIds: []
      },
      {
        id: 'oo-standard',
        name: 'Standard — Ritual + Business Samagri Kit',
        tier: 'popular',
        badge: 'Recommended for Workspaces',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Experienced Pandit for complete ceremony',
          'Essential Hawan Samagri kit & pure cow ghee included',
          'Toran, Roli, Akshat, Janeu, Dhoop & Camphor included',
          'Smoke-conscious Agnihotra vidhi for commercial premises'
        ],
        exclusions: ['Fresh flowers, coconut, sweets (Mithai) for staff'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'mahalaxmi-puja': {
    serviceId: 'mahalaxmi-puja',
    serviceName: 'Mahalaxmi Puja & Kanakdhara Vidhi',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs home wealth worship with Kanakdhara Stotra and Sri Sukta ahutis.',
    researchBasis: 'Harivara Mahalaxmi Puja ranges from ₹3,800 to ₹7,500.',
    missingBusinessInfo: 'Whether silver Lakshmi coin consecration is included in standard package.',
    packages: [
      {
        id: 'mlx-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Mahalaxmi Pujan & Kanakdhara Path', 'Ashtalakshmi invocation', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Lotus flowers & fresh sweets', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'mlx-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure cow ghee & Hawan Samagri kit included', 'Kamalgatta (lotus seeds) & sacred herbs included'],
        exclusions: ['Fresh lotus flowers & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'saraswati-puja': {
    serviceId: 'saraswati-puja',
    serviceName: 'Saraswati Puja for Education & Wisdom',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3500,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 to 2 hrs ceremony for students, intellect, and books/instrument blessing.',
    researchBasis: 'Harivara Saraswati Puja ranges from ₹3,500 to ₹6,500.',
    missingBusinessInfo: 'Book and pen blessing guidance.',
    packages: [
      {
        id: 'srs-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Saraswati Aradhana & Medha Sukta', 'Vidya Aarambh blessing', 'Samagri checklist'],
        exclusions: ['Samagri kit', 'White flowers & sweets'],
        includedSamagriIds: []
      },
      {
        id: 'srs-standard',
        name: 'Standard — Ritual + Hawan Samagri',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for complete ceremony', 'Essential Saraswati hawan kit & cow ghee included', 'Chandan & yellow akshat'],
        exclusions: ['Fresh white flowers, pens, notebooks'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'ganesh-sthapana-visarjan': {
    serviceId: 'ganesh-sthapana-visarjan',
    serviceName: 'Ganesh Sthapana & Visarjan Puja',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 hrs single session (Sthapana) or two-session package (Sthapana + Visarjan).',
    researchBasis: 'Harivara Ganesh festival packages range from ₹2,500 to ₹6,500.',
    missingBusinessInfo: 'Single session vs two-visit bundle pricing.',
    packages: [
      {
        id: 'gs-single',
        name: 'Basic — Sthapana Session Only',
        tier: 'standard',
        badge: 'Single Session',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Praan Pratishtha & Ganesh Sthapana', '108 Durva Archana', 'Samagri checklist'],
        exclusions: ['Samagri kit', 'Fresh Modaks & flowers', 'Visarjan visit'],
        includedSamagriIds: []
      },
      {
        id: 'gs-bundle',
        name: 'Standard — Sthapana + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Sthapana & Hawan', 'Essential pure Hawan Samagri kit & ghee included', 'Roli, Moli, Janeu, Kalash vastram included'],
        exclusions: ['Fresh modaks and red hibiscus flowers'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'annaprashan-puja': {
    serviceId: 'annaprashan-puja',
    serviceName: 'Annaprashan Puja (First Rice Feeding)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs child sanskar with Ayush homam and first solid food tasting.',
    researchBasis: 'Harivara Annaprashan packages range from ₹4,500 to ₹8,500.',
    missingBusinessInfo: 'Whether silver spoon / katori is devotee-supplied.',
    packages: [
      {
        id: 'ap-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Annaprashan Vidhi & Ayush blessings', 'Tray-testing ritual guidance', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Cooked Kheer/Payasam', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'ap-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', 'Kalash, gangajal, roli, moli'],
        exclusions: ['Fresh fruits, kheer, baby silver katori'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'mundan-or-chudakarana-ceremony': {
    serviceId: 'mundan-or-chudakarana-ceremony',
    serviceName: 'Mundan (Chudakarana) Sanskar',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs child head-shaving ritual, Gauri-Ganesh pujan and Ayush hawan.',
    researchBasis: 'Harivara Chudakarana ranges from ₹4,500 to ₹9,500.',
    missingBusinessInfo: 'Barber service coordination (typically arranged by family).',
    packages: [
      {
        id: 'mn-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Chudakarana Vidhi', 'Kusha grass cutting ritual', 'Ayush hawan vidhi & checklist'],
        exclusions: ['Samagri kit', 'Barber services', 'Fresh items'],
        includedSamagriIds: []
      },
      {
        id: 'mn-standard',
        name: 'Standard — Ritual + Hawan Samagri Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for complete ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Kusha grass, chandan, haldi paste for baby scalp'],
        exclusions: ['Barber / Nai fees', 'Fresh flowers & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'namkaran-puja': {
    serviceId: 'namkaran-puja',
    serviceName: 'Namkaran Puja (Vedic Naming Ceremony)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 to 2 hrs ceremony; birth nakshatra letter calculation and formal whisper.',
    researchBasis: 'Harivara Namkaran ranges from ₹4,800 to ₹15,800.',
    missingBusinessInfo: 'Whether horoscope chart generation is bundled.',
    packages: [
      {
        id: 'nk-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Namkaran Sanskar', 'Nakshatra name selection guidance', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Bronze plate & raw rice', 'Sweets'],
        includedSamagriIds: []
      },
      {
        id: 'nk-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Sacred honey for ear-whisper ritual, roli, moli'],
        exclusions: ['Fresh fruits, sweets & baby cradle decoration'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'godh-bharai-puja-baby-shower': {
    serviceId: 'godh-bharai-puja-baby-shower',
    serviceName: 'Godh Bharai & Punsavan Sanskar',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs motherhood blessing, Simantonayana Vedic rites, and lap-filling blessing.',
    researchBasis: 'Harivara Godh Bharai / Seemantham ranges from ₹4,500 to ₹8,500.',
    missingBusinessInfo: 'Green bangles and lap fruit basket arrangements.',
    packages: [
      {
        id: 'gb-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Punsavan / Simantonayana Vidhi', 'Gauri Pujan & Mother Blessing', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Lap-filling dry fruits & sari', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'gb-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Roli, Chandan, Kalash vastram & sacred thread'],
        exclusions: ['Fresh green bangles, fruits, coconuts'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'yagnopavit-sanskar': {
    serviceId: 'yagnopavit-sanskar',
    serviceName: 'Yagnopavit Sanskar (Upanayan / Janeu)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 4500,
    maxPrice: 8500,
    startingPriceDisplay: 'From ₹4,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '3 to 4 hrs sacred thread investiture, Brahmacharya sankalp, Gayatri Diksha, and Bhiksha vidhi.',
    researchBasis: 'Harivara Upanayanam ranges from ₹8,500 to ₹35,000.',
    missingBusinessInfo: 'Whether 1 or 2 Pandits are standard for North Indian Upanayan.',
    packages: [
      {
        id: 'yp-basic',
        name: 'Basic — Single Acharya Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 4500,
        priceDisplay: '₹4,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Vedic Acharya for complete Upanayan & Gayatri Diksha', 'Bhiksha ceremony guidance', 'Detailed Janeu checklist'],
        exclusions: ['Samagri kit', 'Yagnopaveetam thread sets', 'Brahmachari danda & vastram'],
        includedSamagriIds: []
      },
      {
        id: 'yp-standard',
        name: 'Standard — Acharya + Full Samagri Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 6500,
        priceDisplay: '₹6,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior Vedic Acharya for ceremony',
          'Complete Upanayan Hawan kit & pure cow ghee included',
          'Consecrated Yagnopaveetam (Janeu) sets & sacred thread included',
          'Munj grass belt (Mekhala) & Palash danda blessing'
        ],
        exclusions: ['Fresh fruits, dhoti for boy, maternal uncle gifts'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      },
      {
        id: 'yp-premium',
        name: 'Premium — 2 Acharyas + Extended Setup',
        tier: 'premium',
        badge: 'Complete Family Sanskar',
        indicativePrice: 8500,
        priceDisplay: '₹8,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '2 Senior Vedic Acharyas conducting simultaneous Veda chanting and Homa',
          'Complete pure Samagri box with A2 Gir cow ghee',
          'Consecrated Janeu sets for boy and family male members',
          'Full Gayatri Anushthan sankalp'
        ],
        exclusions: ['Fresh fruits, Brahmin bhojan dakshina'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'shuddhikaran-puja': {
    serviceId: 'shuddhikaran-puja',
    serviceName: 'Shuddhikaran Puja (House Purification)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3200,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 hrs purification after birth/death/renovations with Panchagavya and hawan.',
    researchBasis: 'Harivara Shuddhikaran ranges from ₹3,200 to ₹5,500.',
    missingBusinessInfo: 'Sourcing of Panchagavya elements.',
    packages: [
      {
        id: 'sk-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Shuddhi Sankalp & Chanting', 'Panchagavya purification sprinklings', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Fresh cow milk, curd, gangajal', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'sk-standard',
        name: 'Standard — Ritual + Purification Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3200,
        priceDisplay: '₹3,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential herbal purification hawan kit & cow ghee included', 'Gomutra & Gangajal included'],
        exclusions: ['Fresh flowers & prasad'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'brihaspati-vrat-udyapan-puja': {
    serviceId: 'brihaspati-vrat-udyapan-puja',
    serviceName: 'Brihaspati Vrat Udyapan Puja',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs conclusion of 16 Thursday fasts for Lord Brihaspati / Vishnu.',
    researchBasis: 'Harivara Udyapan packages range from ₹3,500 to ₹6,500.',
    missingBusinessInfo: 'Yellow gram dal and banana plant arrangement.',
    packages: [
      {
        id: 'bv-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Udyapan Katha & Pujan', 'Guru Yantra invocation', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Yellow cloth, chana dal, bananas', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'bv-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for complete ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', 'Yellow cloth, turmeric root & sacred threads'],
        exclusions: ['Fresh bananas and yellow gram sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'solah-somvar-udyapan-puja': {
    serviceId: 'solah-somvar-udyapan-puja',
    serviceName: 'Solah Somvar Udyapan Puja',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs conclusion of 16 Monday fasts for Lord Shiva with abhishek & hawan.',
    researchBasis: 'Harivara Somvar Udyapan ranges from ₹3,500 to ₹6,500.',
    missingBusinessInfo: 'Prasad (Baati / Churma) devotee preparation.',
    packages: [
      {
        id: 'ss-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Somvar Katha & Abhishek', 'Lord Shiva archana', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Belpatra, raw milk, prasad', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'ss-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', 'Bhasma, Chandan, Janeu, Dhoop & Camphor'],
        exclusions: ['Fresh milk, curd, honey & Churma prasad'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'ekadashi-vrat-udyapan-puja': {
    serviceId: 'ekadashi-vrat-udyapan-puja',
    serviceName: 'Ekadashi Vrat Udyapan Puja',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs conclusion of Ekadashi fasts dedicated to Lord Vishnu with Hawan.',
    researchBasis: 'Harivara Ekadashi Udyapan ranges from ₹3,500 to ₹6,500.',
    missingBusinessInfo: 'Number of Brahmins for Bhojan / Dakshina.',
    packages: [
      {
        id: 'ek-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Ekadashi Mahatmya Katha', 'Vishnu Sahasranam Path & Havan', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Tulsi dal, fresh fruits, prasad', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'ek-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', 'Purna Kalash items, Roli, Akshat, Janeu'],
        exclusions: ['Fresh fruits, Tulsi leaves, prasad'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'kuber-upasana-puja': {
    serviceId: 'kuber-upasana-puja',
    serviceName: 'Kuber Upasana Puja for Wealth & Trade',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs ritual for trade growth, treasury abundance, and business recovery.',
    researchBasis: 'Harivara Kuber Puja ranges from ₹3,800 to ₹7,500.',
    missingBusinessInfo: 'Whether copper Kuber Yantra is gifted to customer.',
    packages: [
      {
        id: 'ku-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Kuber Pujan & Dhana Akarshana Mantras', 'Locker & Cashbox blessing', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Dry fruits, sweets, coins', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'ku-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for complete ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', 'Lotus seeds (Kamalgatta) & sacred herbs included'],
        exclusions: ['Fresh flowers and sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'vishwakarma-puja': {
    serviceId: 'vishwakarma-puja',
    serviceName: 'Vishwakarma Puja (Machinery & Tools)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3500,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 to 2 hrs ceremony for workshops, factories, IT servers, and tools.',
    researchBasis: 'Harivara Vishwakarma Puja ranges from ₹3,500 to ₹7,000.',
    missingBusinessInfo: 'Large industrial scale surcharge, if applicable.',
    packages: [
      {
        id: 'vk-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Vishwakarma Pujan', 'Machinery & tool blessing', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Red cloths, sweets for workers', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'vk-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Roli, Moli, Janeu, Kalash items'],
        exclusions: ['Fresh marigold garlands & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'new-vehicle-puja': {
    serviceId: 'new-vehicle-puja',
    serviceName: 'New Vehicle Puja (Vahan Puja)',
    category: 'pujas',
    model: PRICING_MODELS.MODEL_A_FIXED,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 1100,
    maxPrice: 1800,
    startingPriceDisplay: '₹1,100',
    pricingNote: 'Proposed fixed dakshina (Awaiting business confirmation)',
    pricingRationale: '45 mins to 1 hr focused vehicle blessing and obstacle warding.',
    researchBasis: 'Harivara Vehicle Puja ranges from ₹1,500 to ₹3,500. ₹1,100 is an honest doorstep dakshina.',
    missingBusinessInfo: 'Whether 2-wheelers and 4-wheelers have different rates.',
    packages: [
      {
        id: 'vp-standard',
        name: 'Standard Vehicle Blessing',
        tier: 'standard',
        badge: 'Standard Service',
        indicativePrice: 1100,
        priceDisplay: '₹1,100',
        priceNote: 'Fixed standard dakshina',
        inclusions: [
          'Experienced Pandit arriving at your doorstep or apartment parking',
          'Complete Gauri-Ganesh Pujan & Swastika consecration',
          'Coconut breaking (Balidana) & 4-tyre lemon crushing vidhi',
          'Sacred protective thread (Moli) tied to steering wheel'
        ],
        exclusions: ['Devotee provides 4 fresh lemons, 1 coconut, small sweets, and agarbatti'],
        includedSamagriIds: []
      },
      {
        id: 'vp-with-samagri',
        name: 'Doorstep All-Inclusive Kit',
        tier: 'popular',
        badge: 'All Materials Included',
        indicativePrice: 1800,
        priceDisplay: '₹1,800',
        priceNote: 'Complete kit included',
        inclusions: [
          'Pandit Dakshina for complete vehicle blessing',
          'Fresh lemons, sacred coconut, camphor, roli, and moli provided by Panditji',
          'Auspicious copper Kalash water sanctification'
        ],
        exclusions: ['Sweets / Prasad distribution'],
        includedSamagriIds: []
      }
    ]
  },

  // --------------------------------------------------------------------------
  // HAVANS CATEGORY (Ceremonies 21 to 31)
  // --------------------------------------------------------------------------
  'ganapathi-havan': {
    serviceId: 'ganapathi-havan',
    serviceName: 'Maha Ganapathi Havan',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 4200,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs primary obstacle-removal Agnihotra fire ritual.',
    researchBasis: 'Harivara Ganapathi Homam starts at ₹5,000 for standard tier.',
    missingBusinessInfo: '108 Modak ahuti requirements.',
    packages: [
      {
        id: 'gh-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Ganapathi Homam & 108 Ahutis', 'Shodashopachara Pujan', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Modaks, fresh flowers, cow ghee', 'Hawan kund'],
        includedSamagriIds: []
      },
      {
        id: 'gh-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4200,
        priceDisplay: '₹4,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential herbal Hawan Samagri kit & pure cow ghee included', 'Sacred mango wood (kashtha) & camphor included'],
        exclusions: ['Fresh fruits, modaks & loose flowers'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'navagraha-havan': {
    serviceId: 'navagraha-havan',
    serviceName: 'Navagraha Shanti Havan',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 to 3 hrs fire ceremony pacifying all 9 planetary grahas with 9 specific sacred woods.',
    researchBasis: 'Harivara Navagraha Homam ranges from ₹5,000 to ₹35,000.',
    missingBusinessInfo: 'Procurement of all 9 specialized Navagraha samidhas.',
    packages: [
      {
        id: 'nh-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for 9-graha invocation & Havan', 'Navagraha Mandala Pujan', 'Samagri checklist'],
        exclusions: ['Samagri kit', '9 graha cloths & samidha wood', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'nh-standard',
        name: 'Standard — Ritual + Full Navagraha Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Pandit Dakshina for complete ceremony',
          'Pure Hawan Samagri kit & pure cow ghee included',
          '9 Navagraha Samidha woods (Arka to Kusha) & 9 colored cloths included',
          'Navadhanya & Purna Kalash vastram'
        ],
        exclusions: ['Fresh flowers, fruits, milk'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'chandi-havan': {
    serviceId: 'chandi-havan',
    serviceName: 'Maha Chandi Havan & Durga Saptashati',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 7500,
    maxPrice: 18500,
    startingPriceDisplay: 'From ₹7,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '4 to 5 hrs intensive ceremony requiring multiple senior reciters for 700 verses & vast ahutis.',
    researchBasis: 'Harivara Chandi Homam ranges from ₹32,400 to ₹106,500.',
    missingBusinessInfo: 'Number of Brahmins (2 or 3) and Kanya Puja gifts.',
    packages: [
      {
        id: 'ch-basic',
        name: 'Basic — 2 Acharyas Dakshina',
        tier: 'standard',
        badge: '2 Vedic Acharyas',
        indicativePrice: 7500,
        priceDisplay: '₹7,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['2 Senior Vedic Acharyas for complete 700 Saptashati verses & Homa', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Kanya Puja items', 'Ghee & fruits'],
        includedSamagriIds: []
      },
      {
        id: 'ch-standard',
        name: 'Standard — 2 Acharyas + Complete Chandi Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 12500,
        priceDisplay: '₹12,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '2 Senior Vedic Acharyas for full ceremony',
          'Complete Chandi Hawan Samagri box with pure cow ghee & sacred herbs',
          'Red silk cloth for Devi, Kamal gatta, dry fruits & Navarna ahutis'
        ],
        exclusions: ['Fresh flowers, red saree for Devi, Kanya pujan dakshina'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      },
      {
        id: 'ch-premium',
        name: 'Premium — 3 Acharyas + Full Navachandi Setup',
        tier: 'premium',
        badge: 'Grand Ceremony',
        indicativePrice: 18500,
        priceDisplay: '₹18,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '3 Senior Vedic Acharyas conducting synchronized recitation & Maha Havan',
          'Full Navachandi Samagri setup with A2 Gir cow ghee & rare herbs',
          'Complete Kanya Puja coordination & gifts'
        ],
        exclusions: ['Brahmin bhojan feast'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'mrityunjaya-havan': {
    serviceId: 'mrityunjaya-havan',
    serviceName: 'Maha Mrityunjaya Havan for Longevity',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 to 3.5 hrs fire ceremony with Amrita herbs for health recovery and vitality.',
    researchBasis: 'Harivara Mrityunjaya Homam ranges from ₹6,500 to ₹28,000.',
    missingBusinessInfo: 'Sourcing of fresh Giloy / Amrita sticks.',
    packages: [
      {
        id: 'mj-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Acharya Dakshina for Mrityunjaya Havan & 1008 Ahutis', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Giloy / Amrita herbs', 'Ghee'],
        includedSamagriIds: []
      },
      {
        id: 'mj-standard',
        name: 'Standard — Ritual + Amrita Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Acharya for ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', 'Medicinal herbs (Giloy, Durva, Guggul) & wood'],
        exclusions: ['Fresh fruits, milk & flowers'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'ayush-havan': {
    serviceId: 'ayush-havan',
    serviceName: 'Ayush Havan (Birthday & Long Life)',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 4200,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs vitality and birthday fire ceremony for children or seniors.',
    researchBasis: 'Harivara Ayush Homam ranges from ₹4,500 to ₹12,500.',
    missingBusinessInfo: 'Payasam preparation instructions.',
    packages: [
      {
        id: 'ay-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Ayush Homa & Markandeya invocation', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Ghee, payasam, flowers'],
        includedSamagriIds: []
      },
      {
        id: 'ay-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4200,
        priceDisplay: '₹4,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Mango wood, camphor, roli, moli'],
        exclusions: ['Fresh fruits & birthday payasam/kheer'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'dhanvantri-havan': {
    serviceId: 'dhanvantri-havan',
    serviceName: 'Dhanvantri Havan for Chronic Healing',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 4200,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs medicinal fire ceremony for physical ailments and surgery recovery.',
    researchBasis: 'Harivara Dhanvantri Homam ranges from ₹5,000 to ₹15,000.',
    missingBusinessInfo: 'Ayurvedic herb packet sourcing.',
    packages: [
      {
        id: 'dh-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Dhanvantri invocation & Arogya Sankalp', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Medicinal herbs', 'Ghee'],
        includedSamagriIds: []
      },
      {
        id: 'dh-standard',
        name: 'Standard — Ritual + Healing Herbs Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4200,
        priceDisplay: '₹4,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit with 54 Ayurvedic herbs included', 'Pure cow ghee & sacred wood'],
        exclusions: ['Fresh fruits, milk, flowers'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'rudra-havan': {
    serviceId: 'rudra-havan',
    serviceName: 'Rudra Havan (Shiva Fire Ceremony)',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '3 hrs intense Shiva fire ceremony with Namakam/Chamakam chanting.',
    researchBasis: 'Harivara Rudra Homam ranges from ₹6,000 to ₹22,000.',
    missingBusinessInfo: 'Whether coupled with Shivling Abhishek.',
    packages: [
      {
        id: 'rh-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Acharya Dakshina for Rudra Path & Havan', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Belpatra, ghee, dravyas'],
        includedSamagriIds: []
      },
      {
        id: 'rh-standard',
        name: 'Standard — Ritual + Shiva Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Acharya for complete ceremony', 'Essential Hawan kit & pure cow ghee included', 'Sacred Bhasma, Chandan, Janeu, Bilva ahutis'],
        exclusions: ['Fresh milk, curd, honey & belpatra'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'gayatri-havan': {
    serviceId: 'gayatri-havan',
    serviceName: 'Gayatri Havan (Solar Vedic Purification)',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 4200,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs universal purification with 108 or 1008 Savitur Gayatri ahutis.',
    researchBasis: 'Harivara Gayatri Homam ranges from ₹4,500 to ₹14,000.',
    missingBusinessInfo: 'Ahuti count confirmation.',
    packages: [
      {
        id: 'gy-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Gayatri Japa & Havan', 'Surya Aradhana & Checklist'],
        exclusions: ['Samagri kit', 'Ghee & wood'],
        includedSamagriIds: []
      },
      {
        id: 'gy-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4200,
        priceDisplay: '₹4,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Sacred wood, camphor, roli, moli'],
        exclusions: ['Fresh flowers & prasad'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'laxmi-kubera-havan': {
    serviceId: 'laxmi-kubera-havan',
    serviceName: 'Laxmi Kubera Havan for Prosperity',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs wealth fire ritual with lotus seeds and Sri Sukta.',
    researchBasis: 'Harivara Lakshmi Kubera Homam ranges from ₹5,500 to ₹18,000.',
    missingBusinessInfo: 'Lotus seed count.',
    packages: [
      {
        id: 'lk-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Laxmi Kubera Havan', 'Ashtalakshmi Pujan & Checklist'],
        exclusions: ['Samagri kit', 'Kamalgatta, ghee, flowers'],
        includedSamagriIds: []
      },
      {
        id: 'lk-standard',
        name: 'Standard — Ritual + Wealth Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Kamalgatta, Bilva fruits & sacred wood'],
        exclusions: ['Fresh lotus flowers & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'sudarshan-havan': {
    serviceId: 'sudarshan-havan',
    serviceName: 'Sudarshan Havan for Supreme Protection',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs Vaishnava protection ritual against evil eye and negative energies.',
    researchBasis: 'Harivara Sudarshana Homam ranges from ₹5,500 to ₹20,000.',
    missingBusinessInfo: 'Vaishnava priest preference.',
    packages: [
      {
        id: 'sd-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Sudarshan Chakra invocation', 'Raksha Kavach chanting & Checklist'],
        exclusions: ['Samagri kit', 'Ghee, wood, flowers'],
        includedSamagriIds: []
      },
      {
        id: 'sd-standard',
        name: 'Standard — Ritual + Protection Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Consecrated Sudarshan Yantra, sacred wood, camphor'],
        exclusions: ['Fresh flowers & prasad'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'sri-sukta-havan': {
    serviceId: 'sri-sukta-havan',
    serviceName: 'Sri Sukta Havan (Rigvedic Devi Invocation)',
    category: 'havans',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 4200,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs Rigvedic recitation of 16 Sri Suktam verses with ahutis.',
    researchBasis: 'Harivara Sri Suktam ranges from ₹4,500 to ₹15,000.',
    missingBusinessInfo: 'Kheer ahuti instructions.',
    packages: [
      {
        id: 'sks-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Sri Suktam Path & Havan', 'Devi Mahalakshmi archana & Checklist'],
        exclusions: ['Samagri kit', 'Ghee, lotus seeds, sweets'],
        includedSamagriIds: []
      },
      {
        id: 'sks-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4200,
        priceDisplay: '₹4,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Kamalgatta, sacred wood, roli, moli'],
        exclusions: ['Fresh lotus flowers & kheer'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // JAAPS & ANUSHTHANS CATEGORY (Ceremonies 32 to 39)
  // --------------------------------------------------------------------------
  'maha-mrityunjaya-jaap': {
    serviceId: 'maha-mrityunjaya-jaap',
    serviceName: 'Maha Mrityunjaya Jaap',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 8500,
    maxPrice: 45000,
    startingPriceDisplay: 'From ₹8,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: 'Multi-Brahmin japa anushthan with counter malas and concluding hawan.',
    researchBasis: 'Harivara Mrityunjaya Jaap ranges from ₹12,000 to ₹85,000+ depending on chant count.',
    missingBusinessInfo: 'Number of Pandits and chant count selection in booking flow.',
    packages: [
      {
        id: 'mmj-11k',
        name: '11,000 Chants — 1 Day Anushthan',
        tier: 'standard',
        badge: '3 Vedic Pandits',
        indicativePrice: 8500,
        priceDisplay: '₹8,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['3 Vedic Pandits for 11,000 counts + Havan', 'Sankalp with Gotra', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Brahmin bhojan feast'],
        includedSamagriIds: []
      },
      {
        id: 'mmj-21k',
        name: '21,000 Chants — 2 Days / 5 Pandits',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 15500,
        priceDisplay: '₹15,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['5 Vedic Pandits completing 21,000 chants', 'Concluding Hawan kit & pure cow ghee included', 'Complete daily Sankalp'],
        exclusions: ['Brahmin bhojan feast'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      },
      {
        id: 'mmj-125k',
        name: '1,25,000 Chants — Maha Anushthan',
        tier: 'premium',
        badge: 'Complete Maha Anushthan',
        indicativePrice: 45000,
        priceDisplay: '₹45,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Team of 5-7 Acharyas across multiple days', 'Dashansh Havan, Tarpan, Marjan & Brahmin Bhojan coordination'],
        exclusions: ['Devotee accommodation for pandits if outstation'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'gayatri-mantra-jaap': {
    serviceId: 'gayatri-mantra-jaap',
    serviceName: 'Gayatri Mantra Anushthan & Jaap',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 9500,
    maxPrice: 18500,
    startingPriceDisplay: 'From ₹9,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '24,000 chants over 3 to 5 days with concluding hawan.',
    researchBasis: 'Harivara Gayatri Jaap ranges from ₹15,000 to ₹50,000.',
    missingBusinessInfo: 'Devotee participation requirements.',
    packages: [
      {
        id: 'gmj-24k',
        name: '24,000 Chants — 3 Days Anushthan',
        tier: 'standard',
        badge: '2 Vedic Pandits',
        indicativePrice: 9500,
        priceDisplay: '₹9,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['2 Pandits for 24,000 Gayatri counts + concluding Homa', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Brahmin bhojan'],
        includedSamagriIds: []
      },
      {
        id: 'gmj-51k',
        name: '51,000 Chants — 5 Days Anushthan',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 18500,
        priceDisplay: '₹18,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['3 Pandits for 51,000 counts', 'Concluding Hawan kit & pure cow ghee included', 'Surya Yantra blessing'],
        exclusions: ['Brahmin bhojan'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'santan-gopal-mantra-jaap': {
    serviceId: 'santan-gopal-mantra-jaap',
    serviceName: 'Santan Gopal Mantra Jaap for Child Blessings',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 7500,
    maxPrice: 14500,
    startingPriceDisplay: 'From ₹7,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '11,000 chants dedicated to Lord Krishna for fertility and progeny blessing.',
    researchBasis: 'Harivara Santan Gopal ranges from ₹11,000 to ₹35,000.',
    missingBusinessInfo: 'Bal Gopal silver idol provision.',
    packages: [
      {
        id: 'sg-11k',
        name: '11,000 Chants — Dedicated Anushthan',
        tier: 'standard',
        badge: '2 Vedic Pandits',
        indicativePrice: 7500,
        priceDisplay: '₹7,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['2 Pandits for 11,000 chants + concluding Homa', 'Bal Gopal Pujan & Checklist'],
        exclusions: ['Samagri kit', 'Butter/Misri & fruits'],
        includedSamagriIds: []
      },
      {
        id: 'sg-21k',
        name: '21,000 Chants — Extended Anushthan',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 14500,
        priceDisplay: '₹14,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['3 Pandits for 21,000 chants over 3 days', 'Hawan kit & cow ghee included', 'Maha Abhishek & Gopal Yantra'],
        exclusions: ['Fresh fruits & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'navagraha-graha-shanti-jaap': {
    serviceId: 'navagraha-graha-shanti-jaap',
    serviceName: 'Navagraha Graha Shanti Jaap (Surya to Ketu)',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 6500,
    maxPrice: 12500,
    startingPriceDisplay: 'From ₹6,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: 'Targeted japa across malefic planets with concluding Navagraha homa.',
    researchBasis: 'Harivara Graha Japa ranges from ₹9,000 to ₹35,000.',
    missingBusinessInfo: 'Kundali review prior to japa allocation.',
    packages: [
      {
        id: 'ngj-basic',
        name: 'Basic — Targeted Dosha Jaap',
        tier: 'standard',
        badge: 'Targeted Grahas',
        indicativePrice: 6500,
        priceDisplay: '₹6,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['2 Pandits chanting 7,000 to 10,000 counts on afflicted planets + Homa', 'Checklist provided'],
        exclusions: ['Samagri kit', '9 graha cloths & grains'],
        includedSamagriIds: []
      },
      {
        id: 'ngj-full',
        name: 'Standard — Complete 9 Grahas Japa + Homa Kit',
        tier: 'popular',
        badge: 'Full Navagraha Shanti',
        indicativePrice: 12500,
        priceDisplay: '₹12,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['3 Pandits completing 19,000+ chants across all 9 grahas', 'Complete Hawan kit & 9 samidhas included', 'Graha Daan guidance'],
        exclusions: ['Brahmin bhojan'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'kaal-sarp-dosh-puja': {
    serviceId: 'kaal-sarp-dosh-puja',
    serviceName: 'Kaal Sarp Dosh Nivaran Puja',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '3 hrs Rahu-Ketu pacification with silver Nag-Nagin pair and Rudra pujan.',
    researchBasis: 'Harivara Kaal Sarp ranges from ₹5,500 to ₹18,500 (Trimbakeshwar).',
    missingBusinessInfo: 'Home doorstep vidhi vs Trimbakeshwar kshetra booking.',
    packages: [
      {
        id: 'ks-doorstep',
        name: 'Basic — Doorstep Ritual Dakshina',
        tier: 'standard',
        badge: 'At Devotee Home',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Kaal Sarp Shanti & Rahu-Ketu Japa', 'Rudra Abhishek & Checklist'],
        exclusions: ['Samagri kit', 'Silver Nag-Nagin pair', 'Black/Blue cloth'],
        includedSamagriIds: []
      },
      {
        id: 'ks-complete',
        name: 'Standard — Doorstep + Full Kit with Silver Naga',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Consecrated Silver Nag-Nagin pair & Rahu-Ketu samidhas included'],
        exclusions: ['Fresh flowers, milk, lead/urad daal for donation'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'gand-mool-nakshatra-shanti-puja': {
    serviceId: 'gand-mool-nakshatra-shanti-puja',
    serviceName: 'Gand Mool Nakshatra Shanti Puja',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '3 hrs ritual on 27th day after birth for child born in Gand Mool nakshatra.',
    researchBasis: 'Harivara Gand Mool ranges from ₹5,000 to ₹12,000.',
    missingBusinessInfo: 'Sourcing 27 tree leaves & 27 water samples in Pune.',
    packages: [
      {
        id: 'gm-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Gand Mool Shanti & Nakshatra Homa', 'Father-Child shadow-seeing guidance', 'Checklist provided'],
        exclusions: ['Samagri kit', '27 leaves, 27 waters', 'Bronze thali'],
        includedSamagriIds: []
      },
      {
        id: 'gm-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Mool Nakshatra herbs & sacred wood included'],
        exclusions: ['Fresh leaves, water samples, bronze thali with ghee for reflection'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'guru-chandal-yoga-shanti': {
    serviceId: 'guru-chandal-yoga-shanti',
    serviceName: 'Guru Chandal Yoga Shanti Puja',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs remedy for Jupiter-Rahu conjunction in birth chart.',
    researchBasis: 'Harivara Chandal Yoga Shanti ranges from ₹4,500 to ₹9,500.',
    missingBusinessInfo: 'Horoscope verification before puja.',
    packages: [
      {
        id: 'gc-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Brihaspati & Rahu Japa + Havan', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Yellow cloth, chana dal, urad dal', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'gc-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Guru-Rahu specific samidhas & cloths'],
        exclusions: ['Fresh fruits & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'grahan-yog-shanti-puja': {
    serviceId: 'grahan-yog-shanti-puja',
    serviceName: 'Grahan Yog Shanti Puja (Surya/Chandra Rahu)',
    category: 'jaaps',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs remedy for Sun-Rahu / Moon-Rahu eclipse dosha.',
    researchBasis: 'Harivara Grahan Dosh ranges from ₹4,500 to ₹9,500.',
    missingBusinessInfo: 'Silver plate shadow vision requirements.',
    packages: [
      {
        id: 'gy-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Surya/Chandra & Rahu Japa + Havan', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Silver shadow-vision plate', 'Ghee'],
        includedSamagriIds: []
      },
      {
        id: 'gy-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Grahan Shanti samidhas & cloths'],
        exclusions: ['Fresh flowers & milk'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // PATHS & KATHAS CATEGORY (Ceremonies 40 to 45)
  // --------------------------------------------------------------------------
  'sunderkand-path': {
    serviceId: 'sunderkand-path',
    serviceName: 'Sunderkand Path Recitation with Music',
    category: 'paths',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 7500,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 to 3.5 hrs musical or solo recitation of 5th book of Ramcharitmanas.',
    researchBasis: 'Harivara Sunderkand Path is listed around ₹5,800 for musical format.',
    missingBusinessInfo: 'Solo reciter vs 2-3 artist musical troupe tier.',
    packages: [
      {
        id: 'skp-solo',
        name: 'Solo Reciter — Classical Recitation',
        tier: 'standard',
        badge: 'Single Pandit',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Experienced Pandit for complete Sunderkand Recitation', 'Hanuman Chalisa, Sankat Mochan & Aarti', 'Checklist provided'],
        exclusions: ['Musical instruments / Dholak', 'Samagri kit', 'Prasad'],
        includedSamagriIds: []
      },
      {
        id: 'skp-musical',
        name: 'Musical Recitation — Pandit + Musician',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5100,
        priceDisplay: '₹5,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Lead Pandit Reciter + Dholak/Harmonium Musician',
          'Complete Sunderkand Samagri kit & Sindoor included',
          'Hanuman Bahuk, Bajrang Baan & Maha Aarti with Dholak'
        ],
        exclusions: ['Fresh fruits, boondi / laddu prasad'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-complete-kit']
      },
      {
        id: 'skp-troupe',
        name: 'Grand Sangeet Path — 3 Devotional Reciters',
        tier: 'premium',
        badge: 'Devotional Reciters',
        indicativePrice: 7500,
        priceDisplay: '₹7,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '3-Member Devotional Recital Group (Lead Reciter, Harmonium, Dholak accompaniment)',
          'Complete Hawan & Pujan Samagri included',
          'Extended devotional Bhajans & Grand Hanuman Aarti'
        ],
        exclusions: ['Large sound system if beyond apartment size'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'akhand-ramayan-path': {
    serviceId: 'akhand-ramayan-path',
    serviceName: 'Akhand Ramayan Path (24-Hour Continuous)',
    category: 'paths',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 21000,
    maxPrice: 35000,
    startingPriceDisplay: 'From ₹21,000*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '24 hours continuous non-stop recital requiring team of 4-5 rotating Pandits.',
    researchBasis: 'Harivara Akhand Ramayan ranges from ₹26,300 to ₹48,800.',
    missingBusinessInfo: 'Overnight rest accommodation for rotating priests at customer venue.',
    packages: [
      {
        id: 'arp-basic',
        name: 'Basic — 4 Pandits Dakshina Only',
        tier: 'standard',
        badge: '4 Rotating Pandits',
        indicativePrice: 21000,
        priceDisplay: '₹21,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Team of 4 Pandits reciting 24-hr continuous Ramcharitmanas', 'Opening & Closing Havan guidance', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Akhand Jyot oil/ghee', 'Food & tea for priests'],
        includedSamagriIds: []
      },
      {
        id: 'arp-standard',
        name: 'Standard — 4 Pandits + Coordinated Samagri',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 26500,
        priceDisplay: '₹26,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Team of 4 Pandits reciting 24-hr continuous Ramcharitmanas',
          'Complete pure Hawan Samagri, 24-hr Akhand Jyot setup & cow ghee included',
          'Ram Darbar sthapana, Roli, Akshat, Janeu, Dhoop & Aarti items'
        ],
        exclusions: ['Meals & sleeping space for resting priests during shifts'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      },
      {
        id: 'arp-musical',
        name: 'Premium — 5 Pandits + Musical Recitation',
        tier: 'premium',
        badge: 'Musical Format',
        indicativePrice: 35000,
        priceDisplay: '₹35,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '5 Pandits with continuous Harmonium & Dholak accompaniment',
          'Full 24-hr Akhand Jyot & Hawan Samagri kit included',
          'Ram Janma, Sita Vivah & Rajyabhishek special celebration Bhajans'
        ],
        exclusions: ['Venue catering'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'chandi-path-durga-saptashati-path': {
    serviceId: 'chandi-path-durga-saptashati-path',
    serviceName: 'Chandi Path (Durga Saptashati 700 Verses)',
    category: 'paths',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3500,
    maxPrice: 5500,
    startingPriceDisplay: 'From ₹3,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '3.5 hrs complete Durga Saptashati recitation with Kavach, Argala, and Kilak.',
    researchBasis: 'Harivara Chandi Path ranges from ₹5,500 to ₹16,000.',
    missingBusinessInfo: 'Recitation with or without concluding hawan.',
    packages: [
      {
        id: 'cp-basic',
        name: 'Basic — Path Recitation Only',
        tier: 'standard',
        badge: 'Single Senior Pandit',
        indicativePrice: 3500,
        priceDisplay: '₹3,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Pandit for complete 13 chapters of Durga Saptashati', 'Devi Kavach & Argala Stotra', 'Checklist provided'],
        exclusions: ['Hawan samagri kit', 'Red cloth & shringar', 'Utensils'],
        includedSamagriIds: []
      },
      {
        id: 'cp-standard',
        name: 'Standard — Path + Hawan Samagri Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Pandit for complete Path & concluding Homa', 'Pure Hawan Samagri kit & cow ghee included', 'Devi Shringar kit & red cloth included'],
        exclusions: ['Fresh red flowers, coconuts & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'vishnu-sahasranam-path': {
    serviceId: 'vishnu-sahasranam-path',
    serviceName: 'Vishnu Sahasranam Path (1000 Holy Names)',
    category: 'paths',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3200,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 hrs recitation of 1000 divine names with Tulsi archana.',
    researchBasis: 'Harivara Vishnu Sahasranam ranges from ₹2,800 to ₹6,500.',
    missingBusinessInfo: 'Tulsi leaf procurement.',
    packages: [
      {
        id: 'vsp-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for 1000 Holy Names Recitation', 'Purusha Suktam chanting & Checklist'],
        exclusions: ['Samagri kit', 'Tulsi leaves & dry fruits'],
        includedSamagriIds: []
      },
      {
        id: 'vsp-standard',
        name: 'Standard — Ritual + Puja Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3200,
        priceDisplay: '₹3,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Puja Samagri kit & cow ghee included', 'Chandan, Roli, Akshat, Janeu & Dhoop'],
        exclusions: ['Fresh Tulsi leaves & fruits'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-complete-kit']
      }
    ]
  },

  'lalitha-sahasranam-puja': {
    serviceId: 'lalitha-sahasranam-puja',
    serviceName: 'Lalitha Sahasranam Puja & Kumkumarchana',
    category: 'paths',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs recitation of 1000 names with red vermilion Kumkumarchana to Sri Yantra.',
    researchBasis: 'Harivara Lalitha Sahasranamam ranges from ₹3,500 to ₹8,500.',
    missingBusinessInfo: 'Sri Yantra availability.',
    packages: [
      {
        id: 'lsp-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Lalitha Sahasranam & Kumkumarchana', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Pure Kumkum box & Sri Yantra', 'Flowers'],
        includedSamagriIds: []
      },
      {
        id: 'lsp-standard',
        name: 'Standard — Ritual + Kumkumarchana Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure natural Kumkum for 1,000 name archana included', 'Hawan samagri kit & cow ghee included'],
        exclusions: ['Fresh red hibiscus flowers & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'garud-puran-path': {
    serviceId: 'garud-puran-path',
    serviceName: 'Garud Puran Path (For Departed Souls)',
    category: 'paths',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 5500,
    maxPrice: 11000,
    startingPriceDisplay: 'From ₹5,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: 'Recited during 11 days of mourning for departed soul journey.',
    researchBasis: 'Harivara Garud Puran ranges from ₹8,500 to ₹25,000.',
    missingBusinessInfo: 'Condensed 3-day vs traditional 11-day path selection.',
    packages: [
      {
        id: 'gp-condensed',
        name: 'Condensed 3-Day Path',
        tier: 'standard',
        badge: '3-Day Recitation',
        indicativePrice: 5500,
        priceDisplay: '₹5,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Acharya for condensed 3-day Saroddhara recitation', 'Daily Pitru Tarpan & Shanti prayer', 'Checklist provided'],
        exclusions: ['Daily oil lamps & sesame seeds', 'Brahmin bhojan'],
        includedSamagriIds: []
      },
      {
        id: 'gp-traditional',
        name: 'Traditional 10-Day Complete Path',
        tier: 'popular',
        badge: 'Complete 10-Day Vidhi',
        indicativePrice: 11000,
        priceDisplay: '₹11,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior Acharya visiting daily for full Garud Puran chapters',
          'Complete Pitru Shanti hawan on concluding day with Hawan Samagri kit included',
          'Gau Daan & Pinda Daan guidance'
        ],
        exclusions: ['Daily household oil, sesame, and Brahmin bhojan'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // SHANTI PUJAS CATEGORY (Ceremony 47 - Ceremony 46 Vastu Shanti preserved above)
  // --------------------------------------------------------------------------
  'graha-shanti-puja': {
    serviceId: 'graha-shanti-puja',
    serviceName: 'Graha Shanti Puja & Navagraha Homa',
    category: 'shanti-pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4800,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs general planetary pacification before major life events.',
    researchBasis: 'Harivara Graha Shanti ranges from ₹4,800 to ₹12,000.',
    missingBusinessInfo: 'Difference vs Navagraha Havan (graha-shanti focuses on dosha pacification).',
    packages: [
      {
        id: 'grs-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Graha Shanti Vidhi & Homa', '9-graha pujan & Checklist'],
        exclusions: ['Samagri kit', '9 grains & cloths', 'Ghee'],
        includedSamagriIds: []
      },
      {
        id: 'grs-standard',
        name: 'Standard — Ritual + Navagraha Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4800,
        priceDisplay: '₹4,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential pure Hawan Samagri kit & cow ghee included', '9 Navadhanya grains, 9 cloths & sacred wood'],
        exclusions: ['Fresh fruits, milk, flowers'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // WEDDING SERVICES & SANSKARS CATEGORY (Ceremonies 48 to 54)
  // --------------------------------------------------------------------------
  'vivah-marriage': {
    serviceId: 'vivah-marriage',
    serviceName: 'Vivah (Complete Hindu Wedding Sanskar)',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 7500,
    maxPrice: 16500,
    startingPriceDisplay: 'From ₹7,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '4 to 6 hrs complete Vedic wedding with Kanyadaan, Panigrahana, Laja Homa, Saptapadi & Sindoor Daan.',
    researchBasis: 'Harivara Vivah ranges from ₹21,500 to ₹76,500.',
    missingBusinessInfo: 'Outstation wedding travel allowance & late night muhurat surcharge.',
    packages: [
      {
        id: 'vm-basic',
        name: 'Basic — Senior Acharya Dakshina',
        tier: 'standard',
        badge: 'Single Senior Acharya',
        indicativePrice: 7500,
        priceDisplay: '₹7,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior North Indian Acharya conducting complete Vivah Sanskar & Saptapadi', 'Muhurat coordination & Vivah checklist provided'],
        exclusions: ['Samagri kit', 'Dry fruits, puffed rice (Laja)', 'Mandap setup'],
        includedSamagriIds: []
      },
      {
        id: 'vm-standard',
        name: 'Standard — Senior Acharya + Complete Vivah Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 11500,
        priceDisplay: '₹11,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior North Indian Acharya conducting complete ceremony',
          'Complete Vivah Hawan Samagri kit, Laja (kheel) & pure cow ghee included',
          'Sindoor, Roli, Akshat, Janeu, Kalash vastram & sacred Gathbandhan cloth'
        ],
        exclusions: ['Fresh garlands (Jaimala), fruits, sweets, mandap brassware'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      },
      {
        id: 'vm-premium',
        name: 'Premium — 2 Acharyas + Full Vedic Chanting',
        tier: 'premium',
        badge: 'Grand Wedding Setup',
        indicativePrice: 16500,
        priceDisplay: '₹16,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '2 Senior Acharyas (Purohit + Assistant Priest) for flawless Vedic chanting',
          'Complete premium Hawan Samagri box with pure cow ghee & dry fruits',
          'Pre-wedding Lagna Patrika writing & Gotra pravara coordination'
        ],
        exclusions: ['Mandap physical decoration'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'engagement-puja-sagai': {
    serviceId: 'engagement-puja-sagai',
    serviceName: 'Engagement Puja (Sagai & Ring Ceremony)',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs formal mutual commitment blessing and ring sanctification.',
    researchBasis: 'Harivara Engagement ranges from ₹4,500 to ₹10,500.',
    missingBusinessInfo: 'Shagun thali layout guidance.',
    packages: [
      {
        id: 'eng-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Gauri-Ganesh Pujan & Ring blessing', 'Vagdan Sankalp between families & Checklist'],
        exclusions: ['Samagri kit', 'Shagun thali items', 'Sweets'],
        includedSamagriIds: []
      },
      {
        id: 'eng-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Hawan Samagri kit & cow ghee included', 'Roli, Chandan, Janeu, Kalash items & sacred thread'],
        exclusions: ['Fresh flowers, dry fruits & sweets'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'roka-ceremony': {
    serviceId: 'roka-ceremony',
    serviceName: 'Roka Ceremony & Pre-Vivah Sankalp',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3200,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 hrs initial commitment blessing and Tilak ceremony.',
    researchBasis: 'Harivara Roka ranges from ₹3,500 to ₹7,500.',
    missingBusinessInfo: 'Venue differential (home vs banquet).',
    packages: [
      {
        id: 'rk-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Gauri-Ganesh Pujan & Tilak', 'Roka Sankalp & Checklist'],
        exclusions: ['Samagri kit', 'Dry fruits, sweets, shagun'],
        includedSamagriIds: []
      },
      {
        id: 'rk-standard',
        name: 'Standard — Ritual + Puja Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3200,
        priceDisplay: '₹3,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Puja Samagri kit included', 'Roli, Akshat, Chandan, Moli & Dhoop'],
        exclusions: ['Fresh fruits, mithai & shagun gifts'],
        includedSamagriIds: ['opt-complete-kit']
      }
    ]
  },

  'haldi-ceremony': {
    serviceId: 'haldi-ceremony',
    serviceName: 'Traditional Haldi Ceremony Vidhi',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2100,
    maxPrice: 3200,
    startingPriceDisplay: 'From ₹2,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '1.5 hrs pre-wedding Vedic purification and turmeric sanctification.',
    researchBasis: 'Harivara Haldi ceremony ranges from ₹3,500 to ₹7,500.',
    missingBusinessInfo: 'Organic turmeric paste provision.',
    packages: [
      {
        id: 'hl-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2100,
        priceDisplay: '₹2,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Gauri-Ganesh & Haldi sanctification', 'Raksha Sutra & Checklist'],
        exclusions: ['Turmeric roots / paste', 'Fresh yellow marigolds'],
        includedSamagriIds: []
      },
      {
        id: 'hl-standard',
        name: 'Standard — Ritual + Haldi Pujan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3200,
        priceDisplay: '₹3,200*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Essential Puja Samagri kit & pure Kasturi turmeric powder included', 'Roli, Chandan, sacred thread'],
        exclusions: ['Fresh yellow flowers & sweets'],
        includedSamagriIds: ['opt-complete-kit']
      }
    ]
  },

  'kumbh-vivah-for-female': {
    serviceId: 'kumbh-vivah-for-female',
    serviceName: 'Kumbh Vivah (Manglik Shanti for Bride)',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 4500,
    maxPrice: 6500,
    startingPriceDisplay: 'From ₹4,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs Mangal dosha remedy where bride is first married to a consecrated Vishnu Kumbh.',
    researchBasis: 'Harivara Kumbha Vivaha ranges from ₹6,500 to ₹18,000.',
    missingBusinessInfo: 'Clay Kumbh pot immersion instructions.',
    packages: [
      {
        id: 'kv-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 4500,
        priceDisplay: '₹4,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Pandit Dakshina for complete Kumbh Vivah Vidhi', 'Manglik dosha nivaran chanting & Checklist'],
        exclusions: ['Samagri kit', 'Clay Kumbh pot & Vishnu idol', 'Ghee'],
        includedSamagriIds: []
      },
      {
        id: 'kv-standard',
        name: 'Standard — Ritual + Full Kumbh Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 6500,
        priceDisplay: '₹6,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior Pandit Dakshina for ceremony',
          'Pure Hawan Samagri kit & cow ghee included',
          'Consecrated earthen Kumbh pot, yellow cloth, Janeu, Mangal samidha included'
        ],
        exclusions: ['Fresh flowers, coconuts & milk'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'ark-vivah-for-male': {
    serviceId: 'ark-vivah-for-male',
    serviceName: 'Ark Vivah (Manglik Shanti for Groom)',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 4500,
    maxPrice: 6500,
    startingPriceDisplay: 'From ₹4,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs Manglik remedy where groom is symbolically married to an Ark (Madar) plant.',
    researchBasis: 'Harivara Arka Vivaha ranges from ₹6,500 to ₹18,000.',
    missingBusinessInfo: 'Procurement of flowering Ark plant.',
    packages: [
      {
        id: 'av-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 4500,
        priceDisplay: '₹4,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Pandit Dakshina for Ark Vivah Vidhi & Manglik Shanti', 'Surya Pujan & Checklist'],
        exclusions: ['Samagri kit', 'Ark plant', 'Ghee'],
        includedSamagriIds: []
      },
      {
        id: 'av-standard',
        name: 'Standard — Ritual + Full Ark Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 6500,
        priceDisplay: '₹6,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Ark Vivah cloths, sacred thread & Mangal samidha included'],
        exclusions: ['Live Ark / Madar plant (arranged at venue), fresh flowers'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  'tulsi-vivah-puja': {
    serviceId: 'tulsi-vivah-puja',
    serviceName: 'Tulsi Vivah Puja & Dev Uthani Ekadashi',
    category: 'wedding-services',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4500,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs ceremonial marriage of Tulsi with Lord Shaligram.',
    researchBasis: 'Harivara Tulsi Vivaha ranges from ₹4,500 to ₹11,000.',
    missingBusinessInfo: 'Sugarcane mandap stalks arrangement.',
    packages: [
      {
        id: 'tv-basic',
        name: 'Basic — Ritual Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for Tulsi-Shaligram Vivah Vidhi & Katha', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Red chunri & sugarcane stalks', 'Prasad'],
        includedSamagriIds: []
      },
      {
        id: 'tv-standard',
        name: 'Standard — Ritual + Hawan Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4500,
        priceDisplay: '₹4,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Pandit Dakshina for ceremony', 'Pure Hawan Samagri kit & cow ghee included', 'Tulsi Red Chunri, Shaligram vastram, Roli, Akshat'],
        exclusions: ['Sugarcane stalks (for mandap), fresh sweets, fruits'],
        includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // PITRU PUJAS CATEGORY (Ceremonies 55 to 57)
  // --------------------------------------------------------------------------
  'pitru-paksha-mahalaya-shradh-puja': {
    serviceId: 'pitru-paksha-mahalaya-shradh-puja',
    serviceName: 'Pitru Paksha Mahalaya Shradh Puja',
    category: 'pitru-pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 2500,
    maxPrice: 3800,
    startingPriceDisplay: 'From ₹2,500*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2 hrs annual ancestral remembrance during Mahalaya with Pinda Daan.',
    researchBasis: 'Harivara Shradh packages range from ₹3,500 to ₹10,800.',
    missingBusinessInfo: 'Pinda kheer preparation guidance.',
    packages: [
      {
        id: 'pp-basic',
        name: 'Basic — Purohit Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 2500,
        priceDisplay: '₹2,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Experienced Purohit for Pitru Tarpan & Pinda Daan', 'Gotra recitation for ancestors', 'Checklist provided'],
        exclusions: ['Black sesame, Kusha grass, barley flour', 'Pinda kheer', 'Brahmin bhojan'],
        includedSamagriIds: []
      },
      {
        id: 'pp-standard',
        name: 'Standard — Purohit + Shradh Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 3800,
        priceDisplay: '₹3,800*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Experienced Purohit for complete ceremony',
          'Black sesame (Kala Til), Kusha grass, Pinda Daan flour & Gangajal included',
          'Sacred thread (Janeu) & camphor for Balidana'
        ],
        exclusions: ['Fresh cow milk for tarpan, cooked pinda kheer, Brahmin bhojan'],
        includedSamagriIds: ['opt-complete-kit']
      }
    ]
  },

  'amavasya-tarpan': {
    serviceId: 'amavasya-tarpan',
    serviceName: 'Amavasya Tarpan & Gau Daan',
    category: 'pitru-pujas',
    model: PRICING_MODELS.MODEL_A_FIXED,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 1500,
    maxPrice: 2200,
    startingPriceDisplay: '₹1,500',
    pricingNote: 'Proposed fixed dakshina (Awaiting business confirmation)',
    pricingRationale: '1 hr monthly water and sesame oblation to ancestors.',
    researchBasis: 'Harivara Tarpan ranges from ₹1,500 to ₹4,500.',
    missingBusinessInfo: 'Gaushala Gau-grass coordination in Pune.',
    packages: [
      {
        id: 'at-standard',
        name: 'Monthly Tarpan Vidhi',
        tier: 'standard',
        badge: 'Doorstep Service',
        indicativePrice: 1500,
        priceDisplay: '₹1,500',
        priceNote: 'Fixed standard dakshina',
        inclusions: ['Purohit Dakshina for 3-generation Pitru Tarpan', 'Gotra & Nakshatra sankalp', 'Sacred Kusha grass & Black sesame included'],
        exclusions: ['Devotee provides clean water, milk, and white flowers'],
        includedSamagriIds: []
      },
      {
        id: 'at-with-gaudaan',
        name: 'Tarpan + Gau Daan Token',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 2200,
        priceDisplay: '₹2,200',
        priceNote: 'Includes Gaushala grass token',
        inclusions: ['Purohit Dakshina for complete Tarpan', 'Kusha grass, Til & Gangajal included', 'Token grass donation consecrated in ancestor name for cow feed'],
        exclusions: ['Household vessels'],
        includedSamagriIds: []
      }
    ]
  },

  'barsi-ceremony': {
    serviceId: 'barsi-ceremony',
    serviceName: 'Barsi Ceremony (Annual Shradh)',
    category: 'pitru-pujas',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 3100,
    maxPrice: 4500,
    startingPriceDisplay: 'From ₹3,100*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '2.5 hrs annual death anniversary ceremony with formal Pinda Daan.',
    researchBasis: 'Harivara Barsi ranges from ₹4,500 to ₹12,500.',
    missingBusinessInfo: 'Vastram donation for presiding Brahmin.',
    packages: [
      {
        id: 'br-basic',
        name: 'Basic — Purohit Dakshina',
        tier: 'standard',
        badge: 'Devotee Arranges Samagri',
        indicativePrice: 3100,
        priceDisplay: '₹3,100*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Senior Purohit Dakshina for Barsi Shradh & Pinda Daan', 'Checklist provided'],
        exclusions: ['Samagri kit', 'Pinda flour, sesame, milk', 'Brahmin bhojan'],
        includedSamagriIds: []
      },
      {
        id: 'br-standard',
        name: 'Standard — Purohit + Complete Shradh Kit',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 4500,
        priceDisplay: '₹4,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Senior Purohit for complete ceremony',
          'Black sesame (Kala Til), Kusha grass, Pinda flour & Gangajal included',
          'Vastram token for Brahmin & incense included'
        ],
        exclusions: ['Cooked pinda kheer & family feast'],
        includedSamagriIds: ['opt-complete-kit']
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BHAJANS & DEVOTIONAL CHOWKI CATEGORY (Ceremonies 58 to 59)
  // --------------------------------------------------------------------------
  'mata-ki-chowki': {
    serviceId: 'mata-ki-chowki',
    serviceName: 'Mata Ki Chowki & Akhand Jyot',
    category: 'bhajans-chowki',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 11000,
    maxPrice: 28000,
    startingPriceDisplay: 'From ₹11,000*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: '4 to 6 hrs devotional program with lead singer, musicians, and Akhand Jyot.',
    researchBasis: 'Harivara Chowki ranges from ₹18,000 to ₹55,000.',
    missingBusinessInfo: 'Sound system capacity & artist count per package.',
    packages: [
      {
        id: 'mkc-basic',
        name: 'Devotional Recital — 3 Performing Artists',
        tier: 'standard',
        badge: '3 Artists',
        indicativePrice: 11000,
        priceDisplay: '₹11,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: ['Lead Bhajan Singer + Harmonium + Dholak Player', 'Chowki Sthapana & Akhand Jyot blessing', 'Checklist provided'],
        exclusions: ['External sound system', 'Bhog & dry fruit distribution'],
        includedSamagriIds: []
      },
      {
        id: 'mkc-standard',
        name: 'Devotional Recital — 5 Artists + Audio Setup',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 18500,
        priceDisplay: '₹18,500*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Lead Singer + Female Co-Singer + Dholak + Octapad + Harmonium',
          'Apartment/Hall Sound System & Microphones included',
          'Chowki Pujan Samagri, Chunri & Akhand Jyot setup included',
          'Tara Rani Katha & Maha Aarti'
        ],
        exclusions: ['Prasad & 56 Bhog catering'],
        includedSamagriIds: ['opt-complete-kit']
      },
      {
        id: 'mkc-premium',
        name: 'Premium Troupe — 7 Artists + Grand Bhawan',
        tier: 'premium',
        badge: 'Grand Setup',
        indicativePrice: 28000,
        priceDisplay: '₹28,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Complete 7-artist Troupe (Lead Singers, Full Percussion, Flute/Synthesizer)',
          'High-fidelity Sound setup with stage mics',
          'Grand Bhawan decorative floral backdrop support & Chhappan Bhog aarti'
        ],
        exclusions: ['Hall rental and catering'],
        includedSamagriIds: ['opt-complete-kit']
      }
    ]
  },

  'jagran-puja': {
    serviceId: 'jagran-puja',
    serviceName: 'Raat Ka Jagran & Bhajan Sandhya',
    category: 'bhajans-chowki',
    model: PRICING_MODELS.MODEL_B_PACKAGES,
    approvalStatus: VERIFICATION_STATUS.PROPOSED,
    isBusinessApproved: false,
    minPrice: 31000,
    maxPrice: 45000,
    startingPriceDisplay: 'From ₹31,000*',
    pricingNote: 'Proposed rate card (Awaiting business confirmation)',
    pricingRationale: 'All-night (9 PM to 5 AM) devotional vigil with orchestra, sound, and Tara Rani katha.',
    researchBasis: 'Harivara Jagran ranges from ₹35,000 to ₹85,000+.',
    missingBusinessInfo: 'Jhanki artists availability in Pune/PCMC.',
    packages: [
      {
        id: 'jg-standard',
        name: 'Standard Jagran — 5-Artist Orchestra',
        tier: 'standard',
        badge: 'All-Night Vigil',
        indicativePrice: 31000,
        priceDisplay: '₹31,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          '5-Member All-Night Devotional Troupe (9 PM to 5 AM)',
          'High-power sound system and stage microphones',
          'Akhand Jyot, Ganesh Pujan, Tara Rani Katha & morning Aarti'
        ],
        exclusions: ['Jhanki stage actors', 'Midnight tea/snacks for devotees'],
        includedSamagriIds: ['opt-complete-kit']
      },
      {
        id: 'jg-grand',
        name: 'Grand Jagran — 7 Artists + Jhanki Presentations',
        tier: 'popular',
        badge: 'Most Popular',
        indicativePrice: 45000,
        priceDisplay: '₹45,000*',
        priceNote: 'Proposed starting dakshina',
        inclusions: [
          'Full 7-Artist Orchestra with dynamic sound system',
          'Live mythological Jhanki performances (Radha Krishna, Shiva Tandav)',
          'Akhand Jyot setup, Hawan Samagri & morning Aarti with conch'
        ],
        exclusions: ['Large public tent setup'],
        includedSamagriIds: ['opt-complete-kit']
      }
    ]
  }
};

// ============================================================================
// 3. OPTIONAL SAMAGRI OPTIONS
// ============================================================================
export const OPTIONAL_SAMAGRI_OPTIONS = [
  {
    id: 'opt-havan-samagri',
    name: 'Pure Herbal Hawan Samagri Pack (1.5 kg)',
    description: 'Herbal mixture with 54 Ayurvedic herbs, guggul, loban, black sesame & sacred wood',
    price: 950, // Preserved rate from PUJA_SAMAGRI_PRODUCTS
    priceDisplay: '₹950',
    category: 'havan',
    isPriceVerified: true,
    includedInTiers: ['popular']
  },
  {
    id: 'opt-cow-ghee',
    name: 'Pure Desi Cow Ghee for Homa (500g)',
    description: 'Consecrated pure cow ghee for sacred Agnihotra fire offerings',
    price: null, // Market rate -> Price to be confirmed with business
    priceDisplay: 'Price to be confirmed',
    category: 'ghee',
    isPriceVerified: false,
    includedInTiers: ['popular']
  },
  {
    id: 'opt-complete-kit',
    name: 'Complete Dry Puja & Hawan Samagri Box',
    description: 'Full box: Gangajal, Roli, Akshat, Janeu, Kalash vastram & Dry Fruits',
    price: null, // Ceremony-dependent -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'kits',
    isPriceVerified: false,
    includedInTiers: ['popular']
  },
  {
    id: 'opt-flowers',
    name: 'Fresh Flowers & Toran Garland',
    description: 'Fresh marigold garlands, loose puja flowers & sacred tulsi',
    price: null, // Perishable market rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'fresh',
    isPriceVerified: false,
    includedInTiers: []
  },
  {
    id: 'opt-fruits',
    name: 'Pancha-Phala (5 Fresh Seasonal Fruits)',
    description: '5 varieties of fresh fruits for sacred Naivedya offering',
    price: null, // Perishable market rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'fresh',
    isPriceVerified: false,
    includedInTiers: []
  },
  {
    id: 'opt-coconut',
    name: 'Purna Shrifal (Sacred Coconuts with Water)',
    description: '2 auspicious water coconuts for Kalash Sthapana & Balidana',
    price: null, // Perishable market rate -> Price to be confirmed
    priceDisplay: 'Price to be confirmed',
    category: 'fresh',
    isPriceVerified: false,
    includedInTiers: []
  }
];

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================
export function getServiceId(serviceOrId) {
  if (!serviceOrId) return '';
  if (typeof serviceOrId === 'string') return serviceOrId;
  return serviceOrId.id || (serviceOrId.name ? serviceOrId.name.toLowerCase().replace(/\s+/g, '-') : '');
}

/**
 * Retrieves the full rate card for any of the 59 ceremonies
 */
export function getPujaRateCard(serviceOrId) {
  const serviceId = getServiceId(serviceOrId);
  return COMPLETE_59_PUJA_RATE_CARDS[serviceId] || null;
}

/**
 * Returns all 59 rate cards
 */
export function getAllPujaRateCards() {
  return COMPLETE_59_PUJA_RATE_CARDS;
}

/**
 * Core pricing lookup for customer-facing components
 * Respects business approval rules:
 * - When PUBLISH_PROPOSED_PRICES_TO_CUSTOMER is false, only ceremonies with
 *   approvalStatus === 'approved' or 'local-project-data' show live packages;
 *   unapproved ceremonies return structured proposed packages with explicit
 *   approval-pending disclaimer or Custom Quote.
 */
export function getPujaPricing(serviceOrId, city = 'Pune') {
  const serviceId = getServiceId(serviceOrId);
  const rateCard = COMPLETE_59_PUJA_RATE_CARDS[serviceId];

  if (!rateCard) {
    return {
      serviceId,
      model: PRICING_MODELS.MODEL_C_CUSTOM,
      approvalStatus: VERIFICATION_STATUS.NEEDS_BUSINESS_CONFIRMATION,
      isBusinessApproved: false,
      minPrice: null,
      maxPrice: null,
      startingPriceDisplay: 'Custom Quote',
      pricingNote: 'Pricing determined based on requirements and location',
      hasPackages: false,
      packages: []
    };
  }

  // Check if price is published (either via preserved local data or explicit flag)
  const isPricePublished = rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA ||
                           rateCard.approvalStatus === VERIFICATION_STATUS.BUSINESS_APPROVED ||
                           PUBLISH_PROPOSED_PRICES_TO_CUSTOMER;

  if (isPricePublished) {
    const pkgCount = rateCard.packages ? rateCard.packages.length : 0;
    const isFixed = rateCard.model === PRICING_MODELS.MODEL_A_FIXED;
    const isLocalProject = rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA;

    let badgeText = '';
    if (isFixed) {
      badgeText = 'Fixed Dakshina';
    } else if (pkgCount === 3) {
      badgeText = '3 Package Options';
    } else if (pkgCount === 2) {
      badgeText = 'Package A & B Available';
    } else if (pkgCount > 0) {
      badgeText = `${pkgCount} Packages Available`;
    }

    let priceLabel = 'Dakshina';
    if (isFixed) {
      priceLabel = 'Fixed Dakshina';
    } else if (pkgCount > 0) {
      priceLabel = 'Starting Dakshina';
    }

    return {
      serviceId,
      serviceName: rateCard.serviceName,
      model: rateCard.model,
      approvalStatus: rateCard.approvalStatus,
      isBusinessApproved: rateCard.isBusinessApproved,
      isProposed: !isLocalProject,
      isLocalProjectData: isLocalProject,
      minPrice: rateCard.minPrice,
      maxPrice: rateCard.maxPrice,
      startingPriceDisplay: rateCard.startingPriceDisplay,
      pricingNote: rateCard.pricingNote,
      pricingRationale: rateCard.pricingRationale,
      researchBasis: rateCard.researchBasis,
      missingBusinessInfo: rateCard.missingBusinessInfo,
      hasPackages: pkgCount > 0,
      packageCount: pkgCount,
      badgeText,
      priceLabel,
      packages: (rateCard.packages || []).map(pkg => ({
        ...pkg,
        cityNote: getCityNote(city)
      }))
    };
  }

  // Internal proposed rate card ready for review
  return {
    serviceId,
    model: PRICING_MODELS.MODEL_C_CUSTOM,
    approvalStatus: rateCard.approvalStatus,
    isBusinessApproved: false,
    minPrice: null,
    maxPrice: null,
    startingPriceDisplay: 'Custom Quote',
    pricingNote: `${rateCard.startingPriceDisplay} (Proposed Rate Card • Awaiting Sir's Confirmation)`,
    pricingRationale: rateCard.pricingRationale,
    researchBasis: rateCard.researchBasis,
    missingBusinessInfo: rateCard.missingBusinessInfo,
    hasPackages: false,
    packages: [
      {
        id: `${serviceId}-custom-quote`,
        name: 'Custom Shastra Ceremony',
        tier: 'standard',
        badge: 'Custom Quote',
        indicativePrice: null,
        priceDisplay: 'Custom Quote',
        priceNote: `Proposed starting rate: ${rateCard.startingPriceDisplay} (Subject to Muhurat review)`,
        inclusions: [
          'Experienced North Indian / Bihari Vedic Purohit(s)',
          'Ceremony conducted strictly as per authentic Shastra vidhi',
          'Personalized Shubh Muhurat consultation tailored to family Kundali',
          'Detailed samagri checklist provided in advance'
        ],
        exclusions: [
          'Samagri arranged by devotee or provided on request (quoted transparently)',
          'Fresh household items (fruits, flowers, milk, prasad) arranged by family'
        ],
        includedSamagriIds: [],
        cityNote: getCityNote(city)
      }
    ]
  };
}

/**
 * Returns packages array for any service (Drop-in compatible with legacy getPackagesForService)
 */
export function getPackagesForService(serviceOrId, city = 'Pune') {
  const pricing = getPujaPricing(serviceOrId, city);
  return pricing.packages;
}

/**
 * Clean display helper for catalogue cards and listings
 */
export function getPricingDisplay(serviceOrId) {
  const serviceId = getServiceId(serviceOrId);
  const rateCard = COMPLETE_59_PUJA_RATE_CARDS[serviceId];

  if (!rateCard) {
    return {
      model: PRICING_MODELS.MODEL_C_CUSTOM,
      minPrice: null,
      maxPrice: null,
      displayPrice: 'Custom Quote',
      isCustomQuote: true,
      hasPackages: false,
      packageCount: 0,
      packages: [],
      approvalStatus: VERIFICATION_STATUS.NEEDS_BUSINESS_CONFIRMATION,
      isBusinessApproved: false,
      isProposed: true,
      isLocalProjectData: false,
      pricingNote: 'Pricing determined based on requirements and location',
      badgeText: 'Custom Quote',
      priceLabel: 'Dakshina'
    };
  }

  const isPricePublished = rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA ||
                           rateCard.approvalStatus === VERIFICATION_STATUS.BUSINESS_APPROVED ||
                           PUBLISH_PROPOSED_PRICES_TO_CUSTOMER;

  if (isPricePublished) {
    const pkgCount = rateCard.packages ? rateCard.packages.length : 0;
    const isFixed = rateCard.model === PRICING_MODELS.MODEL_A_FIXED;
    const isLocalProject = rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA;

    let badgeText = '';
    if (isFixed) {
      badgeText = 'Fixed Dakshina';
    } else if (pkgCount === 3) {
      badgeText = '3 Package Options';
    } else if (pkgCount === 2) {
      badgeText = 'Package A & B Available';
    } else if (pkgCount > 0) {
      badgeText = `${pkgCount} Packages Available`;
    }

    let priceLabel = 'Dakshina';
    if (isFixed) {
      priceLabel = 'Fixed Dakshina';
    } else if (pkgCount > 0) {
      priceLabel = 'Starting Dakshina';
    }

    return {
      model: rateCard.model,
      minPrice: rateCard.minPrice,
      maxPrice: rateCard.maxPrice,
      displayPrice: rateCard.startingPriceDisplay,
      isCustomQuote: false,
      hasPackages: pkgCount > 0,
      packageCount: pkgCount,
      packages: rateCard.packages || [],
      approvalStatus: rateCard.approvalStatus,
      isBusinessApproved: rateCard.isBusinessApproved,
      isProposed: !isLocalProject,
      isLocalProjectData: isLocalProject,
      pricingNote: rateCard.pricingNote,
      badgeText,
      priceLabel
    };
  }

  return {
    model: PRICING_MODELS.MODEL_C_CUSTOM,
    minPrice: null,
    maxPrice: null,
    displayPrice: 'Custom Quote',
    isCustomQuote: true,
    hasPackages: false,
    packageCount: 0,
    packages: [],
    approvalStatus: rateCard.approvalStatus,
    isBusinessApproved: false,
    isProposed: true,
    isLocalProjectData: false,
    pricingNote: rateCard.pricingNote,
    badgeText: 'Custom Quote',
    priceLabel: 'Dakshina'
  };
}

/**
 * Honest city availability notes
 */
export function getCityNote(city) {
  if (city === 'Pune') {
    return 'Pune & PCMC (Verified Doorstep Service • Experienced Vedic Priests)';
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
  if (city === 'Online E-Puja' || city === 'Online') {
    return 'Live Online E-Puja with interactive video sankalpa & doorstep consecrated prasad';
  }
  return `${city} (Subject to location, date, and priest availability)`;
}

/**
 * Transparent calculation of booking total with duplicate-charge protection
 */
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

  const alreadyIncludedIds = basePackage.includedSamagriIds || (
    basePackage.tier === 'popular' ? ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit'] : []
  );

  selectedOptionIds.forEach(id => {
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
