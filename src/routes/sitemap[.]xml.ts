import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listPosts } from "@/lib/blog-store";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries = [
          { path: "/",               changefreq: "weekly",  priority: "1.0" },
          { path: "/projects",       changefreq: "monthly", priority: "0.9" },
          { path: "/skills",         changefreq: "monthly", priority: "0.7" },
          { path: "/experience",     changefreq: "monthly", priority: "0.8" },
          { path: "/certifications", changefreq: "monthly", priority: "0.6" },
          { path: "/blog",           changefreq: "weekly",  priority: "0.8" },
          { path: "/contact",        changefreq: "yearly",  priority: "0.5" },
        ];
        const postEntries = listPosts().map((p) => ({
          path: `/blog/${p.id}`,
          lastmod: p.date,
          changefreq: "yearly",
          priority: "0.6",
        }));
        const all = [...staticEntries, ...postEntries];

        const urls = all.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
