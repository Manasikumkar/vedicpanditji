import { db } from '../../repository/dbClient.js';

export const packagesService = {
  async listPackages(serviceId) {
    return await db.getPackages(serviceId);
  },

  async getPackage(id) {
    return await db.getPackageById(id);
  },

  async updatePackage(id, updateData, adminId) {
    const existing = await db.getPackageById(id);
    if (!existing) return null;

    const allowedFields = [
      'name',
      'tier',
      'badge',
      'indicativePrice',
      'priceDisplay',
      'priceNote',
      'isVerified',
      'inclusions',
      'includedSamagriIds',
      'isActive'
    ];

    const cleanUpdate = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        cleanUpdate[key] = updateData[key];
      }
    }

    // Safety rule: if price is not verified, ensure priceDisplay or note reflects indicative/unverified
    if (cleanUpdate.isVerified === false && cleanUpdate.priceDisplay && !cleanUpdate.priceDisplay.includes('*') && !cleanUpdate.priceDisplay.toLowerCase().includes('quote') && !cleanUpdate.priceDisplay.toLowerCase().includes('confirmed')) {
      cleanUpdate.priceDisplay = `${cleanUpdate.priceDisplay}*`;
    }

    const updated = await db.updatePackage(id, cleanUpdate);
    await db.logAdminAction(adminId || 'admin', 'UPDATE_PACKAGE', 'package', id, {
      changedKeys: Object.keys(cleanUpdate)
    });
    return updated;
  },

  async listSamagri() {
    return await db.getSamagri();
  },

  async updateSamagriItem(id, updateData, adminId) {
    const existing = (await db.getSamagri()).find(s => s.id === id);
    if (!existing) return null;

    const allowedFields = ['name', 'description', 'price', 'priceDisplay', 'isVerified', 'isActive'];
    const cleanUpdate = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        cleanUpdate[key] = updateData[key];
      }
    }

    const updated = await db.updateSamagriItem(id, cleanUpdate);
    await db.logAdminAction(adminId || 'admin', 'UPDATE_SAMAGRI', 'samagri', id, {
      changedKeys: Object.keys(cleanUpdate)
    });
    return updated;
  }
};

