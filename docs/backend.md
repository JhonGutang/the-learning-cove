# Backend Architecture & Tools

## Overview

The Learning Cove backend is a **RESTful API** built with **Express.js** and **TypeScript**, using **SQLite** (via sql.js) for data persistence. It provides endpoints for blog management (CRUD operations) and system health checks.

**Location:** `apps/backend/`  
**Language:** TypeScript  
**Runtime:** Node.js  
**Framework:** Express.js v5.2.1

---

## Tech Stack

| Layer | Tool | Version |
|-------|------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | 5.2.1 |
| **Language** | TypeScript | 5.x |
| **Database** | SQLite (sql.js) | In-memory |
| **HTTP Server** | Express | Built-in |
| **Middleware** | Express CORS | Built-in |
| **Build Tool** | TypeScript Compiler | Via pnpm |

---

## Directory Structure

```
apps/backend/
├── src/
│   ├── app.ts                 # Express app setup, middleware config
│   ├── server.ts              # Server entry point, listen port
│   ├── controllers/
│   │   ├── blogs.controller.ts      # Blog CRUD HTTP handlers
│   │   └── health.controller.ts     # Health check endpoint
│   ├── services/
│   │   └── blogs.service.ts    # Blog business logic & data access
│   └── db/
│       ├── schema.ts           # Database schema & TypeScript types
│       └── client.ts           # Database connection & query helpers
├── package.json
├── tsconfig.json
└── vite.config.ts             # Vite dev server config

```

---

## Architecture Pattern

The backend follows a **three-layer architecture**:

### 1. **Controllers** (`src/controllers/`)
Handles HTTP requests and responses. Validates input, delegates to services, formats output.

**Example:** `blogs.controller.ts`
```typescript
GET /api/blogs → getAllBlogs() → calls blogService.getBlogs() → returns JSON array
POST /api/blogs → createBlog(req.body) → validates → calls service → returns 201 + resource
```

### 2. **Services** (`src/services/`)
Contains business logic and data access. Orchestrates database operations, enforces rules.

**Example:** `blogs.service.ts`
- `getBlogs()` - Fetch all blogs ordered by creation date
- `getBlogById(id)` - Find blog by ID
- `createBlog(data)` - Insert new blog with defaults (status: draft, timestamps)
- `updateBlog(id, data)` - Update blog content, metadata, auto-update timestamp
- `deleteBlog(id)` - Remove blog by ID

### 3. **Database** (`src/db/`)
Manages SQLite connection and schema. Provides query execution helpers.

**Files:**
- `schema.ts` - Defines table structure and TypeScript interfaces
- `client.ts` - Database initialization, query helpers, transaction support

---

## Database Schema

### `blogs` Table

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique blog identifier |
| `title` | TEXT | NOT NULL | Blog title (required) |
| `description` | TEXT | NOT NULL | Short summary/excerpt |
| `content` | TEXT | NULL | Rich HTML content from TipTap editor |
| `tags` | TEXT | NULL | Comma-separated tag list |
| `category` | TEXT | NULL | Blog category for filtering |
| `status` | TEXT | DEFAULT 'draft' | `published` \| `draft` \| `archived` |
| `readTime` | INTEGER | NULL | Estimated read time (minutes) |
| `createdAt` | TEXT | NOT NULL | ISO 8601 timestamp (set on insert) |
| `updatedAt` | TEXT | NOT NULL | ISO 8601 timestamp (updated on edit) |

**TypeScript Interface:**
```typescript
interface Blog {
  id: number;
  title: string;
  description: string;
  content?: string;
  tags?: string;
  category?: string;
  status: 'published' | 'draft' | 'archived';
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## API Endpoints

### Health Check
```
GET /health
```
**Response:** `200 OK`
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-06-10T12:34:56Z"
}
```

---

### Blog Endpoints

#### List All Blogs
```
GET /api/blogs
```
**Query Parameters:**
- `status` (optional) — Filter by status: `published`, `draft`, or `archived`
- `category` (optional) — Filter by category name
- `search` (optional) — Search by title, description, or tags

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Getting Started with React",
    "description": "A beginner's guide to React fundamentals",
    "content": "<h1>React Basics</h1>...",
    "tags": "react,javascript,frontend",
    "category": "Web Development",
    "status": "published",
    "readTime": 8,
    "createdAt": "2026-06-01T10:00:00Z",
    "updatedAt": "2026-06-05T14:30:00Z"
  }
]
```

---

#### Get Blog by ID
```
GET /api/blogs/:id
```
**Response:** `200 OK` (blog object) or `404 Not Found`

---

#### Create New Blog
```
POST /api/blogs
Content-Type: application/json

{
  "title": "My New Blog",
  "description": "A short summary",
  "content": "<p>Full content here...</p>",
  "tags": "tag1,tag2",
  "category": "Web Development",
  "status": "draft"
}
```

**Required fields:** `title`, `description`  
**Optional fields:** `content`, `tags`, `category`, `status` (defaults to `draft`)

**Response:** `201 Created`
```json
{
  "id": 2,
  "title": "My New Blog",
  "description": "A short summary",
  "content": "<p>Full content here...</p>",
  "tags": "tag1,tag2",
  "category": "Web Development",
  "status": "draft",
  "readTime": null,
  "createdAt": "2026-06-10T12:00:00Z",
  "updatedAt": "2026-06-10T12:00:00Z"
}
```

---

#### Update Blog
```
PUT /api/blogs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated summary",
  "content": "<p>Updated content...</p>",
  "status": "published",
  "category": "New Category"
}
```

**Fields:** Any blog field can be updated. `updatedAt` is automatically set.

**Response:** `200 OK` (updated blog object) or `404 Not Found`

---

#### Delete Blog
```
DELETE /api/blogs/:id
```
**Response:** `204 No Content` or `404 Not Found`

---

## Core Middleware & Configuration

### CORS Policy
```typescript
// Development
origin: ['http://localhost:5173', 'http://localhost:3000']

// Production
origin: process.env.FRONTEND_URL || 'http://localhost:5173'
```

### Request Parsing
- `express.json()` - Parse JSON request bodies (limit: 10mb)
- `express.urlencoded()` - Parse form-encoded data

### Error Handling
- Validation errors → `400 Bad Request`
- Not found → `404 Not Found`
- Server errors → `500 Internal Server Error` (with error message in dev)

---

## Running the Backend

### Development
```bash
cd apps/backend
pnpm dev
```
Server runs on `http://localhost:3000`

### Type Checking
```bash
cd apps/backend
pnpm typecheck
```

### Build for Production
```bash
cd apps/backend
pnpm build
```
Output → `dist/` directory

---

## Development Tips

### Database Reset
The SQLite database (sql.js) is **in-memory**, so it resets on server restart. To persist data, migrate to a file-based SQLite or PostgreSQL.

### Add New Endpoint
1. Create handler in `src/controllers/<resource>.controller.ts`
2. Create service methods in `src/services/<resource>.service.ts`
3. Add route in `src/app.ts`
4. Define types in `src/db/schema.ts` (if needed)

### Testing API Locally
Use curl, Postman, or REST Client VSCode extension:
```bash
# Get all blogs
curl http://localhost:3000/api/blogs

# Create blog
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test blog"}'
```

---

## Future Considerations

- **Database Persistence:** Migrate from sql.js (in-memory) to SQLite file or PostgreSQL
- **Authentication:** Add JWT or session-based auth for blog creation/editing
- **Rate Limiting:** Add express-rate-limit to prevent abuse
- **Input Validation:** Add zod/joi for schema validation
- **Logging:** Add structured logging (Winston, Pino)
- **Error Tracking:** Integrate Sentry or similar error reporting
- **Testing:** Set up Jest or Vitest for unit/integration tests
