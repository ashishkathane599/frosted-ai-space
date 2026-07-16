import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SKILL_GROUPS, TOP_PROFICIENCIES } from "@/lib/site";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Ashish Kathane" },
      { name: "description", content: "Languages, AI/ML frameworks, vector databases, backends and tooling — the full stack Ashish Kathane works with." },
      { property: "og:title", content: "Skills — Ashish Kathane" },
      { property: "og:description", content: "AI/ML stack: LangChain, PyTorch, FastAPI, ChromaDB, and more." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <Layout>
      <section className="mx-auto w-full max-w-6xl px-4">
        <header className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            The toolbox
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Skills across the <span className="text-gradient">AI/ML stack.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From language models and RAG pipelines to REST APIs and vector stores — grouped the way
            I actually reach for them.
          </p>
        </header>

        {/* Top proficiencies */}
        <div className="reveal glass-card mt-12 p-6 md:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Top proficiencies
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {TOP_PROFICIENCIES.map((p) => (
              <div key={p.name}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.level}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-accent"
                    style={{ width: `${p.level}%`, transition: "width 1.2s cubic-bezier(.2,.8,.2,1)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grouped skills */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.name}
              className="glass-card reveal p-6 md:p-7"
              style={{ transitionDelay: `${Math.min(i * 40, 240)}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--gradient-accent)" }}
                />
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {group.name}
                </h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((it) => (
                  <li key={it}>
                    <span className="glass-pill inline-flex items-center px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:text-white">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
