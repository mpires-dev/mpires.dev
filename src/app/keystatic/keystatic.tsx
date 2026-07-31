"use client";

import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "../../../keystatic.config";

export const Keystatic = makePage(keystaticConfig);

export default function KeystaticPage() {
  return <Keystatic />;
}
