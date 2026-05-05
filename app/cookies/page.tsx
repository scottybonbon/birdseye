import { LegalPage } from "@/components/site/page/LegalPage";

export const metadata = {
  title: "Cookie Settings, Birdseye",
  description:
    "How Birdseye uses cookies and similar technologies on birdseyesecurity.ca and how you can control them.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="COOKIES"
      preTitle="Cookie"
      italicTitle="Settings"
      description="How we use cookies and similar technologies on birdseyesecurity.ca, and how you can control them."
      lastUpdated="May 1, 2026"
      sections={[
        {
          id: "what",
          title: "What cookies are.",
          body: "Cookies are small text files placed on your device when you visit a website. They are commonly used to make websites work, to make them work more efficiently, and to provide information to the operators of the site about how visitors use it.",
        },
        {
          id: "categories",
          title: "Categories we use.",
          body: [
            "Strictly necessary, required for the site to function. These cannot be turned off in our systems and are typically set in response to actions you take, such as setting privacy preferences or filling in forms.",
            "Performance, help us understand how visitors interact with the site by collecting and reporting information anonymously. We use these to improve the site.",
            "Functional, enable enhanced features and personalization. May be set by us or by third-party providers whose services we have added to our pages.",
          ],
        },
        {
          id: "third-parties",
          title: "Third parties.",
          body: "We use a small number of third-party services for analytics and performance monitoring. These providers may set their own cookies. We do not allow third parties to use cookies on our site for targeted advertising.",
        },
        {
          id: "controlling-cookies",
          title: "Controlling cookies.",
          body: "You can change your cookie preferences at any time through the banner that appears on your first visit, or by adjusting your browser settings to refuse some or all cookies. Note that disabling strictly necessary cookies may impair the function of the site.",
        },
        {
          id: "do-not-track",
          title: "Do Not Track.",
          body: "We respect Do Not Track signals where supported by your browser. When DNT is enabled, performance cookies are not set.",
        },
        {
          id: "questions",
          title: "Questions.",
          body: "For questions about our cookie practices, contact us at the address in the right rail.",
        },
      ]}
    />
  );
}
