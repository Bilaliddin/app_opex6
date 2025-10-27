import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { completeSignup } from '../lib/api';

export default function CreatePassword() {
  const params = useLocalSearchParams<{
    registration_token: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  }>();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onFinish = async () => {
    if (password.length < 8) {
      Alert.alert('Пароль', 'Минимум 8 символов');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Пароль', 'Пароли не совпадают');
      return;
    }
    try {
      const res = await completeSignup({
        registration_token: params.registration_token,
        username: params.username,
        first_name: params.first_name,
        last_name: params.last_name,
        password,
      });
      // Сохраняем как при login()
      await SecureStore.setItemAsync('token', res.token);
      if (res.refresh) await SecureStore.setItemAsync('refresh', res.refresh);
      router.replace('/(tabs)');
    } catch (e:any) {
      Alert.alert('Ошибка', e.message || 'Не удалось завершить регистрацию');
    }
  };

  return (
    <View style={{flex:1, padding:24, gap:12}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>Create password</Text>

      <Text>Password</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword}
                 style={{borderWidth:1, borderRadius:8, padding:10}}/>

      <Text>Confirm password</Text>
      <TextInput secureTextEntry value={confirm} onChangeText={setConfirm}
                 style={{borderWidth:1, borderRadius:8, padding:10}}/>

      <TouchableOpacity onPress={onFinish}>
        <Text style={{textAlign:'center', padding:12, borderWidth:1, borderRadius:12}}>
          Завершить регистрацию
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.replace('/login')}>
        <Text style={{textAlign:'center', marginTop:8}}>Назад (ко входу)</Text>
      </TouchableOpacity>
    </View>
  );
}
