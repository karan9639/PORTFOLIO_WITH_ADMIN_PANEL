export function notFoundHandler(req, res) {
  return res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  return res.status(statusCode).json({ success: false, message, ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}) });
}
