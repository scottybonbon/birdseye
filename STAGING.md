# Staging deploy — quick reference

## First-time setup (one-shot)

1. **Push to GitHub.** This workspace isn't a git repo yet:

   ```sh
   cd "/path/to/Birdseye Website"
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create birdseye-website --private --source=. --remote=origin --push
   ```

2. **Connect Vercel.** In the Vercel dashboard → Add New → Project →
   import the GitHub repo. Framework auto-detects as Next.js. Accept
   the defaults and deploy. First build takes ~2 minutes.

3. **Set env vars on Vercel** (Project Settings → Environment Variables).
   Mark each one for the staging environment specifically (Vercel calls
   the auto-deploy environments "Preview" and "Production"):

   | Name                      | Value                                       | Environments |
   |---------------------------|---------------------------------------------|--------------|
   | `NEXT_PUBLIC_WP_API_URL`  | `https://birdseyesecurity.com/wp-json/wp/v2` | All          |
   | `NEXT_PUBLIC_STAGING`     | `true`                                       | Preview only |

   Leave `NEXT_PUBLIC_STAGING` unset on Production so the banner +
   noindex don't ship to live.

4. **Password-protect the deployment** (Vercel Pro plan). Project
   Settings → Deployment Protection → Standard Protection → set a
   shared password. Share the password + URL with colleagues.

5. **Custom subdomain (optional, later).** Project Settings → Domains
   → add `staging.birdseyesecurity.ca` and update the DNS CNAME on
   Cloudflare to point at `cname.vercel-dns.com`.

## Ongoing workflow

- **Push to a branch** → Vercel deploys a preview at
  `birdseye-website-{branch}-{org}.vercel.app`. Every PR gets its own
  isolated preview URL. Share the per-branch URL when you want feedback
  on a specific change in flight.
- **Merge to main** → main branch redeploys, the staging URL refreshes.
- **Production cutover** → when you're ready to go live, point
  `birdseyesecurity.ca` (or wherever) at the Vercel project as the
  Production environment. Set `NEXT_PUBLIC_STAGING=false` (or unset)
  on the Production env scope.

## What activates when `NEXT_PUBLIC_STAGING=true`

- `<StagingBanner />` renders an "Internal preview" filing-line bar at
  the top of every page (sticky, electric-blue, 32px tall on desktop).
- `robots.txt` returns `Disallow: /` so search engines don't index the
  preview URL.
- `<meta name="robots" content="noindex,nofollow">` is also emitted as
  a second guard (some hosts inject their own robots.txt ahead of the
  app's; the meta tag closes the gap).

All three are off by default — they only activate when the env var is
literally the string `"true"`.

## Pre-flight check before sharing a URL

- `npm run build` succeeds locally (proves the production bundle
  compiles — `npx tsc --noEmit` is also useful but doesn't catch some
  next-specific issues like font loading).
- Walk three pages in incognito: `/`, `/platform`, `/career`. Verify
  fonts load, hero video plays, navigation works, and the WP-fed
  pages (`/news`, `/blog`, `/career`) actually fetch data.
- Confirm the staging banner shows on the preview deployment but NOT
  on production.
- Confirm `https://{staging-url}/robots.txt` returns `Disallow: /`.

## Things to flag explicitly to colleague reviewers

So nobody mistakes a placeholder for finished:

- The `_placeholders.md` registry lists every piece of synthetic
  content currently shipped (customer names + stats, case-study
  narratives, the closing-metrics numbers). Worth sharing the file
  with reviewers if they're doing copy/factual review, otherwise just
  keep the registry as your own swap-in list.
- Lead-capture forms (`LeadCaptureModal`, `NewsletterStrip`) capture
  email + name into React state and don't POST anywhere yet. If a
  reviewer fills one out expecting a follow-up email, they won't get
  one.
- `/checklist` and `/guide` featured-resource downloads link to PDFs
  that don't exist yet (`/playbooks/operators-guide-modernizing-the-gate.pdf`,
  `/playbooks/cargo-theft-prevention-audit.pdf`).
- The MaxTelepresence triptych was cut from home (2026-05-04). The
  dedicated `/maximum-telepresence` page still has it. Component file
  preserved in case it earns a different surface later.
