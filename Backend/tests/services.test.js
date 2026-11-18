import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { generateMonthCalendar, verifiedYearFestivals2026 } from '../services/festivalGenerator.js';
import { logAdminActivity, seedInitialLogsIfEmpty } from '../services/logService.js';
import { sendBookingEmail } from '../emailUtils.js';
import AdminLog from '../models/AdminLog.js';
import { setupTestApp, closeTestApp } from './testHelper.js';

describe('Services & Domain Business Logic', () => {
  before(async () => {
    await setupTestApp();
  });

  after(async () => {
    await closeTestApp();
  });

  describe('1. Festival Calendar Generator (Drik Panchang)', () => {
    it('should generate valid 30 or 31 day month structures for 2026', async () => {
      for (let m = 1; m <= 12; m++) {
        const calendar = await generateMonthCalendar(2026, m);
        assert.equal(calendar.year, 2026);
        assert.equal(calendar.month, m);
        assert.ok(calendar.westernMonthName);
        assert.ok(calendar.hinduMonthNames);
        assert.ok(Array.isArray(calendar.days));
        assert.ok(calendar.days.length >= 28 && calendar.days.length <= 31);

        // Every day must have authentic tithi Hindi & English
        for (const day of calendar.days) {
          assert.equal(typeof day.date, 'number');
          assert.ok(day.dayOfWeek);
          assert.ok(day.tithiHindi);
          assert.ok(day.tithiEnglish);
        }
      }
    });

    it('should correctly position Govardhan Puja on November 9, 2026', async () => {
      const novCalendar = await generateMonthCalendar(2026, 11);
      const day9 = novCalendar.days.find((d) => d.date === 9);
      assert.ok(day9);
      assert.ok(day9.festivalEnglish.includes('Govardhan Puja'));
      assert.equal(day9.isMajorFestival, true);
    });

    it('should correctly position Maha Shivratri on February 15, 2026', async () => {
      const febCalendar = await generateMonthCalendar(2026, 2);
      const day15 = febCalendar.days.find((d) => d.date === 15);
      assert.ok(day15);
      assert.ok(day15.festivalEnglish.includes('Maha Shivratri'));
      assert.equal(day15.isMajorFestival, true);
    });
  });

  describe('2. Audit Logging Service', () => {
    it('should record administrative activity log with full metadata', async () => {
      const mockReq = {
        headers: { 'x-forwarded-for': '192.168.1.100', 'user-agent': 'Automated Test Suite' },
        socket: { remoteAddress: '127.0.0.1' },
      };

      const log = await logAdminActivity({
        req: mockReq,
        admin: {
          id: 'admin_test_123',
          name: 'Super Auditor',
          email: 'auditor@bhagyanetram.com',
          role: 'superadmin',
        },
        action: 'TEST_ACTION',
        category: 'security',
        description: 'Verified security protocol execution',
        targetId: 'target_abc',
        targetTitle: 'Firewall Policy',
      });

      assert.ok(log);
      assert.equal(log.adminEmail, 'auditor@bhagyanetram.com');
      assert.equal(log.category, 'security');
      assert.equal(log.action, 'TEST_ACTION');
      assert.equal(log.targetTitle, 'Firewall Policy');
      assert.equal(log.ip, '192.168.1.100');
    });

    it('should populate seed logs if collection is empty', async () => {
      await seedInitialLogsIfEmpty();
      const count = await AdminLog.countDocuments({});
      assert.ok(count > 0);
    });
  });

  describe('3. Email Notification Utility', () => {
    it('should execute sendBookingEmail gracefully without unhandled exceptions', async () => {
      // In offline / test mode, SMTP may not connect, but must not crash
      await assert.doesNotReject(async () => {
        await sendBookingEmail({
          name: 'Devotee Client',
          email: 'devotee@example.com',
          phone: '+919988112233',
          services: ['Horoscope Reading', 'Vastu Consultation'],
          date: new Date().toISOString(),
          time: '11:00 AM',
          message: 'Please guide me on career prospects.',
        });
      });
    });
  });
});
