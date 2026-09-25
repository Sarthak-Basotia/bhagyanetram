// src/api/astrologyApi.ts

const API_BASE = '/api/astrology';

// 1. Fetch Free Kundli (Uses AI Synthesis + Math)
export const fetchKundli = async (data: { name: string, dob: string, time: string, lat: number, lon: number, tz_offset: number }) => {
  const response = await fetch(`${API_BASE}/kundli`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to fetch Kundli');
  return response.json();
};

// 2. Fetch Advanced Kundli (Raw Mathematical Charts for D1, D9, Yogas, etc.)
export const fetchAdvancedKundli = async (data: { name?: string, dob: string, time: string, lat: number, lon: number, tz_offset: number }) => {
  const response = await fetch(`${API_BASE}/advanced-kundli`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to fetch Advanced Kundli');
  return response.json();
};

// 3. Fetch Today's Panchang
export const fetchPanchang = async (data: { date: string, lat: number, lon: number, tz_offset: number }) => {
  const response = await fetch(`${API_BASE}/panchang`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to fetch Panchang');
  return response.json();
};

// 4. Fetch Ashtakoota Kundli Matching
export const fetchMatching = async (boy: any, girl: any) => {
  const response = await fetch(`${API_BASE}/matching`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boy, girl }),
  });
  if (!response.ok) throw new Error('Failed to fetch Kundli Matching');
  return response.json();
};

// 5. Fetch Numerology (Via Astro-Engine)
export const fetchNumerology = async (data: { name: string, dob: string, gender: string }) => {
  const response = await fetch(`${API_BASE}/numerology`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to fetch Numerology');
  return response.json();
};