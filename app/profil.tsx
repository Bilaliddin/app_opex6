// app/profil.tsx — временная заглушка, чтобы навигация работала
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Profil() {
  const { user } = useAuth();

  return (
    <View style={{ flex:1, padding:20, gap:12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Профиль</Text>
      {user ? (
        <>
          <Text>ID: {user.id}</Text>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
        </>
      ) : (
        <>
          <Text>Вы не авторизованы.</Text>
          <Pressable onPress={() => router.push('/login')}
                     style={{ marginTop: 12, padding: 12, borderWidth: 1, borderRadius: 10 }}>
            <Text>Перейти ко входу</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
