import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { apiRouter } from './routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

export const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Request logging in development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    // Exclude noisy health checks if needed
    if (req.path !== '/api/health') {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });
}

// Mount API routes
app.use('/api', apiRouter);

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

