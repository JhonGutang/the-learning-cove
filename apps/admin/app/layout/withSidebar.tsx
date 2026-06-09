import React from 'react';
import Header from '~/components/header';
import { useNavigate } from 'react-router';
import { cn } from '~/lib/utils';

const WithSidebar: React.FC<{ children: React.ReactNode; mainClassName?: string }> = ({ children, mainClassName }) => {
    const navigate = useNavigate();

    return (
        <div className="flex w-screen h-screen">
            <aside className="w-56 shrink-0 border-r border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="p-4 text-lg font-semibold border-b border-slate-200 dark:border-slate-700">
                    The Learning Cove
                </div>
                <nav className="flex flex-col gap-1 p-2 flex-1">
                    <button
                        className="text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-sm transition-colors"
                        onClick={() => navigate('/get-started')}
                    >
                        Get Started
                    </button>
                    <button
                        className="text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-sm transition-colors"
                        onClick={() => navigate('/web-sockets')}
                    >
                        Web Sockets
                    </button>
                </nav>
            </aside>
            <div className="flex flex-col flex-1 min-w-0">
                <Header />
                <main className={cn("flex-1 overflow-auto", mainClassName)}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default WithSidebar;
