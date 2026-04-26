from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

from .main import create_lead_request, lead_detail, patch_status, services
from .models import LeadCreate, LeadStatus


class LetsfilingHandler(BaseHTTPRequestHandler):
    def _send_json(self, status: int, payload: dict | list) -> None:
        body = json.dumps(payload, default=str).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0:
            return {}
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def do_OPTIONS(self) -> None:
        self._send_json(200, {"ok": True})

    def do_GET(self) -> None:
        path = urlparse(self.path).path

        if path == "/api/v1/services":
            self._send_json(200, services())
            return

        if path.startswith("/api/v1/leads/"):
            lead_id = path.split("/")[-1]
            try:
                self._send_json(200, lead_detail(lead_id))
            except KeyError:
                self._send_json(404, {"detail": "Lead not found"})
            return

        if path == "/health":
            self._send_json(200, {"status": "ok"})
            return

        self._send_json(404, {"detail": "Not found"})

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        payload = self._read_json()

        if path == "/api/v1/leads":
            try:
                lead = LeadCreate(
                    service_id=payload["serviceId"],
                    company_name=payload["companyName"],
                    contact_name=payload["contactName"],
                    mobile=payload["mobile"],
                    email=payload.get("email"),
                    source=payload.get("source", "app"),
                )
            except KeyError as exc:
                self._send_json(400, {"detail": f"Missing field: {exc.args[0]}"})
                return

            created = create_lead_request(lead)
            self._send_json(201, created)
            return

        self._send_json(404, {"detail": "Not found"})

    def do_PATCH(self) -> None:
        path = urlparse(self.path).path
        payload = self._read_json()

        if path.startswith("/api/v1/leads/") and path.endswith("/status"):
            lead_id = path.split("/")[-2]
            status_value = payload.get("status")
            if status_value is None:
                self._send_json(400, {"detail": "Missing field: status"})
                return

            try:
                status = LeadStatus(status_value)
                updated = patch_status(lead_id, status)
                self._send_json(200, updated)
            except ValueError:
                self._send_json(400, {"detail": "Invalid status"})
            except KeyError:
                self._send_json(404, {"detail": "Lead not found"})
            return

        self._send_json(404, {"detail": "Not found"})


def run(host: str = "0.0.0.0", port: int = 8000) -> None:
    server = HTTPServer((host, port), LetsfilingHandler)
    print(f"Letsfiling API running on http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run()
