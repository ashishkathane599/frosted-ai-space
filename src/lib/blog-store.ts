// Shared blog data store. Reads the seed JSON at module init and keeps a
// runtime-only overlay for posts added via the /admin form. To persist a post
// permanently, copy it into src/data/blog.json and redeploy.

import seed from "../data/blog.json";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
};

// Module-level Map is per-process. On serverless / edge runtimes each request
// may hit a fresh isolate — that's fine for a demo admin form; production
// persistence should move to a database.
const runtime = new Map<string, BlogPost>();

export function listPosts(): BlogPost[] {
  const seeded = (seed as BlogPost[]).slice();
  // Runtime overrides / additions
  const byId = new Map(seeded.map((p) => [p.id, p]));
  for (const [id, p] of runtime) byId.set(id, p);
  return Array.from(byId.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPost(id: string): BlogPost | undefined {
  return runtime.get(id) ?? (seed as BlogPost[]).find((p) => p.id === id);
}

export function upsertPost(post: BlogPost): BlogPost {
  runtime.set(post.id, post);
  return post;
}
