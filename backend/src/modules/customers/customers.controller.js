import { customersService } from './customers.service.js';

export const customersController = {
  async list(req, res, next) {
    try {
      const devotees = await customersService.listCustomers();
      res.json({
        success: true,
        count: devotees.length,
        data: devotees
      });
    } catch (err) {
      next(err);
    }
  },

  async getDetails(req, res, next) {
    try {
      const details = await customersService.getCustomerDetails(req.params.phone);
      if (!details) {
        return res.status(404).json({ success: false, error: 'Devotee record not found' });
      }
      res.json({
        success: true,
        data: details
      });
    } catch (err) {
      next(err);
    }
  }
};

