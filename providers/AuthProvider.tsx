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
  signIn: (p: { login: string; password: string }) => Promise<void>;
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

  // Load session from secure storage
  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('token');
      if (t) {
        try {
          const u = await api.me(t);
          setToken(t);
          setUser(u);
        } catch {
          await SecureStore.deleteItemAsync('token');
          await SecureStore.deleteItemAsync('refresh');
        }
      }
      setInitializing(false);
    })();
  }, []);

  const signIn = async (p: { login: string; password: string }) => {
    setSigning(true);
    try {
      const resp = await api.loginFlexible(p);
      await api.saveTokens(resp.token, resp.refresh);
      setToken(resp.token);
      setUser(resp.user);
      router.replace('/(tabs)');
    } finally {
      setSigning(false);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refresh');
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

