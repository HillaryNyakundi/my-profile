# SEO Maintenance Guide

How to keep SEO healthy as this site changes. Most of the work is in the codebase —
Google Search Console mostly takes care of itself once set up.

> **Golden rule:** SEO changes only take effect once they're **deployed to Vercel**.
> Google reads `https://hillarynyakundi.vercel.app`, never your local machine.

---

## Where SEO lives in this codebase

| File | What it controls |
| --- | --- |
| [app/layout.tsx](../app/layout.tsx) | Site-wide metadata: default title, description, keywords, OpenGraph, Twitter, robots, Google verification code |
| `app/*/page.tsx` (per route) | Each page's own `title`, `description`, and `canonical` URL |
| [app/sitemap.ts](../app/sitemap.ts) | The list of routes exposed at `/sitemap.xml` |
| [app/robots.ts](../app/robots.ts) | `/robots.txt` — what crawlers may access |
| [lib/site.ts](../lib/site.ts) | Central config: site name, title, description, URL, OG image |
| [lib/structured-data.ts](../lib/structured-data.ts) | JSON-LD (Person + WebSite schema) rendered in every page's `<head>` |
| [public/llms.txt](../public/llms.txt) | Guidance + facts for AI crawlers (ChatGPT, Gemini, Claude, etc.) |

---

## Scenario 1 — Adding a new page

Example: adding a `/projects` page (`app/projects/page.tsx`).

**In code:**

1. **Export metadata** on the new page — always include `title`, `description`, and a
   self-referencing `canonical`:

   ```tsx
   export const metadata: Metadata = {
     title: 'Projects',
     description: 'Selected projects built by Hillary Nyakundi.',
     alternates: { canonical: '/projects' },
   };
   ```

2. **Add the route to the sitemap** — open [app/sitemap.ts](../app/sitemap.ts) and add the path
   to the `routes` array:

   ```ts
   const routes = ['', '/about', '/experience', '/workflow', '/contact', '/projects'];
   ```

3. **Deploy** (commit + push → Vercel).

**In Google Search Console:**

4. **Nothing required for the sitemap** — Google re-fetches `/sitemap.xml` automatically and
   discovers the new URL. Do **not** resubmit the sitemap.
5. **Optional, to speed it up:** URL Inspection → paste the new URL → **Request Indexing**.
   This is per-URL and quota-limited — use it for a handful of important new pages, not in bulk.

---

## Scenario 2 — Editing content on an existing page

1. Make the change and **deploy**.
2. `lastModified` in the sitemap updates automatically (it uses the current date on each build).
3. If the change is significant (rewrote the page, new title/description),
   optionally run URL Inspection → **Request Indexing** to nudge a re-crawl. Otherwise just wait.

No Search Console action is required for routine edits.

---

## Scenario 3 — Changing who you are / your links

If your **bio, job title, or social links** change, update **both**:

- [lib/structured-data.ts](../lib/structured-data.ts) — `jobTitle`, `description`, `sameAs` (social URLs), `knowsAbout`.
- [public/llms.txt](../public/llms.txt) — the PERSON / OFFERINGS / LINKS sections, and bump the
  `Last updated` date at the top.

Also update [lib/site.ts](../lib/site.ts) if the site title/description/OG image changes — that
flows into the metadata, sitemap, and structured data automatically.

Then deploy.

---

## Scenario 4 — Renaming or deleting a page

1. Remove/rename the route in `app/`.
2. Remove the old path from [app/sitemap.ts](../app/sitemap.ts).
3. Deploy.
4. In Search Console → **Removals** you can temporarily hide the old URL if it must disappear fast.
   Otherwise Google drops it naturally once it 404s.
5. If you **renamed** (URL changed), consider a redirect from the old path to the new one in
   `next.config.ts` so existing links and ranking aren't lost.

---

## Scenario 5 — Custom domain later (e.g. hillarynyakundi.com)

If you move off `*.vercel.app` to a custom domain:

1. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in Vercel env vars (reads into
   [lib/site.ts](../lib/site.ts)) → every canonical, OG tag, sitemap, and schema URL updates.
2. Add the new domain as a **new property** in Search Console and verify it
   (a **Domain property** via DNS TXT is best — covers all subdomains + http/https).
3. Resubmit `sitemap.xml` under the new property.
4. Keep the old property around and set up redirects so ranking transfers.

---

## Recurring health checks (Search Console — no code needed)

Check every few weeks:

- **Pages (Indexing)** — indexed vs. excluded. Watch for *"Discovered – currently not indexed"* or
  *"Crawled – currently not indexed"* on real pages you care about.
- **Sitemaps** — status stays **Success** and discovered-page count matches your route count.
- **Rich results / Enhancements** — validates the JSON-LD structured data; fix any errors.
- **Core Web Vitals** — real-world LCP / INP / CLS. Keep LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Manual Actions & Security** — rare, but a manual action can deindex the site. Glance occasionally.

---

## Quick reference: "I changed X → do Y"

| I did this | Code change | Search Console |
| --- | --- | --- |
| Added a page | metadata + canonical + add to `sitemap.ts` | Optional: Request Indexing |
| Edited page content | just deploy | Optional: Request Indexing if major |
| Changed bio / socials | `structured-data.ts` + `llms.txt` | none |
| Renamed a page | update route + sitemap + add redirect | none (Removals if urgent) |
| Deleted a page | remove route + sitemap entry | Removals if urgent |
| New custom domain | set `NEXT_PUBLIC_SITE_URL` | new property + verify + resubmit sitemap |

**Never** resubmit the sitemap just because you added a page — Google re-reads it on its own.
