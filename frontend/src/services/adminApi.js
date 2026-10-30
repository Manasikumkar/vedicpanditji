// VedicPanditji Admin API Service
// Communicates with the Backend API Foundation or falls back safely to development fixtures.
// Strictly labeled to maintain data integrity.

import {
  DEV_SAMPLE_ENQUIRIES,
  DEV_SAMPLE_BOOKINGS,
  SAMPLE_SERVICES,
  SAMPLE_PACKAGES,
  SAMPLE_SAMAGRI
} from './adminFixtures.js';

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5000/api';

const ADMIN_TOKEN = 'Bearer dev-admin-session';

// In-memory fallback state for standalone frontend development
let localEnquiries = [...DEV_SAMPLE_ENQUIRIES];
let localBookings = [...DEV_SAMPLE_BOOKINGS];
let localServices = [...SAMPLE_SERVICES];
let localPackages = [...SAMPLE_PACKAGES];
let localSamagri = [...SAMPLE_SAMAGRI];

// Helper to make backend requests with automatic fallback
async function fetchWithFallback(endpoint, options = {}, fallbackFn) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: ADMIN_TOKEN,
        ...(options.headers || {})
      }
    });

    if (res.ok) {
      const json = await res.json();
      return { ...json, isLiveBackend: true };
    }
  } catch (err) {
    // Backend server is not running or network error -> use safe fallback
  }

  // Execute local fixture fallback
  const fallbackData = await fallbackFn();
  return {
    success: true,
    data: fallbackData,
    isLiveBackend: false,
    isDevelopmentFixture: true
  };
}

export const adminApi = {
  // --- Dashboard Overview Stats ---
  async getDashboardStats() {
    return fetchWithFallback('/stats/overview', {}, () => {
      const totalEnquiries = localEnquiries.length;
      const newEnquiries = localEnquiries.filter(e => e.status === 'New').length;
      const pendingEnquiries = localEnquiries.filter(e =>
        e.status === 'Under Review' ||
        e.status === 'Awaiting Customer Response' ||
        e.status === 'Awaiting Panditji Confirmation'
      ).length;
      const confirmedBookings = localBookings.filter(b => b.status === 'Confirmed').length;
      const upcomingCeremonies = localBookings.filter(b => b.status === 'Confirmed').length;

      return {
        totalEnquiries,
        newEnquiries,
        pendingEnquiries,
        confirmedBookings,
        upcomingCeremonies,
        recentEnquiries: localEnquiries.slice(0, 5),
        recentBookings: localBookings.slice(0, 5),
        isDevelopmentMode: true,
        supabaseStatus: 'PENDING_CREDENTIALS'
      };
    });
  },

  // --- Enquiries ---
  async getEnquiries(filters = {}) {
    const query = new URLSearchParams();
    if (filters.status && filters.status !== 'all') query.set('status', filters.status);
    if (filters.city && filters.city !== 'all') query.set('city', filters.city);
    if (filters.search) query.set('search', filters.search);

    return fetchWithFallback(`/enquiries?${query.toString()}`, {}, () => {
      let result = [...localEnquiries];
      if (filters.status && filters.status !== 'all') {
        result = result.filter(e => e.status.toLowerCase() === filters.status.toLowerCase());
      }
      if (filters.city && filters.city !== 'all') {
        result = result.filter(e => e.city.toLowerCase().includes(filters.city.toLowerCase()));
      }
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        result = result.filter(e =>
          e.id.toLowerCase().includes(q) ||
          e.customerName.toLowerCase().includes(q) ||
          (e.customerPhone && e.customerPhone.includes(q)) ||
          e.serviceName.toLowerCase().includes(q)
        );
      }
      return result;
    });
  },

  async updateEnquiryStatus(id, status, adminInternalNotes) {
    return fetchWithFallback(`/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminInternalNotes })
    }, () => {
      const idx = localEnquiries.findIndex(e => e.id === id);
      if (idx !== -1) {
        localEnquiries[idx] = {
          ...localEnquiries[idx],
          status,
          ...(adminInternalNotes && { adminInternalNotes }),
          updatedAt: new Date().toISOString()
        };
        return localEnquiries[idx];
      }
      return null;
    });
  },

  async updateEnquiryNotes(id, adminInternalNotes) {
    return fetchWithFallback(`/enquiries/${id}/notes`, {
      method: 'PATCH',
      body: JSON.stringify({ adminInternalNotes })
    }, () => {
      const idx = localEnquiries.findIndex(e => e.id === id);
      if (idx !== -1) {
        localEnquiries[idx] = {
          ...localEnquiries[idx],
          adminInternalNotes,
          updatedAt: new Date().toISOString()
        };
        return localEnquiries[idx];
      }
      return null;
    });
  },

  async convertEnquiryToBooking(id) {
    return fetchWithFallback(`/enquiries/${id}/convert-to-booking`, {
      method: 'POST'
    }, () => {
      const enquiry = localEnquiries.find(e => e.id === id);
      if (!enquiry) return null;

      const newBooking = {
        id: `BKG-DEV-${Math.floor(2000 + Math.random() * 8000)}`,
        isDevelopmentFixture: true,
        enquiryId: enquiry.id,
        customerName: enquiry.customerName,
        customerPhone: enquiry.customerPhone,
        serviceName: enquiry.serviceName,
        packageName: enquiry.packageName,
        city: enquiry.city,
        venueAddress: enquiry.address,
        ceremonyDate: enquiry.requestedDate,
        ceremonyTime: enquiry.timeSlot,
        gotra: enquiry.gotra,
        status: 'Under Review',
        isPriceVerified: false,
        quotationNotes: `Converted from enquiry #${enquiry.id}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localBookings.unshift(newBooking);
      enquiry.status = 'Under Review';
      enquiry.adminInternalNotes = `${enquiry.adminInternalNotes ? enquiry.adminInternalNotes + ' | ' : ''}Promoted to Booking #${newBooking.id}`;
      return newBooking;
    });
  },

  // --- Bookings ---
  async getBookings(filters = {}) {
    const query = new URLSearchParams();
    if (filters.type) query.set('type', filters.type);
    if (filters.status && filters.status !== 'all') query.set('status', filters.status);
    if (filters.city && filters.city !== 'all') query.set('city', filters.city);
    if (filters.search) query.set('search', filters.search);

    return fetchWithFallback(`/bookings?${query.toString()}`, {}, () => {
      let result = [...localBookings];
      if (filters.type === 'requests') {
        result = result.filter(b => b.status !== 'Confirmed' && b.status !== 'Completed');
      } else if (filters.type === 'confirmed') {
        result = result.filter(b => b.status === 'Confirmed' || b.status === 'Completed');
      }
      if (filters.status && filters.status !== 'all') {
        result = result.filter(b => b.status.toLowerCase() === filters.status.toLowerCase());
      }
      if (filters.city && filters.city !== 'all') {
        result = result.filter(b => b.city.toLowerCase().includes(filters.city.toLowerCase()));
      }
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        result = result.filter(b =>
          b.id.toLowerCase().includes(q) ||
          b.customerName.toLowerCase().includes(q) ||
          b.serviceName.toLowerCase().includes(q)
        );
      }
      return result;
    });
  },

  async updateBookingStatus(id, status, reasonNotes) {
    return fetchWithFallback(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reasonNotes })
    }, () => {
      const idx = localBookings.findIndex(b => b.id === id);
      if (idx !== -1) {
        localBookings[idx] = {
          ...localBookings[idx],
          status,
          ...(status === 'Confirmed' && !localBookings[idx].confirmedAt && { confirmedAt: new Date().toISOString() }),
          ...(reasonNotes && {
            confirmationNotes: localBookings[idx].confirmationNotes
              ? `${localBookings[idx].confirmationNotes} | Status: ${status} (${reasonNotes})`
              : `Status: ${status} (${reasonNotes})`
          }),
          updatedAt: new Date().toISOString()
        };
        return localBookings[idx];
      }
      return null;
    });
  },

  async recordBookingQuotation(id, quotationData) {
    return fetchWithFallback(`/bookings/${id}/quotation`, {
      method: 'PATCH',
      body: JSON.stringify(quotationData)
    }, () => {
      const idx = localBookings.findIndex(b => b.id === id);
      if (idx !== -1) {
        localBookings[idx] = {
          ...localBookings[idx],
          ...quotationData,
          updatedAt: new Date().toISOString()
        };
        return localBookings[idx];
      }
      return null;
    });
  },

  async confirmBookingAllocation(id, confirmationData) {
    return fetchWithFallback(`/bookings/${id}/confirm`, {
      method: 'POST',
      body: JSON.stringify(confirmationData)
    }, () => {
      const idx = localBookings.findIndex(b => b.id === id);
      if (idx !== -1) {
        localBookings[idx] = {
          ...localBookings[idx],
          ...confirmationData,
          status: 'Confirmed',
          confirmedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return localBookings[idx];
      }
      return null;
    });
  },

  // --- Services ---
  async getServices(filters = {}) {
    const query = new URLSearchParams();
    if (filters.category && filters.category !== 'all') query.set('category', filters.category);
    if (filters.search) query.set('search', filters.search);

    return fetchWithFallback(`/services?${query.toString()}`, {}, () => {
      let result = [...localServices];
      if (filters.category && filters.category !== 'all') {
        result = result.filter(s => s.category === filters.category);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        result = result.filter(s =>
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
        );
      }
      return result;
    });
  },

  async updateService(id, updateData) {
    return fetchWithFallback(`/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    }, () => {
      const idx = localServices.findIndex(s => s.id === id);
      if (idx !== -1) {
        localServices[idx] = {
          ...localServices[idx],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        return localServices[idx];
      }
      return null;
    });
  },

  // --- Packages & Samagri ---
  async getPackages(serviceId) {
    const query = serviceId ? `?serviceId=${serviceId}` : '';
    return fetchWithFallback(`/packages${query}`, {}, () => {
      if (serviceId) {
        return localPackages.filter(p => p.serviceId === serviceId);
      }
      return localPackages;
    });
  },

  async updatePackage(id, updateData) {
    return fetchWithFallback(`/packages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    }, () => {
      const idx = localPackages.findIndex(p => p.id === id);
      if (idx !== -1) {
        localPackages[idx] = {
          ...localPackages[idx],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        return localPackages[idx];
      }
      return null;
    });
  },

  async getSamagri() {
    return fetchWithFallback('/samagri/all', {}, () => localSamagri);
  },

  async updateSamagriItem(id, updateData) {
    return fetchWithFallback(`/samagri/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    }, () => {
      const idx = localSamagri.findIndex(s => s.id === id);
      if (idx !== -1) {
        localSamagri[idx] = {
          ...localSamagri[idx],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        return localSamagri[idx];
      }
      return null;
    });
  },

  // --- Customers ---
  async getCustomers() {
    return fetchWithFallback('/customers', {}, () => {
      const map = new Map();
      for (const e of localEnquiries) {
        if (!e.customerPhone) continue;
        const key = e.customerPhone.trim();
        if (!map.has(key)) {
          map.set(key, {
            phone: key,
            name: e.customerName,
            city: e.city,
            address: e.address,
            gotra: e.gotra,
            enquiryCount: 1,
            bookingCount: 0,
            isDevelopmentFixture: Boolean(e.isDevelopmentFixture),
            latestActivity: e.createdAt
          });
        } else {
          map.get(key).enquiryCount += 1;
        }
      }
      for (const b of localBookings) {
        if (!b.customerPhone) continue;
        const key = b.customerPhone.trim();
        if (map.has(key)) {
          map.get(key).bookingCount += 1;
        } else {
          map.set(key, {
            phone: key,
            name: b.customerName,
            city: b.city,
            address: b.venueAddress,
            gotra: b.gotra,
            enquiryCount: 0,
            bookingCount: 1,
            isDevelopmentFixture: Boolean(b.isDevelopmentFixture),
            latestActivity: b.createdAt
          });
        }
      }
      return Array.from(map.values());
    });
  },

  async getCustomerDetails(phone) {
    return fetchWithFallback(`/customers/${encodeURIComponent(phone)}`, {}, () => {
      const cleanPhone = phone.trim();
      const customerEnquiries = localEnquiries.filter(e => e.customerPhone && e.customerPhone.trim() === cleanPhone);
      const customerBookings = localBookings.filter(b => b.customerPhone && b.customerPhone.trim() === cleanPhone);

      if (customerEnquiries.length === 0 && customerBookings.length === 0) {
        return null;
      }
      const primary = customerEnquiries[0] || customerBookings[0];
      return {
        phone: cleanPhone,
        name: primary.customerName,
        city: primary.city,
        address: primary.address || primary.venueAddress || '',
        gotra: primary.gotra || 'Not Specified',
        isDevelopmentFixture: Boolean(primary.isDevelopmentFixture),
        enquiries: customerEnquiries,
        bookings: customerBookings
      };
    });
  }
};

