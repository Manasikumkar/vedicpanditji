// Centralized Webhook & Enquiry Service for VedicPanditji
// Direct browser-to-n8n static lead generation layer
// Conforms strictly to production safety constraints:
// - Direct browser-to-n8n HTTP POST (No backend, no database, no CMS)
// - Configurable via VITE_N8N_WEBHOOK_URL with official production endpoint fallback
// - Strict response contract validation (never defaults non-JSON/malformed to success)
// - Idempotency key tracking to avoid duplicate leads across network retries
// - Distinct handling for 404, 4xx, 5xx, network, timeouts, and invalid response bodies
// - Privacy-first: no personal data logged to browser console
// - Phone normalization, masking, honeypot spam prevention
// - Standardized envelope payload contract: { formType, source, submittedAt, data }

import { BRAND_INFO } from '../data/vedicPanditData.js';

export const PRODUCTION_WEBHOOK_URL = 'https://automate.nirosha.org/webhook/vedicpanditji';

/**
 * ============================================================================
 * EXPLICIT ACCEPTED RESPONSE CONTRACT SPECIFICATION FOR n8n WEBHOOK
 * ============================================================================
 *
 * For an HTTP response from automate.nirosha.org to be treated as SUCCESS,
 * the response MUST satisfy ALL of the following criteria:
 *
 * 1. HTTP Status: Must be 200, 201, or 202.
 * 2. Content-Type: Must be parseable JSON (or single-item array of JSON).
 * 3. Failure Exclusion: The response MUST NOT contain explicit failure indicators:
 *    - data.success === false
 *    - data.status === 'error' | 'failed' | 'rejected'
 *    - data.error (non-empty string or object)
 *    - data.code >= 400
 * 4. Contract Match: The response MUST match at least ONE of these recognized patterns:
 *    Pattern A (Standard Immediate n8n Webhook):
 *      { "message": "Workflow was started" } (case-insensitive substring)
 *    Pattern B (Explicit Success Boolean):
 *      { "success": true }
 *    Pattern C (Accepted Status Descriptor):
 *      { "status": "received" | "accepted" | "success" | "ok" | "queued" | "pending" | "confirmed" }
 *    Pattern D (Entity Record Identifier):
 *      { "referenceId" | "reference_id" | "refId" | "ref" | "leadId" | "bookingId" | "id": "<non-empty>" }
 *    Pattern E (Downstream Confirmed):
 *      { "confirmed": true | "bookingConfirmed": true | "status": "confirmed" }
 *
 * Any other response (empty body, HTML redirect/error, non-JSON plain text,
 * unparseable syntax, unexpected JSON structure without recognized keys)
 * is classified as an INVALID / MALFORMED RESPONSE BODY and rejected as a failure.
 * ============================================================================
 */

/**
 * Returns active Webhook URL from Vite environment or official production endpoint
 */
export function getWebhookUrl() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_N8N_WEBHOOK_URL) {
    const envUrl = import.meta.env.VITE_N8N_WEBHOOK_URL.trim();
    if (envUrl && !envUrl.includes('YOUR_WEBHOOK_URL')) {
      return envUrl;
    }
  }
  return PRODUCTION_WEBHOOK_URL;
}

/**
 * Generates a unique, collision-resistant submission idempotency key
 * Reused on user retries so n8n / downstream systems avoid duplicate leads.
 */
export function generateSubmissionId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `vp_${timestamp}_${randomPart}`;
}

/**
 * Normalizes Indian and international phone numbers
 * Returns clean 10-digit number or international E.164 string
 */
export function normalizePhoneNumber(rawPhone) {
  if (!rawPhone) return { isValid: false, normalized: '', local: '', error: 'Phone number is required' };

  // Remove spaces, hyphens, parentheses, and dots
  const cleaned = rawPhone.toString().trim().replace(/[\s\-().]/g, '');

  // Check for standard 10-digit Indian mobile number
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return { isValid: true, normalized: `+91${cleaned}`, local: cleaned, error: null };
  }

  // Check for 0 prefix with 10 digits (e.g. 09876543210)
  if (/^0[6-9]\d{9}$/.test(cleaned)) {
    const local = cleaned.slice(1);
    return { isValid: true, normalized: `+91${local}`, local, error: null };
  }

  // Check for +91 or 91 prefix with 10 digits
  if (/^(\+91|91)[6-9]\d{9}$/.test(cleaned)) {
    const local = cleaned.replace(/^(\+91|91)/, '');
    return { isValid: true, normalized: `+91${local}`, local, error: null };
  }

  // Check for general international format (between 7 and 15 digits)
  if (/^\+?\d{7,15}$/.test(cleaned)) {
    const formatted = cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
    return { isValid: true, normalized: formatted, local: cleaned, error: null };
  }

  return {
    isValid: false,
    normalized: cleaned,
    local: cleaned,
    error: 'Please enter a valid 10-digit mobile number'
  };
}

/**
 * Masks phone number for privacy in confirmation summary
 * Example: +91 98765 43210 -> +91 98765 •••••
 */
export function maskPhoneNumber(phone) {
  if (!phone) return '';
  const str = phone.toString().trim();
  if (str.startsWith('+91') && str.length >= 13) {
    const start = str.slice(0, 8);
    return `${start.replace('+91', '+91 ')} •••••`;
  }
  if (str.length === 10) {
    return `${str.slice(0, 5)} •••••`;
  }
  if (str.length > 6) {
    return `${str.slice(0, 4)} •••• ${str.slice(-2)}`;
  }
  return str;
}

/**
 * Validates enquiry form inputs
 */
export function validateEnquiryInput(formData) {
  const errors = {};

  if (!formData.customerName || !formData.customerName.trim()) {
    errors.customerName = 'Please enter your name';
  } else if (formData.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters';
  }

  const phoneValidation = normalizePhoneNumber(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
  }

  if (formData.email && formData.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Honeypot anti-spam check (field must be empty for genuine humans)
  if (formData.website_hp && formData.website_hp.trim() !== '') {
    errors._honeypot = 'Spam detected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone: phoneValidation.normalized
  };
}

/**
 * Extracts a genuine reference ID from an n8n webhook response if present.
 * Never invents or generates a random ID.
 */
export function extractGenuineReferenceId(responseData) {
  if (!responseData) return null;
  const target = Array.isArray(responseData) ? responseData[0] : responseData;
  if (!target || typeof target !== 'object') return null;

  const candidate = target.referenceId || target.reference_id || target.refId ||
    target.ref || target.leadId || target.bookingId || target.enquiryId || target.id;

  if (candidate && typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate.trim();
  }
  if (typeof candidate === 'number') {
    return String(candidate);
  }
  return null;
}

/**
 * Evaluates whether raw HTTP response text conforms to the accepted n8n contract.
 * Rejects empty responses, non-JSON text, explicit failure indicators, and malformed shapes.
 */
export function evaluateResponseContract(rawBodyText) {
  if (!rawBodyText || typeof rawBodyText !== 'string' || !rawBodyText.trim()) {
    return {
      isValid: false,
      reason: 'Empty response body received from server',
      subType: 'invalid_response_body',
      technicalDetail: 'Response body is empty or whitespace-only.'
    };
  }

  let parsed = null;
  try {
    parsed = JSON.parse(rawBodyText);
  } catch (err) {
    return {
      isValid: false,
      reason: 'Response body is not valid JSON',
      subType: 'invalid_response_body',
      technicalDetail: `JSON parse error: ${err.message}`
    };
  }

  // Handle single-item array wrapping (common in n8n output)
  const target = Array.isArray(parsed) ? parsed[0] : parsed;

  if (!target || typeof target !== 'object') {
    return {
      isValid: false,
      reason: 'Response JSON must be an object or non-empty array',
      subType: 'invalid_response_body',
      technicalDetail: `Parsed JSON type was ${typeof target}.`
    };
  }

  // Check for explicit upstream failure signals
  const isExplicitError =
    target.success === false ||
    target.status === 'error' ||
    target.status === 'failed' ||
    target.status === 'rejected' ||
    (target.error && (typeof target.error === 'string' ? target.error.trim().length > 0 : true)) ||
    (typeof target.code === 'number' && target.code >= 400);

  if (isExplicitError) {
    const errorMsg =
      (typeof target.error === 'string' && target.error) ||
      target.message ||
      'Upstream service reported failure';
    return {
      isValid: false,
      isExplicitError: true,
      reason: errorMsg,
      subType: 'upstream_explicit_error',
      technicalDetail: `Upstream error response: ${JSON.stringify(target)}`,
      data: target
    };
  }

  // Match recognized success patterns
  const hasStandardN8nMsg = typeof target.message === 'string' &&
    target.message.toLowerCase().includes('workflow was started');
  const hasSuccessFlag = target.success === true;
  const statusStr = String(target.status || '').toLowerCase();
  const hasAcceptedStatus = ['received', 'accepted', 'success', 'ok', 'queued', 'pending', 'confirmed'].includes(statusStr);
  const genuineRef = extractGenuineReferenceId(target);
  const hasReferenceId = Boolean(genuineRef);
  const isDownstreamConfirmed = target.confirmed === true || target.bookingConfirmed === true || statusStr === 'confirmed';

  const matchesContract = hasStandardN8nMsg || hasSuccessFlag || hasAcceptedStatus || hasReferenceId || isDownstreamConfirmed;

  if (!matchesContract) {
    return {
      isValid: false,
      reason: 'Response JSON did not match any recognized n8n success contract signature',
      subType: 'unrecognized_response_contract',
      technicalDetail: `Unrecognized payload keys: ${Object.keys(target).join(', ')}`,
      data: target
    };
  }

  return {
    isValid: true,
    data: target,
    referenceId: genuineRef,
    isDownstreamConfirmed
  };
}

/**
 * Submits an enquiry payload to the configured n8n webhook
 * Centralized entry point for all forms across VedicPanditji
 */
export async function submitEnquiryToWebhook(enquiryData) {
  const webhookUrl = getWebhookUrl();

  // Validate inputs
  const validation = validateEnquiryInput(enquiryData);
  if (!validation.isValid) {
    if (validation.errors._honeypot) {
      // Silently reject bots without error details
      return {
        success: false,
        status: 'error',
        subType: 'spam_detected',
        isConfigured: true,
        isSpam: true,
        heading: "We Couldn't Submit Your Enquiry",
        message: 'Submission could not be completed. Please contact us directly.'
      };
    }
    return {
      success: false,
      status: 'validation_error',
      subType: 'validation_error',
      isConfigured: Boolean(webhookUrl),
      validationErrors: validation.errors,
      heading: 'Please Review Required Fields',
      message: Object.values(validation.errors)[0] || 'Validation failed'
    };
  }

  const normalizedPhone = validation.normalizedPhone;
  const enquiryType = enquiryData.formType || 'booking_enquiry';

  // Ensure unique submissionId / idempotency key for this attempt (reused on user retry)
  const submissionId = enquiryData.submissionId || generateSubmissionId();

  // Build standard n8n payload contract adhering to required structure:
  // {
  //   submissionId: "vp_...",
  //   idempotencyKey: "vp_...",
  //   formType: "booking_enquiry",
  //   source: "vedicpanditji.com",
  //   submittedAt: "ISO_TIMESTAMP",
  //   data: { ...all form fields... }
  // }
  const payload = {
    submissionId,
    idempotencyKey: submissionId,
    formType: enquiryType,
    source: 'vedicpanditji.com',
    submittedAt: new Date().toISOString(),
    customerName: enquiryData.customerName.trim(),
    phone: normalizedPhone,
    data: {
      submissionId,
      formType: enquiryType,
      customerName: enquiryData.customerName.trim(),
      phone: normalizedPhone,
      email: enquiryData.email ? enquiryData.email.trim() : null,
      serviceName: enquiryData.serviceName || enquiryData.selectedPuja || 'Vedic Ceremony',
      selectedPuja: enquiryData.serviceName || enquiryData.selectedPuja || 'Vedic Ceremony',
      city: enquiryData.city || 'Pune',
      locality: enquiryData.locality || null,
      selectedPackage: enquiryData.packageName || null,
      packagePrice: enquiryData.packagePrice || null,
      samagriPolicy: enquiryData.samagriPolicy || null,
      preferredDate: enquiryData.date || enquiryData.preferredDate || null,
      preferredTimeSlot: enquiryData.timeSlot || enquiryData.preferredTimeSlot || null,
      preferredLanguage: enquiryData.language || enquiryData.preferredLanguage || 'Hindi & Sanskrit',
      tradition: enquiryData.tradition || 'North Indian / Vedic',
      gotra: enquiryData.gotra ? enquiryData.gotra.trim() : null,
      address: enquiryData.address ? enquiryData.address.trim() : null,
      customerNotes: enquiryData.notes || enquiryData.message || null,
      // Temple seva specific fields:
      templeName: enquiryData.templeName || null,
      ritualName: enquiryData.ritualName || null,
      sevaMode: enquiryData.sevaMode || null,
      ancestorNotes: enquiryData.ancestorNotes || null,
      pageUrl: typeof window !== 'undefined' ? window.location.href : 'https://vedicpanditji.com/',
      referrer: typeof document !== 'undefined' ? document.referrer : null
    }
  };

  // Safe fallback contact links for immediate manual outreach
  const fallbackContact = {
    phone: BRAND_INFO.phone,
    phoneClean: BRAND_INFO.phoneClean,
    whatsappUrl: buildWhatsAppEnquiryUrl(payload)
  };

  // Attempt direct browser fetch to production n8n webhook
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'X-Idempotency-Key': submissionId,
        'X-Submission-Id': submissionId
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // =========================================================================
    // CASE 1: HTTP 200, 201, 202 (Evaluate against explicit response contract)
    // =========================================================================
    if (response.ok) {
      const rawText = await response.text().catch(() => '');
      const contractEvaluation = evaluateResponseContract(rawText);

      // If response body does NOT conform to accepted contract: REJECT as failure!
      if (!contractEvaluation.isValid) {
        return {
          success: false,
          status: 'error',
          subType: contractEvaluation.subType,
          httpStatus: response.status,
          submissionId,
          heading: "We Couldn't Submit Your Enquiry",
          message: contractEvaluation.subType === 'upstream_explicit_error'
            ? 'The booking system reported an issue processing your request. Your enquiry has not been confirmed. Please retry or contact us directly.'
            : 'Received an unrecognized or invalid response from the booking system. Your request has not been confirmed. Please retry or contact us directly.',
          technicalHint: contractEvaluation.technicalDetail || contractEvaluation.reason,
          payload,
          fallbackContact
        };
      }

      // Conforms to accepted contract!
      return {
        success: true,
        status: 'success',
        subType: 'accepted_success',
        isConfigured: true,
        httpStatus: response.status,
        submissionId,
        referenceId: contractEvaluation.referenceId,
        isDownstreamConfirmed: contractEvaluation.isDownstreamConfirmed,
        data: contractEvaluation.data,
        heading: contractEvaluation.isDownstreamConfirmed
          ? 'Your Ceremony Booking is Confirmed!'
          : 'Your Enquiry Has Been Received!',
        message: contractEvaluation.isDownstreamConfirmed
          ? 'Your ceremony booking has been confirmed by our senior Acharyas. We will reach out shortly with preparation instructions.'
          : 'Thank you for contacting VedicPanditji. Your enquiry has been sent successfully. Our team will follow up using the contact details you provided.',
        payload,
        fallbackContact
      };
    }

    // =========================================================================
    // CASE 2: HTTP 404 (Webhook Not Registered / Inactive in n8n)
    // =========================================================================
    if (response.status === 404) {
      const responseBody = await response.text().catch(() => '');
      const isInactiveHint = responseBody.includes('not registered') || responseBody.includes('must be active');

      return {
        success: false,
        status: 'unavailable',
        subType: 'http_404_unregistered',
        isUnavailable: true,
        httpStatus: response.status,
        submissionId,
        heading: 'Online Enquiry Submission Unavailable',
        message: 'Your enquiry could not be sent online at this moment. Please contact VedicPanditji directly through WhatsApp or phone.',
        technicalHint: isInactiveHint
          ? 'The n8n workflow is currently inactive or unregistered in automate.nirosha.org. Toggle workflow to Active in editor.'
          : 'Webhook endpoint returned 404 Not Found.',
        payload,
        fallbackContact
      };
    }

    // =========================================================================
    // CASE 3: HTTP 4xx Client Errors (400 Bad Request, 403 Forbidden, 429 Too Many)
    // =========================================================================
    if (response.status >= 400 && response.status < 500) {
      const isRateLimited = response.status === 429;
      return {
        success: false,
        status: 'error',
        subType: isRateLimited ? 'http_429_rate_limited' : 'http_4xx_client_error',
        httpStatus: response.status,
        submissionId,
        heading: isRateLimited ? 'Submission Limit Reached' : "We Couldn't Submit Your Enquiry",
        message: isRateLimited
          ? 'Too many recent enquiry attempts. Please wait a moment before trying again or contact Panditji directly.'
          : 'Something went wrong with the enquiry submission request. Your request has not been confirmed. Please retry or contact us directly.',
        technicalHint: `HTTP client error status: ${response.status}`,
        payload,
        fallbackContact
      };
    }

    // =========================================================================
    // CASE 4: HTTP 5xx Server Errors (500, 502, 503, 504)
    // =========================================================================
    if (response.status >= 500) {
      return {
        success: false,
        status: 'error',
        subType: 'http_5xx_server_error',
        isServerError: true,
        httpStatus: response.status,
        submissionId,
        heading: "We Couldn't Submit Your Enquiry",
        message: 'The booking server encountered an error while processing your enquiry. Your request has not been confirmed. Please retry or contact us directly.',
        technicalHint: `Server error HTTP ${response.status}`,
        payload,
        fallbackContact
      };
    }

    // Fallback for any other unexpected HTTP status
    return {
      success: false,
      status: 'error',
      subType: 'unexpected_http_status',
      httpStatus: response.status,
      submissionId,
      heading: "We Couldn't Submit Your Enquiry",
      message: 'Something went wrong while sending your enquiry. Your request has not been confirmed. Please retry or contact us directly.',
      payload,
      fallbackContact
    };
  } catch (err) {
    const isTimeout = err.name === 'AbortError';
    const isNetworkOrCors = err instanceof TypeError || err.message?.includes('fetch') || err.message?.includes('NetworkError');

    // =========================================================================
    // CASE 5: Timeouts
    // =========================================================================
    if (isTimeout) {
      return {
        success: false,
        status: 'unavailable',
        subType: 'timeout',
        isUnavailable: true,
        isTimeout: true,
        submissionId,
        heading: 'Online Enquiry Submission Unavailable',
        message: 'The request timed out after 12 seconds. To prevent duplicate submissions, please check your connection and retry, or reach out to Panditji directly.',
        technicalHint: 'Client AbortController timed out after 12,000 ms.',
        payload,
        fallbackContact
      };
    }

    // =========================================================================
    // CASE 6: Network Failure / CORS Block
    // =========================================================================
    return {
      success: false,
      status: 'unavailable',
      subType: 'network_failure',
      isUnavailable: true,
      isNetworkOrCors,
      submissionId,
      heading: 'Online Enquiry Submission Unavailable',
      message: 'Your enquiry could not be sent online at this moment. Please contact VedicPanditji directly through WhatsApp or phone.',
      technicalHint: isNetworkOrCors
        ? 'CORS preflight or network connectivity error communicating with the webhook.'
        : `Network exception: ${err.message}`,
      payload,
      fallbackContact
    };
  }
}

/**
 * Builds pre-filled WhatsApp inquiry link for instant direct connection
 * Formats message cleanly according to enquiry category without leaking unnecessary private details
 */
export function buildWhatsAppEnquiryUrl(payload) {
  const data = payload?.data || payload || {};
  const formType = payload?.formType || data.formType || 'booking_enquiry';

  let lines = [];

  if (formType === 'temple_seva' || formType === 'temple_seva_enquiry') {
    lines = [
      'Namaste Panditji, I would like to enquire about a Sacred Temple Seva:',
      data.customerName ? `- Devotee: ${data.customerName}` : '',
      data.templeName ? `- Shrine: ${data.templeName}` : '',
      data.ritualName ? `- Ritual: ${data.ritualName}` : '',
      data.sevaMode ? `- Mode: ${data.sevaMode}` : '',
      data.gotra ? `- Gotra: ${data.gotra}` : '',
      data.preferredDate ? `- Preferred Date / Tithi: ${data.preferredDate}` : ''
    ];
  } else if (formType === 'contact_page' || formType === 'contact_enquiry') {
    lines = [
      'Namaste Panditji, I have submitted an enquiry on VedicPanditji:',
      data.customerName ? `- Name: ${data.customerName}` : '',
      data.serviceName ? `- Ceremony: ${data.serviceName}` : '',
      data.city ? `- Location: ${data.city}${data.locality ? ' (' + data.locality + ')' : ''}` : '',
      data.preferredDate ? `- Preferred Date: ${data.preferredDate}` : '',
      data.customerNotes ? `- Note: ${data.customerNotes}` : ''
    ];
  } else {
    // booking_enquiry
    lines = [
      'Namaste Panditji, I have submitted a puja booking enquiry on VedicPanditji:',
      data.customerName ? `- Devotee: ${data.customerName}` : '',
      data.serviceName ? `- Ceremony: ${data.serviceName}` : '',
      data.city ? `- Location: ${data.city}${data.locality ? ' (' + data.locality + ')' : ''}` : '',
      data.selectedPackage ? `- Package: ${data.selectedPackage}${data.packagePrice ? ' (' + data.packagePrice + ')' : ''}` : '',
      data.preferredDate ? `- Preferred Date: ${data.preferredDate}` : '',
      data.preferredTimeSlot ? `- Time Slot: ${data.preferredTimeSlot}` : ''
    ];
  }

  const cleanPhone = BRAND_INFO.phoneClean.startsWith('91') ? BRAND_INFO.phoneClean : `91${BRAND_INFO.phoneClean}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`;
}
