# Backend integration

The frontend currently returns typed mock responses through async services. Replace the body of each listed function with a `fetch` call while preserving its return type and keeping components unchanged.

| Service function | Mock response | Expected endpoint | Response shape |
| --- | --- | --- | --- |
| `getListings()` | `mockListings` | `GET /listings` | `{ listings: Listing[] }` |
| `getListingById(id)` | matching listing or `null` | `GET /listings/:id` | `Listing` |
| `getUsers()` | `mockUsers` | `GET /users` | `{ users: User[] }` |
| `getDemoUser(role)` | user matching role | `GET /users/me` | `User` |
| `getDashboardStats()` | `mockDashboardStats` | `GET /dashboard/stats` | `DashboardStats` |
| `getInquiries()` | `mockInquiries` | `GET /dashboard/inquiries` | `{ inquiries: Inquiry[] }` |
| `getProfile()` | first mock user | `GET /users/me` | `User` |

## Exact change points

1. Set `NEXT_PUBLIC_API_BASE_URL` in the environment.
2. Use `apiConfig.baseUrl` from `src/services/api-config.ts`.
3. Replace the `Promise.resolve(...)` line in each service with `fetch`.
4. Check `response.ok` and throw a typed or descriptive error for non-success responses.
5. Unwrap envelope fields such as `listings` or `inquiries` where the endpoint uses them.
6. Keep domain types in `src/types` aligned with the API response.
7. Add authentication headers in the service layer once the real session mechanism exists.

Every current mock return has a `TODO: replace with real API call` marker at the swap point.
