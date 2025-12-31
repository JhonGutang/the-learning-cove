import type { Route } from "./+types/web-sockets";
import WebSockets from "~/pages/web-sockets";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function WebSocketsRoute() {
  return <WebSockets />;
}
