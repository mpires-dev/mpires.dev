"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AiFileCardProps {
  name: string;
  description: string;
  slug: string;
  coverImage?: string;
  repoLink?: string;
  installCommand?: string;
}

export function AiFileCard({
  name,
  description,
  slug,
  coverImage,
  repoLink,
  installCommand,
}: AiFileCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!installCommand) return;
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Link
      href={`/ai-files/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-border/80"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-border">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-5xl">🤖</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
            {name}
          </h3>
          {repoLink && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(repoLink, "_blank", "noopener,noreferrer");
              }}
              className="shrink-0 cursor-pointer"
            >
              <ExternalLink className="size-3.5 text-muted-foreground transition-colors hover:text-foreground" />
            </span>
          )}
        </div>

        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {description}
        </p>

        {installCommand && (
          <div
            className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <code className="truncate flex-1">{installCommand}</code>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleCopy}
              aria-label="Copy install command"
            >
              {copied ? (
                <Check className="size-3 text-success" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}
