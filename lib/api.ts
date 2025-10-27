// lib/api.ts
import { API_BASE } from '@/constants/config';

export type User = { id: number; email: string; username?: string };

type ReqInit = RequestInit & { token?: string };

async function request<T = any>(path: string, init: ReqInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
    ...(init.headers as any),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  // 204 No Content
  if (res.status === 204) return null as T;

  const text = await res.text();
  const data = (() => {
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return null;
    }
  })();

  if (!res.ok) {
    const detail = (data as any)?.detail ?? (data as any)?.error ?? text ?? `HTTP ${res.status}`;
    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail));
  }

  return (data ?? (text as any)) as T;
}

export const api = {
  // --- AUTH (базовые) ---
  // POST /api/auth/login/ → { token, refresh?, user }
  login(p: { email: string; password: string }): Promise<{ token: string; refresh?: string; user: User }> {
    return request('/api/auth/login/', { method: 'POST', body: JSON.stringify(p) });
  },

  loginFlexible(p: { login: string; password: string }): Promise<{ token: string; refresh?: string; user: User }> {
  const body: any = { login: p.login, password: p.password };
  if (p.login.includes('@')) body.email = p.login; // сервер примет и login, и email
  return request('/api/auth/login/', { method: 'POST', body: JSON.stringify(body) });
  },

  // GET /api/auth/profil/ (JWT в заголовке)
  me(token: string): Promise<User> {
    return request('/api/auth/profil/', { method: 'GET', token });
  },

  // POST /api/auth/signup/ → 201 { id, email }
  signup(p: { email: string; password: string }): Promise<{ id: number; email: string }> {
    return request('/api/auth/signup/', { method: 'POST', body: JSON.stringify(p) });
  },

  // POST /api/auth/refresh/ → { access } → нормализуем в { token }
  async refresh(refresh: string): Promise<{ token: string }> {
    const { access } = await request<{ access: string }>('/api/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    });
    return { token: access };
  },

  // --- SOCIAL: Google ---
  // POST /api/auth/social/google/  Body: { id_token }
  // Ответы:
  //   { status: "existing", email }
  //   { status: "new", email, given_name, family_name, registration_token }
  socialGoogleVerify(idToken: string): Promise<
    | { status: 'existing'; email: string }
    | { status: 'new'; email: string; given_name?: string; family_name?: string; registration_token: string }
  > {
    return request('/api/auth/social/google/', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
  },

  // GET /api/auth/username-check/?username=foo → { available: boolean }
  usernameCheck(username: string): Promise<{ available: boolean }> {
    return request(`/api/auth/username-check/?username=${encodeURIComponent(username)}`, { method: 'GET' });
  },

  // POST /api/auth/complete-signup/
  // Body: { registration_token, username, first_name, last_name, password }
  // Ответ: { token, refresh, user }
  completeSignup(p: {
    registration_token: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  }): Promise<{ token: string; refresh?: string; user: User }> {
    return request('/api/auth/complete-signup/', {
      method: 'POST',
      body: JSON.stringify(p),
    });
  },
};
