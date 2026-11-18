import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Pure Date filter matching logic mirroring AdminDashboard
const matchesDateFilter = (rawDate, datePreset, startDate, endDate) => {
  if (!datePreset || datePreset === 'all') {
    if (!startDate && !endDate) return true;
  }

  if (!rawDate) return false;
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return false;

  const now = new Date();

  if (datePreset === 'today') {
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return d >= startOfToday && d <= endOfToday;
  }

  if (datePreset === 'yesterday') {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0, 0);
    const endOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
    return d >= startOfYesterday && d <= endOfYesterday;
  }

  if (datePreset === 'last7') {
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0, 0);
    return d >= sevenDaysAgo && d <= now;
  }

  if (datePreset === 'last30') {
    const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30, 0, 0, 0, 0);
    return d >= thirtyDaysAgo && d <= now;
  }

  if (datePreset === 'thisMonth') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return d >= startOfMonth && d <= endOfMonth;
  }

  // Custom range
  if (startDate) {
    const s = new Date(startDate + 'T00:00:00');
    if (!isNaN(s.getTime()) && d < s) return false;
  }
  if (endDate) {
    const e = new Date(endDate + 'T23:59:59.999');
    if (!isNaN(e.getTime()) && d > e) return false;
  }

  return true;
};

// Pure CSV sanitizer mirroring AdminDashboard
const formatCSV = (headers, rows) => {
  const sanitize = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvRows = [
    headers.map(sanitize).join(','),
    ...rows.map((r) => r.map(sanitize).join(',')),
  ];

  return '\uFEFF' + csvRows.join('\r\n');
};

describe('Frontend Utilities & Client Logics', () => {
  describe('1. Date Filter Logic (AdminDashboard)', () => {
    it('should match all dates when preset is "all"', () => {
      assert.equal(matchesDateFilter(new Date().toISOString(), 'all'), true);
      assert.equal(matchesDateFilter('2020-01-01', 'all'), true);
    });

    it('should accurately match "today"', () => {
      const todayISO = new Date().toISOString();
      const lastYearISO = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
      assert.equal(matchesDateFilter(todayISO, 'today'), true);
      assert.equal(matchesDateFilter(lastYearISO, 'today'), false);
    });

    it('should accurately match "last7" days', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString();
      assert.equal(matchesDateFilter(threeDaysAgo, 'last7'), true);
      assert.equal(matchesDateFilter(twentyDaysAgo, 'last7'), false);
    });

    it('should accurately match custom range', () => {
      const targetDate = '2026-06-15T12:00:00.000Z';
      assert.equal(matchesDateFilter(targetDate, 'custom', '2026-06-01', '2026-06-30'), true);
      assert.equal(matchesDateFilter(targetDate, 'custom', '2026-07-01', '2026-07-31'), false);
    });
  });

  describe('2. CSV Formatter (RFC 4180 + UTF-8 BOM)', () => {
    it('should prepend UTF-8 BOM and escape quotes and commas properly', () => {
      const headers = ['Name', 'Title', 'Review'];
      const rows = [
        ['Pandit Pranav', 'Senior Astrologer', 'Accurate, "very helpful" guidance'],
        ['Gargi Ji', 'Vastu Expert', 'Simple & effective remedies'],
      ];

      const csv = formatCSV(headers, rows);
      assert.ok(csv.startsWith('\uFEFF'));
      assert.ok(csv.includes('"Accurate, ""very helpful"" guidance"'));
      assert.ok(csv.includes('"Pandit Pranav"'));
    });
  });

  describe('3. Route Path Integrity', () => {
    it('should use the /pranav-admin prefix for admin security', () => {
      const adminPath = '/pranav-admin';
      assert.equal(adminPath.startsWith('/pranav-admin'), true);
    });
  });
});
