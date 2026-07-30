import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-bold md:text-8xl">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Button render={<Link href="/" />} className="mt-8" size="lg">
        Back home
      </Button>
    </div>
  );
}
