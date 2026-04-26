import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import CreateLeadScreen from './src/screens/CreateLeadScreen';
import PipelineScreen from './src/screens/PipelineScreen';

const TABS = {
  HOME: 'home',
  CREATE: 'create',
  PIPELINE: 'pipeline',
};

export default function App() {
  const [tab, setTab] = useState(TABS.HOME);

  const activeScreen = useMemo(() => {
    if (tab === TABS.CREATE) return <CreateLeadScreen />;
    if (tab === TABS.PIPELINE) return <PipelineScreen />;
    return <HomeScreen />;
  }, [tab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Letsfiling</Text>
        <Text style={styles.subtitle}>CA/CS services on Android + Web</Text>
      </View>

      <View style={styles.content}>{activeScreen}</View>

      <View style={styles.tabBar}>
        <TabButton label="Services" active={tab === TABS.HOME} onPress={() => setTab(TABS.HOME)} />
        <TabButton label="New Lead" active={tab === TABS.CREATE} onPress={() => setTab(TABS.CREATE)} />
        <TabButton
          label="Pipeline"
          active={tab === TABS.PIPELINE}
          onPress={() => setTab(TABS.PIPELINE)}
        />
      </View>
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 4,
    color: '#475569',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  tabButtonActive: {
    backgroundColor: '#0F766E',
  },
  tabText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
