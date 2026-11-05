import { isText } from '../utils/localize.js';

export const emptyText = () => ({ en: '', hi: '', mr: '' });

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
