// src/api/publicContentApi.ts

const API_BASE =  + '/api';

export const fetchPublicAstrologers = async () => {
  try {
    const response = await fetch(`${API_BASE}/astrologers`);
    if (!response.ok) throw new Error('Failed to fetch astrologers');
    return await response.json();
  } catch (err) {
    console.warn('Astrologers API call failed, using default astrologers:', err);
    return { success: false, data: [] };
  }
};

export const fetchPublicBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE}/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return await response.json();
  } catch (err) {
    console.warn('Blogs API call failed, using default blogs:', err);
    return { success: false, data: [] };
  }
};

export const fetchPublicBlogBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE}/blogs/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return await response.json();
};

export const submitConsultationBooking = async (payload: {
  name: string;
  email: string;
  phone: string;
  services?: string[];
  otherService?: string;
  date?: string;
  time?: string;
  message?: string;
  astrologerName?: string;
  source?: string;
}) => {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to submit booking');
  return data;
};
