import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { EXPERIENCE } from "@/lib/site";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Ashish Kathane" },
      { name: "description", content: "AI engineering internship at Infosys Springboard and freelance AI engineering — Ashish Kathane's professional experience." },
      { property: "og:title", content: "Experience — Ashish Kathane" },
      { property: "og:description", content: "Infosys Springboard AI internship + freelance AI engineering." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <Layout>
      <section className="mx-auto w-full max-w-4xl px-4">
        <header className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Experience
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Where I&rsquo;ve been <span className="text-gradient">shipping AI.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From an AI engineering internship at Infosys Springboard to freelance AI engineering —
            building things people actually use.
          </p>
        </header>

        {/* Timeline */}
        <ol className="relative mt-14 border-l border-white/12 pl-6 md:pl-10">
          {EXPERIENCE.map((item, i) => (
            <li
              key={item.role + item.company}
              className="reveal relative pb-14 last:pb-0"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                aria-hidden
                className="absolute -left-[13px] top-2 grid h-6 w-6 place-items-center rounded-full bg-background md:-left-[21px]"
              >
                <span
                  className="h-3 w-3 rounded-full bg-gradient-accent shadow-accent-glow"
                />
              </span>

              <div className="glass-card p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">{item.role}</h2>
                    <div className="mt-1 text-sm text-gradient font-medium">{item.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.period}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.location}</div>
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/85">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Education */}
        <div className="reveal glass-card mt-4 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--gradient-accent)" }}
            />
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Education
            </h3>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-lg font-semibold tracking-tight">
                B.Tech, Artificial Intelligence
              </div>
              <div className="mt-1 text-sm text-gradient font-medium">
                J D College of Engineering &amp; Management, Nagpur
              </div>
            </div>
            <div className="text-right text-xs uppercase tracking-[0.2em] text-muted-foreground">
              2022 – 2026 · CGPA 8.5/10
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "DSA", "Probability & Statistics", "SQL"].map((c) => (
              <span key={c} className="glass-pill px-3 py-1 text-xs text-foreground/80">{c}</span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
