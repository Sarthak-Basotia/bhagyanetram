process.env.NODE_ENV = 'test';
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-test-dummy-key';

import http from 'http';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'bhagyanetram_secret_key_123';
const TEST_DB_URI = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/bhagyanetram_test';

let server = null;
let baseUrl = '';

export async function setupTestApp() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_DB_URI);
  }

  if (!server) {
    server = http.createServer(app);
    await new Promise((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  }

  return { server, baseUrl };
}

export async function closeTestApp() {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    server = null;
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export async function apiRequest(path, options = {}) {
  if (!baseUrl) {
    await setupTestApp();
  }

  const url = `${baseUrl}${path}`;
  const headers = { ...(options.headers || {}) };
  let body = options.body;

  if (body !== undefined && typeof body === 'object') {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body,
  });

  const contentType = res.headers.get('content-type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  return {
    status: res.status,
    headers: res.headers,
    body: data,
  };
}

export function createTestUserToken(payload = {}) {
  return jwt.sign(
    {
      userId: payload.userId || new mongoose.Types.ObjectId().toString(),
      email: payload.email || 'testuser@example.com',
      ...payload,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function createTestAdminToken(payload = {}) {
  return jwt.sign(
    {
      id: payload.id || new mongoose.Types.ObjectId().toString(),
      email: payload.email || 'admin@bhagyanetram.com',
      name: payload.name || 'Test Administrator',
      role: payload.role || 'superadmin',
      permissions: payload.permissions || ['astrologers', 'blogs', 'queries', 'users', 'reviews', 'subadmins'],
      ...payload,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}
