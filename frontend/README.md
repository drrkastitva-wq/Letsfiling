# Letsfiling Frontend (React Native + Web)

Single codebase using Expo + React Native that runs on:
- Android (`npm run android`)
- Web (`npm run web`)

## Run

```bash
cd frontend
npm install
npm run web
```

For Android (with emulator/device and Android tooling configured):

```bash
cd frontend
npm run android
```

## API integration
By default, the app tries to use backend API at `http://localhost:8000` and falls back to local in-memory mode if backend is unavailable.

Set explicit backend URL:

```bash
EXPO_PUBLIC_API_BASE_URL=http://<your-machine-ip>:8000 npm run web
```

## Included MVP screens
- Services list
- New lead form
- Lead pipeline with status filter and quick stage movement
