import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Alex Mercer" },
      { name: "description", content: "Side projects, experiments, and open-source work." },
    ],
  }),
  component: Projects,
});

const statusColor: Record<string, string> = {
  active: "text-primary",
  archived: "text-muted-foreground",
  experiment: "text-accent",
};

function Projects() {
  return (
    <div>
      <p className="mono text-sm text-primary prompt">ls ~/projects</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Things I build on weekends. Mostly backend infrastructure I wished existed.
      </p>

      <ul className="mt-10 space-y-4">
        {projects.map((p) => (
          <li
            key={p.slug}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="mono text-lg font-semibold text-foreground">{p.name}</h2>
              <span className={`mono text-xs ${statusColor[p.status]}`}>
                [{p.status}] · {p.year}
              </span>
            </div>
            <p className="mt-2 text-sm text-foreground/85">{p.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 mono text-[11px]">
              {p.stack.map((s) => (
                <span key={s} className="rounded bg-secondary px-2 py-0.5 text-muted-foreground">
                  {s}
                </span>
              ))}
              <span className="flex-1" />
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  repo →
                </a>
              )}
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  live →
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
