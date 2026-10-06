# Contributing

## Conventions

- Use TypeScript and strict types for every data shape.
- Keep route files thin: load data, compose layouts, and render feature components.
- Keep mock data in `src/mocks`; never define response-shaped data inside a component.
- Access data through async functions in `src/services`.
- Put reusable primitives in `src/components/ui` and shared shells in `src/components/layout`.
- Put product-specific UI in the appropriate `src/features/<domain>` folder.
- Add a short header comment to every file and docblocks to exported components/functions.
- Prefer semantic HTML, accessible labels, and keyboard-operable controls.
- Use the existing Tailwind tokens and avoid one-off global CSS unless necessary.

## Adding a page

1. Create the route folder under `app`.
2. Add a thin `page.tsx` that calls services and composes a layout.
3. Add or reuse a feature component under `src/features`.
4. Add the route to `README.md` and `docs/ARCHITECTURE.md`.
5. Add a placeholder guard if the route will eventually require a session.

## Adding a component

1. Decide whether it is shared (`src/components`) or domain-specific (`src/features`).
2. Define a props interface or inline typed props.
3. Keep data fetching outside presentational components.
4. Add a docblock and accessible states.
5. Run `npm run lint` and `npm run build`.

## Adding a service

1. Define or update the response type in `src/types`.
2. Add mock response data under `src/mocks`.
3. Add an async function under `src/services`.
4. Include `// TODO: replace with real API call`.
5. Document the endpoint and response shape in `docs/BACKEND_INTEGRATION.md`.
