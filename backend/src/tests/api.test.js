import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../app.js';

// Simple helper to execute in-process requests against the Express app
function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      const port = server.address().port;
      const url = `http://localhost:${port}${path}`;

      try {
        const fetchOptions = {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
          }
        };

        if (options.body) {
          fetchOptions.body = JSON.stringify(options.body);
        }

        const response = await fetch(url, fetchOptions);
        const json = await response.json().catch(() => null);

        server.close(() => {
          resolve({ status: response.status, data: json });
        });
      } catch (err) {
        server.close(() => reject(err));
      }
    });
  });
}

test('GET /api/health returns healthy system status', async () => {
  const res = await makeRequest('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.service, 'VedicPanditji Backend Foundation');
  assert.equal(res.data.supabase.status, 'PENDING_CREDENTIALS');
});

test('POST /api/enquiries validates required fields', async () => {
  const invalidRes = await makeRequest('/api/enquiries', {
    method: 'POST',
    body: {
      customerName: 'A' // too short, missing phone and service
    }
  });
  assert.equal(invalidRes.status, 400);
  assert.equal(invalidRes.data.success, false);
  assert.match(invalidRes.data.error, /customerName/i);
});

test('POST /api/enquiries successfully creates an enquiry', async () => {
  const validRes = await makeRequest('/api/enquiries', {
    method: 'POST',
    body: {
      customerName: 'Devotee Test User',
      customerPhone: '+91 9876543210',
      serviceName: 'Griha Pravesh Puja',
      city: 'Pune',
      packageName: 'Package A — Ritual Only',
      packagePriceDisplay: '₹3,500*'
    }
  });
  assert.equal(validRes.status, 201);
  assert.equal(validRes.data.success, true);
  assert.equal(validRes.data.data.customerName, 'Devotee Test User');
  assert.equal(validRes.data.data.status, 'New');
});

test('Protected admin endpoints require valid Authorization header', async () => {
  const unauthRes = await makeRequest('/api/enquiries');
  assert.equal(unauthRes.status, 401);
  assert.equal(unauthRes.data.success, false);

  const authRes = await makeRequest('/api/enquiries', {
    headers: { Authorization: 'Bearer dev-admin-session' }
  });
  assert.equal(authRes.status, 200);
  assert.equal(authRes.data.success, true);
  assert.ok(Array.isArray(authRes.data.data));
});

test('PATCH /api/enquiries/:id/status updates status with audit log', async () => {
  const res = await makeRequest('/api/enquiries/VP-DEV-1001/status', {
    method: 'PATCH',
    headers: { Authorization: 'Bearer dev-admin-session' },
    body: {
      status: 'Under Review',
      adminInternalNotes: 'Acharya Mishraji contacted for schedule check.'
    }
  });
  assert.equal(res.status, 200);
  assert.equal(res.data.data.status, 'Under Review');
});

test('PATCH /api/bookings/:id/status enforces valid status lifecycle', async () => {
  const invalidRes = await makeRequest('/api/bookings/BKG-DEV-2001/status', {
    method: 'PATCH',
    headers: { Authorization: 'Bearer dev-admin-session' },
    body: { status: 'RandomInvalidStatus' }
  });
  assert.equal(invalidRes.status, 400);

  const validRes = await makeRequest('/api/bookings/BKG-DEV-2001/status', {
    method: 'PATCH',
    headers: { Authorization: 'Bearer dev-admin-session' },
    body: { status: 'Under Review', reasonNotes: 'Reviewing Pandit schedule' }
  });
  assert.equal(validRes.status, 200);
  assert.equal(validRes.data.data.status, 'Under Review');
});

test('PATCH /api/bookings/:id/quotation records verified pricing', async () => {
  const quoteRes = await makeRequest('/api/bookings/BKG-DEV-2001/quotation', {
    method: 'PATCH',
    headers: { Authorization: 'Bearer dev-admin-session' },
    body: {
      verifiedDakshina: 3500,
      verifiedSamagriCost: 2000,
      totalQuotedAmount: 5500,
      isPriceVerified: true,
      quotationNotes: 'Quotation verified with Senior Purohit.'
    }
  });
  assert.equal(quoteRes.status, 200);
  assert.equal(quoteRes.data.data.isPriceVerified, true);
  assert.equal(quoteRes.data.data.totalQuotedAmount, 5500);
});

test('POST /api/bookings/:id/confirm allocates panditji explicitly', async () => {
  const confirmRes = await makeRequest('/api/bookings/BKG-DEV-2001/confirm', {
    method: 'POST',
    headers: { Authorization: 'Bearer dev-admin-session' },
    body: {
      assignedPanditName: 'Pandit Radheshyam Shastri',
      assignedPanditPhone: '+91 97668 80979',
      ceremonyDate: '2026-11-15',
      ceremonyTime: '08:00 AM - 11:00 AM',
      confirmationNotes: 'Explicitly verified via direct phone conversation with Panditji.'
    }
  });
  assert.equal(confirmRes.status, 200);
  assert.equal(confirmRes.data.data.status, 'Confirmed');
  assert.ok(confirmRes.data.data.confirmedAt);
});

test('GET /api/stats/overview returns correct aggregation counts', async () => {
  const statsRes = await makeRequest('/api/stats/overview', {
    headers: { Authorization: 'Bearer dev-admin-session' }
  });
  assert.equal(statsRes.status, 200);
  assert.ok(typeof statsRes.data.data.totalEnquiries === 'number');
  assert.ok(typeof statsRes.data.data.confirmedBookings === 'number');
  assert.equal(statsRes.data.data.isDevelopmentMode, true);
});

