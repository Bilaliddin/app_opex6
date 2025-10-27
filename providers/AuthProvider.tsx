// providers/AuthProvider.tsx
import { api, User } from '@/lib/api';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Ctx = {
  initializing: boolean;
  signing: boolean;
  token: string | null;
  user: User | null;
  signIn: (p: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Ctx>({
  initializing: true,
  signing: false,
  token: null,
  user: null,
  async signIn() {},
  async signOut() {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [initializing, setInitializing] = useState(true);
  const [signing, setSigning] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // поднятие сессии при старте
  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('auth_token');
      if (t) {
        try {
          const u = await api.me(t);
          setToken(t);
          setUser(u);
        } catch {
          await SecureStore.deleteItemAsync('auth_token');
        }
      }
      setInitializing(false);
    })();
  }, []);

  // внутри AuthProvider
  const signIn = async (p: { login: string; password: string }) => {
    setSigning(true);
    try {
      const resp = await api.loginFlexible(p);
      await SecureStore.setItemAsync('token', resp.token);
      if (resp.refresh) await SecureStore.setItemAsync('refresh', resp.refresh);
      setUser(resp.user);
      // навигация в Tabs у тебя уже настроена через гейт в app/index.tsx
    } finally {
      setSigning(false);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setToken(null);
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ initializing, signing, token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
