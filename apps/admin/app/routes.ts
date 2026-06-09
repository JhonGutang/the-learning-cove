import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing-page.tsx"),
    route("/get-started", "routes/get-started.tsx"),
    route("/web-sockets", "routes/web-sockets.tsx"),
    route("/health-check", "routes/health-check.tsx"),
    route("/admin", "routes/admin.tsx"),
    route("/admin/editor/preview", "routes/editor-preview.tsx"),
    route("/admin/editor/:id?", "routes/editor.tsx"),
] satisfies RouteConfig;
