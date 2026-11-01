// Re-export from centralized canonical pricing source (pujaPricing.js)
// Retained for backward-compatibility across existing components and services.

export {
  PRICING_MODELS,
  VERIFICATION_STATUS,
  getOptionalSamagriOptions,
  getServiceId,
  getPujaPricing,
  getPackagesForService,
  getPricingDisplay,
  getCityNote,
  calculateBookingTotal
} from './pujaPricing.js';
