import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DitherBackground } from "@/components/dither-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const interHeading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Matheus Pires | Fullstack Developer",
    template: "%s | Matheus Pires",
  },
  description:
    "Fullstack Developer specialized in TypeScript and AI-first product delivery.",
  openGraph: {
    title: "Matheus Pires | Fullstack Developer",
    description:
      "Fullstack Developer specialized in TypeScript and AI-first product delivery.",
    url: siteUrl,
    siteName: "Matheus Pires",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matheus Pires | Fullstack Developer",
    description:
      "Fullstack Developer specialized in TypeScript and AI-first product delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark relative h-svh ${inter.variable} ${interHeading.variable} ${geistMono.variable}`}
    >
      <body className="h-svh overflow-hidden font-sans antialiased">
        <div className="relative h-svh">
          {/* Dither background — outside ScrollArea so WebGL works properly */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-25">
            <DitherBackground
              waveColor={[0.5, 0.5, 0.5]}
              disableAnimation={false}
              enableMouseInteraction={false}
              colorNum={10}
              waveAmplitude={0.3}
              waveFrequency={2.7}
              waveSpeed={0.04}
            />
          </div>

          {/* ScrollArea on top with transparent bg */}
          <ScrollArea scrollFade className="relative z-10 h-svh">
            <Navbar />
            {children}
            <Footer />
          </ScrollArea>
        </div>
      </body>
    </html>
  );
}
