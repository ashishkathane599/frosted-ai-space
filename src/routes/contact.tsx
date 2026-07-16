import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SITE, SOCIALS } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ashish Kathane" },
      { name: "description", content: "Get in touch with Ashish Kathane for AI/ML engineering roles, collaborations, or project inquiries." },
      { property: "og:title", content: "Contact — Ashish Kathane" },
      { property: "og:description", content: "Reach out for AI/ML roles, collaborations, and projects." },
    ],
  }),
  component: ContactPage,
});

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

function ContactPage() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Client-side validation
    if (values.name.trim().length < 2) return setStatus({ kind: "error", message: "Please enter your name." });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) return setStatus({ kind: "error", message: "Please enter a valid email." });
    if (values.message.trim().length < 10) return setStatus({ kind: "error", message: "Please write at least 10 characters." });

    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
      setStatus({ kind: "ok", message: "Thanks — I'll get back to you soon." });
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  return (
    <Layout>
      <section className="mx-auto w-full max-w-5xl px-4">
        <header className="reveal">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Contact
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Let&rsquo;s build something <span className="text-gradient">worth shipping.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Open to AI/ML roles, collaborations, and project inquiries. Fastest reply is via email or LinkedIn.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <aside className="reveal glass-card p-6 md:p-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</div>
              <a href={`mailto:${SITE.email}`} className="mt-2 block text-base font-medium hover:text-white transition-colors">
                {SITE.email}
              </a>
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</div>
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-2 block text-base font-medium hover:text-white transition-colors">
                {SITE.phone}
              </a>
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</div>
              <div className="mt-2 text-base">{SITE.location}</div>
            </div>
            <div className="mt-8">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Elsewhere</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="glass-pill inline-flex px-3.5 py-2 text-xs text-foreground/85 hover:text-white transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <form
            onSubmit={onSubmit}
            className="reveal glass-card p-6 md:p-8"
            noValidate
          >
            <div className="grid gap-5">
              <Field label="Your name" htmlFor="c-name">
                <input
                  id="c-name"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  className="glass-pill w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  placeholder="Ada Lovelace"
                />
              </Field>
              <Field label="Email" htmlFor="c-email">
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  required
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  className="glass-pill w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Message" htmlFor="c-msg">
                <textarea
                  id="c-msg"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  required
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className="w-full resize-y rounded-3xl border border-white/14 bg-white/6 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgb(10,132,255)]/50"
                  placeholder="Tell me what you're working on…"
                />
              </Field>

              <div className="flex items-center justify-between gap-4">
                <div aria-live="polite" className="text-xs">
                  {status.kind === "ok"     && <span className="text-emerald-400">{status.message}</span>}
                  {status.kind === "error"  && <span className="text-red-400">{status.message}</span>}
                  {status.kind === "loading" && <span className="text-muted-foreground">Sending…</span>}
                </div>
                <button
                  type="submit"
                  disabled={status.kind === "loading"}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-white shadow-accent-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status.kind === "loading" ? "Sending…" : "Send message →"}
                </button>
              </div>
            </div>
          </form>
        </div>
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
