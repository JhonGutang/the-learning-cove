import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { cn } from '~/lib/utils';
import { Home, FileText, Plus } from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/admin', icon: Home },
        { label: 'Documents', path: '/admin/documents', icon: FileText },
    ];

    return (
        <aside className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-4 text-lg font-semibold border-b border-slate-200 dark:border-slate-700">
                Admin Dashboard
            </div>
            <nav className="flex flex-col gap-1 p-2 flex-1">
                {navItems.map(({ label, path, icon: Icon }) => (
                    <button
                        key={path}
                        className={cn(
                            "flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors",
                            location.pathname === path
                                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                        onClick={() => navigate(path)}
                    >
                        <Icon size={16} />
                        {label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
