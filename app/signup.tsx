// app/signup.tsx
import { Link, router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SignupOptions() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
        Create your account
      </Text>

      <TouchableOpacity onPress={() => router.push('/signup_with_google')}>
        <Text style={{ textAlign: 'center', padding: 12, borderWidth: 1, borderRadius: 12 }}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {/* позже добавим Microsoft */}}>
        <Text style={{ textAlign: 'center', padding: 12, borderWidth: 1, borderRadius: 12 }}>
          Continue with Microsoft
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/create_user_profil?mode=email')}>
        <Text style={{ textAlign: 'center', padding: 12, borderWidth: 1, borderRadius: 12 }}>
          Sign up with Email
        </Text>
      </TouchableOpacity>

      <Link href="/login" style={{ textAlign: 'center', marginTop: 8 }}>
        Back to login
      </Link>
    </View>
  );
}