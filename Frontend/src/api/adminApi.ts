// src/api/adminApi.ts

const API_BASE = '/api';

export const getAdminToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

export const setAdminSession = (token: string, adminUser: any) => {
  localStorage.setItem('adminToken', token);
  localStorage.setItem('adminUser', JSON.stringify(adminUser));
};

export const clearAdminSession = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

export const getAdminUser = () => {
  const userStr = localStorage.getItem('adminUser');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

const getAdminHeaders = () => {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// 1. Admin Authentication
export const adminLoginApi = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Admin login failed');
  }
  return data;
};

// 2. Admin Dashboard Stats
export const fetchAdminStats = async () => {
  const response = await fetch(`${API_BASE}/admin/stats`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch dashboard stats');
  return data;
};

// 3. Astrologer Management
export const fetchAdminAstrologers = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/astrologers`, {
      headers: getAdminHeaders(),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Fallback to public endpoint if admin endpoint is not reachable
  }

  const fallbackRes = await fetch(`${API_BASE}/astrologers`);
  const data = await fallbackRes.json();
  if (!fallbackRes.ok) throw new Error(data.error || 'Failed to fetch astrologers');
  return data;
};

export const createAstrologerApi = async (astrologerData: any) => {
  const response = await fetch(`${API_BASE}/admin/astrologers`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: JSON.stringify(astrologerData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to create astrologer');
  return data;
};

export const updateAstrologerApi = async (id: string, astrologerData: any) => {
  const response = await fetch(`${API_BASE}/admin/astrologers/${id}`, {
    method: 'PUT',
    headers: getAdminHeaders(),
    body: JSON.stringify(astrologerData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update astrologer');
  return data;
};

export const deleteAstrologerApi = async (id: string) => {
  const response = await fetch(`${API_BASE}/admin/astrologers/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete astrologer');
  return data;
};

// 4. Blog Management
export const fetchAdminBlogs = async () => {
  const response = await fetch(`${API_BASE}/admin/blogs`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch blogs');
  return data;
};

export const createBlogApi = async (blogData: any) => {
  const response = await fetch(`${API_BASE}/admin/blogs`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to create blog');
  return data;
};

export const updateBlogApi = async (id: string, blogData: any) => {
  const response = await fetch(`${API_BASE}/admin/blogs/${id}`, {
    method: 'PUT',
    headers: getAdminHeaders(),
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update blog');
  return data;
};

export const deleteBlogApi = async (id: string) => {
  const response = await fetch(`${API_BASE}/admin/blogs/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete blog');
  return data;
};

// 5. Inquiries & Queries Management
export const fetchAdminQueries = async (params?: { status?: string; search?: string }) => {
  const queryParts = [];
  if (params?.status && params.status !== 'all') queryParts.push(`status=${encodeURIComponent(params.status)}`);
  if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
  const queryStr = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

  const response = await fetch(`${API_BASE}/admin/queries${queryStr}`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch inquiries');
  return data;
};

export const updateQueryStatusApi = async (id: string, payload: { status?: string; adminNotes?: string }) => {
  const response = await fetch(`${API_BASE}/admin/queries/${id}`, {
    method: 'PATCH',
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update inquiry');
  return data;
};

export const deleteQueryApi = async (id: string) => {
  const response = await fetch(`${API_BASE}/admin/queries/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete inquiry');
  return data;
};

// 6. User Accounts Management
export const fetchAdminUsers = async (search?: string) => {
  const queryStr = search ? `?search=${encodeURIComponent(search)}` : '';
  const response = await fetch(`${API_BASE}/admin/users${queryStr}`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch user accounts');
  return data;
};

export const updateUserApi = async (id: string, payload: any) => {
  const response = await fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'PATCH',
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update user account');
  return data;
};

export const deleteUserApi = async (id: string) => {
  const response = await fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete user account');
  return data;
};

// 7. Client Reviews & Testimonials Management
export const fetchPublicReviews = async () => {
  const response = await fetch(`${API_BASE}/reviews`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch public reviews');
  return data;
};

export const fetchAdminReviews = async () => {
  const response = await fetch(`${API_BASE}/admin/reviews`, {
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch reviews');
  return data;
};

export const createReviewApi = async (reviewData: any) => {
  const response = await fetch(`${API_BASE}/admin/reviews`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: JSON.stringify(reviewData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to create review');
  return data;
};

export const updateReviewApi = async (id: string, reviewData: any) => {
  const response = await fetch(`${API_BASE}/admin/reviews/${id}`, {
    method: 'PUT',
    headers: getAdminHeaders(),
    body: JSON.stringify(reviewData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update review');
  return data;
};

export const deleteReviewApi = async (id: string) => {
  const response = await fetch(`${API_BASE}/admin/reviews/${id}`, {
    method: 'DELETE',
    headers: getAdminHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete review');
  return data;
};

