import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("feed", "routes/feed.tsx"),
  route("article/:id", "routes/article.$id.tsx"),
] satisfies RouteConfig;
