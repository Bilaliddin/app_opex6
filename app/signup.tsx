import { api } from '@/lib/api';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSignup = async () => {
    setErr(''); setBusy(true);
    try {
      await api.signup({ email, password });
      router.replace('/login');
    } catch (e: any) {
      setErr(e?.message || 'Signup failed');
    } finally { setBusy(false); }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Create account</Text>

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none"
                 keyboardType="email-address"
                 style={{ borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 }} />

      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry
                 style={{ borderWidth: 1, borderRadius: 10, padding: 12 }} />

      {!!err && <Text style={{ color: 'red', marginTop: 8 }}>{err}</Text>}

      <Pressable onPress={handleSignup} disabled={busy}
                 style={{ marginTop: 16, height: 48, borderRadius: 12, backgroundColor: '#5271ff',
                          alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>{busy ? 'Creating...' : 'Sign up'}</Text>
      </Pressable>
    </View>
  );
}
