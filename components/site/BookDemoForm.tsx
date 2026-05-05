"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE_OUT } from "@/_design/motion";
import { company } from "@/_design/content";

/**
 * BookDemoForm, interim safe submit handler.
 *
 * History (#95): the form previously had no `onSubmit`/`action`, so a
 * default GET landed every field, including `email`, in the URL bar
 * (and any browser history / referrer header). This was the only Tier S
 * go-live blocker on the site.
 *
 * Interim behavior (this file): on submit we
 *   1) preventDefault so nothing leaks to the URL,
 *   2) compose a pre-filled `mailto:` to sales@ with the form payload,
 *   3) open the user's email client (window.location.href = mailto:…),
 *   4) flip into a "Request received" state so the form doesn't appear
 *      to do nothing if the mail handoff is slow.
 *
 * Why mailto: instead of disabling the button, it preserves the
 * function of the page (a person who clicks Request demo gets a real
 * draft they can send) and requires zero backend. When Scotty picks a
 * proper backend (HubSpot Forms / Calendly / `/api/book-a-demo` /
 * server action), swap the body of `handleSubmit` and remove the
 * mailto fallback. Everything else, markup, validation, success UX 
 * stays.
 *
 * TODO(#95): wire real backend. Options on the table:
 *   - HubSpot Forms embed (CRM continuity, fewest moving parts)
 *   - Calendly (skips the form entirely, lands in a calendar)
 *   - POST /api/book-a-demo serverless route → email + CRM webhook
 *   - Next.js server action (no API surface, simplest deploy)
 */

const SALES_EMAIL = "sales@birdseyesecurity.ca";

type Status = "idle" | "submitting" | "sent" | "error";

export function BookDemoForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const liveRegionId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // CRITICAL: stop default GET so email never reaches the URL bar.
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const first = (data.get("first") as string | null)?.trim() ?? "";
    const last = (data.get("last") as string | null)?.trim() ?? "";
    const email = (data.get("email") as string | null)?.trim() ?? "";
    const companyName = (data.get("company") as string | null)?.trim() ?? "";
    const yards = (data.get("yards") as string | null)?.trim() ?? "";
    const problem = (data.get("problem") as string | null)?.trim() ?? "";

    setStatus("submitting");

    // Compose mailto. We URL-encode body+subject so multi-line content
    // and reserved chars (& ? #) round-trip correctly.
    const subject = `Demo request, ${companyName || `${first} ${last}`.trim() || "New lead"}`;
    const body = [
      `Name: ${first} ${last}`.trim(),
      `Email: ${email}`,
      `Company: ${companyName}`,
      `Number of yards: ${yards}`,
      "",
      "What they're trying to solve:",
      problem || "",
      "",
      "",
      "Sent from birdseyesecurity.ca / Book a demo",
    ].join("\n");

    const href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Trigger the OS-level mail handoff. We use location.href rather
    // than window.open so we don't get popup-blocked. Browsers without
    // a registered mail handler will surface the OS prompt; we still
    // flip to the success state because, from the user's POV, the
    // request has been handed off to *something*.
    try {
      window.location.href = href;
      // tiny defer so the browser kicks the handoff before we paint
      // success and the form clears.
      window.setTimeout(() => {
        setStatus("sent");
        formRef.current?.reset();
      }, 250);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="rounded-2xl border border-birdseye-cream/[0.10] bg-birdseye-surface px-7 py-9"
            role="status"
            aria-live="polite"
            id={liveRegionId}
          >
            <div className="flex items-start gap-4">
              <span className="relative grid place-items-center h-2 w-2 mt-2.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-birdseye-success" />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-birdseye-success animate-ping opacity-60"
                />
              </span>
              <div>
                <span className="system-label text-birdseye-success">
                  REQUEST · QUEUED
                </span>
                <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] font-semibold text-birdseye-cream text-balance">
                  Your draft is in your{" "}
                  <span className="font-serif italic font-normal text-birdseye-electric">
                    outbox.
                  </span>
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-birdseye-cream/65 max-w-[480px]">
                  We just opened a pre-filled email to our sales team.
                  Hit send and a Birdseye specialist will reply inside one
                  business day to schedule the walkthrough.
                </p>
                <p className="mt-5 font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/40">
                  Don&rsquo;t see the draft?{" "}
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-birdseye-cream/75 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
                  >
                    Try again
                  </button>{" "}
                  <span className="text-birdseye-cream/15 mx-1">·</span>{" "}
                  Or email{" "}
                  <a
                    href={`mailto:${SALES_EMAIL}`}
                    className="text-birdseye-cream/75 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
                  >
                    {SALES_EMAIL}
                  </a>{" "}
                  directly{" "}
                  <span className="text-birdseye-cream/15 mx-1">·</span>{" "}
                  Or call{" "}
                  <a
                    href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-birdseye-cream/75 hover:text-birdseye-cream underline underline-offset-4 decoration-birdseye-cream/30 hover:decoration-birdseye-cream/60 transition-colors"
                  >
                    {company.phone}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="grid gap-5"
            aria-label="Book a demo"
            onSubmit={handleSubmit}
            // Defense in depth: even if JS fails to load (very rare on a
            // Next.js page that has already hydrated this form), the
            // browser will POST instead of GET, fields no longer end up
            // in the URL bar / referrer / history. The action target is
            // a mailto: link so a no-JS submit still goes somewhere
            // useful rather than 404'ing on /book-a-demo.
            method="POST"
            action={`mailto:${SALES_EMAIL}`}
            encType="text/plain"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="First name"
                name="first"
                htmlFor="first-name"
                autoComplete="given-name"
                required
              />
              <Field
                label="Last name"
                name="last"
                htmlFor="last-name"
                autoComplete="family-name"
                required
              />
            </div>
            <Field
              label="Work email"
              name="email"
              htmlFor="email"
              type="email"
              autoComplete="email"
              required
            />
            <Field
              label="Company"
              name="company"
              htmlFor="company"
              autoComplete="organization"
              required
            />
            <Field
              label="Number of yards"
              name="yards"
              htmlFor="yards"
              type="number"
              inputMode="numeric"
              min={1}
              max={9999}
            />
            <Field
              label="What's the problem you're trying to solve?"
              name="problem"
              htmlFor="problem"
              multiline
            />
            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
                Reply within{" "}
                <span className="text-birdseye-cream/65">1 business day</span>
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 h-11 text-[14px] font-medium rounded-full bg-birdseye-electric text-birdseye-cream hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150 disabled:opacity-60 disabled:cursor-wait"
              >
                {status === "submitting" ? "Opening draft…" : "Request demo"}
                {status !== "submitting" && (
                  <span aria-hidden>→</span>
                )}
              </button>
            </div>

            {/* Privacy / trust footer. Small mono caps row, sits under
                the button. Borrowed from Attio + Linear, a B2B that
                handles operational data should signal data discipline
                visibly at the form. */}
            <div className="flex items-center gap-3 pt-3 border-t border-birdseye-cream/[0.06] mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-birdseye-success"
                />
                No spam
              </span>
              <span aria-hidden className="text-birdseye-cream/15">·</span>
              <span>SOC 2 grade data handling</span>
              <span aria-hidden className="text-birdseye-cream/15">·</span>
              <span>Unsubscribe anytime</span>
              <span aria-hidden className="text-birdseye-cream/15 hidden sm:inline">
                ·
              </span>
              <Link
                href="/privacy"
                className="hidden sm:inline text-birdseye-cream/55 hover:text-birdseye-cream transition-colors ml-auto"
              >
                Privacy →
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Single labeled input. Mirrors the prior visual treatment, mono
 * uppercase eyebrow label, surface-tinted field, electric focus ring 
 * but adds:
 *   - autoComplete hints (one-tap autofill on mobile)
 *   - native `required` on the must-have fields so the browser handles
 *     :user-invalid styling without us shipping a validation library
 *   - inputMode for the numeric "yards" field (mobile keypad)
 */
function Field({
  label,
  name,
  htmlFor,
  type = "text",
  multiline,
  required,
  autoComplete,
  inputMode,
  min,
  max,
}: {
  label: string;
  name: string;
  htmlFor: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "email" | "tel" | "url" | "search";
  min?: number;
  max?: number;
}) {
  const sharedClass =
    "w-full rounded-xl bg-birdseye-surface border border-birdseye-cream/[0.10] px-4 py-3 text-[15px] text-birdseye-cream placeholder-birdseye-cream/30 focus:outline-none focus:border-birdseye-electric focus:ring-2 focus:ring-birdseye-electric/30 [&:user-invalid]:border-birdseye-electric/60 transition-colors";

  if (multiline) {
    return (
      <label htmlFor={htmlFor} className="block">
        <span className="block system-label text-birdseye-cream/45 mb-3">
          {label}
          {required && (
            <span className="ml-1.5 text-birdseye-electric/80" aria-hidden>
              *
            </span>
          )}
        </span>
        <textarea
          id={htmlFor}
          name={name}
          rows={4}
          required={required}
          aria-required={required || undefined}
          className={sharedClass}
        />
      </label>
    );
  }

  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block system-label text-birdseye-cream/45 mb-3">
        {label}
        {required && (
          <span className="ml-1.5 text-birdseye-electric/80" aria-hidden>
            *
          </span>
        )}
      </span>
      <input
        id={htmlFor}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        max={max}
        className={sharedClass}
      />
    </label>
  );
}
