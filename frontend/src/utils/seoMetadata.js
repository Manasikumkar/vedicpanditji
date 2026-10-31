// Centralized SEO Metadata Utility for VedicPanditji
// Enforces unique, high-intent titles, meta descriptions, canonical URLs,
// Open Graph, Twitter cards, and structured data across all indexable routes.

import { ALL_POOJA_SERVICES } from '../data/allPoojaServices';
import { MULTI_CITY_SEO_PAGES } from '../data/multiCitySeoData';
import { getLocationBySlug } from '../data/locations';
import { getGuideBySlug } from '../data/guides/pujaGuidesData';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getWebPageSchema,
  getServiceSchema,
  getLocationServiceSchema,
  getArticleSchema,
  getBreadcrumbSchema,
  getFaqPageSchema,
  buildSchemaGraph
} from './schemaGenerator';
import { generateBreadcrumbs } from './internalLinks';

const DOMAIN = 'https://vedicpanditji.com';
const DEFAULT_IMAGE = `${DOMAIN}/images/vedicpanditji-logo.png`;

/**
 * Returns complete SEO metadata object for a given route and parameters
 */
export function getSeoMetadata(route, params = {}) {
  // 1. Homepage
  if (route === 'home' || route === '/') {
    const title = 'VedicPanditji | North Indian Pandit Booking & Vedic Puja Services Across India';
    const description = 'Book experienced North Indian Vedic Pandits across Pune, PCMC and all over India. Authentic Hindi & Sanskrit mantras for Griha Pravesh, Satyanarayan, Vastu Shanti & Havans.';
    const canonical = `${DOMAIN}/`;

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getWebSiteSchema(),
        getFaqPageSchema([
          { q: 'What languages do your Pandits speak?', a: 'VedicPanditji officially supports Hindi and Sanskrit. All mantras are recited in Sanskrit, and the Katha is explained in fluent Hindi.' },
          { q: 'Do you provide pandit services all over India?', a: 'Yes, VedicPanditji serves devotees all over India with doorstep purohits in Pune and PCMC, visiting Acharyas for major ceremonies, and live interactive E-Pujas.' },
          { q: 'Does Panditji bring the puja samagri?', a: 'Yes, Panditji can provide complete, pure unadulterated samagri including pure cow ghee, mango havan wood, and sacred herbs.' }
        ])
      ])
    };
  }

  // 2. Services Catalogue (/services or /catalogue)
  if (route === 'catalogue' || route === 'services') {
    const title = 'Vedic Puja & Havan Services Catalogue | VedicPanditji';
    const description = 'Explore complete catalogue of authentic Hindu ceremonies, Griha Pravesh, Satyanarayan Katha, Vastu Shanti, Havans, and Sanskars conducted by experienced North Indian Pandits.';
    const canonical = `${DOMAIN}/services`;
    const crumbs = generateBreadcrumbs('service');

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getWebPageSchema(canonical, title, description),
        getBreadcrumbSchema(crumbs)
      ])
    };
  }

  // 3. Individual Service Detail (/services/:serviceId)
  if (route === 'service-detail') {
    const serviceId = params?.serviceId || 'satyanarayan-puja';
    const service = ALL_POOJA_SERVICES.find(s => s.id === serviceId) || ALL_POOJA_SERVICES[0];

    const title = `${service.name} Booking | Vedic Pandit ji for Pooja Across India`;
    const description = service.shortDescription || `Book experienced North Indian Vedic Pandit for ${service.name}. Authentic Sanskrit vidhi, fluent Hindi Katha, and pure Vedic samagri options.`;
    const canonical = `${DOMAIN}/services/${service.id}`;
    const crumbs = generateBreadcrumbs('service', service);

    const schemas = [
      getOrganizationSchema(),
      getWebPageSchema(canonical, title, description),
      getServiceSchema(service),
      getBreadcrumbSchema(crumbs)
    ];

    if (service.faqs && service.faqs.length > 0) {
      schemas.push(getFaqPageSchema(service.faqs));
    }

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: service.image ? `${DOMAIN}${service.image}` : DEFAULT_IMAGE,
      ogType: 'article',
      robots: 'index, follow',
      schema: buildSchemaGraph(schemas)
    };
  }

  // 4. Programmatic Location Page (/locations/:slug)
  if (route === 'location-detail') {
    const slug = params?.slug || 'pandit-in-pune';
    const location = getLocationBySlug(slug) || getLocationBySlug('pandit-in-pune');

    const title = location.title;
    const description = location.metaDescription;
    const canonical = `${DOMAIN}/locations/${location.slug}`;
    const crumbs = generateBreadcrumbs('location', location);

    const schemas = [
      getOrganizationSchema(),
      getWebPageSchema(canonical, title, description),
      getLocationServiceSchema(location),
      getBreadcrumbSchema(crumbs)
    ];

    if (location.localFaqs && location.localFaqs.length > 0) {
      schemas.push(getFaqPageSchema(location.localFaqs));
    }

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph(schemas)
    };
  }

  // 4b. Multi-City Landing Page (/services/:slug)
  if (route === 'seo-landing') {
    const slug = params?.slug || 'north-indian-pandit-in-pune';
    const pageData = MULTI_CITY_SEO_PAGES.find(p => p.slug === slug) || MULTI_CITY_SEO_PAGES[0];

    const title = `${pageData.title} | VedicPanditji`;
    const description = pageData.metaDescription;
    const canonical = `${DOMAIN}/services/${pageData.slug}`;
    const crumbs = [
      { name: 'Home', url: '/' },
      { name: 'Ceremonies', url: '/services' },
      { name: pageData.title, url: `/services/${pageData.slug}` }
    ];

    const cityServiceSchema = {
      "@type": "Service",
      "@id": `${canonical}#service`,
      "name": pageData.h1,
      "description": pageData.metaDescription,
      "url": canonical,
      "provider": {
        "@id": `${DOMAIN}/#organization`
      },
      "serviceType": pageData.primaryService || pageData.service || "Vedic Hindu Rituals",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": pageData.city
      },
      "availableLanguage": [
        { "@type": "Language", "name": "Hindi" },
        { "@type": "Language", "name": "Sanskrit" }
      ]
    };

    const schemas = [
      getOrganizationSchema(),
      cityServiceSchema,
      getBreadcrumbSchema(crumbs)
    ];

    if (pageData.faqs && pageData.faqs.length > 0) {
      schemas.push(getFaqPageSchema(pageData.faqs));
    }

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph(schemas)
    };
  }

  // 5. Puja Guides Content Hub (/puja-guides)
  if (route === 'puja-guides-hub' || route === 'puja-guides') {
    const title = 'Hindu Puja & Vedic Ritual Guides | VedicPanditji Educational Hub';
    const description = 'Authoritative educational guides on Hindu ceremonies, Griha Pravesh vidhi, Satyanarayan Katha, Vastu Shanti, sacred havan procedures, and samagri checklists.';
    const canonical = `${DOMAIN}/puja-guides`;
    const crumbs = generateBreadcrumbs('guide');

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema(crumbs)
      ])
    };
  }

  // 6. Individual Puja Guide (/puja-guides/:slug)
  if (route === 'puja-guide-detail') {
    const slug = params?.slug || 'griha-pravesh-puja-vidhi-guide';
    const guide = getGuideBySlug(slug) || getGuideBySlug('griha-pravesh-puja-vidhi-guide');

    const title = `${guide.title} | VedicPanditji`;
    const description = guide.metaDescription;
    const canonical = `${DOMAIN}/puja-guides/${guide.slug}`;
    const crumbs = generateBreadcrumbs('guide', guide);

    const schemas = [
      getOrganizationSchema(),
      getArticleSchema(guide),
      getBreadcrumbSchema(crumbs)
    ];

    if (guide.faqs && guide.faqs.length > 0) {
      schemas.push(getFaqPageSchema(guide.faqs));
    }

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'article',
      robots: 'index, follow',
      schema: buildSchemaGraph(schemas)
    };
  }

  // 7. Core Pages
  if (route === 'about-us' || route === 'about') {
    const title = 'About VedicPanditji | Authentic Vedic Sanatan Heritage & Priests';
    const description = 'Learn about VedicPanditji mission to connect families with verified North Indian and Bihari Pandits for authentic Vedic ceremonies across India.';
    const canonical = `${DOMAIN}/about-us`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about-us' }])
      ])
    };
  }

  if (route === 'contact' || route === 'contact-us') {
    const title = 'Contact VedicPanditji | Shubh Muhurat Consultation & Priest Booking';
    const description = 'Contact senior Vedic Acharyas for Shubh Muhurat calculations, ceremony inquiries, and booking experienced North Indian Pandits in Pune, PCMC, and across India.';
    const canonical = `${DOMAIN}/contact`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])
      ])
    };
  }

  if (route === 'faqs') {
    const title = 'Frequently Asked Questions (FAQ) | VedicPanditji';
    const description = 'Find answers to common questions about booking North Indian Pandits, Shubh Muhurat calculations, pure Vedic samagri, and ritual procedures.';
    const canonical = `${DOMAIN}/faqs`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faqs' }])
      ])
    };
  }

  if (route === 'how-it-works') {
    const title = 'How It Works | Authentic 4-Step Vedic Ceremony Booking';
    const description = 'Understand VedicPanditji simple 4-step process: Consultation, Muhurat calculation, pure samagri preparation, and auspicious doorstep ceremony conduction.';
    const canonical = `${DOMAIN}/how-it-works`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'How It Works', url: '/how-it-works' }])
      ])
    };
  }

  if (route === 'puja-materials') {
    const title = 'Pure Vedic Puja Samagri & Havan Materials | VedicPanditji';
    const description = 'Pure unadulterated Vedic Samagri: Desi cow ghee, sacred mango wood, 54 Ayurvedic havan herbs, Gangajal, and brass puja thali items.';
    const canonical = `${DOMAIN}/puja-materials`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Puja Materials', url: '/puja-materials' }])
      ])
    };
  }

  if (route === 'temple-services') {
    const title = 'Sacred Kshetra & Temple Pilgrimage Pujas | VedicPanditji';
    const description = 'Verified Tirtha Purohit services for Kalsarp Shanti at Trimbakeshwar, Pinda Daan at Gaya, and Asthi Visarjan at Kashi Manikarnika with full scriptural fidelity.';
    const canonical = `${DOMAIN}/temple-services`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Temple Services', url: '/temple-services' }])
      ])
    };
  }

  if (route === 'policies' || route === 'legal') {
    const title = 'Privacy Policy & Terms of Service | VedicPanditji';
    const description = 'Official privacy policy, cancellation terms, and user guidelines for VedicPanditji static lead generation platform.';
    const canonical = `${DOMAIN}/legal`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'noindex, follow',
      schema: buildSchemaGraph([getOrganizationSchema()])
    };
  }

  if (route === 'sitemap') {
    const title = 'HTML Sitemap & Complete Directory | VedicPanditji';
    const description = 'Comprehensive directory of all Vedic puja ceremonies, educational ritual guides, and Pune & PCMC location pages on VedicPanditji.';
    const canonical = `${DOMAIN}/sitemap`;
    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_IMAGE,
      ogType: 'website',
      robots: 'index, follow',
      schema: buildSchemaGraph([getOrganizationSchema()])
    };
  }

  // 8. 404 Not Found Page
  return {
    title: 'Page Not Found (404) | VedicPanditji',
    description: 'The requested page could not be found. Explore our authentic Vedic ceremonies, educational puja guides, and Pune & PCMC location services.',
    canonical: `${DOMAIN}/404`,
    ogTitle: 'Page Not Found (404) | VedicPanditji',
    ogDescription: 'The requested page could not be found on VedicPanditji.',
    ogImage: DEFAULT_IMAGE,
    ogType: 'website',
    robots: 'noindex, nofollow',
    schema: null
  };
}

/**
 * Updates DOM head tags dynamically for client-side navigation
 */
export function applySeoMetadataToDom(metadata) {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = metadata.title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = metadata.description;

  // 3. Robots
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (!robotsTag) {
    robotsTag = document.createElement('meta');
    robotsTag.name = 'robots';
    document.head.appendChild(robotsTag);
  }
  robotsTag.content = metadata.robots || 'index, follow';

  // 4. Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = metadata.canonical;

  // 5. Open Graph Meta
  const setMetaProperty = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMetaProperty('og:title', metadata.ogTitle || metadata.title);
  setMetaProperty('og:description', metadata.ogDescription || metadata.description);
  setMetaProperty('og:url', metadata.canonical);
  setMetaProperty('og:type', metadata.ogType || 'website');
  setMetaProperty('og:image', metadata.ogImage || DEFAULT_IMAGE);

  // 6. Twitter Cards
  const setMetaName = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', metadata.ogTitle || metadata.title);
  setMetaName('twitter:description', metadata.ogDescription || metadata.description);
  setMetaName('twitter:image', metadata.ogImage || DEFAULT_IMAGE);

  // 7. JSON-LD Structured Data
  const scriptId = 'vedic-structured-data';
  let script = document.getElementById(scriptId);
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  if (metadata.schema) {
    script.textContent = JSON.stringify(metadata.schema);
  } else {
    script.textContent = '';
  }
}
