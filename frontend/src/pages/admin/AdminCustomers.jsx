import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import StatusBadge from './components/StatusBadge';
import {
  Search,
  Eye,
  Clock,
  CalendarCheck,
  Shield,
  X
} from 'lucide-react';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Devotee History Modal
  const [selectedDevotee, setSelectedDevotee] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [maskContact, setMaskContact] = useState(true);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCustomers();
      if (res && res.data) {
        setCustomers(res.data);
      }
    } catch (err) {
      console.error('Error loading devotees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleOpenDevoteeHistory = async (phone) => {
    setLoadingDetails(true);
    setSelectedDevotee({ phone, loading: true });
    try {
      const res = await adminApi.getCustomerDetails(phone);
      if (res && res.data) {
        setSelectedDevotee(res.data);
      }
    } catch (err) {
      console.error('Error fetching devotee history:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.phone && c.phone.includes(q)) ||
      (c.city && c.city.toLowerCase().includes(q))
    );
  });

  const formatMaskedPhone = (phone) => {
    if (!phone) return '—';
    if (!maskContact) return phone;
    const clean = phone.trim();
    if (clean.length < 6) return clean;
    return `${clean.slice(0, 4)}••••${clean.slice(-3)}`;
  };

  return (
    <div>
      {/* Controls Bar */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="admin-search-wrap" style={{ maxWidth: '380px' }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search Devotees by Name, Phone, or City..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setMaskContact(!maskContact)}
              className="admin-btn admin-btn-outline admin-btn-sm"
              title="Toggle phone number masking for privacy"
            >
              <Shield size={13} color="#BD4B23" />
              <span>{maskContact ? 'Unhide Contact Details' : 'Mask Contact Details'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Devotee Directory ({filteredCustomers.length})</h2>
          <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
            Records aggregated strictly from genuine enquiries & confirmed bookings
          </span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Devotee Name</th>
                <th>Primary Contact</th>
                <th>City & Address</th>
                <th>Gotra</th>
                <th>Total Enquiries</th>
                <th>Confirmed Bookings</th>
                <th style={{ textAlign: 'right' }}>History</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    Loading devotee registry...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    No devotee records found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((dev) => (
                  <tr key={dev.phone}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{dev.name}</div>
                      {dev.isDevelopmentFixture && (
                        <span style={{ fontSize: '0.65rem', color: '#D97706', fontWeight: 600 }}>
                          [DEV FIXTURE]
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontWeight: 500 }}>
                        {formatMaskedPhone(dev.phone)}
                      </div>
                    </td>
                    <td>
                      <div>{dev.city}</div>
                      {dev.address && (
                        <div style={{ fontSize: '0.75rem', color: '#838A82', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {dev.address}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: dev.gotra ? '#1C1E1B' : '#838A82' }}>
                        {dev.gotra || 'Not Specified'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{dev.enquiryCount}</span>
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 600,
                          color: dev.bookingCount > 0 ? '#047857' : '#838A82'
                        }}
                      >
                        {dev.bookingCount}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenDevoteeHistory(dev.phone)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        <Eye size={13} />
                        <span>Inspect Timeline</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Devotee History Modal */}
      {selectedDevotee && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedDevotee(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Devotee Record: {selectedDevotee.name || 'Devotee'}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
                  Contact: {selectedDevotee.phone} • Gotra: {selectedDevotee.gotra || 'Not provided'}
                </span>
              </div>
              <button
                onClick={() => setSelectedDevotee(null)}
                className="admin-btn admin-btn-outline admin-btn-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              {loadingDetails ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#838A82' }}>
                  Loading timeline history...
                </div>
              ) : (
                <div>
                  {/* Summary Header */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      background: '#FAF8F5',
                      padding: '14px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#838A82', textTransform: 'uppercase' }}>Primary City</div>
                      <div style={{ fontWeight: 600 }}>{selectedDevotee.city}</div>
                      <div style={{ fontSize: '0.8rem', color: '#575D56', marginTop: '2px' }}>
                        {selectedDevotee.address || 'No street address on record'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#838A82', textTransform: 'uppercase' }}>Ceremony Summary</div>
                      <div style={{ fontWeight: 600 }}>
                        {selectedDevotee.enquiries?.length || 0} Enquiries Submitted • {selectedDevotee.bookings?.length || 0} Bookings Recorded
                      </div>
                    </div>
                  </div>

                  {/* Enquiries Timeline */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 600, color: '#1C1E1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} color="#BD4B23" />
                      <span>Associated Enquiries</span>
                    </h4>

                    {selectedDevotee.enquiries && selectedDevotee.enquiries.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedDevotee.enquiries.map((enq) => (
                          <div
                            key={enq.id}
                            style={{
                              padding: '12px 14px',
                              background: '#FFFFFF',
                              border: '1px solid #EAE5D9',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600 }}>
                                #{enq.id} — {enq.serviceName}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#575D56' }}>
                                Requested Date: {enq.requestedDate || 'TBD'} • Package: {enq.packageName}
                              </div>
                            </div>
                            <StatusBadge status={enq.status} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: '#838A82', fontSize: '0.85rem', fontStyle: 'italic' }}>
                        No standalone enquiry records.
                      </div>
                    )}
                  </div>

                  {/* Bookings Timeline */}
                  <div>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 600, color: '#1C1E1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CalendarCheck size={15} color="#059669" />
                      <span>Associated Bookings</span>
                    </h4>

                    {selectedDevotee.bookings && selectedDevotee.bookings.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedDevotee.bookings.map((bkg) => (
                          <div
                            key={bkg.id}
                            style={{
                              padding: '12px 14px',
                              background: '#FFFFFF',
                              border: '1px solid #EAE5D9',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 600 }}>
                                #{bkg.id} — {bkg.serviceName}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#575D56' }}>
                                Ceremony: {bkg.ceremonyDate} ({bkg.ceremonyTime}) • Pandit: {bkg.assignedPanditName || 'Pending'}
                              </div>
                            </div>
                            <StatusBadge status={bkg.status} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: '#838A82', fontSize: '0.85rem', fontStyle: 'italic' }}>
                        No formal bookings have been confirmed yet for this devotee.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedDevotee(null)}
                className="admin-btn admin-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
