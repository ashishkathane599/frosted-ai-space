import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleCase(params.slug)} — Ashish Kathane` },
      { name: "description", content: `Blog post by Ashish Kathane: ${titleCase(params.slug)}.` },
      { property: "og:title", content: `${titleCase(params.slug)} — Ashish Kathane` },
      { property: "og:type", content: "article" },
    ],
  }),
  component: BlogPost,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="glass-strong p-10" style={{ borderRadius: "24px" }}>
          <h1 className="text-2xl font-semibold">Post not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">This post may have moved or been unpublished.</p>
          <Link to="/blog" className="mt-6 inline-flex rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-white shadow-accent-glow">
            ← Back to blog
          </Link>
        </div>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="glass-strong p-10" style={{ borderRadius: "24px" }}>
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    </Layout>
  ),
});

function titleCase(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function BlogPost() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/blog/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (r.status === 404) throw notFound();
        if (!r.ok) throw new Error("Failed to load post");
        return r.json();
      })
      .then((data: Post) => { if (!cancelled) setPost(data); })
      .catch((e) => { if (!cancelled) setError((e as Error).message ?? "Error"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4">
          <div className="glass-card h-96 animate-pulse" />
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <div className="glass-strong p-10" style={{ borderRadius: "24px" }}>
            <h1 className="text-2xl font-semibold">Post not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">{error ?? "This post could not be loaded."}</p>
            <Link to="/blog" className="mt-6 inline-flex rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-white shadow-accent-glow">
              ← Back to blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="mx-auto w-full max-w-3xl px-4">
        <Link to="/blog" className="text-xs text-muted-foreground hover:text-white transition-colors">
          ← All posts
        </Link>

        <header className="reveal mt-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <time>{new Date(post.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="glass-pill px-2.5 py-1 text-[11px] text-foreground/80">{t}</span>
            ))}
          </div>
        </header>

        <div
          className="glass-card reveal mt-10 p-8 md:p-10 leading-relaxed text-foreground/90"
          dangerouslySetInnerHTML={{ __html: mdToHtml(post.content) }}
        />

        <div className="reveal mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link to="/blog" className="glass-pill px-4 py-2 text-sm text-foreground/85 hover:text-white transition-colors">
            ← All posts
          </Link>
          <Link to="/contact" className="inline-flex rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-white shadow-accent-glow">
            Get in touch →
          </Link>
        </div>
      </article>
    </Layout>
  );
}

/**
 * Tiny, dependency-free Markdown → HTML for headings, lists, bold, code, paragraphs.
 * The content is authored by the site owner (trusted), but we still escape raw HTML.
 */
function mdToHtml(md: string): string {
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  let paragraph: string[] = [];

  const flushPara = () => {
    if (paragraph.length) {
      out.push(`<p class="my-4">${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const closeList = () => { if (inList) { out.push("</ol>"); inList = false; } };

  function inline(s: string) {
    let x = esc(s);
    x = x.replace(/`([^`]+)`/g, '<code class="rounded bg-white/10 px-1.5 py-0.5 text-[0.9em]">$1</code>');
    x = x.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    x = x.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return x;
  }

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { closeList(); flushPara(); continue; }
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    const ol = line.match(/^\d+\.\s+(.+)/);
    const ul = line.match(/^-\s+(.+)/);
    if (h2) { closeList(); flushPara(); out.push(`<h2 class="mt-8 mb-3 text-2xl font-semibold tracking-tight">${inline(h2[1])}</h2>`); continue; }
    if (h3) { closeList(); flushPara(); out.push(`<h3 class="mt-6 mb-2 text-lg font-semibold tracking-tight">${inline(h3[1])}</h3>`); continue; }
    if (ol || ul) {
      flushPara();
      if (!inList) { out.push('<ol class="my-4 list-decimal space-y-2 pl-6">'); inList = true; }
      out.push(`<li>${inline((ol ?? ul)![1])}</li>`);
      continue;
    }
    paragraph.push(line);
  }
  closeList(); flushPara();
  return out.join("\n");
}
