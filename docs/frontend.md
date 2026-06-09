# Frontend Documentation

## Overview

The frontend is a full-stack React application located at `apps/frontend`. It uses React Router v7's framework mode (formerly Remix), which handles both SSR and client-side routing out of the box.

---

## Tech Stack

### Core Framework

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 19.2.3 | UI library |
| [React Router](https://reactrouter.com) | 7.10.1 | Full-stack framework (routing, SSR, loaders, actions) |
| [Vite](https://vite.dev) | 7.1.7 | Dev server and build tool |
| [TypeScript](https://www.typescriptlang.org) | 5.9.2 | Type safety |

### Styling

| Tool | Version | Purpose |
|------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com) | 4.1.13 | Utility-first CSS |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | 1.4.0 | Animation utilities for Tailwind |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Merge conflicting Tailwind classes |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Conditional class name composition |

### Build Plugins

| Tool | Purpose |
|------|---------|
| `@tailwindcss/vite` | First-class Tailwind v4 integration with Vite |
| `vite-tsconfig-paths` | Resolves TypeScript path aliases (`~/*`) in Vite |

---

## Project Structure

```
apps/frontend/
├── app/
│   ├── components/        # Shared UI components
│   │   └── header.tsx
│   ├── constants/         # Static data / text constants
│   │   └── get-started-texts.ts
│   ├── hooks/             # Custom React hooks
│   │   └── use-mobile.ts
│   ├── layout/            # Layout wrappers
│   │   ├── main.tsx
│   │   └── withSidebar.tsx
│   ├── lib/
│   │   └── utils.ts       # Helper utilities (clsx + tailwind-merge)
│   ├── pages/             # Page-level components (consumed by routes)
│   │   ├── get-started/
│   │   ├── landing-page/
│   │   └── web-sockets/
│   ├── routes/            # React Router route modules
│   │   ├── landing-page.tsx
│   │   ├── get-started.tsx
│   │   └── web-sockets.tsx
│   ├── routes.ts          # Route configuration (typed)
│   ├── root.tsx           # App root (html shell, global providers)
│   └── app.css            # Global styles + Tailwind entry
├── public/                # Static assets
├── react-router.config.ts # React Router framework config (SSR enabled)
├── vite.config.ts         # Vite config
├── tsconfig.json
├── Dockerfile
└── package.json
```

---

## Routing

Routes are defined in [`app/routes.ts`](../apps/frontend/app/routes.ts) using the typed route config API:

| Path | Route Module | Page Component |
|------|-------------|----------------|
| `/` | `routes/landing-page.tsx` | `pages/landing-page/` |
| `/get-started` | `routes/get-started.tsx` | `pages/get-started/` |
| `/web-sockets` | `routes/web-sockets.tsx` | `pages/web-sockets/` |

React Router v7 generates TypeScript types for each route under `.react-router/types/` — run `typecheck` to regenerate them.

---

## Configuration

### `react-router.config.ts`

```ts
export default {
  ssr: true,  // Server-side rendering enabled (default)
} satisfies Config;
```

Setting `ssr: false` switches to SPA mode (no server rendering).

### `vite.config.ts`

Three plugins are registered:
1. `tailwindcss()` — Tailwind v4 via Vite plugin
2. `reactRouter()` — React Router framework integration
3. `tsconfigPaths()` — resolves `~/` path alias from `tsconfig.json`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build for production (outputs to `build/`) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Regenerate route types and run TypeScript check |

---

## Running Locally

**Prerequisites:** Node.js 20+, npm

```bash
# From the frontend app directory
cd apps/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The dev server runs with hot module replacement. The default port is typically `5173` (Vite default) unless configured otherwise.

---

## Building for Production

```bash
cd apps/frontend

npm run build
npm run start
```

`build/` will contain:
- `build/server/` — SSR server bundle
- `build/client/` — static client assets

---

## Docker

A multi-stage `Dockerfile` is provided for containerized deployments:

```bash
# Build the image
docker build -t the-learning-cove-frontend .

# Run the container
docker run -p 3000:3000 the-learning-cove-frontend
```

The Dockerfile stages:
1. `development-dependencies-env` — installs all deps
2. `production-dependencies-env` — installs prod-only deps
3. `build-env` — runs `npm run build`
4. Final image — copies prod deps + build output, runs `npm run start`

---

## Path Aliases

TypeScript path aliases are configured via `tsconfig.json` and resolved by Vite:

- `~/*` resolves to `app/`

Example: `import { utils } from '~/lib/utils'`
