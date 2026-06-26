import { profile } from "@/data/profile";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "react/jsx-runtime" {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any): any;
  export const Fragment: any;
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="text-primary">$</span> echo "© {new Date().getFullYear()} {profile.name}"
        </span>
        <div className="flex gap-4">
          <a href={profile.github} className="hover:text-primary" target="_blank" rel="noreferrer">
            github
          </a>
          <a href={profile.linkedin} className="hover:text-primary" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-primary">
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
