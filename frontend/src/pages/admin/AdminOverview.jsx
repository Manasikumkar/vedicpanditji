import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/adminApi';
import StatusBadge from './components/StatusBadge';
import {
  Inbox,
  CalendarCheck,
  Clock,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function AdminOverview({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getDashboardStats();
      if (res && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      {/* Dev Fixture Alert Banner */}
      <div className="admin-dev-banner">
        <div className="admin-dev-banner-text">
          <AlertTriangle size={18} color="#D97706" />
          <span>
            <strong>Development Fixture Mode:</strong> Displaying safe development fixtures. No Supabase credentials have been connected yet. All updates remain local and safe.
          </span>
        </div>
        <button
          onClick={loadStats}
          className="admin-btn admin-btn-outline admin-btn-sm"
          title="Refresh dashboard metrics"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">Total Enquiries</span>
            <div className="admin-stat-icon-wrap" style={{ background: '#EFF6FF', color: '#2563EB' }}>
              <Inbox size={20} />
            </div>
          </div>
          <div className="admin-stat-value">{stats ? stats.totalEnquiries : '—'}</div>
          <div className="admin-stat-meta">All-time received enquiries</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">New & Pending Review</span>
            <div className="admin-stat-icon-wrap" style={{ background: '#FFFBEB', color: '#D97706' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="admin-stat-value" style={{ color: '#BD4B23' }}>
            {stats ? stats.newEnquiries + stats.pendingEnquiries : '—'}
          </div>
          <div className="admin-stat-meta">
            {stats ? `${stats.newEnquiries} New, ${stats.pendingEnquiries} in coordination` : 'Awaiting action'}
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">Confirmed Bookings</span>
            <div className="admin-stat-icon-wrap" style={{ background: '#ECFDF5', color: '#059669' }}>
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="admin-stat-value" style={{ color: '#047857' }}>
            {stats ? stats.confirmedBookings : '—'}
          </div>
          <div className="admin-stat-meta">Explicitly verified & assigned</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-label">Upcoming Ceremonies</span>
            <div className="admin-stat-icon-wrap" style={{ background: '#FAF5FF', color: '#9333EA' }}>
              <Sparkles size={20} />
            </div>
          </div>
          <div className="admin-stat-value">{stats ? stats.upcomingCeremonies : '—'}</div>
          <div className="admin-stat-meta">Scheduled Shubh Muhurats</div>
        </div>
      </div>

      {/* Two Column Section: Recent Enquiries & Recent Booking Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '24px' }}>
        {/* Recent Enquiries */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Enquiries</h2>
            <button
              onClick={() => onNavigate('enquiries')}
              className="admin-btn admin-btn-outline admin-btn-sm"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Enquiry ID</th>
                  <th>Devotee</th>
                  <th>Puja Service</th>
                  <th>City</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats && stats.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                  stats.recentEnquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{enq.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{enq.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{enq.customerPhone}</div>
                      </td>
                      <td>{enq.serviceName}</td>
                      <td>{enq.city}</td>
                      <td>
                        <StatusBadge status={enq.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#838A82' }}>
                      No recent enquiries recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bookings Activity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Booking Activity</h2>
            <button
              onClick={() => onNavigate('bookings')}
              className="admin-btn admin-btn-outline admin-btn-sm"
            >
              <span>Manage Bookings</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Devotee</th>
                  <th>Ceremony Date</th>
                  <th>Assigned Pandit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats && stats.recentBookings && stats.recentBookings.length > 0 ? (
                  stats.recentBookings.map((bkg) => (
                    <tr key={bkg.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{bkg.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{bkg.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{bkg.city}</div>
                      </td>
                      <td>
                        <div>{bkg.ceremonyDate || 'Date TBD'}</div>
                        <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{bkg.ceremonyTime}</div>
                      </td>
                      <td>{bkg.assignedPanditName || 'Pending Allocation'}</td>
                      <td>
                        <StatusBadge status={bkg.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#838A82' }}>
                      No recent bookings activity.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
