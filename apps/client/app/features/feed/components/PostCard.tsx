import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { Blog } from "~/lib/api";

export default function PostCard({ blog }: { blog: Blog }) {
  const tags = blog.tags ? blog.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/article/${blog.id}`} className="block group">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold text-card-foreground leading-snug group-hover:underline">
              {blog.title}
            </h2>
            {blog.category && (
              <Badge variant="secondary" className="shrink-0">
                {blog.category}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {blog.description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>{date}</span>
            {blog.readTime ? <span>{blog.readTime} min read</span> : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
