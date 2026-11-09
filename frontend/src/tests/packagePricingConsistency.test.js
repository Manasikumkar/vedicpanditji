import { test } from 'node:test';
import assert from 'node:assert/strict';
import pricingData from '../data/pricing.json' with { type: 'json' };
import {
  getPujaPricing,
  getPricingDisplay,
  getPackagesForService,
  getOptionalSamagriOptions,
  calculateBookingTotal,
  setPricingData
} from '../data/pujaPricing.js';

test('1. Base ceremony pricing matches official business numbers', () => {
  const rateCards = pricingData.rateCards;
  assert.equal(rateCards['griha-pravesh'].minPrice, 11000);
  assert.equal(rateCards['satyanarayan-puja'].minPrice, 4100);
  assert.equal(rateCards['vivah-marriage'].minPrice, 21000);
  assert.equal(rateCards['vastu-shanti-puja'].minPrice, 21000);
  assert.equal(rateCards['rudra-havan'].minPrice, 11000);
  assert.equal(rateCards['akhand-ramayan-path'].minPrice, 35000);
  assert.equal(rateCards['bhoomi-puja'].minPrice, 5000);
  assert.equal(rateCards['maha-mrityunjaya-jaap'].minPrice, 111000);
});

test('2. Every service has exactly two standardized packages (118 total packages across 59 ceremonies)', () => {
  const rateCards = pricingData.rateCards;
  const serviceIds = Object.keys(rateCards);
  assert.equal(serviceIds.length, 59, 'Exactly 59 services must exist');

  let totalPackages = 0;
  serviceIds.forEach(serviceId => {
    const card = rateCards[serviceId];
    assert.equal(card.packages?.length, 2, `${serviceId} must have exactly 2 packages`);
    totalPackages += card.packages.length;

    const [pkgA, pkgB] = card.packages;
    assert.equal(pkgA.name.en, 'Package A — Ritual Only', `${serviceId} Package 0 must be named Package A — Ritual Only`);
    assert.equal(pkgB.name.en, 'Package B — Ritual + Samagri', `${serviceId} Package 1 must be named Package B — Ritual + Samagri`);
    assert.equal(pkgA.tier, 'standard');
    assert.equal(pkgB.tier, 'popular');
    assert.deepEqual(pkgA.includedSamagriIds, [], `${serviceId} Package A must have 0 included samagri`);
    assert.ok(pkgB.includedSamagriIds.length > 0, `${serviceId} Package B must have bundled samagri items`);
  });

  assert.equal(totalPackages, 118, 'Total package definitions must equal exactly 59 * 2 = 118');
});

test('3. Package A prices match approved base ceremony dakshina', () => {
  const rateCards = pricingData.rateCards;
  Object.keys(rateCards).forEach(serviceId => {
    const card = rateCards[serviceId];
    const pkg0 = card.packages[0];
    assert.equal(pkg0.indicativePrice, card.minPrice, `${serviceId} Package A price must equal minPrice`);
  });
});

test('4. Package B price equals Base Dakshina + sum of bundled Samagri items', () => {
  const rateCards = pricingData.rateCards;
  const samagriMap = new Map((pricingData.samagriOptions || []).map(s => [s.id, s.price || 0]));

  Object.keys(rateCards).forEach(serviceId => {
    const card = rateCards[serviceId];
    const pkgB = card.packages[1];
    const samagriTotal = (pkgB.includedSamagriIds || []).reduce((sum, id) => sum + (samagriMap.get(id) || 0), 0);

    if (card.minPrice !== null && typeof card.minPrice === 'number') {
      const expectedTotal = card.minPrice + samagriTotal;
      assert.equal(pkgB.indicativePrice, expectedTotal, `${serviceId} Package B price must equal minPrice + samagriTotal`);
      assert.ok(pkgB.priceDisplay.includes(expectedTotal.toLocaleString('en-IN')), `${serviceId} priceDisplay must reflect total`);
      // Option 1 validation: maxPrice is auto-tied to Package B (Ritual + Samagri)
      assert.equal(card.maxPrice, expectedTotal, `${serviceId} maxPrice must equal Package B indicativePrice`);
      assert.ok(card.maxPrice > card.minPrice, `${serviceId} maxPrice must exceed minPrice`);
    } else {
      assert.equal(pkgB.indicativePrice, null, `${serviceId} Package B price must be null for custom quote`);
      assert.equal(pkgB.priceDisplay, 'Custom Quote');
      assert.equal(card.maxPrice, null, `${serviceId} maxPrice must be null for custom quote`);
    }
  });
});

test('5. Zero inverted package prices across all 59 rate cards', () => {
  const rateCards = pricingData.rateCards;
  const inversions = [];

  Object.keys(rateCards).forEach(serviceId => {
    const card = rateCards[serviceId];
    (card.packages || []).forEach((pkg, idx) => {
      if (pkg.indicativePrice !== null && card.minPrice !== null && pkg.indicativePrice < card.minPrice) {
        inversions.push(`${serviceId} pkg[${idx}] "${pkg.name.en}": price ${pkg.indicativePrice} < base ${card.minPrice}`);
      }
    });
  });

  assert.deepEqual(inversions, [], 'No package price may be less than the ceremony base dakshina');
});

test('6. Griha Pravesh package pricing is consistent and fully resolved', () => {
  const gpCard = pricingData.rateCards['griha-pravesh'];
  const pkgA = gpCard.packages[0];
  const pkgB = gpCard.packages[1];

  assert.equal(pkgA.name.en, 'Package A — Ritual Only');
  assert.equal(pkgA.indicativePrice, 11000);
  assert.equal(pkgA.priceDisplay, '₹11,000*');

  assert.equal(pkgB.name.en, 'Package B — Ritual + Samagri');
  // 11,000 base + 3,000 hawan samagri kit = 14,000
  assert.equal(pkgB.indicativePrice, 14000);
  assert.equal(pkgB.priceDisplay, '₹14,000*');
  assert.ok(pkgB.priceNote.en.includes('11,000'));
  assert.deepEqual(pkgB.includedSamagriIds, ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']);
});

test('7. Duplicate charge prevention when item is already bundled in package', () => {
  const gpCard = pricingData.rateCards['griha-pravesh'];
  const pkgB = gpCard.packages[1]; // has includedSamagriIds: ['opt-havan-samagri', 'opt-cow-ghee', 'opt-complete-kit']

  // If a devotee selects opt-havan-samagri in extras, it must NOT be double-charged
  const result = calculateBookingTotal(pkgB, ['opt-havan-samagri']);
  assert.equal(result.extrasPrice, 0, 'Bundled samagri must not add to extrasPrice');
});

test('8. Samagri catalog items have quantities, units, and active verified prices', () => {
  const samagri = pricingData.samagriOptions;
  assert.equal(samagri.length, 6);
  const expectedSpecs = {
    'opt-havan-samagri': { price: 950, quantity: 1.5, unit: 'kg' },
    'opt-cow-ghee': { price: 550, quantity: 500, unit: 'g' },
    'opt-complete-kit': { price: 1500, quantity: 1, unit: 'box' },
    'opt-flowers': { price: 450, quantity: 1, unit: 'set' },
    'opt-fruits': { price: 350, quantity: 5, unit: 'types' },
    'opt-coconut': { price: 200, quantity: 2, unit: 'pcs' },
  };

  samagri.forEach(opt => {
    assert.equal(opt.isPriceVerified, true, `${opt.id} must have isPriceVerified: true`);
    assert.equal(opt.isActive, true, `${opt.id} must have isActive: true`);
    assert.equal(opt.price, expectedSpecs[opt.id].price, `${opt.id} price must match expected baseline`);
    assert.equal(opt.quantity, expectedSpecs[opt.id].quantity, `${opt.id} quantity must match spec`);
    assert.equal(opt.unit, expectedSpecs[opt.id].unit, `${opt.id} unit must match spec`);
    assert.ok(opt.priceDisplay.includes('₹'), `${opt.id} priceDisplay must format rupee amount`);
  });
});

test('9. Booking total calculation with active extras adds accurately', () => {
  const gpCard = pricingData.rateCards['griha-pravesh'];
  const pkgA = gpCard.packages[0]; // ₹11,000

  // Select an active samagri item: opt-flowers (₹450)
  const calc = calculateBookingTotal(pkgA, ['opt-flowers']);
  assert.equal(calc.basePrice, 11000);
  assert.equal(calc.extrasPrice, 450);
  assert.equal(calc.totalPrice, 11450);
  assert.equal(calc.hasUnconfirmedPrices, false);
  assert.ok(calc.displayString.includes('₹11,450*'));
});

test('10. Package selection returns proper structure with city notes', () => {
  const pkgs = getPackagesForService('griha-pravesh', 'Pune', 'en');
  assert.equal(pkgs.length, 2);
  assert.equal(pkgs[0].name, 'Package A — Ritual Only');
  assert.equal(pkgs[1].name, 'Package B — Ritual + Samagri');
  assert.ok(pkgs[0].cityNote.includes('Pune'));
});

test('11. Live database pricing overriding static fallback via setPricingData', () => {
  const original = pricingData;
  const clone = JSON.parse(JSON.stringify(original));
  clone.rateCards['griha-pravesh'].packages[0].indicativePrice = 12500;
  clone.rateCards['griha-pravesh'].packages[0].priceDisplay = '₹12,500*';

  setPricingData(clone);
  const updated = getPricingDisplay('griha-pravesh', 'en');
  assert.equal(updated.packages[0].indicativePrice, 12500);

  // Restore original
  setPricingData(original);
  const restored = getPricingDisplay('griha-pravesh', 'en');
  assert.equal(restored.packages[0].indicativePrice, 11000);
});

test('12. Zero Harivara references across all rate cards and notes', () => {
  const jsonStr = JSON.stringify(pricingData).toLowerCase();
  assert.equal(jsonStr.includes('harivara'), false, 'Zero occurrences of Harivara permitted');
});
