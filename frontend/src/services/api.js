const API_BASE_URL = process?.env?.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const FALLBACK_SERVICES = [
  { id: 'srv_incorp', name: 'Private Limited Incorporation', price_from: 9999 },
  { id: 'srv_annual', name: 'Annual Filing', price_from: 4999 },
  { id: 'srv_gst', name: 'GST Registration', price_from: 1999 },
  { id: 'srv_itr', name: 'ITR Filing', price_from: 1499 },
];

let localLeads = [];

async function safeFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json();
}

export async function listServices() {
  try {
    const remote = await safeFetch('/api/v1/services');
    return remote.map((item) => ({ ...item, priceFrom: item.price_from ?? item.priceFrom }));
  } catch (_error) {
    return FALLBACK_SERVICES.map((item) => ({ ...item, priceFrom: item.price_from }));
  }
}

export async function createLead(payload) {
  try {
    const remote = await safeFetch('/api/v1/leads', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const localLead = {
      id: remote.id,
      status: remote.status,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    localLeads = [localLead, ...localLeads];
    return localLead;
  } catch (_error) {
    const lead = {
      id: `lead_${Math.random().toString(16).slice(2, 10)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      ...payload,
    };
    localLeads = [lead, ...localLeads];
    return lead;
  }
}

export async function listLeads() {
  return localLeads;
}

export async function updateLeadStatus(leadId, status) {
  try {
    await safeFetch(`/api/v1/leads/${leadId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  } catch (_error) {
    // ignore for local mode
  }

  localLeads = localLeads.map((lead) => (lead.id === leadId ? { ...lead, status } : lead));
  return localLeads.find((lead) => lead.id === leadId);
}
