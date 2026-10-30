import { db } from '../../repository/dbClient.js';

export const enquiriesService = {
  async listEnquiries(filters) {
    return await db.getEnquiries(filters);
  },

  async getEnquiry(id) {
    return await db.getEnquiryById(id);
  },

  async createEnquiry(enquiryData) {
    // Check if customer exists or needs to be associated
    return await db.createEnquiry(enquiryData);
  },

  async updateStatus(id, status, adminId, internalNotes) {
    const existing = await db.getEnquiryById(id);
    if (!existing) return null;

    const updatePayload = { status };
    if (internalNotes) {
      updatePayload.adminInternalNotes = internalNotes;
    }

    const updated = await db.updateEnquiry(id, updatePayload);
    await db.logAdminAction(adminId || 'admin', 'UPDATE_ENQUIRY_STATUS', 'enquiry', id, {
      fromStatus: existing.status,
      toStatus: status
    });
    return updated;
  },

  async recordNotes(id, adminInternalNotes, adminId) {
    const existing = await db.getEnquiryById(id);
    if (!existing) return null;

    const updated = await db.updateEnquiry(id, { adminInternalNotes });
    await db.logAdminAction(adminId || 'admin', 'UPDATE_ENQUIRY_NOTES', 'enquiry', id, {
      noteLength: adminInternalNotes.length
    });
    return updated;
  },

  async convertToBookingRequest(id, adminId) {
    const enquiry = await db.getEnquiryById(id);
    if (!enquiry) return null;

    // Create a new booking request from this enquiry
    const booking = await db.createBooking({
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
      quotationNotes: `Converted from enquiry #${enquiry.id}`
    });

    await db.updateEnquiry(id, {
      status: 'Under Review',
      adminInternalNotes: `${enquiry.adminInternalNotes ? enquiry.adminInternalNotes + ' | ' : ''}Promoted to Booking Request #${booking.id}`
    });

    await db.logAdminAction(adminId || 'admin', 'CONVERT_ENQUIRY_TO_BOOKING', 'enquiry', id, {
      bookingId: booking.id
    });

    return booking;
  }
};

