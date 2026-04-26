from __future__ import annotations

from dataclasses import asdict

from .models import LeadCreate, LeadStatus
from .store import create_lead, get_lead, list_services, update_status


def health() -> dict:
    return {"status": "ok"}


def send_otp(mobile: str) -> dict:
    return {"success": True, "requestId": f"otp_req_{mobile[-4:]}"}


def verify_otp(mobile: str, otp: str) -> dict:
    if otp != "123456":
        raise ValueError("Invalid OTP")
    return {
        "token": "demo_jwt_token",
        "user": {"id": "usr_demo", "role": "client", "mobile": mobile},
    }


def services() -> list[dict]:
    return [asdict(service) for service in list_services()]


def create_lead_request(payload: LeadCreate) -> dict:
    lead = create_lead(payload)
    return {"id": lead.id, "status": lead.status.value}


def lead_detail(lead_id: str) -> dict:
    lead = get_lead(lead_id)
    if lead is None:
        raise KeyError("Lead not found")
    data = asdict(lead)
    data["status"] = lead.status.value
    return data


def patch_status(lead_id: str, status: LeadStatus) -> dict:
    lead = update_status(lead_id, status)
    if lead is None:
        raise KeyError("Lead not found")
    return {"id": lead.id, "status": lead.status.value, "updatedAt": lead.updated_at.isoformat()}
