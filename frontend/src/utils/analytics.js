// Centralized Event Tracking Utility for VedicPanditji
// Supports Google Analytics 4 (gtag) and Google Tag Manager (dataLayer)
// Safe execution: will never crash or throw if tags are unconfigured

export const Analytics = {
  // Push standard event to dataLayer and gtag if present
  track(eventName, params = {}) {
    if (typeof window === 'undefined') return;

    const eventPayload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      pagePath: window.location.pathname,
      ...params
    };

    // Push to Google Tag Manager dataLayer
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }

    // Call gtag function if present
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  },

  // Track when a user initiates a booking or enquiry modal
  trackFormStarted(formName, context = {}) {
    this.track('form_started', {
      form_name: formName,
      ...context
    });
  },

  // Track validation errors
  trackValidationError(formName, fieldName, message) {
    this.track('form_validation_error', {
      form_name: formName,
      field_name: fieldName,
      error_message: message
    });
  },

  // Track genuine successful enquiry submission (ONLY fired on confirmed webhook success)
  trackFormSubmitted(formName, details = {}) {
    this.track('form_submission_success', {
      form_name: formName,
      service_name: details.serviceName || details.selectedPuja,
      city: details.city || details.selectedCity,
      locality: details.locality || details.selectedLocality,
      package: details.packageName || details.selectedPackage
    });
  },

  // Track phone call clicks
  trackPhoneClick(phoneNumber, source = 'header') {
    this.track('phone_cta_click', {
      phone_number: phoneNumber,
      source_location: source
    });
  },

  // Track WhatsApp inquiry clicks
  trackWhatsAppClick(source = 'general', context = {}) {
    this.track('whatsapp_cta_click', {
      source_location: source,
      ...context
    });
  },

  // Track navigation between sections
  trackPageView(pageTitle, path) {
    this.track('page_view', {
      page_title: pageTitle,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      page_path: path
    });
  }
};

export default Analytics;
