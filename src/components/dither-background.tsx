"use client";

import dynamic from "next/dynamic";

const Dither = dynamic(() => import("./dither"), {
  ssr: false,
  loading: () => null,
});

export function DitherBackground(props: React.ComponentProps<typeof Dither>) {
  return <Dither {...props} />;
}
