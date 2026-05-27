import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";

const nav = [
  { to: "/", label: "~" },
  { to: "/resume", label: "resume" },
  { to: "/projects", label: "projects" },
  { to: "/blog", label: "blog" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link to="/" className="mono text-sm font-semibold text-foreground hover:text-primary">
          <span className="text-primary">{">"}</span> {profile.name.toLowerCase().replace(/\s+/g, "_")}
        </Link>
        <nav className="flex items-center gap-1 mono text-sm">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded px-2 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded px-2 py-1 text-primary bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
