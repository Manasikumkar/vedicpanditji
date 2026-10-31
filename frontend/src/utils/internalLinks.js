// Internal Linking Engine for VedicPanditji
// Generates contextual, high-value internal links between:
// Services <-> Locations <-> Puja Guides <-> Core Hubs
// Prevents orphan pages and enforces clean site architecture

import { ALL_LOCATIONS, getLocationBySlug, getParentLocations } from '../data/locations';
import { PUJA_GUIDES_DATA, getGuideBySlug } from '../data/guides/pujaGuidesData';
import { ALL_POOJA_SERVICES } from '../data/allPoojaServices';

/**
 * Returns related educational guides for a specific service
 */
export function getRelatedGuidesForService(serviceId) {
  if (!serviceId) return PUJA_GUIDES_DATA.slice(0, 3);

  const matched = PUJA_GUIDES_DATA.filter(g => 
    g.relatedServiceId === serviceId ||
    g.slug.includes(serviceId) ||
    serviceId.includes(g.category)
  );

  if (matched.length > 0) return matched.slice(0, 3);
  return PUJA_GUIDES_DATA.slice(0, 3);
}

/**
 * Returns top locations where a specific puja is most frequently performed
 */
export function getTopLocationsForService() {
  const prioritySlugs = [
    'pandit-in-pune',
    'pandit-in-pcmc',
    'pandit-in-wakad',
    'pandit-in-baner',
    'pandit-in-hinjawadi',
    'pandit-in-kothrud',
    'pandit-in-kharadi',
    'pandit-in-pimple-saudagar'
  ];

  return prioritySlugs
    .map(slug => getLocationBySlug(slug))
    .filter(Boolean);
}

/**
 * Returns related services for a specific guide
 */
export function getRelatedServiceForGuide(guide) {
  if (!guide) return null;
  if (guide.relatedServiceId) {
    return ALL_POOJA_SERVICES.find(s => s.id === guide.relatedServiceId) || ALL_POOJA_SERVICES[0];
  }
  return ALL_POOJA_SERVICES[0];
}

/**
 * Returns related guides for a guide (same category or popular)
 */
export function getRelatedGuidesForGuide(currentSlug) {
  const current = getGuideBySlug(currentSlug);
  if (!current) return PUJA_GUIDES_DATA.slice(0, 3);

  const sameCat = PUJA_GUIDES_DATA.filter(g => g.slug !== current.slug && g.category === current.category);
  if (sameCat.length >= 3) return sameCat.slice(0, 3);

  const others = PUJA_GUIDES_DATA.filter(g => g.slug !== current.slug && g.category !== current.category);
  return [...sameCat, ...others].slice(0, 3);
}

/**
 * Generates breadcrumb array for any route type
 */
export function generateBreadcrumbs(type, item) {
  const crumbs = [{ name: 'Home', url: '/' }];

  if (type === 'service') {
    crumbs.push({ name: 'Ceremonies', url: '/services' });
    if (item && item.name) {
      crumbs.push({ name: item.name, url: `/services/${item.id || item.slug}` });
    }
  } else if (type === 'location') {
    crumbs.push({ name: 'Locations', url: '/locations/pandit-in-pune' });
    if (item) {
      if (!item.isParentHub && item.parentCity) {
        const parentSlug = item.parentSlug || (item.parentCity.includes('PCMC') ? 'pandit-in-pcmc' : 'pandit-in-pune');
        crumbs.push({ name: item.parentCity, url: `/locations/${parentSlug}` });
      }
      crumbs.push({ name: item.name, url: `/locations/${item.slug}` });
    }
  } else if (type === 'guide') {
    crumbs.push({ name: 'Puja Guides', url: '/puja-guides' });
    if (item) {
      crumbs.push({ name: item.categoryName || 'Guide', url: `/puja-guides?category=${item.category || 'all'}` });
      crumbs.push({ name: item.title, url: `/puja-guides/${item.slug}` });
    }
  } else if (type === 'page') {
    if (item && item.title) {
      crumbs.push({ name: item.title, url: item.url || '/' });
    }
  }

  return crumbs;
}
