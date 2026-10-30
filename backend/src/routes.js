import { Router } from 'express';
import { requireAdminAuth } from './middleware/auth.js';
import {
  validateEnquiryCreation,
  validateStatusUpdate,
  validateQuotation,
  validateConfirmation
} from './middleware/validate.js';

import { authController } from './modules/auth/auth.controller.js';
import { statsController } from './modules/stats/stats.controller.js';
import { enquiriesController } from './modules/enquiries/enquiries.controller.js';
import { bookingsController } from './modules/bookings/bookings.controller.js';
import { servicesController } from './modules/services/services.controller.js';
import { packagesController } from './modules/packages/packages.controller.js';
import { customersController } from './modules/customers/customers.controller.js';

export const apiRouter = Router();

// --- System & Auth ---
apiRouter.get('/health', authController.getStatus);
apiRouter.get('/auth/session', requireAdminAuth, authController.getSession);

// --- Dashboard Statistics ---
apiRouter.get('/stats/overview', requireAdminAuth, statsController.getOverview);

// --- Enquiries ---
// Public booking submission endpoint (Integrates with frontend BookingModal)
apiRouter.post('/enquiries', validateEnquiryCreation, enquiriesController.create);
// Protected Admin Operations
apiRouter.get('/enquiries', requireAdminAuth, enquiriesController.list);
apiRouter.get('/enquiries/:id', requireAdminAuth, enquiriesController.getOne);
apiRouter.patch('/enquiries/:id/status', requireAdminAuth, validateStatusUpdate, enquiriesController.updateStatus);
apiRouter.patch('/enquiries/:id/notes', requireAdminAuth, enquiriesController.updateNotes);
apiRouter.post('/enquiries/:id/convert-to-booking', requireAdminAuth, enquiriesController.convertToBooking);

// --- Bookings ---
apiRouter.get('/bookings', requireAdminAuth, bookingsController.list);
apiRouter.get('/bookings/:id', requireAdminAuth, bookingsController.getOne);
apiRouter.post('/bookings', requireAdminAuth, bookingsController.create);
apiRouter.patch('/bookings/:id/status', requireAdminAuth, validateStatusUpdate, bookingsController.updateStatus);
apiRouter.patch('/bookings/:id/quotation', requireAdminAuth, validateQuotation, bookingsController.recordQuotation);
apiRouter.post('/bookings/:id/confirm', requireAdminAuth, validateConfirmation, bookingsController.confirmBooking);

// --- Puja Services ---
apiRouter.get('/services', servicesController.list);
apiRouter.get('/services/:id', servicesController.getOne);
apiRouter.patch('/services/:id', requireAdminAuth, servicesController.update);

// --- Packages & Optional Samagri ---
apiRouter.get('/packages', packagesController.listPackages);
apiRouter.get('/packages/:id', packagesController.getPackage);
apiRouter.patch('/packages/:id', requireAdminAuth, packagesController.updatePackage);
apiRouter.get('/samagri/all', packagesController.listSamagri);
apiRouter.patch('/samagri/:id', requireAdminAuth, packagesController.updateSamagriItem);

// --- Devotees / Customers ---
apiRouter.get('/customers', requireAdminAuth, customersController.list);
apiRouter.get('/customers/:phone', requireAdminAuth, customersController.getDetails);

