import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Colophon, Birdseye",
  description:
    "Typography, system, deployment, and credits for the Birdseye website.",
};

/**
 * /colophon, the craft file. Lists everything that went into the
 * making of the site: typography, system stack, deployment, motion
 * scale, photography credits, the people. Reads like the back page
 * of a printed magazine.
 *
 * The page exists for two reasons:
 *   (1) acknowledge the makers, type designers, framework authors,
 *       photographers, the team
 *   (2) declare the standards we hold the site to (motion respects
 *       reduce-motion, grid is 1200px / 24px gutter / 12-col flow, etc)
 *
 * Linked from /humans.txt and the footer "Colophon" entry. Not on
 * the main nav.
 */
export default function ColophonPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[760px]">
            {/* Heading */}
            <header className="mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Colophon
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
                Notes on the{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  build
                </span>
                .
              </h1>
              <p className="mt-7 text-body text-birdseye-cream/60 max-w-[560px]">
                The materials, type, and standards that hold this site
                together. We owe each of these makers a debt; this page
                is how we say so.
              </p>
            </header>

            {/* Definition list */}
            <dl className="space-y-12 md:space-y-14">
              <Entry label="Typography">
                <p>
                  <strong className="text-birdseye-cream font-semibold">Inter</strong>{" "}
                  — the workhorse sans, set across every body, label, and
                  headline. Designed by Rasmus Andersson. Open source.
                </p>
                <p>
                  <strong className="text-birdseye-cream font-semibold">
                    Instrument Serif
                  </strong>{" "}
                  — the editorial italic that carries every accent word and
                  pull quote. Designed by Rodrigo Fuenzalida and Jeremy
                  Mickel. Open source.
                </p>
                <p>
                  <strong className="text-birdseye-cream font-semibold">
                    IBM Plex Mono
                  </strong>{" "}
                  — every system label, every issue plate. Designed by Mike
                  Abbink with Bold Monday for IBM. Open source.
                </p>
              </Entry>

              <Entry label="System">
                <p>
                  Built on <strong className="text-birdseye-cream">Next.js 15</strong>{" "}
                  (App Router, React Server Components, View Transitions API),{" "}
                  <strong className="text-birdseye-cream">React 19</strong>,{" "}
                  <strong className="text-birdseye-cream">TypeScript 5</strong>,{" "}
                  <strong className="text-birdseye-cream">Tailwind CSS 3.4</strong>,
                  and <strong className="text-birdseye-cream">framer-motion</strong>{" "}
                  for the motion vocabulary.
                </p>
                <p>
                  Resource pages (blog, news, video, guide, checklist, event,
                  case-studies, career) are rendered from a headless WordPress
                  source via a typed fetch layer.
                </p>
              </Entry>

              <Entry label="Grid">
                <p>
                  1200px container · 24px gutter · 12-column responsive flow ·
                  7.5rem section rhythm. Type sizes are clamp-driven so the
                  hierarchy holds from a 360px phone to a 27&quot; monitor.
                </p>
              </Entry>

              <Entry label="Motion">
                <p>
                  A four-step duration scale {" "}
                  <span className="font-mono text-[14px] text-birdseye-cream/85">
                    0.14 / 0.24 / 0.40 / 0.65s
                  </span>{" "}
                 , and a single primary easing,{" "}
                  <span className="font-mono text-[14px] text-birdseye-cream/85">
                    cubic-bezier(0.22, 1, 0.36, 1)
                  </span>
                  . Every component animation reads from this single source.
                </p>
                <p>
                  All motion respects{" "}
                  <span className="font-mono text-[14px] text-birdseye-cream/85">
                    prefers-reduced-motion
                  </span>
                  . When set, transitions collapse to 0.01ms and decorative
                  loops are held steady, the wordmark heartbeat included.
                </p>
              </Entry>

              <Entry label="Color">
                <p>
                  A four-token palette: pure black ground (#000000), warm
                  cream type (#F4EDE4), electric blue accent (#2E4BFF), and a
                  single status green (#4ADE80). Used SPARINGLY, the cream
                  carries 95% of the system, the electric is reserved for
                  signal.
                </p>
              </Entry>

              <Entry label="Deployment">
                <p>
                  <strong className="text-birdseye-cream">Vercel</strong>, Edge
                  Network, ISR, image optimization. Domain authority and
                  certificates served from the same.
                </p>
              </Entry>

              <Entry label="Photography">
                <p>
                  All photography from the Birdseye internal archive, yards,
                  gates, command centers, and the team. Captured by our staff
                  during installs and ride-alongs across North America.
                </p>
              </Entry>

              <Entry label="Standards">
                <p>
                  WCAG 2.2 AA for color contrast and focus order. Every
                  interactive surface has a visible focus ring keyed to the
                  brand electric. All imagery carries descriptive alt text.
                  Form errors only flash after first interaction
                  (
                  <span className="font-mono text-[14px] text-birdseye-cream/85">
                    :user-invalid
                  </span>
                  ), never on page load.
                </p>
              </Entry>

              <Entry label="Written, built, and operated from">
                <p>
                  Mississauga, Ontario, Canada, with teammates in Dallas,
                  Belgrade, and Bogotá.
                </p>
              </Entry>

              <Entry label="Version">
                <p>
                  <span className="font-mono text-[14px] text-birdseye-cream/85">
                    YOS · v1.4 · OPERATIONAL
                  </span>
                </p>
              </Entry>
            </dl>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <Link
                  href="/manifesto"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Manifesto, &gt;
                </Link>
                <Link
                  href="/principles"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Principles, &gt;
                </Link>
                <Link
                  href="/humans.txt"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  humans.txt, &gt;
                </Link>
                <Link
                  href="/.well-known/security.txt"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  security.txt, &gt;
                </Link>
                <Link
                  href="/about-us"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  About, &gt;
                </Link>
              </div>
            </footer>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}

/**
 * One colophon entry. Two-column on desktop (label / body), stacked on
 * mobile. Mono uppercase label sits in the left rail like a margin note.
 */
function Entry({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-12 items-start">
      <dt className="font-mono text-[11px] tracking-[0.2em] text-birdseye-cream/40 uppercase pt-1.5">
        {label}
      </dt>
      <dd className="text-[16px] md:text-[17px] leading-[1.7] text-birdseye-cream/75 space-y-3">
        {children}
      </dd>
    </div>
  );
}
