import type { Metadata } from "next";
import Link from "next/link";
import { reader } from "@/lib/reader";
import { PixelIcon } from "@/components/pixel-icon";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and thoughts by Matheus Pires.",
};

export default async function PostsPage() {
  const posts = await reader.collections.posts.all();

  const sorted = posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishDate || 0).getTime();
    const dateB = new Date(b.entry.publishDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">
          Blog
        </h1>
        <p className="mb-12 text-muted-foreground">
          Articles and thoughts on software engineering and product building.
        </p>

        {sorted.length > 0 ? (
          <div className="space-y-2">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border p-5 transition-colors hover:border-border/80 hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
                    {post.entry.title}
                  </h2>
                  {post.entry.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {post.entry.description}
                    </p>
                  )}
                  {post.entry.publishDate && (
                    <time className="mt-2 block font-mono text-xs text-muted-foreground">
                      {new Date(post.entry.publishDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </time>
                  )}
                </div>
                <PixelIcon name="arrow-right" className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">No posts published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
