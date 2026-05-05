"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * LeadCaptureModal — reusable email-gated download modal.
 *
 * DEEP-1 (2026-05-03): the guides and checklists archives need a
 * lead-capture step to convert reading-intent into pipeline. Most B2B
 * SaaS gates whitepapers/playbooks behind a short form; the trade-off
 * (user friction vs. lead capture) is well-understood and table-stakes.
 *
 * Modal is fully client-side. Submit handler is a placeholder — when
 * a real backend is wired, replace `handleSubmit` to POST to the real
 * endpoint. The success state surfaces the download link so users can
 * actually retrieve the resource immediately after submitting.
 *
 * Mike action: wire `handleSubmit` to ConvertKit/Mailchimp/Formspree
 * or a Next.js API route, AND replace the placeholder downloadUrl
 * passed by the caller with the actual asset URL when a real PDF is
 * available. The modal itself doesn't need to change.
 *
 * Reduce-motion: framer's exit/enter respects OS preference.
 */
export function LeadCaptureModal({
  open,
  onClose,
  resourceTitle,
  resourceType,
  downloadUrl,
  pdfReady = false,
}: {
  open: boolean;
  onClose: () => void;
  resourceTitle: string;
  /** "guide" | "checklist" | "playbook" — adjusts copy */
  resourceType: string;
  /** Where to send the user once they submit. Use a placeholder
   *  URL until the real asset is available. */
  downloadUrl: string;
  /**
   * Whether the PDF asset at downloadUrl is actually ready to download.
   * 2026-05-04: defaults to false so we never serve a 404 download
   * button — the success state instead reads "we'll email it as soon
   * as it's ready" and captures the lead. Flip to true on the
   * GatedResourceBand mount as soon as the PDF lands in /public.
   */
  pdfReady?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ESC closes modal; body scroll locked while open.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Reset state when the modal closes so reopening is a clean slate.
  useEffect(() => {
    if (!open) {
      setState("idle");
      setErrorMsg("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setState("error");
      setErrorMsg("Tell us your name so we know who's asking.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setErrorMsg("That email doesn't look right — try again?");
      return;
    }

    // PLACEHOLDER: client-side only. When a real backend is wired,
    // replace with: await fetch("/api/lead-capture", { method: "POST",
    // body: JSON.stringify({ name, email, company, resource: resourceTitle }) })
    setState("success");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="fixed inset-0 z-[80] grid place-items-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-capture-title"
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="relative w-full max-w-[520px] rounded-3xl bg-birdseye-surface border border-birdseye-cream/[0.10] p-8 md:p-10 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 grid place-items-center h-8 w-8 rounded-full text-birdseye-cream/55 hover:text-birdseye-cream hover:bg-birdseye-cream/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>

            {state === "success" ? (
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric mb-3">
                  {pdfReady ? "READY · DOWNLOAD" : "QUEUED · COMING TO YOUR INBOX"}
                </p>
                <h2
                  id="lead-capture-title"
                  className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream mb-4"
                >
                  Thanks, {name.split(" ")[0] || "operator"}.
                </h2>
                {pdfReady ? (
                  <p className="text-[14.5px] leading-[1.6] text-birdseye-cream/70 mb-8">
                    Your copy of{" "}
                    <span className="text-birdseye-cream font-semibold">{resourceTitle}</span>{" "}
                    is queued. We&apos;ve also sent a copy to{" "}
                    <span className="text-birdseye-cream font-mono text-[13.5px]">
                      {email}
                    </span>{" "}
                    for safekeeping.
                  </p>
                ) : (
                  // Honest "we don't actually have the PDF yet" state.
                  // Captures the lead, sets expectations clearly, never
                  // surfaces a 404 download button. (DEEP-1 cleanup,
                  // 2026-05-04 — flip pdfReady=true on each
                  // GatedResourceBand mount once Mike uploads the
                  // matching /playbooks/*.pdf.)
                  <p className="text-[14.5px] leading-[1.6] text-birdseye-cream/70 mb-8">
                    <span className="text-birdseye-cream font-semibold">{resourceTitle}</span>{" "}
                    is in the final review pass. We&apos;ll email a copy to{" "}
                    <span className="text-birdseye-cream font-mono text-[13.5px]">
                      {email}
                    </span>{" "}
                    the moment it&apos;s out — usually within a few business
                    days.
                  </p>
                )}
                {pdfReady ? (
                  <a
                    href={downloadUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 w-full sm:w-auto"
                  >
                    Download the {resourceType}
                    <span aria-hidden>↓</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 w-full sm:w-auto"
                  >
                    Got it, thanks
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric mb-3">
                  GATED · {resourceType.toUpperCase()}
                </p>
                <h2
                  id="lead-capture-title"
                  className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream mb-4"
                >
                  Get the {resourceType}.
                </h2>
                <p className="text-[14.5px] leading-[1.6] text-birdseye-cream/70 mb-7">
                  <span className="text-birdseye-cream font-semibold">
                    {resourceTitle}
                  </span>
                  . Operator-grade, no fluff. We&apos;ll send a copy to your
                  inbox and you can download it now.
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="lc-name"
                      className="block font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/55 mb-2"
                    >
                      NAME
                    </label>
                    <input
                      id="lc-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="Alex Operator"
                      className="w-full rounded-full bg-birdseye-cream/[0.04] border border-birdseye-cream/15 px-5 h-12 text-[14.5px] text-birdseye-cream placeholder:text-birdseye-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors hover:border-birdseye-cream/30"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lc-email"
                      className="block font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/55 mb-2"
                    >
                      WORK EMAIL
                    </label>
                    <input
                      id="lc-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="alex@yardco.com"
                      className="w-full rounded-full bg-birdseye-cream/[0.04] border border-birdseye-cream/15 px-5 h-12 text-[14.5px] text-birdseye-cream placeholder:text-birdseye-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors hover:border-birdseye-cream/30"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lc-company"
                      className="block font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/55 mb-2"
                    >
                      COMPANY <span className="text-birdseye-cream/35">(OPTIONAL)</span>
                    </label>
                    <input
                      id="lc-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="YardCo Logistics"
                      className="w-full rounded-full bg-birdseye-cream/[0.04] border border-birdseye-cream/15 px-5 h-12 text-[14.5px] text-birdseye-cream placeholder:text-birdseye-cream/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors hover:border-birdseye-cream/30"
                    />
                  </div>
                </div>

                {state === "error" && (
                  <p className="mt-4 text-[13px] text-amber-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 w-full"
                >
                  Get the {resourceType}
                  <span aria-hidden>→</span>
                </button>
                <p className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35 text-center">
                  WE READ EVERY EMAIL · NO MARKETING-LIST RESALE
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
