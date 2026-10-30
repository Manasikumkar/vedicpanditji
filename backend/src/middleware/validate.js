export const ALLOWED_STATUSES = [
  'New',
  'Under Review',
  'Awaiting Customer Response',
  'Awaiting Panditji Confirmation',
  'Confirmed',
  'Completed',
  'Cancelled'
];

export function validateEnquiryCreation(req, res, next) {
  const customerName = req.body.customerName;
  const customerPhone = req.body.customerPhone || req.body.phone;
  const serviceName = req.body.serviceName;

  // Normalize fields on request body for unified downstream processing
  req.body.customerPhone = customerPhone;
  if (!req.body.packagePriceDisplay && req.body.packagePrice) {
    req.body.packagePriceDisplay = req.body.packagePrice;
  }

  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: customerName is required and must be at least 2 characters.'
    });
  }

  if (!customerPhone || typeof customerPhone !== 'string' || customerPhone.trim().length < 8) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: customerPhone is required and must be a valid contact number.'
    });
  }

  if (!serviceName || typeof serviceName !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: serviceName is required.'
    });
  }

  next();
}

export function validateStatusUpdate(req, res, next) {
  const { status } = req.body;

  if (!status || !ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Validation Error: status must be one of: ${ALLOWED_STATUSES.join(', ')}`
    });
  }

  next();
}

export function validateQuotation(req, res, next) {
  const { totalQuotedAmount, isPriceVerified } = req.body;

  if (totalQuotedAmount !== undefined && (typeof totalQuotedAmount !== 'number' || totalQuotedAmount < 0)) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: totalQuotedAmount must be a non-negative number.'
    });
  }

  if (isPriceVerified !== undefined && typeof isPriceVerified !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: isPriceVerified must be a boolean.'
    });
  }

  next();
}

export function validateConfirmation(req, res, next) {
  const { assignedPanditName, ceremonyDate } = req.body;

  if (!assignedPanditName || typeof assignedPanditName !== 'string' || assignedPanditName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: assignedPanditName is required for booking confirmation.'
    });
  }

  if (!ceremonyDate || typeof ceremonyDate !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: ceremonyDate is required for booking confirmation.'
    });
  }

  next();
}
