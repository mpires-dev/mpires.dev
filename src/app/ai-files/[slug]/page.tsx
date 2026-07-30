import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { reader } from "@/lib/reader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InstallCommandCopy } from "@/components/install-command-copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const aiFile = await reader.collections.aiFiles.read(slug, {
    resolveLinkedFiles: true,
  });

  if (!aiFile) return {};

  return {
    title: aiFile.name,
    description: aiFile.description || undefined,
    openGraph: {
      title: aiFile.name,
      description: aiFile.description || undefined,
      images: aiFile.coverImage ? [{ url: aiFile.coverImage }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await reader.collections.aiFiles.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function AiFileDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aiFile = await reader.collections.aiFiles.read(slug, {
    resolveLinkedFiles: true,
  });

  if (!aiFile) {
    notFound();
  }

  const { node } = await aiFile.content.render();

  return (
    <ScrollArea scrollFade className="h-svh">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/ai-files" />}
          className="mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to AI Files
        </Button>

        {aiFile.coverImage && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src={aiFile.coverImage}
              alt={aiFile.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight">
          {aiFile.name}
        </h1>

        {aiFile.description && (
          <p className="mb-6 text-lg text-muted-foreground">
            {aiFile.description}
          </p>
        )}

        <div className="mb-8 flex flex-wrap gap-3">
          {aiFile.installCommand && (
            <InstallCommandCopy command={aiFile.installCommand} />
          )}
          {aiFile.repoLink && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link
                  href={aiFile.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <ExternalLink className="size-4" />
              Repository
            </Button>
          )}
        </div>

        <div className="prose prose-neutral max-w-none">{node}</div>
      </div>
    </ScrollArea>
  );
}
