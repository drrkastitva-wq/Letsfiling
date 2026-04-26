from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from enum import Enum
from typing import Optional
from uuid import uuid4


class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    DOCUMENTS_PENDING = "documents_pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    LOST = "lost"


@dataclass(slots=True)
class Service:
    id: str
    name: str
    price_from: int


@dataclass(slots=True)
class LeadCreate:
    service_id: str
    company_name: str
    contact_name: str
    mobile: str
    email: Optional[str] = None
    source: str = "app"


@dataclass(slots=True)
class Lead:
    id: str
    service_id: str
    company_name: str
    contact_name: str
    mobile: str
    email: Optional[str]
    source: str
    status: LeadStatus
    created_at: datetime
    updated_at: datetime


def make_lead(payload: LeadCreate) -> Lead:
    now = datetime.now(timezone.utc)
    return Lead(
        id=f"lead_{uuid4().hex[:10]}",
        service_id=payload.service_id,
        company_name=payload.company_name,
        contact_name=payload.contact_name,
        mobile=payload.mobile,
        email=payload.email,
        source=payload.source,
        status=LeadStatus.NEW,
        created_at=now,
        updated_at=now,
    )
