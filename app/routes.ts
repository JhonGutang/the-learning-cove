import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing-page.tsx"),
    route("/get-started", "routes/get-started.tsx"),
    route("/web-sockets", "routes/web-sockets.tsx"),
    
] satisfies RouteConfig;
