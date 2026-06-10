import { useQuery } from "@tanstack/react-query";
import { getPublishedBlogs } from "~/lib/api";
import { publishedBlogsQuery } from "~/lib/queries";
import FeedPage from "~/features/feed";
import type { Route } from "./+types/feed";

export async function loader() {
  const blogs = await getPublishedBlogs();
  return { blogs };
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "The Learning Cove" },
    { name: "description", content: "Notes on software engineering, systems, and craft." },
  ];
}

export default function Feed({ loaderData }: Route.ComponentProps) {
  const { data: blogs } = useQuery({
    ...publishedBlogsQuery,
    initialData: loaderData.blogs,
  });

  return <FeedPage blogs={blogs} />;
}
