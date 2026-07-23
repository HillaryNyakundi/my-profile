import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

// Generates /sitemap.xml. Add an entry here for every route you want
// search engines to index.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/work', priority: 0.8 },
    { path: '/experience', priority: 0.8 },
    { path: '/workflow', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  }));
}
