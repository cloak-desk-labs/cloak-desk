import Link from "next/link"
import { Code, ArrowLeft, Terminal, Server, Key } from "lucide-react"

export default function APIPage() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/obfuscate/queue",
      description: "Queue a transaction for obfuscation",
    },
    {
      method: "GET",
      path: "/api/obfuscate/tasks",
      description: "Get status of obfuscation tasks",
    },
    {
      method: "POST",
      path: "/api/analysis/deep-scan",
      description: "Start a deep privacy analysis scan",
    },
    {
      method: "GET",
      path: "/api/analysis/[jobId]",
      description: "Get analysis results by job ID",
    },
    {
      method: "GET",
      path: "/api/leaderboard",
      description: "Get privacy leaderboard rankings",
    },
    {
      method: "POST",
      path: "/api/mpc/create-vault",
      description: "Create a new MPC vault",
    },
    {
      method: "POST",
      path: "/api/proof/generate",
      description: "Generate a zero-knowledge proof",
    },
    {
      method: "GET",
      path: "/api/relayers/query",
      description: "Query available relayers",
    },
    {
      method: "POST",
      path: "/api/payments/credits",
      description: "Purchase credits for premium features",
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-textPrimary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-textPrimary">
              API Reference
            </h1>
          </div>
          <p className="text-xl text-muted">
            Complete API documentation for CloakDesk endpoints
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Overview</h2>
            <p className="text-muted leading-relaxed mb-4">
              The CloakDesk API provides programmatic access to all privacy features and functionality.
              All endpoints require authentication and return JSON responses.
            </p>
            <p className="text-muted leading-relaxed">
              The API is RESTful and follows standard HTTP conventions. All requests should include
              appropriate headers and authentication tokens.
            </p>
          </section>

          {/* Authentication */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Authentication</h2>
            <p className="text-muted leading-relaxed mb-4">
              API requests require authentication using an API key or wallet signature. Include
              your authentication token in the request headers:
            </p>
            <div className="bg-bg900 rounded-lg p-4 border border-white/10">
              <code className="text-sm text-muted">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </section>

          {/* Endpoints */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-4 mb-2">
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      endpoint.method === "GET" 
                        ? "bg-success/20 text-success" 
                        : "bg-primaryStart/20 text-primaryStart"
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-textPrimary font-mono text-sm flex-1">{endpoint.path}</code>
                  </div>
                  <p className="text-muted text-sm ml-20">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Example Request */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Example Request</h2>
            <div className="bg-bg900 rounded-lg p-4 border border-white/10">
              <pre className="text-sm text-muted overflow-x-auto">
                <code>{`curl -X POST https://api.cloakdesk.app/api/obfuscate/queue \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "0x...",
    "to": "0x...",
    "amount": "1.0",
    "token": "ETH"
  }'`}</code>
              </pre>
            </div>
          </section>

          {/* Response Format */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Response Format</h2>
            <p className="text-muted leading-relaxed mb-4">
              All API responses follow a standard format:
            </p>
            <div className="bg-bg900 rounded-lg p-4 border border-white/10">
              <pre className="text-sm text-muted overflow-x-auto">
                <code>{`{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}`}</code>
              </pre>
            </div>
          </section>

          {/* Error Handling */}
          <section className="card bg-gradient-to-br from-bg800 to-bg700 border-primaryStart/20">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Error Handling</h2>
            <p className="text-muted leading-relaxed mb-4">
              Errors are returned with appropriate HTTP status codes and error messages:
            </p>
            <div className="bg-bg900/50 rounded-lg p-4 border border-white/10">
              <pre className="text-sm text-muted overflow-x-auto">
                <code>{`{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid parameters provided"
  }
}`}</code>
              </pre>
            </div>
          </section>

          {/* Getting Started */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Getting Started</h2>
            <div className="space-y-3 text-muted">
              <div className="flex items-start gap-2">
                <Key className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-textPrimary mb-1">1. Get API Key</p>
                  <p className="text-sm">Generate an API key from your account settings</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Terminal className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-textPrimary mb-1">2. Make Requests</p>
                  <p className="text-sm">Use your API key to authenticate requests</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Server className="h-5 w-5 text-primaryStart flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-textPrimary mb-1">3. Handle Responses</p>
                  <p className="text-sm">Parse JSON responses and handle errors appropriately</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

