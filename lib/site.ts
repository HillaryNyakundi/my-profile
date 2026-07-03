// Central site config used for SEO metadata, sitemap, and robots.
// Override the URL per environment with NEXT_PUBLIC_SITE_URL if needed.
export const siteConfig = {
  name: 'Hillary Nyakundi',
  title: 'Hillary Nyakundi | Software Engineer',
  description:
    'Hillary Nyakundi — software engineer turning ideas into fast, scalable mobile and web apps. Based in Kenya, available for freelance and full-time work.',
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hillarynyakundi.vercel.app'
  ).replace(/\/$/, ''),
  ogImage: '/Hillary.jpeg',
};

export type SiteConfig = typeof siteConfig;
