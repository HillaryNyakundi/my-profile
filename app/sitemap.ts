import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

// Generates /sitemap.xml. Add an entry here for every route you want
// search engines to index.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/about', '/experience', '/workflow', '/contact'];

  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
