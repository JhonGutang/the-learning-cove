import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface Blog {
  id: number;
  title: string;
  description: string;
  content?: string;
  tags?: string;
  category?: string;
  status: "published" | "draft" | "archived";
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  const { data } = await apiClient.get<Blog[]>("/api/blogs");
  return data.filter((b) => b.status === "published");
}

export async function getBlogById(id: string): Promise<Blog> {
  const { data } = await apiClient.get<Blog>(`/api/blogs/${id}`);
  return data;
}

export type ReactionType = 'heart' | 'wow';
export type ReactionCounts = Record<ReactionType, number>;

export async function getReactions(blogId: number): Promise<ReactionCounts> {
  const { data } = await apiClient.get<ReactionCounts>(`/api/blogs/${blogId}/reactions`);
  return data;
}

export async function sendReaction(blogId: number, type: ReactionType, delta: 1 | -1): Promise<ReactionCounts> {
  const { data } = await apiClient.post<ReactionCounts>(`/api/blogs/${blogId}/reactions/${type}`, { delta });
  return data;
}
