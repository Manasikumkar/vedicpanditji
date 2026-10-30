import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
  X
} from 'lucide-react';

export default function AdminPackages() {
  const [activeSubTab, setActiveSubTab] = useState('packages'); // 'packages' | 'samagri'
  const [packages, setPackages] = useState([]);
  const [samagri, setSamagri] = useState([]);
  const [loading, setLoading] = useState(true);

  // Package Edit Modal
  const [editingPackage, setEditingPackage] = useState(null);
  const [pkgName, setPkgName] = useState('');
  const [pkgTier, setPkgTier] = useState('');
  const [pkgBadge, setPkgBadge] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgPriceDisplay, setPkgPriceDisplay] = useState('');
  const [pkgPriceNote, setPkgPriceNote] = useState('');
  const [pkgIsVerified, setPkgIsVerified] = useState(false);
  const [pkgInclusions, setPkgInclusions] = useState([]);

  // Samagri Edit Modal
  const [editingSamagri, setEditingSamagri] = useState(null);
  const [samName, setSamName] = useState('');
  const [samDesc, setSamDesc] = useState('');
  const [samPrice, setSamPrice] = useState('');
  const [samPriceDisplay, setSamPriceDisplay] = useState('');
  const [samIsVerified, setSamIsVerified] = useState(false);

  const [notification, setNotification] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pkgRes, samRes] = await Promise.all([
        adminApi.getPackages(),
        adminApi.getSamagri()
      ]);
      if (pkgRes && pkgRes.data) setPackages(pkgRes.data);
      if (samRes && samRes.data) setSamagri(samRes.data);
    } catch (err) {
      console.error('Error loading package & samagri data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPkgName(pkg.name);
    setPkgTier(pkg.tier || 'standard');
    setPkgBadge(pkg.badge || '');
    setPkgPrice(pkg.indicativePrice !== null ? String(pkg.indicativePrice) : '');
    setPkgPriceDisplay(pkg.priceDisplay || '');
    setPkgPriceNote(pkg.priceNote || '');
    setPkgIsVerified(Boolean(pkg.isVerified));
    setPkgInclusions([...(pkg.inclusions || [])]);
    setNotification(null);
  };

  const handleSavePackage = async () => {
    if (!editingPackage) return;

    // Safety rule: Never display unverified prices as confirmed rates
    let display = pkgPriceDisplay.trim();
    if (!pkgIsVerified) {
      if (!display.includes('*') && !display.toLowerCase().includes('quote') && !display.toLowerCase().includes('confirmed')) {
        display = `${display}*`;
      }
    }

    const payload = {
      name: pkgName,
      tier: pkgTier,
      badge: pkgBadge,
      indicativePrice: pkgPrice ? Number(pkgPrice) : null,
      priceDisplay: display,
      priceNote: pkgPriceNote,
      isVerified: pkgIsVerified,
      inclusions: pkgInclusions
    };

    try {
      const res = await adminApi.updatePackage(editingPackage.id, payload);
      if (res && res.data) {
        setNotification('Package details and pricing status updated successfully.');
        loadData();
      }
    } catch (err) {
      console.error('Error saving package:', err);
    }
  };

  const handleOpenEditSamagri = (item) => {
    setEditingSamagri(item);
    setSamName(item.name);
    setSamDesc(item.description || '');
    setSamPrice(item.price !== null ? String(item.price) : '');
    setSamPriceDisplay(item.priceDisplay || '');
    setSamIsVerified(Boolean(item.isVerified));
    setNotification(null);
  };

  const handleSaveSamagri = async () => {
    if (!editingSamagri) return;

    let display = samPriceDisplay.trim();
    if (!samIsVerified && samPrice) {
      if (!display.includes('*') && !display.toLowerCase().includes('quote')) {
        display = `${display}*`;
      }
    }

    const payload = {
      name: samName,
      description: samDesc,
      price: samPrice ? Number(samPrice) : null,
      priceDisplay: display || (samPrice ? `₹${samPrice}` : 'Price to be confirmed'),
      isVerified: samIsVerified
    };

    try {
      const res = await adminApi.updateSamagriItem(editingSamagri.id, payload);
      if (res && res.data) {
        setNotification('Optional Samagri item updated successfully.');
        loadData();
      }
    } catch (err) {
      console.error('Error saving samagri item:', err);
    }
  };

  return (
    <div>
      {/* Sub-Tabs: Packages vs Optional Samagri */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveSubTab('packages')}
          className={`admin-btn ${activeSubTab === 'packages' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Ceremony Packages ({packages.length})
        </button>
        <button
          onClick={() => setActiveSubTab('samagri')}
          className={`admin-btn ${activeSubTab === 'samagri' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          Optional Samagri Catalog ({samagri.length})
        </button>
      </div>

      {notification && (
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#047857',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.875rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {activeSubTab === 'packages' ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Puja Packages & Rates</h2>
            <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
              Two-tier architecture: Package A (Ritual Only) & Package B (Ritual + Samagri)
            </span>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Package ID</th>
                  <th>Service Ref</th>
                  <th>Package Name & Tier</th>
                  <th>Badge Label</th>
                  <th>Price Display</th>
                  <th>Price Verification</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                      Loading packages...
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{pkg.id}</td>
                      <td>
                        <span style={{ fontSize: '0.8rem', color: '#575D56', fontWeight: 500 }}>
                          {pkg.serviceId}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{pkg.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#838A82', textTransform: 'capitalize' }}>
                          Tier: {pkg.tier}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', background: '#FAF8F5', border: '1px solid #EAE5D9', padding: '3px 8px', borderRadius: '4px' }}>
                          {pkg.badge || '—'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#BD4B23' }}>
                          {pkg.priceDisplay}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#838A82' }}>
                          {pkg.priceNote}
                        </div>
                      </td>
                      <td>
                        {pkg.isVerified ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#047857', fontSize: '0.8rem', fontWeight: 600 }}>
                            <ShieldCheck size={14} />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#D97706', fontSize: '0.8rem', fontWeight: 500 }}>
                            <AlertCircle size={14} />
                            <span>Indicative Quote</span>
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenEditPackage(pkg)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          <Edit size={13} />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Optional Samagri Catalog</h2>
            <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
              Add-ons and pure Vedic materials with honest pricing policies
            </span>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Samagri Name & Description</th>
                  <th>Category</th>
                  <th>Price Display</th>
                  <th>Rate Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                      Loading samagri catalog...
                    </td>
                  </tr>
                ) : (
                  samagri.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#575D56' }}>{item.description}</div>
                      </td>
                      <td>
                        <span style={{ textTransform: 'capitalize', fontSize: '0.8rem' }}>{item.category}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: '#BD4B23' }}>{item.priceDisplay}</span>
                      </td>
                      <td>
                        {item.isVerified ? (
                          <span style={{ color: '#047857', fontSize: '0.75rem', fontWeight: 600 }}>
                            ✓ Verified Fixed Rate
                          </span>
                        ) : (
                          <span style={{ color: '#838A82', fontSize: '0.75rem', fontStyle: 'italic' }}>
                            Market Rate / Quote
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenEditSamagri(item)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          <Edit size={13} />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {editingPackage && (
        <div className="admin-modal-backdrop" onClick={() => setEditingPackage(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Edit Package: {editingPackage.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#838A82' }}>ID: {editingPackage.id}</span>
              </div>
              <button
                onClick={() => setEditingPackage(null)}
                className="admin-btn admin-btn-outline admin-btn-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Package Name:
                  </label>
                  <input
                    type="text"
                    value={pkgName}
                    onChange={(e) => setPkgName(e.target.value)}
                    className="admin-search-input"
                    style={{ padding: '8px 12px', width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Tier:
                  </label>
                  <select
                    value={pkgTier}
                    onChange={(e) => setPkgTier(e.target.value)}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value="standard">Standard (Package A)</option>
                    <option value="popular">Popular (Package B)</option>
                    <option value="premium">Premium</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Badge Label:
                  </label>
                  <input
                    type="text"
                    value={pkgBadge}
                    onChange={(e) => setPkgBadge(e.target.value)}
                    placeholder="e.g. Most Popular"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Price Display Text:
                  </label>
                  <input
                    type="text"
                    value={pkgPriceDisplay}
                    onChange={(e) => setPkgPriceDisplay(e.target.value)}
                    placeholder="e.g. ₹5,500*"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Numeric Price Value (₹):
                  </label>
                  <input
                    type="number"
                    value={pkgPrice}
                    onChange={(e) => setPkgPrice(e.target.value)}
                    placeholder="5500"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Price Note:
                  </label>
                  <input
                    type="text"
                    value={pkgPriceNote}
                    onChange={(e) => setPkgPriceNote(e.target.value)}
                    placeholder="Indicative starting dakshina"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
              </div>

              {/* Price Verification Checkbox with Safeguard */}
              <div style={{ marginBottom: '16px', background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                  <input
                    type="checkbox"
                    checked={pkgIsVerified}
                    onChange={(e) => setPkgIsVerified(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>Mark price as formally verified rate</span>
                </label>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                  When unchecked, price will automatically carry an indicative marker (*) and cannot be represented as a confirmed rate.
                </div>
              </div>

              {/* Inclusions List */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '6px' }}>
                  Package Inclusions:
                </label>
                {pkgInclusions.map((inc, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <input
                      type="text"
                      value={inc}
                      onChange={(e) => {
                        const copy = [...pkgInclusions];
                        copy[i] = e.target.value;
                        setPkgInclusions(copy);
                      }}
                      className="admin-search-input"
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setPkgInclusions(pkgInclusions.filter((_, idx) => idx !== i))}
                      className="admin-btn admin-btn-outline admin-btn-sm"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setPkgInclusions([...pkgInclusions, ''])}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  style={{ marginTop: '4px' }}
                >
                  <Plus size={12} />
                  <span>Add Inclusion Item</span>
                </button>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="admin-btn admin-btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePackage}
                className="admin-btn admin-btn-primary"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Samagri Modal */}
      {editingSamagri && (
        <div className="admin-modal-backdrop" onClick={() => setEditingSamagri(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Edit Samagri Item: {editingSamagri.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#838A82' }}>ID: {editingSamagri.id}</span>
              </div>
              <button
                onClick={() => setEditingSamagri(null)}
                className="admin-btn admin-btn-outline admin-btn-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                  Samagri Name:
                </label>
                <input
                  type="text"
                  value={samName}
                  onChange={(e) => setSamName(e.target.value)}
                  className="admin-search-input"
                  style={{ padding: '8px 12px', width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                  Description:
                </label>
                <input
                  type="text"
                  value={samDesc}
                  onChange={(e) => setSamDesc(e.target.value)}
                  className="admin-search-input"
                  style={{ padding: '8px 12px', width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Fixed Price (₹):
                  </label>
                  <input
                    type="number"
                    value={samPrice}
                    onChange={(e) => setSamPrice(e.target.value)}
                    placeholder="Leave blank for market rate"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Price Display:
                  </label>
                  <input
                    type="text"
                    value={samPriceDisplay}
                    onChange={(e) => setSamPriceDisplay(e.target.value)}
                    placeholder="Price to be confirmed"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px', background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#047857' }}>
                  <input
                    type="checkbox"
                    checked={samIsVerified}
                    onChange={(e) => setSamIsVerified(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>Verified Fixed Price</span>
                </label>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setEditingSamagri(null)}
                className="admin-btn admin-btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSamagri}
                className="admin-btn admin-btn-primary"
              >
                Save Samagri Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
