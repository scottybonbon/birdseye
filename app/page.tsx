import { Nav } from "@/components/site/Nav";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { ThreeCores } from "@/components/site/ThreeCores";
// MaxTelepresence cut from home 2026-05-04 (Scotty call). The
// home page was running THREE separate "how it works" passes —
// ThreeCores explains the cores, MaxTelepresence runs the
// detect/verify/document triptych, GateEventTimeline scrubs one
// verified event end-to-end. The middle one was the most cuttable:
// the dedicated /maximum-telepresence page already covers the full
// methodology in depth (PageHero + 3 MediaSpreads + MetricStrip +
// PullQuote), so the home triptych was redundant content
// competing with the deeper page that earns the visitor's reading
// time. Component file preserved at
// components/site/MaxTelepresence.tsx as design archeology.
// import { MaxTelepresence } from "@/components/site/MaxTelepresence";
// UseCaseGrid cut from home 2026-05-04, see render-site below for context.
// Component file preserved as design archeology.
// import { UseCaseGrid } from "@/components/site/UseCaseGrid";
import { GateEventTimeline } from "@/components/site/GateEventTimeline";
import { ConnectedFlow } from "@/components/site/ConnectedFlow";
import { Stats } from "@/components/site/Stats";
import { Impact } from "@/components/site/Impact";
import { CargoTheft } from "@/components/site/CargoTheft";
import { CustomerProofCards } from "@/components/site/CustomerProofCards";
import { VersusGuards } from "@/components/site/VersusGuards";
import { RoiInline } from "@/components/site/RoiInline";
import { Testimonials } from "@/components/site/Testimonials";
import { Security } from "@/components/site/Security";
import { BuiltForReal } from "@/components/site/BuiltForReal";
import { SupplyChain } from "@/components/site/SupplyChain";
import { Implementation } from "@/components/site/Implementation";
import { LiveOpsMap } from "@/components/site/LiveOpsMap";
import { HomeFaq } from "@/components/site/HomeFaq";
import { Certainty } from "@/components/site/Certainty";
import { ClosingMetrics } from "@/components/site/ClosingMetrics";
import { FooterStack } from "@/components/site/FooterStack";

/**
 * Homepage flow, narrative arc.
 *
 * Editorial pass (2026-05-02): cut the manufactured rhythm and the
 * redundant beats per Scotty's call. Removed:
 *   • Every SectionInterlude (the dotted-rail / mono-caption spacers
 *     that punctuated the section transitions). The section padding
 *     alone provides the rhythm; the labels read as random and
 *     superfluous.
 *   • NewsroomStrip, sat at the very top, asking the visitor to read
 *     "what we shipped recently" before they understood what Birdseye
 *     is. Wrong place in the hierarchy. (2026-05-04: relocated to
 *     /about-us where "what's the company up to" content lives.)
 *   • RecentlyShipped, same problem at the back of the page; the
 *     /changelog page already serves this audience. (2026-05-04: cut
 *     for good — Scotty call. Component file deleted.)
 *   • StakeholderLanes, restated the platform tour through a role
 *     lens, but the role-specific deep dives already live at
 *     /platform/{gatecore, safecore, yardcore} and the home tour was
 *     already covering it.
 *   • MaxTelepresence (2026-05-04, pre-staging cleanup): the triptych
 *     was the third "how it works" pass on a single page, redundant
 *     with ThreeCores + GateEventTimeline. The dedicated
 *     /maximum-telepresence page already covers the methodology in
 *     depth and is where visitors who want it can land. Component
 *     file preserved as design archeology.
 *
 * Component files for cut sections are preserved as design archeology
 * unless explicitly deleted; they're just not mounted here. Easy to
 * reintroduce on a focused surface (a /press archive, a /platform
 * compare page) where they'd actually serve.
 *
 *  ─ ATTRACTION ──────────────────────────
 *   01  Hero, manifesto                                    [dark, video]
 *   02  LogoMarquee, trust handshake                       [dark band]
 *
 *  ─ THE SYSTEM ──────────────────────────
 *   03  ThreeCores, meet YARD OS, three cores               [dark]
 *   04  GateEventTimeline, scrub one verified event end-to-end [dark]
 *   05  ConnectedFlow, every feature on sticky scroll      [dark]
 *
 *  ─ PROOF ───────────────────────────────
 *   07  Stats, proven at scale                             [dark grid]
 *   07  Impact, drag to compare manual vs Birdseye         [dark]
 *   08  CargoTheft, the named threat verified entry stops  [dark]
 *   09  CustomerProofCards, five named outcomes, name+#+yr [dark]
 *
 *  ─ CONSIDERATION ───────────────────────
 *   10  VersusGuards, switching from manned security       [LIGHT]
 *   10  RoiInline, "what would my number be?"              [LIGHT]
 *   11  Testimonials, what operators say                   [light]
 *
 *  ─ TRUST ───────────────────────────────
 *   11  Security, encryption, retention, audit, sovereignty [dark]
 *
 *  ─ DEPTH ───────────────────────────────
 *   12  BuiltForReal, feature card spread                  [LIGHT]
 *   13  SupplyChain, your industry                         [LIGHT]
 *
 *  ─ DEPLOYMENT ──────────────────────────
 *   14  Implementation, Live in 14 days                    [LIGHT]
 *
 *  ─ NETWORK ─────────────────────────────
 *   15  LiveOpsMap, the network across NA + 4 ops floors   [dark]
 *
 *  ─ CONVERSION ──────────────────────────
 *   16  HomeFaq, pre-demo objection handler                [dark]
 *   16  Certainty, closing pull-quote                      [dark]
 *   17  ClosingMetrics, four-KPI numerical close           [dark]
 *   18  FooterStack, layered CTA into footer               [dark]
 *
 * 2026-05-03 prune: Explore (Careers / About / Contact 3-up sitemap)
 * was cut — entirely redundant with the FooterStack's 5-column link
 * grid that renders directly below it. The component file is preserved
 * as design archeology in case it earns its place on a different
 * surface (e.g. a /resources hub page) where a sitemap module would
 * actually serve.
 */
export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <LogoMarquee />

        <ThreeCores />
        <GateEventTimeline />
        <ConnectedFlow />

        {/* UseCaseGrid was cut from the home page 2026-05-04 (Scotty
            call). The platform tour above (ThreeCores →
            GateEventTimeline → ConnectedFlow) already addresses
            "what Birdseye does" from three angles; UseCaseGrid added a
            fourth that read as content shopping rather than a confident
            answer — too dense for a home page that's already long, and
            the headline ("The work yard operators actually run on us
            for") wasn't landing. Component file preserved at
            components/site/UseCaseGrid.tsx as design archeology; the
            natural new home is a future /who-we-serve page where
            "for whom does Birdseye do it" is the right framing. */}

        <Stats />
        <Impact />
        <CargoTheft />
        <CustomerProofCards />

        <VersusGuards />
        <RoiInline />
        <Testimonials />

        <Security />
        <BuiltForReal />
        <SupplyChain />

        <Implementation />

        {/* Live North America ops map — the network at scale, the page's
            single most-shareable set piece. Sits between Implementation
            (deployment story) and the close cluster, framing the network
            as the deliverable. Pivots register from LIGHT (Implementation)
            back to DARK (the close), so it also acts as the rhythm
            inflection back into the close. */}
        <LiveOpsMap />

        <HomeFaq />
        <Certainty />
        <ClosingMetrics />
      </main>
      <FooterStack />
    </>
  );
}
