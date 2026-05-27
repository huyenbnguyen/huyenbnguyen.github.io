// Add blog posts here. Body supports simple paragraphs and ```code blocks (rendered as <pre>).
export type Post = {
  slug: string;
  title: string;
  date: string; // ISO date
  readingMinutes: number;
  excerpt: string;
  tags: string[];
  body: string;
};

export const posts: Post[] = [
  {
    slug: "postgres-skip-locked-queues",
    title: "Building a job queue on Postgres SKIP LOCKED",
    date: "2025-03-12",
    readingMinutes: 8,
    tags: ["postgres", "queues", "go"],
    excerpt:
      "You probably don't need Kafka. Here's how SKIP LOCKED lets you ship a durable, fair, multi-worker queue in a few hundred lines.",
    body: `Most teams reach for Kafka or SQS the moment they hear the word "queue". But if you already run Postgres, you have most of what you need.

The trick is FOR UPDATE SKIP LOCKED. It lets multiple workers pull rows concurrently without blocking each other — the database hands each worker a different row.

\`\`\`
SELECT id, payload FROM jobs
WHERE run_at <= now() AND state = 'ready'
ORDER BY run_at
FOR UPDATE SKIP LOCKED
LIMIT 10;
\`\`\`

Combine that with a small state machine (ready / running / done / failed) and a retry column, and you have a queue that survives crashes, supports priorities, and is trivial to inspect with plain SQL.

In production this happily pushes 5–10k jobs/sec on a modest instance. Beyond that, partition by tenant or shard.`,
  },
  {
    slug: "observability-budget",
    title: "Your observability budget is not your log volume",
    date: "2025-01-22",
    readingMinutes: 6,
    tags: ["observability", "ops"],
    excerpt:
      "Cardinality, not volume, is what kills your metrics bill. A short field guide to spending wisely.",
    body: `Every team I've worked with eventually has the same conversation: "why is our observability bill bigger than our compute?"

The answer is almost never log volume. It's cardinality — the number of unique label combinations on your metrics. A single \`user_id\` label on a counter can balloon a time series into millions of streams.

Three rules I follow:

1. Never put unbounded IDs in metric labels. Put them in traces and logs instead.
2. Sample traces aggressively at the edge — 1–5% is usually fine for healthy traffic.
3. Treat dashboards as code. Delete the ones nobody looks at.`,
  },
  {
    slug: "rust-for-go-engineers",
    title: "What Rust taught me about Go",
    date: "2024-10-04",
    readingMinutes: 5,
    tags: ["rust", "go"],
    excerpt:
      "A year of writing Rust at work changed how I write Go — mostly for the better.",
    body: `I spent a year on a Rust team after years of Go. I expected to come back with strong opinions about borrow checkers. Instead, the lasting habits were smaller:

- Make illegal states unrepresentable. In Go this means tighter types and fewer "is this nil?" branches.
- Errors are values. Wrap them with context, don't just bubble them up.
- Concurrency is a design decision, not a sprinkle of goroutines.

The languages stayed different. The way I think about correctness didn't.`,
  },
];
