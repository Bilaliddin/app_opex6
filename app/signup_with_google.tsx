import * as AuthSession from 'expo-auth-session';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { socialGoogleVerify } from '../lib/api';

// В Google Console добавь Android/iOS/Web client; здесь используем "idToken" (response.params.id_token)
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // дублируется с бэком

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export default function SignupWithGoogle() {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      responseType: AuthSession.ResponseType.IdToken,
      scopes: ['openid', 'email', 'profile'],
      redirectUri: AuthSession.makeRedirectUri(), // Expo-managed
    },
    discovery
  );

  useEffect(() => {
    const run = async () => {
      if (response?.type === 'success') {
        const idToken = response.params.id_token;
        try {
          setLoading(true);
          const res = await socialGoogleVerify(idToken);
          if (res.status === 'existing') {
            Alert.alert('Аккаунт уже есть', 'Войдите под этой почтой.', [
              { text: 'OK', onPress: () => router.replace('/login') }
            ]);
          } else if (res.status === 'new') {
            // Переходим к заполнению профиля
            router.replace({
              pathname: '/create_user_profil',
              params: {
                registration_token: res.registration_token,
                email: res.email,
                first_name: res.given_name || '',
                last_name: res.family_name || '',
              }
            });
          } else {
            Alert.alert('Ошибка', 'Неожиданный ответ сервера.');
          }
        } catch (e:any) {
          Alert.alert('Ошибка', e.message || 'Не удалось верифицировать Google');
        } finally {
          setLoading(false);
        }
      }
    };
    run();
  }, [response]);

  return (
    <View style={{flex:1, padding:24, justifyContent:'center', gap:16}}>
      <Text style={{fontSize:20, fontWeight:'700', textAlign:'center'}}>Sign up with Google</Text>
      {loading ? <ActivityIndicator/> : (
        <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
          <Text style={{textAlign:'center', padding:12, borderWidth:1, borderRadius:12}}>
            Choose Google account
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{textAlign:'center', marginTop:8}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
