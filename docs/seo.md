# SEO & Search Engine Indexing

How this site gets found by Google (and other search engines), what was set
up in code, and the one-time steps you do after deploying.

---

## What a sitemap is

A **sitemap** (`/sitemap.xml`) is a machine-readable list of the URLs on the
site you want search engines to know about, with optional metadata like
`lastModified` and `priority`. It's a "table of contents" you hand to crawlers
so they don't have to discover every page by following links — especially
useful for a new site with few inbound links.

## How Google finds & indexes a site

There is no single switch to "turn on" indexing. Google does it automatically,
and these pieces help it along:

1. **Crawling** — Googlebot fetches pages by following links and reading your sitemap.
2. **`robots.txt`** (`/robots.txt`) — tells crawlers what they *may* crawl and
   where the sitemap is. It permits/blocks **crawling**; it does **not** force indexing.
3. **`robots` meta / `X-Robots-Tag`** — per-page directive. If a page says
   `noindex`, Google will not index it. This is the most common accidental
   blocker (e.g. a "Coming soon" page shipped with `noindex`).
4. **Sitemap** — speeds up discovery of your URLs.
5. **Google Search Console** — where you verify ownership, submit the sitemap,
   and can request indexing.

> Indexing is not instant — it can take days to a few weeks. Search Console
> shows the status.

---

## What is set up in this repo

| File | Generates | Purpose |
| --- | --- | --- |
| [`lib/site.ts`](../lib/site.ts) | — | Single source of truth for site URL, name, description (used by all of the below). |
| [`app/layout.tsx`](../app/layout.tsx) | `<head>` meta | `metadataBase`, title/description, canonical URL, Open Graph + Twitter cards, and explicit `robots: { index: true, follow: true }`. |
| [`app/sitemap.ts`](../app/sitemap.ts) | `/sitemap.xml` | Lists indexable routes. |
| [`app/robots.ts`](../app/robots.ts) | `/robots.txt` | Allows all crawlers, disallows `/api/`, links the sitemap. |

**Production URL:** `https://hillarynyakundi.vercel.app`
(override per-environment with the `NEXT_PUBLIC_SITE_URL` env var).

### Verify locally / after deploy

```bash
pnpm dev
# then open:
#   http://localhost:3000/robots.txt
#   http://localhost:3000/sitemap.xml
```

On production these are:
- https://hillarynyakundi.vercel.app/robots.txt
- https://hillarynyakundi.vercel.app/sitemap.xml

---

## One-time steps after deploying

1. **Deploy** so `robots.txt` and `sitemap.xml` are live at the URLs above.
2. Open **[Google Search Console](https://search.google.com/search-console)** and
   add your site as a property (URL-prefix property using the full
   `https://hillarynyakundi.vercel.app` URL is simplest).
3. **Verify ownership.** Easiest options:
   - **HTML meta tag** — Google gives you a `<meta name="google-site-verification" ...>`
     tag. Add its content value to `verification` in `app/layout.tsx`:
     ```ts
     export const metadata: Metadata = {
       // ...
       verification: { google: 'PASTE_TOKEN_HERE' },
     };
     ```
   - or **DNS TXT record** on your domain.
4. **Submit the sitemap:** in Search Console → *Sitemaps* → enter `sitemap.xml`.
5. (Optional) **Request indexing:** *URL Inspection* → paste the homepage URL →
   *Request indexing* to nudge Google.
6. Also consider **[Bing Webmaster Tools](https://www.bing.com/webmasters)** — you
   can import directly from Google Search Console.

---

## Keeping it healthy

- **Add new routes to the sitemap.** When you add a page (e.g. `/projects`),
  add its URL to `app/sitemap.ts`.
- **Never ship `noindex` to production** unless you intend to hide the site.
  A "Coming soon" placeholder with `noindex` will keep you out of Google.
- **Open Graph image:** currently uses `public/Hillary.jpeg`. For best link
  previews, add a dedicated **1200×630** image and point `siteConfig.ogImage`
  at it (or use Next's `app/opengraph-image` convention).
- **Custom domain later?** Update `NEXT_PUBLIC_SITE_URL` (or the default in
  `lib/site.ts`) and add the new property in Search Console.
