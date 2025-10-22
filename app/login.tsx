
// app/login.tsx
import { useAuth } from '@/providers/AuthProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const { signIn, signing } = useAuth();
  const [login, setLogin] = useState('');      // email/username
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async () => {
    setErr('');
    try {
      // на сервере мы логиним по email — если ты хочешь username, поправим бэкенд
      await signIn({ email: login, password });
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    }
  };

  const handleGoogle = async () => {
    // TODO: подключим позже через expo-auth-session + Android OAuth Client ID
    setErr('Google Sign-In is not configured yet');
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome to project opex6</Text>

      <Text style={s.label}>Login</Text>
      <TextInput
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        placeholderTextColor="#7a8699"
        style={s.input}
      />

      <Text style={s.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="••••••••"
        placeholderTextColor="#7a8699"
        style={s.input}
      />

      {!!err && <Text style={s.error}>{err}</Text>}

      <Pressable onPress={handleLogin} disabled={signing} style={s.primaryBtn}>
        <Text style={s.primaryBtnText}>{signing ? 'Logging in...' : 'Login'}</Text>
      </Pressable>

      <View style={s.dividerWrap}>
        <View style={s.divider} />
        <Text style={s.dividerText}>or</Text>
        <View style={s.divider} />
      </View>

      <Pressable onPress={handleGoogle} style={s.googleBtn}>
        <FontAwesome5 name="google" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={s.googleBtnText}>Login with Google</Text>
      </Pressable>

      <Link href="/signup" asChild>
        <Pressable style={s.secondaryBtn}>
          <Text style={s.secondaryBtnText}>Create account</Text>
        </Pressable>
      </Link>

      <Text style={s.terms}>
        By continuing, you agree to the Terms & Privacy Policy.
      </Text>
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
