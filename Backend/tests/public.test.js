import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import User from '../models/User.js';
import Astrologer from '../models/Astrologer.js';
import Blog from '../models/Blog.js';
import Review from '../models/Review.js';
import Booking from '../models/booking.js';
import { setupTestApp, closeTestApp, apiRequest, createTestUserToken } from './testHelper.js';

describe('Public Content & Client Endpoints', () => {
  let testUser;
  let testUserToken;

  before(async () => {
    await setupTestApp();

    // Create a test astrologer
    await Astrologer.deleteMany({ name: 'Public Test Astrologer' });
    await Astrologer.create({
      name: 'Public Test Astrologer',
      title: 'Vedic Master',
      specialization: 'Kundli, Vastu',
      experience: '12 Years',
      languages: 'Hindi, English',
      rating: 4.9,
      reviews: '120+',
      available: true,
    });

    // Create a test user for palmistry
    await User.deleteMany({ email: 'palmuser@example.com' });
    testUser = await User.create({
      name: 'Palmistry Client',
      email: 'palmuser@example.com',
      phone: '+919999988888',
      palmistryCredits: 2,
    });
    testUserToken = createTestUserToken({ userId: testUser._id.toString() });
  });

  after(async () => {
    await Astrologer.deleteMany({ name: 'Public Test Astrologer' });
    await Booking.deleteMany({ phone: '+919876500000' });
    await User.deleteMany({ email: 'palmuser@example.com' });
    await closeTestApp();
  });

  describe('GET /api/astrologers', () => {
    it('should return list of available astrologers', async () => {
      const res = await apiRequest('/api/astrologers');
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.length > 0);
      const astro = res.body.data.find((a) => a.name === 'Public Test Astrologer');
      assert.ok(astro);
      assert.equal(astro.available, true);
    });
  });

  describe('GET /api/blogs & GET /api/blogs/:slug', () => {
    it('should return public blog articles', async () => {
      const res = await apiRequest('/api/blogs');
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.length > 0);
    });

    it('should fetch blog post by slug and increment views', async () => {
      const listRes = await apiRequest('/api/blogs');
      const firstBlog = listRes.body.data[0];
      const initialViews = firstBlog.views || 0;

      const slugRes = await apiRequest(`/api/blogs/${firstBlog.slug}`);
      assert.equal(slugRes.status, 200);
      assert.ok(slugRes.body.success);
      assert.equal(slugRes.body.data.slug, firstBlog.slug);
      assert.equal(slugRes.body.data.views, initialViews + 1);
    });

    it('should return 404 for nonexistent blog slug', async () => {
      const res = await apiRequest('/api/blogs/non-existent-slug-xyz');
      assert.equal(res.status, 404);
      assert.ok(res.body.error);
    });
  });

  describe('GET /api/reviews', () => {
    it('should return approved reviews for testimonials carousel', async () => {
      const res = await apiRequest('/api/reviews');
      assert.equal(res.status, 200);
      assert.ok(res.body.success);
      assert.ok(Array.isArray(res.body.data));
    });
  });

  describe('POST /api/bookings', () => {
    it('should reject consultation inquiry when required fields are missing', async () => {
      const res = await apiRequest('/api/bookings', {
        method: 'POST',
        body: { name: 'Incomplete' },
      });
      assert.equal(res.status, 400);
    });

    it('should create consultation inquiry successfully', async () => {
      const res = await apiRequest('/api/bookings', {
        method: 'POST',
        body: {
          name: 'Public Inquirer',
          email: 'inquirer@example.com',
          phone: '+919876500000',
          service: 'Vastu Consultation',
          astrologerName: 'Pandit Pranav',
          query: 'I need guidance on main door vastu.',
          termsAccepted: true,
        },
      });

      assert.equal(res.status, 201);
      assert.ok(res.body.bookingId);

      const saved = await Booking.findById(res.body.bookingId);
      assert.ok(saved);
      assert.equal(saved.name, 'Public Inquirer');
      assert.equal(saved.phone, '+919876500000');
      assert.equal(saved.status, 'pending');
    });
  });

  describe('POST /api/palmistry/analyze', () => {
    it('should reject unauthenticated request', async () => {
      const res = await apiRequest('/api/palmistry/analyze', {
        method: 'POST',
        body: { image: 'base64_data...' },
      });
      assert.equal(res.status, 401);
    });

    it('should reject missing palm image', async () => {
      const res = await apiRequest('/api/palmistry/analyze', {
        method: 'POST',
        headers: { Authorization: `Bearer ${testUserToken}` },
        body: {},
      });
      assert.equal(res.status, 400);
      assert.equal(res.body.error, 'Palm image is required.');
    });

    it('should reject when user has 0 palmistry credits', async () => {
      await User.updateOne({ _id: testUser._id }, { palmistryCredits: 0 });

      const res = await apiRequest('/api/palmistry/analyze', {
        method: 'POST',
        headers: { Authorization: `Bearer ${testUserToken}` },
        body: { image: 'base64_test_image_data' },
      });

      assert.equal(res.status, 403);
      assert.ok(res.body.error.includes('all 3 of your palmistry chances'));
    });
  });
});
