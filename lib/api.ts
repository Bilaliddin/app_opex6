// lib/api.ts
import * as SecureStore from 'expo-secure-store';
import { BASE_URL as CONFIG_BASE_URL } from '@/constants/config';

export type User = {
  id: number;
  email: string;
  username: string;
};

export const API_BASE = (CONFIG_BASE_URL || 'https://app.opex6.com').replace(/\/$/, '');

async function toJson<T>(res: Response): Promise<T> {
  const txt = await res.text();
  try {
    return JSON.parse(txt);
  } catch {
    throw new Error(`Bad JSON (${res.status}): ${txt.slice(0, 200)}`);
  }
}

async function http<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${msg}`);
  }
  return toJson<T>(res);
}

export async function loginFlexible(params: { login: string; password: string }) {
  // Accepts username or email in `login` per server contract
  return http<{ token: string; refresh?: string; user: User }>(`${API_BASE}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export async function me(token: string) {
  return http<User>(`${API_BASE}/api/auth/profil/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function saveTokens(token: string, refresh?: string) {
  await SecureStore.setItemAsync('token', token);
  if (refresh) await SecureStore.setItemAsync('refresh', refresh);
}

// Optional helpers for signup flows (scaffold; server endpoints may change)
export async function checkUsername(username: string) {
  try {
    return await http<{ available: boolean }>(`${API_BASE}/api/auth/check-username?username=${encodeURIComponent(username)}`);
  } catch {
    // If server not ready, optimistically allow
    return { available: true };
  }
}

export async function socialGoogleVerify(idToken: string) {
  // Exchange Google ID token for app registration or login
  return http<
    | { status: 'existing' }
    | { status: 'new'; registration_token: string; email?: string; given_name?: string; family_name?: string }
  >(`${API_BASE}/api/auth/social/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token: idToken }),
  });
}

export async function completeSignup(params: {
  registration_token: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}) {
  return http<{ token: string; refresh?: string }>(`${API_BASE}/api/auth/complete-signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export const api = {
  loginFlexible,
  me,
  saveTokens,
  checkUsername,
  socialGoogleVerify,
  completeSignup,
};
