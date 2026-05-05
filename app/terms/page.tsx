import { LegalPage } from "@/components/site/page/LegalPage";

export const metadata = {
  title: "Terms of Service, Birdseye",
  description:
    "The terms that govern your use of the Birdseye website and the YARD OS platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS"
      preTitle="Terms of"
      italicTitle="Service"
      description="The terms that govern your use of the Birdseye website and the YARD OS platform."
      lastUpdated="May 1, 2026"
      sections={[
        {
          id: "acceptance",
          title: "Acceptance.",
          body: "By accessing birdseyesecurity.ca or using any Birdseye service, you agree to these terms. If you are using a Birdseye service on behalf of a company, you confirm that you are authorized to bind that company.",
        },
        {
          id: "platform-use",
          title: "Platform use.",
          body: "Access to the YARD OS platform is governed by your signed Master Service Agreement. These website terms cover marketing pages, resources, and the demo request flow only. Where a conflict exists, the MSA controls.",
        },
        {
          id: "acceptable-use",
          title: "Acceptable use.",
          body: [
            "You agree not to attempt to access non-public areas of our systems, interfere with the operation of our services, or use scraping, crawling, or any automated means to extract data outside the documented APIs.",
            "Reverse engineering, decompiling, or replicating the platform, in whole or in part, is prohibited without written authorization from Birdseye.",
          ],
        },
        {
          id: "ip",
          title: "Intellectual property.",
          body: "All content on this site, copy, imagery, marks, the Birdseye name, YARD OS, GateCore, SafeCore, YardCore, Voice-Down, and ID-Verify, is owned by Birdseye Security Solutions and is provided for your reference only. Customer footage and operational data remain the property of the customer.",
        },
        {
          id: "warranties",
          title: "Warranties and disclaimers.",
          body: "The website is provided as-is. The YARD OS platform service levels, uptime commitments, and limited warranties are defined exclusively in your MSA. Birdseye does not warrant that this website will be uninterrupted or error-free.",
        },
        {
          id: "liability",
          title: "Limitation of liability.",
          body: "To the fullest extent permitted by applicable law, Birdseye shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of this website. Liability for service-related claims is governed by the MSA.",
        },
        {
          id: "governing-law",
          title: "Governing law.",
          body: "These terms are governed by the laws of the Province of Ontario, Canada, without regard to its conflict-of-law principles. Any dispute will be brought in the courts of Ontario unless your MSA specifies otherwise.",
        },
        {
          id: "changes",
          title: "Changes.",
          body: "We may update these terms from time to time. Material changes are posted at the top of this page with a revised date. Continued use of the site after changes constitutes acceptance.",
        },
      ]}
    />
  );
}
