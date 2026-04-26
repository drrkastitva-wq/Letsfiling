import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { listServices } from '../services/api';

function ServiceCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Starting ₹{item.priceFrom}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    listServices()
      .then((result) => setServices(result))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>Popular Services</Text>}
      renderItem={({ item }) => <ServiceCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingBottom: 20, gap: 10 },
  header: { fontWeight: '700', fontSize: 18, marginBottom: 8, color: '#0F172A' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  name: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  price: { marginTop: 4, color: '#0F766E', fontWeight: '600' },
});
