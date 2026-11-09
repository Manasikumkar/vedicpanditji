import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const message = await onLogin(email, password);
    if (message) setError(message);
    setBusy(false);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <img src="/images/vedicpanditji-logo.png" alt="VedicPanditji" />
          </div>
          <div className="admin-badge-pill">
            <ShieldCheck size={14} />
            <span>Admin Portal</span>
          </div>
          <h2>Administration Login</h2>
          <p>Sign in to manage puja pricing, packages, and multilingual translations</p>
        </div>

        <form className="admin-login-form" onSubmit={submit}>
          {error && (
            <div className="admin-error">
              <span>{error}</span>
            </div>
          )}

          <div className="admin-input-group">
            <label htmlFor="admin-email">Email Address</label>
            <div className="admin-input-box">
              <Mail size={16} className="admin-input-icon" />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@vedicpanditji.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input-box">
              <Lock size={16} className="admin-input-icon" />
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="admin-login-btn" disabled={busy}>
            <span>{busy ? 'Authenticating…' : 'Sign In'}</span>
            {!busy && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="admin-login-footer">
          <span>Protected by Supabase Auth &amp; PostgreSQL RLS</span>
        </div>
      </div>
    </div>
  );
}
