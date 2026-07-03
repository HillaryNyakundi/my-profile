import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

// Generates /robots.txt — allows all crawlers and points them at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
