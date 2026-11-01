import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../admin/supabaseClient';
import LoginForm from '../admin/LoginForm';
import ServiceEditor from '../admin/ServiceEditor';
import SamagriEditor from '../admin/SamagriEditor';
import { setIn, countMissingTranslations, errorTarget } from '../admin/pricingDoc';
import '../admin/admin.css';

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);
  const [doc, setDoc] = useState(null);
  const [saved, setSaved] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'ok' | 'error', text }
  const [busy, setBusy] = useState(false);
  const [lang, setLang] = useState('all');
  const [tab, setTab] = useState('services');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('pricing').select('data').eq('id', 1).single();
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    setDoc(data.data);
    setSaved(data.data);
    setSelectedId((id) => id || Object.keys(data.data.rateCards)[0]);
  }, []);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : '';
  };

  const save = async () => {
    setBusy(true);
    setMessage(null);
    const { data, error } = await supabase.from('pricing').update({ data: doc }).eq('id', 1).select('data').single();
    setBusy(false);
    if (error) {
      // PGRST116: the update matched no row, which row-level security does for non-admins.
      const text = error.code === 'PGRST116' ? 'Not saved: this account is not an admin.' : error.message;
      setMessage({ type: 'error', text });
      const target = errorTarget(error.message);
      if (target) {
        setTab(target.tab);
        if (target.serviceId) setSelectedId(target.serviceId);
      }
      return;
    }
    setDoc(data.data);
    setSaved(data.data);
    setMessage({ type: 'ok', text: 'Saved. The live site shows it now; the rebuild finishes in a few minutes.' });
  };

  const revert = async () => {
    const { data, error } = await supabase
      .from('pricing_history')
      .select('data')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) {
      setMessage({ type: 'error', text: error ? error.message : 'No earlier version exists yet.' });
      return;
    }
    setDoc(data.data);
    setMessage({ type: 'ok', text: 'Previous version loaded. Review it, then click Save to apply.' });
  };

  if (!ready) return <p className="admin-note">Loading…</p>;
  if (!supabase) return <p className="admin-note">Supabase is not configured (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).</p>;
  if (!session) return <LoginForm onLogin={login} />;
  if (!doc) return <p className="admin-note">{message ? message.text : 'Loading pricing…'}</p>;

  const dirty = JSON.stringify(doc) !== JSON.stringify(saved);
  const missing = countMissingTranslations(doc);
  const q = query.trim().toLowerCase();
  const ids = Object.keys(doc.rateCards).filter(
    (id) => !q || id.includes(q) || doc.rateCards[id].serviceName.en.toLowerCase().includes(q)
  );
  const card = doc.rateCards[selectedId];

  return (
    <div className="admin">
      <header className="admin-bar">
        <strong>Pricing admin</strong>
        <span className="muted">{session.user.email}</span>
        <label>
          Language{' '}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="all">All</option>
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>
        </label>
        <span className="muted">Missing: HI {missing.hi}, MR {missing.mr}</span>
        <span className="spacer" />
        <button type="button" onClick={revert} disabled={busy}>Load previous version</button>
        <button type="button" className="primary" onClick={save} disabled={busy || !dirty}>
          {busy ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
        </button>
        <button type="button" onClick={() => supabase.auth.signOut()}>Log out</button>
      </header>

      {message && <p className={message.type === 'error' ? 'admin-error' : 'admin-ok'}>{message.text}</p>}

      <nav className="admin-tabs">
        <button type="button" className={tab === 'services' ? 'active' : ''} onClick={() => setTab('services')}>Services</button>
        <button type="button" className={tab === 'samagri' ? 'active' : ''} onClick={() => setTab('samagri')}>Samagri add-ons</button>
      </nav>

      {tab === 'services' ? (
        <div className="admin-body">
          <aside className="admin-list">
            <input placeholder="Search services" value={query} onChange={(e) => setQuery(e.target.value)} />
            {ids.map((id) => (
              <button type="button" key={id} className={id === selectedId ? 'active' : ''} onClick={() => setSelectedId(id)}>
                {doc.rateCards[id].serviceName.en}
              </button>
            ))}
          </aside>
          <section className="admin-form">
            {card && (
              <ServiceEditor
                card={card}
                samagri={doc.samagriOptions}
                lang={lang}
                onChange={(next) => setDoc(setIn(doc, ['rateCards', selectedId], next))}
              />
            )}
          </section>
        </div>
      ) : (
        <section className="admin-form">
          <SamagriEditor items={doc.samagriOptions} lang={lang} onChange={(items) => setDoc({ ...doc, samagriOptions: items })} />
        </section>
      )}
    </div>
  );
}
