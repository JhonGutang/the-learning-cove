import type { Blog } from "~/lib/api";
import PostCard from "./components/PostCard";

export default function FeedPage({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            The Learning Cove
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Notes on software engineering, systems, and craft.
          </p>
        </header>

        {blogs.length === 0 ? (
          <p className="text-muted-foreground">No published posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <PostCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
