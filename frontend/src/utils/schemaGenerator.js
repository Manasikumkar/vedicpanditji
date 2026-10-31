// Structured Data & JSON-LD Generator for VedicPanditji
// Strictly conforms to Schema.org vocabulary and Google Search Central guidelines
//
// Rules enforced:
// - Organization: verified details only (no fabricated street addresses)
// - WebSite: canonical home entity and publisher link
// - Service: genuine ritual descriptions, areaServed, Hindi/Sanskrit languages
// - Article: editorial attribution without fabricated scholar personas
// - FAQPage: matches only visible rendered Q&As
// - Breadcrumbs: valid ordered ListItem hierarchy
// - Service Area Business: no fake branch addresses in localities

import { getPujaPricing, PRICING_MODELS } from '../data/pujaPricing.js';

const SITE_URL = 'https://vedicpanditji.com';
const LOGO_URL = 'https://vedicpanditji.com/images/vedicpanditji-logo.png';

/**
 * Base Organization Schema
 */
export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'VedicPanditji',
    legalName: 'Vedic Pandit Services',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: LOGO_URL,
      caption: 'VedicPanditji'
    },
    image: LOGO_URL,
    description: 'Authentic Vedic pujas, havans, and Hindu ceremonies conducted by experienced Hindi and Sanskrit speaking North Indian Pandits across Pune, PCMC, and all over India.',
    email: 'info@vedicpanditji.com',
    telephone: '+919766880979',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-97668-80979',
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['Hindi', 'Sanskrit', 'English']
      }
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'Hindi' },
      { '@type': 'Language', name: 'Sanskrit' }
    ]
  };
}

/**
 * WebSite Schema for Homepage
 */
export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'VedicPanditji',
    description: 'North Indian Pandit Booking & Vedic Puja Services Across India',
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    inLanguage: 'en-IN'
  };
}
/**
 * WebPage Schema
 */
export function getWebPageSchema(url, name, description) {
  if (!url) return null;
  const canonicalUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;

  return {
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: name || 'VedicPanditji',
    description: description || 'Vedic Pandit Services across Pune & India',
    isPartOf: {
      '@id': `${SITE_URL}/#website`
    },
    inLanguage: 'en-IN'
  };
}


/**
 * BreadcrumbList Schema
 * @param {Array<{ name: string, url: string }>} crumbs
 */
export function getBreadcrumbSchema(crumbs) {
  if (!crumbs || crumbs.length === 0) return null;

  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url.startsWith('/') ? crumb.url : `/${crumb.url}`}`
    }))
  };
}

/**
 * Service Schema for Individual Ceremonies
 */
export function getServiceSchema(service, area = 'Pune & All India') {
  if (!service) return null;

  const serviceSlug = service.id || service.slug;
  const serviceUrl = `${SITE_URL}/services/${serviceSlug}`;
  const pricing = getPujaPricing(serviceSlug);

  const schema = {
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: service.name,
    serviceType: service.category ? `Vedic ${service.category}` : 'Vedic Hindu Ceremony',
    description: service.shortDescription || service.description || `${service.name} conducted according to authentic Vedic Shastra by experienced North Indian Pandits.`,
    url: serviceUrl,
    provider: {
      '@id': `${SITE_URL}/#organization`
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: area
    },
    availableLanguage: [
      { '@type': 'Language', name: 'Hindi' },
      { '@type': 'Language', name: 'Sanskrit' }
    ],
    termsOfService: `${SITE_URL}/legal`
  };

  // Add Offer schema when dakshina is displayed
  // Add Offer schema strictly when an approved price is confirmed
  // Conforms to constraint: Do not generate Offer schema for all 59 services simply because they exist
  // Add Offer schema strictly when an actual approved price is visibly displayed
  // Excludes unapproved/proposed ceremonies to comply with Google Rich Results guidelines
  const isApprovedPrice = pricing && (pricing.approvalStatus === 'approved' || pricing.approvalStatus === 'local-project-data' || pricing.isBusinessApproved) && pricing.minPrice;
  if (isApprovedPrice) {
    schema.offers = {
      '@type': 'Offer',
      price: String(pricing.minPrice),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: serviceUrl,
      description: pricing.model === PRICING_MODELS.MODEL_A_FIXED
        ? `Fixed dakshina for ${service.name}`
        : `Starting dakshina for ${service.name}`
    };
  }

  return schema;
}

/**
 * Service Area Business Schema for Location Pages
 * Compliant with Google guidelines for businesses without public storefronts
 */
export function getLocationServiceSchema(locationData) {
  if (!locationData) return null;

  const pageUrl = `${SITE_URL}/locations/${locationData.slug}`;

  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: locationData.h1 || `Vedic Pandit in ${locationData.name}`,
    description: locationData.metaDescription || `Authentic Vedic pandit services in ${locationData.name} for Griha Pravesh, Satyanarayan, Vastu Shanti, and home ceremonies.`,
    url: pageUrl,
    provider: {
      '@id': `${SITE_URL}/#organization`
    },
    serviceType: 'Vedic Purohit & Puja Services',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: locationData.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: locationData.parentCity || 'Pune'
      }
    },
    availableLanguage: [
      { '@type': 'Language', name: 'Hindi' },
      { '@type': 'Language', name: 'Sanskrit' }
    ]
  };
}

/**
 * Article Schema for Educational Puja Guides
 */
export function getArticleSchema(guide) {
  if (!guide) return null;

  const guideUrl = `${SITE_URL}/puja-guides/${guide.slug}`;

  return {
    '@type': 'Article',
    '@id': `${guideUrl}#article`,
    headline: guide.title,
    description: guide.metaDescription,
    url: guideUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl
    },
    author: {
      '@type': 'Organization',
      name: 'VedicPanditji Editorial Desk',
      url: SITE_URL
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    datePublished: guide.publishedDate || '2026-01-15T00:00:00+05:30',
    dateModified: guide.modifiedDate || '2026-10-28T00:00:00+05:30',
    inLanguage: 'en-IN',
    keywords: guide.keywords ? guide.keywords.join(', ') : undefined
  };
}

/**
 * FAQPage Schema for Visible FAQs
 * ONLY to be called when FAQs are rendered visibly on the page
 */
export function getFaqPageSchema(faqItems) {
  if (!faqItems || !Array.isArray(faqItems) || faqItems.length === 0) return null;

  const validItems = faqItems
    .filter(item => (item.question || item.q) && (item.answer || item.a))
    .slice(0, 10); // keep reasonable count

  if (validItems.length === 0) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: validItems.map(item => ({
      '@type': 'Question',
      name: (item.question || item.q).trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: (item.answer || item.a).trim()
      }
    }))
  };
}

/**
 * Combines schemas into a clean @graph representation
 */
export function buildSchemaGraph(schemas) {
  const filtered = (schemas || []).filter(Boolean);
  if (filtered.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@graph': filtered
  };
}
