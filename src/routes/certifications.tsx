import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CERTIFICATIONS } from "@/lib/site";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Ashish Kathane" },
      { name: "description", content: "IBM Data Science, LangChain, Kaggle and Infosys Springboard certifications completed by Ashish Kathane." },
      { property: "og:title", content: "Certifications — Ashish Kathane" },
      { property: "og:description", content: "AI/ML certifications and programs completed." },
    ],
  }),
  component: CertsPage,
});

function CertsPage() {
  return (
    <Layout>
      <section className="mx-auto w-full max-w-6xl px-4">
        <header className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Learning trail
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Certifications &amp; <span className="text-gradient">programs.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Structured programs I&rsquo;ve completed alongside self-directed project work.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <article
              key={c.title}
              className="glass-card reveal group flex flex-col p-6"
              style={{ transitionDelay: `${Math.min(i * 50, 250)}ms` }}
            >
              <div className="flex items-start justify-between">
                <div
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-accent-glow"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="9" r="6" />
                    <path d="M8 14v7l4-2 4 2v-7" />
                  </svg>
                </div>
                <span className="glass-pill px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground/75">
                  {c.tag}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {c.issuer}{c.year ? ` · ${c.year}` : ""}
              </p>

              <div className="mt-auto pt-6 text-xs text-gradient font-medium">
                Verified completion →
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
