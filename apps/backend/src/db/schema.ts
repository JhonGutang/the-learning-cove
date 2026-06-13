// Database schema documentation
// This file documents the SQLite tables used in the application

export const TABLES = {
  HEALTH_LOGS: 'health_logs',
  BLOGS: 'blogs',
  REACTIONS: 'reactions',
} as const;

export interface HealthLog {
  id: number;
  status: string;
  timestamp: string;
}

export type BlogStatus = 'published' | 'draft' | 'archived';

export type ReactionType = 'heart' | 'wow';

export interface Reaction {
  blogId: number;
  type: ReactionType;
  count: number;
}

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
