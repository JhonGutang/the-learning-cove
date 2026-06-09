import { useHealthCheck } from "~/hooks/use-health-check";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function HealthCheckPage() {
  const { data, isLoading, error } = useHealthCheck();

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/5 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <h1 className="text-4xl font-bold mb-2">System Health</h1>
        <p className="text-muted-foreground mb-8">
          Monitor the backend API and database connectivity
        </p>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          {isLoading ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Checking health...</span>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Backend Unreachable</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              <p className="text-sm text-muted-foreground">
                Make sure the backend is running: <code className="bg-secondary px-2 py-1 rounded text-xs">pnpm dev:backend</code>
              </p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold">Backend Status</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {data.status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <p className="text-sm font-medium">{data.message}</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Version</p>
                  <p className="text-sm font-medium">{data.version}</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded md:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                  <p className="text-sm font-mono">
                    {new Date(data.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-4">
                <p className="text-xs text-blue-900 dark:text-blue-200">
                  ✓ Backend and database are connected and responding normally.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
