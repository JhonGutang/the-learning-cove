# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

The Learning Cove is a personal knowledge/CRM system for a developer to write and publish rich-text content about software engineering learnings. Think blog + compendium, not a generic CRM.

## Monorepo Structure

This is a **pnpm + Turborepo** monorepo. Packages live under `apps/`. The workspace has two apps:

- `apps/admin` — React Router v7 SSR admin dashboard (Vite, TailwindCSS, shadcn/ui)
- `apps/backend` — Express.js REST API (TypeScript, SQLite via sql.js)

## Commands

Run from the **repo root** using pnpm:

```bash
pnpm dev                  # start all apps (backend + frontend)
pnpm dev:admin            # start only the admin dashboard (http://localhost:5173)
pnpm dev:backend          # start only the backend (http://localhost:3000)
pnpm build                # build all apps
pnpm typecheck            # type-check all apps
```

To run commands scoped to one package directly:

```bash
cd apps/admin
pnpm dev
pnpm build
pnpm typecheck

cd apps/backend
pnpm dev
pnpm build
pnpm typecheck
```

There are no test scripts configured yet.

## Backend Architecture (`apps/backend`)

**Framework:** Express.js with TypeScript, SQLite (sql.js in-memory database).

### Directory structure

```
src/
  controllers/           # HTTP request handlers
    blogs.controller.ts  # Blog CRUD endpoints
    health.controller.ts # Health check endpoint
  services/              # Business logic and data access
  db/
    schema.ts            # Database schema & TypeScript interfaces
    client.ts            # Database connection & query execution
  app.ts                 # Express app setup & middleware
  server.ts              # Server entry point
```

### Architecture pattern

1. **Controller** → handles HTTP requests, validation, responses
2. **Service** → executes business logic and data access
3. **Database** → SQLite via sql.js (swappable for production DB)

### Key endpoints

- `GET /health` — Health check with database connectivity status
- `GET /api/blogs` — List all blogs (newest first)
- `GET /api/blogs/:id` — Get blog by ID
- `POST /api/blogs` — Create new blog (requires title & description)
- `PUT /api/blogs/:id` — Update blog content & metadata
- `DELETE /api/blogs/:id` — Delete blog

### Database schema

**blogs table:**
```
id: number (primary key, auto-increment)
title: string (required)
description: string (required)
content: string (rich HTML content, optional)
tags: string (comma-separated, optional)
category: string (blog category for filtering, optional)
status: string (published|draft|archived, default: draft)
readTime: number (estimated read time in minutes, optional)
createdAt: string (ISO timestamp)
updatedAt: string (ISO timestamp)
```

### CORS policy

- **Development:** Allows `http://localhost:5173` (frontend) and `http://localhost:3000` (same origin)
- **Production:** Configurable via `FRONTEND_URL` env var

## Admin Dashboard Architecture (`apps/admin`)

**Framework:** React Router v7 with SSR enabled (`react-router.config.ts` → `ssr: true`).

### Directory structure

```
app/
  features/             # one folder per page/feature
    landing-page/
      components/       # components used only by this feature
      hooks/            # hooks scoped to this feature
      constants/        # constants scoped to this feature
      index.tsx         # page component (the feature's entry point)
    get-started/
      components/
      constants/
      index.tsx
    web-sockets/
      index.tsx
    admin/
      components/       # AdminSidebar, BlogCard, CreateBlogDialog, FloatingCreateButton, StatusConfirmModal
      index.tsx
    editor/
      components/       # EditorPane, Toolbar
      index.tsx
    editor-preview/
      index.tsx         # standalone preview page (reads from localStorage)
    health-check/
      index.tsx
  components/           # shared components used across features
    ui/                 # shadcn/ui primitives
    header.tsx
  layout/               # layout shells
    main.tsx
    withSidebar.tsx
  hooks/                # shared hooks used across features
  lib/                  # utilities (cn, etc.)
  routes/               # thin route wrappers — export meta only, no UI logic
  root.tsx
  routes.ts
```

### Rules

- **Feature folder = one page.** Everything a feature needs (components, hooks, constants) lives inside `app/features/<feature-name>/`. Only promote to a shared folder when two or more features need the same thing.
- **Routes stay thin.** `app/routes/` files export `meta` (and optionally loaders/actions) and render the feature's `index.tsx`. No JSX business logic in route files.
- **Shared components** go in `app/components/`. `app/components/ui/` is reserved for shadcn primitives.
- **Layouts** in `app/layout/` are reusable shells; wrap page content in a layout inside the feature's `index.tsx`.

### Theme

Dark/light toggle is handled entirely client-side in `app/components/header.tsx` via `document.documentElement.classList` and `localStorage.theme`. There is no server-side theme provider.

### Other conventions

- **Path alias:** `~` maps to `app/` (configured in `tsconfig.json`).
- **UI components:** shadcn/ui (radix-lyra style, mauve base color) with lucide icons. Use the `cn()` utility from `~/lib/utils` for conditional class merging.

### Current routes

- `/` → `features/landing-page` (landing page with introduction)
- `/get-started` → `features/get-started` (onboarding/tutorial page)
- `/web-sockets` → `features/web-sockets` (WebSocket demo/testing)
- `/health-check` → `features/health-check` (backend health status)
- `/admin` → `features/admin` (blog management dashboard)
- `/admin/editor/:id?` → `features/editor` (create or edit a blog; `:id` is optional)
- `/admin/editor/preview` → `features/editor-preview` (standalone preview page, reads HTML from `localStorage`)

## System Features

### Blog Management (`/admin`)
- **View all blogs** in a responsive grid layout
- **Search blogs** by title, description, or tags
- **Filter by status** — Published, Draft, or Archived
- **Filter by category** — Shows all available categories dynamically
- **Create new blog** with quick-add dialog (defaults to Draft status, navigates straight to editor)
- **Click to edit** any blog to open the rich-text editor
- **Blog cards display:**
  - Title and excerpt
  - **Inline status dropdown** — clicking the status badge opens a dropdown to change status; a `StatusConfirmModal` confirmation dialog appears before applying the change
  - Category badge (blue)
  - Tags, creation date, and read time estimate
- **Floating create button** for quick blog creation
- **Sidebar navigation** for access to different sections

### Blog Editor (`/admin/editor/:id?`)
- **Rich-text editing** with TipTap editor
  - Text formatting: Bold, Italic
  - Headings: H1, H2, H3
  - Links (prompt-based URL input)
  - Text alignment: Left, Center, Right, Justify
- **Single-pane layout** — full-width editor with formatting toolbar
- **Auto-save functionality**
  - Saves automatically 5 seconds after you stop typing
  - Only saves if content has actually changed
  - Shows "Saving…" spinner while saving
  - Shows checkmark "Saved at HH:MM:SS" when save completes
  - Auto-hides save status indicators after 2 seconds
- **Manual save button** in the header toolbar
- **Metadata bar** (shown when editing an existing blog)
  - **Category field** — Add or change the blog category (auto-saves with content)
- **Blog metadata** (title, description, tags, read time, status) is stored on the blog record and visible in the admin dashboard

### Editor Preview (`/admin/editor/preview`)
- Standalone full-page preview that renders HTML stored in `localStorage` under the key `editor-preview-html`
- Uses Tailwind Typography (`prose`) for styled article rendering with dark-mode support
