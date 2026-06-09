# Backend - The Learning Cove

REST API backend for The Learning Cove, built with Express, TypeScript, and SQLite.

## Architecture

- **Controllers** → Handle HTTP requests, validation, responses
- **Services** → Business logic and data access
- **Database** → SQLite with Drizzle ORM (swappable)

## Setup

1. Install dependencies from repo root:
   ```bash
   pnpm install
   ```

2. Create `.env` in the repo root with:
   ```
   PORT=3000
   DATABASE_URL=./learning-cove.db
   ```

## Development

From repo root:
```bash
pnpm dev:backend    # Start backend only
pnpm dev            # Start both frontend + backend
```

Backend runs on `http://localhost:3000`

## Health Check

- **Endpoint:** `GET /health`
- **Response:** Status, timestamp, version
- **Purpose:** Verify backend and database connectivity

## API Structure

New routes follow this pattern:
1. Create service at `src/services/<feature>.service.ts`
2. Create controller at `src/controllers/<feature>.controller.ts`
3. Mount router in `src/app.ts`
