import React, { useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { createLead } from '../services/api';

function showMessage(message) {
  if (Platform.OS === 'web') {
    window.alert(message);
    return;
  }
  Alert.alert('Letsfiling', message);
}

export default function CreateLeadScreen() {
  const [form, setForm] = useState({
    serviceId: 'srv_incorp',
    companyName: '',
    contactName: '',
    mobile: '',
    email: '',
    source: 'app',
  });

  const canSubmit = useMemo(() => {
    return form.companyName.trim() && form.contactName.trim() && form.mobile.trim();
  }, [form]);

  const onChange = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const onSubmit = async () => {
    if (!canSubmit) {
      showMessage('Please fill company, contact and mobile first.');
      return;
    }

    const created = await createLead(form);
    showMessage(`Lead created: ${created.id}`);
    setForm((old) => ({ ...old, companyName: '', contactName: '', mobile: '', email: '' }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Service ID</Text>
      <TextInput value={form.serviceId} onChangeText={(value) => onChange('serviceId', value)} style={styles.input} />

      <Text style={styles.label}>Company Name</Text>
      <TextInput
        value={form.companyName}
        onChangeText={(value) => onChange('companyName', value)}
        style={styles.input}
        placeholder="Acme Pvt Ltd"
      />

      <Text style={styles.label}>Contact Person</Text>
      <TextInput
        value={form.contactName}
        onChangeText={(value) => onChange('contactName', value)}
        style={styles.input}
        placeholder="Rahul Sharma"
      />

      <Text style={styles.label}>Mobile</Text>
      <TextInput
        value={form.mobile}
        onChangeText={(value) => onChange('mobile', value)}
        style={styles.input}
        placeholder="+919999999999"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={form.email}
        onChangeText={(value) => onChange('email', value)}
        style={styles.input}
        placeholder="client@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={[styles.button, !canSubmit && styles.buttonDisabled]} onPress={onSubmit}>
        <Text style={styles.buttonText}>Create Lead</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  label: { marginTop: 10, marginBottom: 6, color: '#334155', fontWeight: '600' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    marginTop: 18,
    borderRadius: 10,
    backgroundColor: '#0F766E',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
