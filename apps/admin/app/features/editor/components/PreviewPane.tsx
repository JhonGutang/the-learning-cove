type PreviewPaneProps = { html: string };

export default function PreviewPane({ html }: PreviewPaneProps) {
    const openFullPreview = () => {
        localStorage.setItem('editor-preview-html', html);
        window.open('/editor/preview', '_blank');
    };

    return (
        <div className="flex flex-col h-full overflow-hidden border-l border-border">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/20">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Preview
                </span>
                <button
                    type="button"
                    onClick={openFullPreview}
                    className="text-xs px-2.5 py-1 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Preview in Full
                </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
                <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}
