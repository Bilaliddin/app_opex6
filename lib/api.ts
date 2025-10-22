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
  const data = (() => { try { return text ? JSON.parse(text) : null; } catch { return null; } })();

  if (!res.ok) {
    const detail = data?.detail ?? data?.error ?? text ?? `HTTP ${res.status}`;
    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail));
  }

  return (data ?? (text as any)) as T;
}

export const api = {
  // POST /api/auth/login/ → { token, refresh?, user }
  login(p: { email: string; password: string }): Promise<{ token: string; refresh?: string; user: User }> {
    return request('/api/auth/login/', { method: 'POST', body: JSON.stringify(p) });
  },

  // GET /api/auth/profil/ (JWT access token в заголовке)
  me(token: string): Promise<User> {
    return request('/api/auth/profil/', { method: 'GET', token });
  },

  // POST /api/auth/signup/ → 201 { id, email }
  signup(p: { email: string; password: string }): Promise<{ id: number; email: string }> {
    return request('/api/auth/signup/', { method: 'POST', body: JSON.stringify(p) });
  },

  // POST /api/auth/refresh/ → { access }  (SimpleJWT стандарт)
  // Возвращаем в унифицированном виде { token }
  async refresh(refresh: string): Promise<{ token: string }> {
    const { access } = await request<{ access: string }>('/api/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    });
    return { token: access };
  },
};
