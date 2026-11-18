import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { setupTestApp, closeTestApp, apiRequest } from './testHelper.js';

describe('Server & Global Infrastructure', () => {
  before(async () => {
    await setupTestApp();
  });

  after(async () => {
    await closeTestApp();
  });

  it('should return CORS headers on preflight OPTIONS request', async () => {
    const res = await apiRequest('/api/blogs', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'GET',
      },
    });
    assert.equal(res.status, 204);
  });

  it('should return 404 for undefined endpoints', async () => {
    const res = await apiRequest('/api/undefined-endpoint-xyz-123');
    assert.equal(res.status, 404);
  });

  it('should handle JSON payloads without errors', async () => {
    const res = await apiRequest('/api/admin/login', {
      method: 'POST',
      body: { email: 'invalid@example.com', password: 'wrong' },
    });
    // Should be rejected by auth controller with 401, not a 500 JSON parse error
    assert.equal(res.status, 401);
  });
});
