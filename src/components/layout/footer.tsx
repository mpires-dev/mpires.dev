import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/pixel-icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {year} Matheus Pires. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            render={
              <Link
                href="https://github.com/mpires-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              />
            }
          >
            <PixelIcon name="github" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            render={
              <Link
                href="https://www.linkedin.com/in/mpiresdev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              />
            }
          >
            <PixelIcon name="linkedin" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            render={
              <Link href="mailto:matheuspires.dev@gmail.com" aria-label="Email" />
            }
          >
            <PixelIcon name="envelope" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
