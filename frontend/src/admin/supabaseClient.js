import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

function initClient() {
  if (!url || !key) return null;
  if (!url.startsWith('http://') && !url.startsWith('https://')) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

export const supabase = initClient();
