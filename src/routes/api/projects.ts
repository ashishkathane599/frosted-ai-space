import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import projects from "@/data/projects.json";

export const Route = createFileRoute("/api/projects")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify(projects), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60",
          },
        }),
    },
  },
});
