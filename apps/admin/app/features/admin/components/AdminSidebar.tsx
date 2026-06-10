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
        <aside className="w-56 shrink-0 border-r border-border flex flex-col">
            <div className="p-4 text-lg font-semibold border-b border-border text-foreground">
                Admin Dashboard
            </div>
            <nav className="flex flex-col gap-1 p-2 flex-1">
                {navItems.map(({ label, path, icon: Icon }) => (
                    <button
                        key={path}
                        className={cn(
                            "flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm transition-colors",
                            location.pathname === path
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-muted"
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
