// Edit this file to update your personal info across the site.
export const profile = {
  name: "Alex Mercer",
  role: "Backend Engineer",
  tagline: "I build reliable distributed systems and developer-friendly APIs.",
  location: "Berlin, Germany",
  email: "hello@example.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  // resumeUrl: "/resume.pdf",
  bio: [
    "Backend engineer with 7+ years of experience designing high-throughput services, event-driven architectures, and data pipelines.",
    "I care about correctness, observability, and code that the next engineer can reason about. Most of my work lives behind the curtain — quietly handling millions of requests.",
  ],
  skills: {
    Languages: ["Go", "Rust", "Python", "TypeScript", "SQL"],
    "Infra & Data": ["Kubernetes", "Kafka", "PostgreSQL", "Redis", "ClickHouse", "Terraform"],
    Cloud: ["AWS", "GCP", "Cloudflare Workers"],
    Practices: ["Distributed systems", "Observability", "API design", "Performance tuning"],
  },
  experience: [
    {
      company: "Helix Systems",
      role: "Senior Backend Engineer",
      period: "2022 — Present",
      points: [
        "Led migration from monolith to event-driven services on Kafka, cutting tail latency 4x.",
        "Designed multi-tenant billing service handling 30M events/day with exactly-once semantics.",
        "Mentored 4 engineers; introduced RFC process for cross-team design reviews.",
      ],
    },
    {
      company: "Nimbus Cloud",
      role: "Backend Engineer",
      period: "2019 — 2022",
      points: [
        "Built ingestion pipeline (Go + ClickHouse) handling 500k events/sec with sub-second queries.",
        "Owned the public REST and gRPC APIs used by 12k+ developers.",
      ],
    },
    {
      company: "Forge Labs",
      role: "Software Engineer",
      period: "2017 — 2019",
      points: [
        "Shipped Python microservices and a Postgres-backed job queue used in production.",
      ],
    },
  ],
  education: [
    {
      school: "TU Munich",
      degree: "B.Sc. Computer Science",
      period: "2013 — 2017",
    },
  ],
};
