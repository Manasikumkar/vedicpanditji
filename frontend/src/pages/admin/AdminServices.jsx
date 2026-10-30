import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import {
  Search,
  Edit,
  CheckCircle2,
  X,
  Globe,
  MapPin,
  Check
} from 'lucide-react';

const ALL_CITIES = ['Pune', 'Mumbai', 'Bangalore', 'Delhi-NCR', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Edit Modal State
  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState('');
  const [editShortDesc, setEditShortDesc] = useState('');
  const [editLongDesc, setEditLongDesc] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editTradition, setEditTradition] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);
  const [editCities, setEditCities] = useState([]);
  const [editSeoTitle, setEditSeoTitle] = useState('');
  const [editSeoDesc, setEditSeoDesc] = useState('');
  const [editSeoSlug, setEditSeoSlug] = useState('');

  const [notification, setNotification] = useState(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getServices({
        category: categoryFilter,
        search: searchTerm
      });
      if (res && res.data) {
        setServices(res.data);
      }
    } catch (err) {
      console.error('Error loading services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [categoryFilter]);

  const handleOpenEdit = (svc) => {
    setEditingService(svc);
    setEditName(svc.name);
    setEditShortDesc(svc.shortDescription || '');
    setEditLongDesc(svc.longDescription || '');
    setEditDuration(svc.duration || '');
    setEditTradition(svc.tradition || '');
    setEditIsActive(svc.isActive !== false);
    setEditCities(svc.availableCities || ['Pune', 'Mumbai']);
    setEditSeoTitle(svc.seoTitle || '');
    setEditSeoDesc(svc.seoMetaDescription || '');
    setEditSeoSlug(svc.seoSlug || svc.id);
    setNotification(null);
  };

  const toggleCity = (city) => {
    if (editCities.includes(city)) {
      setEditCities(editCities.filter((c) => c !== city));
    } else {
      setEditCities([...editCities, city]);
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    try {
      const payload = {
        name: editName,
        shortDescription: editShortDesc,
        longDescription: editLongDesc,
        duration: editDuration,
        tradition: editTradition,
        isActive: editIsActive,
        availableCities: editCities,
        seoTitle: editSeoTitle,
        seoMetaDescription: editSeoDesc,
        seoSlug: editSeoSlug
      };

      const res = await adminApi.updateService(editingService.id, payload);
      if (res && res.data) {
        setNotification('Service and SEO metadata saved successfully.');
        loadServices();
      }
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  return (
    <div>
      {/* Search & Category Filter */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px' }}>
          <div className="admin-filters-bar" style={{ margin: 0 }}>
            <div className="admin-search-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search Puja Services by Name or Vidhi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadServices()}
                className="admin-search-input"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Ritual Categories</option>
              <option value="pujas">Pujas & Home Ceremonies</option>
              <option value="havan">Havans & Homas</option>
              <option value="jaap">Jaap & Chanting</option>
              <option value="shanti">Shanti Pujas & Dosha Nivaran</option>
              <option value="vivah">Vivah & Wedding Sanskar</option>
            </select>

            <button onClick={loadServices} className="admin-btn admin-btn-secondary">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Puja Services Directory ({services.length})</h2>
          <span style={{ fontSize: '0.8rem', color: '#838A82' }}>
            Structured Vedic service catalog with multi-city availability
          </span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service ID / Slug</th>
                <th>Puja Name</th>
                <th>Category & Tradition</th>
                <th>Duration</th>
                <th>City Availability</th>
                <th>Indicative Rate</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    Loading puja services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#838A82' }}>
                    No services found matching filters.
                  </td>
                </tr>
              ) : (
                services.map((svc) => (
                  <tr key={svc.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{svc.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{svc.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#575D56', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {svc.shortDescription}
                      </div>
                    </td>
                    <td>
                      <div style={{ textTransform: 'capitalize', fontWeight: 500 }}>{svc.category}</div>
                      <div style={{ fontSize: '0.75rem', color: '#838A82' }}>{svc.tradition}</div>
                    </td>
                    <td>{svc.duration}</td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {(svc.availableCities || []).slice(0, 3).map((cty) => (
                          <span
                            key={cty}
                            style={{
                              fontSize: '0.7rem',
                              padding: '2px 6px',
                              background: '#FAF8F5',
                              border: '1px solid #EAE5D9',
                              borderRadius: '4px'
                            }}
                          >
                            {cty}
                          </span>
                        ))}
                        {(svc.availableCities || []).length > 3 && (
                          <span style={{ fontSize: '0.7rem', color: '#838A82' }}>
                            +{(svc.availableCities || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      {svc.indicativeStartingPrice ? (
                        <div style={{ fontWeight: 600, color: '#BD4B23' }}>
                          ₹{svc.indicativeStartingPrice.toLocaleString('en-IN')}*
                        </div>
                      ) : (
                        <span style={{ color: '#838A82', fontSize: '0.8rem' }}>Custom Quote</span>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: svc.isActive !== false ? '#ECFDF5' : '#FEF2F2',
                          color: svc.isActive !== false ? '#047857' : '#B91C1C'
                        }}
                      >
                        {svc.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenEdit(svc)}
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

      {/* Edit Service & SEO Modal */}
      {editingService && (
        <div className="admin-modal-backdrop" onClick={() => setEditingService(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                  Edit Puja Service: {editingService.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#838A82' }}>Slug ID: {editingService.id}</span>
              </div>
              <button
                onClick={() => setEditingService(null)}
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
                  <span>{notification}</span>
                </div>
              )}

              {/* Service Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Puja Service Title:
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="admin-search-input"
                    style={{ padding: '8px 12px', width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Active Status:
                  </label>
                  <select
                    value={editIsActive ? 'active' : 'inactive'}
                    onChange={(e) => setEditIsActive(e.target.value === 'active')}
                    className="admin-select"
                    style={{ width: '100%' }}
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Ritual Duration:
                  </label>
                  <input
                    type="text"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    placeholder="e.g. 2.5 to 3.5 Hours"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                    Tradition / Vidhi:
                  </label>
                  <input
                    type="text"
                    value={editTradition}
                    onChange={(e) => setEditTradition(e.target.value)}
                    placeholder="e.g. North Indian / Vedic"
                    className="admin-search-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#575D56', display: 'block', marginBottom: '4px' }}>
                  Short Service Description:
                </label>
                <textarea
                  rows={2}
                  value={editShortDesc}
                  onChange={(e) => setEditShortDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #EAE5D9',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* City Availability Management */}
              <div style={{ marginBottom: '16px', background: '#FAF8F5', padding: '12px 16px', borderRadius: '8px', border: '1px solid #EAE5D9' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C1E1B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <MapPin size={14} color="#BD4B23" />
                  <span>City Availability:</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {ALL_CITIES.map((city) => {
                    const isSelected = editCities.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => toggleCity(city)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: isSelected ? '1px solid #BD4B23' : '1px solid #EAE5D9',
                          background: isSelected ? '#FDF6F3' : '#FFFFFF',
                          color: isSelected ? '#BD4B23' : '#575D56',
                          fontWeight: isSelected ? 600 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {isSelected && <Check size={12} />}
                        <span>{city}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SEO Page Metadata */}
              <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #EAE5D9' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 600, color: '#1C1E1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={14} color="#059669" />
                  <span>SEO Page Metadata</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#575D56', display: 'block', marginBottom: '2px' }}>
                      SEO Meta Title:
                    </label>
                    <input
                      type="text"
                      value={editSeoTitle}
                      onChange={(e) => setEditSeoTitle(e.target.value)}
                      placeholder="Title for search engines"
                      className="admin-search-input"
                      style={{ padding: '7px 10px', fontSize: '0.8rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#575D56', display: 'block', marginBottom: '2px' }}>
                      SEO URL Slug:
                    </label>
                    <input
                      type="text"
                      value={editSeoSlug}
                      onChange={(e) => setEditSeoSlug(e.target.value)}
                      placeholder="e.g. griha-pravesh-puja"
                      className="admin-search-input"
                      style={{ padding: '7px 10px', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#575D56', display: 'block', marginBottom: '2px' }}>
                    SEO Meta Description:
                  </label>
                  <input
                    type="text"
                    value={editSeoDesc}
                    onChange={(e) => setEditSeoDesc(e.target.value)}
                    placeholder="Short description for search engine snippets"
                    className="admin-search-input"
                    style={{ padding: '7px 10px', fontSize: '0.8rem', width: '100%' }}
                  />
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="admin-btn admin-btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveService}
                className="admin-btn admin-btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
