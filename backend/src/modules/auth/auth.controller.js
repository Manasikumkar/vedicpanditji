import { config } from '../../config/env.js';

export const authController = {
  // Returns current admin session status and role capabilities
  async getSession(req, res) {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        isAuthenticated: false,
        message: 'No active admin session'
      });
    }

    res.json({
      success: true,
      isAuthenticated: true,
      admin: {
        id: req.admin.id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role
      },
      environment: {
        isDevelopmentMode: !config.supabase.isConfigured,
        supabaseConfigured: config.supabase.isConfigured
      },
      permissions: {
        canVerifyQuotations: ['super_admin', 'coordinator', 'finance'].includes(req.admin.role),
        canConfirmBookings: ['super_admin', 'coordinator'].includes(req.admin.role),
        canEditPujaServices: ['super_admin'].includes(req.admin.role),
        canManagePricing: ['super_admin'].includes(req.admin.role),
        canViewAuditLogs: ['super_admin'].includes(req.admin.role)
      }
    });
  },

  // Health and backend status check
  async getStatus(req, res) {
    res.json({
      success: true,
      service: 'VedicPanditji Backend Foundation',
      version: '1.0.0',
      status: 'healthy',
      time: new Date().toISOString(),
      supabase: {
        configured: config.supabase.isConfigured,
        status: config.supabase.isConfigured ? 'CONNECTED' : 'PENDING_CREDENTIALS'
      }
    });
  }
};

