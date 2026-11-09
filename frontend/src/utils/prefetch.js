/**
 * Silent route prefetcher for instant page-to-page navigation
 * Downloads the requested route's code chunk in the background without executing it.
 */
const prefetched = new Set();

export function prefetchRoute(route) {
  if (typeof window === 'undefined' || !route || prefetched.has(route)) return;
  prefetched.add(route);

  switch (route) {
    case 'catalogue':
    case 'services':
      import('../pages/CataloguePage');
      break;
    case 'service-detail':
      import('../pages/ServiceDetailPage');
      break;
    case 'about-us':
    case 'about':
      import('../pages/AboutUsPage');
      break;
    case 'locations':
    case 'location-detail':
      import('../pages/LocationPage');
      break;
    case 'contact':
      import('../pages/ContactEnquiryPage');
      break;
    case 'puja-materials':
      import('../pages/PujaMaterialsPage');
      break;
    case 'temple-services':
      import('../pages/TempleServicesPage');
      break;
    case 'faqs':
      import('../pages/FaqsPage');
      break;
    case 'how-it-works':
      import('../pages/HowWeWorkPage');
      break;
    case 'seo-landing':
      import('../pages/SeoLandingPage');
      break;
    default:
      break;
  }
}

/**
 * Prefetches high-traffic core routes during browser idle time
 */
export function initIdlePrefetch() {
  if (typeof window === 'undefined') return;

  const prefetchCore = () => {
    prefetchRoute('catalogue');
    prefetchRoute('service-detail');
    prefetchRoute('about-us');
    prefetchRoute('contact');
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(prefetchCore, { timeout: 1500 });
  } else {
    setTimeout(prefetchCore, 1000);
  }
}

