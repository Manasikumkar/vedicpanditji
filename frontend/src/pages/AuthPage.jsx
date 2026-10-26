import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, User, Lock, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthPage() {
  const { user, setUser, navigateTo, showToast } = useApp();
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    usernameOrEmail: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect to account if already logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      navigateTo('account');
    }
  }, [user, navigateTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'forgot') {
      showToast('Password reset link sent to your registered email address!');
      setMode('login');
      return;
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match. Please re-enter.', 'error');
      return;
    }

    const displayName = mode === 'register' 
      ? (formData.name || 'Devotee') 
      : (formData.usernameOrEmail.includes('@') ? formData.usernameOrEmail.split('@')[0] : (formData.usernameOrEmail || 'Devotee'));

    const loggedInUser = {
      isLoggedIn: true,
      name: displayName,
      email: formData.email || (formData.usernameOrEmail.includes('@') ? formData.usernameOrEmail : `${displayName.toLowerCase().replace(/\s+/g, '')}@vedicpanditji.com`),
      phone: formData.phone || '',
      city: 'Pune',
      gotra: 'Shandilya / Kashyap',
      nakshatra: 'Rohini',
      address: 'Pune, Maharashtra'
    };

    setUser(loggedInUser);
    showToast(mode === 'login' ? `Namaste ${loggedInUser.name}, welcome back!` : `Account created successfully! Welcome to VedicPanditji.`);
    navigateTo('account');
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '90px', background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div
          className="auth-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '38px',
            border: '1px solid #EAE5D9',
            boxShadow: '0 20px 50px rgba(44, 39, 36, 0.08)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #BD4B23 0%, #C59A3F 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 8px 20px rgba(189, 75, 35, 0.25)'
              }}
            >
              <Sparkles size={24} />
            </div>

            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#BD4B23', display: 'block', marginBottom: '4px' }}>
              VedicPanditji Devotee Portal
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-main)' }}>
              {mode === 'login' && 'Devotee Sign In'}
              {mode === 'register' && 'Create Devotee Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h1>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {mode === 'login' && 'Sign in to access your puja booking enquiries, Shubh Muhurat updates, and assigned Panditji.'}
              {mode === 'register' && 'Join thousands of devotees booking authentic Hindi & Sanskrit Vedic ceremonies across India.'}
              {mode === 'forgot' && 'Enter your registered email address or username to receive password reset instructions.'}
            </p>
          </div>

          {/* Mode Switch Tabs (Elementor Style matching live site) */}
          {mode !== 'forgot' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: '#F5F2EB',
                padding: '4px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}
            >
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: mode === 'login' ? '#FFFFFF' : 'transparent',
                  color: mode === 'login' ? '#BD4B23' : '#6E6B65',
                  boxShadow: mode === 'login' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: mode === 'register' ? '#FFFFFF' : 'transparent',
                  color: mode === 'register' ? '#BD4B23' : '#6E6B65',
                  boxShadow: mode === 'register' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Register
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Full Devotee Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FDFCF9'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'login' ? (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Username or Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    required
                    value={formData.usernameOrEmail}
                    onChange={e => setFormData({ ...formData, usernameOrEmail: e.target.value })}
                    placeholder="Username or your@email.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FDFCF9'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="devotee@vedicpanditji.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FDFCF9'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Mobile Number (for WhatsApp Shubh Muhurat coordination) *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FDFCF9'
                    }}
                  />
                </div>
              </div>
            )}

            {mode !== 'forgot' && (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Password *
                  </label>
                  {mode === 'login' && (
                    <span
                      onClick={() => setMode('forgot')}
                      style={{ fontSize: '12px', color: '#BD4B23', cursor: 'pointer', fontWeight: 700 }}
                    >
                      Lost your password?
                    </span>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FDFCF9'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Confirm Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid #D8D2C4',
                      fontSize: '14px',
                      outline: 'none',
                      background: '#FDFCF9'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                />
                <label htmlFor="remember-me" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Remember Me
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '14px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <span>
                {mode === 'login' && 'Sign In to VedicPanditji'}
                {mode === 'register' && 'Register Devotee Account'}
                {mode === 'forgot' && 'Send Password Reset Link'}
              </span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Trust Guarantees */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: '#FDFCF9',
              border: '1px solid #EAE5D9',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}
          >
            <ShieldCheck size={18} color="#BD4B23" style={{ flexShrink: 0 }} />
            <span>Official VedicPanditji Account • Verified Pathashala Priests • Direct WhatsApp Shubh Muhurat</span>
          </div>

          {/* Mode switch */}
          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)', borderTop: '1px solid #EAE5D9', paddingTop: '16px' }}>
            {mode === 'login' ? (
              <span>
                Don't have an account yet?{' '}
                <strong
                  onClick={() => setMode('register')}
                  style={{ color: '#BD4B23', cursor: 'pointer' }}
                >
                  Register Now
                </strong>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <strong
                  onClick={() => setMode('login')}
                  style={{ color: '#BD4B23', cursor: 'pointer' }}
                >
                  Sign In Here
                </strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
