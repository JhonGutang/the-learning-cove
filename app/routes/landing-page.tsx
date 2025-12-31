import type { Route } from "./+types/landing-page";
import LandingPage from "~/pages/landing-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Landing() {
  return <LandingPage />;
}
