import {
  VERIFIED_PUJA_PACKAGES,
  OPTIONAL_SAMAGRI_OPTIONS,
  calculateBookingTotal,
  getPackagesForService
} from '../src/data/pujaPackagesData.js';
import { SERVICES } from '../src/data/vedicPanditData.js';

console.log('--- TESTING VEDICPANDITJI BOOKING FLOW & PRICING ---');

// 1. Verify 2-tier packages for core verified pujas
const verifiedKeys = Object.keys(VERIFIED_PUJA_PACKAGES);
console.log('Verified puja keys:', verifiedKeys);

verifiedKeys.forEach(slug => {
  const pkgs = VERIFIED_PUJA_PACKAGES[slug];
  if (pkgs.length !== 2) {
    throw new Error(`Expected exactly 2 packages for ${slug}, found ${pkgs.length}`);
  }
  const [pkgA, pkgB] = pkgs;
  if (!pkgA.name.includes('Package A') || !pkgB.name.includes('Package B')) {
    throw new Error(`Package names for ${slug} must be Package A and Package B`);
  }
  if (pkgA.inclusions.length > 3 || pkgB.inclusions.length > 3) {
    throw new Error(`Inclusions for ${slug} should be concise (max 3)`);
  }
});
console.log('✓ All verified pujas have exactly 2 simplified packages with max 3 inclusions');

// 2. Test calculateBookingTotal with Package A (Ritual Only) + Hawan Samagri (+950)
const gpPkgs = VERIFIED_PUJA_PACKAGES['griha-pravesh'];
const gpPkgA = gpPkgs[0]; // ₹3,500
const calcA = calculateBookingTotal(gpPkgA, ['opt-havan-samagri']);
console.log('Package A + Hawan Samagri:', calcA);
if (calcA.basePrice !== 3500 || calcA.extrasPrice !== 950 || calcA.totalPrice !== 4450) {
  throw new Error(`Price calculation failed for Package A + Hawan Samagri: expected 4450, got ${calcA.totalPrice}`);
}
console.log('✓ Package A + Hawan Samagri calculates accurately to ₹4,450');

// 3. Test calculateBookingTotal with Package B (duplicate prevention)
const gpPkgB = gpPkgs[1]; // ₹5,500 (already includes Hawan Samagri)
const calcB = calculateBookingTotal(gpPkgB, ['opt-havan-samagri']);
console.log('Package B + Hawan Samagri (Duplicate Prevention):', calcB);
if (calcB.basePrice !== 5500 || calcB.extrasPrice !== 0 || calcB.totalPrice !== 5500) {
  throw new Error(`Duplicate charge prevention failed for Package B: expected extras 0, got ${calcB.extrasPrice}`);
}
console.log('✓ Duplicate charge prevented when item is already included in Package B');

// 4. Test unpriced item (Flowers - market rate)
const calcWithFlowers = calculateBookingTotal(gpPkgA, ['opt-flowers']);
console.log('Package A + Flowers (Unpriced item):', calcWithFlowers);
if (!calcWithFlowers.hasUnconfirmedPrices || !calcWithFlowers.displayString.includes('custom item(s) to be confirmed')) {
  throw new Error(`Unpriced item handling failed: ${calcWithFlowers.displayString}`);
}
console.log('✓ Unconfirmed items transparently flagged without inventing rates');

// 5. Test fallback for unverified custom puja
const unverifiedService = SERVICES.find(s => s.id === 'satyanarayan-puja') || { name: 'Katha' };
const fallbackPkgs = getPackagesForService({ name: 'Navchandi Yagya' }, 'Pune');
console.log('Unverified Service Packages:', fallbackPkgs.map(p => ({ name: p.name, price: p.priceDisplay })));
if (fallbackPkgs[0].priceDisplay !== 'Custom Quote') {
  throw new Error(`Unverified service should show Custom Quote, got: ${fallbackPkgs[0].priceDisplay}`);
}
console.log('✓ Unverified services display Custom Quote honestly');

console.log('\nALL PRICING & BOOKING INTEGRITY TESTS PASSED!');
