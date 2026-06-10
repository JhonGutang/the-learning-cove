import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import type { Blog } from "~/lib/api";

export default function ArticlePage({ blog }: { blog: Blog }) {
  const tags = blog.tags ? blog.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/feed"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          ← Back to feed
        </Link>

        <article>
          <header className="mb-8">
            {blog.category && (
              <Badge variant="secondary" className="mb-3">
                {blog.category}
              </Badge>
            )}
            <h1 className="text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {blog.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
              <span>{date}</span>
              {blog.readTime ? <span>{blog.readTime} min read</span> : null}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {blog.content ? (
            <div
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="text-muted-foreground italic">No content yet.</p>
          )}
        </article>
      </div>
    </div>
  );
}
