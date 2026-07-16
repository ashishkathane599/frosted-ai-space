import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listPosts } from "@/lib/blog-store";

export const Route = createFileRoute("/api/blog/")({
  server: {
    handlers: {
      GET: async () => {
        // Send list view (omit heavy `content` field)
        const posts = listPosts().map(({ content: _c, ...rest }) => rest);
        return new Response(JSON.stringify(posts), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=30",
          },
        });
      },
    },
  },
});
