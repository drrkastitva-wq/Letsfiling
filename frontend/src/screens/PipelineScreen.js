import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { listLeads, updateLeadStatus } from '../services/api';

const STATUSES = ['all', 'new', 'contacted', 'documents_pending', 'in_progress', 'completed', 'lost'];

function LeadRow({ item, onMove }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.company}>{item.companyName}</Text>
        <Text style={styles.meta}>{item.contactName} • {item.mobile}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>
      <TouchableOpacity style={styles.action} onPress={() => onMove(item)}>
        <Text style={styles.actionText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function nextStatus(status) {
  const order = ['new', 'contacted', 'documents_pending', 'in_progress', 'completed'];
  const idx = order.indexOf(status);
  if (idx < 0 || idx === order.length - 1) return status;
  return order[idx + 1];
}

export default function PipelineScreen() {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      listLeads().then(setLeads);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return leads;
    return leads.filter((lead) => lead.status === statusFilter);
  }, [leads, statusFilter]);

  const moveLead = async (lead) => {
    const next = nextStatus(lead.status);
    await updateLeadStatus(lead.id, next);
    const updated = await listLeads();
    setLeads(updated);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        data={STATUSES}
        keyExtractor={(item) => item}
        style={styles.filters}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, statusFilter === item && styles.filterChipActive]}
            onPress={() => setStatusFilter(item)}
          >
            <Text style={[styles.filterText, statusFilter === item && styles.filterTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No leads in this stage.</Text>}
        renderItem={({ item }) => <LeadRow item={item} onMove={moveLead} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filters: { maxHeight: 44, marginBottom: 8 },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#fff',
  },
  filterChipActive: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E',
  },
  filterText: { color: '#334155', fontWeight: '600', textTransform: 'capitalize' },
  filterTextActive: { color: '#fff' },
  list: { paddingBottom: 20, gap: 10 },
  empty: { color: '#64748B', marginTop: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    gap: 8,
  },
  company: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  meta: { marginTop: 3, color: '#475569', fontSize: 12 },
  badge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: '#115E59',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  action: {
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionText: { color: '#0F172A', fontWeight: '700', fontSize: 12 },
});
