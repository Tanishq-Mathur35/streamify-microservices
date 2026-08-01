# Streamify — frontend

React + TypeScript + Vite client for the Streamify microservices (user / admin / song services). Visual identity is a hi-fi tape-deck console, not a Spotify skin: aubergine-ink background, amber + mint accents, spinning-reel cassette cards, and a hardware-style player bar.

## Stack

- React 19 + TypeScript, Vite
- Tailwind CSS (design tokens in `tailwind.config.js`)
- React Router for routing
- TanStack Query for server state
- Zustand for auth + player state
- lucide-react for icons

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

`.env` points at your three services:

```
VITE_USER_SERVICE_URL=http://localhost:5000/api/v1
VITE_ADMIN_SERVICE_URL=http://localhost:7000/api/v1
VITE_SONG_SERVICE_URL=http://localhost:8000/api/v1
```

Update the ports/hosts if your services run elsewhere.

## Structure

```
src/
  components/
    admin/     forms + list for the Studio (add album/song/thumbnail, delete)
    auth/      ProtectedRoute, AdminRoute
    catalog/   CassetteCard, SongRow
    layout/    AppShell, TopBar
    player/    PlayerConsole, VUMeter
    ui/        Button, Input, TextArea, FileDrop, Loader, EmptyState
  hooks/       useCatalog, useAuth, useAdmin (TanStack Query)
  lib/         api.ts (axios clients), utils.ts
  pages/       LoginPage, RegisterPage, HomePage, AlbumPage, AdminPage, NotFoundPage
  store/       authStore, playerStore (zustand)
  types/       shared TS types matching the backend responses
```

## Notes

- Auth uses the `token` request header (not `Authorization: Bearer`), matching the backend middleware.
- The admin service expects `multipart/form-data` with a field named `file` for album covers, song audio, and song thumbnails — handled in `hooks/useAdmin.ts`.
- `/admin` is gated behind `ProtectedRoute` + `AdminRoute`, which checks `role === "admin"` via `GET /user/me`.
- The player queue is album-scoped: pressing play on a tape queues its full track list; `ended` auto-advances to the next track.

## Build

```bash
npm run build
```

Type-checked with `tsc -b` and bundled with Vite; output goes to `dist/`.
