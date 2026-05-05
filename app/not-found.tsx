import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Off the map, Birdseye",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-birdseye-black flex flex-col">
      <Nav />
      <section className="flex-1 flex items-center justify-center py-32 relative">
        {/* Subtle dot-grid texture, quiet operational backdrop. The
            class is defined in globals.css. */}
        <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-60" />
        <Container className="relative">
          <div className="text-center max-w-[680px] mx-auto">
            {/* Eyebrow, operational language, not generic "404" */}
            <p className="system-label text-birdseye-cream/55 mb-8">
              FRAME · 404 · OFF GRID
            </p>

            {/* Massive headline */}
            <h1 className="text-[clamp(5rem,12vw,12rem)] leading-[0.9] font-black tracking-tight text-birdseye-cream mb-6">
              404.
            </h1>

            {/* Editorial subtitle */}
            <p className="text-2xl font-serif italic text-birdseye-electric mb-8">
              Off the map.
            </p>

            {/* Body copy */}
            <p className="text-body text-birdseye-cream/70 mb-12 max-w-[520px] mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back to
              something useful.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/"
                className="px-6 py-3 bg-birdseye-electric text-birdseye-cream font-medium rounded-full hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="text-birdseye-electric hover:text-birdseye-electric/80 transition-colors font-medium flex items-center gap-2"
              >
                Talk to us
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
