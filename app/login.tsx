// app/login.tsx
import { GOOGLE_ANDROID_CLIENT_ID } from '@/constants/config';
import { useAuth } from '@/providers/AuthProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const { signIn, signing } = useAuth();
  const [login, setLogin] = useState(''); // логин или email
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async () => {
    setErr('');
    if (!login.trim() || !password) {
      setErr('Введите логин и пароль.');
      return;
    }
    try {
      await signIn({ login: login.trim(), password });
    } catch {
      setErr('Введён не правильный логин или пароль');
    }
  };

  const handleGoogle = async () => {
    if (!GOOGLE_ANDROID_CLIENT_ID) {
      Alert.alert('Google OAuth', 'Вход через Google пока не настроен.');
      return;
    }
    try {
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
      } as const;
      const redirectUri = AuthSession.makeRedirectUri();
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_ANDROID_CLIENT_ID,
        responseType: AuthSession.ResponseType.IdToken,
        scopes: ['openid', 'email', 'profile'],
        redirectUri,
        // Fix for Google error: Parameter not allowed for this message type: code_challenge_method
        // PKCE is only for response_type=code; disable it for implicit id_token
        usePKCE: false,
        // Nonce recommended for OIDC implicit flow
        extraParams: { nonce: Math.random().toString(36).slice(2) },
      });
      await request.makeAuthUrlAsync(discovery);
      const result = await request.promptAsync(discovery);
      if (result.type === 'success' && result.params.id_token) {
        Alert.alert('Google', 'OAuth интеграцию выполним на сервере позже.');
      }
    } catch (e: any) {
      Alert.alert('Google OAuth', e?.message || 'Не удалось выполнить вход через Google');
    }
  };

  const handleMicrosoft = async () => {
    Alert.alert('Microsoft OAuth', 'Вход через Microsoft пока не настроен.');
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Добро пожаловать в OPEX6</Text>

      <Text style={s.label}>Логин или Email</Text>
      <TextInput
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Логин или email"
        placeholderTextColor="#7a8699"
        style={s.input}
      />

      <Text style={s.label}>Пароль</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Пароль"
        placeholderTextColor="#7a8699"
        style={s.input}
      />

      {!!err && <Text style={s.error}>{err}</Text>}

      <Pressable onPress={handleLogin} disabled={signing} style={s.primaryBtn}>
        <Text style={s.primaryBtnText}>{signing ? 'Входим…' : 'Войти'}</Text>
      </Pressable>

      <View style={s.dividerWrap}>
        <View style={s.divider} />
        <Text style={s.dividerText}>или</Text>
        <View style={s.divider} />
      </View>

      <Pressable onPress={handleGoogle} style={s.googleBtn}>
        <FontAwesome5 name="google" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={s.googleBtnText}>Войти через Google</Text>
      </Pressable>

      <Pressable onPress={handleMicrosoft} style={[s.googleBtn, { backgroundColor: '#2563eb', marginTop: 10 }]}>
        <FontAwesome5 name="microsoft" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={s.googleBtnText}>Войти через Microsoft</Text>
      </Pressable>

      <View style={{ marginTop: 16 }}>
        <Text style={{ color: '#9fb0cf', textAlign: 'center', marginBottom: 8 }}>
          У вас нет аккаунта?
        </Text>
        <Link href="/signup" asChild>
          <Pressable style={s.secondaryBtn}>
            <Text style={s.secondaryBtnText}>Зарегистрироваться</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={s.terms}>Продолжая, вы соглашаетесь с Условиями и Политикой.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1321',
    padding: 20,
    paddingTop: 56,
  },
  title: {
    color: '#e6ebf5',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 18,
  },
  label: {
    color: '#9fb0cf',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#111a2b',
    borderColor: '#26324d',
    borderWidth: 1,
    borderRadius: 10,
    color: '#e6ebf5',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  error: { color: '#fca5a5', marginBottom: 8 },
  primaryBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#5271ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  divider: { flex: 1, height: 1, backgroundColor: '#26324d' },
  dividerText: { color: '#7a8699' },
  googleBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtnText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#121a2c',
    borderColor: '#26324d',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  secondaryBtnText: { color: '#d2daea', fontWeight: '600' },
  terms: {
    color: '#6f7f9e',
    textAlign: 'center',
    marginTop: 14,
    fontSize: 12,
  },
});
