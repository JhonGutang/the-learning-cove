import { queryOptions } from "@tanstack/react-query";
import { getBlogById, getPublishedBlogs, getReactions } from "./api";

export const blogKeys = {
  all: ["blogs"] as const,
  published: () => [...blogKeys.all, "published"] as const,
  detail: (id: string) => [...blogKeys.all, id] as const,
};

export const publishedBlogsQuery = queryOptions({
  queryKey: blogKeys.published(),
  queryFn: getPublishedBlogs,
});

export const blogDetailQuery = (id: string) =>
  queryOptions({
    queryKey: blogKeys.detail(id),
    queryFn: () => getBlogById(id),
  });

export const reactionKeys = {
  all: ["reactions"] as const,
  blog: (blogId: number) => [...reactionKeys.all, blogId] as const,
};

export const reactionQuery = (blogId: number) =>
  queryOptions({
    queryKey: reactionKeys.blog(blogId),
    queryFn: () => getReactions(blogId),
  });
