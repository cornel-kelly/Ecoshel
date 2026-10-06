# Architecture

## Annotated tree

```text
app/                         # Next.js route composition
├── (auth)/login/page.tsx   # authentication route
├── (dashboard)/dashboard/  # dashboard route group
├── properties/[id]/         # canonical property detail route
├── listings/new/            # new listing route
├── settings/                # profile settings route
├── layout.tsx               # metadata and global styles
├── page.tsx                 # marketplace route
└── not-found.tsx            # global fallback
src/
├── components/              # shared UI and layouts
├── features/                # domain-specific components
├── mocks/                   # mock response data only
├── services/                # async data access boundary
└── types/                   # API-compatible TypeScript contracts
docs/                        # developer documentation
```

## Routing

Next.js App Router maps folders to URLs. Route groups `(auth)` and `(dashboard)` organize related pages without changing their URLs. The dynamic `properties/[id]` segment is resolved by `getListingById`. Missing records call `notFound()`, which renders `app/not-found.tsx`. Dashboard and listing routes are placeholders for future authentication and authorization guards.

## Route table

| Path | Page | Layout |
| --- | --- | --- |
| `/` | marketplace and filters | `PublicLayout` |
| `/properties/[id]` | property detail | `PublicLayout` |
| `/login` | auth form | `AuthLayout` |
| `/listings/new` | listing form | `DashboardLayout` |
| `/dashboard` | host metrics and inquiries | `DashboardLayout` |
| `/settings` | profile form | `DashboardLayout` |
| `*` | not found | global fallback |

## Data flow

```text
Page
  -> feature component
  -> service function (async)
  -> mock module
  -> typed domain object
```

For example, the home page calls `getListings()`, passes the result to `ListingFilters`, and the filters render `ListingGrid` and `ListingCard`. No component imports `src/mocks` directly. To integrate a backend, only the service implementation should change.

## Component hierarchy

```text
PublicLayout
├── Header
├── PageContainer
│   ├── ListingFilters
│   │   └── ListingGrid
│   │       └── ListingCard
└── Footer

DashboardLayout
├── Header
└── PageContainer
    ├── DashboardOverview
    ├── ListingForm
    └── ProfileForm
```

Shared primitives (`Button`, `Card`, and `Badge`) are intentionally small and do not contain domain or data-access logic.
