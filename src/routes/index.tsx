import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SITE, SOCIALS, STATS } from "@/lib/site";
import profileAsset from "@/assets/profile.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashish Kathane — AI/ML Engineer · Agentic AI & LLM Systems" },
      {
        name: "description",
        content:
          "Portfolio of Ashish Kathane. AI/ML engineer building agentic AI, RAG pipelines and LLM-powered APIs.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-4 md:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal">
            <div className="glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 text-xs text-foreground/85">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[rgb(10,132,255)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(10,132,255)]" />
              </span>
              Available for full-time from mid-2026
            </div>

            <h1 className="mt-5 text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Hi, I&rsquo;m{" "}
              <span className="text-gradient">Ashish Kathane</span>
              <br />
              <span className="text-foreground/85">
                I build agentic AI &amp; LLM systems.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              {SITE.pitch} Currently a final-year B.Tech AI student at JD College of Engineering,
              Nagpur, and a former AI engineering intern at Infosys Springboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-white shadow-accent-glow transition-transform hover:-translate-y-0.5"
              >
                View Projects <span aria-hidden>→</span>
              </Link>
              <a
                href="/resume.pdf"
                download
                className="glass-pill inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground/90 hover:text-white transition-colors"
              >
                Download Résumé
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-xs text-foreground/85 hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait / placeholder */}
          <div className="reveal">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full opacity-70 blur-3xl"
                style={{ background: "var(--gradient-accent)" }}
              />
              <div
                className="glass-strong relative h-full w-full overflow-hidden"
                style={{ borderRadius: "50%" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%), linear-gradient(135deg, rgba(10,132,255,0.55), rgba(94,92,230,0.55))",
                  }}
                />
                <img
                  src={profileAsset.url}
                  alt="Portrait of Ashish Kathane"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Floating stat chips */}
              <div className="glass-strong absolute -left-4 top-8 hidden animate-[float_6s_ease-in-out_infinite] px-3 py-2 text-xs md:block" style={{ borderRadius: "16px" }}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">CGPA</div>
                <div className="text-base font-semibold text-gradient">8.5 / 10</div>
              </div>
              <div className="glass-strong absolute -right-2 bottom-10 hidden animate-[float_7s_ease-in-out_infinite_reverse] px-3 py-2 text-xs md:block" style={{ borderRadius: "16px" }}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Focus</div>
                <div className="text-sm font-semibold">Agentic AI · RAG</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="reveal mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass-card p-6 hover:glass-card-hover">
              <div className="text-3xl font-semibold tracking-tight text-gradient">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <section className="reveal mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                About
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Curious about the <span className="text-gradient">systems around the model.</span>
              </h2>
            </div>
            <div className="glass-card p-8 text-base leading-relaxed text-foreground/85">
              <p>
                Aspiring AI/ML Engineer with hands-on experience building Agentic AI and LLM-powered
                applications — retrieval-augmented generation (RAG) pipelines, LangChain workflows,
                and REST APIs on Django, Flask and FastAPI.
              </p>
              <p className="mt-4">
                Completed an AI engineering internship at Infosys Springboard, delivering a
                fraud-detection system end-to-end. Skilled in Python, machine learning, vector
                databases, and speech-to-text (ASR) systems, with a growing foundation across the
                full SDLC. Passionate about autonomous, tool-using AI systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {["Python", "LangChain", "RAG", "FastAPI", "PyTorch", "ChromaDB", "Whisper", "Docker"].map((t) => (
                  <span key={t} className="glass-pill px-3 py-1 text-foreground/80">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-10px); }
        }
      `}</style>
    </Layout>
  );
}
