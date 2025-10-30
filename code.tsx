// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
// app/(tabs)/index.tsx
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function MainScreen() {
  const { user, signOut } = useAuth();
  const displayName = user?.username || user?.email || 'user';

  return (
    <SafeAreaView style={s.root}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.brand} numberOfLines={1}>opex6.com — Main</Text>

        <View style={s.headerRight}>
          {user ? (
            <Pressable onPress={() => router.push('/profile')} style={s.profileBtn}>
              <Text style={s.profileBtnText} numberOfLines={1} ellipsizeMode="tail">
                {displayName}
              </Text>
            </Pressable>
          ) : (
            <Text style={s.muted} numberOfLines={1}>Not signed in</Text>
          )}

          <Pressable onPress={signOut} style={s.logoutBtn}>
            <Text style={s.logoutBtnText}>Log Out</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.container}>
        {/* Navigation card */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Navigation</Text>
          <Text style={s.muted}>
            Sections (API widgets) will appear here: file upload, projects, settings, etc.
          </Text>
        </View>

        {/* Tiles row */}
        <View style={s.row}>
          <Pressable style={s.tile} onPress={() => { /* TODO: navigate to Upload screen */ }}>
            <Text style={s.tileTitle}>CSV Upload</Text>
            <Text style={s.muted}>Via API — already connected</Text>
          </Pressable>

          <Pressable style={s.tile} onPress={() => { /* TODO: navigate to Projects */ }}>
            <Text style={s.tileTitle}>Projects</Text>
            <Text style={s.muted}>List of tasks/pipelines</Text>
          </Pressable>

          <Pressable style={s.tile} onPress={() => { /* TODO: navigate to Reports */ }}>
            <Text style={s.tileTitle}>Reports</Text>
            <Text style={s.muted}>Later: PDF/PPT export</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0f1624' },

  header: {
    paddingHorizontal: 18,      // было 25 — делаем компактнее
    paddingVertical: 16,        // было 25 — делаем компактнее
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  brand: {
    color: '#e9eef7',
    fontWeight: '700',
    letterSpacing: 0.3,
    flexShrink: 1,              // чтобы не распирало шапку
    marginRight: 8,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                     // было 12 — чуть меньше
    maxWidth: '56%',            // было 60% — сузили, чтобы не выходило за рамки
    flexShrink: 1,
  },

  profileBtn: {
    minHeight: 34,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#233055',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 180,              // ограничим ширину кнопки с именем
  },
  profileBtnText: { color: '#e9eef7', fontWeight: '700', fontSize: 13 },

  logoutBtn: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#1a2240',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  container: { paddingHorizontal: 20, paddingVertical: 24 },

  card: {
    backgroundColor: '#141a2a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: { color: '#e9eef7', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  muted: { color: '#9fb0cf', fontSize: 14 },

  row: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  tile: {
    flexGrow: 1,
    flexBasis: 280,
    minHeight: 120,
    backgroundColor: '#131b33',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.13)',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },
  tileTitle: { color: '#e9eef7', fontWeight: '700', marginBottom: 6 },
});
// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/providers/AuthProvider';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity } from 'react-native';
import { checkUsername, completeSignup } from '../lib/api';

export const unstable_settings = { anchor: '(tabs)' };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          {/* экраны login/signup находятся вне (tabs), навигатор их подхватит автоматически */}
        </Stack>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

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
// app/index.tsx
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

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
// app/index.tsx

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

// app/login.tsx
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Login() {
  const { signIn, signing } = useAuth();
  const [login, setLogin] = useState('');      // email/username
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async () => {
    setErr('');
    if (!login.trim() || !password) {
      setErr('Enter your login and password.');
      return;
    }
    try {
      await signIn({ login: login.trim(), password });
    } catch {
      setErr('Check your login and password.');
    }
  };

  const handleGoogle = async () => {
    // TODO: подключим позже через expo-auth-session + Android OAuth Client ID
    setErr('Google Sign-In is not configured yet');
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome to project opex6</Text>

      <Text style={s.label}>Your username or email</Text>
      <TextInput
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Login or email"
        placeholderTextColor="#7a8699"
        style={s.input}
      />

      <Text style={s.label}>Enter the password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
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

import * as AuthSession from 'expo-auth-session';
import { socialGoogleVerify } from '../lib/api';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

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

// app/signup.tsx

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
// lib/api.ts
import { API_BASE } from '@/constants/config';

export type User = { id: number; email: string; username?: string };

type ReqInit = RequestInit & { token?: string };

async function request<T = any>(path: string, init: ReqInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
    ...(init.headers as any),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  // 204 No Content
  if (res.status === 204) return null as T;

  const text = await res.text();
  const data = (() => {
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return null;
    }
  })();

  if (!res.ok) {
    const detail = (data as any)?.detail ?? (data as any)?.error ?? text ?? `HTTP ${res.status}`;
    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail));
  }

  return (data ?? (text as any)) as T;
}

export const api = {
  // --- AUTH (базовые) ---
  // POST /api/auth/login/ → { token, refresh?, user }
  login(p: { email: string; password: string }): Promise<{ token: string; refresh?: string; user: User }> {
    return request('/api/auth/login/', { method: 'POST', body: JSON.stringify(p) });
  },

  loginFlexible(p: { login: string; password: string }): Promise<{ token: string; refresh?: string; user: User }> {
  const body: any = { login: p.login, password: p.password };
  if (p.login.includes('@')) body.email = p.login; // сервер примет и login, и email
  return request('/api/auth/login/', { method: 'POST', body: JSON.stringify(body) });
  },

  // GET /api/auth/profil/ (JWT в заголовке)
  me(token: string): Promise<User> {
    return request('/api/auth/profil/', { method: 'GET', token });
  },

  // POST /api/auth/signup/ → 201 { id, email }
  signup(p: { email: string; password: string }): Promise<{ id: number; email: string }> {
    return request('/api/auth/signup/', { method: 'POST', body: JSON.stringify(p) });
  },

  // POST /api/auth/refresh/ → { access } → нормализуем в { token }
  async refresh(refresh: string): Promise<{ token: string }> {
    const { access } = await request<{ access: string }>('/api/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    });
    return { token: access };
  },

  // --- SOCIAL: Google ---
  // POST /api/auth/social/google/  Body: { id_token }
  // Ответы:
  //   { status: "existing", email }
  //   { status: "new", email, given_name, family_name, registration_token }
  socialGoogleVerify(idToken: string): Promise<
    | { status: 'existing'; email: string }
    | { status: 'new'; email: string; given_name?: string; family_name?: string; registration_token: string }
  > {
    return request('/api/auth/social/google/', {
      method: 'POST',
      body: JSON.stringify({ id_token: idToken }),
    });
  },

  // GET /api/auth/username-check/?username=foo → { available: boolean }
  usernameCheck(username: string): Promise<{ available: boolean }> {
    return request(`/api/auth/username-check/?username=${encodeURIComponent(username)}`, { method: 'GET' });
  },

  // POST /api/auth/complete-signup/
  // Body: { registration_token, username, first_name, last_name, password }
  // Ответ: { token, refresh, user }
  completeSignup(p: {
    registration_token: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  }): Promise<{ token: string; refresh?: string; user: User }> {
    return request('/api/auth/complete-signup/', {
      method: 'POST',
      body: JSON.stringify(p),
    });
  },
};
// providers/AuthProvider.tsx
import { api, User } from '@/lib/api';
import React, { createContext, ReactNode, useContext } from 'react';

type Ctx = {
  initializing: boolean;
  signing: boolean;
  token: string | null;
  user: User | null;
  signIn: (p: { email: string; password: string }) => Promise<void>;
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

  // поднятие сессии при старте
  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('auth_token');
      if (t) {
        try {
          const u = await api.me(t);
          setToken(t);
          setUser(u);
        } catch {
          await SecureStore.deleteItemAsync('auth_token');
        }
      }
      setInitializing(false);
    })();
  }, []);

  // внутри AuthProvider
  const signIn = async (p: { login: string; password: string }) => {
    setSigning(true);
    try {
      const resp = await api.loginFlexible(p);
      await SecureStore.setItemAsync('token', resp.token);
      if (resp.refresh) await SecureStore.setItemAsync('refresh', resp.refresh);
      setUser(resp.user);
      // навигация в Tabs у тебя уже настроена через гейт в app/index.tsx
    } finally {
      setSigning(false);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('auth_token');
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
