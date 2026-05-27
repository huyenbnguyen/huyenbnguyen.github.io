import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    return {
      meta: post
        ? [
            { title: `${post.title} — Alex Mercer` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt },
            { property: "og:type", content: "article" },
          ]
        : [{ title: "Post not found" }],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div>
      <h1 className="text-2xl font-semibold">Post not found</h1>
      <Link to="/blog" className="mono mt-4 inline-block text-primary hover:underline">
        ← back to blog
      </Link>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <article>
      <Link to="/blog" className="mono text-xs text-muted-foreground hover:text-primary">
        ← cd ..
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
      <p className="mono mt-2 text-xs text-muted-foreground">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" · "}
        {post.readingMinutes} min read
        {" · "}
        {post.tags.map((t: string) => `#${t}`).join(" ")}
      </p>

      <div className="mt-8 space-y-4 leading-relaxed text-foreground/90">
        {renderBody(post.body)}
      </div>
    </article>
  );
}

function renderBody(body: string) {
  const blocks = body.split(/\n\n+/);
  return blocks.map((block, i) => {
    const code = block.match(/^```([\s\S]*?)```$/);
    if (code) {
      return (
        <pre
          key={i}
          className="overflow-x-auto rounded-lg border border-border bg-terminal p-4 mono text-sm text-terminal-foreground"
        >
          <code>{code[1].trim()}</code>
        </pre>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((l) => l.replace(/^- /, ""));
      return (
        <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-primary">
          {items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{block}</p>;
  });
}
