import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

// Generates /sitemap.xml. Add an entry here for every route you want
// search engines to index.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
