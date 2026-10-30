import { config } from '../config/env.js';
import {
  SAMPLE_SERVICES,
  SAMPLE_PACKAGES,
  SAMPLE_SAMAGRI,
  DEV_SAMPLE_ENQUIRIES,
  DEV_SAMPLE_BOOKINGS
} from './fixtures.js';

// In-memory data store for safe development and unit testing when Supabase is not connected
class MemoryRepository {
  constructor() {
    this.services = [...SAMPLE_SERVICES];
    this.packages = [...SAMPLE_PACKAGES];
    this.samagri = [...SAMPLE_SAMAGRI];
    this.enquiries = [...DEV_SAMPLE_ENQUIRIES];
    this.bookings = [...DEV_SAMPLE_BOOKINGS];
    this.auditLogs = [];
  }

  // --- Enquiries ---
  async getEnquiries(filters = {}) {
    let result = [...this.enquiries];

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
        e.serviceName.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
      );
    }
    // Return sorted newest first
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getEnquiryById(id) {
    return this.enquiries.find(e => e.id === id) || null;
  }

  async createEnquiry(enquiryData) {
    const newEnquiry = {
      id: enquiryData.id || `VP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      isDevelopmentFixture: !config.supabase.isConfigured,
      customerName: enquiryData.customerName || 'Devotee',
      customerPhone: enquiryData.customerPhone || enquiryData.phone || '',
      serviceId: enquiryData.serviceId || null,
      serviceName: enquiryData.serviceName || 'Vedic Ceremony',
      city: enquiryData.city || 'Pune',
      locality: enquiryData.locality || '',
      packageId: enquiryData.packageId || null,
      packageName: enquiryData.packageName || 'Ritual Vidhi',
      packagePriceDisplay: enquiryData.packagePriceDisplay || enquiryData.packagePrice || 'Custom Quote',
      selectedSamagriIds: enquiryData.selectedSamagriIds || [],
      requestedDate: enquiryData.requestedDate || enquiryData.date || '',
      timeSlot: enquiryData.timeSlot || 'Morning Shubh Muhurat',
      needMuhuratConsult: Boolean(enquiryData.needMuhuratConsult),
      address: enquiryData.address || '',
      preferredLanguage: enquiryData.preferredLanguage || 'Hindi & Sanskrit',
      gotra: enquiryData.gotra || '',
      customerNotes: enquiryData.customerNotes || enquiryData.notes || '',
      adminInternalNotes: enquiryData.adminInternalNotes || '',
      status: 'New',
      assignedPandit: 'Pending Review by Senior Vedic Acharyas',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.enquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  async updateEnquiry(id, updateData) {
    const index = this.enquiries.findIndex(e => e.id === id);
    if (index === -1) return null;

    const existing = this.enquiries[index];
    const updated = {
      ...existing,
      ...updateData,
      id: existing.id, // Immutable ID
      updatedAt: new Date().toISOString()
    };
    this.enquiries[index] = updated;
    return updated;
  }

  // --- Bookings ---
  async getBookings(filters = {}) {
    let result = [...this.bookings];

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
        b.serviceName.toLowerCase().includes(q) ||
        (b.customerPhone && b.customerPhone.includes(q))
      );
    }
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getBookingById(id) {
    return this.bookings.find(b => b.id === id) || null;
  }

  async createBooking(bookingData) {
    const newBooking = {
      id: bookingData.id || `BKG-2026-${Math.floor(2000 + Math.random() * 8000)}`,
      isDevelopmentFixture: !config.supabase.isConfigured,
      enquiryId: bookingData.enquiryId || null,
      customerName: bookingData.customerName || 'Devotee',
      customerPhone: bookingData.customerPhone || '',
      serviceName: bookingData.serviceName || 'Vedic Ceremony',
      packageName: bookingData.packageName || 'Ritual Vidhi',
      city: bookingData.city || 'Pune',
      venueAddress: bookingData.venueAddress || '',
      ceremonyDate: bookingData.ceremonyDate || '',
      ceremonyTime: bookingData.ceremonyTime || 'Morning Muhurat',
      gotra: bookingData.gotra || '',
      status: bookingData.status || 'Under Review',
      verifiedDakshina: bookingData.verifiedDakshina || null,
      verifiedSamagriCost: bookingData.verifiedSamagriCost || null,
      totalQuotedAmount: bookingData.totalQuotedAmount || null,
      isPriceVerified: Boolean(bookingData.isPriceVerified),
      quotationNotes: bookingData.quotationNotes || '',
      assignedPanditName: bookingData.assignedPanditName || null,
      assignedPanditPhone: bookingData.assignedPanditPhone || null,
      confirmationNotes: bookingData.confirmationNotes || '',
      confirmedAt: bookingData.confirmedAt || null,
      completedAt: bookingData.completedAt || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  async updateBooking(id, updateData) {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    const existing = this.bookings[index];
    const updated = {
      ...existing,
      ...updateData,
      id: existing.id,
      updatedAt: new Date().toISOString()
    };
    this.bookings[index] = updated;
    return updated;
  }

  // --- Services ---
  async getServices(filters = {}) {
    let result = [...this.services];
    if (filters.category && filters.category !== 'all') {
      result = result.filter(s => s.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getServiceById(id) {
    return this.services.find(s => s.id === id) || null;
  }

  async updateService(id, updateData) {
    const index = this.services.findIndex(s => s.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.services[index],
      ...updateData,
      id: this.services[index].id,
      updatedAt: new Date().toISOString()
    };
    this.services[index] = updated;
    return updated;
  }

  // --- Packages ---
  async getPackages(serviceId = null) {
    if (serviceId) {
      return this.packages.filter(p => p.serviceId === serviceId);
    }
    return [...this.packages];
  }

  async getPackageById(id) {
    return this.packages.find(p => p.id === id) || null;
  }

  async updatePackage(id, updateData) {
    const index = this.packages.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.packages[index],
      ...updateData,
      id: this.packages[index].id,
      updatedAt: new Date().toISOString()
    };
    this.packages[index] = updated;
    return updated;
  }

  // --- Optional Samagri ---
  async getSamagri() {
    return [...this.samagri];
  }

  async updateSamagriItem(id, updateData) {
    const index = this.samagri.findIndex(s => s.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.samagri[index],
      ...updateData,
      id: this.samagri[index].id,
      updatedAt: new Date().toISOString()
    };
    this.samagri[index] = updated;
    return updated;
  }

  // --- Customers (Associated strictly with existing enquiries / bookings) ---
  async getCustomers() {
    const customerMap = new Map();

    // Group only genuine existing records
    for (const enq of this.enquiries) {
      if (!enq.customerPhone) continue;
      const key = enq.customerPhone.trim();
      if (!customerMap.has(key)) {
        customerMap.set(key, {
          phone: key,
          name: enq.customerName,
          city: enq.city,
          address: enq.address,
          gotra: enq.gotra,
          enquiryCount: 1,
          bookingCount: 0,
          isDevelopmentFixture: Boolean(enq.isDevelopmentFixture),
          latestActivity: enq.createdAt
        });
      } else {
        const item = customerMap.get(key);
        item.enquiryCount += 1;
        if (new Date(enq.createdAt) > new Date(item.latestActivity)) {
          item.latestActivity = enq.createdAt;
        }
      }
    }

    for (const bkg of this.bookings) {
      if (!bkg.customerPhone) continue;
      const key = bkg.customerPhone.trim();
      if (customerMap.has(key)) {
        const item = customerMap.get(key);
        item.bookingCount += 1;
      } else {
        customerMap.set(key, {
          phone: key,
          name: bkg.customerName,
          city: bkg.city,
          address: bkg.venueAddress,
          gotra: bkg.gotra,
          enquiryCount: 0,
          bookingCount: 1,
          isDevelopmentFixture: Boolean(bkg.isDevelopmentFixture),
          latestActivity: bkg.createdAt
        });
      }
    }

    return Array.from(customerMap.values());
  }

  // --- Audit Logs ---
  async logAdminAction(adminId, action, entityType, entityId, details = {}) {
    const entry = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      adminId,
      action,
      entityType,
      entityId,
      details,
      createdAt: new Date().toISOString()
    };
    this.auditLogs.unshift(entry);
    return entry;
  }

  // --- Statistics ---
  async getDashboardStats() {
    const totalEnquiries = this.enquiries.length;
    const newEnquiries = this.enquiries.filter(e => e.status === 'New').length;
    const pendingEnquiries = this.enquiries.filter(e =>
      e.status === 'Under Review' ||
      e.status === 'Awaiting Customer Response' ||
      e.status === 'Awaiting Panditji Confirmation'
    ).length;
    const confirmedBookings = this.bookings.filter(b => b.status === 'Confirmed').length;
    const upcomingCeremonies = this.bookings.filter(b => b.status === 'Confirmed').length;

    const recentEnquiries = this.enquiries.slice(0, 5);
    const recentBookings = this.bookings.slice(0, 5);

    return {
      totalEnquiries,
      newEnquiries,
      pendingEnquiries,
      confirmedBookings,
      upcomingCeremonies,
      recentEnquiries,
      recentBookings,
      isDevelopmentMode: !config.supabase.isConfigured,
      supabaseStatus: config.supabase.isConfigured ? 'CONNECTED' : 'PENDING_CREDENTIALS'
    };
  }
}

// Singleton repository instance
export const db = new MemoryRepository();
