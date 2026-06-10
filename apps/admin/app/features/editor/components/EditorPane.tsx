import type { Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import Toolbar from './Toolbar';

type EditorPaneProps = { editor: Editor | null };

export default function EditorPane({ editor }: EditorPaneProps) {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="px-3 py-2 border-b border-border bg-muted/20 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Editor
            </div>
            <Toolbar editor={editor} />
            <div className="flex-1 overflow-auto p-6">
                <EditorContent
                    editor={editor}
                    className="max-w-3xl [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-96"
                />
            </div>
        </div>
    );
}
