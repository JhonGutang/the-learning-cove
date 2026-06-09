export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    tags: string[];
    readTime: number;
}

export const dummyBlogs: Blog[] = [
    {
        id: '1',
        title: 'Getting Started with React Router v7',
        excerpt: 'A deep dive into the new features and improvements in React Router v7, including SSR support and file-based routing.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: 'June 8, 2026',
        tags: ['React', 'React Router', 'SSR'],
        readTime: 8,
    },
    {
        id: '2',
        title: 'Building a Monorepo with pnpm and Turborepo',
        excerpt: 'Learn how to structure and manage a monorepo using pnpm workspaces and Turborepo for efficient builds and deployments.',
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'June 5, 2026',
        tags: ['pnpm', 'Turborepo', 'Monorepo'],
        readTime: 12,
    },
    {
        id: '3',
        title: 'Mastering TypeScript Generics',
        excerpt: 'Understanding TypeScript generics to write flexible, reusable code while maintaining type safety across your applications.',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        date: 'June 1, 2026',
        tags: ['TypeScript', 'Generics', 'Programming'],
        readTime: 10,
    },
    {
        id: '4',
        title: 'WebSocket Real-time Communication Patterns',
        excerpt: 'Explore common patterns and best practices for implementing real-time communication using WebSockets in modern web applications.',
        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: 'May 28, 2026',
        tags: ['WebSocket', 'Real-time', 'Backend'],
        readTime: 15,
    },
    {
        id: '5',
        title: 'Tailwind CSS Performance Tips',
        excerpt: 'Optimize your Tailwind CSS usage for better performance and maintainability in large-scale projects.',
        content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        date: 'May 25, 2026',
        tags: ['Tailwind CSS', 'CSS', 'Performance'],
        readTime: 6,
    },
];
