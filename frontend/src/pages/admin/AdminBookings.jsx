import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import StatusBadge from './components/StatusBadge';
import {
  Search,
  IndianRupee,
  ShieldCheck,
  Edit,
  X,
  CheckCircle2
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

export default function AdminBookings() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'requests' | 'confirmed'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');

  // Quotation State
  const [verifiedDakshina, setVerifiedDakshina] = useState('');
  const [verifiedSamagriCost, setVerifiedSamagriCost] = useState('');
  const [totalQuotedAmount, setTotalQuotedAmount] = useState('');
  const [isPriceVerified, setIsPriceVerified] = useState(false);
  const [quotationNotes, setQuotationNotes] = useState('');

  // Pandit Allocation & Confirmation State
  const [panditName, setPanditName] = useState('');
  const [panditPhone, setPanditPhone] = useState('');
  const [ceremonyDate, setCeremonyDate] = useState('');
  const [ceremonyTime, setCeremonyTime] = useState('');
  const [confirmationNotes, setConfirmationNotes] = useState('');

  const [notification, setNotification] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getBookings({
        type: activeTab === 'all' ? undefined : activeTab,
        status: statusFilter,
        city: cityFilter,
        search: searchTerm
      });
      if (res && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [activeTab, statusFilter, cityFilter]);

  const handleOpenModal = (bkg) => {
    setSelectedBooking(bkg);
    setEditStatus(bkg.status);
    setStatusReason('');

    setVerifiedDakshina(bkg.verifiedDakshina || '');
    setVerifiedSamagriCost(bkg.verifiedSamagriCost || '');
    setTotalQuotedAmount(bkg.totalQuotedAmount || '');
    setIsPriceVerified(Boolean(bkg.isPriceVerified));
    setQuotationNotes(bkg.quotationNotes || '');

    setPanditName(bkg.assignedPanditName || '');
    setPanditPhone(bkg.assignedPanditPhone || '');
    setCeremonyDate(bkg.ceremonyDate || '');
    setCeremonyTime(bkg.ceremonyTime || '');
    setConfirmationNotes(bkg.confirmationNotes || '');

    setNotification(null);
  };

  const handleSaveStatus = async () => {
    if (!selectedBooking) return;
    try {
      const res = await adminApi.updateBookingStatus(selectedBooking.id, editStatus, statusReason);
      if (res && res.data) {
        setSelectedBooking(res.data);
        setNotification({
          type: 'success',
          text: `Booking status updated to "${editStatus}". Explicit confirmation recorded.`
        });
        loadBookings();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSaveQuotation = async () => {
    if (!selectedBooking) return;
    try {
      const quotePayload = {
        verifiedDakshina: verifiedDakshina ? Number(verifiedDakshina) : null,
        verifiedSamagriCost: verifiedSamagriCost ? Number(verifiedSamagriCost) : null,
        totalQuotedAmount: totalQuotedAmount ? Number(totalQuotedAmount) : null,
        isPriceVerified: Boolean(isPriceVerified),
        quotationNotes
      };
      const res = await adminApi.recordBookingQuotation(selectedBooking.id, quotePayload);
      if (res && res.data) {
        setSelectedBooking(res.data);
        setNotification({
          type: 'success',
          text: 'Verified quotation recorded and locked to record.'
        });
        loadBookings();
      }
    } catch (err) {
      console.error('Error recording quotation:', err);
    }
  };

  const handleConfirmAllocation = async () => {
    if (!selectedBooking) return;
    if (!panditName.trim()) {
      alert('Assigned Panditji name is required to confirm allocation.');
      return;
    }
    try {
      const allocPayload = {
        assignedPanditName: panditName,
        assignedPanditPhone: panditPhone,
        ceremonyDate,
        ceremonyTime,
        confirmationNotes
      };
      const res = await adminApi.confirmBookingAllocation(selectedBooking.id, allocPayload);
      if (res && res.data) {
        setSelectedBooking(res.data);
        setEditStatus('Confirmed');
        setNotification({
          type: 'success',
          text: `Explicit Confirmation Logged: Pandit ${panditName} allocated and ceremony confirmed.`
        });
        loadBookings();
      }
    } catch (err) {
      console.error('Error confirming allocation:', err);
    }
  };

  return (
    <div>
      {/* Sub-Tabs: Requests vs Confirmed */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('all')}
          className={`admin-btn ${activeTab === 'all' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          All Ceremonies ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`admin-btn ${activeTab === 'requests' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Booking Requests (In Coordination)
        </button>
        <button
          onClick={() => setActiveTab('confirmed')}
          className={`admin-btn ${activeTab === 'confirmed' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Confirmed Bookings Only
        </button>
      </div>

      {/* Filters Bar */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px' }}>
          <div className="admin-filters-bar" style={{ margin: 0 }}>
            <div className="admin-search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by Booking ID, Devotee Name, or Ceremony..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadBookings()}
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
              <option value="all">All Cities</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi-NCR">Delhi-NCR</option>
            </select>

            <button onClick={loadBookings} className="admin-btn admin-btn-secondary">
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Bookings Registry</h2>
          <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
            Bookings are only confirmed through explicit administrative verification
          </span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Devotee</th>
                <th>Puja & Package</th>
                <th>City & Venue</th>
                <th>Ceremony Date & Muhurat</th>
                <th>Assigned Pandit</th>
                <th>Verified Dakshina</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    No bookings found in this view.
                  </td>
                </tr>
              ) : (
                bookings.map((bkg) => (
                  <tr key={bkg.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{bkg.id}</span>
                      {bkg.isDevelopmentFixture && (
                        <span style={{ display: 'block', fontSize: '0.65rem', color: '#D97706', fontWeight: 600 }}>
                          [DEV FIXTURE]
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{bkg.customerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#575D56' }}>{bkg.customerPhone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{bkg.serviceName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#BD4B23' }}>{bkg.packageName}</div>
                    </td>
                    <td>
                      <div>{bkg.city}</div>
                      <div style={{ fontSize: '0.75rem', color: '#838A82', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {bkg.venueAddress}
                      </div>
                    </td>
                    <td>
                      <div>{bkg.ceremonyDate || 'Date TBD'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{bkg.ceremonyTime}</div>
                    </td>
                    <td>
                      {bkg.assignedPanditName ? (
                        <div style={{ fontWeight: 500, color: '#047857' }}>
                          {bkg.assignedPanditName}
                        </div>
                      ) : (
                        <span style={{ color: '#838A82', fontStyle: 'italic', fontSize: '0.8rem' }}>
                          Pending Allocation
                        </span>
                      )}
                    </td>
                    <td>
                      {bkg.isPriceVerified && bkg.totalQuotedAmount ? (
                        <div style={{ fontWeight: 600, color: '#047857' }}>
                          ₹{bkg.totalQuotedAmount.toLocaleString('en-IN')}
                          <span style={{ display: 'block', fontSize: '0.65rem', color: '#059669' }}>
                            ✓ Verified Rate
                          </span>
                        </div>
                      ) : (
                        <div style={{ color: '#D97706', fontSize: '0.8rem' }}>
                          {bkg.totalQuotedAmount ? `₹${bkg.totalQuotedAmount}*` : 'Custom Quote'}
                          <span style={{ display: 'block', fontSize: '0.65rem', color: '#838A82' }}>
                            Unverified
                          </span>
                        </div>
                      )}
                    </td>
                    <td>
                      <StatusBadge status={bkg.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenModal(bkg)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        <Edit size={13} />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Action & Quotation Modal */}
      {selectedBooking && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedBooking(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Manage Ceremony Booking: {selectedBooking.id}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
                  {selectedBooking.serviceName} • {selectedBooking.customerName}
                </span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="admin-btn admin-btn-outline admin-btn-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              {notification && (
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
                  <span>{notification.text}</span>
                </div>
              )}

              {/* SECTION 1: Status Lifecycle Transition */}
              <div
                style={{
                  backgroundColor: '#FAF8F5',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #EAE5D9',
                  marginBottom: '20px'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 600, color: '#1C1E1B' }}>
                  1. Explicit Status Transition
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Ceremony Lifecycle Status:
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="admin-select"
                      style={{ width: '100%' }}
                    >
                      <option value="New">New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Awaiting Customer Response">Awaiting Customer Response</option>
                      <option value="Awaiting Panditji Confirmation">Awaiting Panditji Confirmation</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Reason / Transition Note:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Verbal hold placed with Acharya"
                      value={statusReason}
                      onChange={(e) => setStatusReason(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '9px 12px' }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSaveStatus} className="admin-btn admin-btn-secondary admin-btn-sm">
                    Update Status
                  </button>
                </div>
              </div>

              {/* SECTION 2: Verified Quotation Form */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #EAE5D9',
                  marginBottom: '20px'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 600, color: '#1C1E1B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IndianRupee size={16} color="#BD4B23" />
                  <span>2. Verified Quotation (Dakshina & Samagri)</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Verified Dakshina (₹):
                    </label>
                    <input
                      type="number"
                      placeholder="3500"
                      value={verifiedDakshina}
                      onChange={(e) => setVerifiedDakshina(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Verified Samagri (₹):
                    </label>
                    <input
                      type="number"
                      placeholder="2000"
                      value={verifiedSamagriCost}
                      onChange={(e) => setVerifiedSamagriCost(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Total Quoted Amount (₹):
                    </label>
                    <input
                      type="number"
                      placeholder="5500"
                      value={totalQuotedAmount}
                      onChange={(e) => setTotalQuotedAmount(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px', fontWeight: 600 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                    <input
                      type="checkbox"
                      checked={isPriceVerified}
                      onChange={(e) => setIsPriceVerified(e.target.checked)}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span>Mark price as formally verified (Never displays unverified rates as confirmed)</span>
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Quotation notes (e.g., includes pure Desi Cow Ghee kit and fruit basket)"
                    value={quotationNotes}
                    onChange={(e) => setQuotationNotes(e.target.value)}
                    className="admin-search-input"
                    style={{ padding: '8px 12px', width: '100%' }}
                  />
                </div>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSaveQuotation} className="admin-btn admin-btn-secondary admin-btn-sm">
                    Save Verified Quotation
                  </button>
                </div>
              </div>

              {/* SECTION 3: Panditji Allocation & Explicit Confirmation */}
              <div
                style={{
                  backgroundColor: '#F0FDF4',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #BBF7D0'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 600, color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} />
                  <span>3. Panditji Allocation & Confirmation Details</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Assigned Senior Panditji / Acharya:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pandit Radheshyam Shastri"
                      value={panditName}
                      onChange={(e) => setPanditName(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Panditji Phone:
                    </label>
                    <input
                      type="text"
                      placeholder="+91 97668 80979"
                      value={panditPhone}
                      onChange={(e) => setPanditPhone(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Confirmed Date:
                    </label>
                    <input
                      type="date"
                      value={ceremonyDate}
                      onChange={(e) => setCeremonyDate(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#575D56', display: 'block', marginBottom: '4px' }}>
                      Confirmed Muhurat Time:
                    </label>
                    <input
                      type="text"
                      placeholder="08:00 AM - 11:00 AM (Shubh Chaughadiya)"
                      value={ceremonyTime}
                      onChange={(e) => setCeremonyTime(e.target.value)}
                      className="admin-search-input"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Confirmation notes (e.g. Verified with devotee and Panditji via phone call)"
                    value={confirmationNotes}
                    onChange={(e) => setConfirmationNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #BBF7D0',
                      fontSize: '0.85rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleConfirmAllocation} className="admin-btn admin-btn-primary">
                    <CheckCircle2 size={14} />
                    <span>Confirm Booking & Allocate Panditji</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
