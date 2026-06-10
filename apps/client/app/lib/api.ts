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
