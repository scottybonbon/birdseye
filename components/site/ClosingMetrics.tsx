"use client";

import { MetricStrip } from "@/components/site/page/MetricStrip";

/**
 * ClosingMetrics — the four-KPI close that punctuates the home page
 * just before FooterStack.
 *
 * 2026-05-04: simplified to a thin wrapper around MetricStrip now that
 * MetricStrip carries its own header. Previously the header lived in a
 * separate <section> above; the new MetricStrip API bakes the header
 * in so every mount reads as a complete unit.
 *
 * KPI selection differentiates from the mid-page Stats section. Stats
 * carries volume + performance ("12M gate transactions, 99.99%
 * accuracy"). ClosingMetrics carries OUTCOME + SLA ("87% avg theft
 * reduction, <30s alert response"). Same page, two different
 * proof-types, no duplication.
 *
 * Slot: between Certainty (manifesto pull-quote) and FooterStack (CTA).
 * Closing arc reads: rational close (HomeFaq) → emotional close
 * (Certainty) → numerical close (ClosingMetrics) → action (FooterStack).
 */
export function ClosingMetrics() {
  return (
    <MetricStrip
      eyebrow="THE NUMBERS"
      preTitle="What you"
      italicTitle="actually"
      postTitle="get."
      metrics={[
        {
          value: "87%",
          label: "Avg theft reduction across active deployments",
        },
        {
          value: "60%",
          label: "Lower security spend vs guard-based models",
        },
        {
          value: "<30s",
          label: "Alert-to-Voice-Down™ avg response",
        },
        {
          value: "99.9%",
          label: "Operational uptime, contractual",
        },
      ]}
    />
  );
}
