// Add or edit side projects here.
export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  url?: string;
  repo?: string;
  year: number;
  status: "active" | "archived" | "experiment";
};

export const projects: Project[] = [
  {
    slug: "queueforge",
    name: "QueueForge",
    description:
      "Embeddable durable job queue for Postgres. SKIP LOCKED based, with retries, cron, and a tiny dashboard.",
    stack: ["Go", "PostgreSQL", "React"],
    repo: "https://github.com/yourhandle/queueforge",
    year: 2025,
    status: "active",
  },
  {
    slug: "tracelite",
    name: "TraceLite",
    description:
      "OpenTelemetry-compatible tracing collector tuned for low-memory edge deployments.",
    stack: ["Rust", "OTLP", "WASM"],
    repo: "https://github.com/yourhandle/tracelite",
    year: 2024,
    status: "active",
  },
  {
    slug: "sqlpad",
    name: "sqlpad",
    description:
      "Minimal local SQL scratchpad with query history, saved snippets, and CSV export.",
    stack: ["TypeScript", "SQLite", "Tauri"],
    year: 2023,
    status: "archived",
  },
  {
    slug: "ratelimitr",
    name: "ratelimitr",
    description:
      "Token-bucket rate limiter library with Redis and in-memory backends. Drop-in middleware.",
    stack: ["Go", "Redis"],
    repo: "https://github.com/yourhandle/ratelimitr",
    year: 2022,
    status: "active",
  },
];
