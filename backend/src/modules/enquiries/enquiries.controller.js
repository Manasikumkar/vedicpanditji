import { enquiriesService } from './enquiries.service.js';

export const enquiriesController = {
  async list(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        city: req.query.city,
        search: req.query.search
      };
      const items = await enquiriesService.listEnquiries(filters);
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
      const item = await enquiriesService.getEnquiry(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }
      res.json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const created = await enquiriesService.createEnquiry(req.body);
      res.status(201).json({
        success: true,
        message: 'Enquiry successfully submitted and queued for Acharya review.',
        data: created
      });
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { status, adminInternalNotes } = req.body;
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await enquiriesService.updateStatus(req.params.id, status, adminId, adminInternalNotes);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }
      res.json({
        success: true,
        message: `Status updated to "${status}".`,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async updateNotes(req, res, next) {
    try {
      const { adminInternalNotes } = req.body;
      if (typeof adminInternalNotes !== 'string') {
        return res.status(400).json({ success: false, error: 'adminInternalNotes must be a string' });
      }
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await enquiriesService.recordNotes(req.params.id, adminInternalNotes, adminId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }
      res.json({
        success: true,
        message: 'Administrative notes recorded.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async convertToBooking(req, res, next) {
    try {
      const adminId = req.admin ? req.admin.id : 'system';
      const booking = await enquiriesService.convertToBookingRequest(req.params.id, adminId);
      if (!booking) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }
      res.status(201).json({
        success: true,
        message: `Enquiry successfully promoted to Booking Request #${booking.id}.`,
        data: booking
      });
    } catch (err) {
      next(err);
    }
  }
};

