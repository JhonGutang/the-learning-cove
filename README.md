# The Learning Cove

A monorepo-based CRM system for documenting and sharing software engineering learnings and insights.

## Project Overview

The Learning Cove is a knowledge management system designed for developers to create, organize, and share rich text content about learnings from their experiences handling projects. The system allows for saving drafts and publishing content for broader visibility.

### Core Features

- **Rich Text Content Creation** – Write and format technical content
- **Content Management** – Save drafts and manage visibility
- **Database-backed Storage** – Persistent storage of all content
- **Blog-style Publishing** – Share learnings with others

## Architecture

This is a **monorepo** project built with:

- **[pnpm](https://pnpm.io/)** – Fast, disk space-efficient package manager
- **[Turbo](https://turbo.build/)** – High-performance build system for monorepos

### Project Structure

```
the-learning-cove/
├── apps/
│   ├── frontend/          # React Router frontend application
│   └── backend/           # Backend API (coming soon)
├── docs/                  # Project documentation
├── package.json           # Root workspace configuration
├── turbo.json             # Turbo build configuration
└── pnpm-workspace.yaml    # pnpm workspace configuration
```

## Getting Started

### Prerequisites

- **Node.js** – v18 or higher
- **pnpm** – v10.12.1 or higher (can be installed via `npm install -g pnpm`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd the-learning-cove
```

2. Install dependencies:
```bash
pnpm install
```

This command installs all dependencies for all packages in the monorepo.

## Development

### Running the Development Server

Start all development servers:
```bash
pnpm dev
```

Run only the frontend development server:
```bash
pnpm dev:frontend
```

The frontend will start on the port specified in `apps/frontend/.env` (default: `5137`).

### Building

Build all applications:
```bash
pnpm build
```

### Type Checking

Run TypeScript type checks:
```bash
pnpm typecheck
```

## Apps

### Frontend (`apps/frontend/`)

A modern React application built with:
- **React Router** – Routing and SSR
- **Vite** – Fast build tool
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first styling
- **Radix UI** – Accessible component library
- **shadcn** – Component library

**Key Files:**
- `vite.config.ts` – Vite and dev server configuration
- `.env` – Environment variables (PORT, API endpoints, etc.)
- `app/` – Application source code

### Backend (`apps/backend/`)

Backend API application (planned).

## Environment Variables

### Frontend (`apps/frontend/.env`)

```
PORT=5137
```

Configure the port where the frontend dev server runs.

## Turbo Configuration

The `turbo.json` file defines task dependencies and caching behavior:

- **build** – Depends on dependencies being built first
- **dev** – Real-time development mode (no caching)
- **typecheck** – Type checking with dependency resolution

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start all dev servers |
| `pnpm dev:frontend` | Start frontend dev server only |
| `pnpm build` | Build all applications |
| `pnpm typecheck` | Run TypeScript checks |

## Contributing

When working on this monorepo:

1. Use `pnpm` for all package management
2. Turbo caches build outputs automatically – use `--force` to rebuild
3. Filter specific packages: `turbo run <task> --filter=@the-learning-cove/frontend`

## Technology Stack

### Frontend
- React 19
- React Router 7
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components

### Build & Package Management
- pnpm 10.12.1
- Turbo 2.5.4+

## License

Private project

## Support

For more information, see the [docs](./docs/) directory.
