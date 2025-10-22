// app/index.tsx
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { initializing, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;
    router.replace(token ? '/(tabs)' : '/login');
  }, [initializing, token]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
