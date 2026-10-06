# Ecoshel frontend

Ecoshel is a Next.js 16 App Router frontend for direct, verified property rentals in Accra. This scaffold follows the target architecture in the original project README: route-based pages, feature modules, reusable layouts, and an async mock service layer that can later be replaced with a backend.

## Stack

- Next.js 16 and React 19
- TypeScript with strict checking
- Tailwind CSS v4
- Leaflet dependencies retained for future map-based listing input

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Routes

- `/` - searchable rental marketplace
- `/properties/[id]` - property detail
- `/login` - login and role selection placeholder
- `/listings/new` - listing form placeholder
- `/dashboard` - owner dashboard placeholder
- `/settings` - profile settings placeholder
- unknown routes - global 404 page

## Architecture

The `app/` directory contains route composition only. Reusable UI is in `src/components`, domain-specific UI is in `src/features`, and all mock data is in `src/mocks`. Pages call async functions in `src/services`; components never import mock data directly.

Read the detailed guides:

- [Architecture](./docs/ARCHITECTURE.md)
- [Backend integration](./docs/BACKEND_INTEGRATION.md)
- [Contributing](./docs/CONTRIBUTING.md)

## Current boundaries

Authentication, authorization, persistence, API calls, and server business rules are intentionally not implemented. Dashboard and listing routes contain frontend-only guard placeholders and should be connected to a real session boundary before production.
