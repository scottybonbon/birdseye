"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NewsletterStrip — sitewide newsletter signup band.
 *
 * DEEP-4 (2026-05-03): every B2B SaaS site needs a newsletter signup
 * for retained-attention conversion. Editorial register here matches
 * the rest of the site — the newsletter is "Field Notes from the Yard,"
 * positioned for ops directors, not generic marketing-list bait.
 *
 * Mounted inside `Footer.tsx` at the top so every page that renders
 * Footer (which is every page) gets the strip automatically. Sitewide
 * by composition.
 *
 * Submit handler is a placeholder client-state confirm — when a real
 * email service (Mailchimp, ConvertKit, Formspree, etc.) is wired,
 * Mike replaces `handleSubmit` to POST to the real endpoint. The UI
 * stays the same.
 *
 * BLOCKER (Mike): pick a newsletter service + provide endpoint URL,
 * then swap the handleSubmit body. Until then, we collect intent
 * client-side and show the success state — no actual delivery.
 */
export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lightweight email validation before showing success.
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }

    // PLACEHOLDER: client-side confirmation only. When a real backend is
    // wired, replace with: await fetch("/api/newsletter", { method: "POST",
    // body: JSON.stringify({ email }) }) — or an external service POST.
    setState("success");
  };

  return (
    <section
      aria-label="Subscribe to Birdseye Field Notes"
      className="border-b border-birdseye-cream/[0.10] pt-12 md:pt-16 pb-12 md:pb-16"
    >
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-center">
          {/* Pitch */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric mb-4">
              FIELD NOTES · NEWSLETTER
            </p>
            <h3 className="text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream">
              Operator-grade reading on yard tech,{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                twice a month
              </span>
              .
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.55] text-birdseye-cream/65 max-w-[480px]">
              Field notes from the yard — new theft patterns, deployment
              lessons, customer outcomes. Written for ops directors, not
              marketing dashboards. No filler. Unsubscribe anytime.
            </p>
          </div>

          {/* Form */}
          <div>
            <AnimatePresence mode="wait" initial={false}>
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DUR.smooth, ease: EASE_OUT }}
                  className="rounded-2xl border border-birdseye-electric/40 bg-birdseye-electric/[0.06] p-6"
                >
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric mb-2">
                    SUBSCRIBED
                  </p>
                  <p className="text-[15px] leading-[1.5] text-birdseye-cream">
                    You&apos;re on the list. First field notes land in your
                    inbox in the next two weeks.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: DUR.smooth, ease: EASE_OUT }}
                  noValidate
                >
                  <label
                    htmlFor="newsletter-email"
                    className="block font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/55 mb-3"
                  >
                    YOUR EMAIL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      id="newsletter-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="ops-director@yardco.com"
                      aria-invalid={state === "error"}
                      aria-describedby={
                        state === "error" ? "newsletter-error" : undefined
                      }
                      className={`flex-1 rounded-full bg-birdseye-cream/[0.04] border px-5 h-12 text-[14.5px] text-birdseye-cream placeholder:text-birdseye-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors ${
                        state === "error"
                          ? "border-amber-500/60"
                          : "border-birdseye-cream/15 hover:border-birdseye-cream/30"
                      }`}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 whitespace-nowrap"
                    >
                      Subscribe
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                  {state === "error" && (
                    <p
                      id="newsletter-error"
                      className="mt-3 text-[13px] text-amber-400"
                    >
                      That email doesn&apos;t look right — try again?
                    </p>
                  )}
                  <p className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
                    NO SPAM · UNSUBSCRIBE ANY TIME
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
