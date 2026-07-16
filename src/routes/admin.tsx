import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — New Blog Post" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

function AdminPage() {
  const [token, setToken] = useState("");
  const [form, setForm] = useState({
    id: "",
    title: "",
    excerpt: "",
    tags: "",
    readTime: "5 min",
    content: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return setStatus({ kind: "error", message: "Admin token required." });
    if (form.title.trim().length < 3) return setStatus({ kind: "error", message: "Title too short." });
    if (form.content.trim().length < 20) return setStatus({ kind: "error", message: "Content too short." });

    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
          date: new Date().toISOString().slice(0, 10),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
      setStatus({ kind: "ok", message: "Post saved for this session." });
      setForm({ id: "", title: "", excerpt: "", tags: "", readTime: "5 min", content: "" });
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <Layout>
      <section className="mx-auto w-full max-w-3xl px-4">
        <header className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Admin
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            New <span className="text-gradient">blog post.</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Protected by <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">ADMIN_TOKEN</code>.
            Posts written here persist for the running server session; commit to <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/data/blog.json</code> to keep them permanently.
          </p>
        </header>

        <form onSubmit={onSubmit} className="reveal glass-card mt-10 p-6 md:p-8">
          <div className="grid gap-5">
            <Field label="Admin token" htmlFor="a-token">
              <input
                id="a-token"
                type="password"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="glass-pill w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                placeholder="ADMIN_TOKEN"
                autoComplete="off"
              />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Slug (URL)" htmlFor="a-slug">
                <input
                  id="a-slug"
                  required
                  value={form.id}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") }))}
                  className="glass-pill w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                  placeholder="my-first-post"
                />
              </Field>
              <Field label="Read time" htmlFor="a-read">
                <input
                  id="a-read"
                  value={form.readTime}
                  onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                  className="glass-pill w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                  placeholder="5 min"
                />
              </Field>
            </div>
            <Field label="Title" htmlFor="a-title">
              <input
                id="a-title" required maxLength={140}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="glass-pill w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                placeholder="What I learned building X"
              />
            </Field>
            <Field label="Excerpt" htmlFor="a-excerpt">
              <input
                id="a-excerpt" maxLength={220}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="glass-pill w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                placeholder="One-sentence summary"
              />
            </Field>
            <Field label="Tags (comma-separated)" htmlFor="a-tags">
              <input
                id="a-tags"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="glass-pill w-full bg-transparent px-4 py-3 text-sm focus:outline-none"
                placeholder="RAG, LangChain, Notes"
              />
            </Field>
            <Field label="Content (Markdown)" htmlFor="a-content">
              <textarea
                id="a-content" required rows={12} maxLength={20000}
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                className="w-full resize-y rounded-3xl border border-white/14 bg-white/6 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(10,132,255)]/50"
                placeholder={"## Section\n\nBody text with **bold** and `code`."}
              />
            </Field>

            <div className="flex items-center justify-between gap-4">
              <div aria-live="polite" className="text-xs">
                {status.kind === "ok"      && <span className="text-emerald-400">{status.message}</span>}
                {status.kind === "error"   && <span className="text-red-400">{status.message}</span>}
                {status.kind === "loading" && <span className="text-muted-foreground">Saving…</span>}
              </div>
              <div className="flex gap-2">
                <Link to="/blog" className="glass-pill px-4 py-2 text-sm text-foreground/85 hover:text-white transition-colors">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={status.kind === "loading"}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-white shadow-accent-glow disabled:opacity-60"
                >
                  {status.kind === "loading" ? "Saving…" : "Publish →"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
