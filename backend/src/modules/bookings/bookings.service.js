import { db } from '../../repository/dbClient.js';

export const bookingsService = {
  async listBookings(filters) {
    return await db.getBookings(filters);
  },

  async getBooking(id) {
    return await db.getBookingById(id);
  },

  async createBooking(bookingData) {
    return await db.createBooking(bookingData);
  },

  async updateStatus(id, status, adminId, reasonNotes = '') {
    const existing = await db.getBookingById(id);
    if (!existing) return null;

    // Strict Rule: Confirming a booking requires that it is an explicit admin action
    const updatePayload = { status };

    if (status === 'Confirmed' && !existing.confirmedAt) {
      updatePayload.confirmedAt = new Date().toISOString();
    }
    if (status === 'Completed' && !existing.completedAt) {
      updatePayload.completedAt = new Date().toISOString();
    }
    if (reasonNotes) {
      updatePayload.confirmationNotes = existing.confirmationNotes
        ? `${existing.confirmationNotes} | Status updated to ${status}: ${reasonNotes}`
        : `Status updated to ${status}: ${reasonNotes}`;
    }

    const updated = await db.updateBooking(id, updatePayload);
    await db.logAdminAction(adminId || 'admin', 'UPDATE_BOOKING_STATUS', 'booking', id, {
      fromStatus: existing.status,
      toStatus: status
    });
    return updated;
  },

  async recordQuotation(id, quotationData, adminId) {
    const existing = await db.getBookingById(id);
    if (!existing) return null;

    const {
      verifiedDakshina,
      verifiedSamagriCost,
      totalQuotedAmount,
      isPriceVerified,
      quotationNotes
    } = quotationData;

    const updatePayload = {
      verifiedDakshina: verifiedDakshina !== undefined ? verifiedDakshina : existing.verifiedDakshina,
      verifiedSamagriCost: verifiedSamagriCost !== undefined ? verifiedSamagriCost : existing.verifiedSamagriCost,
      totalQuotedAmount: totalQuotedAmount !== undefined ? totalQuotedAmount : existing.totalQuotedAmount,
      isPriceVerified: isPriceVerified !== undefined ? Boolean(isPriceVerified) : existing.isPriceVerified,
      quotationNotes: quotationNotes || existing.quotationNotes
    };

    const updated = await db.updateBooking(id, updatePayload);
    await db.logAdminAction(adminId || 'admin', 'RECORD_BOOKING_QUOTATION', 'booking', id, {
      totalQuotedAmount: updatePayload.totalQuotedAmount,
      isPriceVerified: updatePayload.isPriceVerified
    });
    return updated;
  },

  async recordConfirmation(id, confirmationData, adminId) {
    const existing = await db.getBookingById(id);
    if (!existing) return null;

    const {
      assignedPanditName,
      assignedPanditPhone,
      ceremonyDate,
      ceremonyTime,
      confirmationNotes,
      status // e.g. 'Confirmed'
    } = confirmationData;

    const updatePayload = {
      assignedPanditName: assignedPanditName || existing.assignedPanditName,
      assignedPanditPhone: assignedPanditPhone || existing.assignedPanditPhone,
      ceremonyDate: ceremonyDate || existing.ceremonyDate,
      ceremonyTime: ceremonyTime || existing.ceremonyTime,
      confirmationNotes: confirmationNotes || existing.confirmationNotes,
      status: status || 'Confirmed',
      confirmedAt: new Date().toISOString()
    };

    const updated = await db.updateBooking(id, updatePayload);
    await db.logAdminAction(adminId || 'admin', 'CONFIRM_BOOKING_ALLOCATION', 'booking', id, {
      assignedPanditName: updatePayload.assignedPanditName,
      ceremonyDate: updatePayload.ceremonyDate
    });
    return updated;
  }
};

