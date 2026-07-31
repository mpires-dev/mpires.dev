"use client";

import { useState, useEffect } from "react";
import Dither from "./dither";

export function DitherBackground(props: React.ComponentProps<typeof Dither>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Dither {...props} />;
}
