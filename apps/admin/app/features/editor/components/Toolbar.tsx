import type { Editor } from '@tiptap/react';
import {
    Bold, Italic,
    Heading1, Heading2, Heading3,
    Link,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
} from 'lucide-react';
import { cn } from '~/lib/utils';

type ToolbarProps = { editor: Editor | null };

type ToolbarButtonProps = {
    onClick: () => void;
    isActive?: boolean;
    title: string;
    children: React.ReactNode;
};

function ToolbarButton({ onClick, isActive, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault();
                onClick();
            }}
            title={title}
            className={cn(
                'p-1.5 rounded hover:bg-accent transition-colors',
                isActive && 'bg-accent text-accent-foreground'
            )}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <div className="w-px h-5 bg-border mx-1" />;
}

export default function Toolbar({ editor }: ToolbarProps) {
    if (!editor) return null;

    const setLink = () => {
        const url = window.prompt('Enter URL');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().unsetLink().run();
        } else {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-border bg-muted/40">
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold (Ctrl+B)"
            >
                <Bold size={16} strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic (Ctrl+I)"
            >
                <Italic size={16} strokeWidth={2.5} />
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            >
                <Heading1 size={16} strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            >
                <Heading2 size={16} strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="Heading 3"
            >
                <Heading3 size={16} strokeWidth={2.5} />
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                onClick={setLink}
                isActive={editor.isActive('link')}
                title="Link"
            >
                <Link size={16} strokeWidth={2.5} />
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
                title="Align Left"
            >
                <AlignLeft size={16} strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
                title="Align Center"
            >
                <AlignCenter size={16} strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
                title="Align Right"
            >
                <AlignRight size={16} strokeWidth={2.5} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                isActive={editor.isActive({ textAlign: 'justify' })}
                title="Justify"
            >
                <AlignJustify size={16} strokeWidth={2.5} />
            </ToolbarButton>
        </div>
    );
}
