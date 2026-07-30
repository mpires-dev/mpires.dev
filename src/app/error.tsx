"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred. Try again, or come back later.
      </p>
      <Button onClick={reset} className="mt-8" size="lg">
        Try again
      </Button>
    </div>
  );
}
