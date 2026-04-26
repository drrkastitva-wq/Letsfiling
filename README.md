# Letsfiling MVP

Android-first platform for CA/CS services (company incorporation, annual filing, and compliance).

## Scope
This repository currently contains the MVP product blueprint and technical starter artifacts:
- Product requirements (`docs/PRD.md`)
- REST API contract (`docs/API.md`)
- Initial PostgreSQL schema (`docs/DB_SCHEMA.sql`)

## MVP Features
- Client authentication via mobile OTP
- Service catalog (Incorporation, Annual Filing, GST, ITR)
- Lead capture + document uploads
- Admin lead pipeline and assignment
- Filing status timeline and notifications
- Payment and invoice tracking

## Suggested Next Step
1. Scaffold Android app with Kotlin + Jetpack Compose.
2. Scaffold backend with NestJS + PostgreSQL.
3. Implement APIs from `docs/API.md`.
4. Run DB migrations from `docs/DB_SCHEMA.sql`.


## Runnable backend prototype

This repository now includes a dependency-free Python backend prototype with service, OTP, and lead workflow functions in `backend/app/`.

Run tests:

```bash
cd backend
python -m unittest -q
```


## Cross-platform frontend (Android + Web)

A native React frontend has been added in `frontend/` using Expo + React Native Web, so one codebase targets Android and web presence together.

```bash
cd frontend
npm install
npm run web
```

For Android:

```bash
cd frontend
npm run android
```


### Backend HTTP server

Run a simple HTTP API server for frontend integration:

```bash
cd backend
python -m app.http_server
```
