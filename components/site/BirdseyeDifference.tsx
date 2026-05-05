import { Container } from "@/components/ui/Container";

/**
 * BirdseyeDifference — six-point competitive differentiation grid.
 *
 * 2026-05-04: extracted from /about-us and relocated to /platform.
 * The "Six lines that don't appear on anyone else's site" framing is
 * about THE PRODUCT vs. competitor products — that's a platform-page
 * argument, not an about-the-company argument. About-us was the wrong
 * surface; /platform (where the buyer is asking "why this and not
 * Verkada / LVT / Outpost / Flock") is the right one.
 *
 * Copy refinements made on the move:
 *   • Lede — was: "Most security pitches collapse into cameras + cloud
 *     + AI." Now leans into the buyer's context directly ("if you're
 *     evaluating yard-security platforms, here's what doesn't show up
 *     in anyone else's pitch deck").
 *   • Six items kept verbatim from the about-us version — they're
 *     working copy and the user explicitly approved them earlier.
 *
 * Layout: hairline-divided 3-column grid (md+), single-column on
 * mobile. Numbered eyebrow (01–06), short title, tight body. Same
 * editorial register as the rest of the platform page.
 */
export function BirdseyeDifference() {
  const items = [
    {
      n: "01",
      title: "Maximum Telepresence™",
      body: "A named methodology, not a feature pitch. Every gate event runs through three layers — AI detection, live operator verification, sealed audit record — by design.",
    },
    {
      n: "02",
      title: "Voice-Down™ live intervention",
      body: "A real human voice through the on-site speaker, in real time. Most events resolve at the speaker. Cameras-only providers don't have a voice; sirens scare without specifying.",
    },
    {
      n: "03",
      title: "Per-yard model training",
      body: "AI tuned to your specific yard's normal — your shifts, your PPE, your rosters. Generic models miss your operation; ours improves with every event it sees.",
    },
    {
      n: "04",
      title: "Audit-grade record on every event",
      body: "Tamper-evident chain of custody on video, voice, gate state, and outcome. Pull on demand for the audit, the lawsuit, the claim, the customer call.",
    },
    {
      n: "05",
      title: "24/7 across four ops floors",
      body: "Trained operators rotating from Mississauga, Dallas, Belgrade, and Bogotá. No shifts, no gaps, no single-point-of-failure region.",
    },
    {
      n: "06",
      title: "System access, not headcount",
      body: "You pay for an operating system, not an army of guards. Coverage compounds. Costs flatten. Most customers cut 25–50% in security spend.",
    },
  ];

  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="max-w-[760px] mb-12 md:mb-16">
          <span className="system-label text-birdseye-electric">
            WHAT MAKES BIRDSEYE DIFFERENT
          </span>
          <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
            Six things{" "}
            <span className="font-serif italic font-normal text-birdseye-electric">
              only
            </span>{" "}
            Birdseye is built to do.
          </h2>
          <p className="mt-6 text-body text-birdseye-cream/65 max-w-copy">
            Every yard-security platform talks about cameras, cloud, AI, and
            dashboards. Those are table stakes. Below is what isn&apos;t —
            six commitments engineered into how Birdseye actually runs, and
            the reason customers leave camera-only vendors for us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-birdseye-cream/[0.08]">
          {items.map((d) => (
            <div
              key={d.n}
              className="bg-black p-7 md:p-9 flex flex-col"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-birdseye-electric mb-4">
                {d.n}
              </span>
              <h3 className="text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.25] tracking-[-0.012em] font-bold text-birdseye-cream">
                {d.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-birdseye-cream/65">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
