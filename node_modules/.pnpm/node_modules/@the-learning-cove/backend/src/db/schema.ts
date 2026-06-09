// Database schema documentation
// This file documents the SQLite tables used in the application

export const TABLES = {
  HEALTH_LOGS: 'health_logs',
  BLOGS: 'blogs',
} as const;

export interface HealthLog {
  id: number;
  status: string;
  timestamp: string;
}

export type BlogStatus = 'published' | 'draft' | 'archived';

export interface Blog {
  id: number;
  title: string;
  description: string;
  content?: string;
  tags?: string;
  category?: string;
  status: BlogStatus;
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}
