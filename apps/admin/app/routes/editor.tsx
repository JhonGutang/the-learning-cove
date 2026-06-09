import type { Route } from "./+types/editor";
import EditorPage from "~/features/editor";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Editor — The Learning Cove" },
        { name: "description", content: "Write and preview rich-text content." },
    ];
}

export default function EditorRoute({ params }: Route.ComponentProps) {
    return <EditorPage blogId={params.id} />;
}
