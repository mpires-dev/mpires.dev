"use client";

import { makePage } from "@keystatic/next/ui/app";
import { NextUIProvider } from "@keystatic/next/ui";
import keystaticConfig from "../../../keystatic.config";

export const Keystatic = makePage({
  config: keystaticConfig,
});

export default function KeystaticPage() {
  return (
    <NextUIProvider>
      <Keystatic />
    </NextUIProvider>
  );
}
