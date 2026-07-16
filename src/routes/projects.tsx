import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  tech: string[];
  gradient: string;
  icon: string;
  github: string | null;
  demo: string | null;
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Ashish Kathane" },
      { name: "description", content: "Selected AI/ML projects: RAG chatbots, agentic systems, ML pipelines, and computer vision by Ashish Kathane." },
      { property: "og:title", content: "Projects — Ashish Kathane" },
      { property: "og:description", content: "Selected AI/ML projects by Ashish Kathane." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((r) => { if (!r.ok) throw new Error("Failed to load projects"); return r.json(); })
      .then((data: Project[]) => { if (!cancelled) setProjects(data); })
      .catch((e) => { if (!cancelled) setError((e as Error).message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Layout>
      <section className="mx-auto w-full max-w-6xl px-4">
        <header className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Selected work
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Projects that <span className="text-gradient">ship, not just demo.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            End-to-end AI/ML systems — from ingestion to inference to interface. Click any card for
            the full write-up.
          </p>
        </header>

        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card h-72 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="glass-card mt-12 p-6 text-sm text-destructive-foreground">
            Could not load projects: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpen(p)}
                className="glass-card reveal group text-left transition-transform hover:glass-card-hover focus-visible:glass-card-hover"
                style={{ transitionDelay: `${Math.min(i * 40, 240)}ms` }}
              >
                <div
                  className="relative h-40 w-full overflow-hidden"
                  style={{
                    borderTopLeftRadius: "calc(var(--radius) + 0.25rem)",
                    borderTopRightRadius: "calc(var(--radius) + 0.25rem)",
                    background: p.gradient,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.35), transparent 55%)",
                    }}
                  />
                  <ProjectMark icon={p.icon} />
                  <div className="absolute left-4 top-4 glass-pill px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/95">
                    {p.tech[0]}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="glass-pill px-2.5 py-1 text-[11px] text-foreground/80">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="glass-pill px-2.5 py-1 text-[11px] text-foreground/70">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Read details</span>
                    <span className="text-gradient font-medium">Open →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto p-3 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="proj-title"
          onClick={() => setOpen(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div
            className="glass-strong relative z-10 w-full max-w-2xl p-6 sm:p-8"
            style={{ borderRadius: "24px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {open.tech.slice(0, 3).join(" · ")}
                </div>
                <h2 id="proj-title" className="mt-2 text-2xl font-semibold tracking-tight">
                  {open.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{open.tagline}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="glass-pill grid h-9 w-9 place-items-center text-lg hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-foreground/85">{open.description}</p>

            <ul className="mt-5 space-y-2 text-sm text-foreground/85">
              {open.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {open.tech.map((t) => (
                <span key={t} className="glass-pill px-2.5 py-1 text-[11px] text-foreground/80">{t}</span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {open.github && (
                <a
                  href={open.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass-pill px-4 py-2 text-sm text-foreground/90 hover:text-white transition-colors"
                >
                  GitHub →
                </a>
              )}
              {open.demo && (
                <a
                  href={open.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center rounded-full bg-gradient-accent px-4 py-2 text-sm font-medium text-white shadow-accent-glow"
                >
                  Live demo →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

function ProjectMark({ icon }: { icon: string }) {
  // Simple inline SVG mark keyed to the project's theme
  const common = "absolute right-4 bottom-4 text-white/90";
  const svg = { width: 44, height: 44, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "waveform":
      return <svg {...svg} className={common}><path d="M3 12h2M7 8v8M11 4v16M15 8v8M19 12h2"/></svg>;
    case "shield":
      return <svg {...svg} className={common}><path d="M12 3l8 4v6c0 5-4 8-8 8s-8-3-8-8V7l8-4z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "chat":
      return <svg {...svg} className={common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>;
    case "hand":
      return <svg {...svg} className={common}><path d="M7 11V6a2 2 0 1 1 4 0v5"/><path d="M11 11V4a2 2 0 1 1 4 0v7"/><path d="M15 11V6a2 2 0 1 1 4 0v9a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3"/></svg>;
    case "document":
      return <svg {...svg} className={common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>;
    case "sentiment":
      return <svg {...svg} className={common}><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>;
    case "chart":
      return <svg {...svg} className={common}><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/></svg>;
    default:
      return null;
  }
}
