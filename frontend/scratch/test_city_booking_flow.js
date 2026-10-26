import { SERVICES, SEO_LANDING_PAGES } from '../src/data/vedicPanditData.js';

console.log('--- TESTING CITY LANDING PAGE TO BOOKING FLOW ---');

// 1. Test Chennai City Page
const chennaiPage = SEO_LANDING_PAGES.find(p => p.slug === 'north-indian-pandit-in-chennai');
console.log('Chennai Page:', { slug: chennaiPage.slug, city: chennaiPage.city, service: chennaiPage.service });

const chennaiCeremonyService = SERVICES.find(s => 
  chennaiPage.service && (
    s.name.toLowerCase() === chennaiPage.service.toLowerCase() ||
    s.name.toLowerCase().includes(chennaiPage.service.toLowerCase()) ||
    chennaiPage.service.toLowerCase().includes(s.name.toLowerCase())
  )
) || null;

console.log('Chennai ceremonyService:', chennaiCeremonyService);
if (chennaiCeremonyService !== null) {
  throw new Error('Chennai page should have null ceremonyService so devotee can select ceremony');
}
console.log('✓ City landing page (Chennai) correctly identifies ceremonyService as null (Step 1 Puja Selection)');

// 2. Test Mumbai City Page
const mumbaiPage = SEO_LANDING_PAGES.find(p => p.slug === 'north-indian-pandit-in-mumbai');
const mumbaiCeremonyService = SERVICES.find(s => 
  mumbaiPage.service && (
    s.name.toLowerCase() === mumbaiPage.service.toLowerCase() ||
    s.name.toLowerCase().includes(mumbaiPage.service.toLowerCase()) ||
    mumbaiPage.service.toLowerCase().includes(s.name.toLowerCase())
  )
) || null;

if (mumbaiCeremonyService !== null) {
  throw new Error('Mumbai page should have null ceremonyService so devotee can select ceremony');
}
console.log('✓ City landing page (Mumbai) correctly identifies ceremonyService as null (Step 1 Puja Selection)');

// 3. Test Specific Ceremony in City Page (Griha Pravesh in Mumbai)
const gpMumbaiPage = SEO_LANDING_PAGES.find(p => p.slug === 'griha-pravesh-puja-in-mumbai');
const gpCeremonyService = SERVICES.find(s => 
  gpMumbaiPage.service && (
    s.name.toLowerCase() === gpMumbaiPage.service.toLowerCase() ||
    s.name.toLowerCase().includes(gpMumbaiPage.service.toLowerCase()) ||
    gpMumbaiPage.service.toLowerCase().includes(s.name.toLowerCase())
  )
) || null;

console.log('Griha Pravesh in Mumbai ceremonyService:', gpCeremonyService?.name);
if (!gpCeremonyService || !gpCeremonyService.name.includes('Griha Pravesh')) {
  throw new Error('Griha Pravesh in Mumbai page should resolve to Griha Pravesh ceremony');
}
console.log('✓ Specific puja landing page directly resolves to that puja ceremony');

console.log('\nALL CITY BOOKING INTEGRITY TESTS PASSED!');
