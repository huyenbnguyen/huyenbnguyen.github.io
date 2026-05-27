import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { Section } from "@/components/section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role}` },
      { name: "description", content: profile.tagline },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      { property: "og:description", content: profile.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = projects.slice(0, 3);
  const recent = posts.slice(0, 3);

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 -z-10 grid-bg" aria-hidden />
        <p className="mono text-sm text-primary prompt">whoami</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mono mt-2 text-sm text-muted-foreground">
          {profile.role} · {profile.location}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/90">
          {profile.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 mono text-sm">
          <Link
            to="/projects"
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            ./projects
          </Link>
          <Link
            to="/resume"
            className="rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:bg-secondary"
          >
            cat resume.md
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border px-4 py-2 text-foreground transition-colors hover:bg-secondary"
          >
            git clone github
          </a>
        </div>
      </div>

      <Section title="featured_projects">
        <ul className="space-y-4">
          {featured.map((p) => (
            <li
              key={p.slug}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="mono font-semibold text-foreground">{p.name}</h3>
                <span className="mono text-xs text-muted-foreground">{p.year}</span>
              </div>
              <p className="mt-2 text-sm text-foreground/80">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 mono text-[11px] text-muted-foreground">
                {p.stack.map((s) => (
                  <span key={s} className="rounded bg-secondary px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="latest_posts">
        <ul className="divide-y divide-border">
          {recent.map((p) => (
            <li key={p.slug} className="py-4">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium text-foreground group-hover:text-primary">
                    {p.title}
                  </h3>
                  <time className="mono shrink-0 text-xs text-muted-foreground">
                    {formatDate(p.date)}
                  </time>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
