import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Alex Mercer" },
      { name: "description", content: "Notes on backend engineering, distributed systems, and tools." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div>
      <p className="mono text-sm text-primary prompt">ls ~/blog</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Writing</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Field notes from building backend systems.
      </p>

      <ul className="mt-10 divide-y divide-border">
        {sorted.map((p) => (
          <li key={p.slug} className="py-6">
            <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {p.title}
                </h2>
                <time className="mono shrink-0 text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  {" · "}
                  {p.readingMinutes} min
                </time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 mono text-[11px] text-muted-foreground">
                {p.tags.map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
