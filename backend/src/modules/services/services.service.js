import { db } from '../../repository/dbClient.js';

export const servicesService = {
  async listServices(filters) {
    return await db.getServices(filters);
  },

  async getService(id) {
    return await db.getServiceById(id);
  },

  async updateService(id, updateData, adminId) {
    const existing = await db.getServiceById(id);
    if (!existing) return null;

    const allowedFields = [
      'name',
      'shortDescription',
      'longDescription',
      'duration',
      'tradition',
      'indicativeStartingPrice',
      'isPriceVerified',
      'isActive',
      'availableCities',
      'seoTitle',
      'seoMetaDescription',
      'seoSlug'
    ];

    const cleanUpdate = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        cleanUpdate[key] = updateData[key];
      }
    }

    const updated = await db.updateService(id, cleanUpdate);
    await db.logAdminAction(adminId || 'admin', 'UPDATE_SERVICE', 'service', id, {
      changedKeys: Object.keys(cleanUpdate)
    });
    return updated;
  }
};

