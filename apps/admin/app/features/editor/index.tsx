import { useState, useEffect, useRef } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Check, Loader2 } from "lucide-react";
import Header from "~/components/header";
import EditorPane from "./components/EditorPane";
import { Button } from "~/components/ui/button";

interface Blog {
  id: number;
  title: string;
  description: string;
  content?: string;
  tags?: string;
  category?: string;
  status: "published" | "draft" | "archived";
  readTime?: number;
  createdAt: string;
}

interface EditorPageProps {
  blogId?: string;
}

export default function EditorPage({ blogId }: EditorPageProps) {
  const [html, setHtml] = useState("");
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [isLoading, setIsLoading] = useState(!!blogId);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const hideSavedTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedContentRef = useRef<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
    ],
    content: "<p>Start writing…</p>",
    immediatelyRender: false,
    onUpdate({ editor }) {
      setHtml(editor.getHTML());
    },
  });

  const handleSave = async () => {
    if (!blogId || !blog) return;

    try {
      setIsSaving(true);
      const response = await fetch(
        `http://localhost:3000/api/blogs/${blogId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: blog.title,
            description: blog.description,
            content: html,
            tags: blog.tags,
            category: blog.category,
            status: blog.status,
            readTime: blog.readTime,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to save blog");
      const updated = await response.json();
      setBlog(updated);
      lastSavedContentRef.current = html;
      setLastSaved(new Date().toLocaleTimeString());
      setIsSaving(false);

      hideSavedTimeoutRef.current = setTimeout(() => {
        setLastSaved("");
      }, 2000);
    } catch (error) {
      console.error("Error saving blog:", error);
      setIsSaving(false);
    }
  };

  // Load blog data if blogId is provided
  useEffect(() => {
    if (!blogId) {
      setIsLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/blogs/${blogId}`,
        );
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data);
        if (editor && data.content) {
          editor.commands.setContent(data.content);
          setHtml(data.content);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, editor]);

  // Auto-save functionality with debouncing
  useEffect(() => {
    if (!blog && !blogId) return;

    // Clear existing timeouts
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    if (hideSavedTimeoutRef.current) {
      clearTimeout(hideSavedTimeoutRef.current);
    }

    // Check if content has changed since last save
    const hasChanges = html !== lastSavedContentRef.current;
    if (!hasChanges) return;

    // Set new timeout for auto-save after 5 seconds of inactivity
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        if (blogId && blog && html !== lastSavedContentRef.current) {
          setIsSaving(true);
          // Update existing blog
          const response = await fetch(
            `http://localhost:3000/api/blogs/${blogId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: blog.title,
                description: blog.description,
                content: html,
                tags: blog.tags,
                category: blog.category,
                status: blog.status,
                readTime: blog.readTime,
              }),
            },
          );

          if (!response.ok) throw new Error("Failed to save blog");
          const updated = await response.json();
          setBlog(updated);
          lastSavedContentRef.current = html;
          setLastSaved(new Date().toLocaleTimeString());
          setIsSaving(false);

          // Hide the saved indicator after 2 seconds
          hideSavedTimeoutRef.current = setTimeout(() => {
            setLastSaved("");
          }, 2000);
        }
      } catch (error) {
        console.error("Error saving blog:", error);
        setIsSaving(false);
      }
    }, 5000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      if (hideSavedTimeoutRef.current) {
        clearTimeout(hideSavedTimeoutRef.current);
      }
    };
  }, [html, blogId, blog]);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="border-b border-border bg-muted/10">
        <div className="flex items-center justify-between px-4 py-2">
          <div>
            <Header title={blog?.title || "Learning Cove Editor"} />
          </div>
          <div className="flex items-center gap-3">
            {isSaving && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  Saving…
                </span>
              </div>
            )}
            {lastSaved && !isSaving && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  Saved at {lastSaved}
                </span>
              </div>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              Save
            </Button>
          </div>
        </div>
        {blog && (
          <div className="px-4 py-3 border-t border-border flex gap-4">
            <input
              type="text"
              placeholder="Category (optional)"
              value={blog.category || ""}
              onChange={(e) => setBlog({ ...blog, category: e.target.value })}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-muted-foreground">Loading blog...</p>
        </div>
      ) : (
        <div className="w-full flex-1 min-h-0">
          <EditorPane editor={editor} />
        </div>
      )}
    </div>
  );
}
