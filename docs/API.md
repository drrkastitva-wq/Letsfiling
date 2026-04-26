# Letsfiling MVP API Contract (v1)

Base URL: `/api/v1`

## Authentication
### POST `/auth/send-otp`
Request:
```json
{ "mobile": "+919999999999" }
```
Response:
```json
{ "success": true, "requestId": "otp_req_123" }
```

### POST `/auth/verify-otp`
Request:
```json
{ "mobile": "+919999999999", "otp": "123456" }
```
Response:
```json
{ "token": "jwt_token", "user": { "id": "usr_1", "role": "client" } }
```

## Services
### GET `/services`
Response:
```json
[
  { "id": "srv_incorp", "name": "Private Limited Incorporation", "priceFrom": 9999 },
  { "id": "srv_annual", "name": "Annual Filing", "priceFrom": 4999 }
]
```

## Leads
### POST `/leads`
Creates a new lead/service request.

Request:
```json
{
  "serviceId": "srv_incorp",
  "companyName": "Acme Technologies",
  "contactName": "Rahul Sharma",
  "mobile": "+919999999999",
  "email": "rahul@example.com",
  "source": "app"
}
```

Response:
```json
{ "id": "lead_101", "status": "new" }
```

### GET `/leads/:id`
Returns lead detail with checklist and current status.

### PATCH `/leads/:id/status`
Request:
```json
{ "status": "documents_pending" }
```

## Documents
### POST `/leads/:id/documents`
Multipart upload endpoint for required files.

Response:
```json
{ "id": "doc_1", "type": "pan", "url": "https://..." }
```

## Tasks
### POST `/leads/:id/tasks`
Create task for operations or CA/CS professional.

### PATCH `/tasks/:id`
Update task status.

## Payments
### POST `/payments/create-order`
Create payment order using payment gateway.

### POST `/payments/webhook`
Gateway callback endpoint.

## Notifications
### POST `/notifications/push`
Internal endpoint to trigger client push notifications.
