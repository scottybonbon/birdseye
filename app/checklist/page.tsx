import { PageShell } from "@/components/site/PageShell";
import { ResourceArchive } from "@/components/site/page/ResourceArchive";
import { GatedResourceBand } from "@/components/site/GatedResourceBand";

export const metadata = {
  title: "Checklists, Birdseye",
  description: "Free downloadable checklists for security, compliance, and yard operations teams.",
};

export const revalidate = 3600;

export default function ChecklistPage() {
  return (
    <PageShell bareFooter>
      <ResourceArchive
        type="checklist"
        routePrefix="/checklist"
        hero={{
          eyebrow: "RESOURCES · CHECKLISTS",
          preTitle: "Field-ready",
          italicTitle: "checklists",
          postTitle: ".",
          tagline: "Free downloads your team can put to work today.",
          description:
            "Inspection sheets, audit checklists, and operator references built from real Birdseye deployments.",
        }}
        cta={{
          preTitle: "Need a custom",
          italicTitle: "checklist",
          postTitle: "?",
          description: "Tell us about your operation, we'll build one for you.",
        }}
      />

      {/* Gated featured checklist (DEEP-1). Same pattern as /guide. */}
      <GatedResourceBand
        eyebrow="FEATURED CHECKLIST · CARGO-THEFT PREVENTION"
        resourceTitle="The Cargo-Theft Prevention Audit"
        resourceType="checklist"
        description="A 30-point gate-and-yard audit pulled from the playbooks of 3PLs that haven't lost a load to fictitious pickup. Print it, walk your yard, and find the gaps before someone else does."
        downloadUrl="/playbooks/cargo-theft-prevention-audit.pdf"
        ctaLabel="Get the checklist"
      />
    </PageShell>
  );
}
