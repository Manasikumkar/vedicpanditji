import { setPricingData } from '../data/pujaPricing';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fetches the live pricing document and swaps it in. Returns true when new data was applied.
// Any failure keeps the bundled copy, so pages never render empty.
export async function loadLivePricing() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pricing?id=eq.1&select=data`, {
      headers: { apikey: SUPABASE_ANON_KEY },
      cache: 'no-store',
      signal: controller.signal
    });
    if (!res.ok) return false;
    const [row] = await res.json();
    const data = row?.data;
    if (!data?.rateCards || !Array.isArray(data.samagriOptions)) return false;
    setPricingData(data);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
