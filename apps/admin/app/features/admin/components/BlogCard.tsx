import React, { useState } from 'react';
import { Calendar, Tag, ChevronDown } from 'lucide-react';
import StatusConfirmModal from './StatusConfirmModal';

type Status = 'published' | 'draft' | 'archived';

interface BlogCardProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    status?: Status;
    category?: string;
    readTime?: number;
    onClick?: () => void;
    onStatusChange?: (newStatus: Status) => Promise<void>;
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

const BlogCard: React.FC<BlogCardProps> = ({ id, title, excerpt, date, tags, status, category, readTime, onClick, onStatusChange }) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedNewStatus, setSelectedNewStatus] = useState<Status | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusClick = (e: React.MouseEvent, newStatus: Status) => {
        e.stopPropagation();
        setSelectedNewStatus(newStatus);
        setShowConfirm(true);
        setIsStatusOpen(false);
    };

    const handleConfirmStatus = async () => {
        if (!selectedNewStatus || !onStatusChange) return;

        try {
            setIsUpdating(true);
            await onStatusChange(selectedNewStatus);
            setShowConfirm(false);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <div
                onClick={onClick}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow text-left bg-card hover:border-border/80 cursor-pointer"
            >
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground flex-1">{title}</h3>
                    {status && (
                        <div className="ml-2 relative group">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsStatusOpen(!isStatusOpen);
                                }}
                                className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap flex items-center gap-1 ${getStatusColor(status)}`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                <ChevronDown size={12} />
                            </button>

                            {isStatusOpen && (
                                <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-max">
                                    {(['draft', 'published', 'archived'] as Status[]).map((s) => (
                                        <button
                                            key={s}
                                            onClick={(e) => handleStatusClick(e, s)}
                                            disabled={s === status}
                                            className="block w-full text-left px-3 py-2 text-xs hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed first:rounded-t-lg last:rounded-b-lg text-card-foreground"
                                        >
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            {category && (
                <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800">
                        {category}
                    </span>
                </div>
            )}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {date}
                    </div>
                    {readTime && <span>{readTime} min read</span>}
                </div>
            </div>

            {showConfirm && selectedNewStatus && status && (
                <StatusConfirmModal
                    isOpen={showConfirm}
                    currentStatus={status}
                    newStatus={selectedNewStatus}
                    onConfirm={handleConfirmStatus}
                    onCancel={() => setShowConfirm(false)}
                    isLoading={isUpdating}
                />
            )}
        </>
    );
};

export default BlogCard;
