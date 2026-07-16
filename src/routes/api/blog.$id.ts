import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getPost } from "@/lib/blog-store";

export const Route = createFileRoute("/api/blog/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const post = getPost(params.id);
        if (!post) {
          return new Response(JSON.stringify({ error: "Post not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(post), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=30",
          },
        });
      },
    },
  },
});
