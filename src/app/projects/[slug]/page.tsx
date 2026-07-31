import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "@/lib/reader";
import { renderMarkdocNode } from "@/lib/markdoc";
import { PixelIcon } from "@/components/pixel-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug, {
    resolveLinkedFiles: true,
  });

  if (!project) return {};

  return {
    title: project.title,
    description: project.description || undefined,
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await reader.collections.projects.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug, {
    resolveLinkedFiles: true,
  });

  if (!project) {
    notFound();
  }

  const content = renderMarkdocNode(project.content.node);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        render={<Link href="/projects" />}
        className="mb-8"
      >
        <PixelIcon name="arrow-left" />
        Back to projects
      </Button>

      {project.coverImage && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight">
        {project.title}
      </h1>

      {project.description && (
        <p className="mb-6 text-lg text-muted-foreground">
          {project.description}
        </p>
      )}

      <div className="mb-8 flex flex-wrap items-center gap-3">
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          {project.link && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <PixelIcon name="external-link" />
              Live
            </Button>
          )}
          {project.github && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <PixelIcon name="github" />
              Code
            </Button>
          )}
        </div>
      </div>

      <div className="prose prose-neutral max-w-none">{content}</div>
    </div>
  );
}
