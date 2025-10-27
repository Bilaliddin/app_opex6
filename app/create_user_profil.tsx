import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { checkUsername } from '../lib/api';

export default function CreateUserProfil() {
  const params = useLocalSearchParams<{
    registration_token?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    mode?: string; // 'email' если ручная регистрация
  }>();

  const [registrationToken, setRegistrationToken] = useState(params.registration_token || '');
  const [email, setEmail] = useState(params.email || '');
  const [firstName, setFirstName] = useState(params.first_name || '');
  const [lastName, setLastName] = useState(params.last_name || '');
  const [username, setUsername] = useState('');
  const [usernameOk, setUsernameOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (params.mode === 'email') {
      setRegistrationToken('email_' + Date.now()); // временный маркер; в проде лучше запросить /signup для email-пути
    }
  }, [params.mode]);

  const onCheck = async () => {
    if (!username.trim()) return;
    const r = await checkUsername(username.trim());
    setUsernameOk(r.available);
  };

  const onNext = () => {
    router.push({
      pathname: '/create_password',
      params: {
        registration_token: registrationToken,
        email,
        first_name: firstName,
        last_name: lastName,
        username: username.trim(),
      }
    });
  };

  return (
    <View style={{flex:1, padding:24, gap:12}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>Create profile</Text>

      <Text>First name</Text>
      <TextInput value={firstName} onChangeText={setFirstName} style={{borderWidth:1, borderRadius:8, padding:10}}/>

      <Text>Last name</Text>
      <TextInput value={lastName} onChangeText={setLastName} style={{borderWidth:1, borderRadius:8, padding:10}}/>

      <Text>Username</Text>
      <TextInput
        value={username}
        onChangeText={(t)=>{ setUsername(t); setUsernameOk(null);} }
        onBlur={onCheck}
        style={{borderWidth:1, borderRadius:8, padding:10}}
        placeholder="choose unique username"
      />
      {usernameOk === true && <Text style={{color:'green'}}>Свободен</Text>}
      {usernameOk === false && <Text style={{color:'red'}}>Занят</Text>}

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} editable={false}
                 style={{borderWidth:1, borderRadius:8, padding:10, backgroundColor:'#f3f3f3'}}/>

      <View style={{height:8}}/>

      <TouchableOpacity onPress={()=>router.replace('/login')}>
        <Text style={{textAlign:'center'}}>Назад (ко входу)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext} disabled={usernameOk === false || !username.trim()}>
        <Text style={{textAlign:'center', padding:12, borderWidth:1, borderRadius:12}}>
          Далее
        </Text>
      </TouchableOpacity>
    </View>
  );
}
