import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Ashish Kathane" },
      { name: "description", content: "Notes on RAG, agentic AI, fine-tuning and LLM systems — Ashish Kathane's writing." },
      { property: "og:title", content: "Blog — Ashish Kathane" },
      { property: "og:description", content: "Writing on AI/ML systems, RAG, and LLM engineering." },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog")
      .then((r) => { if (!r.ok) throw new Error("Failed to load posts"); return r.json(); })
      .then((data: Post[]) => { if (!cancelled) setPosts(data); })
      .catch((e) => { if (!cancelled) setError((e as Error).message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <Layout>
      <section className="mx-auto w-full max-w-5xl px-4">
        <header className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Notes
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Writing on <span className="text-gradient">AI systems.</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Working notes on RAG, agents, fine-tuning, and the messy real-world lessons in
              between.
            </p>
          </div>
          <Link
            to="/admin"
            className="glass-pill px-4 py-2 text-xs text-foreground/70 hover:text-white transition-colors"
            title="Admin"
          >
            + New post
          </Link>
        </header>

        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card h-52 animate-pulse" />
            ))}
          </div>
        )}

        {error && <div className="glass-card mt-12 p-6 text-sm">Could not load posts: {error}</div>}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((p, i) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.id }}
                className="glass-card reveal group block p-6 transition-transform hover:glass-card-hover"
                style={{ transitionDelay: `${Math.min(i * 60, 240)}ms` }}
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <time>{formatDate(p.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{p.readTime}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-foreground/80">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="glass-pill px-2.5 py-1 text-[11px] text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-xs text-gradient font-medium">Read more →</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch { return iso; }
}
