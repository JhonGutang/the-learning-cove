import type { Route } from "./+types/editor-preview";
import EditorPreview from "~/features/editor-preview";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Preview — The Learning Cove" },
    ];
}

export default function EditorPreviewRoute() {
    return <EditorPreview />;
}
