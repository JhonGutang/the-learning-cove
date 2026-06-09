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
            <div className="flex-1 overflow-auto p-4">
                <EditorContent
                    editor={editor}
                    className="h-full outline-none [&_.tiptap]:min-h-full [&_.tiptap]:outline-none [&_.tiptap]:text-sm [&_.tiptap]:leading-relaxed"
                />
            </div>
        </div>
    );
}
