import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md p-10 text-center" style={{ borderRadius: "28px" }}>
        <div className="text-[64px] font-semibold leading-none text-gradient">404</div>
        <h2 className="mt-3 text-lg font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-white shadow-accent-glow"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md p-10 text-center" style={{ borderRadius: "28px" }}>
        <h1 className="text-lg font-semibold">This page didn&rsquo;t load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-white shadow-accent-glow"
          >
            Try again
          </button>
          <a
            href="/"
            className="glass-pill inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-foreground/85 hover:text-white transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ashish Kathane — AI/ML Engineer · Agentic AI & LLM Systems" },
      {
        name: "description",
        content:
          "Portfolio of Ashish Kathane — AI/ML engineer building agentic AI, RAG pipelines, and LLM-powered systems with LangChain, FastAPI and vector databases.",
      },
      { name: "author", content: "Ashish Kathane" },
      { name: "theme-color", content: "#0A84FF" },
      { property: "og:title", content: "Ashish Kathane — AI/ML Engineer" },
      { property: "og:description", content: "Agentic AI, RAG systems, and production ML APIs. See projects, experience, and writing." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ashish Kathane" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ashish Kathane — AI/ML Engineer" },
      { name: "twitter:description", content: "Agentic AI, RAG systems, and production ML APIs." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
