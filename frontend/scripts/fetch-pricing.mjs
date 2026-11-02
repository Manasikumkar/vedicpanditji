import fs from 'node:fs';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
const target = new URL('../src/data/pricing.json', import.meta.url);

async function main() {
  if (!url || !key) {
    console.log('fetch-pricing: no Supabase env vars, keeping committed pricing.json');
    return;
  }
  const res = await fetch(`${url}/rest/v1/pricing?id=eq.1&select=data`, {
    headers: { apikey: key },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const [row] = await res.json();
  if (!row?.data?.rateCards || !Array.isArray(row.data.samagriOptions)) {
    throw new Error('unexpected response shape');
  }
  fs.writeFileSync(target, JSON.stringify(row.data, null, 2) + '\n');
  console.log('fetch-pricing: pricing.json updated from Supabase');
}

// A failed refresh must never fail the build: the committed copy is still valid.
main().catch((e) => console.warn(`fetch-pricing: ${e.message}, keeping committed pricing.json`));
