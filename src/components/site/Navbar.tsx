import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/certifications", label: "Certifications" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2">
      <nav
        aria-label="Primary"
        className="glass-strong flex items-center justify-between px-5 py-3 md:px-6"
        style={{ borderRadius: "999px" }}
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-gradient-accent text-white shadow-accent-glow"
          >
            <span className="text-[13px] font-bold">AK</span>
          </span>
          <span className="hidden sm:inline text-foreground/95">Ashish Kathane</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={
                    "relative rounded-full px-4 py-2 text-sm transition-colors " +
                    (active
                      ? "text-white"
                      : "text-foreground/70 hover:text-foreground")
                  }
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-accent shadow-accent-glow"
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="glass-pill px-4 py-2 text-sm font-medium text-foreground/90 hover:text-white transition-colors"
          >
            Let&rsquo;s talk →
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass-pill"
        >
          <span className="relative block h-3 w-4">
            <span
              className={
                "absolute left-0 right-0 top-0 h-[2px] rounded bg-foreground transition-transform " +
                (open ? "translate-y-[6px] rotate-45" : "")
              }
            />
            <span
              className={
                "absolute left-0 right-0 top-[6px] h-[2px] rounded bg-foreground transition-opacity " +
                (open ? "opacity-0" : "")
              }
            />
            <span
              className={
                "absolute left-0 right-0 top-[12px] h-[2px] rounded bg-foreground transition-transform " +
                (open ? "-translate-y-[6px] -rotate-45" : "")
              }
            />
          </span>
        </button>
      </nav>

      {/* Mobile slide-down glass menu */}
      <div
        className={
          "lg:hidden overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out " +
          (open ? "mt-3 max-h-[560px] opacity-100" : "mt-0 max-h-0 opacity-0")
        }
      >
        <ul className="glass-strong flex flex-col p-2" style={{ borderRadius: "24px" }}>
          {NAV.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={
                    "block rounded-2xl px-4 py-3 text-sm transition-colors " +
                    (active
                      ? "bg-gradient-accent text-white shadow-accent-glow"
                      : "text-foreground/80 hover:bg-white/5 hover:text-foreground")
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
