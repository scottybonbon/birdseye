import { Nav } from "@/components/site/Nav";
import { FooterStack } from "@/components/site/FooterStack";
import { Footer } from "@/components/site/Footer";

/**
 * Wraps subpages with the shared Nav + Footer chrome.
 *
 * By default, renders the layered FooterStack (CTA card overlapping a
 * full-height footer). Pages that already include their own CTA
 * (CtaBanner inside the page body) can pass `bareFooter` to render
 * just the Footer with no leading CTA, avoiding two CTAs in a row.
 */
export function PageShell({
  children,
  bareFooter = false,
}: {
  children: React.ReactNode;
  bareFooter?: boolean;
}) {
  return (
    <>
      <Nav />
      <main id="main" className="min-h-[60vh]">{children}</main>
      {bareFooter ? <Footer /> : <FooterStack />}
    </>
  );
}
