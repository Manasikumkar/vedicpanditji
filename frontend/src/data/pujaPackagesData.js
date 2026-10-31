// Re-export from centralized canonical pricing source (pujaPricing.js)
// Retained for backward-compatibility across existing components and services.

export {
  PRICING_MODELS,
  VERIFICATION_STATUS,
  LOCAL_PROJECT_PACKAGES,
  VERIFIED_PUJA_PACKAGES,
  OPTIONAL_SAMAGRI_OPTIONS,
  getServiceId,
  getPujaPricing,
  getPackagesForService,
  getPricingDisplay,
  getCityNote,
  calculateBookingTotal
} from './pujaPricing.js';
