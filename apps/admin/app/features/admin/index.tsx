import React, { useState, useEffect } from 'react';
import Header from '~/components/header';
import AdminSidebar from './components/AdminSidebar';
import BlogCard from './components/BlogCard';
import FloatingCreateButton from './components/FloatingCreateButton';
import CreateBlogDialog from './components/CreateBlogDialog';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Blog {
    id: number;
    title: string;
    description: string;
    content?: string;
    tags?: string;
    category?: string;
    status: 'published' | 'draft' | 'archived';
    readTime?: number;
    createdAt: string;
}

export default function AdminPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/blogs');
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateBlog = async (data: { title: string; description: string }) => {
        try {
            const response = await fetch('http://localhost:3000/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to create blog');
            const newBlog = await response.json();
            setBlogs([newBlog, ...blogs]);
            navigate(`/admin/editor/${newBlog.id}`);
        } catch (error) {
            throw error instanceof Error ? error : new Error('Failed to create blog');
        }
    };

    const categories = Array.from(new Set(blogs.map(b => b.category).filter(Boolean))) as string[];

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch =
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (blog.tags && blog.tags.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = selectedStatus === 'all' || blog.status === selectedStatus;
        const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="flex w-screen h-screen">
            <AdminSidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <Header />
                <main className="flex-1 overflow-auto">
                    <div className="p-6 max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">All Blogs</h1>
                            <p className="text-slate-600 dark:text-slate-400">Manage and view all your published content</p>
                        </div>

                        <div className="mb-6 space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search blogs by title or tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
                                />
                            </div>

                            <div className="flex gap-4">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
                                >
                                    <option value="all">All Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>

                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500 dark:text-slate-400">Loading blogs...</p>
                            </div>
                        ) : filteredBlogs.length === 0 && blogs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500 dark:text-slate-400">No blogs yet. Click the + button to create your first blog!</p>
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500 dark:text-slate-400">No blogs found matching your search.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredBlogs.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        id={String(blog.id)}
                                        title={blog.title}
                                        excerpt={blog.description}
                                        date={new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                        tags={blog.tags ? blog.tags.split(',').map(t => t.trim()) : []}
                                        status={blog.status}
                                        category={blog.category}
                                        readTime={blog.readTime}
                                        onClick={() => navigate(`/admin/editor/${blog.id}`)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <FloatingCreateButton onClick={() => setIsDialogOpen(true)} />
            <CreateBlogDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleCreateBlog}
            />
        </div>
    );
}
