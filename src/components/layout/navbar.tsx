"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PixelIcon } from "@/components/pixel-icon";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/ai-files", label: "AI Files" },
  { href: "/posts", label: "Blog" },
];

function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-5 w-auto md:h-6", className)}
      viewBox="0 0 937 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M27.8599 68.8098C34.3498 68.8098 39.611 74.0735 39.611 80.5669V88.4858C39.611 93.5623 35.498 97.6768 30.4245 97.6768H9.18646C4.11293 97.6768 1.01523e-05 93.5623 0 88.4858V68.8098H27.8599Z"
        fill="currentColor"
      />
      <path
        d="M77.7588 34.0861C88.4771 34.0861 97.1652 42.779 97.1652 53.5021V88.4858C97.1652 93.5623 93.0527 97.6768 87.9788 97.6768H63.5723C58.4988 97.6768 54.3859 93.5623 54.3859 88.4858V80.5669C54.3859 65.9095 42.5097 54.0276 27.8599 54.0276H0V34.0861H77.7588Z"
        fill="currentColor"
      />
      <path
        d="M145.173 0C150.246 0 154.359 4.11496 154.359 9.19102V88.4858C154.359 93.5623 150.246 97.6768 145.173 97.6768H121.127C116.053 97.6768 111.94 93.5623 111.94 88.4858V53.5021C111.94 34.615 96.637 19.3039 77.7588 19.3039H0V9.19102C0 4.11496 4.11292 0 9.18646 0H145.173Z"
        fill="currentColor"
      />
      <path
        d="M215.159 97.6768H197.159V17.2768H221.519L240.359 56.8768L247.919 75.7168H249.239L256.559 56.8768L274.799 17.2768H299.279V97.6768H281.279V56.8768L281.879 44.2768H280.559L275.879 56.8768L259.079 92.8768H237.239L220.439 56.8768L215.759 44.2768H214.439L215.159 56.8768V97.6768ZM326.722 97.6768H308.722V17.2768H350.722C369.322 17.2768 381.322 27.8368 381.322 46.3168C381.322 64.7968 369.322 75.4768 350.722 75.4768H326.722V97.6768ZM348.802 33.4768H326.722V59.2768H348.802C358.762 59.2768 363.442 56.3968 363.442 46.3168C363.442 36.4768 358.762 33.4768 348.802 33.4768ZM405.706 97.6768H387.706V17.2768H405.706V97.6768ZM433.128 97.6768H415.128V17.2768H459.528C479.328 17.2768 490.608 26.0368 490.608 41.3968C490.608 54.4768 483.048 62.2768 467.928 63.7168V64.6768C475.128 66.5968 477.888 70.4368 480.888 76.0768L492.528 97.6768H471.648L460.608 76.7968C457.368 70.5568 454.368 68.5168 445.008 68.5168H433.128V97.6768ZM433.128 33.4768V54.9568H459.408C467.928 54.9568 471.768 52.5568 471.768 44.1568C471.768 36.2368 467.928 33.4768 459.408 33.4768H433.128ZM566.254 97.6768H498.214V17.2768H566.254V33.4768H516.214V49.1968H564.454V65.2768H516.214V81.4768H566.254V97.6768ZM610.866 98.8768C586.506 98.8768 572.826 89.2768 572.826 70.5568V69.8368H590.826V71.9968C590.826 79.4368 594.546 82.4368 610.866 82.4368C625.266 82.4368 628.626 80.2768 628.626 74.8768C628.626 69.9568 625.866 68.1568 617.586 66.7168L595.026 63.4768C580.626 61.1968 572.106 53.9968 572.106 40.9168C572.106 28.7968 581.946 16.0768 608.946 16.0768C633.666 16.0768 645.186 27.4768 645.186 44.3968V45.1168H627.066V43.4368C627.066 35.7568 623.106 32.5168 607.146 32.5168C594.186 32.5168 590.226 35.0368 590.226 40.1968C590.226 44.8768 592.866 46.5568 599.586 47.7568L622.146 51.3568C640.146 54.2368 646.626 62.9968 646.626 74.0368C646.626 87.1168 636.426 98.8768 610.866 98.8768ZM675.916 97.6768H652.756V76.6768H675.916V97.6768ZM724.028 97.6768H685.268V17.2768H724.028C749.828 17.2768 766.148 32.2768 766.148 57.4768C766.148 82.6768 749.828 97.6768 724.028 97.6768ZM724.028 33.4768H703.268V81.4768H724.028C740.348 81.4768 746.948 76.7968 746.948 57.4768C746.948 38.1568 740.348 33.4768 724.028 33.4768ZM841.996 97.6768H773.956V17.2768H841.996V33.4768H791.956V49.1968H840.196V65.2768H791.956V81.4768H841.996V97.6768ZM903.408 97.6768H877.728L844.368 17.2768H866.088L890.208 79.4368H891.408L915.168 17.2768H936.768L903.408 97.6768Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-foreground transition-opacity hover:opacity-80"
          aria-label="Matheus Pires Home"
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              render={<Link href={link.href} />}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                pathname === link.href && "text-foreground",
              )}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <PixelIcon name="bars" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <ScrollArea scrollFade className="h-full">
                <div className="flex items-center justify-between px-4 pt-4">
                  <span className="font-heading font-bold">Menu</span>
                  <SheetClose
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close menu"
                      />
                    }
                  >
                    <PixelIcon name="times" />
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.href}
                      render={<Button variant="ghost" className="justify-start" />}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex w-full items-center px-3 py-2 text-sm font-medium",
                          pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
