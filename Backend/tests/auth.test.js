import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { setupTestApp, closeTestApp, apiRequest, createTestUserToken, createTestAdminToken } from './testHelper.js';

describe('Authentication & Access Control', () => {
  before(async () => {
    await setupTestApp();
    await User.deleteMany({ email: /test.*@example\.com/ });
  });

  after(async () => {
    await User.deleteMany({ email: /test.*@example\.com/ });
    await closeTestApp();
  });

  describe('POST /api/auth/send-otp', () => {
    it('should reject request when required fields are missing', async () => {
      const res = await apiRequest('/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'incomplete@example.com' },
      });
      assert.equal(res.status, 400);
      assert.ok(res.body.error);
    });

    it('should send OTP and create new user when valid info provided', async () => {
      const res = await apiRequest('/api/auth/send-otp', {
        method: 'POST',
        body: {
          name: 'Test Customer',
          email: 'testcustomer@example.com',
          phone: '+919876543210',
          termsAccepted: true,
        },
      });

      assert.equal(res.status, 200);
      assert.ok(res.body.testOtp);
      assert.equal(res.body.testOtp.length, 6);

      const user = await User.findOne({ email: 'testcustomer@example.com' });
      assert.ok(user);
      assert.equal(user.name, 'Test Customer');
      assert.equal(user.otp, res.body.testOtp);
      assert.equal(user.termsAccepted, true);
    });

    it('should update OTP on existing user upon re-sending', async () => {
      const res = await apiRequest('/api/auth/send-otp', {
        method: 'POST',
        body: {
          name: 'Test Customer Updated',
          email: 'testcustomer@example.com',
          phone: '+919876543210',
        },
      });

      assert.equal(res.status, 200);
      const user = await User.findOne({ email: 'testcustomer@example.com' });
      assert.equal(user.name, 'Test Customer Updated');
      assert.equal(user.otp, res.body.testOtp);
    });
  });

  describe('POST /api/auth/verify-otp', () => {
    it('should reject missing email or otp', async () => {
      const res = await apiRequest('/api/auth/verify-otp', {
        method: 'POST',
        body: { email: 'testcustomer@example.com' },
      });
      assert.equal(res.status, 400);
    });

    it('should reject non-existent user email', async () => {
      const res = await apiRequest('/api/auth/verify-otp', {
        method: 'POST',
        body: { email: 'ghost@example.com', otp: '123456' },
      });
      assert.equal(res.status, 404);
    });

    it('should reject incorrect OTP', async () => {
      const res = await apiRequest('/api/auth/verify-otp', {
        method: 'POST',
        body: { email: 'testcustomer@example.com', otp: '000000' },
      });
      assert.equal(res.status, 400);
      assert.equal(res.body.error, 'Invalid OTP.');
    });

    it('should reject expired OTP', async () => {
      await User.updateOne(
        { email: 'testcustomer@example.com' },
        { otpExpires: new Date(Date.now() - 60000) }
      );

      const user = await User.findOne({ email: 'testcustomer@example.com' });
      const res = await apiRequest('/api/auth/verify-otp', {
        method: 'POST',
        body: { email: 'testcustomer@example.com', otp: user.otp },
      });
      assert.equal(res.status, 400);
      assert.equal(res.body.error, 'OTP has expired.');
    });

    it('should accept valid OTP, issue JWT, and clear OTP', async () => {
      // Re-send fresh OTP
      const sendRes = await apiRequest('/api/auth/send-otp', {
        method: 'POST',
        body: {
          name: 'Verified Customer',
          email: 'testcustomer@example.com',
          phone: '+919876543210',
        },
      });
      const validOtp = sendRes.body.testOtp;

      const verifyRes = await apiRequest('/api/auth/verify-otp', {
        method: 'POST',
        body: { email: 'testcustomer@example.com', otp: validOtp },
      });

      assert.equal(verifyRes.status, 200);
      assert.ok(verifyRes.body.token);
      assert.equal(verifyRes.body.user.email, 'testcustomer@example.com');
      assert.equal(verifyRes.body.user.palmistryCredits, 3);

      const updatedUser = await User.findOne({ email: 'testcustomer@example.com' });
      assert.equal(updatedUser.otp, null);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should reject request without Authorization header', async () => {
      const res = await apiRequest('/api/auth/me');
      assert.equal(res.status, 401);
    });

    it('should reject invalid or forged token', async () => {
      const res = await apiRequest('/api/auth/me', {
        headers: { Authorization: 'Bearer forged.token.signature' },
      });
      assert.equal(res.status, 401);
    });

    it('should return user details for authenticated user', async () => {
      const user = await User.findOne({ email: 'testcustomer@example.com' });
      const token = createTestUserToken({ userId: user._id.toString(), email: user.email });

      const res = await apiRequest('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      assert.equal(res.status, 200);
      assert.equal(res.body.email, 'testcustomer@example.com');
      assert.equal(res.body.palmistryCredits, 3);
    });
  });

  describe('Middleware: requireAdmin', () => {
    it('should reject requests without admin token on protected admin route', async () => {
      const res = await apiRequest('/api/admin/stats');
      assert.equal(res.status, 401);
    });

    it('should reject regular user token attempting to access admin route', async () => {
      const userToken = createTestUserToken({ role: 'user' });
      const res = await apiRequest('/api/admin/stats', {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      assert.equal(res.status, 403);
    });

    it('should accept valid admin token on protected admin route', async () => {
      const adminToken = createTestAdminToken({ role: 'superadmin' });
      const res = await apiRequest('/api/admin/stats', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
    });
  });
});
