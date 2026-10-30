// Standardized Error Handler for VedicPanditji Backend Foundation

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(err, req, res, next) {
  console.error('[Backend Error]:', err.message || err);

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

