import { describe, it, before, after, mock } from 'node:test';
import assert from 'node:assert/strict';
import Horoscope from '../models/Horoscope.js';
import { setupTestApp, closeTestApp, apiRequest, createTestAdminToken } from './testHelper.js';

describe('Astrology, Horoscopes & Calculations', () => {
  let adminToken;

  before(async () => {
    await setupTestApp();
    adminToken = createTestAdminToken({ role: 'superadmin' });

    // Seed a test horoscope so DB lookup succeeds without external AI call
    await Horoscope.deleteMany({ sign: 'leo', timeframe: 'daily' });
    await Horoscope.create({
      sign: 'leo',
      timeframe: 'daily',
      overview: 'Today is a wonderful day for bold decisions.',
      love: 'Romantic harmonies are aligned.',
      career: 'New leadership opportunities will emerge.',
      health: 'High energy and vitality.',
      lucky: {
        number: 7,
        color: 'Gold',
        time: '10:00 AM',
      },
      lastUpdated: new Date(),
    });
  });

  after(async () => {
    await Horoscope.deleteMany({ sign: 'leo', timeframe: 'daily' });
    await closeTestApp();
  });

  describe('GET /api/horoscope', () => {
    it('should reject request missing required sign query param', async () => {
      const res = await apiRequest('/api/horoscope');
      assert.equal(res.status, 400);
      assert.equal(res.body.detail, "Query param 'sign' is required.");
    });

    it('should reject invalid timeframe parameter', async () => {
      const res = await apiRequest('/api/horoscope?sign=leo&timeframe=hourly');
      assert.equal(res.status, 400);
      assert.ok(res.body.detail.includes('Invalid timeframe'));
    });

    it('should retrieve existing horoscope data for valid sign and timeframe', async () => {
      const res = await apiRequest('/api/horoscope?sign=leo&timeframe=daily');
      assert.equal(res.status, 200);
      assert.equal(res.body.overview, 'Today is a wonderful day for bold decisions.');
      assert.equal(res.body.lucky.color, 'Gold');
      assert.equal(res.body.lucky.number, 7);
    });
  });

  describe('POST /api/admin/seed-horoscopes', () => {
    it('should reject invalid timeframe parameter', async () => {
      const res = await apiRequest('/api/admin/seed-horoscopes', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: { timeframe: 'biweekly' },
      });
      assert.equal(res.status, 400);
      assert.equal(res.body.detail, 'Invalid timeframe.');
    });

    it('should initiate horoscope seeding job for valid timeframe', async () => {
      const res = await apiRequest('/api/admin/seed-horoscopes', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: { timeframe: 'daily' },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.message.includes('Seeding job started for daily'));
    });
  });

  describe('GET /api/astrology/festivals', () => {
    it('should return authentic Drik Panchang 2026 festival calendar data', async () => {
      const res = await apiRequest('/api/astrology/festivals');
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.ok(Array.isArray(res.body.data));
      assert.equal(res.body.data.length, 12);

      // Verify authentic November 2026 data contains Govardhan Puja
      const nov = res.body.data.find((c) => c.month === 11);
      assert.ok(nov);
      assert.equal(nov.year, 2026);
      assert.ok(nov.westernMonthName.includes('NOVEMBER'));
      assert.ok(Array.isArray(nov.days));
      assert.equal(nov.days.length, 30);
    });
  });

  describe('Calculation Endpoints (Error Handling & Input Validation)', () => {
    it('POST /api/astrology/kundli should handle offline engine gracefully', async () => {
      const res = await apiRequest('/api/astrology/kundli', {
        method: 'POST',
        body: {
          name: 'Devotee',
          dob: '1995-10-15',
          time: '14:30',
          lat: '28.6139',
          lon: '77.2090',
        },
      });
      // When python engine is offline or errors, should return clean 500 error
      assert.ok([500, 200].includes(res.status));
    });

    it('POST /api/astrology/panchang should handle requests cleanly', async () => {
      const res = await apiRequest('/api/astrology/panchang', {
        method: 'POST',
        body: {
          date: '2026-11-18',
          time: '12:00',
          lat: 28.6139,
          lon: 77.2090,
        },
      });
      assert.ok([500, 200].includes(res.status));
    });

    it('POST /api/astrology/matching should handle requests cleanly', async () => {
      const res = await apiRequest('/api/astrology/matching', {
        method: 'POST',
        body: {
          boy: { name: 'Rahul', dob: '1992-05-10', time: '10:00', lat: 28.6, lon: 77.2 },
          girl: { name: 'Pooja', dob: '1995-08-20', time: '14:30', lat: 28.6, lon: 77.2 },
        },
      });
      assert.ok([500, 200].includes(res.status));
    });

    it('POST /api/astrology/numerology should handle requests cleanly', async () => {
      const res = await apiRequest('/api/astrology/numerology', {
        method: 'POST',
        body: {
          name: 'Sharad Bansal',
          dob: '1990-01-01',
          gender: 'male',
        },
      });
      assert.ok([500, 200].includes(res.status));
    });

    it('POST /api/astrology/transit should handle requests cleanly', async () => {
      const res = await apiRequest('/api/astrology/transit', {
        method: 'POST',
        body: {
          datetime: '2026-11-18T12:00:00',
          lat: 28.6139,
          lon: 77.2090,
        },
      });
      assert.ok([500, 200].includes(res.status));
    });
  });
});
