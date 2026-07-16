import { Link } from "@tanstack/react-router";
import { SOCIALS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="glass-strong px-6 py-10 md:px-10 md:py-12" style={{ borderRadius: "28px" }}>
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-accent text-white font-bold shadow-accent-glow">
                  AK
                </span>
                <div>
                  <div className="text-base font-semibold tracking-tight">Ashish Kathane</div>
                  <div className="text-xs text-muted-foreground">
                    AI/ML Engineer · Agentic AI &amp; LLM Systems
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm text-muted-foreground">
                Building retrieval-augmented, tool-using AI systems. Currently open to full-time and
                internship roles from mid-2026.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Explore
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/projects" className="text-foreground/80 hover:text-white transition-colors">Projects</Link></li>
                <li><Link to="/skills" className="text-foreground/80 hover:text-white transition-colors">Skills</Link></li>
                <li><Link to="/experience" className="text-foreground/80 hover:text-white transition-colors">Experience</Link></li>
                <li><Link to="/blog" className="text-foreground/80 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-foreground/80 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Elsewhere
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="glass-pill inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-foreground/85 hover:text-white transition-colors"
                    >
                      <SocialIcon name={s.icon} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-xs text-muted-foreground">
                <a href="mailto:kathaneashish599@gmail.com" className="hover:text-white transition-colors">
                  kathaneashish599@gmail.com
                </a>
                <br />
                Nagpur, Maharashtra · India
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
            <div>© {new Date().getFullYear()} Ashish Kathane. Crafted with care.</div>
            <div>Liquid Glass · Hand-written HTML, CSS &amp; JS</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: "github" | "linkedin" | "instagram" | "leetcode" | "mail" }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "github":
      return (
        <svg {...common}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
      );
    case "linkedin":
      return (
        <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      );
    case "instagram":
      return (
        <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
      );
    case "leetcode":
      return (
        <svg {...common}><path d="M13.5 3 5 12l8.5 9 3-3-5.5-6 5.5-6z"/><path d="M8 12h13"/></svg>
      );
    case "mail":
      return (
        <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>
      );
  }
}
