import { bookingsService } from './bookings.service.js';

export const bookingsController = {
  async list(req, res, next) {
    try {
      const filters = {
        type: req.query.type, // 'requests' | 'confirmed' | undefined
        status: req.query.status,
        city: req.query.city,
        search: req.query.search
      };
      const items = await bookingsService.listBookings(filters);
      res.json({
        success: true,
        count: items.length,
        data: items
      });
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const item = await bookingsService.getBooking(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }
      res.json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const booking = await bookingsService.createBooking(req.body);
      res.status(201).json({
        success: true,
        message: 'Booking record created.',
        data: booking
      });
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { status, reasonNotes } = req.body;
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await bookingsService.updateStatus(req.params.id, status, adminId, reasonNotes);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }
      res.json({
        success: true,
        message: `Booking status updated to "${status}".`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async recordQuotation(req, res, next) {
    try {
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await bookingsService.recordQuotation(req.params.id, req.body, adminId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }
      res.json({
        success: true,
        message: 'Verified quotation recorded.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async confirmBooking(req, res, next) {
    try {
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await bookingsService.recordConfirmation(req.params.id, req.body, adminId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }
      res.json({
        success: true,
        message: 'Booking confirmed and Panditji allocated.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
};

