import { data } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "~/lib/api";
import { blogDetailQuery } from "~/lib/queries";
import ArticlePage from "~/features/article";
import type { Route } from "./+types/article.$id";

export async function loader({ params }: Route.LoaderArgs) {
  const blog = await getBlogById(params.id);
  if (blog.status !== "published") {
    throw data("Not found", { status: 404 });
  }
  return { blog };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Not Found" }];
  return [
    { title: `${data.blog.title} — The Learning Cove` },
    { name: "description", content: data.blog.description },
  ];
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const { data: blog } = useQuery({
    ...blogDetailQuery(String(loaderData.blog.id)),
    initialData: loaderData.blog,
  });

  return <ArticlePage blog={blog} />;
}
