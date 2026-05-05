/**
 * StagingBanner — quiet "this is not production" bar for staging /
 * preview deployments.
 *
 * Activates when NEXT_PUBLIC_STAGING=true is set in the deployment
 * environment (set in Vercel project settings on the staging
 * deployment, NOT on production). When active, a small filing-line bar
 * sits at the top of every page above the Nav, naming the deployment
 * as a preview and pointing colleagues at the production site so
 * nobody confuses a draft for the live URL.
 *
 * Server component — no client-side JS, no hydration cost. The env
 * variable is read at build/runtime and the banner is statically
 * rendered (or not rendered at all). On production it's tree-shaken
 * away because the env var resolves to undefined.
 *
 * Designed to NOT push the rest of the page down visually — `sticky
 * top-0 z-50` makes it overlay; the Nav (which has its own backdrop)
 * stacks under it. ~32px tall on desktop.
 */
export function StagingBanner() {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === "true";
  if (!isStaging) return null;

  return (
    <div
      className="sticky top-0 z-[60] bg-birdseye-electric text-birdseye-cream py-1.5 px-4 text-center"
      role="status"
      aria-label="Staging environment notice"
    >
      <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase">
        <span className="font-semibold">Internal preview</span>
        <span aria-hidden className="mx-2 opacity-60">
          ·
        </span>
        <span className="opacity-85">
          Not production —{" "}
          <a
            href="https://birdseyesecurity.ca"
            className="underline underline-offset-2 hover:opacity-100 opacity-90"
          >
            birdseyesecurity.ca
          </a>{" "}
          is the live site
        </span>
      </p>
    </div>
  );
}
