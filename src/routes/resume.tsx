import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { Section } from "@/components/section";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `Resume — ${profile.name}` },
      { name: "description", content: `Experience, skills, and education for ${profile.name}, ${profile.role}.` },
    ],
  }),
  component: Resume,
});

function Resume() {
  return (
    <div>
      <p className="mono text-sm text-primary prompt">cat resume.md</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Resume</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {profile.email} · {profile.location} ·{" "}
        <a href={profile.resumeUrl} className="text-primary hover:underline">
          download PDF
        </a>
      </p>

      <Section title="about">
        <div className="space-y-3 text-foreground/90">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title="experience">
        <ol className="space-y-6">
          {profile.experience.map((job) => (
            <li
              key={job.company + job.period}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="mono font-semibold text-foreground">
                  {job.role} <span className="text-primary">@</span> {job.company}
                </h3>
                <span className="mono text-xs text-muted-foreground">{job.period}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-foreground/85 marker:text-primary">
                {job.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="skills">
        <dl className="grid gap-4 sm:grid-cols-2">
          {Object.entries(profile.skills).map(([group, items]) => (
            <div key={group} className="rounded-lg border border-border bg-card p-4">
              <dt className="mono text-xs uppercase tracking-wider text-muted-foreground">
                {group}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5 mono text-xs">
                {items.map((s) => (
                  <span key={s} className="rounded bg-secondary px-2 py-1 text-foreground">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="education">
        <ul className="space-y-3">
          {profile.education.map((e) => (
            <li key={e.school} className="flex items-baseline justify-between gap-3">
              <span>
                <span className="font-medium text-foreground">{e.degree}</span>
                <span className="text-muted-foreground"> — {e.school}</span>
              </span>
              <span className="mono text-xs text-muted-foreground">{e.period}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
