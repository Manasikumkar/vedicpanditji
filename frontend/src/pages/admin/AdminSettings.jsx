import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'roles' | 'supabase'

  return (
    <div>
      {/* Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('account')}
          className={`admin-btn ${activeTab === 'account' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Administrator Profile
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`admin-btn ${activeTab === 'roles' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Role & Permission Matrix
        </button>
        <button
          onClick={() => setActiveTab('supabase')}
          className={`admin-btn ${activeTab === 'supabase' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Supabase Integration Readiness
        </button>
      </div>

      {activeTab === 'account' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Current Administrator Session</h2>
            <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
              Authentication & Authorization Layer
            </span>
          </div>

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#BD4B23',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 700
                }}
              >
                VP
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Vedic Ceremony Coordinator
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#575D56' }}>
                  coordinator@vedicpanditji.com
                </div>
                <div style={{ display: 'inline-block', marginTop: '4px', padding: '2px 8px', background: '#FAF8F5', border: '1px solid #EAE5D9', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#BD4B23' }}>
                  Role: Ceremony Coordinator & Acharya Liaison
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', background: '#FAF8F5', padding: '18px', borderRadius: '10px', border: '1px solid #EAE5D9', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#838A82', textTransform: 'uppercase' }}>Session Auth Mode</div>
                <div style={{ fontWeight: 600, color: '#1C1E1B', marginTop: '2px' }}>
                  Bearer Token Verification (Dev Environment)
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#838A82', textTransform: 'uppercase' }}>Database Backend</div>
                <div style={{ fontWeight: 600, color: '#D97706', marginTop: '2px' }}>
                  Safe Development Mode (Awaiting Supabase)
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#838A82', textTransform: 'uppercase' }}>Security Level</div>
                <div style={{ fontWeight: 600, color: '#047857', marginTop: '2px' }}>
                  Strict Backend Validation & Auth Guard
                </div>
              </div>
            </div>

            <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px', padding: '14px 18px', fontSize: '0.85rem', color: '#92400E' }}>
              <strong>Security Policy:</strong> In compliance with security standards, credentials and passwords are never exposed in the UI or hardcoded in client source files. Full production authentication will bind directly to Supabase Auth when credentials are provided.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Role & Permission Architecture</h2>
            <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
              Role-Based Access Control (RBAC) foundation ready for Supabase Auth JWT claims
            </span>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Description</th>
                  <th>Enquiries & Bookings</th>
                  <th>Quotation Verification</th>
                  <th>Puja Services Catalog</th>
                  <th>Pricing & Samagri</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, color: '#BD4B23' }}>Super Admin</span>
                  </td>
                  <td>Senior Acharya & Technology Lead</td>
                  <td>Full Access (Read/Write)</td>
                  <td>Full Access (Approve & Confirm)</td>
                  <td>Full Access (Edit & Publish)</td>
                  <td>Full Access (Rates & Verification)</td>
                </tr>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, color: '#047857' }}>Ceremony Coordinator</span>
                  </td>
                  <td>Direct Pandit Coordination Team</td>
                  <td>Manage & Update Lifecycle</td>
                  <td>Record Verified Rates</td>
                  <td>View Only</td>
                  <td>View Only</td>
                </tr>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, color: '#2563EB' }}>Senior Acharya</span>
                  </td>
                  <td>Vedic Lineage & Shastra Advisors</td>
                  <td>Inspect Ceremony Details</td>
                  <td>Consult on Shastra Vidhi</td>
                  <td>Suggest Vidhi Edits</td>
                  <td>View Only</td>
                </tr>
                <tr>
                  <td>
                    <span style={{ fontWeight: 700, color: '#7C3AED' }}>Finance & Billing</span>
                  </td>
                  <td>Dakshina Reconciliation</td>
                  <td>View Confirmed Bookings</td>
                  <td>Reconcile Quoted Dakshina</td>
                  <td>No Access</td>
                  <td>View Rates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'supabase' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Supabase Database Integration Readiness</h2>
            <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
              Preparation checklist for production PostgreSQL deployment
            </span>
          </div>

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px' }}>
                <CheckCircle2 size={20} color="#047857" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#047857' }}>
                    1. SQL Migration Schema Prepared
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#065F46', marginTop: '2px' }}>
                    Version-controlled schema in <code>backend/migrations/001_initial_schema.sql</code> includes tables (admins, customers, puja_services, puja_packages, optional_samagri, enquiries, bookings, admin_audit_logs), indexes, foreign keys, and Row Level Security (RLS) policies.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px' }}>
                <CheckCircle2 size={20} color="#047857" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#047857' }}>
                    2. Clean Repository & Data-Access Layer
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#065F46', marginTop: '2px' }}>
                    The backend services call <code>dbClient.js</code> with structured async methods. When <code>SUPABASE_URL</code> and keys are provided, it swaps seamlessly to PostgreSQL without frontend code changes.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px' }}>
                <CheckCircle2 size={20} color="#047857" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#047857' }}>
                    3. Environment Configuration Template Created
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#065F46', marginTop: '2px' }}>
                    <code>backend/.env.example</code> defines placeholders for <code>SUPABASE_URL</code>, <code>SUPABASE_ANON_KEY</code>, and <code>SUPABASE_SERVICE_ROLE_KEY</code>.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '8px' }}>
                <AlertTriangle size={20} color="#D97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#D97706' }}>
                    4. Awaiting Supabase Project Credentials
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#92400E', marginTop: '2px' }}>
                    Once you provide your project URL and service role key, paste them into <code>backend/.env</code> and apply the SQL migration script in your Supabase SQL editor. The platform will automatically connect to production PostgreSQL.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
