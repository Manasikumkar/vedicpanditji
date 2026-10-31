// Centralized Location Registry for VedicPanditji Local SEO Engine
import { PARENT_LOCATIONS } from './parentLocations.js';
import { PUNE_LOCALITIES_DATA } from './puneLocalities.js';
import { ADDITIONAL_PUNE_LOCALITIES } from './additionalPuneLocalities.js';
import { PCMC_LOCALITIES_DATA } from './pcmcLocalities.js';
import { ADDITIONAL_PCMC_LOCALITIES } from './additionalPcmcLocalities.js';

export const ALL_LOCATIONS = [
  ...PARENT_LOCATIONS,
  ...PUNE_LOCALITIES_DATA,
  ...ADDITIONAL_PUNE_LOCALITIES,
  ...PCMC_LOCALITIES_DATA,
  ...ADDITIONAL_PCMC_LOCALITIES
];

/**
 * Finds location by slug or alias slug
 */
export function getLocationBySlug(rawSlug) {
  if (!rawSlug) return null;
  const clean = rawSlug.toLowerCase().trim().replace(/^\/locations\//, '').replace(/\/$/, '');
  
  // Exact match on slug
  const matched = ALL_LOCATIONS.find(loc => loc.slug === clean || loc.aliasSlug === clean);
  if (matched) return matched;

  // Check if legacy slug like 'north-indian-pandit-in-pune' matches 'pandit-in-pune'
  const stripped = clean.replace('north-indian-', '').replace('bihari-', '');
  return ALL_LOCATIONS.find(loc => loc.slug === stripped || loc.aliasSlug === stripped) || null;
}

/**
 * Returns parent locations (Pune and PCMC)
 */
export function getParentLocations() {
  return PARENT_LOCATIONS;
}

/**
 * Returns all localities for a specific parent city
 */
export function getLocalitiesByParent(parentCity) {
  return ALL_LOCATIONS.filter(loc => !loc.isParentHub && loc.parentCity === parentCity);
}

/**
 * Returns nearby connected localities for internal linking
 */
export function getNearbyLocations(currentLoc) {
  if (!currentLoc) return [];
  
  if (currentLoc.nearbyLocalitySlugs && currentLoc.nearbyLocalitySlugs.length > 0) {
    return currentLoc.nearbyLocalitySlugs
      .map(slug => ALL_LOCATIONS.find(loc => loc.slug === slug || loc.aliasSlug === slug))
      .filter(Boolean);
  }

  // Fallback to other localities in the same parent city
  return ALL_LOCATIONS
    .filter(loc => loc.slug !== currentLoc.slug && loc.parentCity === currentLoc.parentCity)
    .slice(0, 5);
}

export { PARENT_LOCATIONS, PUNE_LOCALITIES_DATA, ADDITIONAL_PUNE_LOCALITIES, PCMC_LOCALITIES_DATA, ADDITIONAL_PCMC_LOCALITIES };
