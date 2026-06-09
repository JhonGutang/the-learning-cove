import { useEffect, useState } from 'react';

export default function EditorPreview() {
    const [html, setHtml] = useState('');

    useEffect(() => {
        setHtml(localStorage.getItem('editor-preview-html') ?? '');
    }, []);

    return (
        <div className="min-h-screen bg-background px-8 py-12">
            <article
                className="prose prose-lg dark:prose-invert mx-auto"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
