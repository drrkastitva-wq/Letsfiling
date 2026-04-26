from __future__ import annotations

from datetime import datetime, timezone
from typing import Dict, List

from .models import Lead, LeadCreate, LeadStatus, Service, make_lead

SERVICES: List[Service] = [
    Service(id="srv_incorp", name="Private Limited Incorporation", price_from=9999),
    Service(id="srv_annual", name="Annual Filing", price_from=4999),
    Service(id="srv_gst", name="GST Registration", price_from=1999),
]

LEADS: Dict[str, Lead] = {}


def list_services() -> List[Service]:
    return SERVICES


def create_lead(payload: LeadCreate) -> Lead:
    lead = make_lead(payload)
    LEADS[lead.id] = lead
    return lead


def get_lead(lead_id: str) -> Lead | None:
    return LEADS.get(lead_id)


def update_status(lead_id: str, status: LeadStatus) -> Lead | None:
    lead = LEADS.get(lead_id)
    if lead is None:
        return None

    lead.status = status
    lead.updated_at = datetime.now(timezone.utc)
    return lead


def clear_store() -> None:
    LEADS.clear()
