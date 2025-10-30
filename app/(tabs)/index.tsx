// app/(tabs)/index.tsx
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MainScreen() {
  const { user, signOut } = useAuth();
  const displayName = user?.username || user?.email || 'user';

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <Text style={s.brand} numberOfLines={1}>opex6.com — Main</Text>

        <View style={s.headerRight}>
          <Pressable onPress={() => router.push('/profil')} style={s.profileBtn}>
            <Text style={s.profileBtnText} numberOfLines={1} ellipsizeMode="tail">
              {displayName}
            </Text>
          </Pressable>

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
