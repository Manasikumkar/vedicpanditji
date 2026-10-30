import { packagesService } from './packages.service.js';

export const packagesController = {
  async listPackages(req, res, next) {
    try {
      const items = await packagesService.listPackages(req.query.serviceId);
      res.json({ success: true, count: items.length, data: items });
    } catch (err) {
      next(err);
    }
  },

  async getPackage(req, res, next) {
    try {
      const item = await packagesService.getPackage(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Package not found' });
      }
      res.json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  },

  async updatePackage(req, res, next) {
    try {
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await packagesService.updatePackage(req.params.id, req.body, adminId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Package not found' });
      }
      res.json({
        success: true,
        message: 'Package updated.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  async listSamagri(req, res, next) {
    try {
      const items = await packagesService.listSamagri();
      res.json({ success: true, count: items.length, data: items });
    } catch (err) {
      next(err);
    }
  },

  async updateSamagriItem(req, res, next) {
    try {
      const adminId = req.admin ? req.admin.id : 'system';
      const updated = await packagesService.updateSamagriItem(req.params.id, req.body, adminId);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Samagri item not found' });
      }
      res.json({
        success: true,
        message: 'Samagri item updated.',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
};

