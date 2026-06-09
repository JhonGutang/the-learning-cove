import type { Route } from "./+types/health-check";
import HealthCheckPage from "~/features/health-check";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "System Health" },
    { name: "description", content: "Monitor backend API health status" },
  ];
};

export default function HealthCheckRoute() {
  return <HealthCheckPage />;
}
