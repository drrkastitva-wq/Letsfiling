import unittest

from app.main import (
    create_lead_request,
    health,
    lead_detail,
    patch_status,
    services,
    verify_otp,
)
from app.models import LeadCreate, LeadStatus
from app.store import clear_store


class BackendTests(unittest.TestCase):
    def setUp(self) -> None:
        clear_store()

    def test_health(self) -> None:
        self.assertEqual(health()["status"], "ok")

    def test_services(self) -> None:
        result = services()
        self.assertGreaterEqual(len(result), 2)
        self.assertTrue(result[0]["id"].startswith("srv_"))

    def test_create_and_update_lead(self) -> None:
        payload = LeadCreate(
            service_id="srv_incorp",
            company_name="Acme Technologies",
            contact_name="Rahul Sharma",
            mobile="+919999999999",
            email="rahul@example.com",
            source="app",
        )

        created = create_lead_request(payload)
        lead_id = created["id"]

        details = lead_detail(lead_id)
        self.assertEqual(details["status"], "new")

        updated = patch_status(lead_id, LeadStatus.DOCUMENTS_PENDING)
        self.assertEqual(updated["status"], "documents_pending")

    def test_verify_otp_invalid(self) -> None:
        with self.assertRaises(ValueError):
            verify_otp("+919999999999", "000000")


if __name__ == "__main__":
    unittest.main()
