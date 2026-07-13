// Central site config used for SEO metadata, sitemap, and robots.
// Override the URL per environment with NEXT_PUBLIC_SITE_URL if needed.
export const siteConfig = {
  name: 'Hillary Nyakundi',
  title: 'Independent contractor Mobile and Website developer for Hire',
  description:
    'Hillary Nyakundi — Mobile and Website developer turning ideas into fast, scalable mobile and website apps. Based in Kenya, available for independent contractor and full-time work.', 
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hillarynyakundi.vercel.app'
  ).replace(/\/$/, ''),
  ogImage: '/Hillary.jpeg',
};

export type SiteConfig = typeof siteConfig;
