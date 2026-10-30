import { db } from '../../repository/dbClient.js';

export const statsService = {
  async getOverview() {
    return await db.getDashboardStats();
  }
};

