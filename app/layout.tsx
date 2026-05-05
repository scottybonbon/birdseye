import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { CustomCursor } from "@/components/site/CustomCursor";
import { BrandEntry } from "@/components/site/BrandEntry";
import { AmbientShift } from "@/components/site/AmbientShift";
import { StagingBanner } from "@/components/site/StagingBanner";
import "./globals.css";

// Unmounted on Scotty's call (2026-05-02), the brand register pivoted
// toward "reserved, quiet, confident, polished, professional" and the
// SystemConsole event ticker (bottom-left) + CommandPalette (⌘K) read
// as too operational / control-room for that target. Component files
// are preserved as design archeology and remain importable; we just
// don't ship them in the chrome anymore.
//
// import { SystemConsole } from "@/components/site/SystemConsole";
// import { CommandPalette } from "@/components/site/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

// Instrument Serif, the editorial punch. One word in italic at scale
// changes the entire feel of a page. Used VERY sparingly: hero italic word,
// section headline accents, pull quotes.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Birdseye, The Yard Operating System",
  description:
    "Smarter yards. Safer business. Zero guesswork. Birdseye automates ID, seals, gate events, and yard compliance with verified events and 24/7 human assurance.",
  metadataBase: new URL("https://birdseyesecurity.ca"),
  keywords: [
    "yard automation",
    "gate automation",
    "remote video monitoring",
    "perimeter security",
    "logistics security",
    "Birdseye Security",
  ],
  openGraph: {
    title: "Birdseye, The Yard Operating System",
    description:
      "Smarter yards. Safer business. Zero guesswork. Birdseye automates ID, seals, gate events, and yard compliance with verified events and 24/7 human assurance.",
    type: "website",
    siteName: "Birdseye",
    url: "https://birdseyesecurity.ca",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birdseye, The Yard Operating System",
    description: "Smarter yards. Safer business. Zero guesswork.",
  },
  // Index/follow on production; noindex/nofollow on staging so the
  // preview URL never lands in search results. Belt + suspenders with
  // robots.ts (some hosting platforms inject their own robots.txt
  // ahead of ours; the meta tag in <head> is the second guard).
  robots:
    process.env.NEXT_PUBLIC_STAGING === "true"
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable} ${instrumentSerif.variable}`}>
      {/* suppressHydrationWarning on <body>: silences a known false
          positive caused by browser extensions (Grammarly in particular,
          via `data-new-gr-c-s-check-loaded` / `data-gr-ext-installed`)
          that inject attributes onto <body> before React hydrates. The
          warning is harmless but pollutes the dev console for any user
          with the extension installed. Scope is intentionally narrow —
          only the body tag itself, not its descendants. */}
      <body
        className="font-sans antialiased bg-black text-birdseye-cream"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-birdseye-electric focus-visible:text-birdseye-cream focus-visible:px-5 focus-visible:py-3 focus-visible:font-medium focus-visible:text-[14px] focus-visible:shadow-glow"
        >
          Skip to main content
        </a>
        {/* Sitewide ambient layers, the cursor HUD and the
            time-of-day phase shift. Both self-disable on touch /
            reduced-motion / mobile so they never get in the way of
            the actual content. */}
        <CustomCursor />
        {/* Sets four CSS vars on :root every 15 minutes based on local
            hour, dawn / day / dusk / night. Consumers (Hero overlay,
            ScrollProgress) read the vars and shift tonally. Subtle;
            reads as atmosphere over a long visit. */}
        <AmbientShift />
        {/* First-paint set piece. Fires ONCE per browser session, sits over
            the page during the ~2.6s assembly, fades out to reveal whatever
            page the user landed on. Self-suppresses under
            prefers-reduced-motion (instant logotype) and gracefully no-ops
            in Safari private-mode (sessionStorage throws). */}
        <BrandEntry />
        {/* Staging notice — only renders when NEXT_PUBLIC_STAGING=true
            in the deployment env. Quiet bar at the very top labelling
            preview deployments as not-production so colleagues
            reviewing the site don't confuse it with the live URL. */}
        <StagingBanner />
        {children}
      </body>
    </html>
  );
}
