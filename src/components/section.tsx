import type { ReactNode } from "react";

export function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-14 ${className}`}>
      <h2 className="mono mb-6 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{"//"}</span> {title}
      </h2>
      {children}
    </section>
  );
}
