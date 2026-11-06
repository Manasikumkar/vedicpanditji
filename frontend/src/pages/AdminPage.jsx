import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Flame,
  Layers,
  ShoppingBag,
  History,
  ExternalLink,
  Languages,
  Save,
  RotateCcw,
  LogOut,
  Search,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronRight
} from 'lucide-react';
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
  const [lang, setLang] = useState('en');
  const [tab, setTab] = useState('services'); // 'services' | 'samagri' | 'history'
  const [serviceSubTab, setServiceSubTab] = useState('details');
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
    const docData = data.data;
    if (docData?.rateCards) {
      // Auto-reconcile services with defined prices and Option 1 maxPrice
      Object.keys(docData.rateCards).forEach((id) => {
        const c = docData.rateCards[id];
        if (c.minPrice && c.minPrice > 0) {
          if (!c.isBusinessApproved) {
            c.isBusinessApproved = true;
            c.approvalStatus = 'approved';
          }
          if (c.packages && c.packages[1]?.indicativePrice && c.maxPrice !== c.packages[1].indicativePrice) {
            c.maxPrice = c.packages[1].indicativePrice;
          }
        }
      });
    }
    setDoc(docData);
    setSaved(docData);
    setSelectedId((id) => id || Object.keys(docData.rateCards)[0]);
  }, []);

  const userId = session?.user?.id;
  useEffect(() => {
    if (userId) load();
  }, [userId, load]);

  const dirty = useMemo(() => (doc && saved ? JSON.stringify(doc) !== JSON.stringify(saved) : false), [doc, saved]);
  const missing = useMemo(() => (doc ? countMissingTranslations(doc) : { hi: 0, mr: 0 }), [doc]);

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
    if (dirty && !window.confirm('Discard your unsaved changes and load the previous saved version?')) return;
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

  const edit = (next) => {
    setDoc(next);
    setMessage(null);
  };

  // Auto-propagation: When Samagri prices change in SamagriEditor, recalculate all bundled Package B prices
  const handleSamagriChange = (newSamagriItems) => {
    const priceMap = {};
    newSamagriItems.forEach((item) => {
      priceMap[item.id] = typeof item.price === 'number' ? item.price : 0;
    });

    const updatedRateCards = { ...doc.rateCards };
    let rateCardsChanged = false;

    Object.keys(updatedRateCards).forEach((serviceId) => {
      const card = updatedRateCards[serviceId];
      if (!card || !card.packages) return;

      let packagesChanged = false;
      const nextPackages = card.packages.map((pkg) => {
        const samagriIds = pkg.includedSamagriIds || [];
        if (samagriIds.length > 0 && typeof card.minPrice === 'number') {
          const samagriTotal = samagriIds.reduce((sum, id) => sum + (priceMap[id] || 0), 0);
          const calculatedPrice = card.minPrice + samagriTotal;
          if (pkg.indicativePrice !== calculatedPrice) {
            packagesChanged = true;
            return {
              ...pkg,
              indicativePrice: calculatedPrice,
              priceDisplay: `₹${calculatedPrice.toLocaleString('en-IN')}*`
            };
          }
        }
        return pkg;
      });

      if (packagesChanged) {
        rateCardsChanged = true;
        const newMaxPrice = nextPackages[1]?.indicativePrice ?? card.maxPrice;
        updatedRateCards[serviceId] = {
          ...card,
          maxPrice: newMaxPrice,
          packages: nextPackages
        };
      }
    });

    edit({
      ...doc,
      samagriOptions: newSamagriItems,
      ...(rateCardsChanged ? { rateCards: updatedRateCards } : {})
    });
  };

  if (!ready) {
    return (
      <div className="admin-status-screen">
        <div className="admin-status-card">
          <Loader2 className="admin-spinner" size={32} />
          <p>Initializing admin session…</p>
        </div>
      </div>
    );
  }

  if (!supabase) {
    const rawUrl = import.meta.env.VITE_SUPABASE_URL;
    const isBadUrl = typeof rawUrl === 'string' && rawUrl.length > 0 && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://');
    return (
      <div className="admin-status-screen">
        <div className="admin-status-card">
          <AlertCircle size={36} color="#BD4B23" />
          <h3>{isBadUrl ? 'Invalid Supabase URL in .env' : 'Supabase Configuration Required'}</h3>
          <p>
            {isBadUrl ? (
              <>
                <code>VITE_SUPABASE_URL</code> in <code>frontend/.env</code> must be a valid URL starting with <code>https://</code> (e.g. <code>https://your-project-ref.supabase.co</code>). It was set to an API key instead of the Project URL.
              </>
            ) : (
              <>
                Please configure <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your environment to access the pricing administration portal.
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  if (!session) return <LoginForm onLogin={login} />;

  if (!doc) {
    return (
      <div className="admin-status-screen">
        <div className="admin-status-card">
          {message ? (
            <>
              <AlertCircle size={36} color="#DC2626" />
              <h3>Failed to Load Pricing</h3>
              <p className="admin-error-text">{message.text}</p>
              <button type="button" className="btn-primary" onClick={load}>Retry</button>
            </>
          ) : (
            <>
              <Loader2 className="admin-spinner" size={32} />
              <p>Loading ceremony rate cards…</p>
            </>
          )}
        </div>
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const ids = Object.keys(doc.rateCards).filter(
    (id) => !q || id.includes(q) || doc.rateCards[id].serviceName.en.toLowerCase().includes(q)
  );
  const card = doc.rateCards[selectedId];

  // Calculated Stats
  const totalPoojasCount = Object.keys(doc.rateCards).length;
  const totalSamagriCount = doc.samagriOptions.length;

  return (
    <div className="admin-app-root no-sidebar">
      {/* 1. Top Navbar: Brand & Utility Actions (Cleaned - tabs moved below) */}
      <header className="admin-navbar-full">
        <div className="navbar-left">
          {/* Brand Logo & Name */}
          <div className="navbar-brand">
            <img
              src="/images/vedicpanditji-logo.png"
              alt="VedicPanditji"
              className="navbar-brand-logo"
            />
            <span className="brand-badge-tag">ADMIN</span>
          </div>
          <span className="navbar-portal-subtitle">Pooja Services &amp; Pricing Portal</span>
        </div>

        <div className="navbar-right">
          {/* View Website Link */}
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn-view-site">
            <ExternalLink size={13} />
            <span>View Website</span>
          </a>

          {/* Segmented Language View Switcher */}
          <div className="admin-lang-segmented" role="tablist" aria-label="Language view">
            <button
              type="button"
              className={`lang-segment-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              title="Edit in English (default active website language)"
            >
              English (EN)
            </button>
            <button
              type="button"
              className={`lang-segment-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => setLang('hi')}
              title="Edit Hindi translations (falls back to English when empty)"
            >
              हिन्दी (HI)
            </button>
            <button
              type="button"
              className={`lang-segment-btn ${lang === 'mr' ? 'active' : ''}`}
              onClick={() => setLang('mr')}
              title="Edit Marathi translations (falls back to English when empty)"
            >
              मराठी (MR)
            </button>
            <button
              type="button"
              className={`lang-segment-btn ${lang === 'all' ? 'active' : ''}`}
              onClick={() => setLang('all')}
              title="View all 3 languages simultaneously"
            >
              All 3 Langs
            </button>
          </div>

          {/* Professional Translation Status Pill */}
          <div
            className="admin-translation-status"
            title={`English is 100% active on live website. Hindi & Marathi are in draft (${missing.hi} pending) and fall back to English automatically.`}
          >
            <span className="status-live-dot" />
            <span className="status-live-text">EN Active (100%)</span>
            <span className="status-divider">·</span>
            <span className="status-draft-text">HI/MR Draft</span>
          </div>

          {/* User Avatar & Logout */}
          <div className="user-profile-menu">
            <div className="user-avatar" title={session.user.email}>
              {session.user.email.charAt(0).toUpperCase()}
            </div>
            <button
              type="button"
              className="btn-logout"
              onClick={() => supabase.auth.signOut()}
              title="Sign out of administration portal"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Global Alert Notification Banner */}
      {message && (
        <div className={`admin-alert-banner ${message.type === 'error' ? 'alert-error' : 'alert-ok'}`}>
          {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* 3. Section Navigation Strip (Replacing old 4 summary boxes below navbar) */}
      <div className="admin-sections-strip">
        <div className="sections-tabs-cluster">
          <button
            type="button"
            className={`section-tab-item ${tab === 'services' ? 'active' : ''}`}
            onClick={() => { setTab('services'); setServiceSubTab('details'); }}
          >
            <Layers size={16} />
            <span>Pooja Services</span>
            <span className="tab-count-badge">{totalPoojasCount}</span>
          </button>

          <button
            type="button"
            className={`section-tab-item ${tab === 'samagri' ? 'active' : ''}`}
            onClick={() => setTab('samagri')}
          >
            <ShoppingBag size={16} />
            <span>Add-on Samagri</span>
            <span className="tab-count-badge">{totalSamagriCount}</span>
          </button>

          <button
            type="button"
            className={`section-tab-item ${tab === 'history' ? 'active' : ''}`}
            onClick={() => setTab('history')}
          >
            <History size={16} />
            <span>Version History</span>
          </button>
        </div>

        <div className="sections-strip-status">
          <span className="live-indicator-dot"></span>
          <span>Live &amp; Synchronized</span>
        </div>
      </div>

      {/* 4. Main Body Workspace */}
      <main className="admin-content-pane full-width">
        {tab === 'services' && (
          <div className="services-dual-layout">
            {/* Left Column: List of all 59 Poojas */}
            <div className="services-column-list">
              <div className="services-search-header">
                <div className="search-input-box">
                  <Search size={15} className="search-icon" />
                  <input
                    placeholder="Search 59 pooja services..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="services-items-scroll">
                {ids.map((id) => {
                  const svc = doc.rateCards[id];
                  const isSelected = id === selectedId;
                  return (
                    <button
                      type="button"
                      key={id}
                      className={`service-card-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedId(id)}
                    >
                      <div className="service-card-left">
                        <div className="service-card-icon">
                          <Flame size={15} />
                        </div>
                        <div className="service-card-text">
                          <div className="service-card-title">{svc.serviceName.en}</div>
                          <div className="service-card-sub">
                            {svc.packages && svc.packages.length > 0 ? `${svc.packages.length} Packages` : svc.model}
                          </div>
                        </div>
                      </div>

                      <div className="service-card-right">
                        {svc.isBusinessApproved || svc.approvalStatus === 'approved' ? (
                          <span className="status-badge published">Published</span>
                        ) : (
                          <span className="status-badge draft">Review</span>
                        )}
                        <ChevronRight size={14} className="arrow-icon" />
                      </div>
                    </button>
                  );
                })}
                {ids.length === 0 && (
                  <div className="services-empty-state">No poojas found matching "{query}"</div>
                )}
              </div>
            </div>

            {/* Right Column: Management of the Selected Pooja (Details, Rates, Packages, Notes, Preview) */}
            <div className="services-column-editor">
              {card && (
                <ServiceEditor
                  card={card}
                  samagri={doc.samagriOptions}
                  lang={lang}
                  activeSection={serviceSubTab}
                  onSectionChange={setServiceSubTab}
                  onSave={save}
                  isDirty={dirty}
                  isSaving={busy}
                  onChange={(next) => edit(setIn(doc, ['rateCards', selectedId], next))}
                />
              )}
            </div>
          </div>
        )}

        {tab === 'samagri' && (
          <div className="single-section-pane">
            <SamagriEditor
              items={doc.samagriOptions}
              lang={lang}
              onChange={handleSamagriChange}
              onSave={save}
              isDirty={dirty}
              isSaving={busy}
            />
          </div>
        )}

        {tab === 'history' && (
          <div className="single-section-pane">
            <div className="history-control-card">
              <div className="history-header">
                <div className="history-icon-circle">
                  <History size={24} color="#BD4B23" />
                </div>
                <div>
                  <h3>Pricing Version Control &amp; Rollback</h3>
                  <p>Every time you save changes, the previous version is archived in Supabase <code>pricing_history</code>.</p>
                </div>
              </div>

              <div className="history-actions-row">
                <div className="history-status-item">
                  <span className="label">Current Status:</span>
                  <span className={`status-pill ${dirty ? 'dirty' : 'clean'}`}>
                    {dirty ? 'Unsaved Local Edits' : 'Synchronized with Database'}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-rollback"
                  onClick={revert}
                  disabled={busy}
                >
                  <RotateCcw size={15} />
                  <span>Revert to Last Saved Version</span>
                </button>
              </div>

              <div className="history-info-box">
                <h4>How deployment sync works:</h4>
                <ol>
                  <li>Clicking <strong>Save Changes</strong> writes the JSON document directly to Supabase PostgreSQL.</li>
                  <li>Row-Level Security (RLS) validates that only authorized admin accounts can modify pricing.</li>
                  <li>Supabase PostgreSQL triggers automatically recompute display strings (INR format) and update history.</li>
                  <li>A database webhook triggers a background build on Vercel so all 152 pre-rendered HTML static pages reflect new prices.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
