import { isText } from '../utils/localize.js';
import packageInclusionTranslations from '../i18n/packageInclusionTranslations.json' with { type: 'json' };
import { SERVICE_TRANSLATIONS } from '../i18n/contentTranslations.js';

export const emptyText = () => ({ en: '', hi: '', mr: '' });

// Lookup standardized Marathi & Hindi translation for any English admin text (inclusions, exclusions, packages, notes)
export function lookupAdminTranslation(text, lang) {
  if (!text || typeof text !== 'string' || lang === 'en') return text || '';
  const trimmed = text.trim();

  // 1. Inclusions & Exclusions dictionary lookup
  if (packageInclusionTranslations[trimmed]?.[lang]) {
    return packageInclusionTranslations[trimmed][lang];
  }

  // 2. Package Names
  if (trimmed.includes('Package A')) {
    return lang === 'mr' ? 'पॅकेज A — फक्त पूजा दक्षिणा' : 'पैकेज A — केवल पूजा दक्षिणा';
  }
  if (trimmed.includes('Package B')) {
    return lang === 'mr' ? 'पॅकेज B — दक्षिणा + संपूर्ण साहित्य' : 'पैकेज B — दक्षिणा + संपूर्ण सामग्री';
  }

  // 3. Badges
  if (trimmed.includes('Devotee Arranges')) {
    return lang === 'mr' ? 'यजमान सामग्रीची व्यवस्था करतात' : 'यजमान सामग्री की व्यवस्था करते हैं';
  }
  if (trimmed.includes('Most Popular')) {
    return lang === 'mr' ? 'सर्वाधिक लोकप्रिय (साहित्य किट समाविष्ट)' : 'सर्वाधिक लोकप्रिय (सामग्री किट सम्मिलित)';
  }

  // 4. Price notes
  if (trimmed.includes('Devotee prepares samagri')) {
    return lang === 'mr' ? 'संपूर्ण पूजेसाठी पंडित दक्षिणा (यजमान साहित्य आणतात)' : 'सम्पूर्ण पूजा हेतु पंडित दक्षिणा (यजमान सामग्री लाते हैं)';
  }
  if (trimmed.includes('Pure Hawan Samagri & Desi Ghee included')) {
    const amtMatch = trimmed.match(/₹[\d,]+\*/);
    const amt = amtMatch ? amtMatch[0] : '';
    return lang === 'mr'
      ? `पंडित दक्षिणा ${amt} + शुद्ध हवन साहित्य व देशी तूप समाविष्ट`
      : `पंडित दक्षिणा ${amt} + शुद्ध हवन सामग्री एवं देशी घी सम्मिलित`;
  }
  if (trimmed.includes('Complete Dry Puja Samagri Kit included')) {
    const amtMatch = trimmed.match(/₹[\d,]+\*/);
    const amt = amtMatch ? amtMatch[0] : '';
    return lang === 'mr'
      ? `पंडित दक्षिणा ${amt} + संपूर्ण पूजा साहित्य किट समाविष्ट`
      : `पंडित दक्षिणा ${amt} + संपूर्ण पूजा सामग्री किट सम्मिलित`;
  }

  // 5. Card / Pricing Notes
  if (trimmed.includes('Proposed rate card')) {
    return lang === 'mr' ? 'प्रस्तावित दर सूची (अधिकृत पुष्टी प्रलंबित)' : 'प्रस्तावित दर सूची (व्यावसायिक पुष्टि प्रतीक्षित)';
  }
  if (trimmed.includes('Indicative starting dakshina')) {
    return lang === 'mr' ? 'अंदाजे सुरुवातीची दक्षिणा (प्रकल्प माहिती)' : 'सांकेतिक प्रारंभिक दक्षिणा (परियोजना डेटा)';
  }
  if (trimmed.includes('Proposed fixed dakshina')) {
    return lang === 'mr' ? 'प्रस्तावित निश्चित दक्षिणा (अधिकृत पुष्टी प्रलंबित)' : 'प्रस्तावित निश्चित दक्षिणा (व्यावसायिक पुष्टि प्रतीक्षित)';
  }
  if (trimmed.includes('Approved ceremony rate card')) {
    return lang === 'mr' ? 'मंजूर विधी दर सूची' : 'स्वीकृत अनुष्ठान दर सूची';
  }

  return '';
}

// Auto-enrich doc rateCards and packages so nothing is ever empty in Marathi / Hindi
export function enrichDocTranslations(docData) {
  if (!docData || !docData.rateCards) return docData;
  for (const [id, card] of Object.entries(docData.rateCards)) {
    if (SERVICE_TRANSLATIONS[id]?.name) {
      if (!card.serviceName.hi) card.serviceName.hi = SERVICE_TRANSLATIONS[id].name.hi;
      if (!card.serviceName.mr) card.serviceName.mr = SERVICE_TRANSLATIONS[id].name.mr;
    }
    if (!card.pricingNote?.hi) card.pricingNote.hi = lookupAdminTranslation(card.pricingNote?.en, 'hi') || 'प्रस्तावित दर सूची (व्यावसायिक पुष्टि प्रतीक्षित)';
    if (!card.pricingNote?.mr) card.pricingNote.mr = lookupAdminTranslation(card.pricingNote?.en, 'mr') || 'प्रस्तावित दर सूची (अधिकृत पुष्टी प्रलंबित)';

    (card.packages || []).forEach((pkg) => {
      if (!pkg.name?.hi) pkg.name.hi = lookupAdminTranslation(pkg.name?.en, 'hi');
      if (!pkg.name?.mr) pkg.name.mr = lookupAdminTranslation(pkg.name?.en, 'mr');

      if (!pkg.badge?.hi) pkg.badge.hi = lookupAdminTranslation(pkg.badge?.en, 'hi');
      if (!pkg.badge?.mr) pkg.badge.mr = lookupAdminTranslation(pkg.badge?.en, 'mr');

      if (!pkg.priceNote?.hi) pkg.priceNote.hi = lookupAdminTranslation(pkg.priceNote?.en, 'hi');
      if (!pkg.priceNote?.mr) pkg.priceNote.mr = lookupAdminTranslation(pkg.priceNote?.en, 'mr');

      (pkg.inclusions || []).forEach((inc) => {
        if (!inc.hi) inc.hi = lookupAdminTranslation(inc.en, 'hi');
        if (!inc.mr) inc.mr = lookupAdminTranslation(inc.en, 'mr');
      });

      (pkg.exclusions || []).forEach((exc) => {
        if (!exc.hi) exc.hi = lookupAdminTranslation(exc.en, 'hi');
        if (!exc.mr) exc.mr = lookupAdminTranslation(exc.en, 'mr');
      });
    });
  }
  return docData;
}

// Immutable deep set: returns a copy of obj with the value at path replaced.
export function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[head] = setIn(obj[head], rest, value);
  return copy;
}

export function moveItem(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

export function nextPackageId(card) {
  const taken = new Set(card.packages.map((p) => p.id));
  let n = card.packages.length + 1;
  while (taken.has(`${card.serviceId}-pkg-${n}`)) n += 1;
  return `${card.serviceId}-pkg-${n}`;
}

// priceDisplay is recomputed by the database trigger, so it starts empty.
export function newPackage(card) {
  return {
    id: nextPackageId(card),
    name: emptyText(),
    tier: 'standard',
    badge: emptyText(),
    indicativePrice: card?.minPrice || null,
    priceDisplay: '',
    priceNote: emptyText(),
    inclusions: [],
    exclusions: [],
    includedSamagriIds: []
  };
}

export function countMissingTranslations(value, counts = { hi: 0, mr: 0 }) {
  if (Array.isArray(value)) {
    value.forEach((v) => countMissingTranslations(v, counts));
  } else if (isText(value)) {
    if (!value.hi) counts.hi += 1;
    if (!value.mr) counts.mr += 1;
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => countMissingTranslations(v, counts));
  }
  return counts;
}

// Database errors look like "pricing rateCards.<id>.packages[0].name.en: ..."
export function errorTarget(message = '') {
  const card = message.match(/rateCards\.([^.\s[]+)/);
  if (card) return { tab: 'services', serviceId: card[1] };
  if (/samagriOptions\[/.test(message)) return { tab: 'samagri' };
  return null;
}
