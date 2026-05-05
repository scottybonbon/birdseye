import { LegalPage } from "@/components/site/page/LegalPage";

export const metadata = {
  title: "Privacy Policy, Birdseye",
  description:
    "How Birdseye collects, uses, stores, and protects information for customers, prospects, and visitors.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="POLICY"
      preTitle="Privacy"
      italicTitle="Policy"
      description="How we collect, use, store, and protect information for customers, prospects, and visitors to Birdseye."
      lastUpdated="May 1, 2026"
      sections={[
        {
          id: "scope",
          title: "Scope.",
          body: "This policy applies to information collected by Birdseye Security Solutions through our website, marketing channels, and the YARD OS platform. Customer operational data captured by the platform is governed separately by your master service agreement.",
        },
        {
          id: "what-we-collect",
          title: "What we collect.",
          body: [
            "Identifiers you provide directly, name, business email, company, phone, and role, when you book a demo, request a resource, or contact our team.",
            "Operational and device data from your visits to birdseyesecurity.ca, including pages viewed, referring source, and approximate location derived from IP. We do not build behavioural profiles of individual visitors.",
            "Camera streams, audio, gate events, and operator interventions from your facility, processed under the terms of your YARD OS agreement and stored in your assigned region.",
          ],
        },
        {
          id: "how-we-use-it",
          title: "How we use it.",
          body: "We use the information we collect to deliver the platform, respond to inquiries, schedule demonstrations, send operationally relevant updates you have opted into, and meet our legal obligations. We do not sell personal information to third parties.",
        },
        {
          id: "retention",
          title: "Retention.",
          body: "Default retention for customer event data is 30 days, configurable to your industry's regulatory minimum and extendable up to seven years. Marketing inquiries are retained for the life of the relationship plus three years. You may request deletion at any time.",
        },
        {
          id: "your-rights",
          title: "Your rights.",
          body: "Depending on your jurisdiction, you may have the right to access, correct, port, or delete information we hold about you, and to object to certain processing. Contact us using the address in the right rail to make a request, we respond within 30 days.",
        },
        {
          id: "transfers",
          title: "Cross-border transfers.",
          body: "Canadian customer data stays in Canadian regions. United States data stays in United States regions. We do not transfer customer event data across borders without your written sign-off.",
        },
        {
          id: "contact",
          title: "Contact.",
          body: "Questions, complaints, or formal requests can be directed to our privacy officer at the address in the right rail. We work with your team to resolve concerns informally before they escalate.",
        },
      ]}
    />
  );
}
