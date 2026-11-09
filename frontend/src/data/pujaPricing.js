// Puja pricing lookups for VedicPanditji.
// Rate cards and samagri add-ons live in pricing.json (managed in Supabase through /admin);
// this file only adds lookup, localization and booking-total logic on top.
import pricingSeed from './pricing.json' with { type: 'json' };
import { localize } from '../utils/localize.js';
import packageInclusionTranslations from '../i18n/packageInclusionTranslations.json' with { type: 'json' };
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
export const PUBLISH_PROPOSED_PRICES_TO_CUSTOMER = false;

// ============================================================================
// DATA LAYER
// pricing.json is the bundled copy; setPricingData swaps in the live Supabase copy.
// ============================================================================
let pricingData = pricingSeed;
let views = new Map();

export function setPricingData(next) {
  pricingData = next;
  views = new Map();
}

function localizeRateCards(cards, lang) {
  const localized = localize(cards, lang);
  if (lang === 'en') return localized;
  for (const card of Object.values(localized)) {
    if (card && Array.isArray(card.packages)) {
      for (const pkg of card.packages) {
        if (Array.isArray(pkg.inclusions)) {
          pkg.inclusions = pkg.inclusions.map(inc => {
            if (typeof inc === 'string' && packageInclusionTranslations[inc]?.[lang]) {
              return packageInclusionTranslations[inc][lang];
            }
            return inc;
          });
        }
        if (Array.isArray(pkg.exclusions)) {
          pkg.exclusions = pkg.exclusions.map(exc => {
            if (typeof exc === 'string' && packageInclusionTranslations[exc]?.[lang]) {
              return packageInclusionTranslations[exc][lang];
            }
            return exc;
          });
        }
      }
    }
  }
  return localized;
}

// Localized, cached view of the pricing data for one language.
function viewFor(lang) {
  if (!views.has(lang)) {
    views.set(lang, {
      rateCards: localizeRateCards(pricingData.rateCards, lang),
      samagri: localize(pricingData.samagriOptions, lang)
    });
  }
  return views.get(lang);
}

export function getOptionalSamagriOptions(lang = 'en') {
  return viewFor(lang).samagri;
}

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
export function getPujaRateCard(serviceOrId, lang = 'en') {
  const serviceId = getServiceId(serviceOrId);
  return viewFor(lang).rateCards[serviceId] || null;
}

/**
 * Returns all 59 rate cards
 */
export function getAllPujaRateCards(lang = 'en') {
  return viewFor(lang).rateCards;
}

/**
 * Core pricing lookup for customer-facing components
 * Respects business approval rules:
 * - When PUBLISH_PROPOSED_PRICES_TO_CUSTOMER is false, only ceremonies with
 *   approvalStatus === 'approved' or 'local-project-data' show live packages;
 *   unapproved ceremonies return structured proposed packages with explicit
 *   approval-pending disclaimer or Custom Quote.
 */

function localizeDisplayPrice(priceStr, lang) {
  if (!priceStr || lang === 'en') return priceStr;
  if (/^Custom Quote$/i.test(priceStr)) return 'कस्टम कोटेशन';
  if (lang === 'mr') {
    if (/^From\s+/i.test(priceStr)) {
      return priceStr.replace(/^From\s+/i, '') + ' पासून';
    }
  }
  if (lang === 'hi') {
    if (/^From\s+/i.test(priceStr)) {
      return priceStr.replace(/^From\s+/i, '') + ' से शुरू';
    }
  }
  return priceStr;
}

function getPricingLabels(isFixed, pkgCount, isCustom, lang = 'en') {
  if (lang === 'mr') {
    if (isCustom) return { badgeText: 'कस्टम कोटेशन', priceLabel: 'दक्षिणा' };
    let badgeText = '';
    if (isFixed) badgeText = 'निश्चित दक्षिणा';
    else if (pkgCount === 3) badgeText = '३ पॅकेज पर्याय';
    else if (pkgCount === 2) badgeText = 'पॅकेज A व B उपलब्ध';
    else if (pkgCount > 0) badgeText = pkgCount + ' पॅकेजेस उपलब्ध';
    const priceLabel = isFixed ? 'निश्चित दक्षिणा' : (pkgCount > 0 ? 'सुरुवातीची दक्षिणा' : 'दक्षिणा');
    return { badgeText, priceLabel };
  }
  if (lang === 'hi') {
    if (isCustom) return { badgeText: 'कस्टम कोटेशन', priceLabel: 'दक्षिणा' };
    let badgeText = '';
    if (isFixed) badgeText = 'निश्चित दक्षिणा';
    else if (pkgCount === 3) badgeText = '3 पैकेज विकल्प';
    else if (pkgCount === 2) badgeText = 'पैकेज A एवं B उपलब्ध';
    else if (pkgCount > 0) badgeText = pkgCount + ' पैकेज उपलब्ध';
    const priceLabel = isFixed ? 'निश्चित दक्षिणा' : (pkgCount > 0 ? 'प्रारंभिक दक्षिणा' : 'दक्षिणा');
    return { badgeText, priceLabel };
  }
  if (isCustom) return { badgeText: 'Custom Quote', priceLabel: 'Dakshina' };
  let badgeText = '';
  if (isFixed) badgeText = 'Fixed Dakshina';
  else if (pkgCount === 3) badgeText = '3 Package Options';
  else if (pkgCount === 2) badgeText = 'Package A & B Available';
  else if (pkgCount > 0) badgeText = pkgCount + ' Packages Available';
  const priceLabel = isFixed ? 'Fixed Dakshina' : (pkgCount > 0 ? 'Starting Dakshina' : 'Dakshina');
  return { badgeText, priceLabel };
}

export function getPujaPricing(serviceOrId, city = 'Pune', lang = 'en') {
  const serviceId = getServiceId(serviceOrId);
  const rateCard = viewFor(lang).rateCards[serviceId];

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

  // Check if price is published (either via business approval, defined price, or explicit flag)
  const isPricePublished = Boolean(rateCard.isBusinessApproved) ||
                           rateCard.approvalStatus === VERIFICATION_STATUS.BUSINESS_APPROVED ||
                           rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA ||
                           (typeof rateCard.minPrice === 'number' && rateCard.minPrice > 0) ||
                           PUBLISH_PROPOSED_PRICES_TO_CUSTOMER;

  if (isPricePublished) {
    const pkgCount = rateCard.packages ? rateCard.packages.length : 0;
    const isFixed = rateCard.model === PRICING_MODELS.MODEL_A_FIXED;
    const isLocalProject = rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA;

    const { badgeText, priceLabel } = getPricingLabels(isFixed, pkgCount, false, lang);

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
export function getPackagesForService(serviceOrId, city = 'Pune', lang = 'en') {
  const pricing = getPujaPricing(serviceOrId, city, lang);
  return pricing.packages;
}

/**
 * Clean display helper for catalogue cards and listings
 */
export function getPricingDisplay(serviceOrId, lang = 'en') {
  const serviceId = getServiceId(serviceOrId);
  const rateCard = viewFor(lang).rateCards[serviceId];

  if (!rateCard) {
    return {
      model: PRICING_MODELS.MODEL_C_CUSTOM,
      minPrice: null,
      maxPrice: null,
      displayPrice: localizeDisplayPrice('Custom Quote', lang),
      isCustomQuote: true,
      hasPackages: false,
      packageCount: 0,
      packages: [],
      approvalStatus: VERIFICATION_STATUS.NEEDS_BUSINESS_CONFIRMATION,
      isBusinessApproved: false,
      isProposed: true,
      isLocalProjectData: false,
      pricingNote: 'Pricing determined based on requirements and location',
      ...getPricingLabels(false, 0, true, lang)
    };
  }

  const isPricePublished = Boolean(rateCard.isBusinessApproved) ||
                           rateCard.approvalStatus === VERIFICATION_STATUS.BUSINESS_APPROVED ||
                           rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA ||
                           (typeof rateCard.minPrice === 'number' && rateCard.minPrice > 0) ||
                           PUBLISH_PROPOSED_PRICES_TO_CUSTOMER;

  if (isPricePublished) {
    const pkgCount = rateCard.packages ? rateCard.packages.length : 0;
    const isFixed = rateCard.model === PRICING_MODELS.MODEL_A_FIXED;
    const isLocalProject = rateCard.approvalStatus === VERIFICATION_STATUS.LOCAL_PROJECT_DATA;

    const { badgeText, priceLabel } = getPricingLabels(isFixed, pkgCount, false, lang);

    return {
      model: rateCard.model,
      minPrice: rateCard.minPrice,
      maxPrice: rateCard.maxPrice,
      displayPrice: localizeDisplayPrice(rateCard.startingPriceDisplay, lang),
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
    displayPrice: localizeDisplayPrice('Custom Quote', lang),
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

    const item = getOptionalSamagriOptions().find(opt => opt.id === id);
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
