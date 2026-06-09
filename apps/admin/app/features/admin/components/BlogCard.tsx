import React from 'react';
import { Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    status?: 'published' | 'draft' | 'archived';
    category?: string;
    readTime?: number;
    onClick?: () => void;
}

const getStatusColor = (status?: string) => {
    switch (status) {
        case 'published':
            return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800';
        case 'draft':
            return 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800';
        case 'archived':
            return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600';
        default:
            return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
};

const BlogCard: React.FC<BlogCardProps> = ({ id, title, excerpt, date, tags, status, category, readTime, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-lg transition-shadow text-left bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer"
        >
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex-1">{title}</h3>
                {status && (
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                )}
            </div>
            {category && (
                <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800">
                        {category}
                    </span>
                </div>
            )}
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {date}
                </div>
                {readTime && <span>{readTime} min read</span>}
            </div>
        </button>
    );
};

export default BlogCard;
