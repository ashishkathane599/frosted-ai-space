import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";
import { upsertPost } from "@/lib/blog-store";

const postSchema = z.object({
  id: z.string().trim().min(3).max(80).regex(/^[a-z0-9-]+$/, "slug must be kebab-case a-z 0-9"),
  title: z.string().trim().min(3).max(140),
  excerpt: z.string().trim().max(240).default(""),
  date: z.string().trim().min(4).max(30),
  readTime: z.string().trim().max(20).default("5 min"),
  tags: z.array(z.string().trim().max(40)).max(8).default([]),
  content: z.string().trim().min(20).max(20000),
});

export const Route = createFileRoute("/api/admin/blog")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Simple bearer-token auth. Set ADMIN_TOKEN in env to enable.
        const expected = process.env.ADMIN_TOKEN;
        if (!expected) {
          return json({ error: "Admin endpoint disabled — ADMIN_TOKEN not set on server." }, 503);
        }
        const auth = request.headers.get("authorization") ?? "";
        const provided = auth.replace(/^Bearer\s+/i, "");
        if (!provided || provided !== expected) {
          return json({ error: "Unauthorized" }, 401);
        }

        let body: unknown;
        try { body = await request.json(); } catch { return json({ error: "Invalid JSON body" }, 400); }

        const parsed = postSchema.safeParse(body);
        if (!parsed.success) {
          return json({ error: "Validation failed", details: parsed.error.flatten() }, 400);
        }

        const saved = upsertPost(parsed.data);
        return json({ ok: true, post: saved });
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
