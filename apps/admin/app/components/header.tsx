import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

type HeaderProps = {
    title?: string;
};

export default function Header({ title }: HeaderProps) {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const html = document.documentElement;
        const savedTheme = localStorage.theme;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme);

        if (shouldBeDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        setIsDark(shouldBeDark);
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        }
        setIsDark(!isDark);
    };

    if (!mounted) return null;

    return (
        <header className="h-[8vh] w-full flex items-center justify-between px-6 shadow-sm bg-transparent">
            <div className="flex items-center gap-4">
                {title && (
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
                )}
                
            </div>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-white" />
                ) : (
                    <Moon className="w-5 h-5 text-slate-900" />
                )}
            </button>
        </header>
    );
}
