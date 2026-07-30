"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstallCommandCopy({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2">
      <code className="font-mono text-xs text-muted-foreground sm:text-sm">
        {command}
      </code>
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
  );
}
