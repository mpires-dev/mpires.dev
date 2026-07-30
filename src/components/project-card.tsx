import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  coverImage?: string;
  techStack?: readonly string[];
  date?: string;
}

export function ProjectCard({
  title,
  description,
  slug,
  coverImage,
  techStack,
  date,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-border/80">
        {coverImage && (
          <div className="relative aspect-video overflow-hidden border-b border-border">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
              {title}
            </h3>
            {date && (
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {new Date(date).getFullYear()}
              </span>
            )}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
