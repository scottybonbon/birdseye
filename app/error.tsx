"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { company } from "@/_design/content";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error.tsx]", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen bg-birdseye-black flex items-center justify-center py-32">
      <Container>
        <div className="text-center max-w-[680px] mx-auto">
          {/* Eyebrow */}
          <p className="system-label text-birdseye-cream/55 mb-8">
            SYSTEM · UNHANDLED
          </p>

          {/* Headline with serif italic */}
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-birdseye-cream mb-2">
            Something <span className="font-serif italic text-birdseye-electric">broke</span>.
          </h1>

          {/* Body copy */}
          <p className="text-body text-birdseye-cream/70 mb-12 max-w-[520px] mx-auto">
            We've logged it and we're looking into it. If this keeps happening, please contact us
           , your message helps us fix it faster.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-birdseye-electric text-birdseye-cream font-medium rounded-full hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
            >
              Try again
            </button>
            <Link
              href={`mailto:${company.email}`}
              className="text-birdseye-electric hover:text-birdseye-electric/80 transition-colors font-medium flex items-center gap-2"
            >
              Report it
              <span>→</span>
            </Link>
          </div>

          {/* Dev-only error message */}
          {isDev && (
            <div className="mt-12 pt-8 border-t border-birdseye-cream/20">
              <p className="system-label text-birdseye-cream/55 mb-4">DEBUG</p>
              <pre className="bg-birdseye-black/50 text-birdseye-cream/70 text-sm p-4 rounded border border-birdseye-cream/10 text-left overflow-x-auto">
                {error.message}
              </pre>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
