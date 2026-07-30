import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { reader } from "@/lib/reader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);

  if (!project) return {};

  return {
    title: project.entry.title,
    description: project.entry.description || undefined,
    openGraph: {
      title: project.entry.title,
      description: project.entry.description || undefined,
      images: project.entry.coverImage
        ? [{ url: project.entry.coverImage }]
        : undefined,
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
  const project = await reader.collections.projects.read(slug);

  if (!project) {
    notFound();
  }

  const { node } = await project.entry.content.render();

  return (
    <ScrollArea scrollFade className="h-svh">
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/projects" />}
          className="mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </Button>

        {project.entry.coverImage && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.entry.coverImage}
              alt={project.entry.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight">
          {project.entry.title}
        </h1>

        {project.entry.description && (
          <p className="mb-6 text-lg text-muted-foreground">
            {project.entry.description}
          </p>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {project.entry.techStack && project.entry.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.entry.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            {project.entry.link && (
              <Button
                variant="outline"
                size="sm"
                render={
                  <Link
                    href={project.entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ExternalLink className="size-4" />
                Live
              </Button>
            )}
            {project.entry.github && (
              <Button
                variant="outline"
                size="sm"
                render={
                  <Link
                    href={project.entry.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <GithubIcon className="size-4" />
                Code
              </Button>
            )}
          </div>
        </div>

        <div className="prose prose-neutral max-w-none">{node}</div>
      </div>
    </ScrollArea>
  );
}
