"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";
import { CameraEye } from "@/components/site/CameraEye";
import { IconArrowRight } from "@/components/icons/SystemIcons";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * /lab/camera-eye
 *
 * Sandboxed prototype route for the WebGL camera-eye signature hero
 * (task #68). Lives at this URL until the visual is approved, then
 * the CameraEye component graduates into Hero.tsx as the homepage
 * background, the editorial DOM above the canvas is intentionally
 * the same shape (eyebrow / three-line headline / sub / CTA pair) so
 * the promotion is largely a substitution, not a re-architecture.
 *
 * Anything tested here that doesn't ship to the live home stays in
 * `/lab/` as design archeology.
 */
export default function CameraEyeLabPage() {
  return (
    <PageShell>
      {/* Lab strip, quiet operational label so it's clear this isn't
          the real homepage. Fixed to the top of the section so the
          context never gets lost during scroll-back. */}
      <LabStrip />

      <section className="section-dark relative isolate overflow-hidden min-h-[100vh] flex flex-col">
        {/* The WebGL canvas, full-bleed background. aria-hidden
            because the meaning is decorative; semantic content lives
            in the DOM siblings below. */}
        <div className="absolute inset-0 -z-20">
          <CameraEye className="h-full w-full" />
        </div>

        {/* Soft cinematic overlay so editorial type holds contrast
            over any canvas frame. Same layered approach as the live
            Hero, keeps the DOM type at AA without dimming the eye. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/20 to-black/85"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.55) 70%)" }}
        />

        <SystemMastheadTop />

        <Container className="relative flex-1 grid place-items-center max-w-site py-24 md:py-32">
          <div className="text-center max-w-[940px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.4 }}
              className="system-label text-birdseye-cream/60 mb-8 md:mb-10"
            >
              SENSOR · OPEN · CALIBRATED
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.6 },
                },
              }}
              className="leading-[0.98] tracking-[-0.025em]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: DUR.slow, ease: EASE_OUT },
                  },
                }}
                className="block font-sans font-bold text-birdseye-cream"
                style={{
                  fontSize: "clamp(2.75rem, 6vw, 6rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "1",
                }}
              >
                Every event,
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: DUR.slow, ease: EASE_OUT },
                  },
                }}
                className="block font-serif italic font-normal text-birdseye-electric"
                style={{
                  fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: "0.95",
                }}
              >
                witnessed.
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: DUR.slow, ease: EASE_OUT },
                  },
                }}
                className="block font-sans font-bold text-birdseye-cream/30"
                style={{
                  fontSize: "clamp(2.75rem, 6vw, 6rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: "1",
                }}
              >
                Verified.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 1.4 }}
              className="text-body text-birdseye-cream/65 max-w-[520px] mx-auto mt-8 md:mt-10 text-balance"
            >
              The lens above is the system itself, every gate, dock, and
              perimeter, as it sees them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 1.55 }}
              className="mt-9 flex items-center justify-center gap-3"
            >
              <Link
                href="/book-a-demo"
                className="group inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 shadow-[0_0_40px_rgba(46,75,255,0.3)]"
              >
                See it live
                <IconArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-cream/[0.04] hover:border-birdseye-cream/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                Back to live home
              </Link>
            </motion.div>
          </div>
        </Container>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2, ease: EASE_OUT }}
          className="relative z-10 pb-8 md:pb-10 flex flex-col items-center gap-3 text-birdseye-cream/40"
        >
          <span className="system-label">SCROLL · LAB NOTES</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, ease: EASE_OUT, repeat: Infinity }}
            className="block h-8 w-px bg-birdseye-cream/30"
          />
        </motion.div>
      </section>

      <LabNotes />
    </PageShell>
  );
}

/**
 * Top-of-section masthead. Mirrors the SystemConsoleTop strip in the
 * live Hero so the lab feels like the same brand surface, not a
 * different page. Adds a "LAB" tag at the leading edge so the context
 * is unambiguous.
 */
function SystemMastheadTop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
      className="absolute top-24 inset-x-6 md:inset-x-12 z-10 hidden sm:flex items-center justify-between system-label text-birdseye-cream/45"
    >
      <span className="flex items-center gap-2">
        <span className="text-birdseye-electric">LAB</span>
        <span className="text-birdseye-cream/15">·</span>
        <span>YOS · v1.4</span>
        <span className="h-1 w-1 rounded-full bg-birdseye-success" />
        <span className="text-birdseye-success">SENSOR ONLINE</span>
      </span>
      <span>CAMERA-EYE · PROTOTYPE 01</span>
    </motion.div>
  );
}

/**
 * Bright orange-red strip wouldn't match the brand. We use a quiet
 * mono ribbon at the very top, just under the Nav, so the page's
 * sandbox status is announced without crashing the editorial register.
 */
function LabStrip() {
  return (
    <div className="bg-black border-b border-birdseye-cream/[0.10]">
      <Container className="max-w-site py-2.5 flex items-center justify-between gap-4 system-label text-birdseye-cream/40">
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-birdseye-electric" />
          /LAB · CAMERA-EYE
        </span>
        <span className="hidden md:inline">
          PROTOTYPE · NOT YET ON HOME
        </span>
        <Link
          href="/"
          className="hover:text-birdseye-cream/80 transition-colors"
        >
          ← LIVE SITE
        </Link>
      </Container>
    </div>
  );
}

/**
 * Below-the-fold lab notes. Reads as a Studio Lin / Anton & Irene
 * project page, short, paragraph-form rationale that explains what
 * the user just looked at, the constraints, and the next steps. Lets
 * Scotty see the design thinking, not just the artifact.
 */
function LabNotes() {
  return (
    <section className="section-light relative py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[180px_1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:pt-2">
            <div className="system-label text-birdseye-electric mb-2">
              LAB NOTES
            </div>
            <div className="system-label text-[#0A0A0B]/45">
              CAMERA-EYE · 2026-05
            </div>
          </div>
          <div className="max-w-[680px]">
            <h2 className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em] font-bold text-[#0A0A0B] text-balance">
              Why a lens, not a&nbsp;
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                product render
              </span>
              .
            </h2>
            <div className="mt-8 space-y-5 text-body text-[#0A0A0B]/75">
              <p>
                Birdseye is a system that perceives. The home page hero
                should feel like the system itself, not a marketing
                animation about it. The earlier SVG prototype read closer
                to "explainer," so it&apos;s archived. This iteration
                trades the explainer register for an instrument register 
                Leica viewfinder, calibrated industrial sensor, and
                renders the whole composition in a single fragment shader.
              </p>
              <p>
                The iris tracks three signals. Cursor position pulls the
                pupil reflection so the eye reads as alive, not a still.
                Scroll velocity dilates the aperture by a few percent, so
                fast scroll feels like the lens taking in more, slow scroll
                feels like it focusing. The phase token from{" "}
                <code className="font-mono text-[13px] bg-[#0A0A0B]/[0.06] px-1.5 py-0.5 rounded">
                  AmbientShift
                </code>{" "}
                tints the inner-rim glow, so dusk reads warm and night
                reads cool, the eye participates in the same atmospheric
                shift as the rest of the site.
              </p>
              <p>
                Brand electric (#5B7CFF accessible / #2E4BFF brand) appears
                only as the inner-rim glaze around the pupil, the
                power-on accent. The housing and blades are matte black
                with hairline radial grooves. No glassy chrome, no lens
                flare. Quiet.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#0A0A0B]/[0.10]">
              <Spec label="Renderer" value="WebGL2" />
              <Spec label="Geometry" value="1 quad · SDF" />
              <Spec label="Bundle" value="≈ 8 KB gz" />
              <Spec label="Frame" value="< 1 ms · M1" />
            </div>

            <div className="mt-12 flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0B] text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-[#0A0A0B]/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EDE4] transition-[transform,colors,box-shadow] duration-150"
              >
                Back to live home
              </Link>
              <span className="system-label text-[#0A0A0B]/45">
                READY FOR PROMOTION INTO HERO PENDING APPROVAL
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="system-label text-[#0A0A0B]/45 mb-1.5">{label}</div>
      <div className="font-mono text-[14px] text-[#0A0A0B]">{value}</div>
    </div>
  );
}
