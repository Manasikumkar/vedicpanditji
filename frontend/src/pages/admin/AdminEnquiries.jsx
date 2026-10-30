import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import StatusBadge from './components/StatusBadge';
import {
  Search,
  Eye,
  CheckCircle2,
  FileText,
  X
} from 'lucide-react';

const STATUS_OPTIONS = [
  'all',
  'New',
  'Under Review',
  'Awaiting Customer Response',
  'Awaiting Panditji Confirmation',
  'Confirmed',
  'Completed',
  'Cancelled'
];

const CITIES = ['all', 'Pune', 'Mumbai', 'Bangalore', 'Delhi-NCR', 'Hyderabad'];

export default function AdminEnquiries({ onNavigate: _onNavigate }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [actionMessage, setActionMessage] = useState(null);
  const [showRawRecord, setShowRawRecord] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getEnquiries({
        status: statusFilter,
        city: cityFilter,
        search: searchTerm
      });
      if (res && res.data) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, cityFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEnquiries();
  };

  const handleOpenDetail = (enq) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status);
    setInternalNotes(enq.adminInternalNotes || '');
    setActionMessage(null);
    setShowRawRecord(false);
  };

  const handleSaveStatusAndNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      const res = await adminApi.updateEnquiryStatus(selectedEnquiry.id, editStatus, internalNotes);
      if (res && res.data) {
        setSelectedEnquiry(res.data);
        setActionMessage('Enquiry status and internal notes saved successfully.');
        loadEnquiries();
      }
    } catch (err) {
      console.error('Error updating enquiry:', err);
    }
  };

  const handlePromoteToBooking = async () => {
    if (!selectedEnquiry) return;
    try {
      const res = await adminApi.convertEnquiryToBooking(selectedEnquiry.id);
      if (res && res.data) {
        setActionMessage(`Enquiry promoted to Formal Booking Request #${res.data.id}!`);
        loadEnquiries();
      }
    } catch (err) {
      console.error('Error promoting enquiry:', err);
    }
  };

  return (
    <div>
      {/* Header & Controls */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          <form onSubmit={handleSearchSubmit} className="admin-filters-bar" style={{ margin: 0 }}>
            <div className="admin-search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by Devotee Name, Phone, Enquiry ID, or Puja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st === 'all' ? 'All Statuses' : st}
                </option>
              ))}
            </select>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="admin-select"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Cities' : c}
                </option>
              ))}
            </select>

            <button type="submit" className="admin-btn admin-btn-primary">
              Filter
            </button>
          </form>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Enquiry Submissions ({enquiries.length})</h2>
          <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
            Pure Enquiry Model: Requires admin verification prior to confirmation
          </span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Enquiry ID</th>
                <th>Devotee Details</th>
                <th>Puja Service & Package</th>
                <th>City & Locality</th>
                <th>Requested Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    Loading enquiries...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    No enquiries match the selected filters.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{enq.id}</span>
                      {enq.isDevelopmentFixture && (
                        <span
                          style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            color: '#D97706',
                            fontWeight: 600
                          }}
                        >
                          [DEV FIXTURE]
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{enq.customerName}</div>
                      <div style={{ fontSize: '0.775rem', color: '#575D56' }}>{enq.customerPhone}</div>
                      {enq.gotra && (
                        <div style={{ fontSize: '0.7rem', color: '#838A82' }}>Gotra: {enq.gotra}</div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{enq.serviceName}</div>
                      <div style={{ fontSize: '0.775rem', color: '#BD4B23' }}>{enq.packageName}</div>
                    </td>
                    <td>
                      <div>{enq.city}</div>
                      {enq.locality && (
                        <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{enq.locality}</div>
                      )}
                    </td>
                    <td>
                      <div>{enq.requestedDate || 'Date TBD'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{enq.timeSlot}</div>
                    </td>
                    <td>
                      <StatusBadge status={enq.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenDetail(enq)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Enquiry Record: {selectedEnquiry.id}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
                  Submitted: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="admin-btn admin-btn-outline admin-btn-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              {actionMessage && (
                <div
                  style={{
                    backgroundColor: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    color: '#047857',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{actionMessage}</span>
                </div>
              )}

              {/* Devotee & Ceremony Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  backgroundColor: '#FAF8F5',
                  padding: '16px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#838A82', margin: '0 0 6px 0' }}>
                    Devotee Information
                  </h4>
                  <div style={{ fontWeight: 600 }}>{selectedEnquiry.customerName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56' }}>Phone: {selectedEnquiry.customerPhone}</div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56' }}>Gotra: {selectedEnquiry.gotra || 'Not provided'}</div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56' }}>Language: {selectedEnquiry.preferredLanguage}</div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56', marginTop: '4px' }}>
                    Address: {selectedEnquiry.address || 'Not specified'}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#838A82', margin: '0 0 6px 0' }}>
                    Ceremony & Package
                  </h4>
                  <div style={{ fontWeight: 600, color: '#BD4B23' }}>{selectedEnquiry.serviceName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#1C1E1B', fontWeight: 500 }}>
                    {selectedEnquiry.packageName} ({selectedEnquiry.packagePriceDisplay})
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56' }}>
                    Location: {selectedEnquiry.city} {selectedEnquiry.locality ? `(${selectedEnquiry.locality})` : ''}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56' }}>
                    Requested Date: {selectedEnquiry.requestedDate || 'Date to be calculated'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#575D56' }}>
                    Time Slot: {selectedEnquiry.timeSlot}
                  </div>
                  {selectedEnquiry.needMuhuratConsult && (
                    <div style={{ fontSize: '0.75rem', color: '#C2410C', fontWeight: 600, marginTop: '4px' }}>
                      ✨ Devotee requested Muhurat Astrology Consultation
                    </div>
                  )}
                </div>
              </div>

              {/* Devotee Notes */}
              {selectedEnquiry.customerNotes && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Devotee Special Notes:
                  </label>
                  <div style={{ padding: '10px 14px', background: '#FFFFFF', border: '1px solid #EAE5D9', borderRadius: '8px', fontSize: '0.85rem' }}>
                    "{selectedEnquiry.customerNotes}"
                  </div>
                </div>
              )}

              {/* Status Update Control */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1E1B', display: 'block', marginBottom: '6px' }}>
                  Enquiry Status Workflow:
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="admin-select"
                  style={{ width: '100%' }}
                >
                  <option value="New">New (Recently submitted)</option>
                  <option value="Under Review">Under Review (Coordinator checking Panditji availability)</option>
                  <option value="Awaiting Customer Response">Awaiting Customer Response (Quotation/Muhurat sent)</option>
                  <option value="Awaiting Panditji Confirmation">Awaiting Panditji Confirmation (Senior Acharya verbal hold)</option>
                  <option value="Confirmed">Confirmed (Explicitly verified)</option>
                  <option value="Completed">Completed (Ceremony performed)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Internal Admin Notes */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C1E1B', display: 'block', marginBottom: '6px' }}>
                  Internal Administrative Notes (Not visible to customer):
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record verification call details, assigned Acharya name, or muhurat findings..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #EAE5D9',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Toggle Raw JSON Record */}
              <div style={{ marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowRawRecord(!showRawRecord)}
                  className="admin-btn admin-btn-outline admin-btn-sm"
                >
                  <FileText size={13} />
                  <span>{showRawRecord ? 'Hide Raw Record' : 'View Raw Original Record'}</span>
                </button>

                {showRawRecord && (
                  <pre
                    style={{
                      background: '#1C1E1B',
                      color: '#F4EFE6',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      overflowX: 'auto',
                      marginTop: '8px'
                    }}
                  >
                    {JSON.stringify(selectedEnquiry, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={handlePromoteToBooking}
                className="admin-btn admin-btn-secondary"
                title="Convert this enquiry into a formal Booking Request in the Bookings section"
              >
                <Sparkles size={14} color="#BD4B23" />
                <span>Promote to Booking Request</span>
              </button>

              <button
                type="button"
                onClick={handleSaveStatusAndNotes}
                className="admin-btn admin-btn-primary"
              >
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
