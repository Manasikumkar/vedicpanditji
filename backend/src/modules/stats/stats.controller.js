import { statsService } from './stats.service.js';

export const statsController = {
  async getOverview(req, res, next) {
    try {
      const stats = await statsService.getOverview();
      res.json({
        success: true,
        data: stats
      });
    } catch (err) {
      next(err);
    }
  }
};

