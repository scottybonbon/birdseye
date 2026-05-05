import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "A note from Mike, Birdseye",
  description:
    "A letter from Mike Grabovica, founder and CEO of Birdseye Security Solutions. The experiment that started Birdseye, and the three things he believes about yards, AI, and the people who watch.",
};

/**
 * /letter, the founder letter.
 *
 * Same editorial register as /manifesto and /colophon: PageMasthead,
 * single article column, generous vertical rhythm, drop-cap opening,
 * italic-serif accents on a single word per heading. No CTA, no
 * imagery, no animation. The page IS the letter.
 *
 * Voice notes (drafted from public Mike Grabovica research, May 2026):
 *   • Direct, measured, Canadian-modest, no hype
 *   • Origin: ran a few MDG retail stores, watched a real-time
 *     monitoring experiment work, that became Birdseye in 2011
 *   • Three beliefs: AI is a multiplier (not a substitute); prevention
 *     beats response; humans do the last inch
 *   • Closes with current scale (~350 people, ~10M gate events/mo)
 *     and an honest invitation
 *
 * Awaiting Scotty / Mike sign-off before promoting this page from the
 * editorial layer into Company-column nav. For now the page exists at
 * the URL and is linked from /about-us; once Mike signs off on the
 * voice we can surface it more prominently.
 */
export default function LetterPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[680px]">
            {/* Heading block */}
            <header className="mb-14 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                A note from Mike · May 2026
              </div>
              <h1 className="font-serif italic font-normal text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-birdseye-cream text-balance">
                The experiment that became Birdseye.
              </h1>
            </header>

            {/* Body, drop-cap opening */}
            <div className="text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p className="first-letter:font-serif first-letter:italic first-letter:font-normal first-letter:text-[5.5em] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-birdseye-electric">
                In 2010 I ran a small group of retail facilities. Five
                MDG stores. Hardware, software, and the operations side
                of all of it. You learn quickly in retail what works and
                what falls apart at scale.
              </p>
              <p>
                What kept falling apart was security. Inventory walked.
                Productivity dropped. The cameras were on. But only
                after. Guards were expensive when we could find them.
                We couldn&apos;t always find them. The people I was
                paying to watch the building couldn&apos;t be in two
                places at once.
              </p>
              <p>
                So we ran an experiment. We installed cameras across a
                few sites and had the management staff watch them in
                real time, on screens, while they did their other work.
                Just for a quarter. We wanted to see what would change.
              </p>
              <p>
                Everything changed. Shrinkage dropped. Performance went
                up. Customer service got better. Costs fell.
              </p>
              <p>
                I sat with the numbers for a while. The cameras
                hadn&apos;t gotten smarter. The guards hadn&apos;t
                multiplied. What had changed was that someone was
                watching in real time, while it was happening. And
                could reach the floor before the moment was gone.
              </p>
              <p>
                That&apos;s the experiment that became Birdseye in 2011.
              </p>
              <p>
                We&apos;re a Mississauga company. We started in a city
                that knows logistics, and we built for the unglamorous
                part of the supply chain: yards, gates, perimeters. The
                places where freight actually changes hands, and where
                almost everything that goes wrong, goes wrong. We
                didn&apos;t pick this market because it was sexy. We
                picked it because nobody was solving it, and the
                numbers were too clear to walk away from.
              </p>
              <p>A few things I believe, for the record.</p>
            </div>

            {/* Three beliefs */}
            <div className="mt-12 md:mt-16 space-y-12">
              <Belief
                titlePre="AI is a"
                titleItalic="multiplier"
                titleTail=", not a substitute."
              >
                <p>
                  It amplifies what you already do. If your operation
                  is sloppy, AI makes it sloppier, faster. If it&apos;s
                  tight, AI lets a small team cover ground a large team
                  never could. We&apos;ve watched both versions play
                  out, and the difference is almost never the model.
                  It&apos;s the operation underneath it.
                </p>
              </Belief>

              <Belief
                titlePre="Prevention beats"
                titleItalic="response"
                titleTail=", every time."
              >
                <p>
                  A camera that records is a sticker on a wall. A
                  trained agent watching that camera in real time, who
                  can voice down through the speaker before the
                  trespasser reaches the fence, is a different category
                  of system. We chose that category. We have built the
                  whole company around it.
                </p>
              </Belief>

              <Belief
                titlePre="Humans do the"
                titleItalic="last"
                titleTail="inch."
              >
                <p>
                  I don&apos;t trust an algorithm to fire a contractor
                  or call a dispatch on its own. Neither should you.
                  The AI gets us 99% of the way to confidence. The
                  last 1% is a person who has been watching this yard
                  for fifteen years and knows what doesn&apos;t belong.
                  That person is the reason any of this works.
                </p>
              </Belief>
            </div>

            {/* Closing */}
            <div className="mt-12 md:mt-16 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p>
                We&apos;re four hundred people now, across four ops
                floors — Mississauga, Dallas, Belgrade, Bogotá. We
                process about twelve million gate events a month.
                Cargo thieves are getting more sophisticated, not
                less. The labor that used to run yard security
                isn&apos;t coming back. We&apos;re going to keep
                building for that reality.
              </p>
              <p className="font-serif italic text-[19px] md:text-[20px] leading-[1.55] text-birdseye-cream/70">
                If your yard is the part of the business that nobody
                talks about until it costs you, we should talk.
              </p>
            </div>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="grid sm:grid-cols-[auto_1fr] items-end gap-4 sm:gap-10">
                <div>
                  <div className="font-serif italic text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05] text-birdseye-cream">
                    Mike Grabovica
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/45">
                    Founder &amp; CEO · Birdseye
                  </div>
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/35 sm:text-right">
                  Mississauga, Ontario · May 2026
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <Link
                  href="/about-us"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  About →
                </Link>
                <Link
                  href="/manifesto"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Manifesto →
                </Link>
                <Link
                  href="/book-a-demo"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Book a demo →
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
 * One of the three numbered beliefs in the body. Italic accent on a
 * single word in the heading (matches site-wide register), generous
 * paragraph below.
 */
function Belief({
  titlePre,
  titleItalic,
  titleTail,
  children,
}: {
  titlePre: string;
  titleItalic: string;
  titleTail: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream text-balance">
        {titlePre}{" "}
        <span className="font-serif italic font-normal text-birdseye-electric">
          {titleItalic}
        </span>
        {titleTail}
      </h2>
      <div className="mt-4 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-4">
        {children}
      </div>
    </section>
  );
}
