import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { reader } from "@/lib/reader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) return {};

  return {
    title: post.entry.title,
    description: post.entry.description || undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    notFound();
  }

  const { node } = await post.entry.content.render();

  return (
    <ScrollArea scrollFade className="h-svh">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/posts" />}
          className="mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Button>

        <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight">
          {post.entry.title}
        </h1>

        {post.entry.publishDate && (
          <time className="mb-8 block font-mono text-sm text-muted-foreground">
            {new Date(post.entry.publishDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        <div className="prose prose-neutral max-w-none">{node}</div>
      </div>
    </ScrollArea>
  );
}
