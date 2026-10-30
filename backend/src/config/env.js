import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  supabase: {
    url: process.env.SUPABASE_URL || null,
    anonKey: process.env.SUPABASE_ANON_KEY || null,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
    isConfigured: Boolean(
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_URL.startsWith('https://') &&
      !process.env.SUPABASE_URL.includes('your-project-ref') &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')
    )
  },
  jwtSecret: process.env.JWT_SECRET || 'dev-local-secret-do-not-use-in-production',
  adminAlertWebhookUrl: process.env.ADMIN_ALERT_WEBHOOK_URL || null
};

