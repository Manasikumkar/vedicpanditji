import { servicesService } from './services.service.js';

export const servicesController = {
  async list(req, res, next) {
    try {
      const filters = {
        category: req.query.category,
        search: req.query.search
      };
      const items = await servicesService.listServices(filters);
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
      const item = await servicesService.getService(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }
      res.json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await servicesService.updateService(req.params.id, req.body, adminId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }
      res.json({
        success: true,
        message: 'Service details updated.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
};

