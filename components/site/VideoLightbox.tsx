"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { DUR, EASE_OUT, usePrefersReducedMotion } from "@/_design/motion";

/**
 * VideoLightbox, a brand-correct YouTube video modal.
 *
 * Triggered by a parent setting `open` to true. The modal:
 *   • Drops a near-opaque dark backdrop with a subtle backdrop-blur,
 *     darkening (but not erasing) the rest of the page.
 *   • Renders a centered 16:9 stage with the YouTube embed, a top-
 *     right close affordance, and a mono filing caption underneath.
 *   • Animates in via opacity + a tiny scale lift on the stage.
 *   • ESC and backdrop click both dismiss.
 *   • The iframe src is only mounted while `open` so the video loads
 *     fresh on each open AND stops cleanly on close (vs. swapping
 *     `?autoplay=0` which YouTube's iframe API doesn't always honor).
 *   • Locks body scroll while open and restores on unmount.
 *   • Reduce-motion → no scale animation, just fade.
 *
 * z-[80] sits above BrandEntry (z-[70]), CommandPalette (z-[60]) so a
 * lightbox can fire over any state.
 */
export function VideoLightbox({
  open,
  onClose,
  videoId,
  startSeconds = 0,
  caption,
}: {
  /** Controlled visibility. */
  open: boolean;
  /** Fires on ESC, backdrop click, or close button. */
  onClose: () => void;
  /** YouTube video ID, the part after `v=`. */
  videoId: string;
  /** Optional `?start=` for the YouTube embed. */
  startSeconds?: number;
  /** Optional mono filing caption shown beneath the stage. */
  caption?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // ESC to close + body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the modal so keyboard users land on the close
    // button. We defer one tick so the dialog has actually mounted.
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  // Build the embed src. autoplay=1 + mute=0 doesn't satisfy the
  // browser autoplay policy on most desktops, so the user clicks play
  // inside the player. We still pass autoplay so mobile + already-
  // unmuted contexts honor it. modestbranding hides most YT chrome.
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    color: "white",
    iv_load_policy: "3", // hide annotations
  });
  if (startSeconds > 0) params.set("start", String(startSeconds));
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  const stageInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.96, y: 8 };
  const stageAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, y: 0 };
  const stageExit = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, y: 4 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.base, ease: EASE_OUT }}
          className="fixed inset-0 z-[80] grid place-items-center px-4 py-8 sm:px-6 md:px-10"
        >
          {/* Backdrop, click anywhere outside the stage to close. */}
          <button
            type="button"
            aria-label="Close video"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-md focus-visible:outline-none"
          />

          {/* Stage + chrome, sits above the backdrop. */}
          <motion.div
            initial={stageInitial}
            animate={stageAnimate}
            exit={stageExit}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="relative w-full max-w-[1100px]"
          >
            {/* Top filing strip, mono caption + close affordance. */}
            <div className="flex items-end justify-between gap-4 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-birdseye-electric shrink-0"
                />
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-birdseye-cream/55 truncate">
                  {caption ?? "BIRDSEYE · WATCH HOW IT WORKS"}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="group inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 bg-birdseye-cream/[0.04] hover:bg-birdseye-cream/[0.08] px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/70 group-hover:text-birdseye-cream">
                  Close
                </span>
                <span
                  aria-hidden
                  className="text-birdseye-cream/55 group-hover:text-birdseye-cream text-[12px] leading-none"
                >
                  ✕
                </span>
              </button>
            </div>

            {/* Video stage, 16:9, hairline brand frame */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-birdseye-cream/[0.10] bg-black shadow-[0_40px_120px_-30px_rgba(46,75,255,0.35)]">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={src}
                  title="Birdseye, watch how it works"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>

            {/* Bottom telemetry strip, quiet brand frame underneath the
                video — gives the lightbox the same editorial register
                as the rest of the site. */}
            <div className="flex items-center justify-between gap-4 mt-3">
              <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-birdseye-cream/35">
                FRAME 0001 · LIVE
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-birdseye-cream/35 hidden sm:inline">
                ESC TO CLOSE
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
