import type { Route } from "./+types/get-started";
import GetStarted from "~/pages/get-started";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function GetStartedRoute() {
  return <GetStarted />;
}
