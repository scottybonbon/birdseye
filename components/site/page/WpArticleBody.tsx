/**
 * Renders WordPress post HTML inside our typography system.
 *
 * The WP editor outputs standard prose (h2/h3, p, ul, blockquote, img,
 * figure). We scope CSS via a class so we don't pollute the rest of
 * the page, and apply our brand typography to it.
 */
export function WpArticleBody({ html }: { html: string }) {
  return (
    <>
      <div
        className="wp-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .wp-prose {
          color: rgba(244, 237, 228, 0.78);
          font-size: 17px;
          line-height: 1.7;
          letter-spacing: -0.005em;
          max-width: 700px;
        }
        .wp-prose > * + * { margin-top: 1.4em; }
        .wp-prose h2 {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          color: #F4EDE4;
          font-size: clamp(1.625rem, 2.4vw, 2.125rem);
          line-height: 1.2;
          letter-spacing: -0.018em;
          margin-top: 2.4em;
        }
        .wp-prose h3 {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          color: #F4EDE4;
          font-size: clamp(1.25rem, 1.7vw, 1.5rem);
          line-height: 1.3;
          letter-spacing: -0.012em;
          margin-top: 2em;
        }
        .wp-prose h4 {
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          color: #F4EDE4;
          font-size: 1.1rem;
          line-height: 1.4;
          margin-top: 1.6em;
        }
        .wp-prose p {
          color: rgba(244, 237, 228, 0.72);
        }
        .wp-prose a {
          color: #2E4BFF;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .wp-prose a:hover {
          color: #5577FF;
        }
        .wp-prose strong { color: #F4EDE4; font-weight: 600; }
        .wp-prose em { color: #F4EDE4; font-style: italic; }
        .wp-prose ul, .wp-prose ol {
          padding-left: 1.4em;
          color: rgba(244, 237, 228, 0.72);
        }
        .wp-prose ul { list-style: disc; }
        .wp-prose ol { list-style: decimal; }
        .wp-prose ul li, .wp-prose ol li {
          margin-top: 0.6em;
          padding-left: 0.4em;
        }
        .wp-prose ul li::marker { color: #2E4BFF; }
        .wp-prose ol li::marker { color: #2E4BFF; font-weight: 600; }
        .wp-prose blockquote {
          border-left: 2px solid #2E4BFF;
          padding-left: 1.5em;
          margin-left: 0;
          font-family: var(--font-instrument-serif), serif;
          font-style: italic;
          font-size: 1.25em;
          line-height: 1.5;
          color: #F4EDE4;
        }
        .wp-prose img, .wp-prose figure {
          border-radius: 12px;
          margin: 2em 0;
          width: 100%;
          height: auto;
        }
        .wp-prose figure img { margin: 0; }
        .wp-prose figure figcaption {
          margin-top: 0.8em;
          font-family: var(--font-plex-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: rgba(244, 237, 228, 0.45);
          text-align: center;
        }
        .wp-prose hr {
          border: none;
          border-top: 1px solid rgba(244, 237, 228, 0.1);
          margin: 3em 0;
        }
        .wp-prose iframe {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          border: 1px solid rgba(244, 237, 228, 0.08);
        }
        .wp-prose code {
          background: rgba(46, 75, 255, 0.1);
          color: #2E4BFF;
          padding: 0.15em 0.4em;
          border-radius: 3px;
          font-size: 0.92em;
          font-family: var(--font-plex-mono), monospace;
        }
        .wp-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
        }
        .wp-prose th, .wp-prose td {
          padding: 0.8em 1em;
          text-align: left;
          border-bottom: 1px solid rgba(244, 237, 228, 0.08);
        }
        .wp-prose th {
          font-family: var(--font-plex-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2E4BFF;
        }
      `}</style>
    </>
  );
}
