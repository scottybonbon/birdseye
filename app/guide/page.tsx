import { PageShell } from "@/components/site/PageShell";
import { ResourceArchive } from "@/components/site/page/ResourceArchive";
import { GatedResourceBand } from "@/components/site/GatedResourceBand";

export const metadata = {
  title: "Guides, Birdseye",
  description: "Operator playbooks and deep-dive guides on yard, gate, and perimeter security.",
};

export const revalidate = 3600;

export default function GuidePage() {
  return (
    <PageShell bareFooter>
      <ResourceArchive
        type="guide"
        routePrefix="/guide"
        hero={{
          eyebrow: "RESOURCES · GUIDES",
          preTitle: "Operator",
          italicTitle: "playbooks",
          postTitle: ".",
          tagline: "Practical, in-depth guides for the people who run the yard.",
          description:
            "Step-by-step references on automation, compliance, security operations, and modernization, written for the operators doing the work.",
        }}
        cta={{
          preTitle: "Need a custom",
          italicTitle: "playbook",
          postTitle: "?",
          description: "Our team can put one together for your operation.",
        }}
      />

      {/* Gated featured playbook (DEEP-1). Lead-capture modal opens on
          click; download URL is a placeholder until the real PDF is
          available. Featured resource is the gate-operations playbook,
          which we expect will be the most-requested asset. */}
      <GatedResourceBand
        eyebrow="FEATURED PLAYBOOK · GATE OPERATIONS"
        resourceTitle="The Operator's Guide to Modernizing the Gate"
        resourceType="playbook"
        description="What to audit, what to replace, what to keep. Forty pages on bringing a yard from radio-and-clipboard to verified events — written by the team that's done it on dozens of yards."
        downloadUrl="/playbooks/operators-guide-modernizing-the-gate.pdf"
        ctaLabel="Get the playbook"
      />
    </PageShell>
  );
}
