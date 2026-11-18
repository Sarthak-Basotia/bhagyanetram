import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Astrologer from '../models/Astrologer.js';
import Blog from '../models/Blog.js';
import Booking from '../models/booking.js';
import User from '../models/User.js';
import Review from '../models/Review.js';
import AdminLog from '../models/AdminLog.js';
import { setupTestApp, closeTestApp, apiRequest, createTestAdminToken } from './testHelper.js';

describe('Admin Portal Management (All Functions)', () => {
  let superadminToken;
  let subadminToken;
  let testSubadminId;

  before(async () => {
    await setupTestApp();

    // Ensure Master Admin exists in DB
    await Admin.deleteMany({ email: 'admin@bhagyanetram.com' });
    const masterAdmin = new Admin({
      name: 'BhagyaNetram Administrator',
      email: 'admin@bhagyanetram.com',
      role: 'superadmin',
      permissions: ['astrologers', 'blogs', 'queries', 'users', 'reviews', 'subadmins'],
      status: 'active',
    });
    masterAdmin.setPassword('Admin@2026');
    await masterAdmin.save();

    // Create a sub-admin
    await Admin.deleteMany({ email: 'subadmintest@bhagyanetram.com' });
    const subAdmin = new Admin({
      name: 'Test Subadmin',
      email: 'subadmintest@bhagyanetram.com',
      role: 'subadmin',
      permissions: ['blogs', 'queries'],
      status: 'active',
    });
    subAdmin.setPassword('SubAdmin@2026');
    await subAdmin.save();
    testSubadminId = subAdmin._id.toString();

    superadminToken = createTestAdminToken({
      id: masterAdmin._id.toString(),
      email: masterAdmin.email,
      role: 'superadmin',
    });

    subadminToken = createTestAdminToken({
      id: testSubadminId,
      email: 'subadmintest@bhagyanetram.com',
      role: 'subadmin',
      permissions: ['blogs', 'queries'],
    });
  });

  after(async () => {
    await Admin.deleteMany({ email: /.*test.*@bhagyanetram\.com/ });
    await Astrologer.deleteMany({ name: /Admin Test .*/ });
    await Blog.deleteMany({ title: /Admin Test .*/ });
    await Booking.deleteMany({ name: /Admin Test .*/ });
    await User.deleteMany({ email: /admintestuser.*@example\.com/ });
    await Review.deleteMany({ name: /Admin Test .*/ });
    await closeTestApp();
  });

  describe('1. Admin Authentication', () => {
    it('should reject login with missing credentials', async () => {
      const res = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email: 'admin@bhagyanetram.com' },
      });
      assert.equal(res.status, 400);
      assert.ok(res.body.error);
    });

    it('should reject login with incorrect password', async () => {
      const res = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email: 'admin@bhagyanetram.com', password: 'WrongPassword123' },
      });
      assert.equal(res.status, 401);
      assert.ok(res.body.error);
    });

    it('should successfully log in master admin and return JWT', async () => {
      const res = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email: 'admin@bhagyanetram.com', password: 'Admin@2026' },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.token);
      assert.equal(res.body.admin.email, 'admin@bhagyanetram.com');
      assert.equal(res.body.admin.role, 'superadmin');
    });

    it('should successfully log in sub-admin', async () => {
      const res = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email: 'subadmintest@bhagyanetram.com', password: 'SubAdmin@2026' },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.token);
      assert.equal(res.body.admin.role, 'subadmin');
    });
  });

  describe('2. Dashboard Metrics (GET /api/admin/stats)', () => {
    it('should return statistical aggregates for admin dashboard', async () => {
      const res = await apiRequest('/api/admin/stats', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.equal(typeof res.body.stats.totalAstrologers, 'number');
      assert.equal(typeof res.body.stats.totalBlogs, 'number');
      assert.equal(typeof res.body.stats.totalQueries, 'number');
      assert.equal(typeof res.body.stats.totalUsers, 'number');
      assert.equal(typeof res.body.stats.totalReviews, 'number');
    });
  });

  describe('3. Astrologers Management (CRUD)', () => {
    let createdAstroId;

    it('should create new astrologer profile', async () => {
      const res = await apiRequest('/api/admin/astrologers', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          name: 'Admin Test Astrologer',
          title: 'Senior Vedic Scholar',
          specialization: 'Kundli & Vastu',
          experience: '15 Years',
          languages: 'Hindi, Sanskrit',
          rating: 4.95,
          reviews: '250+',
          available: true,
        },
      });
      assert.equal(res.status, 201);
      assert.ok(res.body.success);
      assert.ok(res.body.data._id);
      createdAstroId = res.body.data._id;
    });

    it('should fetch all astrologers in admin directory', async () => {
      const res = await apiRequest('/api/admin/astrologers', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.ok(res.body.data.some((a) => a._id === createdAstroId));
    });

    it('should update astrologer availability and title', async () => {
      const res = await apiRequest(`/api/admin/astrologers/${createdAstroId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          title: 'Chief Astrological Consultant',
          available: false,
        },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.title, 'Chief Astrological Consultant');
      assert.equal(res.body.data.available, false);
    });

    it('should delete astrologer', async () => {
      const res = await apiRequest(`/api/admin/astrologers/${createdAstroId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.success);

      const exists = await Astrologer.findById(createdAstroId);
      assert.equal(exists, null);
    });
  });

  describe('4. Blogs Management (CRUD)', () => {
    let createdBlogId;

    it('should create new blog article', async () => {
      const res = await apiRequest('/api/admin/blogs', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          title: 'Admin Test Blog Article',
          slug: 'admin-test-blog-article-' + Date.now(),
          category: 'Vastu Shastra',
          excerpt: 'Insights into cosmic energy balancing.',
          content: 'Detailed discussion on ancient remedies.',
          author: 'Bhagya Netram Editorial',
          published: true,
          tags: 'vastu, energy, remedies',
        },
      });
      assert.equal(res.status, 201);
      assert.ok(res.body.success);
      createdBlogId = res.body.data._id;
    });

    it('should fetch all blogs in admin view', async () => {
      const res = await apiRequest('/api/admin/blogs', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.some((b) => b._id === createdBlogId));
    });

    it('should update blog article', async () => {
      const res = await apiRequest(`/api/admin/blogs/${createdBlogId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          title: 'Admin Test Blog Article Updated',
          published: false,
        },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.title, 'Admin Test Blog Article Updated');
      assert.equal(res.body.data.published, false);
    });

    it('should delete blog article', async () => {
      const res = await apiRequest(`/api/admin/blogs/${createdBlogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);

      const check = await Blog.findById(createdBlogId);
      assert.equal(check, null);
    });
  });

  describe('5. Customer Inquiries Management', () => {
    let createdQueryId;

    before(async () => {
      const b = await Booking.create({
        name: 'Admin Test Inquirer',
        email: 'inqtest@example.com',
        phone: '+919988776655',
        service: 'Kundli Milan',
        status: 'pending',
      });
      createdQueryId = b._id.toString();
    });

    it('should retrieve list of customer inquiries', async () => {
      const res = await apiRequest('/api/admin/queries', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.some((q) => q._id === createdQueryId || q.phone === '+919988776655'));
    });

    it('should update inquiry status to resolved and add admin notes', async () => {
      const res = await apiRequest(`/api/admin/queries/${createdQueryId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          status: 'resolved',
          adminNotes: 'Client was contacted and consulted via phone.',
        },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.status, 'resolved');
      assert.equal(res.body.data.adminNotes, 'Client was contacted and consulted via phone.');
    });

    it('should delete inquiry record', async () => {
      const res = await apiRequest(`/api/admin/queries/${createdQueryId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);

      const check = await Booking.findById(createdQueryId);
      assert.equal(check, null);
    });
  });

  describe('6. User Accounts Management', () => {
    let createdUserId;

    before(async () => {
      const u = await User.create({
        name: 'Admin Test User',
        email: 'admintestuser@example.com',
        phone: '+919123456789',
        palmistryCredits: 3,
        status: 'active',
      });
      createdUserId = u._id.toString();
    });

    it('should list all registered users', async () => {
      const res = await apiRequest('/api/admin/users', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.some((u) => u._id === createdUserId));
    });

    it('should adjust user credits and account status', async () => {
      const res = await apiRequest(`/api/admin/users/${createdUserId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          palmistryCredits: 10,
          status: 'suspended',
        },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.palmistryCredits, 10);
      assert.equal(res.body.data.status, 'suspended');
    });

    it('should delete user account', async () => {
      const res = await apiRequest(`/api/admin/users/${createdUserId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);

      const check = await User.findById(createdUserId);
      assert.equal(check, null);
    });
  });

  describe('7. Client Reviews Management', () => {
    let createdReviewId;

    it('should create new client review', async () => {
      const res = await apiRequest('/api/admin/reviews', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          name: 'Admin Test Reviewer',
          location: 'Varanasi',
          text: 'Extremely accurate birth chart analysis by Bhagya Netram.',
          rating: 5,
          active: true,
        },
      });
      assert.equal(res.status, 201);
      assert.ok(res.body.data._id);
      createdReviewId = res.body.data._id;
    });

    it('should list all reviews in admin panel', async () => {
      const res = await apiRequest('/api/admin/reviews', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.some((r) => r._id === createdReviewId));
    });

    it('should update review visibility and rating', async () => {
      const res = await apiRequest(`/api/admin/reviews/${createdReviewId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          rating: 4,
          active: false,
        },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.rating, 4);
      assert.equal(res.body.data.active, false);
    });

    it('should delete review', async () => {
      const res = await apiRequest(`/api/admin/reviews/${createdReviewId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);

      const check = await Review.findById(createdReviewId);
      assert.equal(check, null);
    });
  });

  describe('8. Sub-Admin Accounts & Permissions', () => {
    let createdSubadminId;

    it('should allow Super Admin to create a new sub-admin', async () => {
      const res = await apiRequest('/api/admin/subadmins', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          name: 'Junior Astrologer Manager',
          email: 'juniormanager@bhagyanetram.com',
          password: 'Password@123',
          role: 'subadmin',
          permissions: ['astrologers', 'reviews'],
        },
      });
      assert.equal(res.status, 201);
      assert.ok(res.body.data._id);
      assert.equal(res.body.data.email, 'juniormanager@bhagyanetram.com');
      createdSubadminId = res.body.data._id;
    });

    it('should reject Sub-Admin from creating other sub-admins', async () => {
      const res = await apiRequest('/api/admin/subadmins', {
        method: 'POST',
        headers: { Authorization: `Bearer ${subadminToken}` },
        body: {
          name: 'Unauthorized Subadmin',
          email: 'unauthorized@bhagyanetram.com',
          password: 'Password@123',
        },
      });
      assert.equal(res.status, 403);
    });

    it('should fetch list of sub-admins for Super Admin', async () => {
      const res = await apiRequest('/api/admin/subadmins', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.data.some((s) => s.email === 'juniormanager@bhagyanetram.com'));
    });

    it('should update sub-admin permissions and status', async () => {
      const res = await apiRequest(`/api/admin/subadmins/${createdSubadminId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          permissions: ['astrologers', 'blogs', 'reviews'],
          status: 'inactive',
        },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.data.status, 'inactive');
      assert.ok(res.body.data.permissions.includes('blogs'));
    });

    it('should delete sub-admin account', async () => {
      const res = await apiRequest(`/api/admin/subadmins/${createdSubadminId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);

      const check = await Admin.findById(createdSubadminId);
      assert.equal(check, null);
    });
  });

  describe('9. Administrative Activity & Audit Logs', () => {
    before(async () => {
      // Seed distinct logs for Super Admin and Subadmin
      await AdminLog.create({
        adminId: 'superadmin-master',
        adminName: 'BhagyaNetram Administrator',
        adminEmail: 'admin@bhagyanetram.com',
        adminRole: 'superadmin',
        category: 'security',
        action: 'LOGIN_SUCCESS',
        description: 'Super Admin login event',
        createdAt: new Date(),
      });

      await AdminLog.create({
        adminId: testSubadminId,
        adminName: 'Test Subadmin',
        adminEmail: 'subadmintest@bhagyanetram.com',
        adminRole: 'subadmin',
        category: 'blogs',
        action: 'UPDATE_BLOG',
        description: 'Subadmin updated blog',
        createdAt: new Date(),
      });
    });

    it('should allow Super Admin to view all activity logs', async () => {
      const res = await apiRequest('/api/admin/logs', {
        headers: { Authorization: `Bearer ${superadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.equal(res.body.isSuperAdmin, true);
      assert.ok(res.body.data.length >= 2);
    });

    it('should restrict Sub-Admin to only see their own activity logs', async () => {
      const res = await apiRequest('/api/admin/logs', {
        headers: { Authorization: `Bearer ${subadminToken}` },
      });
      assert.equal(res.status, 200);
      assert.equal(res.body.isSuperAdmin, false);
      assert.ok(res.body.data.every((l) => l.adminId === testSubadminId || l.adminEmail === 'subadmintest@bhagyanetram.com'));
    });
  });

  describe('10. Admin Password Change', () => {
    it('should reject password change with incorrect current password', async () => {
      const res = await apiRequest('/api/admin/change-password', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          currentPassword: 'WrongPassword',
          newPassword: 'NewAdmin@2026',
        },
      });
      assert.equal(res.status, 400);
      assert.ok(res.body.error.toLowerCase().includes('current password is incorrect'));
    });

    it('should reject new password shorter than 6 characters', async () => {
      const res = await apiRequest('/api/admin/change-password', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          currentPassword: 'Admin@2026',
          newPassword: '123',
        },
      });
      assert.equal(res.status, 400);
      assert.ok(res.body.error.includes('at least 6 characters'));
    });

    it('should successfully update admin password', async () => {
      const res = await apiRequest('/api/admin/change-password', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          currentPassword: 'Admin@2026',
          newPassword: 'UpdatedAdmin@2026',
        },
      });
      assert.equal(res.status, 200);
      assert.ok(res.body.message.toLowerCase().includes('password changed successfully'));

      // Restore password back to Admin@2026
      await apiRequest('/api/admin/change-password', {
        method: 'POST',
        headers: { Authorization: `Bearer ${superadminToken}` },
        body: {
          currentPassword: 'UpdatedAdmin@2026',
          newPassword: 'Admin@2026',
        },
      });
    });
  });
});
