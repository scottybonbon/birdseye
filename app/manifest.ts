import type { MetadataRoute } from "next";

/**
 * Web app manifest, surfaces when the site is installed as a PWA or
 * pinned to a mobile home screen. Tied to the same brand tokens as the
 * favicon and apple-icon so the install experience reads coherent.
 *
 * Display "minimal-ui" gives a standalone-style chrome without losing
 * the URL bar entirely, appropriate for a marketing site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Birdseye, The Yard Operating System",
    short_name: "Birdseye",
    description:
      "Smarter yards. Safer business. Zero guesswork. Verified events, 24/7 human assurance, gate to dock.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
